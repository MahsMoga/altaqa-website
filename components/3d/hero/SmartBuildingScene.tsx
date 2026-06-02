import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import * as THREE from 'three'
import { BuildingModel }  from './BuildingModel'
import { EnergyParticles } from './EnergyParticles'
import { OrbitalRings }   from './OrbitalRings'
import { CityBackground } from './CityBackground'
import { TelemetryHUD }   from './TelemetryHUD'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'

// ─── Cinematic camera ────────────────────────────────────────────────────────
/**
 * Starts far (8, 4, 9) and eases into the final 3/4 position (4.5, 2.4, 5.8).
 * Ease-out cubic — feels like a premium product reveal.
 * After arrival, camera gently tracks mouse for depth parallax.
 */
function CinematicCamera() {
  const { camera } = useThree()
  const progress   = useRef(0)
  const mouse      = useRef({ x: 0, y: 0 })

  // Final resting position
  const finalX = 4.5, finalY = 2.4, finalZ = 5.8

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x:  (e.clientX / window.innerWidth  - 0.5),
        y: -(e.clientY / window.innerHeight - 0.5),
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((_, delta) => {
    // ── Intro fly-in (first ~4 s) ──
    if (progress.current < 1) {
      progress.current = Math.min(1, progress.current + delta * 0.28)
      const t = 1 - Math.pow(1 - progress.current, 3)   // ease-out cubic

      camera.position.x = 8   + (finalX - 8)   * t
      camera.position.y = 4.2 + (finalY - 4.2) * t
      camera.position.z = 9.5 + (finalZ - 9.5) * t
      camera.lookAt(0, 0.8, 0)
      return
    }

    // ── Settled: mouse parallax ──
    const targetX = finalX + mouse.current.x * 0.45
    const targetY = finalY + mouse.current.y * 0.28

    camera.position.x += (targetX - camera.position.x) * 0.038
    camera.position.y += (targetY - camera.position.y) * 0.038
    camera.lookAt(0, 0.8, 0)
  })

  return null
}

// ─── Lighting ────────────────────────────────────────────────────────────────
/**
 * Six-light setup optimised for a glass skyscraper at night.
 *
 * 1. Ambient            — very dim, cool grey-blue (city night air)
 * 2. Directional        — "moonlight" from upper-right, clean white
 * 3. Blue key           — front-left, brand blue, primary facade fill
 * 4. Deep blue fill     — back-right, adds specular depth to glass
 * 5. Teal accent        — low-front, HVAC-teal rim for edge glow
 * 6. Warm counter-fill  — right side, implies distant city warmth
 */
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.18} color="#d0e4f8" />

      {/* Moonlight */}
      <directionalLight
        position={[6, 14, 6]}
        intensity={0.55}
        color="#f0f6ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={12}
        shadow-camera-bottom={-4}
      />

      {/* Blue key light — main facade illumination */}
      <pointLight position={[-4, 3.5, 5]} intensity={4.5} color="#2F80ED" distance={14} decay={2} />

      {/* Deep fill — glass depth from back */}
      <pointLight position={[5,  2,  -4]} intensity={2.2} color="#1a4070" distance={12} decay={2} />

      {/* Teal accent — orbital ring HVAC colour complement */}
      <pointLight position={[0, -1, 4.5]} intensity={1.8} color="#14b8a6" distance={8}  decay={2} />

      {/* Warm city counter-fill */}
      <pointLight position={[5, 0.5, 3]} intensity={1.2} color="#3a5080" distance={10} decay={2} />

      {/* Top spotlight — picks out crown and antenna */}
      <spotLight
        position={[0, 9, 3]}
        target-position={[0, 3.5, 0]}
        intensity={3.5}
        color="#7ab8ff"
        angle={0.22}
        penumbra={0.6}
        distance={14}
        decay={2}
      />
    </>
  )
}

// ─── Exported scene ──────────────────────────────────────────────────────────
export function SmartBuildingScene() {
  const { isHighEnd, isMidTier } = useDeviceCapability()

  return (
    <div
      style={{
        position:       'absolute',
        top:            0,
        right:          0,
        width:          '56%',    // slightly wider than 50% for visual presence
        height:         '100%',
        pointerEvents:  'none',
        // Left-edge fade — blends seamlessly into hero text area
        maskImage:      'linear-gradient(to right, transparent 0%, black 18%, black 100%)',
        WebkitMaskImage:'linear-gradient(to right, transparent 0%, black 18%, black 100%)',
      }}
      aria-hidden="true"
      role="presentation"
    >
      {/* CSS telemetry overlay */}
      <TelemetryHUD />

      {/* WebGL canvas */}
      <Canvas
        camera={{
          position: [8, 4.2, 9.5],
          fov:      40,
          near:     0.1,
          far:      80,
        }}
        dpr={[1, isHighEnd ? 2 : 1.5]}
        performance={{ min: 0.5 }}
        shadows={isHighEnd}
        gl={{
          antialias:        isHighEnd,
          alpha:            true,
          powerPreference:  'high-performance',
          stencil:          false,
          logarithmicDepthBuffer: false,
        }}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <SceneLighting />
        <CinematicCamera />

        <Suspense fallback={null}>
          {/* Environment — city & ground */}
          <CityBackground />

          {/* The building */}
          <BuildingModel />

          {/* Purposeful data flows (edge streams) */}
          <EnergyParticles />

          {/* Orbital monitoring rings */}
          {!isMidTier || isHighEnd ? <OrbitalRings /> : null}
        </Suspense>
      </Canvas>
    </div>
  )
}
