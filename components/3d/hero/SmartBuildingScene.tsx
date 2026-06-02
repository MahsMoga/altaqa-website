import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { BuildingModel }   from './BuildingModel'
import { EnergyParticles } from './EnergyParticles'
import { CityBackground }  from './CityBackground'
import { TelemetryHUD }    from './TelemetryHUD'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'
import * as THREE from 'three'

// ─── Cinematic camera ─────────────────────────────────────────────────────────
function CinematicCamera() {
  const { camera } = useThree()
  const progress   = useRef(0)
  const mouse      = useRef({ x: 0, y: 0 })

  // Settled position: 3/4 view, slight elevation, clean framing
  const FX = 3.8, FY = 1.9, FZ = 5.2

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
      progress.current = Math.min(1, progress.current + delta * 0.25)
      const t = 1 - Math.pow(1 - progress.current, 3)    // ease-out cubic
      camera.position.set(7 + (FX - 7) * t, 4 + (FY - 4) * t, 9 + (FZ - 9) * t)
      camera.lookAt(0, 0.8, 0)
      return
    }
    // Mouse parallax after intro
    const tx = FX + mouse.current.x * 0.38
    const ty = FY + mouse.current.y * 0.22
    camera.position.x += (tx - camera.position.x) * 0.032
    camera.position.y += (ty - camera.position.y) * 0.032
    camera.lookAt(0, 0.8, 0)
  })

  return null
}

// ─── Lighting ─────────────────────────────────────────────────────────────────
/**
 * Night-city glass-tower lighting.
 * Works in conjunction with the HDR Environment map — the Environment provides
 * ambient reflections, these lights add directionality and colour mood.
 */
function SceneLighting() {
  return (
    <>
      {/* Dim night-sky ambient */}
      <ambientLight intensity={0.12} color="#c0d4ec" />

      {/* Moonlight — top right, clean white */}
      <directionalLight
        position={[5, 14, 4]}
        intensity={0.45}
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

      {/* Blue key — main facade fill, brand blue */}
      <pointLight position={[-4.5, 3.5, 5.5]} intensity={5.5} color="#2F80ED" distance={18} decay={2} />

      {/* Deep counter fill — glass depth from back */}
      <pointLight position={[ 5.0, 2.0, -5.0]} intensity={2.8} color="#1a4070" distance={16} decay={2} />

      {/* Teal low rim — energy data colour */}
      <pointLight position={[-1.0,-1.0,  5.5]} intensity={2.2} color="#14b8a6" distance={10} decay={2} />

      {/* Warm city ambient — right side */}
      <pointLight position={[ 5.5, 0.5,  3.0]} intensity={1.5} color="#3a5a80" distance={14} decay={2} />

      {/* Crown spotlight — defines top feature */}
      <spotLight
        position={[0, 10, 3]}
        target-position={[0, 3.6, 0]}
        intensity={4.5}
        color="#6ab0ff"
        angle={0.19}
        penumbra={0.55}
        distance={16}
        decay={2}
      />
    </>
  )
}

// ─── Post-processing ──────────────────────────────────────────────────────────
function PostFX({ isHighEnd }: { isHighEnd: boolean }) {
  if (!isHighEnd) return null

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={2.4}
        luminanceThreshold={0.14}
        luminanceSmoothing={0.88}
        radius={0.75}
        blendFunction={BlendFunction.ADD}
      />
      <Vignette
        offset={0.26}
        darkness={0.72}
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
        maskImage:           'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
        WebkitMaskImage:     'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
      }}
      aria-hidden="true"
      role="presentation"
    >
      <TelemetryHUD />

      <Canvas
        camera={{ position: [7, 4, 9], fov: 40, near: 0.1, far: 80 }}
        dpr={[1, isHighEnd ? 2 : 1.5]}
        performance={{ min: 0.5 }}
        shadows={isHighEnd}
        gl={{
          antialias:           isHighEnd,
          alpha:               true,
          powerPreference:     'high-performance',
          stencil:             false,
          toneMapping:         THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <SceneLighting />
        <CinematicCamera />

        <Suspense fallback={null}>
          {/* HDR environment — provides real reflections on glass + metal.
              This is the single biggest quality improvement over flat lighting.
              preset="city" downloads a small HDR from the drei CDN.
              background={false} = reflections only, sky not shown. */}
          <Environment preset="city" background={false} />

          <CityBackground />
          <BuildingModel />

          {/* Facade-attached data flows — NO orbiting, NO rings */}
          <EnergyParticles />
        </Suspense>

        <PostFX isHighEnd={isHighEnd} />
      </Canvas>
    </div>
  )
}
