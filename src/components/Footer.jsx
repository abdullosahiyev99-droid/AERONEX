import { NavLink } from 'react-router-dom'
import { useLang } from '../hooks/useLang.jsx'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="relative z-10 px-4 md:px-12 py-10"
      style={{ background:'var(--bg)', borderTop:'1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="font-display text-2xl tracking-widest text-gradient-gold">AERONEX</div>
        <div className="flex gap-5 md:gap-8 flex-wrap">
          {[['/', 'nav_home'],['/booking','nav_book'],['/destinations','nav_dest'],
            ['/flights','nav_flights'],['/checkin','nav_checkin']].map(([to,key])=>(
            <NavLink key={to} to={to}
              className="text-xs no-underline tracking-wide transition-colors hover:text-gold"
              style={{ color:'var(--text3)' }}>
              {t(key)}
            </NavLink>
          ))}
        </div>
        <div className="font-mono text-[0.65rem]" style={{ color:'var(--text3)' }}>
          {t('footer_copy')}
        </div>
      </div>
    </footer>
  )
}
