export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Company */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Al Taqa Technical
            </h3>

            <p className="text-white/70 leading-relaxed">
              Intelligent building automation and engineering solutions
              for modern infrastructure.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">
              Quick Links
            </h4>

            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#about" className="hover:text-white">
                  About
                </a>
              </li>

              <li>
                <a href="#services" className="hover:text-white">
                  Services
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">
              Contact
            </h4>

            <p className="text-white/70">
              Abu Dhabi, UAE
            </p>

            <p className="text-white/70 mt-2">
              info@altaqauae.com
            </p>
          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/50 text-sm">
          © {new Date().getFullYear()} Al Taqa Technical General Contracting LLC.
          All rights reserved.
        </div>

      </div>
    </footer>
  )
}