import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Premium procedural smart building — Abu Dhabi commercial tower aesthetic.
 *
 * Architecture (bottom to top):
 *  1. Ground podium        — wide concrete base
 *  2. Lower tower          — glass curtain wall, 14 floors, window texture
 *  3. Mid setback          — architectural step-back, 10 floors
 *  4. Upper tower          — narrower, 8 floors, lighter glass
 *  5. Crown                — metallic aluminum feature
 *  6. Spire                — antenna + beacon
 *
 * Visual quality techniques:
 *  - CanvasTexture window grid: deterministic mixed warm/cool offices
 *  - emissiveMap + emissive white = window colour shows through glass
 *  - High metalness / zero roughness = reflective glass look
 *  - 4 visible corner columns with bright metallic material
 *  - Edge glow lines: thin bright boxes on the 4 vertical edges
 *  - Floor-band separators every ~0.3 units
 *  - Soft ground reflection plane beneath podium
 *
 * Animation:
 *  - Very slow Y-axis auto-rotation (~2.5 min / revolution)
 *  - Gentle vertical float (sine wave, 12 s period)
 *  - Mouse parallax: group.rotation.x / z respond to cursor
 */

// ─── Window texture factory ──────────────────────────────────────────────────

function buildWindowCanvas(
  cols: number,
  rows: number,
  seed: number
): HTMLCanvasElement {
  const W = 512
  const H = Math.round((W / cols) * rows)
  const canvas = document.createElement('canvas')
  canvas.width  = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  // Very dark navy base (the glass between windows)
  ctx.fillStyle = '#000510'
  ctx.fillRect(0, 0, W, H)

  const cw = W / cols
  const rh = H / rows

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Deterministic pseudo-random (no Math.random — stays stable across renders)
      const n1 = Math.abs(Math.sin(r * 17.3 + c * 11.7 + seed * 31.1)) % 1
      const n2 = Math.abs(Math.sin(r *  5.1 + c *  7.9 + seed * 13.3)) % 1
      const n3 = Math.abs(Math.sin(r *  3.7 + c * 19.3 + seed *  7.7)) % 1

      // ~88 % of windows are lit
      if (n1 > 0.12) {
        const brightness = 0.35 + n2 * 0.55
        const isWarm     = n3 > 0.72   // ~28 % warm offices

        if (isWarm) {
          // Warm amber / incandescent — working late, meeting rooms
          ctx.fillStyle = `rgba(255, 215, 130, ${brightness * 0.55})`
        } else {
          // Cool blue-white — standard LED office lighting
          ctx.fillStyle = `rgba(110, 165, 255, ${brightness * 0.80})`
        }

        // Mullion padding (structural frame between panes)
        const padX = cw * 0.10
        const padY = rh * 0.08
        ctx.fillRect(c * cw + padX, r * rh + padY, cw - padX * 2, rh - padY * 2)
      }
    }
  }

  return canvas
}

function makeWindowTexture(cols: number, rows: number, seed: number) {
  const canvas  = buildWindowCanvas(cols, rows, seed)
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.needsUpdate = true
  return texture
}

// ─── Materials ───────────────────────────────────────────────────────────────

function glassMaterial(windowTex: THREE.Texture, tint = '#071828') {
  return new THREE.MeshStandardMaterial({
    color:              new THREE.Color(tint),
    metalness:          0.55,
    roughness:          0.0,
    envMapIntensity:    1.8,
    emissiveMap:        windowTex,
    emissive:           new THREE.Color(1, 1, 1),   // texture colours pass through directly
    emissiveIntensity:  0.95,
  })
}

// ─── Sub-components ──────────────────────────────────────────────────────────

// Thin bright edge-glow line along one vertical edge of the tower
function EdgeGlow({ x, z, h, y }: { x: number; z: number; h: number; y: number }) {
  return (
    <mesh position={[x, y, z]}>
      <boxGeometry args={[0.014, h, 0.014]} />
      <meshBasicMaterial color="#2F80ED" />
    </mesh>
  )
}

