import dynamic from 'next/dynamic'

/**
 * 3D-enhanced Hero section.
 *
 * ARCHITECTURE NOTE:
 *   This component renders when ENABLE_3D = true.
 *   Original components/Hero.tsx renders when ENABLE_3D = false.
 *
 *   Content (headline, CTA, stats) is identical to Hero.tsx.
 *   The 3D canvas is injected into the empty right half of the viewport.
 *   All text/CTAs remain in the original position (max-w-3xl, left-aligned).
 *
 * MAINTENANCE:
 *   If you update text, stats, or CTAs in Hero.tsx → update them here too.
 *   Or extract shared content to data/hero.ts for a single source of truth.
 */

// Lazy-load the WebGL canvas — never SSR'd
const SmartBuildingScene = dynamic(
  () => import('./SmartBuildingScene').then(m => ({ default: m.SmartBuildingScene })),
  { ssr: false, loading: () => null }
)

export default function Hero3DFull() {
  return (
    <section className="relative min-h-screen flex items-center bg-navy overflow-hidden">
      {/* ── Background grid ──────────────────────────────── */}
      <div className="absolute inset-0 hero-pattern" />

      {/* Radial gradient vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(47,128,237,0.12),transparent)]" />

      {/* ── CSS orbs (left / centre) — unchanged ─────────── */}
      <div
        className="orb w-[500px] h-[500px] bg-accent/[0.10] -top-36 -right-36 animate-float"
        style={{ filter: 'blur(90px)' }}
      />
      <div
        className="orb w-96 h-96 bg-blue-900/30 bottom-20 -left-24 animate-float-slow"
        style={{ filter: 'blur(72px)' }}
      />

      {/* ── 3D smart building canvas — right half, desktop only ── */}
      <div className="hidden lg:block">
        <SmartBuildingScene />
      </div>

      {/* Mobile: subtle extra orb where building would be */}
      <div
        className="orb w-72 h-72 bg-accent/[0.08] top-1/4 right-[-4rem] animate-float-delayed lg:hidden"
        style={{ filter: 'blur(80px)' }}
      />

      {/* ── Bottom wave divider ────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-14 lg:h-20 fill-white">
          <path d="M0 80L1440 0V80H0Z" />
        </svg>
      </div>

      {/* ── Content — identical to Hero.tsx ────────────────── */}
      <div className="container-narrow relative z-10 pt-32 pb-28">
        {/* On desktop, content stays in left ~55%, right half has 3D */}
        <div className="max-w-3xl lg:max-w-[43%]">

          {/* Eyebrow pill badge */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                            border border-white/[0.14] bg-white/[0.06] backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0" />
              <span className="text-white/70 text-xs font-semibold tracking-[0.18em] uppercase select-none">
                Abu Dhabi, UAE · Exp. 20+ Years
              </span>
            </div>
          </div>

          {/* Headline — unchanged */}
          <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-white
                         leading-[1.06] tracking-tight mb-7">
            Building{' '}
            <span className="gradient-text">Intelligence.</span>
            <br />
            Delivering{' '}
            <span className="relative inline-block">
              Excellence.
              <span className="absolute -bottom-2 left-0 right-0 h-px
                               bg-gradient-to-r from-accent/55 via-accent/25 to-transparent" />
            </span>
          </h1>

          {/* Subtext — unchanged */}
          <p className="text-white/60 text-lg lg:text-xl leading-relaxed max-w-xl mb-10">
            Transforming buildings and industrial facilities into intelligent,
            efficient, and sustainable environments. Specialists in BMS,
            automation, and energy management across Abu Dhabi.
          </p>

          {/* CTAs — unchanged */}
          <div className="flex flex-wrap gap-4 mb-16">
            <a href="#expertise" className="btn-primary">
              Explore Solutions
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="btn-outline">
              Contact Us
            </a>
          </div>

          {/* Stats row — unchanged */}
          <div className="flex items-start pt-10 border-t border-white/[0.1]">
            {[
              { value: '20+', label: 'Years of Experience' },
              { value: '6+', label: 'BMS Platforms Supported' },
              { value: '24/7', label: 'Technical Support' },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex-1 ${
                  idx > 0
                    ? 'pl-6 sm:pl-8 border-l border-white/[0.1]'
                    : 'pr-6 sm:pr-8'
                }`}
              >
                <div className="font-display text-2xl sm:text-3xl font-bold text-white mb-1 leading-none">
                  {stat.value}
                </div>
                <div className="text-white/45 text-xs sm:text-sm leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
