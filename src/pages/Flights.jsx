import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PlaneCanvas from '../components/PlaneCanvas'
import Footer from '../components/Footer'
import { useLang } from '../hooks/useLang.jsx'

const FLIGHTS = [
  { num:'HY501', airline:'Uzbekistan Airways', code:'HY', dest:'Dubai (DXB)',        dep:'08:30', gate:'A7',  term:'1', status:'departed'  },
  { num:'FZ441', airline:'flydubai',           code:'FZ', dest:'Dubai (DXB)',        dep:'09:15', gate:'B3',  term:'2', status:'boarding'  },
  { num:'TK347', airline:'Turkish Airlines',   code:'TK', dest:'Istanbul (IST)',     dep:'10:00', gate:'A12', term:'1', status:'on-time'   },
  { num:'HY723', airline:'Uzbekistan Airways', code:'HY', dest:'London (LHR)',       dep:'11:45', gate:'C2',  term:'2', status:'delayed',  delay:'+25min' },
  { num:'S7201', airline:'S7 Airlines',        code:'S7', dest:'Novosibirsk (OVB)', dep:'12:30', gate:'A4',  term:'1', status:'on-time'   },
  { num:'CA912', airline:'Air China',          code:'CA', dest:'Beijing (PEK)',      dep:'14:00', gate:'D1',  term:'2', status:'gate-open' },
  { num:'LH785', airline:'Lufthansa',          code:'LH', dest:'Frankfurt (FRA)',    dep:'15:20', gate:'B8',  term:'1', status:'on-time'   },
  { num:'EK702', airline:'Emirates',           code:'EK', dest:'Dubai (DXB)',        dep:'16:45', gate:'A9',  term:'2', status:'on-time'   },
  { num:'QR598', airline:'Qatar Airways',      code:'QR', dest:'Doha (DOH)',         dep:'17:30', gate:'B5',  term:'1', status:'boarding'  },
  { num:'HY305', airline:'Uzbekistan Airways', code:'HY', dest:'Moscow (SVO)',       dep:'18:00', gate:'C4',  term:'1', status:'on-time'   },
  { num:'KC868', airline:'Air Astana',         code:'KC', dest:'Almaty (ALA)',       dep:'19:15', gate:'A3',  term:'1', status:'on-time'   },
  { num:'HY207', airline:'Uzbekistan Airways', code:'HY', dest:'KL (KUL)',           dep:'20:00', gate:'B11', term:'2', status:'delayed',  delay:'+40min' },
]

const ST = {
  'on-time':  ['bg-agreen/10 text-agreen border-agreen/25',    'ON TIME'  ],
  'boarding': ['bg-gold/10 text-gold border-gold-mid',          'BOARDING' ],
  'delayed':  ['bg-red-500/10 text-red-400 border-red-500/25', 'DELAYED'  ],
  'departed': ['bg-white/5 text-text3 border-white/10',         'DEPARTED' ],
  'gate-open':['bg-sky2/10 text-sky2 border-sky2/25',           'GATE OPEN'],
}

