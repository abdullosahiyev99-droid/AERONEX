import { useRef, useEffect } from 'react'

export default function useMouseRef() {
  const mouseRef = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const handler = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5)
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
  return mouseRef
}
