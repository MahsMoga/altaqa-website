import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'
import * as THREE from 'three'

/**
 * Edge data-stream system.
 *
 * Instead of random floating particles, data packets travel along the four
 * vertical edges of the building, representing live telemetry flowing up
 * through the building's intelligent infrastructure.
 *
 * Four edge paths (one per building corner):
 *   front-left, front-right, back-left, back-right
 *
 * Each edge has:
 *   - A faint guide line (the edge itself, barely visible)
 *   - 3 data packets spaced evenly, cycling continuously upward
 *
 * On mid-tier devices the back edges are hidden (halves draw calls).
 */

const GROUND_Y  = -2.05
const TOP_Y     =  3.55
const HEIGHT    = TOP_Y - GROUND_Y

// Building half-extents (matches BuildingModel corner positions)
const HX = 0.56   // half-width
const HZ = 0.35   // half-depth

interface EdgeProps {
  x:      number
  z:      number
  color:  string
  speed:  number   // units/second
  offsets: number[] // phase offsets for 3 packets (0-1)
}

const EDGES: EdgeProps[] = [
  { x: -HX, z:  HZ, color: '#2F80ED', speed: 1.2, offsets: [0,    0.35, 0.68] },
  { x:  HX, z:  HZ, color: '#5ba3f5', speed: 1.05,offsets: [0.18, 0.52, 0.82] },
  { x: -HX, z: -HZ, color: '#14b8a6', speed: 0.9, offsets: [0.08, 0.42, 0.75] },
  { x:  HX, z: -HZ, color: '#2F80ED', speed: 1.35,offsets: [0.28, 0.60, 0.90] },
]

// A single upward-traveling data packet on one edge
function DataPacket({ x, z, color, speed, phaseOffset }: {
  x: number; z: number; color: string; speed: number; phaseOffset: number
}) {
  const meshRef  = useRef<THREE.Mesh>(null)
  const glowRef  = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t    = clock.elapsedTime
    const frac = ((t * speed / HEIGHT + phaseOffset) % 1)
    const y    = GROUND_Y + frac * HEIGHT

    if (meshRef.current)  meshRef.current.position.set(x, y, z)
    if (glowRef.current)  glowRef.current.position.set(x, y - 0.12, z)
  })

  return (
    <>
      {/* Bright leading dot */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.022, 6, 6]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Trailing glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.014, 5, 5]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} depthWrite={false} />
      </mesh>
    </>
  )
}

// A vertical edge line (faint guide for the packets)
// Using <primitive> to avoid TypeScript conflict with SVG <line> element
function EdgeLine({ x, z, color }: { x: number; z: number; color: string }) {
  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x, GROUND_Y, z),
      new THREE.Vector3(x, TOP_Y,    z),
    ])
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.18, depthWrite: false })
    return new THREE.Line(geo, mat)
  }, [x, z, color])

  // Proper disposal to prevent memory leaks
  useEffect(() => {
    return () => {
      lineObj.geometry.dispose();
      (lineObj.material as THREE.Material).dispose()
    }
  }, [lineObj])

  return <primitive object={lineObj} />
}

export function EnergyParticles() {
  const { isHighEnd, isMidTier } = useDeviceCapability()

  // On low-end devices, skip entirely (handled by use3DEnabled)
  // On mid-tier, show only front two edges
  const visibleEdges = useMemo(
    () => (isHighEnd ? EDGES : EDGES.slice(0, 2)),
    [isHighEnd]
  )

  return (
    <group>
      {visibleEdges.map((edge, ei) => (
        <group key={ei}>
          {/* Guide line */}
          <EdgeLine x={edge.x} z={edge.z} color={edge.color} />
          {/* Data packets */}
          {edge.offsets.map((off, pi) => (
            <DataPacket
              key={pi}
              x={edge.x}
              z={edge.z}
              color={edge.color}
              speed={edge.speed}
              phaseOffset={off}
            />
          ))}
        </group>
      ))}
    </group>
  )
}

// Legacy export kept for import compatibility
export function DataStreamParticles() { return null }
