import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import AnimateIn from './AnimateIn'

// TODO: Replace with a real project photo from your portfolio
const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'

const stats = [
  { num: 20, suffix: '+', label: 'Years of Experience', icon: '◈' },
  { num: 500, suffix: '+', label: 'Projects Delivered', icon: '◉' },
  { num: 6, suffix: '', label: 'BMS Platforms Certified', icon: '◎' },
  { num: 24, suffix: '/7', label: 'Support & Response', icon: '◈' },
]

const pillars = [
  {
    title: 'End-to-End Delivery',
    desc: 'From design and installation to commissioning and long-term maintenance — we own the full lifecycle.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    color: '#2F80ED',
  },
  {
    title: 'Vendor-Neutral',
    desc: "Certified across all major BMS platforms. We recommend what's right for your facility, not a single manufacturer.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    color: '#10b981',
  },
  {
    title: 'Abu Dhabi Based',
    desc: 'Local presence means faster response, deeper client relationships, and full understanding of UAE regulations.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    color: '#f59e0b',
  },
  {
    title: 'Energy-First Thinking',
    desc: 'Every system we design is benchmarked against energy efficiency targets and sustainability goals.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    color: '#8b5cf6',
  },
]

function useCountUp(target: number, duration = 1400) {
  const [val, setVal] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); observer.disconnect() }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let start = 0
    const steps = 50
    const increment = target / steps
    const interval = duration / steps
    const t = setInterval(() => {
      start += increment
      if (start >= target) { setVal(target); clearInterval(t) }
      else setVal(Math.floor(start))
    }, interval)
    return () => clearInterval(t)
  }, [started, target, duration])

  return { val, ref }
}

function StatItem({ num, suffix, label, icon, index }: typeof stats[0] & { index: number }) {
  const { val, ref } = useCountUp(num)
  const isLast = num === 24

  return (
    <div
      ref={ref}
      className="relative group flex flex-col items-center text-center px-6 py-10"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Vertical divider (except last) */}
      {index < 3 && (
        <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-white/[0.08]" />
      )}

      {/* Glow dot */}
      <div
        className="w-2 h-2 rounded-full mb-5 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: '#2F80ED', boxShadow: '0 0 10px #2F80ED' }}
      />

      {/* Number */}
      <div className="font-display font-bold text-white leading-none mb-3
                      transition-all duration-300 group-hover:scale-105"
           style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
        {isLast ? `${num}` : val}{suffix}
      </div>

      {/* Accent underline */}
      <div className="w-8 h-0.5 rounded-full bg-accent mb-3
                      transition-all duration-300 group-hover:w-14"
           style={{ background: 'linear-gradient(90deg, #2F80ED, #5BA4F5)' }} />

      <div className="text-white/45 text-xs font-semibold uppercase tracking-[0.15em] leading-snug">
        {label}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="bg-white overflow-hidden">

      {/* ── Top: image + text ─────────────────────────────── */}
      <div className="section-padding">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

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
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />

                {/* Floating badge */}
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

                <div className="absolute top-5 right-5 bg-emerald-500 text-white
                                text-[10px] font-bold uppercase tracking-wider
                                px-3 py-1.5 rounded-full">
                  Multi-Brand Certified
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/[0.08] rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-slate-100 rounded-2xl -z-10" />
            </AnimateIn>

            {/* Text */}
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
        </div>
      </div>

      {/* ── Stats banner (dark) ───────────────────────────── */}
      <div className="relative bg-navy overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 hero-pattern opacity-40" />
        {/* Glow */}
        <div className="absolute left-1/4 top-0 w-96 h-32 bg-accent/[0.12] blur-3xl" />
        <div className="absolute right-1/4 bottom-0 w-80 h-24 bg-blue-800/30 blur-3xl" />

        <div className="container-narrow relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <StatItem key={s.label} {...s} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Pillar cards ──────────────────────────────────── */}
      <div className="section-padding bg-slate-corporate">
        <div className="container-narrow">
          <AnimateIn className="text-center max-w-xl mx-auto mb-12">
            <span className="label-tag">What Sets Us Apart</span>
            <h2 className="heading-section">
              Built on Four <span className="text-accent">Core Principles</span>
            </h2>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p, i) => (
              <AnimateIn key={p.title} delay={i * 80}>
                <div
                  className="group relative rounded-2xl bg-white border border-slate-border p-6 h-full overflow-hidden
                             cursor-default transition-all duration-300
                             hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] hover:border-transparent"
                >
                  {/* Coloured top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}44)` }}
                  />

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: p.color + '18', color: p.color }}
                  >
                    {p.icon}
                  </div>

                  {/* Accent number */}
                  <div className="absolute top-5 right-5 font-display font-bold text-4xl leading-none select-none"
                       style={{ color: p.color + '12' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Accent line */}
                  <div className="w-6 h-0.5 rounded-full mb-3 transition-all duration-300 group-hover:w-10"
                       style={{ background: p.color }} />

                  <div className="font-display text-navy font-semibold text-sm mb-2 leading-snug">{p.title}</div>
                  <div className="text-slate-500 text-xs leading-relaxed">{p.desc}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
