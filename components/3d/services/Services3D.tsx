import { useEffect, useRef } from 'react'
import Services from '@/components/Services'

/**
 * Services section with CSS 3D tilt interaction.
 *
 * APPROACH: Renders original <Services /> unchanged, then applies
 * perspective tilt + shadow depth via JavaScript event listeners.
 * Original component is never modified. Effects clean up on unmount.
 *
 * Tilt spec: max ±8° — professional, not playful.
 */

function applyTilt(card: HTMLElement) {
  let rafId: number

  const onMove = (e: MouseEvent) => {
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width  - 0.5  // -0.5 → 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5

      card.style.transform = `
        perspective(900px)
        rotateY(${(x * 8).toFixed(2)}deg)
        rotateX(${(-y * 8).toFixed(2)}deg)
        translateZ(10px)
        scale(1.01)
      `
      card.style.boxShadow = `
        ${(-x * 18).toFixed(1)}px ${(y * 18).toFixed(1)}px 40px rgba(47,128,237,0.16),
        0 16px 48px rgba(11,31,58,0.18)
      `
    })
  }

  const onLeave = () => {
    cancelAnimationFrame(rafId)
    card.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1), box-shadow 0.55s ease'
    card.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateZ(0) scale(1)'
    card.style.boxShadow = ''
    // Remove transition after animation completes
    const tid = setTimeout(() => { card.style.transition = '' }, 600)
    return () => clearTimeout(tid)
  }

  const onEnter = () => {
    card.style.transition = 'none'
    card.style.willChange = 'transform'
  }

  card.addEventListener('mousemove',  onMove)
  card.addEventListener('mouseleave', onLeave)
  card.addEventListener('mouseenter', onEnter)

  return () => {
    card.removeEventListener('mousemove',  onMove)
    card.removeEventListener('mouseleave', onLeave)
    card.removeEventListener('mouseenter', onEnter)
    cancelAnimationFrame(rafId)
  }
}

export default function Services3D() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // Allow time for AnimateIn to run before querying cards
    const timer = setTimeout(() => {
      const section = wrapper.querySelector('#services')
      if (!section) return

      // Target the card containers (children of the grid)
      const grid = section.querySelector('[class*="grid"]')
      if (!grid) return

      const cardWrappers = Array.from(grid.querySelectorAll(':scope > div')) as HTMLElement[]
      const cleanups = cardWrappers.map(el => {
        el.style.transformStyle = 'preserve-3d'
        return applyTilt(el)
      })

      // Store cleanup for return
      ;(wrapper as any).__cleanupTilt = () => cleanups.forEach(fn => fn())
    }, 400)

    return () => {
      clearTimeout(timer)
      ;(wrapper as any).__cleanupTilt?.()
    }
  }, [])

  return (
    <div ref={wrapperRef}>
      <Services />
    </div>
  )
}
