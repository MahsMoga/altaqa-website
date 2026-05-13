import Image from 'next/image'
import AnimateIn from './AnimateIn'

const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Core Expertise', href: '#expertise' },
  { label: 'Our Services', href: '#services' },
  { label: 'BMS Platforms', href: '#platforms' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  'Building Automation',
  'Guest Room Management',
  'Control Systems',
  'Energy Management',
  'Smart Metering',
  'Annual Maintenance',
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-dark">
      {/* Gradient top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* Main footer content */}
      <AnimateIn className="container-narrow py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand column — official logo image ─────────────── */}
          <div className="lg:col-span-1">

            {/* Logo image — replaces the SVG icon + text block */}
            <div className="mb-5">
              <div style={{ position: 'relative', width: '140px', height: '72px' }}>
                <Image
                  src="/al-taqa-logo.png"
                  alt="Al Taqa Technical General Contracting LLC"
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'left center' }}
                />
              </div>
            </div>

            <p className="text-white/70 text-xs leading-relaxed mb-5">
              Building Intelligence. Delivering Excellence.
              Premier provider of automation and energy management
              solutions in Abu Dhabi, UAE.
            </p>

            <div className="flex items-center gap-2 mb-5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1C4.79 1 3 2.79 3 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.21-1.79-4-4-4z"
                  stroke="#2F80ED" strokeWidth="1.2"/>
                <circle cx="7" cy="5" r="1.2" stroke="#2F80ED" strokeWidth="1.2"/>
              </svg>
              <span className="text-white/60 text-xs">Abu Dhabi, UAE</span>
            </div>

            {/* LinkedIn social link */}
            <div className="flex items-center gap-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/[0.12]
                           flex items-center justify-center text-white/60
                           hover:text-accent hover:border-accent/40 hover:bg-white/[0.12]
                           transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── Quick links ────────────────────────────────────── */}
          <div>
            <div className="font-display text-white font-semibold text-sm mb-5">
              Quick Links
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-accent text-xs transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ───────────────────────────────────────── */}
          <div>
            <div className="font-display text-white font-semibold text-sm mb-5">
              Services
            </div>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <span className="text-white/65 text-xs">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact info ───────────────────────────────────── */}
          <div>
            <div className="font-display text-white font-semibold text-sm mb-5">
              Get in Touch
            </div>
            <div className="space-y-4">

              <div>
                <div className="text-white/80 font-medium text-xs mb-1">Email</div>
                <a
                  href="mailto:info@altaqauae.com"
                  className="text-white/65 text-xs hover:text-accent transition-colors duration-150"
                >
                  info@altaqauae.com
                </a>
              </div>

              <div>
                <div className="text-white/80 font-medium text-xs mb-1">Location</div>
                <span className="text-white/65 text-xs">Abu Dhabi, United Arab Emirates</span>
              </div>

              <div>
                <div className="text-white/80 font-medium text-xs mb-1">Support</div>
                {/* ── Updated text (Part A) ── */}
                <span className="text-white/65 text-xs">
                  24/7 support over phone for emergency cases for AMC contract clients
                </span>
              </div>

            </div>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-accent text-xs font-semibold
                         hover:text-accent-light transition-colors group"
            >
              Contact Us
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                className="group-hover:translate-x-0.5 transition-transform">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

        </div>
      </AnimateIn>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.10]">
        <div className="container-narrow py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white/60 text-xs">
            © {year} Al Taqa Technical General Contracting LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            <span className="text-white/50">Building Intelligence. Delivering Excellence.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
