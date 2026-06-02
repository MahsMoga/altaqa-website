import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { BuildingModel }  from './BuildingModel'
import { EnergyParticles } from './EnergyParticles'
import { CityBackground } from './CityBackground'
import { TelemetryHUD }   from './TelemetryHUD'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'
import * as THREE from 'three'

// ─── Cinematic camera ────────────────────────────────────────────────────────
/**
 * Fly-in from [7, 3.8, 9] → final position [3.8, 2.0, 5.4].
 * Ease-out cubic. After arrival, mouse parallax moves camera ±0.4 units.
 * lookAt: slightly above building centre = [0, 0.8, 0]
 */
function CinematicCamera() {
  const { camera } = useThree()
  const progress   = useRef(0)
  const mouse      = useRef({ x: 0, y: 0 })

  const FX = 3.8, FY = 2.0, FZ = 5.4   // final resting position

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current = {
        x:  (e.clientX / window.innerWidth  - 0.5),
        y: -(e.clientY / window.innerHeight - 0.5),
      }
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  useFrame((_, delta) => {
    if (progress.current < 1) {
      progress.current = Math.min(1, progress.current + delta * 0.26)
      const t = 1 - Math.pow(1 - progress.current, 3)   // ease-out cubic
      camera.position.set(7 + (FX - 7) * t, 3.8 + (FY - 3.8) * t, 9 + (FZ - 9) * t)
      camera.lookAt(0, 0.8, 0)
      return
    }
    // Settled — mouse parallax
    const tx = FX + mouse.current.x * 0.40
    const ty = FY + mouse.current.y * 0.25
    camera.position.x += (tx - camera.position.x) * 0.035
    camera.position.y += (ty - camera.position.y) * 0.035
    camera.lookAt(0, 0.8, 0)
  })

  return null
}

// ─── Lighting ─────────────────────────────────────────────────────────────────
/**
 * Night-time digital twin lighting — optimised for glass building.
 *
 *  1. Ambient         — dim city night air, cool blue
 *  2. Directional     — "moonlight" from upper right, soft white
 *  3. Blue key        — main facade fill, brand blue, triggers bloom
 *  4. Deep blue fill  — back-right depth on glass
 *  5. Teal accent     — lower rim, complements interior orange
 *  6. Warm right fill — suggests distant city ambient warmth
 *  7. Crown spot      — top spotlight on building crown/antenna
 */
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.14} color="#c8d8f0" />

      <directionalLight
        position={[6, 14, 5]}
        intensity={0.50}
        color="#eef6ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={12}
        shadow-camera-bottom={-4}
      />

      {/* Blue key — primary glass highlight */}
      <pointLight position={[-4.5, 3.5, 5.5]} intensity={5.0} color="#2F80ED" distance={16} decay={2} />

      {/* Deep fill from back */}
      <pointLight position={[5, 2, -4.5]} intensity={2.5} color="#1a4070" distance={14} decay={2} />

      {/* Teal low rim — energy/HVAC colour */}
      <pointLight position={[-1, -1, 5.5]} intensity={2.0} color="#14b8a6" distance={9} decay={2} />

      {/* Warm city glow from right */}
      <pointLight position={[5.5, 0.5, 3]} intensity={1.4} color="#3a5a80" distance={12} decay={2} />

      {/* Crown spotlight */}
      <spotLight
        position={[0, 10, 3.5]}
        target-position={[0, 3.6, 0]}
        intensity={4.0}
        color="#6ab0ff"
        angle={0.20}
        penumbra={0.55}
        distance={16}
        decay={2}
      />
    </>
  )
}

// ─── Post-processing effects ──────────────────────────────────────────────────
/**
 * Bloom:  Makes all meshBasicMaterial bright-blue elements glow dramatically.
 *         Edge lines, data packets, and beacon all bloom.
 *         This single effect produces ~70% of the "premium" visual improvement.
 *
 * Vignette: Darkens the canvas edges, focuses the eye on the building.
 */
function PostFX({ isHighEnd }: { isHighEnd: boolean }) {
  if (!isHighEnd) return null  // skip on mid/low-tier devices

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={2.2}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.88}
        radius={0.72}
        blendFunction={BlendFunction.ADD}
      />
      <Vignette
        offset={0.28}
        darkness={0.70}
        eskil={false}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}

// ─── Exported scene ───────────────────────────────────────────────────────────
export function SmartBuildingScene() {
  const { isHighEnd, isMidTier } = useDeviceCapability()

  return (
    <div
      style={{
        position:            'absolute',
        top:                 0,
        right:               0,
        width:               '58%',
        height:              '100%',
        pointerEvents:       'none',
        // Blend seamlessly with hero text area on the left edge
        maskImage:           'linear-gradient(to right, transparent 0%, black 16%, black 100%)',
        WebkitMaskImage:     'linear-gradient(to right, transparent 0%, black 16%, black 100%)',
      }}
      aria-hidden="true"
      role="presentation"
    >
      {/* CSS telemetry overlay */}
      <TelemetryHUD />

      {/* WebGL canvas */}
      <Canvas
        camera={{ position: [7, 3.8, 9], fov: 40, near: 0.1, far: 80 }}
        dpr={[1, isHighEnd ? 2 : 1.5]}
        performance={{ min: 0.5 }}
        shadows={isHighEnd}
        gl={{
          antialias:       isHighEnd,
          alpha:           true,
          powerPreference: 'high-performance',
          stencil:         false,
          toneMapping:     THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <SceneLighting />
        <CinematicCamera />

        <Suspense fallback={null}>
          <CityBackground />
          <BuildingModel />
          <EnergyParticles />
        </Suspense>

        {/* Post-processing — bloom + vignette */}
        <PostFX isHighEnd={isHighEnd} />
      </Canvas>
    </div>
  )
}
