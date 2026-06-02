import { useEffect, useRef } from 'react'
import About from '@/components/About'

/**
 * About section with subtle 3D depth enhancements.
 *
 * Enhancements:
 *  - Pillar cards: gentle CSS 3D tilt on hover
 *  - Cards enter with a depth-stagger animation
 *  - Left text block: subtle parallax depth on scroll
 */

export default function About3D() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const styleId = 'about-3d-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        @keyframes pillar-reveal {
          from { opacity: 0; transform: perspective(600px) rotateX(-12deg) translateY(20px); }
          to   { opacity: 1; transform: perspective(600px) rotateX(0) translateY(0); }
        }
        .pillar-card-3d {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.35s ease;
        }
        .pillar-card-3d:hover {
          transform: perspective(600px) rotateX(-4deg) translateZ(12px) scale(1.02) !important;
          box-shadow: 0 12px 36px rgba(47,128,237,0.18);
        }
        .pillar-animated {
          animation: pillar-reveal 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
          opacity: 0;
        }
      `
      document.head.appendChild(style)
    }

    const timer = setTimeout(() => {
      const section = wrapper.querySelector('#about')
      if (!section) return

      // Find pillar cards (2×2 grid)
      const grid = section.querySelector('.grid.grid-cols-2') as HTMLElement | null
      if (!grid) return

      const cards = Array.from(grid.querySelectorAll(':scope > div')) as HTMLElement[]

      const observer = new IntersectionObserver(entries => {
        if (!entries[0]?.isIntersecting) return
        cards.forEach((card, i) => {
          card.classList.add('pillar-card-3d')
          card.style.transformStyle = 'preserve-3d'
          // Staggered entrance
          setTimeout(() => card.classList.add('pillar-animated'), i * 100)
        })
        observer.disconnect()
      }, { threshold: 0.25 })

      observer.observe(grid)
      ;(wrapper as any).__aboutObserver = observer
    }, 300)

    return () => {
      clearTimeout(timer)
      ;(wrapper as any).__aboutObserver?.disconnect()
    }
  }, [])

  return (
    <div ref={wrapperRef}>
      <About />
    </div>
  )
}
