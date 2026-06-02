import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Purposeful orbital data rings.
 *
 * Three rings represent real building intelligence systems:
 *   Ring 1 — BMS (Building Management System)    — brand blue,  horizontal
 *   Ring 2 — Energy Monitoring                    — amber,       tilted 28°
 *   Ring 3 — HVAC / Environmental                 — teal,        tilted −22°
 *
 * Each ring has:
 *   - A subtle torus (the orbit path)
 *   - 4 pulsing sensor nodes positioned on the ring
 *   - 2 moving data-packet spheres orbiting continuously
 *
 * No random particles — every element is purposeful and anchored to the ring.
 */

interface RingConfig {
  radius:    number
  tube:      number
  color:     string
  nodeColor: string
  y:         number
  tiltX:     number   // rotation.x (tilt from horizontal)
  speed:     number   // rad / frame
  nodeCount: number
  label:     string
}

const RINGS: RingConfig[] = [
  {
    radius: 2.05, tube: 0.010, color: '#2F80ED', nodeColor: '#5ba3f5',
    y: 0.6,  tiltX: 0,               speed:  0.0025, nodeCount: 4, label: 'BMS',
  },
  {
    radius: 1.85, tube: 0.009, color: '#f59e0b', nodeColor: '#fbbf24',
    y: 1.85, tiltX: Math.PI / 6.5,   speed: -0.0032, nodeCount: 3, label: 'ENERGY',
  },
  {
    radius: 1.95, tube: 0.009, color: '#14b8a6', nodeColor: '#2dd4bf',
    y:-0.35, tiltX: -Math.PI / 8,    speed:  0.0018, nodeCount: 4, label: 'HVAC',
  },
]

// ------- Sensor node (stationary, pulses) -------
interface SensorNodeProps {
  angle:  number
  radius: number
  color:  string
  phase:  number
}

function SensorNode({ angle, radius, color, phase }: SensorNodeProps) {
  const meshRef  = useRef<THREE.Mesh>(null)
  const ringRef  = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const pulse = 0.7 + Math.abs(Math.sin(t * 1.4 + phase)) * 0.5
    if (meshRef.current) {
      meshRef.current.scale.setScalar(pulse * 0.9)
    }
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.15 + Math.abs(Math.sin(t * 1.4 + phase)) * 0.3
      ringRef.current.scale.setScalar(1 + Math.abs(Math.sin(t * 1.4 + phase)) * 0.6)
    }
  })

  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius

  return (
    <group position={[x, 0, z]}>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.032, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Expanding ring (fake glow) */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.04, 0.065, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

// ------- Moving data packet -------
interface PacketProps {
  radius:  number
  color:   string
  speed:   number   // ring speed (rad/frame)
  offset:  number   // initial angle offset
}

function DataPacket({ radius, color, speed, offset }: PacketProps) {
  const meshRef  = useRef<THREE.Mesh>(null)
  const trailRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t  = clock.elapsedTime
    const a  = t * (speed * 60) + offset   // convert rad/frame → rad/s × elapsed

    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(a) * radius
      meshRef.current.position.z = Math.sin(a) * radius
    }
    // Trail: slightly behind the packet
    if (trailRef.current) {
      const at = a - Math.sign(speed) * 0.25
      trailRef.current.position.x = Math.cos(at) * radius
      trailRef.current.position.z = Math.sin(at) * radius
      const mat = trailRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.35
    }
  })

  return (
    <>
      {/* Bright leading packet */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Fading trail */}
      <mesh ref={trailRef}>
        <sphereGeometry args={[0.018, 6, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} depthWrite={false} />
      </mesh>
    </>
  )
}

// ------- Single ring assembly -------
function OrbitalRing({ cfg }: { cfg: RingConfig }) {
  const groupRef = useRef<THREE.Group>(null)

  // Pre-compute stable node angles
  const nodeAngles = useMemo(
    () =>
      Array.from({ length: cfg.nodeCount }, (_, i) =>
        (i / cfg.nodeCount) * Math.PI * 2
      ),
    [cfg.nodeCount]
  )

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += cfg.speed
    }
  })

  return (
    <group position={[0, cfg.y, 0]} rotation={[cfg.tiltX, 0, 0]}>
      <group ref={groupRef}>
        {/* Orbit path torus */}
        <mesh>
          <torusGeometry args={[cfg.radius, cfg.tube, 4, 80]} />
          <meshBasicMaterial
            color={cfg.color}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Sensor nodes */}
        {nodeAngles.map((angle, i) => (
          <SensorNode
            key={i}
            angle={angle}
            radius={cfg.radius}
            color={cfg.nodeColor}
            phase={i * 1.8}
          />
        ))}

        {/* Two data packets per ring */}
        <DataPacket radius={cfg.radius} color={cfg.nodeColor} speed={cfg.speed * 2.5} offset={0}           />
        <DataPacket radius={cfg.radius} color={cfg.nodeColor} speed={cfg.speed * 2.5} offset={Math.PI}     />
      </group>
    </group>
  )
}

// ------- Exported component -------
export function OrbitalRings() {
  return (
    <>
      {RINGS.map((cfg) => (
        <OrbitalRing key={cfg.label} cfg={cfg} />
      ))}
    </>
  )
}
