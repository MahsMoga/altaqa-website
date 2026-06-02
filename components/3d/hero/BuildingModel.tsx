import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Premium Abu Dhabi commercial tower — photorealistic digital twin.
 *
 * Visual approach:
 *  1. Semi-transparent glass facade (opacity 0.72) — interior visible
 *  2. CanvasTexture window grid — warm offices + cool offices mixed
 *  3. 5 interior warm PointLights — glow through glass exactly like reference
 *  4. Floor plates + desk silhouettes — depth illusion through glass
 *  5. Bright edge glow lines — trigger post-processing bloom
 *  6. High metalness corner columns and crown
 *
 * Animation:
 *  - Very slow Y-rotation (≈2 min / revolution)
 *  - Gentle float on sine wave
 *  - Mouse parallax: ±1.5° rotation.x/z
 */

// ─── Canvas window texture ────────────────────────────────────────────────────
function createWindowTexture(cols: number, rows: number, seed: number) {
  const W = 512, H = Math.round((512 / cols) * rows)
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')!

  // Deep navy base — spandrel panels
  ctx.fillStyle = '#030c18'
  ctx.fillRect(0, 0, W, H)

  const cw = W / cols, rh = H / rows

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const n1 = Math.abs(Math.sin(r * 17.3 + c * 11.7 + seed * 31.1)) % 1
      const n2 = Math.abs(Math.sin(r *  5.1 + c *  7.9 + seed * 13.3)) % 1
      const n3 = Math.abs(Math.sin(r *  3.7 + c * 19.3 + seed *  7.7)) % 1

      if (n1 > 0.10) {   // ~90 % lit
        const bright = 0.4 + n2 * 0.55
        const isWarm  = n3 > 0.65   // ~35 % warm offices

        if (isWarm) {
          // Warm amber — late-night workers, meeting rooms
          ctx.fillStyle = `rgba(255, 210, 110, ${bright * 0.62})`
        } else {
          // Cool blue-white — LED open-plan offices
          ctx.fillStyle = `rgba(130, 175, 255, ${bright * 0.82})`
        }
        const px = cw * 0.09, py = rh * 0.07
        ctx.fillRect(c * cw + px, r * rh + py, cw - px * 2, rh - py * 2)
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

// ─── Main component ───────────────────────────────────────────────────────────
export function BuildingModel() {
  const groupRef = useRef<THREE.Group>(null)
  const mouse    = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  // Window textures — created once per component mount
  const texMain  = useMemo(() => createWindowTexture(10, 16, 1.0), [])
  const texUpper = useMemo(() => createWindowTexture( 7, 10, 3.2), [])

  // ── Glass material — semi-transparent so interior lights show through ──
  const matGlass = useMemo(() => new THREE.MeshStandardMaterial({
    color:             new THREE.Color('#061420'),
    metalness:         0.65,
    roughness:         0.0,
    envMapIntensity:   2.0,
    transparent:       true,
    opacity:           0.72,
    emissiveMap:       texMain,
    emissive:          new THREE.Color(1, 1, 1),
    emissiveIntensity: 1.05,
    side:              THREE.FrontSide,
  }), [texMain])

  const matGlassUpper = useMemo(() => new THREE.MeshStandardMaterial({
    color:             new THREE.Color('#071828'),
    metalness:         0.60,
    roughness:         0.0,
    transparent:       true,
    opacity:           0.70,
    emissiveMap:       texUpper,
    emissive:          new THREE.Color(1, 1, 1),
    emissiveIntensity: 0.95,
    side:              THREE.FrontSide,
  }), [texUpper])

  const matMetal = useMemo(() => new THREE.MeshStandardMaterial({
    color:     new THREE.Color('#9bb8cc'),
    metalness: 0.92,
    roughness: 0.06,
  }), [])

  const matPodium = useMemo(() => new THREE.MeshStandardMaterial({
    color:     new THREE.Color('#080e18'),
    metalness: 0.18,
    roughness: 0.70,
  }), [])

  const matFloor = useMemo(() => new THREE.MeshStandardMaterial({
    color:             new THREE.Color('#0a1420'),
    emissive:          new THREE.Color('#0d1e35'),
    emissiveIntensity: 0.4,
  }), [])

  // Desk silhouette material (visible as dark shapes inside building)
  const matDesk = useMemo(() => new THREE.MeshStandardMaterial({
    color:     new THREE.Color('#0c1828'),
    emissive:  new THREE.Color('#1a2f4a'),
    emissiveIntensity: 0.6,
  }), [])

  useEffect(() => () => {
    [texMain, texUpper, matGlass, matGlassUpper, matMetal, matPodium, matFloor, matDesk]
      .forEach(r => r.dispose())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Floor layout ──
  // Building inner space: y = -1.05 to +2.0 (8 floors × 0.38 = 3.05)
  const FLOORS = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    y: -1.05 + i * 0.38,
    floorIndex: i,
  })), [])

  // ── Desk rows for each floor (6 desks in 2 rows) ──
  const DESK_OFFSETS: [number, number][] = useMemo(() => [
    [-0.45, -0.15], [-0.15, -0.15], [0.15, -0.15],
    [-0.45,  0.15], [-0.15,  0.15], [0.15,  0.15],
  ], [])

  // ── Animation ──
  useFrame(({ clock }) => {
    const g = groupRef.current; if (!g) return
    const t = clock.elapsedTime
    g.rotation.y += 0.00055                               // 2 min revolution
    g.position.y  = Math.sin(t * 0.45) * 0.05            // gentle float
    g.rotation.x += (mouse.current.y *  0.024 - g.rotation.x) * 0.04
    g.rotation.z += (mouse.current.x * -0.018 - g.rotation.z) * 0.04
  })

  // ─────────────────────────────────────────────────────────────────────────
  // GEOMETRY LAYOUT
  //  Podium:       w=2.20 h=0.65 d=1.35  y: -1.73 → -1.08
  //  Main tower:   w=1.85 h=3.08 d=1.10  y: -1.08 → +2.00
  //  Upper setback:w=1.50 h=1.10 d=0.88  y: +2.00 → +3.10
  //  Crown:        w=1.52 h=0.35 d=0.90  y: +3.10 → +3.45
  //  Antenna:      r=0.016 h=0.70        y: +3.45 → +4.15
  // ─────────────────────────────────────────────────────────────────────────

  const pY  = -1.405  // podium centre
  const tY  =  0.460  // main tower centre
  const uY  =  2.550  // upper section centre
  const crY =  3.275  // crown centre

  // Corner column x/z (half-extents of main tower + small offset)
  const cX = 0.880, cZ = 0.520
  const colH = 4.20   // height of corner columns (covers podium → crown)

  // Edge glow line positions (outer face of glass)
  const eX = 0.890, eZ = 0.525

  return (
    <group ref={groupRef} position={[0.15, 0, 0]}>

      {/* ═══════════════════════════════════════════════════════════
          INTERIOR WARM LIGHTING — shows through glass facade
          4 warm lights spread across floors
      ═══════════════════════════════════════════════════════════ */}
      {[
        { y: -0.70, intensity: 0.9 },
        { y:  0.10, intensity: 1.0 },
        { y:  0.90, intensity: 0.9 },
        { y:  1.65, intensity: 0.8 },
        { y:  2.35, intensity: 0.5 },
      ].map((l, i) => (
        <pointLight
          key={`int-${i}`}
          position={[0, l.y, 0]}
          intensity={l.intensity}
          color="#ffb84d"
          distance={2.2}
          decay={2.5}
        />
      ))}

      {/* ═══════════════════════════════════════════════════════════
          FLOOR PLATES — visible as dark horizontal bands through glass
      ═══════════════════════════════════════════════════════════ */}
      {FLOORS.map(({ y, floorIndex }) => (
        <group key={`floor-${floorIndex}`}>
          {/* Structural floor slab */}
          <mesh position={[0, y - 0.02, 0]} material={matFloor}>
            <boxGeometry args={[1.82, 0.04, 1.07]} />
          </mesh>

          {/* Desk silhouettes — tiny boxes visible through glass */}
          {floorIndex % 2 === 0 && DESK_OFFSETS.map(([dx, dz], di) => (
            <mesh key={di} position={[dx, y + 0.06, dz]} material={matDesk}>
              <boxGeometry args={[0.16, 0.04, 0.09]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ═══════════════════════════════════════════════════════════
          PODIUM — wide concrete base
      ═══════════════════════════════════════════════════════════ */}
      <mesh position={[0, pY, 0]} castShadow receiveShadow material={matPodium}>
        <boxGeometry args={[2.20, 0.65, 1.35]} />
      </mesh>
      {/* Podium top ledge */}
      <mesh position={[0, -1.075, 0]} material={matMetal}>
        <boxGeometry args={[2.24, 0.04, 1.39]} />
      </mesh>

      {/* ═══════════════════════════════════════════════════════════
          MAIN TOWER — glass curtain wall
      ═══════════════════════════════════════════════════════════ */}
      <mesh position={[0, tY, 0]} castShadow material={matGlass}>
        <boxGeometry args={[1.85, 3.08, 1.10]} />
      </mesh>

      {/* Floor separator bands (spandrel panels) */}
      {FLOORS.map(({ y }) => (
        <mesh key={y} position={[0, y, 0]} material={matMetal}>
          <boxGeometry args={[1.87, 0.028, 1.12]} />
        </mesh>
      ))}

      {/* Transition ledge at mid-setback */}
      <mesh position={[0, 2.02, 0]} material={matMetal}>
        <boxGeometry args={[1.88, 0.06, 1.13]} />
      </mesh>

      {/* ═══════════════════════════════════════════════════════════
          UPPER SETBACK
      ═══════════════════════════════════════════════════════════ */}
      <mesh position={[0, uY, 0]} castShadow material={matGlassUpper}>
        <boxGeometry args={[1.50, 1.10, 0.88]} />
      </mesh>
      {[2.20, 2.58, 2.96].map((y, i) => (
        <mesh key={`ub-${i}`} position={[0, y, 0]} material={matMetal}>
          <boxGeometry args={[1.52, 0.025, 0.90]} />
        </mesh>
      ))}
      <mesh position={[0, 3.12, 0]} material={matMetal}>
        <boxGeometry args={[1.53, 0.06, 0.91]} />
      </mesh>

      {/* ═══════════════════════════════════════════════════════════
          CROWN
      ═══════════════════════════════════════════════════════════ */}
      <mesh position={[0, crY, 0]} material={matMetal}>
        <boxGeometry args={[1.52, 0.35, 0.90]} />
      </mesh>
      {/* Crown fin details */}
      {[-0.42, 0, 0.42].map((x, i) => (
        <mesh key={`fin-${i}`} position={[x, crY + 0.22, 0]} material={matMetal}>
          <boxGeometry args={[0.05, 0.18, 0.92]} />
        </mesh>
      ))}

      {/* ═══════════════════════════════════════════════════════════
          SPIRE + BEACON
      ═══════════════════════════════════════════════════════════ */}
      <mesh position={[0, 3.80, 0]} material={matMetal}>
        <cylinderGeometry args={[0.016, 0.016, 0.70, 8]} />
      </mesh>
      {/* Beacon — bright, will bloom */}
      <mesh position={[0, 4.16, 0]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshBasicMaterial color="#4fa8ff" />
      </mesh>

      {/* ═══════════════════════════════════════════════════════════
          CORNER COLUMNS — full height metallic pillars
      ═══════════════════════════════════════════════════════════ */}
      {[[-cX, -cZ], [-cX, cZ], [cX, -cZ], [cX, cZ]].map(([x, z], i) => (
        <mesh key={`col-${i}`} position={[x, 0.73, z]} material={matMetal}>
          <boxGeometry args={[0.065, colH, 0.065]} />
        </mesh>
      ))}

      {/* ═══════════════════════════════════════════════════════════
          EDGE GLOW LINES — bright blue, will bloom strongly
          These are the "digital twin signature" that defines the look
      ═══════════════════════════════════════════════════════════ */}
      {[[-eX, -eZ], [-eX, eZ], [eX, -eZ], [eX, eZ]].map(([x, z], i) => (
        <mesh key={`eg-${i}`} position={[x, 0.73, z]}>
          <boxGeometry args={[0.012, colH, 0.012]} />
          <meshBasicMaterial color="#2F80ED" />
        </mesh>
      ))}

      {/* Horizontal crown glow frame */}
      {[
        { pos: [0, 3.46, eZ] as [number,number,number],  size: [1.56, 0.011, 0.011] as [number,number,number] },
        { pos: [0, 3.46,-eZ] as [number,number,number],  size: [1.56, 0.011, 0.011] as [number,number,number] },
        { pos: [-eX, 3.46, 0] as [number,number,number], size: [0.011, 0.011, 1.06] as [number,number,number] },
        { pos: [ eX, 3.46, 0] as [number,number,number], size: [0.011, 0.011, 1.06] as [number,number,number] },
      ].map(({ pos, size }, i) => (
        <mesh key={`hg-${i}`} position={pos}>
          <boxGeometry args={size} />
          <meshBasicMaterial color="#5ba3f5" />
        </mesh>
      ))}

      {/* ═══════════════════════════════════════════════════════════
          GROUND — shadow catcher + reflection pool
      ═══════════════════════════════════════════════════════════ */}
      <mesh position={[0, -2.10, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.0, 3.0]} />
        <shadowMaterial opacity={0.40} />
      </mesh>

    </group>
  )
}
