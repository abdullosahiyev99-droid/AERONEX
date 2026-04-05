import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PlaneCanvas from '../components/PlaneCanvas'
import Footer from '../components/Footer'
import { useLang } from '../hooks/useLang.jsx'

const TICKER = [
  { text:'TAS → DXB  $189', hot:true },{ text:'FLIGHT HY501 ON TIME' },
  { text:'TAS → IST  $142', hot:true },{ text:'GATE A7 BOARDING NOW' },
  { text:'TAS → LHR  $310' },          { text:'TAS → PEK  $199', hot:true },
  { text:'24 FLIGHTS TODAY' },          { text:'NEW ROUTE: TAS → BKK  $255', hot:true },
]

const DESTS = [
  { city:'Dubai',    country:'UAE',      code:'DXB', price:'$189', badge:'TRENDING',
    img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80' },
  { city:'Istanbul', country:'Turkey',   code:'IST', price:'$142', badge:'POPULAR',
    img:'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80' },
  { city:'Moscow',   country:'Russia',   code:'SVO', price:'$98',  badge:'',
    img:'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=400&q=80' },
  { city:'London',   country:'UK',       code:'LHR', price:'$310', badge:'SALE',
    img:'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80' },
  { city:'Bangkok',  country:'Thailand', code:'BKK', price:'$255', badge:'',
    img:'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80' },
  { city:'Tokyo',    country:'Japan',    code:'NRT', price:'$380', badge:'HOT',
    img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80' },
]

const WHY = [
  { icon:'⚡', en:['Instant Booking','Reserve on 400+ airlines in 30 seconds.'], uz:['Tezkor Bron',"400+ aviakompaniyada 30 soniyada bron qiling."] },
  { icon:'🛰', en:['Real-Time Radar','Live tracking, gate changes, ETA.'],        uz:['Jonli Radar',"Jonli kuzatuv, darvoza o'zgarishlari, ETA."] },
  { icon:'🏆', en:['Elite Programme','Platinum, Gold, Silver — lounge + upgrades.'], uz:['Elite Dastur','Platinum, Gold, Silver — lounge + yangilashlar.'] },
]

export default function Home() {
  const { t, lang } = useLang()
  const refs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const r = el => { if (el && !refs.current.includes(el)) refs.current.push(el) }

  return (
    <div className="relative min-h-screen" style={{ background:"var(--bg)" }}>
      <PlaneCanvas />

      {/* HERO */}
      <section className="relative z-10 flex items-center min-h-screen px-4 md:px-12 pt-[70px]">
        <div className="max-w-2xl">
          <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:0.3}}
            className="inline-flex items-center gap-3 mb-6 md:mb-8 font-mono text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] uppercase text-gold border border-gold/30 px-3 md:px-4 py-[5px] rounded-sm">
            <span className="w-6 md:w-8 h-px bg-gold" />{t('hero_tag')}
          </motion.div>

          <motion.h1 initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:0.45}}
            className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.92] tracking-wide mb-6 md:mb-8">
            {t('hero_title1')}<br/>
            <span className="[-webkit-text-stroke:1px_#c9a84c] text-transparent">{t('hero_title2')}</span>
          </motion.h1>

          <motion.p initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:0.6}}
            className="text-text2 text-sm md:text-base leading-relaxed max-w-md mb-8 md:mb-10">
            {t('hero_body')}
          </motion.p>

          <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:0.75}}
            className="flex gap-3 md:gap-4 flex-wrap">
            <Link to="/booking"
              className="bg-gold text-ink font-display text-base md:text-lg tracking-widest px-6 md:px-9 py-3 rounded-sm hover:bg-gold2 hover:-translate-y-0.5 transition-all no-underline">
              {t('hero_cta1')}
            </Link>
            <Link to="/destinations"
              className="text-text2 border border-gold/25 text-xs md:text-sm tracking-wide px-6 md:px-8 py-3 rounded-sm hover:text-gold hover:border-gold transition-all no-underline">
              {t('hero_cta2')}
            </Link>
          </motion.div>
        </div>

        {/* Stats — hidden on mobile */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}
          className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex-col gap-8 md:gap-10 text-right hidden lg:flex">
          {[['186+',t('stat1')],['2.4K',t('stat2')],['99%',t('stat3')]].map(([v,l])=>(
            <div key={l}>
              <div className="font-display text-[2.5rem] md:text-[2.8rem] text-gold leading-none">{v}</div>
              <div className="font-mono text-[0.58rem] md:text-[0.6rem] text-text3 tracking-[0.15em] uppercase mt-1">{l}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-10 md:h-14 scroll-line bg-gradient-to-b from-transparent to-gold" />
          <span className="font-mono text-[0.55rem] md:text-[0.6rem] tracking-[0.2em] text-text3 uppercase">{t('scroll')}</span>
        </motion.div>
      </section>

      {/* TICKER */}
      <div className="relative z-10 bg-ink1 border-y border-gold-faint overflow-hidden h-[40px] md:h-[42px] flex items-center">
        <div className="bg-gold text-ink font-display text-xs md:text-sm tracking-widest px-4 md:px-6 h-full flex items-center flex-shrink-0">LIVE</div>
        <div className="overflow-hidden flex-1">
          <div className="ticker-track flex whitespace-nowrap">
            {[...TICKER,...TICKER].map((item,i)=>(
              <span key={i} className={`font-mono text-[0.6rem] md:text-[0.65rem] tracking-widest px-6 md:px-10 ${item.hot?'text-gold':'text-text2'}`}>
                {item.text}<span className="text-text3 mx-2">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* WHY */}
      <section className="relative z-10 py-20 md:py-32 px-4 md:px-12" style={{background:"linear-gradient(to bottom, var(--bg), var(--bg1))"}}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div ref={r} className="fade-up">
            <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-gold mb-4 md:mb-6">{t('why_label')}</p>
            <h2 className="font-display text-[clamp(2rem,4vw,4rem)] leading-none mb-6 md:mb-8">{t('why_title')}</h2>
            <div className="flex flex-col gap-3 md:gap-4">
              {WHY.map((f,i)=>(
                <div key={i} className="flex items-start gap-4 p-3 md:p-4 border border-gold-faint bg-ink2/60 rounded-lg hover:border-gold-mid hover:bg-ink2 transition-all">
                  <div className="w-9 h-9 md:w-10 md:h-10 flex-shrink-0 bg-gold/10 border border-gold-mid rounded flex items-center justify-center text-base md:text-lg">{f.icon}</div>
                  <div>
                    <div className="text-sm font-medium mb-1">{lang==='uz'?f.uz[0]:f.en[0]}</div>
                    <div className="text-xs text-text2 leading-relaxed">{lang==='uz'?f.uz[1]:f.en[1]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div ref={r} className="fade-up grid grid-cols-2 gap-3 md:gap-4">
            {[
              {val:'12.4M',lbl:lang==='uz'?"Xursand yo'lovchilar":'Happy passengers',sub:'↑ 18% YoY'},
              {val:'$47',  lbl:lang==='uz'?"Har brondan tejam":'Avg. savings',sub:'vs. direct'},
              {val:'4.9★', lbl:lang==='uz'?'App Store reytingi':'App Store rating',sub:'2.1M reviews'},
              {val:'24/7', lbl:lang==='uz'?"Qo'llab-quvvatlash":'Support',sub:'Avg. 45s response'},
              {val:'400+', lbl:lang==='uz'?'Hamkor aviakompaniyalar':'Partner airlines',sub:'Global alliances',wide:true},
            ].map((m,i)=>(
              <div key={i} className={`relative bg-ink2 border border-gold-faint rounded-lg p-4 md:p-6 overflow-hidden hover:border-gold-mid hover:-translate-y-0.5 transition-all ${m.wide?'col-span-2':''}`}>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold to-transparent" />
                <div className="font-display text-[2rem] md:text-[2.5rem] text-gold leading-none mb-1">{m.val}</div>
                <div className="text-xs text-text2">{m.lbl}</div>
                <div className="font-mono text-[0.58rem] text-text3 mt-2">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS PREVIEW */}
      <section className="relative z-10 py-16 md:py-24 px-4 md:px-12" style={{background:"var(--bg1)"}}>
        <div ref={r} className="fade-up max-w-6xl mx-auto flex justify-between items-end mb-8 md:mb-12 flex-wrap gap-3">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-gold mb-2 md:mb-3">{t('dest_label')}</p>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-none">{t('dest_title')}</h2>
          </div>
          <Link to="/destinations" className="font-mono text-xs text-gold border-b border-gold/25 pb-0.5 hover:border-gold transition-all no-underline">
            {t('dest_all')}
          </Link>
        </div>

        {/* Scrollable row */}
        <div className="max-w-6xl mx-auto flex gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth:'thin', scrollbarColor:'#c9a84c #040608' }}>
          {DESTS.map((d,i)=>(
            <Link key={d.code} to="/booking"
              className="flex-shrink-0 w-[240px] md:w-[280px] border border-gold-faint rounded-lg bg-ink2 overflow-hidden hover:border-gold-mid hover:-translate-y-1 transition-all no-underline group">
              <div className="h-36 md:h-44 relative overflow-hidden">
                <img src={d.img} alt={d.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={e => { e.target.style.display='none'; e.target.parentElement.style.background='linear-gradient(135deg,#0e1218,#141a22)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink2 to-transparent" />
                <div className="absolute bottom-2 left-0 right-0 text-center font-mono text-[0.6rem] text-gold flex items-center justify-center gap-1 px-4">
                  <span>TAS</span><div className="flex-1 border-t border-dashed border-gold/30"/><span>✈</span><div className="flex-1 border-t border-dashed border-gold/30"/><span>{d.code}</span>
                </div>
                {d.badge&&<div className={`absolute top-2 right-2 font-mono text-[0.55rem] tracking-widest uppercase px-2 py-0.5 rounded-sm ${d.badge==='SALE'?'bg-sky2/10 text-sky2 border border-sky2/25':'bg-gold/10 text-gold border border-gold-mid'}`}>{d.badge}</div>}
              </div>
              <div className="p-4">
                <div className="font-mono text-[0.6rem] text-text3 mb-0.5">{d.code} · {d.country}</div>
                <div className="font-display text-xl mb-1">{d.city}</div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gold-faint">
                  <div className="font-display text-lg text-gold">{d.price}</div>
                  <span className="font-mono text-[0.6rem] text-text3">TAS → {d.code}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
