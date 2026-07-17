import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

const serviceItems = [
  { slug: 'bms-installation',          label: 'BMS Design & Installation', color: '#2F80ED', desc: 'End-to-end BMS design, supply & commissioning' },
  { slug: 'energy-management',         label: 'Energy Management',          color: '#10B981', desc: 'Analytics, optimisation & LEED/ESTIDAMA support' },
  { slug: 'annual-maintenance',        label: 'Annual Maintenance (AMC)',   color: '#F59E0B', desc: 'Scheduled PPM, emergency cover & remote monitoring' },
  { slug: 'guest-room-management',     label: 'Guest Room Management',      color: '#8B5CF6', desc: 'GRMS for hotels — comfort + 20–30% energy saving' },
  { slug: 'smart-metering',            label: 'Smart Metering',             color: '#06B6D4', desc: 'Sub-metering, LoRaWAN & real-time dashboards' },
  { slug: 'automatic-control-systems', label: 'Control Systems',            color: '#EF4444', desc: 'HVAC, AHU, chiller & electrical control panels' },
]

const navLinks = [
  { label: 'About',    hash: 'about' },
  { label: 'Products', hash: 'products' },
  { label: 'Expertise',hash: 'expertise' },
  { label: 'Why Us',   hash: 'why-us' },
  { label: 'Contact',  hash: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false)
  const [menuOpen, setMenuOpen]         = useState(false)
  const [dropOpen, setDropOpen]         = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const dropRef = useRef<HTMLLIElement>(null)
  const router  = useRouter()
  const isHome  = router.pathname === '/'

  const navHref = (hash: string) => isHome ? `#${hash}` : `/#${hash}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); setDropOpen(false) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  // Mobile services sub-list toggle
  const [mobileServOpen, setMobileServOpen] = useState(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-dark border-b border-white/[0.08] shadow-[0_4px_32px_rgba(0,0,0,0.28)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-narrow" ref={menuRef}>
        <nav className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 flex-shrink-0">
            <div style={{ position: 'relative', width: '110px', height: '52px' }}>
              <Image src="/al-taqa-logo.png" alt="Al Taqa Technical Logo" fill priority
                style={{ objectFit: 'contain' }} />
            </div>
            <div className="hidden sm:block">
              <span className="block text-white font-semibold text-sm leading-tight font-display">
                Al Taqa Technical
              </span>
              <span className="block text-white/45 text-xs tracking-wide">
                General Contracting LLC
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-7 lg:gap-8">

            {/* Services dropdown */}
            <li ref={dropRef} className="relative">
              <button
                onClick={() => setDropOpen(o => !o)}
                className={`nav-link flex items-center gap-1 text-sm font-medium tracking-wide py-1 transition-colors duration-150
                  ${dropOpen ? 'text-white' : 'text-white/70 hover:text-white'}`}
                aria-haspopup="true"
                aria-expanded={dropOpen}
              >
                Services
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                  className={`transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}>
                  <path d="M2.5 4.5l3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Mega-dropdown panel */}
              {dropOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(10,22,40,0.97)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <div className="px-4 pt-4 pb-2">
                    <p className="text-white/35 text-[10px] font-bold tracking-widest uppercase">Our Services</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1 p-3">
                    {serviceItems.map(s => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        onClick={() => setDropOpen(false)}
                        className="flex items-start gap-3 p-3 rounded-xl transition-colors duration-150 group"
                        style={{ background: 'transparent' }}
                        onMouseEnter={e => (e.currentTarget.style.background = `${s.color}10`)}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${s.color}20`, border: `1px solid ${s.color}30` }}>
                          <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                        </div>
                        <div>
                          <div className="text-white text-xs font-semibold leading-tight mb-0.5 group-hover:text-white">
                            {s.label}
                          </div>
                          <div className="text-white/40 text-[10px] leading-relaxed">{s.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-white/[0.07] px-5 py-3 flex items-center justify-between">
                    <span className="text-white/30 text-[10px]">BMS · HVAC · Metering · Controls</span>
                    <a href={navHref('services')} onClick={() => setDropOpen(false)}
                      className="text-accent text-[11px] font-semibold hover:text-accent-light transition-colors flex items-center gap-1">
                      All services
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5h6M5 2.5L7.5 5 5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </li>

            {/* Regular links */}
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={navHref(link.hash)}
                  className="nav-link text-white/70 hover:text-white text-sm font-medium
                             transition-colors duration-150 tracking-wide py-1">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a href={navHref('contact')} className="btn-primary text-sm py-2.5 px-5">
              Request a Site Survey
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" strokeLinecap="round" />
                  <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
                  <line x1="4" y1="17" x2="20" y2="17" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-white/[0.08] py-3 pb-5 space-y-0.5">

            {/* Services accordion */}
            <button
              onClick={() => setMobileServOpen(o => !o)}
              className="w-full flex items-center justify-between text-white/75 hover:text-white py-3 px-4
                         text-sm font-medium rounded-xl hover:bg-white/[0.06] transition-colors"
            >
              Services
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                className={`transition-transform duration-200 ${mobileServOpen ? 'rotate-180' : ''}`}>
                <path d="M2.5 4.5l3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Mobile sub-items */}
            <div className={`overflow-hidden transition-all duration-300 ${mobileServOpen ? 'max-h-96' : 'max-h-0'}`}>
              <div className="pl-4 pb-1 space-y-0.5">
                {serviceItems.map(s => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => { setMenuOpen(false); setMobileServOpen(false) }}
                    className="flex items-center gap-3 text-white/60 hover:text-white py-2.5 px-4
                               text-sm rounded-xl hover:bg-white/[0.06] transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={navHref(link.hash)}
                onClick={() => setMenuOpen(false)}
                className="flex items-center text-white/75 hover:text-white py-3 px-4 text-sm font-medium
                           rounded-xl hover:bg-white/[0.06] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 px-1">
              <a href={navHref('contact')} onClick={() => setMenuOpen(false)}
                className="btn-primary w-full justify-center">
                Request a Site Survey
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
