import Image from 'next/image'
import AnimateIn from './AnimateIn'

// TODO: Replace each image URL with a real project photo from your portfolio
const sectors = [
  {
    title: 'Hotels & Hospitality',
    desc: 'Guest Room Management Systems, HVAC automation, and energy monitoring for luxury hotels, resorts, and serviced apartments across the UAE.',
    highlights: ['Guest room automation', 'Energy optimisation', 'Centralised monitoring'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=85',
    accent: '#2F80ED',
  },
  {
    title: 'Commercial Buildings',
    desc: 'Full BMS design, installation, and commissioning for office towers, retail complexes, and mixed-use developments.',
    highlights: ['BMS design & build', 'HVAC controls', 'Smart metering'],
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=85',
    accent: '#10b981',
  },
  {
    title: 'Industrial Facilities',
    desc: 'Robust automation and control solutions for factories, warehouses, and process facilities requiring precise environmental and energy management.',
    highlights: ['PLC & SCADA systems', 'Energy management', 'Process automation'],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=85',
    accent: '#f59e0b',
  },
  {
    title: 'Healthcare & Hospitals',
    desc: 'Critical environment controls, air quality management, and compliant BMS installations for hospitals, clinics, and medical facilities.',
    highlights: ['Critical environment controls', 'Air quality monitoring', 'Compliance-ready systems'],
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=85',
    accent: '#8b5cf6',
  },
]

export default function Sectors() {
  return (
    <section id="sectors" className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #f8f7f5 0%, #f3f2ef 100%)',
        clipPath: 'polygon(0 0, 100% 48px, 100% 100%, 0 100%)',
        marginTop: '-48px',
        paddingTop: 'calc(var(--section-padding, 5rem) + 48px)',
      }}>
      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
             backgroundSize: '20px 20px',
           }} />
      <div className="container-narrow relative z-10">

        <AnimateIn className="max-w-xl mb-14">
          <span className="label-tag">Sectors We Serve</span>
          <h2 className="heading-section mb-4">
            Expertise Across Every{' '}
            <span className="text-accent">Building Type</span>
          </h2>
          <p className="body-lead">
            From luxury hotels to critical healthcare facilities — our BMS and
            automation expertise spans the full range of commercial, industrial,
            and institutional buildings.
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-6">
          {sectors.map((sector, idx) => (
            <AnimateIn key={sector.title} delay={idx * 80}>
              <div className="group relative rounded-3xl overflow-hidden shadow-card h-72 cursor-default">
                {/* Background image */}
                <Image
                  src={sector.image}
                  alt={sector.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/10
                                transition-opacity duration-300 group-hover:opacity-90" />

                {/* Content */}
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  {/* Accent line */}
                  <div className="w-8 h-0.5 rounded-full mb-3 transition-all duration-300 group-hover:w-14"
                       style={{ background: sector.accent }} />

                  <h3 className="font-display text-white font-bold text-xl mb-2 leading-snug">
                    {sector.title}
                  </h3>

                  <p className="text-white/70 text-sm leading-relaxed mb-4 max-w-sm
                                opacity-0 translate-y-2 transition-all duration-300
                                group-hover:opacity-100 group-hover:translate-y-0">
                    {sector.desc}
                  </p>

                  {/* Highlight tags */}
                  <div className="flex flex-wrap gap-2">
                    {sector.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1
                                   rounded-full border text-white/80"
                        style={{ borderColor: sector.accent + '60', background: sector.accent + '20' }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
