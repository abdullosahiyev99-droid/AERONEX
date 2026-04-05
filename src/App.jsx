import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LangProvider } from './hooks/useLang.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Destinations from './pages/Destinations'
import Flights from './pages/Flights'
import CheckIn from './pages/CheckIn'

function AppInner() {
  const cursorRef = useRef(null)
  const location  = useLocation()

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return
    const move = e => { el.style.left = e.clientX - 6 + 'px'; el.style.top = e.clientY - 6 + 'px' }
    const over = () => el.classList.add('hover')
    const out  = () => el.classList.remove('hover')
    window.addEventListener('mousemove', move)
    document.querySelectorAll('a,button').forEach(n => {
      n.addEventListener('mouseenter', over)
      n.addEventListener('mouseleave', out)
    })
    return () => window.removeEventListener('mousemove', move)
  }, [location])

  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <Navbar />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/booking"      element={<Booking />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/flights"      element={<Flights />} />
        <Route path="/checkin"      element={<CheckIn />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <AppInner />
      </LangProvider>
    </ThemeProvider>
  )
}
