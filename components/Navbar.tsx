import { useState } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-16">
          
          <a href="#" className="text-xl font-bold">
            Al Taqa Technical
          </a>

          <ul className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Menu
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}