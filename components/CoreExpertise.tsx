import AnimateIn from './AnimateIn'

const expertise = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 22V12l10-8 10 8v10" stroke="#2F80ED" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="9" y="15" width="4" height="7" rx="0.75" stroke="#2F80ED" strokeWidth="1.5"/>
        <rect x="15" y="15" width="4" height="7" rx="0.75" stroke="#2F80ED" strokeWidth="1.5"/>
        <circle cx="14" cy="10" r="1.5" fill="#2F80ED"/>
      </svg>
    ),
    title: 'Building & Industrial Automation',
    desc: 'Seamless integration of mechanical, electrical, and digital systems to optimize operational efficiency and reduce maintenance costs across commercial and industrial facilities.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="4" width="22" height="16" rx="2" stroke="#2F80ED" strokeWidth="1.5"/>
        <path d="M9 20v4M19 20v4M6 24h16" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 10h4M8 13h8M8 7h12" stroke="#2F80ED" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="20" cy="9" r="2" stroke="#2F80ED" strokeWidth="1.3"/>
      </svg>
    ),
    title: 'Guest Room Management Systems',
    desc: 'Enhanced comfort and significant energy savings for hospitality environments through intelligent room controls and occupancy-based automation tailored for hotels.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="9" stroke="#2F80ED" strokeWidth="1.5"/>
        <circle cx="14" cy="14" r="4" stroke="#2F80ED" strokeWidth="1.5"/>
        <path d="M14 5v2M14 21v2M5 14h2M21 14h2" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="1.5" fill="#2F80ED"/>
      </svg>
    ),
    title: 'Automatic Control Systems',
    desc: 'Precise environmental management across diverse applications with responsive, reliable control solutions that adapt to changing operational conditions in real-time.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3l2.5 7h7.5l-6 4.5 2 7.5L14 18l-6 4L10 14.5 4 10h7.5L14 3z"
          stroke="#2F80ED" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Energy Management Solutions',
    desc: 'Intelligent monitoring and control systems providing real-time insights that help organizations reduce consumption, lower operating costs, and achieve sustainability targets.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="2" stroke="#2F80ED" strokeWidth="1.5"/>
        <path d="M8 14h3l2-4 2 8 2-4h3" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Smart Metering Solutions',
    desc: 'Real-time visibility into utility consumption patterns through comprehensive monitoring platforms, enabling data-driven decisions for facility managers and building owners.',
  },
]

export default function CoreExpertise() {
  return (
    <section id="expertise" className="section-padding bg-slate-corporate">
      <div className="container-narrow">

        {/* Header */}
        <AnimateIn className="max-w-xl mb-14">
          <span className="label-tag">Core Expertise</span>
          <h2 className="heading-section mb-4">
            End-to-End Building{' '}
            <span className="text-accent">Intelligence</span>
          </h2>
          <p className="body-lead">
            Five integrated disciplines that cover the full spectrum of building
            automation, controls, and energy efficiency.
          </p>
        </AnimateIn>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertise.map((item, idx) => (
            <AnimateIn
              key={item.title}
              delay={idx * 75}
              className={idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <div className="card-base group cursor-default relative overflow-hidden h-full">

                {/* Large background number decoration */}
                <div
                  className="absolute -right-1 -top-5 font-display font-bold leading-none
                               text-navy/[0.045] select-none pointer-events-none
                               transition-colors duration-300 group-hover:text-navy/[0.06]"
                  style={{ fontSize: '7.5rem' }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-accent/15 to-accent/[0.04]
                                rounded-xl flex items-center justify-center mb-5 border border-accent/10
                                group-hover:from-accent/20 group-hover:to-accent/[0.07] transition-colors duration-300">
                  {item.icon}
                </div>

                {/* Number badge */}
                <div className="relative z-10 font-display text-accent/35 text-xs font-bold
                                tracking-widest mb-3 uppercase group-hover:text-accent/55
                                transition-colors duration-300">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Title */}
                <h3 className="relative z-10 font-display text-navy font-semibold text-lg
                               leading-snug mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-slate-500 text-sm leading-relaxed">{item.desc}</p>

                {/* Bottom accent line on hover */}
                <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-accent to-accent/30
                                group-hover:w-14 transition-all duration-400 rounded-full" />
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
