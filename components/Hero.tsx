export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-navy overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-pattern opacity-100" />

      {/* Decorative orbs */}
      <div
        className="orb w-96 h-96 bg-accent/20 top-[-4rem] right-[-6rem]"
        style={{ filter: 'blur(100px)' }}
      />

      <div
        className="orb w-72 h-72 bg-blue-800/30 bottom-16 left-[-4rem]"
        style={{ filter: 'blur(80px)' }}
      />

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full h-12 fill-white"
        >
          <path d="M0 60L1440 0V60H0Z" />
        </svg>
      </div>

      <div className="container-narrow relative z-10 pt-32 pb-24">
        <div className="max-w-3xl">

          {/* Small label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-8 bg-accent" />

            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
              Abu Dhabi, UAE — Est. 20+ Years
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6">
            Building{' '}
            <span className="text-accent">
              Intelligence.
            </span>

            <br />

            Delivering{' '}
            <span className="relative inline-block">
              Excellence.

              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent/40 rounded" />
            </span>
          </h1>

          {/* Description */}
          <p className="text-white/65 text-lg lg:text-xl leading-relaxed max-w-xl mb-10">
            Transforming buildings and industrial facilities into intelligent,
            efficient, and sustainable environments.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a href="#expertise" className="btn-primary">
              Explore Solutions
            </a>

            <a href="#contact" className="btn-outline">
              Contact Us
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/10">

            <div>
              <div className="font-display text-3xl font-bold text-white mb-1">
                20+
              </div>

              <div className="text-white/50 text-sm">
                Years of Experience
              </div>
            </div>

            <div>
              <div className="font-display text-3xl font-bold text-white mb-1">
                6+
              </div>

              <div className="text-white/50 text-sm">
                BMS Platforms
              </div>
            </div>

            <div>
              <div className="font-display text-3xl font-bold text-white mb-1">
                24/7
              </div>

              <div className="text-white/50 text-sm">
                Technical Support
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}