import Lenis from 'lenis'

export let lenis: Lenis | null = null
let velocity = 0
export const getVelocity = () => velocity

/** Smooth scroll + scroll-linked halftone parallax. Skipped for reduced-motion users. */
export function initLenis() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({ lerp: 0.09, autoRaf: true })
  lenis.on('scroll', (e: Lenis) => {
    velocity = e.velocity
    const ht = document.getElementById('ht')
    if (ht) ht.style.transform = `translateY(${-e.scroll * 0.08}px)`
  })
  return () => { lenis?.destroy(); lenis = null }
}
