import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

export default function PlaneCanvas() {
  const { dark } = useTheme()

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Sky gradient */}
      <div className="absolute inset-0 transition-all duration-700"
        style={{
          background: dark
            ? 'linear-gradient(180deg, #0a0e1a 0%, #0d1529 35%, #1a2a4a 70%, #0d1529 100%)'
            : 'linear-gradient(180deg, #87ceeb 0%, #b8dff5 30%, #d4eef9 60%, #f0f8ff 85%, #ffe8b0 100%)'
        }}
      />

      {/* Sun — light mode only */}
      {!dark && <Sun />}

      {/* Moon + stars — dark mode */}
      {dark && <NightSky />}

      {/* Clouds layer BEHIND plane */}
      <CloudLayer dark={dark} behind />

      {/* THE PLANE — 3D CSS rotating */}
      <Plane360 dark={dark} />

      {/* Clouds layer IN FRONT of plane (bottom/foreground) */}
      <CloudLayer dark={dark} behind={false} />

      {/* Atmosphere haze at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: dark
            ? 'linear-gradient(to top, rgba(10,14,26,0.8), transparent)'
            : 'linear-gradient(to top, rgba(240,248,255,0.6), transparent)'
        }}
      />
    </div>
  )
}

/* ── SUN ── */
function Sun() {
  return (
    <div className="absolute" style={{ top:'12%', right:'18%' }}>
      {/* Outer glow rings */}
      {[160, 120, 90].map((s, i) => (
        <div key={i} className="absolute rounded-full"
          style={{
            width: s, height: s,
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            background: `radial-gradient(circle, rgba(255,220,80,${0.08 - i*0.02}) 0%, transparent 70%)`,
          }}
        />
      ))}
      {/* Sun disc */}
      <div className="relative rounded-full"
        style={{
          width: 64, height: 64,
          background: 'radial-gradient(circle at 40% 40%, #fff176, #ffd600)',
          boxShadow: '0 0 40px 20px rgba(255,214,0,0.35), 0 0 80px 40px rgba(255,180,0,0.15)',
        }}
      />
      {/* Light rays */}
      {Array.from({length:12},(_,i)=>(
        <div key={i} className="absolute"
          style={{
            width: 2, height: 30 + (i%3)*12,
            top:'50%', left:'50%',
            transform: `translate(-50%,-50%) rotate(${i*30}deg) translateY(-52px)`,
            background: 'linear-gradient(to bottom, rgba(255,220,50,0.6), transparent)',
            borderRadius: 4,
          }}
        />
      ))}
    </div>
  )
}

/* ── NIGHT SKY ── */
function NightSky() {
  const stars = Array.from({length:120}, (_, i) => ({
    x: Math.random()*100, y: Math.random()*70,
    s: Math.random()*2+0.5,
    o: Math.random()*0.7+0.2,
    dur: 2+Math.random()*4,
    del: Math.random()*5,
  }))
  return (
    <>
      {/* Moon */}
      <div className="absolute" style={{top:'10%', right:'15%'}}>
        <div style={{
          width:54, height:54, borderRadius:'50%',
          background:'radial-gradient(circle at 38% 35%, #fffde7, #f5e642, #e6c800)',
          boxShadow:'0 0 30px 12px rgba(255,235,100,0.25)',
        }}/>
        {/* Crater details */}
        <div className="absolute rounded-full" style={{width:10,height:10,top:'28%',left:'52%',background:'rgba(0,0,0,0.08)'}}/>
        <div className="absolute rounded-full" style={{width:7,height:7,top:'55%',left:'35%',background:'rgba(0,0,0,0.07)'}}/>
      </div>
      {/* Stars */}
      {stars.map((s,i)=>(
        <div key={i} className="absolute rounded-full bg-white"
          style={{
            left:`${s.x}%`, top:`${s.y}%`,
            width:s.s, height:s.s,
            opacity:s.o,
            animation:`twinkle ${s.dur}s ease-in-out infinite`,
            animationDelay:`${s.del}s`,
          }}
        />
      ))}
    </>
  )
}

/* ── CLOUDS ── */
function CloudLayer({ dark, behind }) {
  const clouds = behind
    ? [
        { x:'5%',  y:'20%', w:280, h:90,  opacity:dark?0.06:0.85, blur:dark?12:6,  speed:45 },
        { x:'55%', y:'12%', w:340, h:110, opacity:dark?0.05:0.78, blur:dark?14:5,  speed:55 },
        { x:'78%', y:'30%', w:220, h:75,  opacity:dark?0.04:0.65, blur:dark?10:7,  speed:38 },
        { x:'30%', y:'8%',  w:200, h:65,  opacity:dark?0.05:0.70, blur:dark?12:6,  speed:50 },
      ]
    : [
        { x:'-5%', y:'60%', w:380, h:130, opacity:dark?0.04:0.90, blur:dark?16:4,  speed:60 },
        { x:'45%', y:'68%', w:300, h:100, opacity:dark?0.03:0.82, blur:dark?14:5,  speed:48 },
        { x:'75%', y:'62%', w:260, h:90,  opacity:dark?0.04:0.75, blur:dark?12:6,  speed:42 },
      ]

  return (
    <>
      {clouds.map((c, i) => (
        <div key={i} className="absolute"
          style={{
            left: c.x, top: c.y,
            width: c.w, height: c.h,
            opacity: c.opacity,
            animation: `cloudDrift ${c.speed}s linear infinite`,
            animationDelay: `${-i * (c.speed/clouds.length)}s`,
          }}>
          <CloudShape dark={dark} blur={c.blur} />
        </div>
      ))}
      <style>{`
        @keyframes cloudDrift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(${behind ? '15vw' : '8vw'}); }
        }
      `}</style>
    </>
  )
}

function CloudShape({ dark, blur }) {
  const color = dark ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.95)'
  return (
    <div className="relative w-full h-full">
      {/* Main puffs */}
      {[
        { l:'10%', t:'40%', w:'50%', h:'70%' },
        { l:'28%', t:'20%', w:'44%', h:'80%' },
        { l:'50%', t:'35%', w:'40%', h:'65%' },
        { l:'0%',  t:'50%', w:'35%', h:'55%' },
        { l:'65%', t:'45%', w:'35%', h:'55%' },
      ].map((p, i) => (
        <div key={i} className="absolute rounded-full"
          style={{
            left:p.l, top:p.t, width:p.w, height:p.h,
            background: color,
            filter: `blur(${blur}px)`,
          }}
        />
      ))}
    </div>
  )
}

