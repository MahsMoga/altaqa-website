import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'
import * as THREE from 'three'

/**
 * Premium Abu Dhabi commercial tower.
 *
 * Key quality techniques:
 *
 *  1. MeshPhysicalMaterial with transmission — REAL glass (high-end devices)
 *     Light refracts through the glass, environment reflections visible.
 *     Falls back to MeshStandardMaterial + high metalness on mid-tier.
 *
 *  2. CanvasTexture window grid — deterministic warm + cool offices,
 *     applied as emissiveMap so windows glow at night without extra lights.
 *
 *  3. Interior warm PointLights inside building (5 lights, one per zone)
 *     They shine outward through the semi-transparent glass, creating
 *     the warm amber floor-glow visible in the reference image.
 *
 *  4. Bright edge glow lines — meshBasicMaterial = fully bright regardless
 *     of scene lighting → triggers Bloom post-processing strongly.
 *
 *  5. Mouse parallax ±1.5° — subtle depth perception.
 */

// ─── Deterministic window texture ────────────────────────────────────────────
function buildWindowCanvas(cols: number, rows: number, seed: number) {
  const W = 512, H = Math.round((512 / cols) * rows)
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const ctx = cv.getContext('2d')!

  ctx.fillStyle = '#020a15'
  ctx.fillRect(0, 0, W, H)

  const cw = W / cols, rh = H / rows

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const n1 = Math.abs(Math.sin(r * 17.3 + c * 11.7 + seed * 31.1)) % 1
      const n2 = Math.abs(Math.sin(r *  5.1 + c *  7.9 + seed * 13.3)) % 1
      const n3 = Math.abs(Math.sin(r *  3.7 + c * 19.3 + seed *  7.7)) % 1

      if (n1 > 0.09) {
        const brightness = 0.42 + n2 * 0.52
        const isWarm     = n3 > 0.62

        if (isWarm) {
          ctx.fillStyle = `rgba(255, 205, 100, ${brightness * 0.60})`
        } else {
          ctx.fillStyle = `rgba(120, 170, 255, ${brightness * 0.82})`
        }

        const px = cw * 0.09, py = rh * 0.07
        ctx.fillRect(c * cw + px, r * rh + py, cw - px * 2, rh - py * 2)
      }
    }
  }
  const tex = new THREE.CanvasTexture(cv)
  tex.needsUpdate = true
  return tex
}

