import { use3DContext } from '@/context/ThreeDContext'
import { useReducedMotion } from './useReducedMotion'
import { useDeviceCapability } from './useDeviceCapability'

/**
 * Composite hook — returns true only when ALL conditions allow 3D:
 *  1. Feature flag is on (env var / localStorage)
 *  2. User has NOT requested reduced motion
 *  3. Device hardware can support WebGL rendering
 */
export function use3DEnabled(): boolean {
  const { is3DEnabled } = use3DContext()
  const prefersReducedMotion = useReducedMotion()
  const { canRun3D } = useDeviceCapability()

  return is3DEnabled && !prefersReducedMotion && canRun3D
}
