const pillars = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="#2F80ED" strokeWidth="1.5"/>
        <path d="M10 6v4l2.5 2.5" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: '20+ Years',
    desc: 'Decades of field-proven expertise in building automation and controls',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10l7-7 7 7" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="5.5" y="10" width="9" height="7.5" rx="1" stroke="#2F80ED" strokeWidth="1.5"/>
        <rect x="8" y="13" width="4" height="4.5" rx="0.5" stroke="#2F80ED" strokeWidth="1.2"/>
      </svg>
    ),
    title: 'Abu Dhabi Based',
    desc: "Headquartered in the UAE, serving the region's most demanding facilities",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 14l4-4 3 3 5-6" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Energy-First',
    desc: 'Every solution is designed to reduce consumption, cost, and carbon footprint',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5L13 7h4.5l-3.5 3 1.5 5L10 13l-5.5 2 1.5-5L2.5 7H7L10 2.5z" stroke="#2F80ED" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Multi-Brand Certified',
    desc: 'Vendor-neutral specialists across all major BMS platforms and manufacturers',
  },
]

export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text content */}
          <div>
            <span className="label-tag">Who We Are</span>
            <h2 className="heading-section mb-6">
              A Trusted Partner for{' '}
              <span className="text-accent">Intelligent Buildings</span>
            </h2>
            <p className="body-lead mb-6">
              Al Taqa Technical General Contracting LLC is a premier provider of
              comprehensive automation and energy management solutions, based in
              the heart of Abu Dhabi.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              With over two decades of proven expertise, our team of highly
              skilled engineers specializes in transforming buildings and
              industrial facilities into intelligent, efficient, and sustainable
              environments — delivering measurable results from day one.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We continue the established legacy of Al Taqa, supported by the
              same dedicated team who have built lasting relationships with
              clients across the UAE&apos;s most demanding commercial, hospitality,
              and industrial sectors.
            </p>
          </div>

          {/* Right: pillar cards */}
          <div className="grid grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="bg-slate-corporate rounded-xl p-5 border border-slate-border
                           hover:border-accent/30 hover:bg-accent-soft transition-all duration-200"
              >
                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm mb-3">
                  {p.icon}
                </div>
                <div
                  className="font-semibold text-navy text-sm mb-1"
                  style={{ fontFamily: 'var(--font-sora)' }}
                >
                  {p.title}
                </div>
                <div className="text-slate-500 text-xs leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