export default function Flights() {
  const { t } = useLang()
  const [now, setNow] = useState(new Date())
  const [tab, setTab] = useState('dep')
  useEffect(() => { const iv = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(iv) }, [])

  const onTime   = FLIGHTS.filter(f => ['on-time','gate-open'].includes(f.status)).length
  const boarding = FLIGHTS.filter(f => f.status === 'boarding').length
  const delayed  = FLIGHTS.filter(f => f.status === 'delayed').length

  return (
    <div className="relative min-h-screen" style={{ background:"var(--bg)" }}>
      <PlaneCanvas />

      <div className="relative z-10 pt-[110px] pb-8 px-4 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-end gap-4">
          <div>
            <p className="font-mono text-[0.65rem] tracking-widest text-text3 uppercase mb-3">Home / {t('nav_flights')}</p>
            <h1 className="font-display text-[clamp(3rem,6vw,5rem)] leading-none tracking-wide">{t('flights_title')}</h1>
            <p className="text-text2 text-sm mt-2">{t('flights_sub')}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 font-mono text-[0.65rem] text-agreen tracking-widest uppercase mb-2">
              <span className="live-dot w-2 h-2 rounded-full bg-agreen inline-block" />{t('live')}
            </div>
            <div className="font-display text-[3.5rem] text-gold leading-none">{now.toLocaleTimeString('en-GB',{hour12:false})}</div>
            <div className="font-mono text-[0.7rem] text-text3 tracking-widest mt-1">{now.toLocaleDateString('en-GB',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-4 md:px-12 pb-24 max-w-[1400px] mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {val:onTime,   lbl:t('on_time_today'), cls:'text-agreen'},
            {val:boarding, lbl:t('boarding_now'),  cls:'text-gold'  },
            {val:delayed,  lbl:t('delayed'),        cls:'text-red-400'},
            {val:FLIGHTS.length, lbl:t('total_today'), cls:'text-gold'},
          ].map((s,i)=>(
            <div key={i} className="relative bg-ink/85 backdrop-blur-xl border border-gold-faint rounded-md p-6 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold to-transparent" />
              <div className={`font-display text-[2rem] leading-none mb-1 ${s.cls}`}>{s.val}</div>
              <div className="font-mono text-[0.65rem] text-text3 uppercase tracking-widest">{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gold-faint mb-0">
          {[['dep',t('departures')],['arr',t('arrivals')]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)}
              className={`font-mono text-[0.72rem] tracking-widest uppercase px-6 py-3 border-b-2 -mb-px transition-all
                ${tab===k?'text-gold border-gold':'text-text3 border-transparent hover:text-text2'}`}>{l}</button>
          ))}
        </div>

        {/* Header row */}
        <div className="grid grid-cols-[70px_1fr_80px_80px] md:grid-cols-[90px_200px_1fr_110px_70px_90px_110px] gap-4 px-6 py-3 font-mono text-[0.62rem] tracking-widest uppercase text-text3 bg-ink1 border-x border-t border-gold-faint rounded-t-md">
          <span>{t('flight')}</span><span>{t('airline')}</span><span>{t('destination')}</span>
          <span>{t('departs')}</span><span>{t('gate')}</span><span>{t('terminal')}</span><span>{t('status')}</span>
        </div>

        {/* Rows */}
        <div className="border border-gold-faint rounded-b-md overflow-hidden">
          {FLIGHTS.map((f,i)=>{
            const [stCls, stLbl] = ST[f.status] || ['','']
            return (
              <motion.div key={f.num} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.04}}
                className={`grid grid-cols-[70px_1fr_80px_80px] md:grid-cols-[90px_200px_1fr_110px_70px_90px_110px] gap-4 px-6 py-4 border-b border-gold-faint items-center cursor-pointer transition-colors
                  ${f.status==='boarding'?'bg-gold/[0.03]':'bg-ink1/70'} hover:bg-ink2`}>
                <span className="font-display text-base text-gold tracking-wide">{f.num}</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-ink3 border border-gold-faint rounded flex items-center justify-center font-display text-xs text-gold flex-shrink-0">{f.code}</div>
                  <span className="text-sm truncate">{f.airline}</span>
                </div>
                <div>
                  <div className="font-mono text-[0.65rem] text-gold mb-0.5">{f.dest.match(/\(([^)]+)\)/)?.[1]||''}</div>
                  <div className="text-sm">{f.dest.replace(/\s*\([^)]+\)/,'')}</div>
                </div>
                <div>
                  <span className="font-display text-xl">{f.dep}</span>
                  {f.delay&&<div className="font-mono text-[0.65rem] text-red-400 mt-0.5">{f.delay}</div>}
                </div>
                <span className="font-mono text-sm text-text2">{f.gate}</span>
                <span className="font-mono text-xs text-text3">T{f.term}</span>
                <span className={`inline-block font-mono text-[0.62rem] tracking-widest uppercase px-3 py-1 border rounded-sm ${stCls}`}>{stLbl}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}
