import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { Scene } from './Scene'
import { initLenis, lenis, getVelocity } from './lenis'
import { burst, toast } from './util'
import { EMAIL, EMOJI, HOBBIES, JOBS, POSTS, PROJECTS, SKILLS } from './data'

/** Fade/slide a card in when it scrolls into view (with a failsafe so nothing stays hidden). */
function useReveal(ref: RefObject<HTMLElement | null>) {
  const [shown, setShown] = useState(false) // kept in React state so re-renders (e.g. dragging) never hide the card again
  useEffect(() => {
    const el = ref.current; if (!el) return
    const show = () => setShown(true)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { show(); io.disconnect() } }, { threshold: 0.12 })
    io.observe(el)
    const t = setTimeout(show, 2500)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [ref])
  return shown
}

type Mode = { n: number; k: 'shuffle' | 'reset' }
let topZ = 10

function Card({ tag, id, className = '', i, mode, children }: { tag: string; id?: string; className?: string; i: number; mode: Mode; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const start = useRef({ sx: 0, sy: 0, ox: 0, oy: 0 })
  const [s, setS] = useState({ x: 0, y: 0, r: [-1.5, 1, -0.8, 1.4, -1.2][i % 5], z: 0 })
  const [drag, setDrag] = useState(false)
  const shown = useReveal(ref)
  useEffect(() => {
    if (!mode.n) return
    const k = mode.k === 'shuffle' ? 1 : 0
    setS((p) => ({ ...p, x: k * (Math.random() - 0.5) * 60, y: k * (Math.random() - 0.5) * 60, r: (Math.random() - 0.5) * (k ? 12 : 3) }))
  }, [mode])
  const fade = 'opacity .7s, translate .7s cubic-bezier(.2,.9,.3,1), box-shadow .15s'
  return (
    <section
      ref={ref} id={id} className={`card rv ${shown ? 'in' : ''} ${drag ? 'drag' : ''} ${className}`}
      style={{ transform: `translate(${s.x}px,${s.y}px) rotate(${drag ? 0 : s.r}deg) scale(${drag ? 1.03 : 1})`, transition: drag ? fade : `transform .5s cubic-bezier(.3,1.5,.5,1), ${fade}`, zIndex: s.z || undefined }}
      onPointerDown={(e) => {
        if (e.pointerType === 'touch' || (e.target as HTMLElement).closest('button,a')) return // keep touch scrolling smooth
        e.currentTarget.setPointerCapture(e.pointerId)
        start.current = { sx: e.clientX, sy: e.clientY, ox: s.x, oy: s.y }; setDrag(true)
      }}
      onPointerMove={(e) => { if (drag) setS((p) => ({ ...p, x: start.current.ox + e.clientX - start.current.sx, y: start.current.oy + e.clientY - start.current.sy })) }}
      onPointerUp={() => { if (drag) { setDrag(false); setS((p) => ({ ...p, r: (Math.random() - 0.5) * 5, z: ++topZ })) } }}
      onPointerCancel={() => setDrag(false)}
    >
      <span className="tag">{tag}</span>
      {children}
    </section>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="chips">
      {items.map((c) => <button key={c} className="chip" onClick={(e) => burst(e.clientX, e.clientY, EMOJI[c] ?? ['✨'])}>{c}</button>)}
    </div>
  )
}

/** Marquee that speeds up with Lenis scroll velocity. */
function Marquee() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let x = 0, id = 0
    const loop = () => {
      const el = ref.current; if (!el) return
      x -= 0.7 + Math.min(Math.abs(getVelocity()), 3) * 0.6
      const w = el.scrollWidth / 8; if (x < -w) x += w
      el.style.transform = `translateX(${x}px)`
      id = requestAnimationFrame(loop)
    }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [])
  return <div className="strip"><div ref={ref}>{'✦ JOURNEY ♥ FORREST ✦ CS STUDENT ♥ CREATOR ✦ '.repeat(8)}</div></div>
}

function Blog() {
  const [sel, setSel] = useState(0)
  const go = (d: number) => setSel((v) => (v + d + POSTS.length) % POSTS.length)
  const p = POSTS[sel]
  const pop = (e: React.MouseEvent) => burst(e.clientX, e.clientY, ['♪', '♫', '💖'])
  return (
    <section className="blog" id="blog">
      <div>
        <p className="hand">my blog, on my iPod ♪</p>
        <div className="ipod">
          <div className="lcd">
            <b>♪ Journey’s Blog</b>
            {POSTS.map((q, i) => <div key={i} className={`sl ${i === sel ? 'on' : ''}`} onClick={() => setSel(i)}>{q.title}</div>)}
          </div>
          <div className="wheel">
            <button className="m" onClick={() => setSel(0)}>MENU</button>
            <button className="p" onClick={() => go(-1)}>⏮</button>
            <button className="n" onClick={() => go(1)}>⏭</button>
            <button className="pp" onClick={pop}>⏯</button>
            <button className="c" aria-label="Select" onClick={pop} />
          </div>
        </div>
      </div>
      <article className="note"><small>{p.date}</small><h3>{p.title}</h3><p>{p.body}</p></article>
    </section>
  )
}

