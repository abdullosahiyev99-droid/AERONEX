import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PlaneCanvas from '../components/PlaneCanvas'
import Footer from '../components/Footer'
import { useLang } from '../hooks/useLang.jsx'

const TAKEN = new Set([2,5,8,11,14,19,23,28,31,35,40,44,47,52,55,58,61,63,68,72,77,80,83,88,91])
const EXITS  = new Set([7,14])

function buildMap() {
  const seats = []; let idx = 0
  for (let row = 1; row <= 4; row++) {
    for (const col of ['A','B',null,'D','E','F']) {
      if (!col) { seats.push({id:null,type:'spacer'}); continue }
      seats.push({id:`${row}${col}`,row,col,type:TAKEN.has(idx)?'taken':'business'}); idx++
    }
  }
  for (let row = 10; row <= 28; row++) {
    for (const col of ['A','B','C','D','E','F']) {
      const exit = EXITS.has(row-9)
      seats.push({id:`${row}${col}`,row,col,type:TAKEN.has(idx)?'taken':exit?'exit':'avail'}); idx++
    }
  }
  return seats
}
const MAP = buildMap()

const SEAT_CLS = {
  taken:    'bg-ink3 border-gold-faint text-text3 cursor-not-allowed opacity-40',
  avail:    'bg-gold/10 border-gold-mid text-gold cursor-pointer hover:bg-gold/30 hover:scale-110 transition-all',
  exit:     'bg-agreen/10 border-agreen/30 text-agreen cursor-pointer hover:bg-agreen/25 hover:scale-110 transition-all',
  business: 'bg-rblue/20 border-rblue/50 text-sky2 cursor-pointer hover:bg-rblue/35 hover:scale-110 transition-all',
  selected: 'bg-gold border-gold text-ink font-bold scale-110 cursor-pointer',
  spacer:   'invisible pointer-events-none',
}

