import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'
import * as THREE from 'three'

/**
 * Building-attached data visualization.
 *
 * DESIGN PRINCIPLE:
 *   Every element is attached to the building facade — nothing orbits.
 *   This represents live BMS telemetry flowing THROUGH the building,
 *   not objects flying around it in space.
 *
 * Three visual layers:
 *
 *  1. VERTICAL FACADE STREAMS  — data packets travel straight up the front
 *     glass face, representing telemetry flowing to the BMS platform.
 *     They stay on the building surface (z = facade z-position).
 *
 *  2. FLOOR SCAN LINE  — a thin horizontal glow that slowly sweeps up
 *     the full building height, simulating a BMS floor-by-floor health scan.
 *
 *  3. NETWORK ARCS  — two graceful arcs that originate at building corners
 *     and reach outward a short distance (like data leaving the building
 *     toward monitoring infrastructure). They do NOT loop around the building.
 */

// ─── 1. Vertical facade streams ──────────────────────────────────────────────

const FACADE_Z    =  0.56   // front face z-offset
const STREAM_YMIN = -1.50   // ground level
const STREAM_YMAX =  4.10   // above crown

interface FacadeStreamConfig {
  x:     number
  color: string
  speed: number   // units / second upward
  count: number   // packets in this stream
}

const FACADE_STREAMS: FacadeStreamConfig[] = [
  { x: -0.72, color: '#2F80ED', speed: 1.40, count: 4 },
  { x:  0.00, color: '#5ba3f5', speed: 1.10, count: 3 },
  { x:  0.72, color: '#2F80ED', speed: 1.60, count: 4 },
]

function FacadeStream({ cfg }: { cfg: FacadeStreamConfig }) {
  const HEIGHT = STREAM_YMAX - STREAM_YMIN
  const pkts   = useRef<(THREE.Mesh | null)[]>([])
  const trails = useRef<(THREE.Mesh | null)[]>([])

  // Staggered starting phases so packets don't bunch up
  const phases = useMemo(
    () => Array.from({ length: cfg.count }, (_, i) => i / cfg.count),
    [cfg.count]
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    phases.forEach((phase, i) => {
      const frac  = ((t * cfg.speed / HEIGHT + phase) % 1)
      const y     = STREAM_YMIN + frac * HEIGHT
      const xSway = Math.sin(t * 0.4 + i * 1.3) * 0.04  // very subtle x-sway

      const p = pkts.current[i]
      if (p) p.position.set(cfg.x + xSway, y, FACADE_Z)

      const trl = trails.current[i]
      const fracT = ((t * cfg.speed / HEIGHT + phase - 0.025) % 1 + 1) % 1
      if (trl) trl.position.set(cfg.x + xSway, STREAM_YMIN + fracT * HEIGHT, FACADE_Z)
    })
  })

  return (
    <group>
      {/* Faint guide line along the facade */}
      <FacadeGuideLine x={cfg.x} color={cfg.color} />

      {phases.map((_, i) => (
        <group key={i}>
          {/* Bright core + inline glow halo as nested children of the same group.
              The group itself is moved by animation — so both move together. */}
          <group ref={el => { pkts.current[i] = el as unknown as THREE.Mesh }}>
            <mesh>
              <sphereGeometry args={[0.022, 6, 6]} />
              <meshBasicMaterial color={cfg.color} />
            </mesh>
            {/* Outer glow halo — fake bloom, no post-processing needed */}
            <mesh>
              <sphereGeometry args={[0.055, 6, 6]} />
              <meshBasicMaterial color={cfg.color} transparent opacity={0.12}
                blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          </group>
          {/* Trailing dot */}
          <mesh ref={el => { trails.current[i] = el }}>
            <sphereGeometry args={[0.013, 5, 5]} />
            <meshBasicMaterial color={cfg.color} transparent opacity={0.40} depthWrite={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function FacadeGuideLine({ x, color }: { x: number; color: string }) {
  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x, STREAM_YMIN, FACADE_Z),
      new THREE.Vector3(x, STREAM_YMAX, FACADE_Z),
    ])
    const mat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
    })
    return new THREE.Line(geo, mat)
  }, [x, color])

  useEffect(() => () => {
    lineObj.geometry.dispose();
    (lineObj.material as THREE.Material).dispose()
  }, [lineObj])

  return <primitive object={lineObj} />
}

