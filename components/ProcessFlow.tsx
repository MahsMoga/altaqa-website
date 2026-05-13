const steps = [
  {
    step: '01',
    title: 'Building Automation',
    desc: 'Smart integration of all mechanical and electrical systems',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 21V10l9-7 9 7v11" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="8" y="14" width="3" height="7" rx="0.5" fill="white" fillOpacity="0.7"/>
        <rect x="13" y="14" width="3" height="7" rx="0.5" fill="white" fillOpacity="0.7"/>
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Controls Integration',
    desc: 'Unified control layer across all building systems',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5"/>
        <path d="M12 4v2M12 18v2M4 12h2M18 12h2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Energy Management',
    desc: 'Real-time monitoring and intelligent demand control',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.5 6.5H21l-5.5 4 2 7L12 16l-5.5 3.5 2-7L3 8.5h6.5L12 2z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Smart Metering',
    desc: 'Granular utility data and sub-metering for all tenants',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="1.5"/>
        <path d="M7 12h2l2-3.5 2 7 2-3.5h2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    step: '05',
    title: 'Maintenance & Support',
    desc: 'Ongoing AMC and 24/7 technical assistance',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l2.6-2.6a6 6 0 01-7.6 7.6L6.5 20.5a2.12 2.12 0 01-3-3l5.8-5.8A6 6 0 0114.7 6.3z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function ProcessFlow() {
  return (
    <section className="section-padding bg-slate-corporate">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="label-tag justify-center">Our Process</span>
          <h2 className="heading-section mb-4">
            How We Deliver{' '}
            <span className="text-accent">End-to-End Value</span>
          </h2>
          <p className="body-lead">
            A structured, five-stage methodology ensuring seamless delivery from
            initial automation through ongoing support.
          </p>
        </div>

        {/* Desktop horizontal flow */}
        <div className="hidden lg:flex items-start gap-0">
          {steps.map((s, idx) => (
            <div key={s.title} className="flex-1 relative">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="absolute top-6 left-[calc(50%+24px)] right-0 h-0.5 bg-gradient-to-r from-accent/60 to-accent/20 z-0" />
              )}

              <div className="relative z-10 flex flex-col items-center text-center px-3">
                {/* Circle icon */}
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4 shadow-md">
                  {s.icon}
                </div>

                {/* Step */}
                <div className="text-accent/50 text-xs font-bold tracking-widest mb-1"
                  style={{ fontFamily: 'var(--font-sora)' }}>
                  {s.step}
                </div>

                {/* Title */}
                <div
                  className="text-navy font-semibold text-sm leading-snug mb-2"
                  style={{ fontFamily: 'var(--font-sora)' }}
                >
                  {s.title}
                </div>

                {/* Desc */}
                <div className="text-slate-500 text-xs leading-relaxed">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile vertical flow */}
        <div className="lg:hidden space-y-4">
          {steps.map((s, idx) => (
            <div key={s.title} className="flex gap-4 items-start">
              {/* Left: icon + connector */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  {s.icon}
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-0.5 h-8 bg-accent/20 mt-1" />
                )}
              </div>

              {/* Content */}
              <div className="pt-1 pb-4">
                <div className="text-accent text-xs font-bold tracking-widest mb-0.5"
                  style={{ fontFamily: 'var(--font-sora)' }}>
                  {s.step}
                </div>
                <div
                  className="text-navy font-semibold text-sm mb-1"
                  style={{ fontFamily: 'var(--font-sora)' }}
                >
                  {s.title}
                </div>
                <div className="text-slate-500 text-xs">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
