'use client'
import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    step: '01',
    title: 'System Design',
    desc: 'Engineering drawings, I/O schedules, network architecture, and sequence of operations — scoped precisely to your facility.',
    kpi: 'Avg. 2–3 weeks',
    kpiLabel: 'Design phase',
    color: '#2F80ED',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 21V10l9-7 9 7v11" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
        <rect x="8" y="14" width="3" height="7" rx="0.5" fill="white" fillOpacity="0.8"/>
        <rect x="13" y="14" width="3" height="7" rx="0.5" fill="white" fillOpacity="0.8"/>
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Installation',
    desc: 'Controllers, field devices, cabling, and network infrastructure installed and wired to specification — minimal disruption to live operations.',
    kpi: '500+ projects',
    kpiLabel: 'Delivered',
    color: '#10B981',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l2.6-2.6a6 6 0 01-7.6 7.6L6.5 20.5a2.12 2.12 0 01-3-3l5.8-5.8A6 6 0 0114.7 6.3z"
          stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Integration',
    desc: 'BMS, HVAC, metering, fire, and access control unified on a single supervisory platform via BACnet, Modbus, and open protocols.',
    kpi: '6 platforms',
    kpiLabel: 'Certified',
    color: '#8B5CF6',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="1.6"/>
        <circle cx="12" cy="12" r="2.5" stroke="white" strokeWidth="1.6"/>
        <path d="M12 5v2M12 17v2M5 12h2M17 12h2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Commissioning',
    desc: 'Point-by-point loop checking, functional acceptance testing, and performance verification against design intent before handover.',
    kpi: '15–30%',
    kpiLabel: 'Energy saved',
    color: '#F59E0B',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.5 6H21l-5.5 4 2 6.5L12 15l-5.5 3.5 2-6.5L3 8h6.5L12 2z"
          stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    step: '05',
    title: 'Support & AMC',
    desc: 'Structured handover training, 24/7 emergency response, and scheduled preventive maintenance — keeping your system peak-performing long-term.',
    kpi: '24/7',
    kpiLabel: 'Response',
    color: '#EF4444',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 16l5-8 4 4 5-10 6 14" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 20h20" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
]

