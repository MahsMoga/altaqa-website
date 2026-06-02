import { useEffect, useRef } from 'react'
import ProcessFlow from '@/components/ProcessFlow'

/**
 * Process flow section with animated energy pipeline.
 *
 * Enhancements:
 *  - Step circles pulse with a glow ring animation
 *  - Connector lines have animated data flow (moving gradient)
 *  - Step cards slide-scale on hover
 *  - Numbers count up on first view (IntersectionObserver)
 */

export default function ProcessFlow3D() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // Inject CSS for process animations
    const styleId = 'process-3d-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        /* Pulsing glow ring on step circles */
        @keyframes step-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(47,128,237,0.55); }
          60%  { box-shadow: 0 0 0 10px rgba(47,128,237,0);   }
          100% { box-shadow: 0 0 0 0   rgba(47,128,237,0);    }
        }
        .process-step-circle {
          animation: step-pulse 2.5s ease-out infinite;
        }

        /* Flowing gradient on connector lines */
        @keyframes flow-move {
          0%   { background-position: 0%   50%; }
          100% { background-position: 200% 50%; }
        }
        .process-connector-flow {
          background: linear-gradient(
            90deg,
            rgba(47,128,237,0.08)  0%,
            rgba(47,128,237,0.6)  40%,
            rgba(91,163,245,0.8)  50%,
            rgba(47,128,237,0.6)  60%,
            rgba(47,128,237,0.08) 100%
          );
          background-size: 200% 100%;
          animation: flow-move 2.5s linear infinite;
        }

        /* Step content hover */
        .process-step-item {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .process-step-item:hover {
          transform: translateY(-4px) scale(1.02);
        }

        /* Staggered entrance */
        @keyframes step-reveal {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .process-step-animated {
          opacity: 0;
          animation: step-reveal 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
        }
      `
      document.head.appendChild(style)
    }

    const timer = setTimeout(() => {
      const section = wrapper.querySelector('[class*="section-padding"]')
      if (!section) return

      // Enhance desktop step circles
      const circles = section.querySelectorAll('.rounded-full.bg-accent') as NodeListOf<HTMLElement>
      circles.forEach((circle) => {
        circle.classList.add('process-step-circle')
      })

      // Enhance connector lines (the gradient div elements)
      const connectors = section.querySelectorAll('[class*="gradient-to-r"]') as NodeListOf<HTMLElement>
      connectors.forEach(connector => {
        connector.classList.add('process-connector-flow')
      })

      // Add hover effect to step containers
      const desktopSteps = section.querySelectorAll('.hidden.lg\\:flex > div') as NodeListOf<HTMLElement>
      desktopSteps.forEach((step) => {
        step.classList.add('process-step-item')
      })

      // Staggered entrance for mobile steps
      const mobileSteps = section.querySelectorAll('.lg\\:hidden > div') as NodeListOf<HTMLElement>
      let delay = 0
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const step = entry.target as HTMLElement
          step.classList.add('process-step-animated')
          step.style.animationDelay = `${delay}s`
          delay += 0.1
          observer.unobserve(step)
        })
      }, { threshold: 0.2 })

      mobileSteps.forEach(step => observer.observe(step))

      ;(wrapper as any).__processObserver = observer
    }, 400)

    return () => {
      clearTimeout(timer)
      ;(wrapper as any).__processObserver?.disconnect()
    }
  }, [])

  return (
    <div ref={wrapperRef}>
      <ProcessFlow />
    </div>
  )
}