// ─── 2. Floor scan line ───────────────────────────────────────────────────────
/**
 * A thin bright horizontal plane that sweeps up the building height over 8 s.
 * Represents a BMS full-building health scan.
 * Resets and repeats. Very subtle — does not orbit.
 */
function FloorScanLine() {
  const meshRef = useRef<THREE.Mesh>(null)
  const PERIOD  = 9.0   // seconds per full sweep

  useFrame(({ clock }) => {
    const frac = (clock.elapsedTime % PERIOD) / PERIOD
    const y    = STREAM_YMIN + frac * (STREAM_YMAX - STREAM_YMIN)
    if (meshRef.current) {
      meshRef.current.position.y = y
      // Fade out near top so it doesn't flash on reset
      const mat = meshRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = frac > 0.88 ? (1 - frac) / 0.12 * 0.50 : 0.50
    }
  })

  return (
    <mesh ref={meshRef} position={[0, STREAM_YMIN, 0]}>
      {/* Wide plane spanning the building face, very thin */}
      <planeGeometry args={[1.90, 0.018]} />
      <meshBasicMaterial
        color="#2F80ED"
        transparent
        opacity={0.50}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

// ─── 3. Network arcs ─────────────────────────────────────────────────────────
/**
 * Two short arcs from building corners outward — like data leaving the building
 * toward monitoring infrastructure. Static geometry + moving packet.
 * They do NOT loop around the building.
 */
function NetworkArc({ side }: { side: 1 | -1 }) {
  const packetRef = useRef<THREE.Mesh>(null)

  // Short arc: starts at building corner, sweeps outward and slightly up
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(side * 0.90,  0.50,  0.52),    // starts at building corner
    new THREE.Vector3(side * 1.40,  1.20,  0.80),    // arcs outward
    new THREE.Vector3(side * 1.80,  1.80,  0.50),    // ends in open space (HUD position)
  ]), [side])

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 40, 0.0065, 4, false), [curve])
  const tubeMat = useMemo(() => new THREE.MeshBasicMaterial({
    color:       '#2F80ED',
    transparent: true,
    opacity:     0.28,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
  }), [])

  useEffect(() => () => { tubeGeo.dispose(); tubeMat.dispose() }, [tubeGeo, tubeMat])

  useFrame(({ clock }) => {
    if (!packetRef.current) return
    const progress = (clock.elapsedTime * 0.22 + (side > 0 ? 0 : 0.5)) % 1
    const pt = curve.getPoint(progress)
    packetRef.current.position.copy(pt)
  })

  return (
    <group>
      <primitive object={new THREE.Mesh(tubeGeo, tubeMat)} />
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.025, 7, 7]} />
        <meshBasicMaterial color="#5ba3f5" />
      </mesh>
    </group>
  )
}

// ─── Exported component ───────────────────────────────────────────────────────
export function EnergyParticles() {
  const { isHighEnd } = useDeviceCapability()

  return (
    <group>
      {/* Vertical facade streams — main data visualization */}
      {FACADE_STREAMS.map((cfg, i) => (
        <FacadeStream key={i} cfg={cfg} />
      ))}

      {/* Floor scan line */}
      <FloorScanLine />

      {/* Network connection arcs (desktop only — stay subtle) */}
      {isHighEnd && (
        <>
          <NetworkArc side={1}  />
          <NetworkArc side={-1} />
        </>
      )}
    </group>
  )
}

export function DataStreamParticles() { return null }