function AnimatedConnector({ color, active }: { color: string; active: boolean }) {
  return (
    <div className="flex-1 flex items-center justify-center relative" style={{ height: 2, minWidth: 20 }}>
      {/* Static base line */}
      <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.08)', height: 2, top: 0 }} />
      {/* Animated fill */}
      <div
        className="absolute left-0 top-0"
        style={{
          height: 2,
          width: active ? '100%' : '0%',
          background: `linear-gradient(90deg, ${color}90, ${color}40)`,
          transition: 'width 0.8s ease',
        }}
      />
      {/* Pulse dot */}
      {active && (
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 6px 2px ${color}60`,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      )}
      {/* Dashed pattern overlay */}
      <svg className="absolute inset-0 w-full" height="2" preserveAspectRatio="none">
        <line x1="0" y1="1" x2="100%" y2="1"
          stroke="rgba(255,255,255,0.12)" strokeWidth="1"
          strokeDasharray="4 6" />
      </svg>
    </div>
  )
}

export default function ProcessFlow() {
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    intervalRef.current = setInterval(() => {
      setActive(a => (a + 1) % steps.length)
    }, 2200)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [started])

  const handleStepClick = (idx: number) => {
    setActive(idx)
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive(a => (a + 1) % steps.length)
    }, 2200)
  }

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0a1628 0%, #0f1c3f 60%, #0d1f3c 100%)',
        clipPath: 'polygon(0 48px, 100% 0, 100% 100%, 0 100%)',
        marginTop: '-48px',
        paddingTop: 'calc(var(--section-padding, 5rem) + 48px)',
      }}
    >
      {/* Amber accent line */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" aria-hidden="true"
           style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(217,119,6,0.5) 30%, rgba(217,119,6,0.5) 70%, transparent 100%)', height: '2px', top: '48px' }} />
      {/* Circuit grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        backgroundImage: `linear-gradient(rgba(47,128,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(47,128,237,0.04) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      {/* Subtle radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(47,128,237,0.05) 0%, transparent 70%)' }} aria-hidden="true" />

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:translateY(-50%) scale(1)} 50%{opacity:0.6;transform:translateY(-50%) scale(1.4)} }
        @keyframes nodeGlow { 0%,100%{box-shadow:0 0 0 0 var(--glow)} 50%{box-shadow:0 0 0 8px transparent} }
      `}</style>

      <div className="container-narrow relative z-10">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-accent text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-4 h-px bg-accent/50" />
            Our Methodology
            <span className="w-4 h-px bg-accent/50" />
          </span>
          <h2 className="font-display text-white text-3xl lg:text-4xl font-bold mb-4">
            How We Deliver{' '}
            <span className="text-accent">End-to-End Value</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            A structured five-stage methodology — from initial design through
            ongoing support — ensuring seamless delivery and measurable results.
          </p>
        </div>

        {/* ── Desktop: horizontal flow with animated connectors ── */}
        <div className="hidden lg:block">
          {/* Step nodes + connectors */}
          <div className="flex items-center mb-10">
            {steps.map((s, idx) => {
              const isActive = active === idx
              const isPast = idx < active
              return (
                <div key={s.step} className="flex items-center flex-1 last:flex-none">
                  {/* Node */}
                  <button
                    onClick={() => handleStepClick(idx)}
                    className="relative flex-shrink-0 flex flex-col items-center cursor-pointer group"
                    style={{ outline: 'none' }}
                    aria-label={`Step ${s.step}: ${s.title}`}
                  >
                    {/* Step number above */}
                    <div className="font-display text-xs font-bold tracking-widest mb-3 transition-colors duration-300"
                         style={{ color: isActive ? s.color : 'rgba(255,255,255,0.25)' }}>
                      {s.step}
                    </div>

                    {/* Icon circle */}
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 relative"
                      style={{
                        background: isActive || isPast
                          ? `linear-gradient(135deg, ${s.color}, ${s.color}99)`
                          : 'rgba(255,255,255,0.06)',
                        border: `2px solid ${isActive ? s.color : isPast ? s.color + '60' : 'rgba(255,255,255,0.12)'}`,
                        boxShadow: isActive ? `0 0 24px ${s.color}50, 0 0 0 6px ${s.color}15` : 'none',
                        transform: isActive ? 'scale(1.12)' : 'scale(1)',
                      }}
                    >
                      {/* Pulse ring when active */}
                      {isActive && (
                        <span className="absolute inset-0 rounded-full animate-ping"
                              style={{ background: s.color, opacity: 0.15 }} />
                      )}
                      <span style={{ opacity: isActive || isPast ? 1 : 0.35 }}>
                        {s.icon}
                      </span>
                    </div>

                    {/* KPI badge */}
                    <div className="mt-3 text-center transition-all duration-300"
                         style={{ opacity: isActive ? 1 : 0.4 }}>
                      <div className="font-display font-bold text-sm" style={{ color: s.color }}>
                        {s.kpi}
                      </div>
                      <div className="text-white/35 text-[10px]">{s.kpiLabel}</div>
                    </div>
                  </button>

                  {/* Animated connector */}
                  {idx < steps.length - 1 && (
                    <div className="flex-1 relative mx-2" style={{ marginTop: '-28px' }}>
                      <AnimatedConnector color={steps[idx + 1].color} active={isPast || isActive} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Active step detail card */}
          <div
            className="rounded-2xl p-8 transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${steps[active].color}12, ${steps[active].color}06)`,
              border: `1px solid ${steps[active].color}25`,
            }}
          >
            <div className="flex items-start gap-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${steps[active].color}25` }}
              >
                {steps[active].icon}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-display font-bold text-xs tracking-widest"
                        style={{ color: steps[active].color }}>
                    STEP {steps[active].step}
                  </span>
                  <span className="text-white/20 text-xs">—</span>
                  <span className="text-white/40 text-xs">{steps[active].kpi} {steps[active].kpiLabel}</span>
                </div>
                <h3 className="font-display text-white font-bold text-xl mb-2">{steps[active].title}</h3>
                <p className="text-white/55 text-sm leading-relaxed max-w-2xl">{steps[active].desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile: vertical flow ─────────────────────────────── */}
        <div className="lg:hidden space-y-0">
          {steps.map((s, idx) => {
            const isLast = idx === steps.length - 1
            return (
              <div key={s.step} className="flex gap-5">
                {/* Left: node + vertical line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${s.color}, ${s.color}80)`,
                      border: `2px solid ${s.color}`,
                      boxShadow: `0 0 16px ${s.color}30`,
                    }}
                  >
                    {s.icon}
                  </div>
                  {!isLast && (
                    <div className="w-px flex-1 my-1"
                         style={{ background: `linear-gradient(to bottom, ${s.color}50, ${steps[idx+1].color}30)`, minHeight: 32 }} />
                  )}
                </div>

                {/* Content */}
                <div className={`${isLast ? 'pb-0' : 'pb-7'} pt-1`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display font-bold text-xs tracking-widest" style={{ color: s.color }}>
                      {s.step}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: `${s.color}18`, color: s.color }}>
                      {s.kpi} {s.kpiLabel}
                    </span>
                  </div>
                  <h3 className="font-display text-white font-semibold text-sm mb-1">{s.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <a href="/#contact" className="btn-primary">
            Start Your Project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <p className="text-white/25 text-xs mt-4">No obligation · Response within 24 hours</p>
        </div>

      </div>
    </section>
  )
}
