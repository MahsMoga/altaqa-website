import { useEffect, useRef } from 'react'
import BrandCapability from '@/components/BrandCapability'

/**
 * BMS Platform section with floating 3D depth effect.
 *
 * Brand cards receive:
 *  - CSS `translateZ` float — staggered by index
 *  - Cursor-tracking tilt (gentler than services, max ±5°)
 *  - Depth shadow on hover
 *  - Subtle entrance float animation
 */

function applyFloatAndTilt(card: HTMLElement, index: number) {
  // Set initial float offset — creates a "technology wall" depth effect
  const floatDelay  = index * 0.15
  const floatAmt    = 4 + (index % 3) * 2   // 4–8px variation

  card.style.animation = `brand-float-${index % 3} ${4.5 + index * 0.3}s ${floatDelay}s ease-in-out infinite`
  card.style.transformStyle = 'preserve-3d'
  card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'

  let rafId: number

  const onMove = (e: MouseEvent) => {
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width  - 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5
      card.style.transform = `
        perspective(700px)
        rotateY(${(x * 5).toFixed(2)}deg)
        rotateX(${(-y * 5).toFixed(2)}deg)
        translateZ(${floatAmt + 12}px)
        scale(1.015)
      `
      card.style.boxShadow = `
        0 12px 40px rgba(47,128,237,0.18),
        ${(-x * 12).toFixed(1)}px ${(y * 12).toFixed(1)}px 30px rgba(47,128,237,0.1)
      `
    })
  }

  const onLeave = () => {
    cancelAnimationFrame(rafId)
    card.style.transform = `perspective(700px) rotateY(0) rotateX(0) translateZ(${floatAmt}px)`
    card.style.boxShadow = ''
  }

  card.addEventListener('mousemove',  onMove)
  card.addEventListener('mouseleave', onLeave)

  return () => {
    card.removeEventListener('mousemove',  onMove)
    card.removeEventListener('mouseleave', onLeave)
    cancelAnimationFrame(rafId)
  }
}

export default function BrandCapability3D() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // Inject keyframes for float animations
    const styleId = 'brand-float-keyframes'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        @keyframes brand-float-0 {
          0%, 100% { transform: perspective(700px) translateZ(4px) translateY(0); }
          50%       { transform: perspective(700px) translateZ(4px) translateY(-4px); }
        }
        @keyframes brand-float-1 {
          0%, 100% { transform: perspective(700px) translateZ(6px) translateY(0); }
          50%       { transform: perspective(700px) translateZ(6px) translateY(-6px); }
        }
        @keyframes brand-float-2 {
          0%, 100% { transform: perspective(700px) translateZ(8px) translateY(0); }
          50%       { transform: perspective(700px) translateZ(8px) translateY(-3px); }
        }
      `
      document.head.appendChild(style)
    }

    const timer = setTimeout(() => {
      const section = wrapper.querySelector('#platforms')
      if (!section) return

      const grid = section.querySelector('[class*="grid"]')
      if (!grid) return

      const cards = Array.from(
        grid.querySelectorAll(':scope > div')
      ) as HTMLElement[]

      const cleanups = cards.map((el, i) => applyFloatAndTilt(el, i))
      ;(wrapper as any).__cleanup = () => cleanups.forEach(fn => fn())
    }, 400)

    return () => {
      clearTimeout(timer)
      ;(wrapper as any).__cleanup?.()
    }
  }, [])

  return (
    <div ref={wrapperRef}>
      <BrandCapability />
    </div>
  )
}
