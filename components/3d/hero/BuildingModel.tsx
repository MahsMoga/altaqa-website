import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Procedural smart building — no external GLB needed.
 * Main tower + two background towers for urban depth.
 * Windows pulse individually for a "live system" effect.
 */
export function BuildingModel() {
  // Refs for animated window meshes
  const windowRefs = useRef<(THREE.Mesh | null)[]>([])

  // Main tower edge geometry
  const mainEdgesGeo = useMemo(() => {
    const geo = new THREE.BoxGeometry(1.0, 2.6, 0.65)
    const edges = new THREE.EdgesGeometry(geo)
    geo.dispose()
    return edges
  }, [])

  // Floor separator geometry (horizontal lines)
  const floorLineGeo = useMemo(() => new THREE.PlaneGeometry(0.98, 0.015), [])

  // Window positions — 4 cols × 7 rows = 28 windows
  const windowPositions = useMemo(() => {
    const cols = 4
    const rows = 7
    const positions: { x: number; y: number; phase: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions.push({
          x: (c - (cols - 1) / 2) * 0.21,
          y: r * 0.34 - 0.9,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }
    return positions
  }, [])

  // Background tower 1 edge geo
  const bg1EdgesGeo = useMemo(() => {
    const geo = new THREE.BoxGeometry(0.55, 1.6, 0.4)
    const edges = new THREE.EdgesGeometry(geo)
    geo.dispose()
    return edges
  }, [])

  // Background tower 2 edge geo
  const bg2EdgesGeo = useMemo(() => {
    const geo = new THREE.BoxGeometry(0.45, 1.2, 0.35)
    const edges = new THREE.EdgesGeometry(geo)
    geo.dispose()
    return edges
  }, [])

  // Animate window opacity — each window pulses independently
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    windowRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const mat = mesh.material as THREE.MeshBasicMaterial
      const phase = windowPositions[i]?.phase ?? 0
      // Slow pulse between 25% and 70% opacity
      mat.opacity = 0.25 + Math.abs(Math.sin(t * 0.35 + phase)) * 0.45
    })
  })

  return (
    <Float speed={0.4} rotationIntensity={0.06} floatIntensity={0.18}>
      {/* ── Background tower 1 (left, behind) ─────────────── */}
      <group position={[-1.55, -0.55, -0.9]}>
        <mesh>
          <boxGeometry args={[0.55, 1.6, 0.4]} />
          <meshStandardMaterial color="#071529" metalness={0.1} roughness={0.4} transparent opacity={0.8} />
        </mesh>
        <lineSegments geometry={bg1EdgesGeo}>
          <lineBasicMaterial color="#2F80ED" transparent opacity={0.2} />
        </lineSegments>
        {/* Small windows */}
        {[0, 1, 2, 3].map(r => [0, 1].map(c => (
          <mesh key={`bg1-${r}-${c}`} position={[(c - 0.5) * 0.18, r * 0.32 - 0.4, 0.21]}>
            <planeGeometry args={[0.1, 0.12]} />
            <meshBasicMaterial color="#2F80ED" transparent opacity={0.18} />
          </mesh>
        )))}
      </group>

      {/* ── Background tower 2 (right, behind) ─────────────── */}
      <group position={[1.55, -0.7, -1.1]}>
        <mesh>
          <boxGeometry args={[0.45, 1.2, 0.35]} />
          <meshStandardMaterial color="#071529" metalness={0.1} roughness={0.4} transparent opacity={0.75} />
        </mesh>
        <lineSegments geometry={bg2EdgesGeo}>
          <lineBasicMaterial color="#2F80ED" transparent opacity={0.15} />
        </lineSegments>
        {[0, 1, 2].map(r => (
          <mesh key={`bg2-${r}`} position={[0, r * 0.3 - 0.3, 0.18]}>
            <planeGeometry args={[0.25, 0.1]} />
            <meshBasicMaterial color="#2F80ED" transparent opacity={0.15} />
          </mesh>
        ))}
      </group>

      {/* ── Main tower ──────────────────────────────────────── */}
      <group position={[0, 0, 0]}>
        {/* Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.0, 2.6, 0.65]} />
          <meshStandardMaterial
            color="#0B1F3A"
            metalness={0.15}
            roughness={0.25}
            transparent
            opacity={0.92}
          />
        </mesh>

        {/* Edge wireframe outline */}
        <lineSegments geometry={mainEdgesGeo}>
          <lineBasicMaterial color="#2F80ED" transparent opacity={0.55} />
        </lineSegments>

        {/* Floor separator lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`floor-${i}`} geometry={floorLineGeo} position={[0, i * 0.34 - 1.15, 0.33]}>
            <meshBasicMaterial color="#2F80ED" transparent opacity={0.18} />
          </mesh>
        ))}

        {/* Animated windows */}
        {windowPositions.map((w, i) => (
          <mesh
            key={`win-${i}`}
            ref={el => { windowRefs.current[i] = el }}
            position={[w.x, w.y, 0.33]}
          >
            <planeGeometry args={[0.13, 0.18]} />
            <meshBasicMaterial color="#2F80ED" transparent opacity={0.4} />
          </mesh>
        ))}

        {/* Vertical edge glow strips */}
        {[-0.5, 0.5].map(x => (
          <mesh key={`strip-${x}`} position={[x, 0, 0.34]}>
            <planeGeometry args={[0.02, 2.6]} />
            <meshBasicMaterial color="#2F80ED" transparent opacity={0.4} />
          </mesh>
        ))}

        {/* Rooftop antenna */}
        <mesh position={[0, 1.48, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.5, 6]} />
          <meshBasicMaterial color="#2F80ED" />
        </mesh>
        {/* Antenna tip glow */}
        <mesh position={[0, 1.74, 0]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshBasicMaterial color="#5ba3f5" transparent opacity={0.9} />
        </mesh>

        {/* Rooftop equipment (HVAC units) */}
        {[-0.28, 0.22].map((x, i) => (
          <mesh key={`hvac-${i}`} position={[x, 1.35, 0]}>
            <boxGeometry args={[0.22, 0.06, 0.18]} />
            <meshStandardMaterial color="#112847" metalness={0.6} roughness={0.25} />
          </mesh>
        ))}

        {/* Ground base plate */}
        <mesh position={[0, -1.32, 0]} receiveShadow>
          <boxGeometry args={[1.1, 0.04, 0.75]} />
          <meshStandardMaterial color="#071529" metalness={0.4} roughness={0.5} />
        </mesh>
      </group>

      {/* ── Ground plane ────────────────────────────────────── */}
      <mesh position={[0, -1.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 5]} />
        <meshStandardMaterial
          color="#071529"
          metalness={0.2}
          roughness={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Ground grid lines */}
      {[-2, -1, 0, 1, 2].map(x => (
        <mesh key={`gx-${x}`} position={[x, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.01, 4]} />
          <meshBasicMaterial color="#2F80ED" transparent opacity={0.07} />
        </mesh>
      ))}
      {[-2, -1, 0, 1, 2].map(z => (
        <mesh key={`gz-${z}`} position={[0, -1.35, z]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.01, 4]} />
          <meshBasicMaterial color="#2F80ED" transparent opacity={0.07} />
        </mesh>
      ))}
    </Float>
  )
}
