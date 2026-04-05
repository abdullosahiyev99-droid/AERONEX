import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/* ── Materials ─────────────────────────────────────────── */
function useMaterials() {
  return useMemo(() => ({
    white:  new THREE.MeshStandardMaterial({ color: 0xf4f4f4, metalness: 0.55, roughness: 0.25 }),
    blue:   new THREE.MeshStandardMaterial({ color: 0x073590, metalness: 0.4,  roughness: 0.3  }),
    darkB:  new THREE.MeshStandardMaterial({ color: 0x041f6e, metalness: 0.5,  roughness: 0.25 }),
    yellow: new THREE.MeshStandardMaterial({ color: 0xf5c200, metalness: 0.3,  roughness: 0.4  }),
    silver: new THREE.MeshStandardMaterial({ color: 0x9a9a9a, metalness: 0.95, roughness: 0.08 }),
    dark:   new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.9,  roughness: 0.15 }),
    glass:  new THREE.MeshStandardMaterial({ color: 0x4a8fb5, metalness: 0.1,  roughness: 0.05, transparent: true, opacity: 0.75 }),
    rubber: new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.1,  roughness: 0.9  }),
    navG:   new THREE.MeshStandardMaterial({ color: 0x00ff44, emissive: new THREE.Color(0x00ff44), emissiveIntensity: 1.5 }),
    navR:   new THREE.MeshStandardMaterial({ color: 0xff2200, emissive: new THREE.Color(0xff2200), emissiveIntensity: 1.5 }),
    strobe: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: new THREE.Color(0xffffff), emissiveIntensity: 2   }),
  }), [])
}