// ─── Main component ───────────────────────────────────────────────────────────
export function BuildingModel() {
  const groupRef            = useRef<THREE.Group>(null)
  const mouse               = useRef({ x: 0, y: 0 })
  const { isHighEnd }       = useDeviceCapability()

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  // Window textures
  const texMain  = useMemo(() => buildWindowCanvas(10, 16, 1.0), [])
  const texUpper = useMemo(() => buildWindowCanvas( 7, 10, 3.2), [])

  // ── Glass material — physical on high-end (real transmission), standard on mid ──
  const matGlass = useMemo(() => {
    if (isHighEnd) {
      return new THREE.MeshPhysicalMaterial({
        color:             new THREE.Color('#05111e'),
        metalness:         0.10,
        roughness:         0.02,
        transmission:      0.55,   // ← true glass: environment shows through
        thickness:         0.35,
        ior:               1.52,   // glass IOR
        envMapIntensity:   2.5,
        emissiveMap:       texMain,
        emissive:          new THREE.Color(1, 1, 1),
        emissiveIntensity: 1.0,
      })
    }
    // Mid-tier fallback — reflective but opaque
    return new THREE.MeshStandardMaterial({
      color:             new THREE.Color('#061420'),
      metalness:         0.65,
      roughness:         0.0,
      envMapIntensity:   2.0,
      emissiveMap:       texMain,
      emissive:          new THREE.Color(1, 1, 1),
      emissiveIntensity: 0.95,
      transparent:       true,
      opacity:           0.80,
    })
  }, [isHighEnd, texMain])

  const matGlassUpper = useMemo(() => {
    if (isHighEnd) {
      return new THREE.MeshPhysicalMaterial({
        color:             new THREE.Color('#071828'),
        metalness:         0.10,
        roughness:         0.02,
        transmission:      0.50,
        thickness:         0.30,
        ior:               1.52,
        envMapIntensity:   2.2,
        emissiveMap:       texUpper,
        emissive:          new THREE.Color(1, 1, 1),
        emissiveIntensity: 0.90,
      })
    }
    return new THREE.MeshStandardMaterial({
      color:             new THREE.Color('#071828'),
      metalness:         0.60,
      roughness:         0.0,
      emissiveMap:       texUpper,
      emissive:          new THREE.Color(1, 1, 1),
      emissiveIntensity: 0.88,
      transparent:       true,
      opacity:           0.78,
    })
  }, [isHighEnd, texUpper])

  const matMetal = useMemo(() => new THREE.MeshStandardMaterial({
    color:            new THREE.Color('#9ab8cc'),
    metalness:        0.94,
    roughness:        0.05,
    envMapIntensity:  2.0,
  }), [])

  const matPodium = useMemo(() => new THREE.MeshStandardMaterial({
    color:     new THREE.Color('#07101a'),
    metalness: 0.20,
    roughness: 0.68,
  }), [])

  const matFloor = useMemo(() => new THREE.MeshStandardMaterial({
    color:             new THREE.Color('#09141f'),
    emissive:          new THREE.Color('#0e1e32'),
    emissiveIntensity: 0.5,
  }), [])

  useEffect(() => () => {
    [texMain, texUpper, matGlass, matGlassUpper, matMetal, matPodium, matFloor]
      .forEach(r => r.dispose())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 8 floors: y = -1.05 to +1.99 (0.38 per floor)
  const FLOORS = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => -1.05 + i * 0.38), [])

  useFrame(({ clock }) => {
    const g = groupRef.current; if (!g) return
    const t = clock.elapsedTime
    g.rotation.y += 0.00050                               // very slow — 2.1 min / revolution
    g.position.y  = Math.sin(t * 0.44) * 0.050           // gentle float
    g.rotation.x  += (mouse.current.y *  0.022 - g.rotation.x) * 0.04
    g.rotation.z  += (mouse.current.x * -0.016 - g.rotation.z) * 0.04
  })

  // Geometry constants
  const tY  = 0.47    // main tower centre
  const uY  = 2.56    // upper section centre
  const crY = 3.28    // crown centre
  const cX  = 0.885, cZ = 0.515    // corner column x/z
  const eX  = 0.892, eZ = 0.522    // edge glow x/z (just outside glass)
  const colH = 4.18

  return (
    <group ref={groupRef} position={[0.15, 0, 0]}>

      {/* ── Interior warm lighting — shines through glass ── */}
      {[
        { y: -0.68, i: 0.95 }, { y: 0.12, i: 1.05 },
        { y: 0.90,  i: 0.95 }, { y: 1.68, i: 0.85 },
        { y: 2.40,  i: 0.55 },
      ].map((l, i) => (
        <pointLight key={`il-${i}`} position={[0, l.y, 0]}
          intensity={l.i} color="#ffc060" distance={2.4} decay={2.5} />
      ))}

      {/* ── Floor plates — visible through glass ── */}
      {FLOORS.map((y, i) => (
        <mesh key={`fp-${i}`} position={[0, y - 0.02, 0]} material={matFloor}>
          <boxGeometry args={[1.82, 0.04, 1.07]} />
        </mesh>
      ))}

      {/* ── Podium ── */}
      <mesh position={[0, -1.40, 0]} castShadow receiveShadow material={matPodium}>
        <boxGeometry args={[2.20, 0.66, 1.35]} />
      </mesh>
      <mesh position={[0, -1.07, 0]} material={matMetal}>
        <boxGeometry args={[2.24, 0.04, 1.39]} />
      </mesh>

      {/* ── Main tower — glass curtain wall ── */}
      <mesh position={[0, tY, 0]} castShadow material={matGlass}>
        <boxGeometry args={[1.85, 3.04, 1.10]} />
      </mesh>

      {/* Spandrel bands — floor separators */}
      {FLOORS.map(y => (
        <mesh key={y} position={[0, y, 0]} material={matMetal}>
          <boxGeometry args={[1.87, 0.025, 1.12]} />
        </mesh>
      ))}

      {/* Setback ledge */}
      <mesh position={[0, 2.00, 0]} material={matMetal}>
        <boxGeometry args={[1.88, 0.06, 1.13]} />
      </mesh>

      {/* ── Upper setback ── */}
      <mesh position={[0, uY, 0]} castShadow material={matGlassUpper}>
        <boxGeometry args={[1.50, 1.12, 0.88]} />
      </mesh>
      {[2.20, 2.58, 2.96].map((y, i) => (
        <mesh key={`ub-${i}`} position={[0, y, 0]} material={matMetal}>
          <boxGeometry args={[1.52, 0.022, 0.90]} />
        </mesh>
      ))}
      <mesh position={[0, 3.10, 0]} material={matMetal}>
        <boxGeometry args={[1.53, 0.06, 0.91]} />
      </mesh>

      {/* ── Crown ── */}
      <mesh position={[0, crY, 0]} material={matMetal}>
        <boxGeometry args={[1.52, 0.36, 0.90]} />
      </mesh>
      {[-0.42, 0, 0.42].map((x, i) => (
        <mesh key={`fin-${i}`} position={[x, crY + 0.22, 0]} material={matMetal}>
          <boxGeometry args={[0.05, 0.18, 0.92]} />
        </mesh>
      ))}

      {/* ── Spire + beacon ── */}
      <mesh position={[0, 3.80, 0]} material={matMetal}>
        <cylinderGeometry args={[0.016, 0.016, 0.72, 8]} />
      </mesh>
      <mesh position={[0, 4.17, 0]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshBasicMaterial color="#4fa8ff" />
      </mesh>

      {/* ── Corner columns ── */}
      {[[-cX,-cZ],[-cX,cZ],[cX,-cZ],[cX,cZ]].map(([x,z], i) => (
        <mesh key={`col-${i}`} position={[x, 0.72, z]} material={matMetal}>
          <boxGeometry args={[0.065, colH, 0.065]} />
        </mesh>
      ))}

      {/* ── Edge glow lines — BRIGHT → triggers Bloom strongly ── */}
      {[[-eX,-eZ],[-eX,eZ],[eX,-eZ],[eX,eZ]].map(([x,z], i) => (
        <mesh key={`eg-${i}`} position={[x, 0.72, z]}>
          <boxGeometry args={[0.011, colH, 0.011]} />
          <meshBasicMaterial color="#2F80ED" />
        </mesh>
      ))}

      {/* Top horizontal glow frame */}
      {[
        { p:[0, 3.47, eZ]  as [number,number,number], s:[1.56,0.010,0.010] as [number,number,number] },
        { p:[0, 3.47,-eZ]  as [number,number,number], s:[1.56,0.010,0.010] as [number,number,number] },
        { p:[-eX,3.47,0]   as [number,number,number], s:[0.010,0.010,1.06] as [number,number,number] },
        { p:[ eX,3.47,0]   as [number,number,number], s:[0.010,0.010,1.06] as [number,number,number] },
      ].map(({p,s}, i) => (
        <mesh key={`hg-${i}`} position={p}>
          <boxGeometry args={s} />
          <meshBasicMaterial color="#5ba3f5" />
        </mesh>
      ))}

      {/* ── Shadow catcher ── */}
      <mesh position={[0, -2.10, 0]} rotation={[-Math.PI/2,0,0]} receiveShadow>
        <planeGeometry args={[4.0, 3.0]} />
        <shadowMaterial opacity={0.40} />
      </mesh>

    </group>
  )
}
