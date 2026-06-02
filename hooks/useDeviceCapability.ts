import { useEffect, useState } from 'react'

export type GPUTier = 'high' | 'mid' | 'low'

interface DeviceCapability {
  tier: GPUTier
  /** Can run WebGL 3D (not low-end) */
  canRun3D: boolean
  /** Full quality — high-end desktop */
  isHighEnd: boolean
  /** Mid-range — tablet / newer mobile */
  isMidTier: boolean
  /** Particle count appropriate for device */
  particleCount: number
}

/**
 * Estimates device GPU capability using memory, CPU cores, connection and UA.
 * Used to automatically scale 3D quality.
 *
 * High tier  → full 3D, 500 particles, transmission materials
 * Mid tier   → reduced 3D, 120 particles, standard materials
 * Low tier   → 3D disabled entirely, original flat site
 */
export function useDeviceCapability(): DeviceCapability {
  const [tier, setTier] = useState<GPUTier>('high') // optimistic default

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number
      connection?: { saveData?: boolean; effectiveType?: string }
    }

    const memory     = nav.deviceMemory ?? 4
    const cores      = navigator.hardwareConcurrency ?? 4
    const isMobile   = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    const saveData   = nav.connection?.saveData === true
    const slowConn   = nav.connection?.effectiveType === '2g' || nav.connection?.effectiveType === 'slow-2g'

    // Check WebGL support
    const canvas = document.createElement('canvas')
    const hasWebGL = !!(canvas.getContext('webgl') || canvas.getContext('webgl2'))
    if (!hasWebGL) { setTier('low'); return }

    if (saveData || slowConn || memory < 2 || cores < 2) {
      setTier('low')
    } else if (isMobile || memory < 4 || cores < 4) {
      setTier('mid')
    } else {
      setTier('high')
    }
  }, [])

  return {
    tier,
    canRun3D:      tier !== 'low',
    isHighEnd:     tier === 'high',
    isMidTier:     tier === 'mid',
    particleCount: tier === 'high' ? 500 : tier === 'mid' ? 120 : 0,
  }
}