/* ── 3D ROTATING PLANE ── */
function Plane360({ dark }) {
  const ref  = useRef(null)
  const mouse = useRef({ x:0, y:0 })
  const cur   = useRef({ rotY:0, rotX:0 })
  const raf   = useRef(null)

  useEffect(() => {
    const onMove = e => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 25
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 10
    }
    window.addEventListener('mousemove', onMove)

    let t = 0
    const animate = () => {
      t += 0.006
      if (ref.current) {
        // Continuous 360° Y rotation + mouse influence
        const targetY = (t * 28) % 360 + mouse.current.x
        const targetX = mouse.current.y * 0.4
        cur.current.rotY += (targetY - cur.current.rotY) * 0.015
        cur.current.rotX += (targetX - cur.current.rotX) * 0.04

        const floatY = Math.sin(t * 0.7) * 18

        ref.current.style.transform = `
          perspective(1100px)
          rotateY(${cur.current.rotY}deg)
          rotateX(${cur.current.rotX}deg)
          translateY(${floatY}px)
        `
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex: 10 }}>
      <div
        ref={ref}
        style={{
          width: 'min(820px, 80vw)',
          willChange: 'transform',
          transformStyle: 'preserve-3d',
          filter: dark
            ? 'drop-shadow(0 30px 60px rgba(7,53,144,0.5)) drop-shadow(0 8px 24px rgba(0,0,0,0.6))'
            : 'drop-shadow(0 30px 50px rgba(7,53,144,0.25)) drop-shadow(0 12px 30px rgba(0,0,0,0.2))',
          transition: 'filter 0.5s',
        }}
      >
        <img
          src="/plane.png"
          alt="Boeing 737-8 MAX Ryanair"
          className="w-full h-auto select-none"
          draggable={false}
          style={{ display:'block' }}
        />
      </div>
    </div>
  )
}
