'use client'
import { useState } from 'react'
import Image from 'next/image'
import AnimateIn from './AnimateIn'

const reasons = [
  {
    number: '01',
    title: '20+ Years of Proven Experience',
    short: 'Proven Experience',
    desc: "Two decades of continuous delivery across the UAE's commercial, industrial, and hospitality sectors. Experience that translates directly to fewer surprises on your project.",
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85',
    color: '#F59E0B',
    stat: { value: '500+', label: 'Projects Delivered' },
  },
  {
    number: '02',
    title: 'Multi-Brand BMS Expertise',
    short: 'Multi-Brand Certified',
    desc: "Certified across Johnson Controls, Schneider Electric, Honeywell, and Tridium platforms. We speak every BMS dialect — you get the right tool for every job.",
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=85',
    color: '#2F80ED',
    stat: { value: '6+', label: 'Major Platforms' },
  },
  {
    number: '03',
    title: 'Truly Vendor-Neutral Approach',
    short: 'Vendor Neutral',
    desc: "Our advice is guided solely by what's right for your facility — not by manufacturer incentives. Independent expertise you can trust.",
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85',
    color: '#10b981',
    stat: { value: '100%', label: 'Independent Advice' },
  },
  {
    number: '04',
    title: 'Skilled Engineering Team',
    short: 'Expert Engineers',
    desc: 'Every engineer brings deep, discipline-specific expertise. Continuous training ensures our team stays current with the latest platforms and protocols.',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=85',
    color: '#8b5cf6',
    stat: { value: '30+', label: 'Certified Engineers' },
  },
  {
    number: '05',
    title: 'Abu Dhabi Local Presence',
    short: 'Abu Dhabi Based',
    desc: 'On-the-ground presence in Abu Dhabi means faster response times, stronger relationships, and deep understanding of local regulations and requirements.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85',
    color: '#06b6d4',
    stat: { value: '2hr', label: 'Avg. Response Time' },
  },
  {
    number: '06',
    title: 'Continuity & Long-Term Partnership',
    short: 'Long-Term Partner',
    desc: 'The same team, the same relationships, the same commitment — carried forward. Our clients stay with us for years because we deliver consistency.',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1200&q=85',
    color: '#f97316',
    stat: { value: '90%', label: 'Client Retention Rate' },
  },
]

