import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'
import * as THREE from 'three'

/**
 * GPU-efficient energy particle system using InstancedMesh (single draw call).
 * Particles drift upward slowly — representing data/energy flows from the building.
 * Count is automatically reduced on mid-tier devices.
 */
export function EnergyParticles() {
  const { particleCount } = useDeviceCapability()
  const count = particleCount

  const meshRef = useRef<THREE.InstancedMesh>(null)
  const tempObj = useMemo(() => new THREE.Object3D(), [])

  // Stable particle data (position, speed, phase)
  const particles = useMemo(() => {
    if (count === 0) return []
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 4.5,
      y: (Math.random() - 0.5) * 3.5,
      z: (Math.random() - 0.5) * 2.0 - 0.3,
      speed:  0.0015 + Math.random() * 0.003,
      phase:  Math.random() * Math.PI * 2,
      drift:  (Math.random() - 0.5) * 0.001,
      size:   0.012 + Math.random() * 0.016,
    }))
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current || particles.length === 0) return
    const t = clock.elapsedTime

    particles.forEach((p, i) => {
      // Drift upward + gentle sine sway
      p.y += p.speed
      p.x += Math.sin(t * 0.4 + p.phase) * 0.0008

      // Wrap: reset to bottom when above scene
      if (p.y > 1.8) {
        p.y = -1.8
        p.x = (Math.random() - 0.5) * 4.5
      }

      tempObj.position.set(p.x, p.y, p.z)
      tempObj.scale.setScalar(p.size)
      tempObj.updateMatrix()
      meshRef.current!.setMatrixAt(i, tempObj.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  if (count === 0) return null

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#2F80ED" transparent opacity={0.55} />
    </instancedMesh>
  )
}

/**
 * Larger data stream particles — fewer, more visible, flow up the building face.
 */
export function DataStreamParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const tempObj = useMemo(() => new THREE.Object3D(), [])
  const count = 30

  const streams = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      x: Math.sin((i / count) * Math.PI * 2) * 0.55,
      y: (Math.random() - 0.5) * 2.5,
      z: 0.35,
      speed: 0.006 + Math.random() * 0.008,
      offset: Math.random() * Math.PI * 2,
    }))
  , [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime

    streams.forEach((p, i) => {
      p.y += p.speed
      if (p.y > 1.4) p.y = -1.4

      tempObj.position.set(
        p.x + Math.sin(t * 0.5 + p.offset) * 0.06,
        p.y,
        p.z
      )
      tempObj.scale.setScalar(0.022)
      tempObj.updateMatrix()
      meshRef.current!.setMatrixAt(i, tempObj.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 5, 5]} />
      <meshBasicMaterial color="#5ba3f5" transparent opacity={0.7} />
    </instancedMesh>
  )
}