/* ── Boeing 737-8 MAX — Ryanair livery ─────────────────── */
function Ryanair737({ mouseRef }) {
  const groupRef = useRef()
  const mat = useMaterials()

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    const mx = mouseRef?.current?.x ?? 0
    const my = mouseRef?.current?.y ?? 0
    groupRef.current.rotation.y  = t * 0.38 + mx * 0.65
    groupRef.current.rotation.x  = Math.sin(t * 0.28) * 0.07 + my * 0.26
    groupRef.current.rotation.z  = Math.sin(t * 0.44) * 0.03
    groupRef.current.position.y  = Math.sin(t * 0.55) * 0.32
  })

  const wingShape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo( 0.5,  0)
    s.lineTo(-0.8,  2.6)
    s.lineTo(-1.2,  2.6)
    s.lineTo( 0.0,  0)
    s.closePath()
    return s
  }, [])

  return (
    <group ref={groupRef}>
      {/* ── Fuselage ── */}
      <mesh material={mat.white} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.32, 0.22, 6.2, 36, 1, false, 0, Math.PI]} />
      </mesh>
      <mesh material={mat.blue} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.32, 0.22, 6.2, 36, 1, false, Math.PI, Math.PI]} />
      </mesh>
      {/* cheatline */}
      <mesh material={mat.blue} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.324, 0.224, 6.2, 36, 1, false, Math.PI * 0.85, Math.PI * 0.3]} />
      </mesh>

      {/* ── Nose ── */}
      <mesh material={mat.white} position={[3.9, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.32, 1.1, 28]} />
      </mesh>
      <mesh material={mat.blue} position={[3.9, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.32, 1.1, 28, 1, false, Math.PI, Math.PI]} />
      </mesh>

      {/* ── Tail cone ── */}
      <mesh material={mat.white} position={[-3.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.22, 1.4, 24]} />
      </mesh>
      <mesh material={mat.blue} position={[-3.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.22, 1.4, 24, 1, false, Math.PI, Math.PI]} />
      </mesh>
      {/* APU */}
      <mesh material={mat.silver} position={[-4.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.04, 0.18, 10]} />
      </mesh>

      {/* ── Wings ── */}
      {[-1, 1].map(side => (
        <group key={side}>
          <mesh material={mat.white} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
            <shapeGeometry args={[wingShape]} />
          </mesh>
          <mesh material={mat.blue} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
            <shapeGeometry args={[wingShape]} />
          </mesh>
          <mesh material={mat.white} position={[-0.35, -0.02, side * 1.15]} rotation={[0, side * 0.18, 0]}>
            <boxGeometry args={[1.6, 0.06, 2.4]} />
          </mesh>

          {/* Split scimitar winglet — up */}
          <mesh material={mat.darkB} position={[-1.05, 0.32, side * 2.52]} rotation={[0, 0, side * 0.15]}>
            <boxGeometry args={[0.06, 0.75, 0.32]} />
          </mesh>
          {/* Split scimitar — down */}
          <mesh material={mat.blue} position={[-1.05, -0.22, side * 2.52]} rotation={[0, 0, side * -0.25]}>
            <boxGeometry args={[0.06, 0.35, 0.22]} />
          </mesh>
          {/* Winglet tip yellow */}
          <mesh material={mat.yellow} position={[-1.05, 0.72, side * 2.52]}>
            <boxGeometry args={[0.08, 0.08, 0.34]} />
          </mesh>

          {/* Horizontal stabilizer */}
          <mesh material={mat.white} position={[-3.1, 0.12, side * 0.52]} rotation={[0, side * 0.1, 0]}>
            <boxGeometry args={[1.5, 0.055, 0.62]} />
          </mesh>

          {/* CFM LEAP-1B Engine */}
          <group position={[0.05, -0.38, side * 0.92]}>
            <mesh material={mat.silver} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.265, 0.245, 1.35, 28]} />
            </mesh>
            {/* Flat bottom (737 MAX signature) */}
            <mesh material={mat.silver} position={[0, -0.245, 0]}>
              <boxGeometry args={[1.38, 0.06, 0.55]} />
            </mesh>
            {/* Inlet ring */}
            <mesh material={mat.yellow} position={[0.58, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.265, 0.048, 10, 28]} />
            </mesh>
            {/* Fan face */}
            <mesh material={mat.dark} position={[0.57, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <circleGeometry args={[0.22, 24]} />
            </mesh>
            {/* Fan blades */}
            {Array.from({ length: 16 }).map((_, b) => (
              <mesh
                key={b}
                material={mat.silver}
                position={[
                  0.575,
                  Math.sin((b / 16) * Math.PI * 2) * 0.1,
                  Math.cos((b / 16) * Math.PI * 2) * 0.1,
                ]}
                rotation={[(b / 16) * Math.PI * 2, Math.PI / 2, 0]}
              >
                <boxGeometry args={[0.005, 0.19, 0.035]} />
              </mesh>
            ))}
            {/* Exhaust */}
            <mesh material={mat.dark} position={[-0.76, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.22, 0.2, 0.18, 24]} />
            </mesh>
            {/* Pylon */}
            <mesh material={mat.white} position={[0.08, -0.18, 0]}>
              <boxGeometry args={[0.42, 0.22, 0.1]} />
            </mesh>
          </group>

          {/* Nav lights */}
          <mesh material={side === 1 ? mat.navG : mat.navR} position={[-1.0, -0.02, side * 2.55]}>
            <sphereGeometry args={[0.04, 8, 8]} />
          </mesh>
        </group>
      ))}

      {/* ── Vertical stabilizer ── */}
      <mesh material={mat.blue} position={[-2.6, 0.82, 0]}>
        <boxGeometry args={[1.45, 1.1, 0.07]} />
      </mesh>
      <mesh material={mat.darkB} position={[-2.55, 0.85, 0]}>
        <boxGeometry args={[1.0, 0.85, 0.09]} />
      </mesh>
      {/* Yellow leading edge */}
      <mesh material={mat.yellow} position={[-2.0, 0.82, 0]}>
        <boxGeometry args={[0.12, 1.1, 0.09]} />
      </mesh>

      {/* ── Landing gear ── */}
      <mesh material={mat.rubber} position={[2.5, -0.42, 0]}>
        <cylinderGeometry args={[0.055, 0.05, 0.22, 10]} />
      </mesh>
      <mesh material={mat.rubber} position={[2.5, -0.54, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.065, 0.028, 8, 16]} />
      </mesh>
      {[-0.18, 0.18].map(z => (
        <group key={z}>
          <mesh material={mat.silver} position={[-0.2, -0.44, z]}>
            <cylinderGeometry args={[0.055, 0.05, 0.28, 10]} />
          </mesh>
          <mesh material={mat.rubber} position={[-0.2, -0.59, z]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.08, 0.035, 8, 16]} />
          </mesh>
        </group>
      ))}

      {/* ── Cockpit windows ── */}
      {[
        [3.22, 0.16,  0.16, -0.35],
        [3.22, 0.16, -0.16,  0.35],
        [3.05, 0.18,  0.22, -0.6 ],
        [3.05, 0.18, -0.22,  0.6 ],
      ].map(([x, y, z, ry], i) => (
        <mesh key={i} material={mat.glass} position={[x, y, z]} rotation={[0, ry, 0]}>
          <boxGeometry args={[0.22, 0.13, 0.04]} />
        </mesh>
      ))}

      {/* ── Passenger windows ── */}
      {Array.from({ length: 22 }).map((_, i) => {
        const wx = 2.6 - i * 0.29
        if (wx < -2.6) return null
        return [1, -1].map(side => (
          <mesh key={`${i}-${side}`} material={mat.glass} position={[wx, 0.18, side * 0.326]}>
            <boxGeometry args={[0.09, 0.1, 0.04]} />
          </mesh>
        ))
      })}

      {/* ── Belly fairing ── */}
      <mesh material={mat.white} position={[-0.1, -0.36, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.07, 2.2, 16]} />
      </mesh>

      {/* ── Antenna ── */}
      <mesh material={mat.white} position={[0.5, 0.34, 0]}>
        <cylinderGeometry args={[0.015, 0.012, 0.18, 8]} />
      </mesh>

      {/* ── Tail strobe ── */}
      <mesh material={mat.strobe} position={[-4.48, 0.08, 0]}>
        <sphereGeometry args={[0.035, 8, 8]} />
      </mesh>
    </group>
  )
}

/* ── Stars background ──────────────────────────────────── */
function Stars() {
  const geo = useMemo(() => {
    const verts = []
    for (let i = 0; i < 2000; i++) {
      verts.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200
      )
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3))
    return g
  }, [])

  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.008
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={0xf0ede8} size={0.11} transparent opacity={0.4} />
    </points>
  )
}

/* ── Grid ──────────────────────────────────────────────── */
function Grid() {
  return (
    <gridHelper
      args={[80, 60, 0x073590, 0x0a1020]}
      position={[0, -3.5, 0]}
      material-transparent
      material-opacity={0.18}
    />
  )
}

/* ── Main export ───────────────────────────────────────── */
export default function Plane3D({ mouseRef }) {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 13], fov: 45 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.35} />
      <directionalLight color={0xfff8e7} intensity={1.6} position={[8, 12, 6]} />
      <directionalLight color={0x8ab4ff} intensity={0.5} position={[-6, -3, -5]} />
      <directionalLight color={0xffffff} intensity={0.4} position={[0, 0, -10]} />

      <Ryanair737 mouseRef={mouseRef} />
      <Stars />
      <Grid />
    </Canvas>
  )
}
