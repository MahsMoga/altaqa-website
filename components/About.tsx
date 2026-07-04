import Image from 'next/image'
import AnimateIn from './AnimateIn'

const stats = [
  { value: '20+', label: 'Years of Experience' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '6', label: 'BMS Platforms Certified' },
  { value: '24/7', label: 'Support & Response' },
]

const pillars = [
  {
    title: 'End-to-End Delivery',
    desc: 'From design and installation to commissioning and long-term maintenance — we own the full lifecycle.',
  },
  {
    title: 'Vendor-Neutral',
    desc: "Certified across all major BMS platforms. We recommend what's right for your facility, not what benefits a single manufacturer.",
  },
  {
    title: 'Abu Dhabi Based',
    desc: 'Local presence means faster response, deeper client relationships, and full understanding of UAE regulations.',
  },
  {
    title: 'Energy-First Thinking',
    desc: 'Every system we design is benchmarked against energy efficiency targets and sustainability goals.',
  },
]

// TODO: Replace with a real project photo from your portfolio
const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'

export default function About() {
  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <div className="container-narrow">

        {/* Top: image + intro text */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20">

          {/* Image panel */}
          <AnimateIn className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.16)] aspect-[4/3]">
              <Image
                src={ABOUT_IMAGE}
                alt="Al Taqa BMS engineering team at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Dark gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />

              {/* Floating experience badge */}
              <div className="absolute bottom-5 left-5 flex items-center gap-3
                              bg-white/10 backdrop-blur-md border border-white/20
                              rounded-2xl px-4 py-3">
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-white font-bold text-sm leading-none">20+ Years</div>
                  <div className="text-white/60 text-xs mt-0.5">Field-Proven Expertise</div>
                </div>
              </div>

              {/* Certified badge top-right */}
              <div className="absolute top-5 right-5 bg-emerald-500 text-white
                              text-[10px] font-bold uppercase tracking-wider
                              px-3 py-1.5 rounded-full">
                Multi-Brand Certified
              </div>
            </div>

            {/* Decorative accent block behind image */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/[0.08] rounded-2xl -z-10" />
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-slate-100 rounded-2xl -z-10" />
          </AnimateIn>

          {/* Text content */}
          <AnimateIn delay={100} className="order-1 lg:order-2">
            <span className="label-tag">Who We Are</span>
            <h2 className="heading-section mb-6">
              Abu Dhabi's Trusted Partner for{' '}
              <span className="text-accent">Intelligent Buildings</span>
            </h2>
            <p className="body-lead mb-5">
              Al Taqa Technical General Contracting LLC is a premier provider of
              comprehensive BMS, automation, and energy management solutions —
              headquartered in the heart of Abu Dhabi.
            </p>
            <p className="text-slate-500 leading-relaxed mb-5">
              With over two decades of proven delivery, our highly skilled engineers
              specialize in transforming commercial, hospitality, and industrial
              facilities into intelligent, efficient environments — delivering
              measurable results from day one.
            </p>
            <p className="text-slate-500 leading-relaxed">
              We continue the established legacy of Al Taqa, supported by the
              same dedicated team who have built lasting relationships across the
              UAE's most demanding projects.
            </p>

            <a href="#contact" className="btn-primary mt-8 inline-flex">
              Start a Conversation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </AnimateIn>
        </div>

        {/* Stats row */}
        <AnimateIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 rounded-2xl overflow-hidden shadow-sm">
            {stats.map((s) => (
              <div key={s.label} className="bg-white px-6 py-7 text-center group hover:bg-accent/[0.03] transition-colors duration-200">
                <div className="font-display text-3xl lg:text-4xl font-bold text-navy mb-1.5 leading-none
                                group-hover:text-accent transition-colors duration-200">
                  {s.value}
                </div>
                <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* Pillars */}
        <AnimateIn delay={80} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="relative rounded-2xl border border-slate-border bg-white p-6
                         hover:shadow-card hover:border-accent/20 transition-all duration-300 group overflow-hidden"
            >
              {/* Big number watermark */}
              <div className="absolute -right-2 -top-4 font-display font-bold text-navy/[0.04] select-none"
                   style={{ fontSize: '5rem' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center mb-4">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <div className="font-display text-navy font-semibold text-sm mb-2 leading-snug">{p.title}</div>
              <div className="text-slate-500 text-xs leading-relaxed">{p.desc}</div>
            </div>
          ))}
        </AnimateIn>

      </div>
    </section>
  )
}
