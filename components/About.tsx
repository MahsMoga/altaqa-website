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

function useCountUp(target: number, duration = 1200) {
  // Start at target so SSR and the initial paint always show the real number.
  // When the element scrolls into view, briefly animate down then back up for
  // visual interest — but never show 0 or an implausible intermediate value.
  const [val, setVal] = useState(target)
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
    // Animate from 85% of target → target so it feels live without hitting 0
    const from = Math.round(target * 0.85)
    let current = from
    const steps = 40
    const increment = (target - from) / steps
    const interval = duration / steps
    setVal(from)
    const t = setInterval(() => {
      current += increment
      if (current >= target) { setVal(target); clearInterval(t) }
      else setVal(Math.round(current))
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
      <div className="section-padding bg-white">
        <div className="container-narrow">
          <AnimateIn className="text-center max-w-xl mx-auto mb-12">
            <span className="label-tag">What Sets Us Apart</span>
            <h2 className="heading-section">
              Built on Four <span className="text-accent">Core Principles</span>
            </h2>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1 — End-to-End Delivery (Blue) */}
            <AnimateIn delay={0}>
              <div className="group relative rounded-3xl bg-white overflow-hidden cursor-default h-full
                              shadow-[0_2px_16px_rgba(47,128,237,0.08)] border border-blue-100
                              transition-all duration-500 hover:-translate-y-2
                              hover:shadow-[0_24px_64px_rgba(47,128,237,0.18)]">
                {/* Illustration area */}
                <div className="relative h-44 overflow-hidden"
                     style={{ background: 'linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 100%)' }}>
                  <svg viewBox="0 0 280 176" fill="none" xmlns="http://www.w3.org/2000/svg"
                       className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                    {/* Building outline */}
                    <rect x="90" y="60" width="100" height="100" rx="4" fill="#BFDBFE" stroke="#2F80ED" strokeWidth="1.5"/>
                    <rect x="105" y="80" width="18" height="22" rx="2" fill="#2F80ED" opacity="0.3"/>
                    <rect x="131" y="80" width="18" height="22" rx="2" fill="#2F80ED" opacity="0.3"/>
                    <rect x="157" y="80" width="18" height="22" rx="2" fill="#2F80ED" opacity="0.3"/>
                    <rect x="105" y="112" width="18" height="22" rx="2" fill="#2F80ED" opacity="0.3"/>
                    <rect x="131" y="112" width="18" height="48" rx="2" fill="#2F80ED" opacity="0.6"/>
                    <rect x="157" y="112" width="18" height="22" rx="2" fill="#2F80ED" opacity="0.3"/>
                    {/* Roof signal */}
                    <path d="M140 55 L140 60" stroke="#2F80ED" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M132 52 Q140 46 148 52" stroke="#2F80ED" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M126 48 Q140 40 154 48" stroke="#2F80ED" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
                    {/* IoT nodes */}
                    <circle cx="40" cy="80" r="14" fill="#2F80ED" opacity="0.12" stroke="#2F80ED" strokeWidth="1.5"/>
                    <circle cx="40" cy="80" r="6" fill="#2F80ED" opacity="0.7"/>
                    <circle cx="240" cy="95" r="14" fill="#2F80ED" opacity="0.12" stroke="#2F80ED" strokeWidth="1.5"/>
                    <circle cx="240" cy="95" r="6" fill="#2F80ED" opacity="0.7"/>
                    <circle cx="50" cy="140" r="10" fill="#2F80ED" opacity="0.12" stroke="#2F80ED" strokeWidth="1.5"/>
                    <circle cx="50" cy="140" r="5" fill="#2F80ED" opacity="0.7"/>
                    <circle cx="230" cy="145" r="10" fill="#2F80ED" opacity="0.12" stroke="#2F80ED" strokeWidth="1.5"/>
                    <circle cx="230" cy="145" r="5" fill="#2F80ED" opacity="0.7"/>
                    {/* Connection lines */}
                    <line x1="54" y1="80" x2="90" y2="100" stroke="#2F80ED" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
                    <line x1="226" y1="95" x2="190" y2="105" stroke="#2F80ED" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
                    <line x1="60" y1="140" x2="90" y2="140" stroke="#2F80ED" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
                    <line x1="220" y1="145" x2="190" y2="140" stroke="#2F80ED" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
                    {/* Data flow dots */}
                    <circle cx="72" cy="90" r="2.5" fill="#2F80ED" opacity="0.8"/>
                    <circle cx="210" cy="100" r="2.5" fill="#2F80ED" opacity="0.8"/>
                  </svg>
                  {/* Tag */}
                  <div className="absolute top-3 left-3 bg-blue-500/10 border border-blue-200 text-blue-600
                                  text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                    Smart Building
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <div className="w-7 h-0.5 rounded-full bg-blue-500 mb-3
                                  transition-all duration-300 group-hover:w-12" />
                  <div className="font-display text-navy font-bold text-sm mb-2 leading-snug">End-to-End Delivery</div>
                  <div className="text-slate-500 text-xs leading-relaxed">
                    From design and installation to commissioning and long-term maintenance — we own the full lifecycle.
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Card 2 — Vendor-Neutral (Teal/Green) */}
            <AnimateIn delay={80}>
              <div className="group relative rounded-3xl bg-white overflow-hidden cursor-default h-full
                              shadow-[0_2px_16px_rgba(16,185,129,0.08)] border border-emerald-100
                              transition-all duration-500 hover:-translate-y-2
                              hover:shadow-[0_24px_64px_rgba(16,185,129,0.18)]">
                <div className="relative h-44 overflow-hidden"
                     style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)' }}>
                  <svg viewBox="0 0 280 176" fill="none" xmlns="http://www.w3.org/2000/svg"
                       className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                    {/* Central cloud hub */}
                    <ellipse cx="140" cy="95" rx="32" ry="22" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1.5"/>
                    <path d="M122 95 Q140 83 158 95" stroke="#10b981" strokeWidth="1.5" fill="none"/>
                    <circle cx="140" cy="95" r="8" fill="#10b981" opacity="0.7"/>
                    {/* Platform boxes */}
                    <rect x="28" y="48" width="44" height="28" rx="6" fill="#D1FAE5" stroke="#10b981" strokeWidth="1.2"/>
                    <text x="50" y="66" textAnchor="middle" fontSize="8" fill="#059669" fontWeight="bold">JCI</text>
                    <rect x="28" y="108" width="44" height="28" rx="6" fill="#D1FAE5" stroke="#10b981" strokeWidth="1.2"/>
                    <text x="50" y="126" textAnchor="middle" fontSize="8" fill="#059669" fontWeight="bold">SE</text>
                    <rect x="208" y="48" width="44" height="28" rx="6" fill="#D1FAE5" stroke="#10b981" strokeWidth="1.2"/>
                    <text x="230" y="66" textAnchor="middle" fontSize="8" fill="#059669" fontWeight="bold">HW</text>
                    <rect x="208" y="108" width="44" height="28" rx="6" fill="#D1FAE5" stroke="#10b981" strokeWidth="1.2"/>
                    <text x="230" y="126" textAnchor="middle" fontSize="8" fill="#059669" fontWeight="bold">TR</text>
                    <rect x="118" y="142" width="44" height="24" rx="6" fill="#D1FAE5" stroke="#10b981" strokeWidth="1.2"/>
                    <text x="140" y="158" textAnchor="middle" fontSize="8" fill="#059669" fontWeight="bold">N4</text>
                    {/* Connection lines */}
                    <line x1="72" y1="62" x2="108" y2="88" stroke="#10b981" strokeWidth="1" strokeDasharray="4 3" opacity="0.6"/>
                    <line x1="72" y1="122" x2="108" y2="102" stroke="#10b981" strokeWidth="1" strokeDasharray="4 3" opacity="0.6"/>
                    <line x1="208" y1="62" x2="172" y2="88" stroke="#10b981" strokeWidth="1" strokeDasharray="4 3" opacity="0.6"/>
                    <line x1="208" y1="122" x2="172" y2="102" stroke="#10b981" strokeWidth="1" strokeDasharray="4 3" opacity="0.6"/>
                    <line x1="140" y1="117" x2="140" y2="142" stroke="#10b981" strokeWidth="1" strokeDasharray="4 3" opacity="0.6"/>
                    {/* Pulse rings */}
                    <circle cx="140" cy="95" r="18" stroke="#10b981" strokeWidth="1" opacity="0.25"/>
                    <circle cx="140" cy="95" r="28" stroke="#10b981" strokeWidth="0.5" opacity="0.12"/>
                  </svg>
                  <div className="absolute top-3 left-3 bg-emerald-500/10 border border-emerald-200 text-emerald-700
                                  text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                    Open Protocols
                  </div>
                </div>
                <div className="p-5">
                  <div className="w-7 h-0.5 rounded-full bg-emerald-500 mb-3
                                  transition-all duration-300 group-hover:w-12" />
                  <div className="font-display text-navy font-bold text-sm mb-2 leading-snug">Vendor-Neutral</div>
                  <div className="text-slate-500 text-xs leading-relaxed">
                    Certified across all major BMS platforms. We recommend what's right for your facility, not a single manufacturer.
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Card 3 — Abu Dhabi Based (Orange/Gold) */}
            <AnimateIn delay={160}>
              <div className="group relative rounded-3xl bg-white overflow-hidden cursor-default h-full
                              shadow-[0_2px_16px_rgba(245,158,11,0.08)] border border-amber-100
                              transition-all duration-500 hover:-translate-y-2
                              hover:shadow-[0_24px_64px_rgba(245,158,11,0.18)]">
                <div className="relative h-44 overflow-hidden"
                     style={{ background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)' }}>
                  <svg viewBox="0 0 280 176" fill="none" xmlns="http://www.w3.org/2000/svg"
                       className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                    {/* Sky gradient */}
                    <rect x="0" y="0" width="280" height="176" fill="url(#skyGrad)" opacity="0.3"/>
                    <defs>
                      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FEF3C7"/>
                        <stop offset="100%" stopColor="#FFFBEB"/>
                      </linearGradient>
                    </defs>
                    {/* Abu Dhabi skyline silhouette */}
                    {/* Tall tower left */}
                    <rect x="30" y="80" width="22" height="76" rx="2" fill="#F59E0B" opacity="0.25"/>
                    <rect x="36" y="70" width="10" height="12" rx="1" fill="#F59E0B" opacity="0.35"/>
                    <rect x="39" y="62" width="4" height="10" rx="1" fill="#F59E0B" opacity="0.4"/>
                    {/* Mid building */}
                    <rect x="60" y="100" width="28" height="56" rx="2" fill="#F59E0B" opacity="0.2"/>
                    <rect x="65" y="92" width="18" height="10" rx="1" fill="#F59E0B" opacity="0.3"/>
                    {/* Landmark tower (tallest - center-left) */}
                    <rect x="96" y="50" width="30" height="106" rx="2" fill="#F59E0B" opacity="0.3"/>
                    <path d="M111 30 L118 50 H104 Z" fill="#F59E0B" opacity="0.45"/>
                    <rect x="106" y="44" width="10" height="8" rx="1" fill="#F59E0B" opacity="0.5"/>
                    {/* Window grid */}
                    <rect x="100" y="60" width="8" height="6" rx="1" fill="#F59E0B" opacity="0.4"/>
                    <rect x="112" y="60" width="8" height="6" rx="1" fill="#F59E0B" opacity="0.4"/>
                    <rect x="100" y="72" width="8" height="6" rx="1" fill="#F59E0B" opacity="0.4"/>
                    <rect x="112" y="72" width="8" height="6" rx="1" fill="#FBBF24" opacity="0.7"/>
                    {/* Center building */}
                    <rect x="134" y="72" width="36" height="84" rx="2" fill="#F59E0B" opacity="0.22"/>
                    <rect x="139" y="64" width="26" height="10" rx="1" fill="#F59E0B" opacity="0.3"/>
                    {/* Right cluster */}
                    <rect x="178" y="88" width="24" height="68" rx="2" fill="#F59E0B" opacity="0.2"/>
                    <rect x="210" y="76" width="28" height="80" rx="2" fill="#F59E0B" opacity="0.25"/>
                    <rect x="216" y="66" width="16" height="12" rx="1" fill="#F59E0B" opacity="0.35"/>
                    <rect x="244" y="96" width="20" height="60" rx="2" fill="#F59E0B" opacity="0.18"/>
                    {/* Ground line */}
                    <rect x="0" y="155" width="280" height="2" rx="1" fill="#F59E0B" opacity="0.3"/>
                    {/* Smart grid dots */}
                    <circle cx="55" cy="148" r="3" fill="#F59E0B" opacity="0.6"/>
                    <circle cx="90" cy="148" r="3" fill="#F59E0B" opacity="0.6"/>
                    <circle cx="155" cy="148" r="3" fill="#F59E0B" opacity="0.6"/>
                    <circle cx="200" cy="148" r="3" fill="#F59E0B" opacity="0.6"/>
                    <line x1="55" y1="148" x2="90" y2="148" stroke="#F59E0B" strokeWidth="1" opacity="0.4"/>
                    <line x1="90" y1="148" x2="155" y2="148" stroke="#F59E0B" strokeWidth="1" opacity="0.4"/>
                    <line x1="155" y1="148" x2="200" y2="148" stroke="#F59E0B" strokeWidth="1" opacity="0.4"/>
                    {/* Sun */}
                    <circle cx="232" cy="36" r="14" fill="#FBBF24" opacity="0.35"/>
                    <circle cx="232" cy="36" r="9" fill="#F59E0B" opacity="0.5"/>
                  </svg>
                  <div className="absolute top-3 left-3 bg-amber-500/10 border border-amber-200 text-amber-700
                                  text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                    Smart City UAE
                  </div>
                </div>
                <div className="p-5">
                  <div className="w-7 h-0.5 rounded-full bg-amber-500 mb-3
                                  transition-all duration-300 group-hover:w-12" />
                  <div className="font-display text-navy font-bold text-sm mb-2 leading-snug">Abu Dhabi Based</div>
                  <div className="text-slate-500 text-xs leading-relaxed">
                    Local presence means faster response, deeper client relationships, and full understanding of UAE regulations.
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Card 4 — Energy-First Thinking (Purple) */}
            <AnimateIn delay={240}>
              <div className="group relative rounded-3xl bg-white overflow-hidden cursor-default h-full
                              shadow-[0_2px_16px_rgba(139,92,246,0.08)] border border-violet-100
                              transition-all duration-500 hover:-translate-y-2
                              hover:shadow-[0_24px_64px_rgba(139,92,246,0.18)]">
                <div className="relative h-44 overflow-hidden"
                     style={{ background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)' }}>
                  <svg viewBox="0 0 280 176" fill="none" xmlns="http://www.w3.org/2000/svg"
                       className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                    {/* Circular gauge */}
                    <circle cx="140" cy="95" r="52" stroke="#EDE9FE" strokeWidth="8"/>
                    <circle cx="140" cy="95" r="52" stroke="#8b5cf6" strokeWidth="5"
                            strokeDasharray="245 82" strokeLinecap="round"
                            transform="rotate(-210 140 95)" opacity="0.7"/>
                    <circle cx="140" cy="95" r="40" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="1"/>
                    {/* Lightning bolt center */}
                    <path d="M145 74 L133 95 H142 L138 116 L152 91 H143 Z" fill="#8b5cf6" opacity="0.75"/>
                    {/* % label */}
                    <text x="140" y="130" textAnchor="middle" fontSize="9" fill="#7C3AED" fontWeight="bold">ENERGY</text>
                    {/* Leaf elements */}
                    <path d="M58 50 Q68 35 80 45 Q70 58 58 50Z" fill="#8b5cf6" opacity="0.2"/>
                    <path d="M200 50 Q210 35 222 45 Q212 58 200 50Z" fill="#8b5cf6" opacity="0.2"/>
                    {/* Bar chart bottom */}
                    <rect x="28" y="140" width="10" height="20" rx="2" fill="#8b5cf6" opacity="0.2"/>
                    <rect x="42" y="130" width="10" height="30" rx="2" fill="#8b5cf6" opacity="0.3"/>
                    <rect x="56" y="120" width="10" height="40" rx="2" fill="#8b5cf6" opacity="0.45"/>
                    <rect x="210" y="135" width="10" height="25" rx="2" fill="#8b5cf6" opacity="0.2"/>
                    <rect x="224" y="125" width="10" height="35" rx="2" fill="#8b5cf6" opacity="0.3"/>
                    <rect x="238" y="115" width="10" height="45" rx="2" fill="#8b5cf6" opacity="0.45"/>
                    {/* Efficiency dots */}
                    <circle cx="87" cy="48" r="4" fill="#8b5cf6" opacity="0.35"/>
                    <circle cx="193" cy="48" r="4" fill="#8b5cf6" opacity="0.35"/>
                    <circle cx="140" cy="33" r="4" fill="#8b5cf6" opacity="0.5"/>
                  </svg>
                  <div className="absolute top-3 left-3 bg-violet-500/10 border border-violet-200 text-violet-700
                                  text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                    Sustainability
                  </div>
                </div>
                <div className="p-5">
                  <div className="w-7 h-0.5 rounded-full bg-violet-500 mb-3
                                  transition-all duration-300 group-hover:w-12" />
                  <div className="font-display text-navy font-bold text-sm mb-2 leading-snug">Energy-First Thinking</div>
                  <div className="text-slate-500 text-xs leading-relaxed">
                    Every system we design is benchmarked against energy efficiency targets and sustainability goals.
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>

    </section>
  )
}