// Horizontal floor-band separators (structural spandrel lines)
function FloorBands({ w, d, startY, endY, step, color }: {
  w: number; d: number; startY: number; endY: number; step: number; color: string
}) {
  const count = Math.floor((endY - startY) / step)
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const y = startY + i * step
        return (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[w + 0.008, 0.025, d + 0.008]} />
            <meshBasicMaterial color={color} transparent opacity={0.55} />
          </mesh>
        )
      })}
    </>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function BuildingModel() {
  const groupRef = useRef<THREE.Group>(null)
  const mouse    = useRef({ x: 0, y: 0 })

  // ── Mouse tracking for parallax ──
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // ── Create window textures once ──
  const texLower = useMemo(() => makeWindowTexture(8,  14, 1.0), [])
  const texMid   = useMemo(() => makeWindowTexture(6,  10, 2.5), [])
  const texUpper = useMemo(() => makeWindowTexture(5,   8, 4.2), [])

  // ── Materials (memoised) ──
  const matLower = useMemo(() => glassMaterial(texLower, '#071828'), [texLower])
  const matMid   = useMemo(() => glassMaterial(texMid,   '#081a2c'), [texMid])
  const matUpper = useMemo(() => glassMaterial(texUpper, '#0a1f32'), [texUpper])

  const matPodium = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#0a1422', metalness: 0.1, roughness: 0.75 }),
    []
  )
  const matMetal = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#a8c0d4', metalness: 0.9, roughness: 0.08,
      emissive: '#2F80ED', emissiveIntensity: 0.08,
    }),
    []
  )
  const matCrown = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#b0bec5', metalness: 0.95, roughness: 0.05 }),
    []
  )

  // ── Dispose textures on unmount ──
  useEffect(() => {
    return () => {
      texLower.dispose(); texMid.dispose(); texUpper.dispose()
      matLower.dispose(); matMid.dispose(); matUpper.dispose()
      matPodium.dispose(); matMetal.dispose(); matCrown.dispose()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Animation ──
  useFrame(({ clock }) => {
    const g = groupRef.current
    if (!g) return
    const t = clock.elapsedTime

    // Slow Y rotation — ~2.5 min per full revolution
    g.rotation.y += 0.0007

    // Gentle vertical float (12 s period, ±0.06 units)
    g.position.y = Math.sin(t * 0.52) * 0.055

    // Mouse parallax: very subtle tilt (max ±1.8°)
    g.rotation.x += (mouse.current.y * 0.028 - g.rotation.x) * 0.04
    g.rotation.z += (-mouse.current.x * 0.022 - g.rotation.z) * 0.04
  })

  // ─────────────────────────────────────────────────────────────────
  // Geometry dimensions
  // ─────────────────────────────────────────────────────────────────
  //  Podium:  w=2.20  h=0.75  d=1.35   y: -1.83 → -1.08
  //  Lower:   w=1.65  h=2.10  d=1.00   y: -1.08 → +1.02
  //  Mid:     w=1.38  h=1.45  d=0.82   y: +1.02 → +2.47
  //  Upper:   w=1.12  h=1.20  d=0.66   y: +2.47 → +3.67
  //  Crown:   w=0.92  h=0.48  d=0.54   y: +3.67 → +4.15
  //  Spire:   r=0.018 h=0.85            y: +4.15 → +5.00
  // ─────────────────────────────────────────────────────────────────

  // Vertical positions (centre-Y of each section)
  const pY  = -1.458   // podium
  const lY  = -0.030   // lower tower
  const mY  =  1.745   // mid tower
  const uY  =  3.070   // upper tower
  const crY =  3.910   // crown
  const spY =  4.575   // spire (base)

  // Edge glow positions
  const eHX = 0.565, eHZ = 0.365  // half-extents (slightly outside glass faces)
  const totalEdgeH = 5.25

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

      {/* ── Podium ───────────────────────────────────────────── */}
      <mesh position={[0, pY, 0]} castShadow receiveShadow material={matPodium}>
        <boxGeometry args={[2.20, 0.75, 1.35]} />
      </mesh>
      {/* Podium top ledge / lip */}
      <mesh position={[0, -1.08, 0]} material={matMetal}>
        <boxGeometry args={[2.24, 0.04, 1.39]} />
      </mesh>

      {/* ── Lower tower — glass curtain wall ────────────────── */}
      <mesh position={[0, lY, 0]} castShadow material={matLower}>
        <boxGeometry args={[1.65, 2.10, 1.00]} />
      </mesh>
      <FloorBands w={1.65} d={1.00} startY={-1.00} endY={1.02} step={0.30} color="#2F80ED" />

      {/* ── Mid setback ──────────────────────────────────────── */}
      <mesh position={[0, mY, 0]} castShadow material={matMid}>
        <boxGeometry args={[1.38, 1.45, 0.82]} />
      </mesh>
      <FloorBands w={1.38} d={0.82} startY={1.10} endY={2.47} step={0.30} color="#2F80ED" />
      {/* Setback transition ledge */}
      <mesh position={[0, 1.04, 0]} material={matMetal}>
        <boxGeometry args={[1.68, 0.06, 1.03]} />
      </mesh>

      {/* ── Upper tower ──────────────────────────────────────── */}
      <mesh position={[0, uY, 0]} castShadow material={matUpper}>
        <boxGeometry args={[1.12, 1.20, 0.66]} />
      </mesh>
      <FloorBands w={1.12} d={0.66} startY={2.50} endY={3.67} step={0.30} color="#5ba3f5" />
      {/* Upper transition ledge */}
      <mesh position={[0, 2.50, 0]} material={matMetal}>
        <boxGeometry args={[1.41, 0.06, 0.85]} />
      </mesh>

      {/* ── Crown ────────────────────────────────────────────── */}
      <mesh position={[0, crY, 0]} material={matCrown}>
        <boxGeometry args={[0.92, 0.48, 0.54]} />
      </mesh>
      {/* Crown fins — architectural feature */}
      {[-0.32, 0, 0.32].map((x, i) => (
        <mesh key={i} position={[x, crY + 0.26, 0]} material={matCrown}>
          <boxGeometry args={[0.04, 0.14, 0.55]} />
        </mesh>
      ))}
      <mesh position={[0, 4.16, 0]} material={matMetal}>
        <boxGeometry args={[0.94, 0.04, 0.56]} />
      </mesh>

      {/* ── Spire ─────────────────────────────────────────────── */}
      <mesh position={[0, spY, 0]} material={matCrown}>
        <cylinderGeometry args={[0.018, 0.018, 0.85, 8]} />
      </mesh>
      {/* Beacon light at top */}
      <mesh position={[0, 5.01, 0]}>
        <sphereGeometry args={[0.030, 8, 8]} />
        <meshBasicMaterial color="#5ba3f5" />
      </mesh>

      {/* ── Corner columns — 4 full-height metallic pillars ──── */}
      {[
        [-0.745, -0.340], [-0.745, 0.340],
        [ 0.745, -0.340], [ 0.745, 0.340],
      ].map(([cx, cz], i) => (
        <mesh key={`col-${i}`} position={[cx, -0.08, cz]} material={matMetal}>
          <boxGeometry args={[0.065, totalEdgeH, 0.065]} />
        </mesh>
      ))}

      {/* ── Edge glow lines — signature digital-twin blue edges ── */}
      <EdgeGlow x={-eHX} z={ eHZ} h={totalEdgeH} y={0} />
      <EdgeGlow x={ eHX} z={ eHZ} h={totalEdgeH} y={0} />
      <EdgeGlow x={-eHX} z={-eHZ} h={totalEdgeH} y={0} />
      <EdgeGlow x={ eHX} z={-eHZ} h={totalEdgeH} y={0} />

      {/* Horizontal edge glow at crown top and podium base */}
      {/* Top frame */}
      {[
        [0, 4.16,  eHZ, [0.96, 0.012, 0.012]],
        [0, 4.16, -eHZ, [0.96, 0.012, 0.012]],
        [-eHX, 4.16, 0, [0.012, 0.012, 0.73]],
        [ eHX, 4.16, 0, [0.012, 0.012, 0.73]],
      ].map(([x, y, z, dims], i) => (
        <mesh key={`top-${i}`} position={[x as number, y as number, z as number]}>
          <boxGeometry args={dims as [number, number, number]} />
          <meshBasicMaterial color="#5ba3f5" transparent opacity={0.7} />
        </mesh>
      ))}

      {/* ── HVAC / rooftop equipment ─────────────────────────── */}
      {[
        [-0.28, 0.22, 0.10],
        [ 0.24, 0.18, 0.12],
      ].map(([ex, ew, ed], i) => (
        <mesh key={`hvac-${i}`} position={[ex, 4.12, 0]} material={matPodium}>
          <boxGeometry args={[ew as number, 0.07, ed as number]} />
        </mesh>
      ))}

      {/* ── Ground shadow catcher ────────────────────────────── */}
      <mesh position={[0, -2.09, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.5, 2.5]} />
        <shadowMaterial opacity={0.35} />
      </mesh>

    </group>
  )
}
