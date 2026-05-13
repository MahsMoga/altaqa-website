export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-navy overflow-hidden">
      {/* Background grid pattern */}
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

      {/* Subtle diagonal divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 fill-white">
          <path d="M0 60L1440 0V60H0Z" />
        </svg>
      </div>

      <div className="container-narrow relative z-10 pt-32 pb-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-8 bg-accent" />
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
              Abu Dhabi, UAE — Est. 20+ Years
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-sora)' }}
          >
            Building{' '}
            <span className="text-accent">Intelligence.</span>
            <br />
            Delivering{' '}
            <span className="relative inline-block">
              Excellence.
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent/40 rounded" />
            </span>
          </h1>

          {/* Sub-text */}
          <p className="text-white/65 text-lg lg:text-xl leading-relaxed max-w-xl mb-10">
            Transforming buildings and industrial facilities into intelligent,
            efficient, and sustainable environments. Specialists in BMS,
            automation, and energy management across Abu Dhabi.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a href="#expertise" className="btn-primary">
              Explore Solutions
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="btn-outline">
              Contact Us
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-white/10">
            {[
              { value: '20+', label: 'Years of Experience' },
              { value: '6+', label: 'BMS Platforms Supported' },
              { value: '24/7', label: 'Technical Support' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-3xl font-bold text-white mb-1"
                  style={{ fontFamily: 'var(--font-sora)' }}
                >
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
