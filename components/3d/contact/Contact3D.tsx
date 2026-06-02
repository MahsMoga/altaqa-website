import { useEffect, useRef } from 'react'
import Contact from '@/components/Contact'

/**
 * Contact section with Abu Dhabi ambient skyline backdrop.
 *
 * A subtle SVG skyline silhouette is injected as a CSS background layer.
 * The form card receives a glassmorphism depth effect.
 * Contact info cards glow on hover.
 *
 * Original form, fields, validation, and submit logic are unchanged.
 */

// Abu Dhabi–inspired low-polygon skyline in SVG
const SKYLINE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180" preserveAspectRatio="xMidYMax meet">
  <defs>
    <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2F80ED" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#2F80ED" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <!-- Skyline silhouette -->
  <path d="
    M0 180
    L0 140 L30 140 L30 110 L40 110 L40 95 L50 95 L50 110 L60 110 L60 140
    L80 140 L80 100 L90 100 L90 80 L95 80 L95 65 L100 65 L100 80 L105 80 L105 100 L110 100 L110 140
    L130 140 L130 120 L150 120 L150 90 L155 90 L155 75 L162 75 L162 90 L170 90 L170 120 L190 120
    L190 140 L220 140 L220 100 L230 100 L230 85 L235 70 L240 85 L245 100 L255 100 L255 140
    L280 140 L280 115 L290 115 L290 95 L295 95 L295 80 L302 80 L302 95 L308 95 L308 115 L320 115
    L320 140 L350 140 L350 105 L365 105 L365 88 L370 75 L375 88 L380 105 L395 105
    L395 140 L430 140 L430 120 L445 120 L445 95 L455 95 L455 115 L470 115 L470 140
    L500 140 L500 100 L510 100 L510 82 L516 68 L522 82 L528 100 L540 100 L540 140
    L570 140 L570 118 L582 118 L582 100 L588 88 L594 100 L600 118 L612 118 L612 140
    L640 140 L640 108 L650 108 L650 90 L656 78 L662 90 L668 108 L680 108 L680 140
    L700 140 L700 125 L715 125 L715 105 L722 105 L722 88 L728 75 L734 88 L740 105 L747 105
    L747 125 L760 125 L760 140
    L790 140 L790 110 L800 110 L800 90 L808 78 L816 90 L822 110 L832 110 L832 140
    L860 140 L860 120 L875 120 L875 100 L882 86 L888 100 L895 120 L908 120 L908 140
    L940 140 L940 105 L952 105 L952 88 L958 75 L964 88 L970 105 L980 105 L980 140
    L1010 140 L1010 118 L1020 118 L1020 98 L1028 85 L1036 98 L1042 118 L1055 118 L1055 140
    L1080 140 L1080 108 L1094 108 L1094 90 L1100 78 L1106 90 L1112 108 L1124 108 L1124 140
    L1150 140 L1150 122 L1162 122 L1162 104 L1168 90 L1174 104 L1180 122 L1194 122 L1194 140
    L1220 140 L1220 112 L1232 112 L1232 95 L1238 82 L1244 95 L1250 112 L1264 112 L1264 140
    L1290 140 L1290 125 L1302 125 L1302 108 L1308 95 L1314 108 L1320 125 L1332 125 L1332 140
    L1360 140 L1360 118 L1372 118 L1372 100 L1378 88 L1384 100 L1390 118 L1405 118 L1405 140
    L1440 140 L1440 180 Z
  " fill="url(#sky-grad)" />
  <!-- Window lights in buildings -->
  <g opacity="0.4" fill="#2F80ED">
    <rect x="93" y="70" width="4" height="6"/>
    <rect x="99" y="70" width="4" height="6"/>
    <rect x="153" y="80" width="3" height="5"/>
    <rect x="159" y="80" width="3" height="5"/>
    <rect x="233" y="90" width="4" height="5"/>
    <rect x="293" y="85" width="3" height="5"/>
    <rect x="367" y="82" width="4" height="5"/>
    <rect x="373" y="82" width="4" height="5"/>
    <rect x="513" y="75" width="3" height="5"/>
    <rect x="519" y="75" width="3" height="5"/>
    <rect x="586" y="92" width="3" height="5"/>
    <rect x="654" y="82" width="3" height="5"/>
    <rect x="660" y="82" width="3" height="5"/>
    <rect x="726" y="80" width="3" height="5"/>
    <rect x="806" y="82" width="3" height="5"/>
    <rect x="812" y="82" width="3" height="5"/>
    <rect x="880" y="88" width="3" height="5"/>
    <rect x="956" y="80" width="3" height="5"/>
    <rect x="962" y="80" width="3" height="5"/>
    <rect x="1026" y="90" width="3" height="5"/>
    <rect x="1098" y="82" width="3" height="5"/>
    <rect x="1166" y="94" width="3" height="5"/>
    <rect x="1236" y="88" width="3" height="5"/>
    <rect x="1306" y="100" width="3" height="5"/>
    <rect x="1376" y="92" width="3" height="5"/>
  </g>
</svg>
`

export default function Contact3D() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const styleId = 'contact-3d-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        /* Glassmorphism depth on form card */
        .contact-form-3d {
          box-shadow:
            0 24px 64px rgba(11,31,58,0.22),
            0 0 0 1px rgba(47,128,237,0.08),
            inset 0 1px 0 rgba(255,255,255,0.04);
          transform: perspective(1000px) rotateX(-0.5deg);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .contact-form-3d:hover {
          transform: perspective(1000px) rotateX(0deg) translateY(-2px);
          box-shadow:
            0 32px 80px rgba(11,31,58,0.28),
            0 0 0 1px rgba(47,128,237,0.12);
        }

        /* Info card glow */
        .contact-info-3d {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-info-3d:hover {
          transform: translateX(4px) translateZ(4px);
          box-shadow: -3px 0 0 #2F80ED, 0 8px 24px rgba(47,128,237,0.12);
        }
      `
      document.head.appendChild(style)
    }

    const timer = setTimeout(() => {
      const section = wrapper.querySelector('#contact')
      if (!section) return

      // Inject skyline backdrop
      const skylineDiv = document.createElement('div')
      skylineDiv.setAttribute('aria-hidden', 'true')
      Object.assign(skylineDiv.style, {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '180px',
        pointerEvents: 'none',
        zIndex: '0',
        overflow: 'hidden',
      })
      skylineDiv.innerHTML = SKYLINE_SVG
      ;(section as HTMLElement).style.position = 'relative'
      ;(section as HTMLElement).style.overflow = 'hidden'
      section.appendChild(skylineDiv)

      // Enhance form card
      const formCard = section.querySelector('.bg-white.rounded-2xl') as HTMLElement | null
      formCard?.classList.add('contact-form-3d')

      // Enhance info cards
      const infoCards = section.querySelectorAll('.flex.items-start.gap-4.p-4') as NodeListOf<HTMLElement>
      infoCards.forEach(card => card.classList.add('contact-info-3d'))

      ;(wrapper as any).__skylineDiv = skylineDiv
    }, 300)

    return () => {
      clearTimeout(timer)
      ;(wrapper as any).__skylineDiv?.remove()
    }
  }, [])

  return (
    <div ref={wrapperRef}>
      <Contact />
    </div>
  )
}
