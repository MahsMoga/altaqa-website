'use client'
import { useRef, useEffect, useState, Component, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

/**
 * ═══════════════════════════════════════════════════════════════
 *  PREMIUM GLB BUILDING LOADER
 * ═══════════════════════════════════════════════════════════════
 *
 *  SETUP — ONE STEP:
 *    Place your architectural GLB file at:
 *    /public/models/building.glb
 *
 *  FREE PREMIUM SOURCES (ranked by quality):
 *
 *  1. Sketchfab (best quality — photorealistic)
 *     → sketchfab.com/search?q=office+building&price=free
 *     → Filter: Architecture | Free | Downloadable
 *     → Download as GLB
 *     → Rename to building.glb → place in /public/models/
 *
 *  2. Kenney City Kit Commercial (CC0 — no attribution needed)
 *     → kenney.nl/assets/city-kit-commercial
 *     → Download ZIP → extract → pick tallest building GLB
 *
 *  3. Spline (create your own, browser-based, free)
 *     → spline.design → use building template → export GLB
 *
 *  4. CGTrader / TurboSquid (free filter)
 *     → Search "office tower" or "commercial building" → Free → GLB
 *
 *  Recommended Sketchfab models (search these by name):
 *    - "Skyscraper Glass Tower" by Various
 *    - "Modern Office Building" architecture
 *    - "Abu Dhabi Tower" (if available)
 *    - Any high-rise commercial building, glass facade
 *
 *  Once /public/models/building.glb exists, the 3D scene
 *  automatically loads it with proper scaling, materials, and animation.
 * ═══════════════════════════════════════════════════════════════
 */

// ─── GLB loader component ─────────────────────────────────────────────────────
function GLBBuilding({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/building.glb')

  // Normalize model on load — centers it and scales to fit the scene
  useEffect(() => {
    if (!scene) return

    const box    = new THREE.Box3().setFromObject(scene)
    const size   = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)

    // Normalize height to ~5.5 units (fills canvas)
    const scale = 5.5 / maxDim
    scene.scale.setScalar(scale)

    // Centre the model at origin, sit on ground plane
    scene.position.set(
      -center.x * scale,
      -box.min.y * scale,
      -center.z * scale
    )

    // Enhance every mesh material for premium rendering
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      if (!child.material) return

      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach(mat => {
        if (mat instanceof THREE.MeshStandardMaterial ||
            mat instanceof THREE.MeshPhysicalMaterial) {
          // Boost environment map reflections on all surfaces
          mat.envMapIntensity = 2.2
          // Enable shadows
          child.castShadow    = true
          child.receiveShadow = true
          mat.needsUpdate     = true
        }
      })
    })
  }, [scene])

  // Gentle rotation + float + mouse parallax
  useFrame(({ clock }) => {
    const g = groupRef.current
    if (!g) return
    g.rotation.y  += 0.00045
    g.position.y   = Math.sin(clock.elapsedTime * 0.42) * 0.04
    g.rotation.x  += (mouse.current.y *  0.020 - g.rotation.x) * 0.04
    g.rotation.z  += (mouse.current.x * -0.014 - g.rotation.z) * 0.04
  })

  return <group ref={groupRef}><primitive object={scene} /></group>
}

// NOTE: Do NOT call useGLTF.preload here.
// The file doesn't exist until the user places it in /public/models/building.glb
// Calling preload at module level throws a 404 crash before React can catch it.

// ─── Error boundary — catches "model not found" gracefully ───────────────────
interface BoundaryProps { children: ReactNode; fallback: ReactNode }
interface BoundaryState { error: boolean }

class ModelErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  render() {
    return this.state.error ? this.props.fallback : this.props.children
  }
}

// ─── Placeholder shown when /public/models/building.glb is missing ───────────
/**
 * Minimal placeholder — a barely-visible wireframe outline.
 * Replaced immediately once the GLB file is added.
 * Does NOT use box geometry for the building appearance.
 */
function ModelMissingPlaceholder() {
  const groupRef = useRef<THREE.Group>(null)

  // Thin wireframe outline only — communicates "building shape" without detail
  const frameGeo = useRef(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.8, 4.5, 1.0)))
  const glowGeo  = useRef(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.0, 2.8, 0.7)))

  useFrame(({ clock }) => {
    const g = groupRef.current
    if (!g) return
    g.rotation.y  += 0.0005
    g.position.y   = Math.sin(clock.elapsedTime * 0.4) * 0.04
  })

  return (
    <group ref={groupRef} position={[0.15, 0, 0]}>
      {/* Outer tower wireframe */}
      <lineSegments geometry={frameGeo.current}>
        <lineBasicMaterial color="#2F80ED" transparent opacity={0.25} />
      </lineSegments>
      {/* Upper section wireframe */}
      <lineSegments geometry={glowGeo.current} position={[0, 1.2, 0]}>
        <lineBasicMaterial color="#5ba3f5" transparent opacity={0.18} />
      </lineSegments>
      {/* Centre notice — shows in console, not on screen */}
      {/* Vertical edge accents */}
      {[[-0.9,-0.5],[0.9,-0.5],[-0.9,0.5],[0.9,0.5]].map(([x,z],i) => (
        <mesh key={i} position={[x, 0, z]}>
          <boxGeometry args={[0.01, 4.5, 0.01]} />
          <meshBasicMaterial color="#2F80ED" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

// ─── Public export ────────────────────────────────────────────────────────────
export function BuildingModel() {
  const mouse = useRef({ x: 0, y: 0 })
  // Track whether building.glb has been placed by the user
  const [modelAvailable, setModelAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', fn, { passive: true })

    // Probe for the GLB file without crashing — a HEAD request is cheap
    fetch('/models/building.glb', { method: 'HEAD' })
      .then(r => setModelAvailable(r.ok))
      .catch(() => setModelAvailable(false))

    return () => window.removeEventListener('mousemove', fn)
  }, [])

  // Still checking
  if (modelAvailable === null) return null

  // File confirmed present — load the GLB
  if (modelAvailable) {
    return (
      <ModelErrorBoundary fallback={<ModelMissingPlaceholder />}>
        <GLBBuildingWrapper mouse={mouse} />
      </ModelErrorBoundary>
    )
  }

  // File not found — show wireframe placeholder and log instructions
  // eslint-disable-next-line no-console
  console.info(
    '[Al Taqa 3D] No building model found.\n' +
    'Place a GLB architectural model at /public/models/building.glb\n' +
    'Free sources: sketchfab.com (Architecture, Free) | kenney.nl/assets/city-kit-commercial'
  )
  return <ModelMissingPlaceholder />
}

// Wrapper keeps Suspense isolated from the HEAD-check state
function GLBBuildingWrapper({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>
}) {
  return <GLBBuilding mouse={mouse} />
}
