'use client'
import { useEffect, useState } from 'react'
import DownloadModal from './DownloadModal'

// Realistic per-metric fluctuation ranges for a UAE commercial building
const FLUCTUATION: Record<string, { delta: number; decimals: number }> = {
  'kWh': { delta: 14, decimals: 0 },
  '°C':  { delta: 0.3, decimals: 1 },
  '%':   { delta: 3, decimals: 0 },
  'ppm': { delta: 9, decimals: 0 },
}

function useLiveValue(base: number, unit: string) {
  const cfg = FLUCTUATION[unit] ?? { delta: 0, decimals: 0 }
  const [val, setVal] = useState(base)
  useEffect(() => {
    const t = setInterval(() => {
      const next = base + (Math.random() - 0.5) * 2 * cfg.delta
      setVal(+next.toFixed(cfg.decimals))
    }, 4200)
    return () => clearInterval(t)
  }, [base, cfg.delta, cfg.decimals])
  return val
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
  { label: 'Energy Usage', value: 186,  unit: 'kWh', change: '-12% vs last month', up: false, color: '#2f80ed', data: [210,204,198,195,190,188,186,184,187,183,186,184] },
  { label: 'Indoor Temp', value: 22.4,  unit: '°C',  change: 'Optimal comfort range', up: null,  color: '#10b981', data: [23.1,22.8,22.6,22.5,22.4,22.3,22.4,22.5,22.4,22.3,22.4,22.4] },
  { label: 'Occupancy',   value: 74,    unit: '%',   change: '+4% today',  up: true,  color: '#f59e0b', data: [60,65,70,68,72,74,75,73,76,74,77,74] },
  { label: 'CO₂ Level',   value: 624,   unit: 'ppm', change: 'Air quality: Good',   up: null,  color: '#10b981', data: [640,635,630,628,626,624,622,625,621,624,620,624] },
]

const alerts = [
  { zone: 'Floor 3 – HVAC', status: 'Running', ok: true },
  { zone: 'Chiller Plant', status: 'Optimal', ok: true },
  { zone: 'AHU-07 Filter', status: 'Replace soon', ok: false },
]

function MetricCard({ m }: { m: typeof metrics[0] }) {
  const live = useLiveValue(m.value, m.unit)
  return (
    <div className="bg-[#0a1628]/80 p-3.5">
      <div className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-1">{m.label}</div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-white text-xl font-bold font-display leading-none">{live}</span>
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
  )
}

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#0a1628' }}>
      {/* Hero background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.38) saturate(0.8) contrast(1.1)' }}
        />
      </div>

      {/* Dark gradient — stronger on left for text legibility, fades right */}
      <div className="absolute inset-0"
           style={{ background: 'linear-gradient(105deg, rgba(8,18,40,0.92) 0%, rgba(8,18,40,0.75) 45%, rgba(8,18,40,0.40) 100%)' }} />

      {/* Blue accent glow top-left */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_0%,rgba(47,128,237,0.18),transparent)]" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 hero-pattern opacity-20" />

      {/* Ambient orbs */}
      <div className="orb w-[420px] h-[420px] bg-accent/[0.08] -top-24 -right-16 animate-float" style={{ filter: 'blur(80px)' }} />
      <div className="orb w-80 h-80 bg-blue-900/20 bottom-24 -left-16 animate-float-slow" style={{ filter: 'blur(64px)' }} />

      {/* Wave divider — smooth curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-14 lg:h-20 fill-white">
          <path d="M0 80 C360 20 1080 60 1440 10 L1440 80 L0 80 Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="container-narrow relative z-10 pt-28 pb-16 lg:pt-32 lg:pb-28">
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

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#expertise" className="btn-primary">
                Explore Solutions
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-outline flex items-center gap-2"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15V3M8 11l4 4 4-4M3 19h18" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Company Profile
              </button>
            </div>

            <DownloadModal open={modalOpen} onClose={() => setModalOpen(false)} />

            {/* ── Certified Partner Strip ─────────────────────── */}
            {/* TODO: Replace each badge inner content with <img src="/images/partners/jci.svg" alt="..." /> once logos are available */}
            <div className="mb-10">
              <p className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.18em] mb-3">
                Certified & Authorised Partner
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Johnson Controls', abbr: 'JCI', color: '#FF3B30' },
                  { name: 'Schneider Electric', abbr: 'SE', color: '#3DCD58' },
                  { name: 'Honeywell', abbr: 'Honeywell', color: '#FF9F0A' },
                  { name: 'Tridium Niagara', abbr: 'Tridium', color: '#BF5AF2' },
                  { name: 'Trend Controls', abbr: 'Trend', color: '#0A84FF' },
                  { name: 'Hager Group', abbr: 'Hager', color: '#E05A2B' },
                ].map((p) => (
                  <div
                    key={p.name}
                    title={`${p.name} — Authorised Partner`}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full"
                    style={{
                      background: `${p.color}15`,
                      border: `1px solid ${p.color}40`,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <circle cx="5" cy="5" r="4.5" fill={p.color} fillOpacity="0.3" stroke={p.color} strokeWidth="0.8" />
                      <path d="M3 5l1.5 1.5L7 3.5" stroke={p.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xs font-bold" style={{ color: p.color }}>{p.abbr}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start pt-8 border-t border-white/[0.1]">
              {[
                { value: '500+', label: 'Projects Delivered', hero: true },
                { value: '20+', label: 'Years Experience', hero: false },
                { value: '24/7', label: 'Support SLA', hero: false },
              ].map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`flex-1 ${idx > 0 ? 'pl-5 sm:pl-7 border-l border-white/[0.1]' : 'pr-5 sm:pr-7'}`}
                >
                  <div
                    className={`font-display font-bold leading-none mb-1 ${stat.hero ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'}`}
                    style={{ color: stat.hero ? '#F59E0B' : 'white' }}
                  >
                    {stat.value}
                  </div>
                  {stat.hero && <div className="w-6 h-0.5 rounded-full mb-1.5" style={{ background: 'linear-gradient(90deg,#f59e0b,#d97706)' }} />}
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
                  {metrics.map((m) => <MetricCard key={m.label} m={m} />)}
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

              {/* Floating energy badge — warm amber/gold */}
              <div className="absolute -bottom-4 -right-4 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2.5"
                style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)', boxShadow: '0 8px 24px rgba(217,119,6,0.4)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <div className="text-white text-xs font-bold leading-none">Energy Saved</div>
                  <div className="text-white/85 text-[10px] mt-0.5">23% this month</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
