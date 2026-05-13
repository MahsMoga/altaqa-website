const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Core Expertise', href: '#expertise' },
  { label: 'Our Services', href: '#services' },
  { label: 'BMS Platforms', href: '#' },
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
    <footer className="bg-navy-dark border-t border-white/10">
      {/* Main footer content */}
      <div className="container-narrow py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 16V8l7-5 7 5v8" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <rect x="7" y="11" width="2.5" height="5" rx="0.5" fill="white"/>
                  <rect x="10.5" y="11" width="2.5" height="5" rx="0.5" fill="white"/>
                  <circle cx="10" cy="7.5" r="1" fill="white"/>
                </svg>
              </div>
              <div>
                <span className="block text-white font-semibold text-sm" style={{ fontFamily: 'var(--font-sora)' }}>
                  Al Taqa Technical
                </span>
                <span className="block text-white/40 text-xs">General Contracting LLC</span>
              </div>
            </div>
            <p className="text-white/45 text-xs leading-relaxed mb-5">
              Building Intelligence. Delivering Excellence.
              Premier provider of automation and energy management
              solutions in Abu Dhabi, UAE.
            </p>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1C4.79 1 3 2.79 3 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.21-1.79-4-4-4z" stroke="#2F80ED" strokeWidth="1.2"/>
                <circle cx="7" cy="5" r="1.2" stroke="#2F80ED" strokeWidth="1.2"/>
              </svg>
              <span className="text-white/40 text-xs">Abu Dhabi, UAE</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-white/90 font-semibold text-sm mb-5" style={{ fontFamily: 'var(--font-sora)' }}>
              Quick Links
            </div>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/45 hover:text-accent text-xs transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="text-white/90 font-semibold text-sm mb-5" style={{ fontFamily: 'var(--font-sora)' }}>
              Services
            </div>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <span className="text-white/45 text-xs">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <div className="text-white/90 font-semibold text-sm mb-5" style={{ fontFamily: 'var(--font-sora)' }}>
              Get in Touch
            </div>
            <div className="space-y-3">
              <div className="text-white/45 text-xs">
                <div className="text-white/65 font-medium mb-0.5">Email</div>
                info@altaqauae.com
              </div>
              <div className="text-white/45 text-xs">
                <div className="text-white/65 font-medium mb-0.5">Location</div>
                Abu Dhabi, United Arab Emirates
              </div>
              <div className="text-white/45 text-xs">
                <div className="text-white/65 font-medium mb-0.5">Support</div>
                24/7 for Emergency issues
              </div>
            </div>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-accent text-xs font-semibold
                         hover:text-accent-light transition-colors group"
            >
              Contact Us
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-narrow py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white/30 text-xs">
            © {year} Al Taqa Technical General Contracting LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-white/20 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            <span className="text-white/30">Building Intelligence. Delivering Excellence.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
