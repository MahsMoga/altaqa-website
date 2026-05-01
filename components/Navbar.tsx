import { useState, useEffect } from 'react'
import Image from 'next/image'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-narrow">
        <nav className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <Image src="/al-taqa-logo.png" alt="Al Taqa Technical Logo" width={110} height={60} priority />
            <div>
              <span
                className="block text-white font-semibold text-sm leading-tight"
                style={{ fontFamily: 'var(--font-sora)' }}
              >
                Al Taqa Technical
              </span>
              <span className="block text-white/50 text-xs tracking-wide">
                General Contracting LLC
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-white/75 hover:text-white text-sm font-medium transition-colors duration-150 tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <a href="#contact" className="btn-primary text-sm py-2.5 px-5">
              Get in Touch
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" strokeLinecap="round"/>
                  <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round"/>
                  <line x1="4" y1="17" x2="20" y2="17" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-navy-dark border-t border-white/10 py-4 px-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-white/80 hover:text-white py-3 px-4 text-sm font-medium rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block mt-3 btn-primary text-center justify-center"
            >
              Get in Touch
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
