export const GA_ID = 'G-EQQBVH9TET'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

export function gtagEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}
