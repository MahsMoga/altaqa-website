import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * Night-time Abu Dhabi city environment.
 * Procedural — no external assets required.
 *
 * Layers:
 *  1. Deep navy sky sphere (backdrop)
 *  2. Horizon atmospheric glow
 *  3. Distant city silhouette buildings (far z-depth)
 *  4. Ground plane with subtle blue reflection
 *  5. Building footprint glow
 */

// Deterministic building layout — [x, z, w, h, d]
const BG_BUILDINGS: [number, number, number, number, number][] = [
  // Far layer — full-width skyline
  [-13, -22, 1.1, 3.2, 0.7], [-10.5, -24, 0.85, 2.5, 0.6],
  [-8,   -21, 1.3, 4.5, 0.9], [-5.5, -23, 0.9,  3.0, 0.7],
  [-3,   -22, 1.0, 2.2, 0.6], [-0.5, -24, 1.2,  3.8, 0.8],
  [ 2,   -21, 0.85,4.2, 0.7], [ 4.5, -23, 1.0,  2.8, 0.6],
  [ 7,   -21, 1.1, 3.5, 0.8], [ 9.5, -23, 0.8,  2.6, 0.7],
  [11.5, -22, 1.0, 3.3, 0.9],
  // Mid layer — closer, shorter
  [-11,  -15, 0.7, 2.2, 0.5], [-8.5, -14, 0.65, 3.0, 0.5],
  [-6,   -16, 0.8, 1.6, 0.6], [-3.5, -14, 0.6,  2.6, 0.5],
  [-1,   -15, 0.7, 2.0, 0.5], [ 1.5, -14, 0.65, 3.2, 0.5],
  [ 4,   -16, 0.8, 1.8, 0.6], [ 6.5, -14, 0.65, 2.5, 0.5],
  [ 9,   -15, 0.7, 1.7, 0.6],
  // Landmark towers (taller, more prominent)
  [-6.5, -17, 0.9, 5.2, 0.8], [ 4.5, -16, 1.0, 4.9, 0.9],
  [-0.5, -18, 0.7, 3.5, 0.6],
]

export function CityBackground() {
  // Ground base height (bottom of scene)
  const groundY = -2.1

  // Memoised building positions so they're stable
  const buildings = useMemo(() => BG_BUILDINGS, [])

  return (
    <group>
      {/* ── 1. Sky sphere ──────────────────────────────────── */}
      <mesh>
        <sphereGeometry args={[60, 32, 16]} />
        <meshBasicMaterial color="#020912" side={THREE.BackSide} />
      </mesh>

      {/* ── 2. Horizon atmospheric glow ────────────────────── */}
      {/* Wide plane at horizon level — additive blue mist */}
      <mesh position={[0, groundY + 1.5, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 16]} />
        <meshBasicMaterial
          color="#0d2a5c"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Taller vertical horizon mist */}
      <mesh position={[0, groundY + 3, -25]}>
        <planeGeometry args={[120, 10]} />
        <meshBasicMaterial
          color="#0a1f45"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* ── 3. Silhouette buildings ──────────────────────────── */}
      {buildings.map(([x, z, w, h, d], i) => {
        const baseY = groundY + h / 2
        // Slight blue emissive tint — not black, but very dark
        const emissiveIntensity = 0.15 + (i % 4) * 0.05
        return (
          <mesh key={i} position={[x, baseY, z]} castShadow={false} receiveShadow={false}>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial
              color="#060e1e"
              emissive="#0a1830"
              emissiveIntensity={emissiveIntensity}
              roughness={0.9}
              metalness={0.05}
            />
          </mesh>
        )
      })}

      {/* ── 4. Subtle window lights on bg buildings ─────────── */}
      {/* Just a few prominent ones — keeps it clean */}
      {[
        { x: -8,   z: -21, y: groundY + 3.5, w: 0.4, h: 0.08 },
        { x: -7.8, z: -21, y: groundY + 2.8, w: 0.3, h: 0.07 },
        { x: -0.5, z: -24, y: groundY + 2.9, w: 0.45, h: 0.08 },
        { x:  7,   z: -21, y: groundY + 3.0, w: 0.35, h: 0.07 },
        { x:  4.5, z: -16, y: groundY + 3.8, w: 0.4,  h: 0.08 },
        { x: -6.5, z: -17, y: groundY + 4.0, w: 0.35, h: 0.07 },
      ].map((w, i) => (
        <mesh key={`wl-${i}`} position={[w.x, w.y, w.z + 0.01]}>
          <planeGeometry args={[w.w, w.h]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#2a4e9a' : '#1a3560'}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* ── 5. Ground plane ──────────────────────────────────── */}
      <mesh position={[0, groundY, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 40]} />
        <meshStandardMaterial
          color="#040c1a"
          metalness={0.25}
          roughness={0.85}
        />
      </mesh>

      {/* Soft radial glow under main building footprint */}
      <mesh position={[0, groundY + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.5, 3.5]} />
        <meshBasicMaterial
          color="#1a3a70"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Wide ambient floor glow */}
      <mesh position={[0, groundY + 0.03, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshBasicMaterial
          color="#0d2045"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