export default function WhyChooseUs() {
  const [active, setActive] = useState(0)
  const r = reasons[active]

  return (
    <section
      id="why-us"
      className="relative overflow-hidden"
      style={{ background: '#111827' }}
    >
      {/* Subtle grid overlay on left */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
           style={{
             backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
             backgroundSize: '48px 48px',
           }} />

      <div className="flex flex-col lg:flex-row min-h-[680px]">

        {/* ── Left: padded content panel ── */}
        <div className="relative z-10 lg:w-[45%] flex flex-col justify-center
                        px-6 sm:px-10 lg:px-16 xl:px-20
                        pt-16 pb-10 lg:pt-28 lg:pb-16">

          {/* Header */}
          <AnimateIn className="mb-10">
            <span className="inline-flex items-center gap-2 text-accent text-xs font-bold tracking-widest uppercase mb-5">
              <span className="w-4 h-px bg-accent/50" />
              Why Al Taqa
              <span className="w-4 h-px bg-accent/50" />
            </span>
            <h2 className="font-display text-white text-3xl lg:text-4xl font-bold leading-tight mb-3">
              Six Reasons Clients{' '}
              <span className="text-accent">Choose Us</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              Engineering competence meets operational reliability across Abu Dhabi.
            </p>
          </AnimateIn>

          {/* Selector list */}
          <AnimateIn delay={60} className="space-y-2 mb-8">
            {reasons.map((item, idx) => {
              const isActive = idx === active
              return (
                <button
                  key={item.title}
                  onClick={() => setActive(idx)}
                  className="relative w-full text-left rounded-xl transition-all duration-300 overflow-hidden"
                  style={{
                    background: isActive ? `${item.color}15` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isActive ? item.color + '45' : 'rgba(255,255,255,0.07)'}`,
                    boxShadow: isActive ? `0 4px 24px ${item.color}18` : 'none',
                  }}
                >
                  <div className="flex items-center gap-3 p-3.5">
                    {/* Left color bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-opacity duration-300"
                         style={{ background: item.color, opacity: isActive ? 1 : 0.2 }} />

                    {/* Number badge */}
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-xs transition-all duration-300"
                      style={{
                        background: isActive ? item.color : `${item.color}20`,
                        color: isActive ? '#fff' : item.color,
                        boxShadow: isActive ? `0 0 12px ${item.color}50` : 'none',
                      }}
                    >
                      {item.number}
                    </div>

                    {/* Title */}
                    <span className="text-sm font-semibold transition-colors duration-300"
                          style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.45)' }}>
                      {item.short}
                    </span>

                    {/* Arrow */}
                    <svg className="ml-auto flex-shrink-0 transition-all duration-300"
                         style={{ opacity: isActive ? 1 : 0.2, transform: isActive ? 'translateX(0)' : 'translateX(-4px)' }}
                         width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke={item.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {isActive && (
                    <div className="h-px mx-3.5 mb-2.5"
                         style={{ background: `linear-gradient(90deg, ${item.color}60, transparent)` }} />
                  )}
                </button>
              )
            })}
          </AnimateIn>

          {/* CTA */}
          <AnimateIn delay={120}>
            <a href="#contact" className="btn-primary inline-flex">
              Start a Conversation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </AnimateIn>
        </div>

        {/* ── Right: full-bleed photo panel ── */}
        <div key={active} className="relative lg:w-[55%] min-h-[420px] lg:min-h-0">
          {/* Photo */}
          <Image
            src={r.image}
            alt={r.title}
            fill
            className="object-cover transition-all duration-700"
            style={{ filter: 'brightness(0.7) contrast(1.1) saturate(1.1)' }}
            sizes="(max-width: 1024px) 100vw, 55vw"
          />

          {/* Color grade */}
          <div className="absolute inset-0" style={{ background: `${r.color}20`, mixBlendMode: 'multiply' }} />

          {/* Dark gradient — left edge blends into charcoal */}
          <div className="absolute inset-0"
               style={{ background: 'linear-gradient(to right, #111827 0%, transparent 20%), linear-gradient(to top, rgba(5,10,30,0.95) 0%, rgba(5,10,30,0.4) 40%, transparent 70%)' }} />

          {/* Top color line */}
          <div className="absolute top-0 left-0 right-0 h-[3px]"
               style={{ background: `linear-gradient(90deg, ${r.color}80 0%, ${r.color} 40%, ${r.color} 60%, transparent 100%)` }} />

          {/* Stat — top right */}
          <div className="absolute top-8 right-8">
            <div className="text-right">
              <div className="font-display font-black text-4xl leading-none"
                   style={{ color: r.color, textShadow: `0 0 24px ${r.color}60` }}>
                {r.stat.value}
              </div>
              <div className="text-white/45 text-[10px] uppercase tracking-wider mt-1">{r.stat.label}</div>
            </div>
          </div>

          {/* Watermark number */}
          <div className="absolute bottom-0 right-6 font-display font-black text-[160px] leading-none select-none pointer-events-none"
               style={{ color: r.color, opacity: 0.06 }}>
            {r.number}
          </div>

          {/* Bottom content */}
          <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end">
            <div className="rounded-full mb-4"
                 style={{ width: '40px', height: '2px', background: `linear-gradient(90deg, ${r.color}, ${r.color}60)`, boxShadow: `0 0 10px ${r.color}60` }} />

            <h3 className="font-display font-bold text-white text-2xl lg:text-3xl leading-snug mb-3"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>
              {r.title}
            </h3>

            <p className="text-white/65 text-sm leading-relaxed max-w-lg mb-6">
              {r.desc}
            </p>

            {/* Progress dots */}
            <div className="flex gap-2">
              {reasons.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? '28px' : '6px',
                    height: '6px',
                    background: i === active ? r.color : 'rgba(255,255,255,0.2)',
                    boxShadow: i === active ? `0 0 8px ${r.color}80` : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
