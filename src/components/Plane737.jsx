import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Plane737() {
  const groupRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })

  useMemo(() => {
    const h = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 0.7
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.28
    }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime
    smooth.current.x += (mouse.current.x - smooth.current.x) * 0.03
    smooth.current.y += (mouse.current.y - smooth.current.y) * 0.03
    groupRef.current.rotation.y = t * 0.38 + smooth.current.x
    groupRef.current.rotation.x = Math.sin(t * 0.28) * 0.07 + smooth.current.y
    groupRef.current.rotation.z = Math.sin(t * 0.44) * 0.03
    groupRef.current.position.y = Math.sin(t * 0.55) * 0.32
  })

  const W  = { color:'#f4f4f4', metalness:0.55, roughness:0.25 }
  const B  = { color:'#073590', metalness:0.4,  roughness:0.3  }
  const DB = { color:'#041f6e', metalness:0.5,  roughness:0.25 }
  const Y  = { color:'#f5c200', metalness:0.3,  roughness:0.4  }
  const SL = { color:'#9a9a9a', metalness:0.95, roughness:0.08 }
  const DK = { color:'#222222', metalness:0.9,  roughness:0.15 }
  const GL = { color:'#4a8fb5', metalness:0.1,  roughness:0.05, transparent:true, opacity:0.75 }
  const RB = { color:'#111111', metalness:0.1,  roughness:0.9  }

  const wingR = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0.5,0); s.lineTo(-0.8,2.6); s.lineTo(-1.2,2.6); s.lineTo(0,0); s.closePath()
    return s
  }, [])
  const wingL = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0.5,0); s.lineTo(-0.8,-2.6); s.lineTo(-1.2,-2.6); s.lineTo(0,0); s.closePath()
    return s
  }, [])

  const fans = Array.from({length:16},(_,i)=>i)

  const M = (props) => <meshStandardMaterial {...props} />

  return (
    <group ref={groupRef}>
      {/* Fuselage */}
      <mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.32,0.22,6.2,36,1,false,0,Math.PI]}/><M {...W}/></mesh>
      <mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.32,0.22,6.2,36,1,false,Math.PI,Math.PI]}/><M {...B}/></mesh>
      <mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.325,0.225,6.2,36,1,false,Math.PI*0.85,Math.PI*0.3]}/><M {...B}/></mesh>

      {/* Nose */}
      <mesh position={[3.45,0,0]} rotation={[0,0,-Math.PI/2]}><sphereGeometry args={[0.32,24,16,0,Math.PI*2,0,Math.PI/2]}/><M {...W}/></mesh>
      <mesh position={[3.9,0,0]} rotation={[0,0,-Math.PI/2]}><coneGeometry args={[0.32,1.1,28]}/><M {...W}/></mesh>
      <mesh position={[3.9,0,0]} rotation={[0,0,-Math.PI/2]}><coneGeometry args={[0.32,1.1,28,1,false,Math.PI,Math.PI]}/><M {...B}/></mesh>

      {/* Tail */}
      <mesh position={[-3.8,0,0]} rotation={[0,0,Math.PI/2]}><coneGeometry args={[0.22,1.4,24]}/><M {...W}/></mesh>
      <mesh position={[-3.8,0,0]} rotation={[0,0,Math.PI/2]}><coneGeometry args={[0.22,1.4,24,1,false,Math.PI,Math.PI]}/><M {...B}/></mesh>
      <mesh position={[-4.45,0,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.045,0.04,0.18,10]}/><M {...SL}/></mesh>

      {/* Wings */}
      <mesh rotation={[Math.PI/2,0,0]} position={[0,-0.05,0]}><shapeGeometry args={[wingR]}/><M {...W}/></mesh>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-0.09,0]}><shapeGeometry args={[wingR]}/><M {...B}/></mesh>
      <mesh position={[-0.35,-0.02,1.15]} rotation={[0,0.18,0]}><boxGeometry args={[1.6,0.06,2.4]}/><M {...W}/></mesh>
      <mesh rotation={[Math.PI/2,0,0]} position={[0,-0.05,0]}><shapeGeometry args={[wingL]}/><M {...W}/></mesh>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-0.09,0]}><shapeGeometry args={[wingL]}/><M {...B}/></mesh>
      <mesh position={[-0.35,-0.02,-1.15]} rotation={[0,-0.18,0]}><boxGeometry args={[1.6,0.06,2.4]}/><M {...W}/></mesh>

      {/* Split Scimitar Winglets R */}
      <mesh position={[-1.05,0.32,2.52]} rotation={[0,0,0.15]}><boxGeometry args={[0.06,0.75,0.32]}/><M {...DB}/></mesh>
      <mesh position={[-1.05,-0.22,2.52]} rotation={[0,0,-0.25]}><boxGeometry args={[0.06,0.35,0.22]}/><M {...B}/></mesh>
      <mesh position={[-1.05,0.72,2.52]}><boxGeometry args={[0.08,0.08,0.34]}/><M {...Y}/></mesh>
      {/* Split Scimitar Winglets L */}
      <mesh position={[-1.05,0.32,-2.52]} rotation={[0,0,-0.15]}><boxGeometry args={[0.06,0.75,0.32]}/><M {...DB}/></mesh>
      <mesh position={[-1.05,-0.22,-2.52]} rotation={[0,0,0.25]}><boxGeometry args={[0.06,0.35,0.22]}/><M {...B}/></mesh>
      <mesh position={[-1.05,0.72,-2.52]}><boxGeometry args={[0.08,0.08,0.34]}/><M {...Y}/></mesh>

      {/* H-stabs */}
      {[1,-1].map(s=>(
        <group key={s}>
          <mesh position={[-3.1,0.12,s*0.52]} rotation={[0,s*0.1,0]}><boxGeometry args={[1.5,0.055,0.62]}/><M {...W}/></mesh>
          <mesh position={[-3.1,0.08,s*0.52]} rotation={[0,s*0.1,0]}><boxGeometry args={[1.5,0.055,0.62]}/><M {...B}/></mesh>
        </group>
      ))}

      {/* Vertical fin */}
      <mesh position={[-2.6,0.82,0]}><boxGeometry args={[1.45,1.1,0.07]}/><M {...B}/></mesh>
      <mesh position={[-2.55,0.85,0]}><boxGeometry args={[1.0,0.85,0.09]}/><M {...DB}/></mesh>
      <mesh position={[-2.0,0.82,0]}><boxGeometry args={[0.12,1.1,0.09]}/><M {...Y}/></mesh>

      {/* CFM LEAP-1B Engines */}
      {[1,-1].map(s=>(
        <group key={s}>
          <mesh position={[0.05,-0.38,s*0.92]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.265,0.245,1.35,28]}/><M {...SL}/></mesh>
          <mesh position={[0.05,-0.625,s*0.92]}><boxGeometry args={[1.38,0.06,0.55]}/><M {...SL}/></mesh>
          <mesh position={[0.63,-0.38,s*0.92]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[0.265,0.048,10,28]}/><M {...Y}/></mesh>
          <mesh position={[0.62,-0.38,s*0.92]} rotation={[0,Math.PI/2,0]}><circleGeometry args={[0.22,24]}/><M {...DK}/></mesh>
          {fans.map(i=>(
            <mesh key={i}
              position={[0.625, -0.38+Math.cos(i/16*Math.PI*2)*0.1, s*0.92+Math.sin(i/16*Math.PI*2)*0.1]}
              rotation={[i/16*Math.PI*2, Math.PI/2, 0]}>
              <boxGeometry args={[0.005,0.19,0.03]}/><M {...SL}/>
            </mesh>
          ))}
          <mesh position={[-0.71,-0.38,s*0.92]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.22,0.2,0.18,24]}/><M {...DK}/></mesh>
          <mesh position={[0.08,-0.2,s*0.92]}><boxGeometry args={[0.42,0.22,0.1]}/><M {...W}/></mesh>
        </group>
      ))}

      {/* Landing gear */}
      <mesh position={[2.5,-0.42,0]}><cylinderGeometry args={[0.055,0.05,0.22,10]}/><M {...RB}/></mesh>
      <mesh position={[2.5,-0.54,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[0.065,0.028,8,16]}/><M {...RB}/></mesh>
      {[-0.18,0.18].map(z=>(
        <group key={z}>
          <mesh position={[-0.2,-0.44,z]}><cylinderGeometry args={[0.055,0.05,0.28,10]}/><M {...SL}/></mesh>
          <mesh position={[-0.2,-0.59,z]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[0.08,0.035,8,16]}/><M {...RB}/></mesh>
        </group>
      ))}

      {/* Cockpit windows */}
      {[[3.22,0.16,0.16,-0.35],[3.22,0.16,-0.16,0.35],[3.05,0.18,0.22,-0.6],[3.05,0.18,-0.22,0.6]].map(([x,y,z,ry],i)=>(
        <mesh key={i} position={[x,y,z]} rotation={[0,ry,0]}><boxGeometry args={[0.22,0.13,0.04]}/><M {...GL}/></mesh>
      ))}

      {/* Passenger windows */}
      {Array.from({length:20},(_,i)=>2.6-i*0.3).filter(wx=>wx>-2.6).flatMap((wx,i)=>
        [1,-1].map(s=>(
          <mesh key={`${i}${s}`} position={[wx,0.18,s*0.326]}><boxGeometry args={[0.09,0.1,0.04]}/><M {...GL}/></mesh>
        ))
      )}

      {/* Belly fairing */}
      <mesh position={[-0.1,-0.36,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.09,0.07,2.2,16]}/><M {...W}/></mesh>

      {/* Antenna */}
      <mesh position={[0.5,0.34,0]}><cylinderGeometry args={[0.015,0.012,0.18,8]}/><M {...W}/></mesh>

      {/* Nav lights */}
      <mesh position={[-1.0,-0.02,2.55]}><sphereGeometry args={[0.04,8,8]}/><meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={1.5}/></mesh>
      <mesh position={[-1.0,-0.02,-2.55]}><sphereGeometry args={[0.04,8,8]}/><meshStandardMaterial color="#ff2200" emissive="#ff2200" emissiveIntensity={1.5}/></mesh>
      <mesh position={[-4.48,0.08,0]}><sphereGeometry args={[0.035,8,8]}/><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2}/></mesh>
    </group>
  )
}