export default function CheckIn() {
  const { t } = useLang()
  const [step, setStep] = useState(1)
  const [seat, setSeat] = useState(null)
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('KARIMOV')

  return (
    <div className="relative min-h-screen" style={{ background:"var(--bg)" }}>
      <PlaneCanvas />

      <div className="relative z-10 pt-[110px] pb-6 px-4 md:px-12">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-[0.65rem] tracking-widest text-text3 uppercase mb-3">Home / {t('nav_checkin')}</p>
          <h1 className="font-display text-[clamp(3rem,6vw,5rem)] leading-none tracking-wide">{t('checkin_title')}</h1>
          <p className="text-text2 text-sm mt-2">{t('checkin_sub')}</p>
        </div>
      </div>

      {/* Steps */}
      <div className="relative z-10 px-4 md:px-12 pb-6 max-w-5xl mx-auto">
        <div className="flex items-center">
          {[1,2,3].map((s,i)=>(
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm border transition-all
                  ${step>s?'bg-agreen/15 border-agreen/40 text-agreen':step===s?'bg-gold border-gold text-ink font-bold':'bg-ink2 border-gold-faint text-text3'}`}>
                  {step>s?'✓':s}
                </div>
                <div>
                  <div className={`font-mono text-[0.6rem] tracking-widest uppercase ${step===s?'text-gold':'text-text3'}`}>{t(`step${s}`)}</div>
                  <div className={`text-sm ${step===s?'text-text':'text-text2'}`}>{t(`step${s}_name`)}</div>
                </div>
              </div>
              {i<2&&<div className={`flex-1 h-px mx-6 transition-colors ${step>s?'bg-gold/40':'bg-gold-faint'}`}/>}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-4 md:px-12 pb-24 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">

        {/* Main panel */}
        <div>
          <AnimatePresence mode="wait">

            {/* STEP 1 */}
            {step===1&&(
              <motion.div key="s1" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}}
                className="bg-ink/85 backdrop-blur-xl border border-gold-faint rounded-md p-8">
                <h2 className="font-display text-2xl tracking-wide mb-6 flex items-center gap-3">
                  <span className="w-1 h-6 bg-gold rounded-sm flex-shrink-0"/>{t('step1_name')}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {label:t('booking_ref'), type:'text',  val:'AERXTZ',         ph:'AERXTZ'},
                    {label:t('last_name'),   type:'text',  val:lname,            ph:'Surname', onChange:setLname},
                    {label:t('first_name'),  type:'text',  val:fname,            ph:'First name', onChange:setFname},
                    {label:t('nationality'), type:'select'},
                    {label:t('passport'),    type:'text',  val:'',               ph:'AA1234567'},
                    {label:t('dob'),         type:'date',  val:'1990-01-15'},
                  ].map((f,i)=>(
                    <div key={i}>
                      <label className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-text3 block mb-2">{f.label}</label>
                      {f.type==='select'?(
                        <select className="w-full bg-ink2 border border-gold-faint text-text px-4 py-3 rounded-sm font-body text-sm outline-none focus:border-gold transition-colors">
                          {['Uzbekistan','Russia','Kazakhstan','USA','UK','Germany'].map(n=><option key={n}>{n}</option>)}
                        </select>
                      ):(
                        <input type={f.type} defaultValue={f.val} placeholder={f.ph||''}
                          onChange={f.onChange?e=>f.onChange(e.target.value):undefined}
                          className="w-full bg-ink2 border border-gold-faint text-text px-4 py-3 rounded-sm font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-text3"/>
                      )}
                    </div>
                  ))}
                  <div className="col-span-2">
                    <label className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-text3 block mb-2">{t('email')}</label>
                    <input type="email" defaultValue="karimov@example.com" className="w-full bg-ink2 border border-gold-faint text-text px-4 py-3 rounded-sm font-body text-sm outline-none focus:border-gold transition-colors"/>
                  </div>
                </div>
                <button onClick={()=>setStep(2)} className="mt-6 w-full bg-gold text-ink font-display text-lg tracking-widest py-4 rounded-sm hover:bg-gold2 hover:-translate-y-0.5 transition-all">
                  {t('continue_btn')}
                </button>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step===2&&(
              <motion.div key="s2" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}}
                className="bg-ink/85 backdrop-blur-xl border border-gold-faint rounded-md p-8">
                <h2 className="font-display text-2xl tracking-wide mb-6 flex items-center gap-3">
                  <span className="w-1 h-6 bg-gold rounded-sm flex-shrink-0"/>{t('step2_name')}
                </h2>
                {/* Legend */}
                <div className="flex gap-5 mb-5 flex-wrap">
                  {[['bg-gold/10 border-gold-mid',t('avail')],['bg-ink3 border-gold-faint opacity-40',t('taken')],['bg-agreen/10 border-agreen/30 text-agreen',t('exit_row')],['bg-rblue/20 border-rblue/50 text-sky2','Business'],['bg-gold border-gold text-ink',t('your_seat')]].map(([cls,lbl],i)=>(
                    <div key={i} className="flex items-center gap-2 text-xs text-text2">
                      <div className={`w-4 h-4 rounded border ${cls}`}/>{lbl}
                    </div>
                  ))}
                </div>
                {/* Map */}
                <div className="overflow-y-auto max-h-[420px]">
                  <div className="grid grid-cols-[28px_repeat(6,30px)] gap-[4px] mb-2 justify-center">
                    <div/>{['A','B','C','D','E','F'].map(c=><div key={c} className="text-center font-mono text-[0.62rem] text-text3">{c}</div>)}
                  </div>
                  {Array.from({length:Math.ceil(MAP.length/6)},(_,ri)=>{
                    const row = MAP.slice(ri*6,ri*6+6)
                    const rn = row.find(s=>s.row)?.row
                    return (
                      <div key={ri} className="grid grid-cols-[28px_repeat(6,30px)] gap-[4px] mb-[4px] justify-center items-center">
                        <div className="font-mono text-[0.6rem] text-text3 text-center">{rn||''}</div>
                        {row.map((s,si)=>{
                          if(!s.id) return <div key={si} className="w-[30px] h-[26px] invisible"/>
                          const sel = seat===s.id
                          return (
                            <button key={s.id} disabled={s.type==='taken'}
                              onClick={()=>s.type!=='taken'&&setSeat(s.id)}
                              className={`w-[30px] h-[26px] rounded-[3px_3px_5px_5px] text-[0.55rem] border flex items-center justify-center ${sel?SEAT_CLS.selected:SEAT_CLS[s.type]||SEAT_CLS.avail}`}>
                              {sel?'★':''}
                            </button>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
                <button onClick={()=>seat&&setStep(3)} disabled={!seat}
                  className={`mt-6 w-full font-display text-lg tracking-widest py-4 rounded-sm transition-all ${seat?'bg-gold text-ink hover:bg-gold2 hover:-translate-y-0.5':'bg-ink3 text-text3 cursor-not-allowed'}`}>
                  {t('confirm_seat')}
                </button>
              </motion.div>
            )}

            {/* STEP 3 — Boarding Pass */}
            {step===3&&(
              <motion.div key="s3" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
                className="bg-ink/85 backdrop-blur-xl border border-gold-faint rounded-md p-8">
                <h2 className="font-display text-2xl tracking-wide mb-6 flex items-center gap-3">
                  <span className="w-1 h-6 bg-gold rounded-sm flex-shrink-0"/>{t('step3_name')}
                </h2>
                <div className="bg-ink1 border border-gold/25 rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-gold/10 to-gold/5 px-6 py-4 border-b border-dashed border-gold/20 flex justify-between items-start">
                    <div>
                      <div className="font-display text-2xl tracking-widest text-gradient-gold">AERONEX</div>
                      <div className="font-mono text-[0.65rem] tracking-[0.15em] text-text3 mt-1">{t('boarding_pass')}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[0.65rem] text-text3">FLIGHT</div>
                      <div className="font-display text-2xl text-gold">HY 501</div>
                    </div>
                  </div>
                  <div className="px-6 py-5 border-b border-dashed border-gold/20 flex items-center justify-between">
                    <div><div className="font-display text-[3rem] text-gold leading-none">TAS</div><div className="text-xs text-text2 mt-1">Tashkent</div><div className="font-mono text-sm mt-1">08:30</div></div>
                    <div className="flex flex-col items-center gap-1"><div className="text-2xl">✈</div><div className="font-mono text-[0.65rem] text-text3">3h 15m</div></div>
                    <div className="text-right"><div className="font-display text-[3rem] text-gold leading-none">DXB</div><div className="text-xs text-text2 mt-1">Dubai</div><div className="font-mono text-sm mt-1">10:45</div></div>
                  </div>
                  <div className="grid grid-cols-4 border-b border-dashed border-gold/20">
                    {[
                      {label:t('passenger'), value:`${fname||'PASSENGER'} ${lname}`},
                      {label:t('seat'),      value:seat, big:true},
                      {label:t('gate'),      value:'A7'},
                      {label:t('boarding'),  value:'08:00'},
                    ].map((d,i)=>(
                      <div key={i} className="px-5 py-4 border-r border-gold/10 last:border-0">
                        <div className="font-mono text-[0.6rem] tracking-widest text-text3 uppercase mb-1">{d.label}</div>
                        <div className={`font-display ${d.big?'text-3xl text-gold':'text-lg'}`}>{d.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 py-4 text-center">
                    <div className="flex gap-[2px] items-end justify-center">
                      {[40,20,50,15,60,25,35,55,20,45,30,50,15,40,25,60,20,35,50,25,40,15,55,30,45].map((h,i)=>(
                        <div key={i} style={{height:h}} className="w-[3px] bg-gold rounded-sm"/>
                      ))}
                    </div>
                    <div className="font-mono text-[0.65rem] text-text3 tracking-[0.2em] mt-2">AERXTZ</div>
                  </div>
                </div>
                <button className="mt-4 w-full bg-transparent border border-gold-mid text-gold font-display text-base tracking-widest py-3 rounded-sm hover:bg-gold/10 transition-all">
                  {t('print_bp')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Summary panel */}
        <div className="bg-ink/85 backdrop-blur-xl border border-gold-faint rounded-md p-6 h-fit sticky top-[90px]">
          <h3 className="font-display text-xl tracking-wide mb-5">{t('your_flight')}</h3>
          <div className="border border-gold-faint rounded p-4 mb-5">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gold-faint">
              <span className="font-display text-lg text-gold">HY 501</span>
              <span className="font-mono text-[0.65rem] text-agreen">{t('on_time')}</span>
            </div>
            <div className="flex items-center justify-between">
              <div><div className="font-display text-[2rem] text-gold leading-none">TAS</div><div className="text-xs text-text2">Tashkent</div><div className="font-mono text-sm mt-1">08:30</div></div>
              <div className="flex flex-col items-center gap-1 text-text3"><div>✈</div><div className="font-mono text-[0.65rem]">3h 15m</div></div>
              <div className="text-right"><div className="font-display text-[2rem] text-gold leading-none">DXB</div><div className="text-xs text-text2">Dubai</div><div className="font-mono text-sm mt-1">10:45</div></div>
            </div>
          </div>
          {[
            [t('date'),'15 Jun 2025'],[t('aircraft'),'Boeing 737 MAX'],
            ['Terminal','1'],[t('gate'),'A7'],[t('class'),t('economy')],
            [t('sel_seat'),seat||t('not_sel')],
          ].map(([l,v])=>(
            <div key={l} className="flex justify-between text-sm mb-3">
              <span className="text-text2">{l}</span>
              <span className={seat&&v===seat?'text-gold font-medium':'font-medium'}>{v}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 border-t border-gold-faint font-display text-xl mb-5">
            <span className="text-sm text-text2 font-body">{t('ticket_price')}</span>
            <span className="text-gold">$189</span>
          </div>
          <button
            onClick={step===1?()=>setStep(2):step===2?()=>seat&&setStep(3):undefined}
            className="w-full bg-gold text-ink font-display text-base tracking-widest py-3 rounded-sm hover:bg-gold2 transition-all">
            {step===1?t('start_checkin'):step===2?t('confirm_seat'):t('print_bp')}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
