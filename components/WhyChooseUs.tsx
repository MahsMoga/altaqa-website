import AnimateIn from './AnimateIn'

const reasons = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8.5" stroke="#2F80ED" strokeWidth="1.4"/>
        <path d="M11 6.5v4.5l3 3" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: '20+ Years of Proven Experience',
    desc: "Two decades of continuous delivery across the UAE's commercial, industrial, and hospitality sectors. Experience that translates directly to fewer surprises on your project.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#2F80ED" strokeWidth="1.4"/>
        <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="#2F80ED" strokeWidth="1.4"/>
        <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="#2F80ED" strokeWidth="1.4"/>
        <rect x="12" y="12" width="7" height="7" rx="1.5" stroke="#2F80ED" strokeWidth="1.4"/>
      </svg>
    ),
    title: 'Multi-Brand BMS Expertise',
    desc: "Certified across Johnson Controls, Schneider Electric, Honeywell, and Tridium platforms. We speak every BMS dialect — you get the right tool for every job.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2l2.5 6H19l-5 3.5 2 6L11 14l-5 3.5 2-6L3 8h5.5L11 2z"
          stroke="#2F80ED" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Truly Vendor-Neutral Approach',
    desc: "Our advice is guided solely by what's right for your facility — not by manufacturer incentives. Independent expertise you can trust.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="9" cy="8" r="4" stroke="#2F80ED" strokeWidth="1.4"/>
        <path d="M15.5 11a4 4 0 010 8" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M2 19c0-3.31 3.13-6 7-6" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Skilled Engineering Team',
    desc: 'Every engineer brings deep, discipline-specific expertise. Continuous training ensures our team stays current with the latest platforms and protocols.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 11l8-8 8 8" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="6" y="11" width="10" height="8" rx="1" stroke="#2F80ED" strokeWidth="1.4"/>
        <path d="M9 19v-5h4v5" stroke="#2F80ED" strokeWidth="1.2"/>
      </svg>
    ),
    title: 'Abu Dhabi Local Presence',
    desc: 'On-the-ground presence in Abu Dhabi means faster response times, stronger relationships, and deep understanding of local regulations and requirements.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3v4M11 15v4M3 11h4M15 11h4" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="11" cy="11" r="4" stroke="#2F80ED" strokeWidth="1.4"/>
        <circle cx="11" cy="11" r="1.5" fill="#2F80ED"/>
      </svg>
    ),
    title: 'Continuity & Long-Term Partnership',
    desc: 'The same team, the same relationships, the same commitment — carried forward. Our clients stay with us for years because we deliver consistency.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0f1c3f 60%, #0d1f3c 100%)' }}>

      {/* Circuit grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        backgroundImage: `linear-gradient(rgba(47,128,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(47,128,237,0.04) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      <div className="container-narrow relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-start">

          {/* ── Left sticky panel ─────────────────────────────── */}
          <AnimateIn className="lg:sticky lg:top-24">
            <div className="rounded-2xl p-8 lg:p-10"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="inline-flex items-center gap-2 text-accent text-xs font-bold tracking-widest uppercase mb-5">
                <span className="w-4 h-px bg-accent/50" />
                Why Al Taqa
                <span className="w-4 h-px bg-accent/50" />
              </span>
              <h2 className="font-display text-white text-3xl lg:text-4xl font-bold leading-tight mb-5">
                Six Reasons Clients{' '}
                <span className="text-accent">Choose Us</span>
              </h2>
              <p className="text-white/55 text-base leading-relaxed mb-8">
                Engineering competence meets operational reliability. Here&apos;s what sets
                us apart in Abu Dhabi&apos;s competitive BMS and automation landscape.
              </p>

              <blockquote className="border-l-2 border-accent/50 pl-5 py-1 mb-8">
                <p className="text-white/40 text-sm leading-relaxed italic">
                  &ldquo;Our mission extends beyond technical implementation — we build
                  partnerships that support long-term operational success,
                  sustainability, and growth.&rdquo;
                </p>
              </blockquote>

              <a href="#contact" className="btn-primary">
                Start a Conversation
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </AnimateIn>

          {/* ── Right reason cards ────────────────────────────── */}
          <div className="space-y-3">
            {reasons.map((r, idx) => (
              <AnimateIn key={r.title} delay={idx * 60}>
                <div
                  className="flex gap-4 p-5 rounded-2xl transition-all duration-200 group"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.background = 'rgba(47,128,237,0.08)'
                    el.style.borderColor = 'rgba(47,128,237,0.25)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.background = 'rgba(255,255,255,0.04)'
                    el.style.borderColor = 'rgba(255,255,255,0.08)'
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ background: 'rgba(47,128,237,0.12)', border: '1px solid rgba(47,128,237,0.2)' }}>
                    {r.icon}
                  </div>
                  <div>
                    <div className="font-display text-white font-semibold text-sm mb-1.5 leading-snug">
                      {r.title}
                    </div>
                    <div className="text-white/45 text-xs leading-relaxed">{r.desc}</div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