export default function App() {
  const [mode, setMode] = useState<Mode>({ n: 0, k: 'reset' })
  const [dark, setDark] = useState<boolean | null>(null)

  useEffect(() => initLenis(), [])
  useEffect(() => {
    if (dark !== null) document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  const go = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault()
    const el = hash === '#top' ? 0 : (document.querySelector(hash) as HTMLElement)
    if (lenis) lenis.scrollTo(el as number | HTMLElement, { offset: -70 })
    else if (el === 0) scrollTo({ top: 0, behavior: 'smooth' })
    else (el as HTMLElement).scrollIntoView({ behavior: 'smooth' })
  }
  const isDark = dark ?? matchMedia('(prefers-color-scheme: dark)').matches
  const copy = async (e: React.MouseEvent) => {
    try { await navigator.clipboard.writeText(EMAIL); toast('Email copied! 💌') } catch { toast(EMAIL) }
    burst(e.clientX, e.clientY, ['💌', '💖', '✨'])
  }

  return (
    <>
      <div className="halftone" id="ht" />
      <nav>
        <a className="logo" href="#top" onClick={(e) => go(e, '#top')}>journey♥</a>
        {['about', 'skills', 'projects', 'blog'].map((s) => <a key={s} href={`#${s}`} onClick={(e) => go(e, `#${s}`)}>{s}</a>)}
        <a href="#hi" onClick={(e) => go(e, '#hi')}>say hi</a>
      </nav>

      <div className="wrap" id="top">
        <section className="hero">
          <div className="frame"><div className="screen"><div title="Click the heart!"><Scene /></div></div></div>
          <div>
            <p className="hand">welcome to my page ✦</p>
            <h1>{[...'Journey Forrest'].map((c, i) => <span key={i}>{c === ' ' ? ' ' : c}</span>)}</h1>
            <p className="sub">Computer Science student at Texas State who loves code, color, video editing and the stage.</p>
          </div>
        </section>
      </div>
      <Marquee />

      <div className="wrap">
        <div className="tools">
          <button onClick={() => setMode((m) => ({ n: m.n + 1, k: 'shuffle' }))}>🎲 Shuffle</button>
          <button onClick={() => setMode((m) => ({ n: m.n + 1, k: 'reset' }))}>↺ Tidy up</button>
          <button aria-label="Toggle dark mode" onClick={() => setDark(!isDark)}>{isDark ? '☀️' : '🌙'}</button>
        </div>
        <main>
          <Card tag="all about me" id="about" i={0} mode={mode}>
            <h2>Hello there 👋</h2>
            <p>B.S. in Computer Science at Texas State University, with minors in Business Administration and Applied Mathematics (3.6 GPA).</p>
            <p>My path: Houston → Fort Worth → San Marcos. Along the way I picked up C++, Java, After Effects and a love for technical theatre.</p>
          </Card>
          <Card tag="skills" id="skills" i={1} mode={mode}>
            <h2>Things I use</h2><p>Tap a chip for a surprise.</p><Chips items={SKILLS} />
          </Card>
          <Card tag="projects" id="projects" i={2} mode={mode}>
            <h2>Stuff I made</h2>
            {PROJECTS.map((p) => (
              <div className="proj" key={p.name}>
                <div><b>{p.name}</b><small>{p.desc}</small></div>
                <a className="arrow" href={p.url} target="_blank" rel="noopener">repo →</a>
              </div>
            ))}
          </Card>
          <Card tag="experience" i={3} mode={mode}>
            <h2>Where I’ve been</h2>
            {JOBS.map(([role, when]) => <div className="proj" key={role}><div><b>{role}</b><small>{when}</small></div></div>)}
          </Card>
          <Card tag="off duty" i={4} mode={mode}>
            <h2>Beyond the code 🎭</h2><p>When I’m not compiling, I’m probably doing one of these:</p><Chips items={HOBBIES} />
          </Card>
          <Card tag="say hi" id="hi" className="contact" i={5} mode={mode}>
            <h2>Let’s talk ✨</h2><p>Got an idea, an opportunity, or a good meme?</p>
            <button onClick={copy}>Copy my email</button>
            <a className="btn" href="https://github.com/nforre" target="_blank" rel="noopener">GitHub</a>
            <a className="btn" href="https://www.linkedin.com/in/journey-forrest-1b4225169" target="_blank" rel="noopener">LinkedIn</a>
          </Card>
        </main>
        <Blog />
      </div>
      <footer>thanks for checking me out!</footer>
      <div className="toast" id="toast" />
    </>
  )
}
