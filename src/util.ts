export function burst(x: number, y: number, set = ['💖', '✨', '⭐', '🎀', '🌸']) {
  for (let i = 0; i < 14; i++) {
    const e = document.createElement('div')
    e.className = 'pop'; e.textContent = set[i % set.length]
    e.style.left = x + 'px'; e.style.top = y + 'px'
    document.body.appendChild(e)
    const a = Math.random() * 6.28, d = 60 + Math.random() * 110
    e.animate(
      [{ transform: 'translate(0,0) scale(.4)', opacity: 1 },
       { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d + 60}px) rotate(${Math.random() * 360}deg) scale(1.1)`, opacity: 0 }],
      { duration: 800 + Math.random() * 400, easing: 'cubic-bezier(.2,.8,.4,1)' }
    ).onfinish = () => e.remove()
  }
}
let timer: number
export function toast(msg: string) {
  const el = document.getElementById('toast'); if (!el) return
  el.textContent = msg; el.classList.add('show')
  clearTimeout(timer); timer = window.setTimeout(() => el.classList.remove('show'), 1800)
}
