import { useEffect, useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Extra Tailwind / CSS classes applied to the wrapper div */
  className?: string
  /** Delay in ms before the entrance transition begins (for stagger effects) */
  delay?: number
}

/**
 * Wrapper that slides children into view the first time they enter the
 * viewport.  Uses IntersectionObserver so it works without any library.
 *
 * On the server the element is fully visible (no opacity:0 flash).
 * The initial hidden state is applied client-side only inside useEffect,
 * which avoids SSR hydration mismatches.
 */
export default function AnimateIn({ children, className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Apply initial hidden state client-side only
    el.classList.add('animate-in')

    const show = () => {
      setTimeout(() => {
        el.classList.add('in-view')
      }, delay)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
