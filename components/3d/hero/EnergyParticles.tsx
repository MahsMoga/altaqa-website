import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'
import * as THREE from 'three'

/**
 * Organic data-flow streams — matches reference image.
 *
 * Flowing S-curves of energy data wrap around the building organically,
 * representing BMS telemetry flowing through the building's systems.
 *
 * Each stream has:
 *  - A CatmullRomCurve3 path sweeping around the building
 *  - A thin TubeGeometry along the path (additive blending — glows with Bloom)
 *  - 4–6 moving data packets traveling the path
 *  - Trail effect: second smaller sphere slightly behind
 *
 * NO random particles. NO orbital rings. NO confetti.
 * Every element represents actual building intelligence.
 */

interface StreamConfig {
  color:       string
  points:      [number, number, number][]
  packetCount: number
  speed:       number     // curves per second
  tubeOpacity: number
  tubeRadius:  number
}

// Four purposeful streams around the building
// Path points designed to wrap the building naturally (like reference)
const STREAMS: StreamConfig[] = [
  {
    // Main sweep — lower-left → upper-right (matches reference's dominant arc)
    color:       '#2F80ED',
    points:      [
      [-2.2, -1.4,  0.6],
      [-1.0, -0.3,  1.9],
      [-0.1,  0.8,  1.8],
      [ 0.7,  1.9,  1.3],
      [ 1.6,  3.2,  0.4],
    ],
    packetCount: 6,
    speed:       0.16,
    tubeOpacity: 0.32,
    tubeRadius:  0.0085,
  },
  {
    // Parallel inner sweep — slightly closer to building
    color:       '#4f9ef5',
    points:      [
      [-1.8, -1.0,  0.8],
      [-0.8,  0.1,  1.6],
      [ 0.1,  1.2,  1.5],
      [ 0.9,  2.4,  1.0],
      [ 1.4,  3.0,  0.6],
    ],
    packetCount: 5,
    speed:       0.21,
    tubeOpacity: 0.22,
    tubeRadius:  0.006,
  },
  {
    // Right side wrap — around the building's right face
    color:       '#2F80ED',
    points:      [
      [ 1.0, -1.2,  0.5],
      [ 1.8,  0.2, -0.2],
      [ 1.7,  1.5, -0.8],
      [ 0.8,  2.6, -0.5],
      [-0.2,  3.3, -0.1],
    ],
    packetCount: 4,
    speed:       0.13,
    tubeOpacity: 0.25,
    tubeRadius:  0.007,
  },
  {
    // Front lower arc — ground level energy flow
    color:       '#5ba3f5',
    points:      [
      [-1.6,  0.4,  0.7],
      [-0.8, -0.1,  1.6],
      [ 0.0, -0.2,  1.7],
      [ 0.8,  0.2,  1.5],
      [ 1.5,  0.8,  0.8],
    ],
    packetCount: 4,
    speed:       0.24,
    tubeOpacity: 0.20,
    tubeRadius:  0.006,
  },
]

// ─── Single stream component ──────────────────────────────────────────────────
function DataStream({ cfg }: { cfg: StreamConfig }) {
  const packetRefs = useRef<(THREE.Mesh | null)[]>([])
  const trailRefs  = useRef<(THREE.Mesh | null)[]>([])

  // Build the CatmullRom curve
  const curve = useMemo(() => new THREE.CatmullRomCurve3(
    cfg.points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    false,
    'catmullrom',
    0.5
  ), [cfg.points])

  // Tube geometry along the path
  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 80, cfg.tubeRadius, 4, false), [curve, cfg.tubeRadius])
  const tubeMat = useMemo(() => new THREE.MeshBasicMaterial({
    color:       cfg.color,
    transparent: true,
    opacity:     cfg.tubeOpacity,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
  }), [cfg.color, cfg.tubeOpacity])

  useEffect(() => () => { tubeGeo.dispose(); tubeMat.dispose() }, [tubeGeo, tubeMat])

  // Staggered starting positions along the curve
  const offsets = useMemo(
    () => Array.from({ length: cfg.packetCount }, (_, i) => i / cfg.packetCount),
    [cfg.packetCount]
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    offsets.forEach((off, i) => {
      const progress = ((t * cfg.speed + off) % 1)
      const point = curve.getPoint(progress)

      const pkt = packetRefs.current[i]
      if (pkt) pkt.position.copy(point)

      // Trail slightly behind packet
      const trail = trailRefs.current[i]
      if (trail) {
        const trailProgress = ((t * cfg.speed + off - 0.018) % 1 + 1) % 1
        trail.position.copy(curve.getPoint(trailProgress))
      }
    })
  })

  return (
    <group>
      {/* Glowing tube path */}
      <primitive object={new THREE.Mesh(tubeGeo, tubeMat)} />

      {/* Data packets + trails */}
      {offsets.map((_, i) => (
        <group key={i}>
          {/* Bright packet — will bloom */}
          <mesh ref={el => { packetRefs.current[i] = el }}>
            <sphereGeometry args={[0.028, 7, 7]} />
            <meshBasicMaterial color={cfg.color} />
          </mesh>
          {/* Fading trail */}
          <mesh ref={el => { trailRefs.current[i] = el }}>
            <sphereGeometry args={[0.016, 5, 5]} />
            <meshBasicMaterial color={cfg.color} transparent opacity={0.45} depthWrite={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function EnergyParticles() {
  const { isHighEnd, isMidTier } = useDeviceCapability()

  // Mid-tier shows 2 streams; high-end shows all 4
  const visible = isHighEnd ? STREAMS : STREAMS.slice(0, 2)

  return (
    <group>
      {visible.map((cfg, i) => (
        <DataStream key={i} cfg={cfg} />
      ))}
    </group>
  )
}

// Kept for import compatibility — no longer renders anything
export function DataStreamParticles() { return null }
