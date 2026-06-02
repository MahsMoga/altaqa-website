import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { BuildingModel } from './BuildingModel'
import { EnergyParticles, DataStreamParticles } from './EnergyParticles'
import { TelemetryHUD } from './TelemetryHUD'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'
import * as THREE from 'three'

/**
 * Cinematic camera — starts far, smoothly dolly-zooms to final position.
 * Creates a premium "fly-in" entrance effect on first load.
 */
function CinematicCamera() {
  const { camera } = useThree()
  const progress = useRef(0)

  // Start position (far + high)
  const startPos = new THREE.Vector3(5, 4, 7)
  // Target position (close, slight angle)
  const endPos   = new THREE.Vector3(2.8, 1.4, 4.5)

  useFrame((_, delta) => {
    if (progress.current >= 1) return
    progress.current = Math.min(1, progress.current + delta * 0.35)

    // Ease-out cubic
    const t = 1 - Math.pow(1 - progress.current, 3)

    camera.position.lerpVectors(startPos, endPos, t)
    camera.lookAt(0, 0.1, 0)
  })

  return null
}

/**
 * Ambient lighting setup — blue-tinted corporate feel.
 */
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.25} color="#e8f1fc" />
      {/* Primary directional — top-right "sun" */}
      <directionalLight
        position={[4, 8, 4]}
        intensity={0.7}
        color="#ffffff"
        castShadow
        shadow-mapSize={[512, 512]}
      />
      {/* Blue fill light — accent from front-left */}
      <pointLight position={[-2.5, 2, 3]} intensity={2.5} color="#2F80ED" distance={8} />
      {/* Cyan rim light — from behind for depth */}
      <pointLight position={[0, 0, -3]} intensity={1.2} color="#4FC3F7" distance={6} />
      {/* Warm under-light — from ground */}
      <pointLight position={[0, -1.5, 2]} intensity={0.6} color="#1a3a5c" distance={4} />
    </>
  )
}

/**
 * Main Three.js canvas — the smart building 3D scene.
 * Positioned in the right half of the hero section on desktop only.
 */
export function SmartBuildingScene() {
  const { isHighEnd } = useDeviceCapability()

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50%',
        height: '100%',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
      role="presentation"
    >
      {/* Telemetry labels as CSS overlay */}
      <TelemetryHUD />

      {/* WebGL Canvas */}
      <Canvas
        camera={{ position: [5, 4, 7], fov: 42, near: 0.1, far: 50 }}
        dpr={[1, isHighEnd ? 2 : 1.5]}
        performance={{ min: 0.5 }}
        shadows={isHighEnd}
        gl={{
          antialias: isHighEnd,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <SceneLighting />
        <CinematicCamera />

        <Suspense fallback={null}>
          <BuildingModel />
          <EnergyParticles />
          {isHighEnd && <DataStreamParticles />}
        </Suspense>

        {/* Auto-orbit — very slow, cinematic */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.25}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  )
}
