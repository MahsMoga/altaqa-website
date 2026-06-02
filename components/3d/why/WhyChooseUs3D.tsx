import { useEffect, useRef } from 'react'
import WhyChooseUs from '@/components/WhyChooseUs'

/**
 * Why Choose Us section with holographic panel effects.
 *
 * Enhancements:
 *  - Reason cards: subtle CSS 3D depth tilt (max ±4°)
 *  - Holographic scan-line shimmer on hover
 *  - Left panel: depth parallax on scroll
 *  - Statistics numbers: count-up animation on first view
 *  - Active "glow" left border on each card
 */

function addHolographicEffect(card: HTMLElement) {
  let rafId: number

  const onMove = (e: MouseEvent) => {
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width  - 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5
      card.style.transform = `
        perspective(600px)
        rotateY(${(x * 4).toFixed(2)}deg)
        rotateX(${(-y * 4).toFixed(2)}deg)
        translateZ(6px)
      `
      card.style.boxShadow = `
        inset 3px 0 0 #2F80ED,
        ${(-x * 8).toFixed(1)}px ${(y * 8).toFixed(1)}px 24px rgba(47,128,237,0.14)
      `
      // Holographic sheen position
      card.style.setProperty('--holo-x', `${((x + 0.5) * 100).toFixed(1)}%`)
      card.style.setProperty('--holo-y', `${((y + 0.5) * 100).toFixed(1)}%`)
    })
  }

  const onLeave = () => {
    cancelAnimationFrame(rafId)
    card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease'
    card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateZ(0)'
    card.style.boxShadow = ''
    setTimeout(() => { card.style.transition = '' }, 550)
  }

  card.style.transformStyle = 'preserve-3d'
  card.style.position = 'relative'
  card.style.overflow = 'hidden'

  card.addEventListener('mousemove',  onMove)
  card.addEventListener('mouseleave', onLeave)

  return () => {
    card.removeEventListener('mousemove',  onMove)
    card.removeEventListener('mouseleave', onLeave)
    cancelAnimationFrame(rafId)
  }
}

export default function WhyChooseUs3D() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // Inject CSS
    const styleId = 'why-3d-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        /* Holographic shimmer overlay */
        .holo-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at var(--holo-x, 50%) var(--holo-y, 50%),
            rgba(47,128,237,0.06) 0%,
            transparent 60%
          );
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        /* Left panel depth parallax */
        @keyframes panel-float {
          0%, 100% { transform: perspective(800px) rotateY(-1.5deg) translateZ(8px); }
          50%       { transform: perspective(800px) rotateY( 1.5deg) translateZ(8px); }
        }
        .why-left-panel {
          animation: panel-float 8s ease-in-out infinite;
        }

        /* Count-up number */
        @keyframes count-glow {
          0%   { text-shadow: 0 0 0   rgba(47,128,237,0); }
          50%  { text-shadow: 0 0 20px rgba(47,128,237,0.4); }
          100% { text-shadow: 0 0 0   rgba(47,128,237,0); }
        }
        .stat-value-glow {
          animation: count-glow 2s ease-in-out 0.5s;
        }
      `
      document.head.appendChild(style)
    }

    const timer = setTimeout(() => {
      const section = wrapper.querySelector('#why-us')
      if (!section) return

      // Apply left panel depth animation
      const leftPanel = section.querySelector('.lg\\:sticky') as HTMLElement | null
      leftPanel?.classList.add('why-left-panel')

      // Apply holographic tilt to reason cards
      const grid = section.querySelector('.space-y-3, .space-y-4') as HTMLElement | null
      if (grid) {
        const cards = Array.from(grid.querySelectorAll(':scope > div')) as HTMLElement[]
        const cleanups = cards.map(card => {
          card.classList.add('holo-card')
          return addHolographicEffect(card)
        })
        ;(wrapper as any).__cleanupHolo = () => cleanups.forEach(fn => fn())
      }

      // Animate stat numbers on entry
      const stats = section.querySelectorAll('.font-display.font-bold, .font-display.text-3xl') as NodeListOf<HTMLElement>
      const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('stat-value-glow')
            statsObserver.unobserve(entry.target)
          }
        })
      }, { threshold: 0.5 })
      stats.forEach(s => statsObserver.observe(s))
      ;(wrapper as any).__statsObserver = statsObserver
    }, 400)

    return () => {
      clearTimeout(timer)
      ;(wrapper as any).__cleanupHolo?.()
      ;(wrapper as any).__statsObserver?.disconnect()
    }
  }, [])

  return (
    <div ref={wrapperRef}>
      <WhyChooseUs />
    </div>
  )
}
