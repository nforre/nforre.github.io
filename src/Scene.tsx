import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { getVelocity } from './lenis'
import { burst, toast } from './util'

const PALETTE = ['#ffd166', '#ffffff', '#ff9ccb', '#7c9cff', '#5ee0c0']
const mouse = { x: 0, y: 0 }
// Lenis velocity can spike (50+ px/frame on a fast scroll). Clamp it so the scene stays calm.
const calmVel = () => Math.min(Math.abs(getVelocity()), 2)

function Heart() {
  const group = useRef<THREE.Group>(null!)
  const spin = useRef(0)
  const geo = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0, -1.1)
    s.bezierCurveTo(-0.2, -0.8, -1.3, -0.2, -1.3, 0.5)
    s.bezierCurveTo(-1.3, 1.2, -0.4, 1.5, 0, 0.9)
    s.bezierCurveTo(0.4, 1.5, 1.3, 1.2, 1.3, 0.5)
    s.bezierCurveTo(1.3, -0.2, 0.2, -0.8, 0, -1.1)
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.5, bevelEnabled: true, bevelThickness: 0.25, bevelSize: 0.22, bevelSegments: 12, curveSegments: 32 })
    g.center()
    return g
  }, [])
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    spin.current += dt * 0.5 + calmVel() * dt * 0.5 // scroll makes it spin a bit faster
    const g = group.current
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, spin.current * 0.6 + mouse.x * 0.8, 6, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -mouse.y * 0.5, 6, dt)
    g.position.y = Math.sin(t * 1.5) * 0.12
    g.scale.setScalar(1 + Math.sin(t * 3) * 0.025)
  })
  return (
    <group ref={group} onClick={(e) => { burst(e.nativeEvent.clientX, e.nativeEvent.clientY); toast('You found my heart 💖') }}>
      <mesh geometry={geo}>
        <meshPhysicalMaterial color="#ff4f9a" roughness={0.18} clearcoat={1} clearcoatRoughness={0.1} sheen={1} sheenColor="#ffd3e6" />
      </mesh>
    </group>
  )
}

function Orbit() {
  const ring = useRef<THREE.Mesh>(null!)
  const group = useRef<THREE.Group>(null!)
  const sparks = useMemo(() => Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2, r = 1.7 + Math.random() * 0.4
    return { p: [Math.cos(a) * r, (Math.random() - 0.5) * 2.2, Math.sin(a) * r] as [number, number, number], s: 0.05 + Math.random() * 0.06, c: PALETTE[i % PALETTE.length] }
  }), [])
  useFrame((_, dt) => {
    group.current.rotation.y += dt * (0.3 + calmVel() * 0.15)
    ring.current.rotation.z += dt * 0.4
  })
  return (
    <>
      <mesh ref={ring} rotation={[1.2, 0.3, 0]}>
        <torusGeometry args={[1.95, 0.03, 16, 100]} />
        <meshStandardMaterial color="#ffd166" emissive="#ffd166" emissiveIntensity={0.4} />
      </mesh>
      <group ref={group}>
        {sparks.map((s, i) => (
          <mesh key={i} position={s.p} scale={s.s * 4}>
            <octahedronGeometry args={[0.25]} />
            <meshStandardMaterial color={s.c} emissive={s.c} emissiveIntensity={0.35} />
          </mesh>
        ))}
      </group>
    </>
  )
}

export function Scene() {
  useEffect(() => {
    const move = (e: PointerEvent) => { mouse.x = (e.clientX / innerWidth) * 2 - 1; mouse.y = -((e.clientY / innerHeight) * 2 - 1) }
    addEventListener('pointermove', move)
    return () => removeEventListener('pointermove', move)
  }, [])
  return (
    <Canvas camera={{ position: [0, 0, 8.5], fov: 40 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <pointLight position={[-3, -2, 3]} intensity={30} color="#ff9ccb" />
      <Heart />
      <Orbit />
    </Canvas>
  )
}
