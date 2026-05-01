const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z" stroke="#2F80ED" strokeWidth="1.5"/>
        <path d="M16 9v7l4 4" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Annual Maintenance Contracts',
    subtitle: 'Ongoing System Health',
    color: 'bg-blue-50 border-blue-100',
    iconBg: 'bg-blue-100',
    items: [
      { label: 'Brand-Agnostic Support', desc: 'Maintenance regardless of your existing system brands' },
      { label: 'Preventive Strategies', desc: 'Proactive upkeep to minimize unexpected downtime' },
      { label: '24/7 Emergency Response', desc: 'Round-the-clock support for mission-critical systems' },
      { label: 'Performance Optimization', desc: 'Continuous tuning for sustained peak efficiency' },
    ],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 24l5-8 4 4 5-10 6 14" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 28h24" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22 8l2 2-2 2" stroke="#2F80ED" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 10h-6" stroke="#2F80ED" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Energy Retrofit Solutions',
    subtitle: 'Transform Existing Facilities',
    color: 'bg-emerald-50 border-emerald-100',
    iconBg: 'bg-emerald-100',
    items: [
      { label: 'Comprehensive Energy Audits', desc: 'Full system analysis and consumption benchmarking' },
      { label: 'Significant Cost Savings', desc: 'Operational cost reduction through efficiency improvements' },
      { label: 'Sustainability Goals', desc: 'Environmental impact reduction via smart technology' },
      { label: 'Seamless Integration', desc: 'Works with your existing infrastructure without disruption' },
    ],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="5" y="8" width="22" height="16" rx="2.5" stroke="#2F80ED" strokeWidth="1.5"/>
        <path d="M9 16h4l2-4 2 8 2-4h4" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Smart Metering Solutions',
    subtitle: 'Real-Time Utility Visibility',
    color: 'bg-violet-50 border-violet-100',
    iconBg: 'bg-violet-100',
    items: [
      { label: 'BTU Meters', desc: 'Thermal energy monitoring for heating & cooling consumption' },
      { label: 'Water Meters', desc: 'Precise water consumption monitoring for conservation' },
      { label: 'Smart Shut-off Valves', desc: 'Automated control for emergency response & management' },
      { label: 'Tenant Billing Software', desc: 'Comprehensive utility allocation and cost recovery platform' },
    ],
  },
]

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-narrow">
        {/* Header */}
        <div className="max-w-xl mb-14">
          <span className="label-tag">Our Services</span>
          <h2 className="heading-section mb-4">
            Comprehensive Technical{' '}
            <span className="text-accent">Service Offering</span>
          </h2>
          <p className="body-lead">
            From ongoing maintenance contracts to full energy retrofit programmes,
            we provide the full lifecycle of building technology services.
          </p>
        </div>

        {/* 3-column grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className={`rounded-xl border p-8 ${service.color}`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${service.iconBg} rounded-xl flex items-center justify-center mb-6`}>
                {service.icon}
              </div>

              {/* Heading */}
              <div className="text-navy/40 text-xs font-semibold tracking-widest uppercase mb-1"
                style={{ fontFamily: 'var(--font-sora)' }}>
                {service.subtitle}
              </div>
              <h3
                className="text-navy font-bold text-xl leading-tight mb-6"
                style={{ fontFamily: 'var(--font-sora)' }}
              >
                {service.title}
              </h3>

              {/* Items */}
              <ul className="space-y-4">
                {service.items.map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 2.5" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-navy text-sm font-semibold mb-0.5">{item.label}</div>
                      <div className="text-slate-500 text-xs leading-relaxed">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
