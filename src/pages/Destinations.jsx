import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PlaneCanvas from '../components/PlaneCanvas'
import Footer from '../components/Footer'
import { useLang } from '../hooks/useLang.jsx'

// Unsplash direct image URLs (no API key needed)
const ALL = [
  {
    city:'Dubai', country:'United Arab Emirates', code:'DXB', region:'ME',
    price:'$189', dur:'3h 15m', badge:'TRENDING', large:true,
    img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    desc:'City of Gold — Burj Khalifa, desert safaris, luxury malls',
  },
  {
    city:'Istanbul', country:'Turkey', code:'IST', region:'EU',
    price:'$142', dur:'4h 30m', badge:'POPULAR',
    img:'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80',
    desc:'Where East meets West — Hagia Sophia, Bosphorus',
  },
  {
    city:'Moscow', country:'Russia', code:'SVO', region:'CIS',
    price:'$98', dur:'3h 10m', badge:'',
    img:'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=600&q=80',
    desc:'Red Square, Kremlin and the Metro of the world',
  },
  {
    city:'London', country:'United Kingdom', code:'LHR', region:'EU',
    price:'$310', dur:'8h 45m', badge:'SALE',
    img:'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
    desc:'Big Ben, Tower Bridge, world-class museums',
  },
  {
    city:'Bangkok', country:'Thailand', code:'BKK', region:'AS',
    price:'$255', dur:'5h 20m', badge:'',
    img:'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80',
    desc:'Golden temples, street food paradise, vibrant nightlife',
  },
  {
    city:'Beijing', country:'China', code:'PEK', region:'AS',
    price:'$199', dur:'5h 00m', badge:'NEW',
    img:'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80',
    desc:'Great Wall, Forbidden City, modern skyline',
  },
  {
    city:'Frankfurt', country:'Germany', code:'FRA', region:'EU',
    price:'$278', dur:'6h 30m', badge:'',
    img:'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80',
    desc:'Financial hub, historic Römerberg, Apple wine',
  },
  {
    city:'New York', country:'United States', code:'JFK', region:'AM',
    price:'$490', dur:'14h', badge:'',
    img:'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80',
    desc:'Manhattan skyline, Times Square, Central Park',
  },
  {
    city:'Paris', country:'France', code:'CDG', region:'EU',
    price:'$320', dur:'7h 10m', badge:'',
    img:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
    desc:'Eiffel Tower, Louvre, Seine river cruises',
  },
  {
    city:'Tokyo', country:'Japan', code:'NRT', region:'AS',
    price:'$380', dur:'9h 30m', badge:'HOT',
    img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
    desc:'Shibuya crossing, Mount Fuji, anime culture',
  },
]

const FILTERS = [
  ['all','filter_all'],['EU','filter_eu'],['ME','filter_me'],
  ['AS','filter_as'],['AM','filter_am'],['CIS','filter_cis'],
]

const BADGE_CLS = {
  'SALE':'bg-sky2/10 text-sky2 border-sky2/25',
  'TRENDING':'bg-gold/10 text-gold border-gold-mid',
  'POPULAR':'bg-gold/10 text-gold border-gold-mid',
  'NEW':'bg-agreen/10 text-agreen border-agreen/25',
  'HOT':'bg-red-400/10 text-red-400 border-red-400/25',
}

export default function Destinations() {
  const { t } = useLang()
  const [active, setActive] = useState('all')
  const list = active === 'all' ? ALL : ALL.filter(d => d.region === active)

  return (
    <div className="relative min-h-screen" style={{ background:"var(--bg)" }}>
      <PlaneCanvas />

      {/* Header */}
      <div className="relative z-10 pt-[110px] pb-8 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[0.65rem] tracking-widest text-text3 uppercase mb-3">
            Home / {t('nav_dest')}
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wide">
            {t('dest_page_title')}
          </h1>
          <p className="text-text2 text-sm mt-2">{t('dest_page_sub')}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="relative z-10 px-4 md:px-12 max-w-6xl mx-auto">
        <div className="flex gap-2 flex-wrap mb-8">
          {FILTERS.map(([val,key]) => (
            <button key={val} onClick={() => setActive(val)}
              className={`font-mono text-[0.68rem] tracking-wide px-4 py-2 rounded-full border transition-all
                ${active===val
                  ? 'bg-gold/10 border-gold-mid text-gold'
                  : 'bg-ink2 border-gold-faint text-text2 hover:border-gold-mid hover:text-gold'}`}>
              {t(key)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-24">
          {list.map((d, i) => (
            <motion.div key={d.code}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ delay: i * 0.06 }}
              className={`border border-gold-faint rounded-lg overflow-hidden cursor-pointer bg-ink2
                hover:border-gold-mid hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 group
                ${d.large ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}>

              {/* Image */}
              <div className={`relative overflow-hidden ${d.large ? 'h-72 sm:h-96' : 'h-52'}`}>
                <img
                  src={d.img}
                  alt={d.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #0e1218, #141a22)'
                  }}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink2 via-ink2/40 to-transparent" />

                {/* Badge */}
                {d.badge && (
                  <div className={`absolute top-4 right-4 font-mono text-[0.6rem] tracking-widest uppercase px-2.5 py-1 border rounded-sm backdrop-blur-sm ${BADGE_CLS[d.badge]||'bg-gold/10 text-gold border-gold-mid'}`}>
                    {d.badge}
                  </div>
                )}

                {/* Route indicator */}
                <div className="absolute bottom-3 left-0 right-0 px-5 font-mono text-[0.65rem] text-gold/80 flex items-center gap-2">
                  <span>TAS</span>
                  <div className="flex-1 border-t border-dashed border-gold/30" />
                  <span>✈</span>
                  <div className="flex-1 border-t border-dashed border-gold/30" />
                  <span>{d.code}</span>
                </div>
              </div>

              {/* Body */}
              <div className={`${d.large ? 'p-7' : 'p-5'}`}>
                <div className="font-mono text-[0.6rem] text-text3 mb-1 tracking-widest uppercase">
                  {d.code} · {d.region} · {d.dur}
                </div>
                <div className={`font-display leading-none mb-1 ${d.large ? 'text-[2.2rem]' : 'text-2xl'}`}>
                  {d.city}
                </div>
                <div className="text-sm text-text2 mb-2">{d.country}</div>
                {d.desc && (
                  <p className="text-xs text-text3 leading-relaxed mb-4 line-clamp-2">{d.desc}</p>
                )}
                <div className="flex justify-between items-center pt-4 border-t border-gold-faint">
                  <div>
                    <div className="font-mono text-[0.58rem] text-text3 uppercase tracking-widest mb-0.5">FROM</div>
                    <div className={`font-display text-gold ${d.large ? 'text-2xl' : 'text-xl'}`}>{d.price}</div>
                  </div>
                  <Link to="/booking"
                    onClick={e => e.stopPropagation()}
                    className="bg-transparent border border-gold-mid text-gold font-display text-sm tracking-widest px-5 py-2 rounded-sm hover:bg-gold hover:text-ink transition-all no-underline">
                    {t('book_btn')}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
