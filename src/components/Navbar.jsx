import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLang } from '../hooks/useLang.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const { dark, setDark }    = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to:'/',             key:'nav_home'    },
    { to:'/booking',      key:'nav_book'    },
    { to:'/destinations', key:'nav_dest'    },
    { to:'/flights',      key:'nav_flights' },
    { to:'/checkin',      key:'nav_checkin' },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-10 h-[66px]"
        style={{ background: 'var(--nav)', backdropFilter:'blur(24px)', borderBottom:'1px solid var(--border)' }}>

        {/* Logo */}
        <NavLink to="/" className="font-display text-2xl md:text-3xl tracking-widest text-gradient-gold no-underline flex-shrink-0">
          AERONEX
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-0.5">
          {links.map(({ to, key }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) =>
                `relative nav-link-line px-3 py-2 font-mono text-[0.7rem] tracking-widest uppercase transition-colors no-underline
                 ${isActive ? 'text-gold active' : 'hover:text-gold'}`
              }
              style={({ isActive }) => ({ color: isActive ? '#c9a84c' : 'var(--text2)' })}>
              {t(key)}
            </NavLink>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Dark/Light toggle */}
          <button
            onClick={() => setDark(!dark)}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 rounded-full flex items-center justify-center text-base transition-all border hover:border-gold"
            style={{ background:'var(--bg2)', borderColor:'var(--border)' }}>
            {dark ? '☀️' : '🌙'}
          </button>

          {/* Lang */}
          <div className="flex overflow-hidden rounded-sm border" style={{ borderColor:'var(--border)', background:'var(--bg2)' }}>
            {['en','uz'].map(l => (
              <button key={l} onClick={() => setLang(l)}
                className="font-mono text-[0.62rem] tracking-widest px-2.5 py-[5px] transition-all"
                style={{
                  background: lang === l ? '#c9a84c' : 'transparent',
                  color: lang === l ? '#040608' : 'var(--text3)',
                  fontWeight: lang === l ? 700 : 400,
                }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Book now desktop */}
          <NavLink to="/booking"
            className="hidden md:flex items-center gap-1 font-display text-sm tracking-widest px-4 py-2 rounded-sm no-underline transition-all hover:bg-gold2"
            style={{ background:'#c9a84c', color:'#040608' }}>
            ✈ {t('nav_book')}
          </NavLink>

          {/* Hamburger mobile */}
          <button onClick={() => setMenuOpen(true)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-sm border"
            style={{ background:'var(--bg2)', borderColor:'var(--border)' }}>
            <span className="w-5 h-px bg-gold" />
            <span className="w-5 h-px bg-gold" />
            <span className="w-3 h-px bg-gold self-start ml-1" />
          </button>
        </div>
      </nav>

      {/* Mobile full screen menu */}
      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <button onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 text-gold font-display text-2xl">✕</button>

          <div className="font-display text-4xl tracking-widest text-gradient-gold mb-6">AERONEX</div>

          {links.map(({ to, key }) => (
            <NavLink key={to} to={to} end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-display text-3xl tracking-widest no-underline transition-colors
                 ${isActive ? 'text-gold' : 'hover:text-gold'}`
              }
              style={({ isActive }) => ({ color: isActive ? '#c9a84c' : 'var(--text2)' })}>
              {t(key)}
            </NavLink>
          ))}

          <NavLink to="/booking" onClick={() => setMenuOpen(false)}
            className="mt-4 font-display text-2xl tracking-widest px-10 py-3 rounded-sm no-underline transition-all"
            style={{ background:'#c9a84c', color:'#040608' }}>
            ✈ {t('nav_book')}
          </NavLink>

          {/* Theme toggle inside mobile menu too */}
          <div className="flex items-center gap-3 mt-4">
            <button onClick={() => { setDark(!dark); setMenuOpen(false) }}
              className="font-mono text-sm tracking-widest px-5 py-2 rounded-full border border-gold/40 text-gold">
              {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
