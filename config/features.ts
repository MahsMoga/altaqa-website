/**
 * Global feature flags for Al Taqa Technical website.
 *
 * ENABLE_3D = true  → Premium 3D experience (Three.js canvas + CSS 3D effects)
 * ENABLE_3D = false → Original flat website, zero overhead, instant rollback
 *
 * Source priority:
 *   1. localStorage (user preference, set via enable3D() / disable3D())
 *   2. NEXT_PUBLIC_ENABLE_3D env variable
 *   3. false (safe default if neither is set)
 */

export const FEATURES = {
  /** Master toggle. Reads env var at build time. Runtime override via ThreeDContext. */
  ENABLE_3D: process.env.NEXT_PUBLIC_ENABLE_3D === 'true',
} as const

export const STORAGE_KEY = 'altaqa_3d_enabled' as const
