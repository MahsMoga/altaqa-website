'use client'
import { useEffect, useState } from 'react'

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / 40
    const t = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(t) }
      else setVal(Math.floor(start))
    }, 35)
    return () => clearInterval(t)
  }, [target])
  return <>{val}{suffix}</>
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const h = 36, w = 80
  const max = Math.max(...data), min = Math.min(...data)
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / (max - min || 1)) * h
    return `${x},${y}`
  }).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="opacity-80">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const metrics = [
  { label: 'Energy Usage', value: 847, unit: 'kWh', change: '-12% vs last month', up: false, color: '#2f80ed', data: [90,85,88,70,74,68,65,72,60,55,58,52] },
  { label: 'Indoor Temp', value: 23, unit: '°C', change: 'Optimal comfort range', up: null, color: '#10b981', data: [24,23.5,23,23.2,23,22.8,23,23.1,23,22.9,23,23] },
  { label: 'Occupancy', value: 76, unit: '%', change: '+4% today', up: true, color: '#f59e0b', data: [60,65,70,68,72,74,75,73,76,74,77,76] },
  { label: 'CO₂ Level', value: 412, unit: 'ppm', change: 'Air quality: Good', up: null, color: '#10b981', data: [430,425,420,418,415,414,412,413,411,412,410,412] },
]

const alerts = [
  { zone: 'Floor 3 – HVAC', status: 'Running', ok: true },
  { zone: 'Chiller Plant', status: 'Optimal', ok: true },
  { zone: 'AHU-07 Filter', status: 'Replace soon', ok: false },
]

export default function Hero() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center bg-navy overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 hero-pattern" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_-10%,rgba(47,128,237,0.13),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_85%_60%,rgba(16,185,129,0.06),transparent)]" />

      {/* Ambient orbs */}
      <div className="orb w-[420px] h-[420px] bg-accent/[0.10] -top-24 -right-16 animate-float" style={{ filter: 'blur(80px)' }} />
      <div className="orb w-80 h-80 bg-blue-900/30 bottom-24 -left-16 animate-float-slow" style={{ filter: 'blur(64px)' }} />

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-14 lg:h-20 fill-white">
          <path d="M0 80L1440 0V80H0Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="container-narrow relative z-10 pt-32 pb-28">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* Left: Copy */}
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                              border border-white/[0.14] bg-white/[0.06] backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0" />
                <span className="text-white/70 text-xs font-semibold tracking-[0.18em] uppercase select-none">
                  Abu Dhabi, UAE · Exp. 20+ Years
                </span>
              </div>
            </div>

            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-white
                           leading-[1.08] tracking-tight mb-6">
              Building{' '}
              <span className="gradient-text">Intelligence.</span>
              <br />
              Delivering{' '}
              <span className="relative inline-block">
                Excellence.
                <span className="absolute -bottom-1.5 left-0 right-0 h-px
                                 bg-gradient-to-r from-accent/55 via-accent/25 to-transparent" />
              </span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed max-w-lg mb-10">
              Transforming buildings and industrial facilities into intelligent,
              efficient, and sustainable environments. Specialists in BMS,
              automation, and energy management across Abu Dhabi.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <a href="#expertise" className="btn-primary">
                Explore Solutions
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#contact" className="btn-outline">
                Contact Us
              </a>
            </div>

            <div className="flex items-start pt-8 border-t border-white/[0.1]">
              {[
                { value: '20+', label: 'Years of Experience' },
                { value: '6+', label: 'BMS Platforms' },
                { value: '24/7', label: 'Technical Support' },
              ].map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`flex-1 ${idx > 0 ? 'pl-5 sm:pl-7 border-l border-white/[0.1]' : 'pr-5 sm:pr-7'}`}
                >
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white mb-1 leading-none">
                    {stat.value}
                  </div>
                  <div className="text-white/45 text-xs sm:text-sm leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: BMS Dashboard Panel */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-accent/[0.07] blur-2xl" />

              {/* Dashboard card */}
              <div className="relative rounded-2xl border border-white/[0.12] bg-white/[0.04] backdrop-blur-md overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.45)]">

                {/* Title bar */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-white/[0.03]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">BMS Live Dashboard</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-400/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                    <div className="w-2 h-2 rounded-full bg-green-400/80" />
                  </div>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 gap-px bg-white/[0.06] p-px mx-4 mt-4 rounded-xl overflow-hidden">
                  {metrics.map((m) => (
                    <div key={m.label} className="bg-[#0a1628]/80 p-3.5">
                      <div className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-1">{m.label}</div>
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-white text-xl font-bold font-display leading-none">
                            <CountUp key={`${m.label}-${tick}`} target={m.value} />
                          </span>
                          <span className="text-white/50 text-xs ml-1">{m.unit}</span>
                        </div>
                        <Sparkline data={m.data} color={m.color} />
                      </div>
                      <div className={`text-[10px] font-medium mt-1.5 truncate ${
                        m.up === false ? 'text-emerald-400' : m.up === true ? 'text-yellow-400' : 'text-emerald-400'
                      }`}>
                        {m.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Zone bar chart */}
                <div className="mx-4 mt-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
                  <div className="text-white/35 text-[10px] font-semibold uppercase tracking-widest mb-2.5">Zone Status</div>
                  <div className="flex items-end gap-1.5 mb-2">
                    {[65,78,82,70,88,74,91,68,85,72,79,66,83,76,89].map((v, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${v * 0.28}px`,
                          background: v > 85
                            ? 'rgba(16,185,129,0.7)'
                            : v > 70
                            ? 'rgba(47,128,237,0.6)'
                            : 'rgba(245,158,11,0.5)',
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex gap-4 text-[10px] text-white/35">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />Optimal
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />Active
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />Standby
                    </span>
                  </div>
                </div>

                {/* Alert rows */}
                <div className="mx-4 mt-3 mb-4 space-y-1.5">
                  {alerts.map((a) => (
                    <div key={a.zone} className="flex items-center justify-between rounded-lg bg-white/[0.03] border border-white/[0.06] px-3.5 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.ok ? 'bg-emerald-400' : 'bg-yellow-400 animate-pulse'}`} />
                        <span className="text-white/65 text-xs">{a.zone}</span>
                      </div>
                      <span className={`text-[10px] font-semibold ${a.ok ? 'text-emerald-400' : 'text-yellow-400'}`}>{a.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating energy badge */}
              <div className="absolute -bottom-4 -right-4 bg-accent rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <div className="text-white text-xs font-bold leading-none">Energy Saved</div>
                  <div className="text-white/80 text-[10px] mt-0.5">23% this month</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
