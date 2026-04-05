import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const el = document.getElementById('cursor')
    if (!el) return
    const move = (e) => {
      el.style.left = e.clientX - 6 + 'px'
      el.style.top  = e.clientY - 6 + 'px'
    }
    const over = () => el.classList.add('hovered')
    const out  = () => el.classList.remove('hovered')
    document.addEventListener('mousemove', move)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', over)
      el.addEventListener('mouseleave', out)
    })
    return () => document.removeEventListener('mousemove', move)
  }, [])

  return <div id="cursor" />
}
