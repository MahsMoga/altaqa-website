'use client'
import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { FEATURES, STORAGE_KEY } from '@/config/features'

interface ThreeDContextValue {
  /** Is 3D mode currently active? (env flag + localStorage + device check) */
  is3DEnabled: boolean
  /** Enable 3D, persist to localStorage */
  enable3D: () => void
  /** Disable 3D, persist to localStorage */
  disable3D: () => void
  /** Toggle current state */
  toggle3D: () => void
}

const ThreeDContext = createContext<ThreeDContextValue>({
  is3DEnabled: false,
  enable3D: () => {},
  disable3D: () => {},
  toggle3D: () => {},
})

export function ThreeDProvider({ children }: { children: ReactNode }) {
  // Start false to avoid SSR/hydration flash — client sets correct value in useEffect
  const [is3DEnabled, setIs3DEnabled] = useState(false)

  useEffect(() => {
    // Check URL param first: ?disable3d=true disables for this session
    const params = new URLSearchParams(window.location.search)
    if (params.get('disable3d') === 'true') {
      localStorage.setItem(STORAGE_KEY, 'false')
      setIs3DEnabled(false)
      return
    }
    if (params.get('enable3d') === 'true') {
      localStorage.setItem(STORAGE_KEY, 'true')
      setIs3DEnabled(true)
      return
    }

    // Hydrate from localStorage, fall back to env flag
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      setIs3DEnabled(stored === 'true')
    } else {
      setIs3DEnabled(FEATURES.ENABLE_3D)
    }
  }, [])

  const enable3D = useCallback(() => {
    setIs3DEnabled(true)
    localStorage.setItem(STORAGE_KEY, 'true')
  }, [])

  const disable3D = useCallback(() => {
    setIs3DEnabled(false)
    localStorage.setItem(STORAGE_KEY, 'false')
  }, [])

  const toggle3D = useCallback(() => {
    setIs3DEnabled(prev => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }, [])

  return (
    <ThreeDContext.Provider value={{ is3DEnabled, enable3D, disable3D, toggle3D }}>
      {children}
    </ThreeDContext.Provider>
  )
}

export const use3DContext = () => useContext(ThreeDContext)
