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
    <section id="why-us" className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #f8f7f5 0%, #f3f2ef 100%)',
        clipPath: 'polygon(0 0, 100% 48px, 100% 100%, 0 100%)',
        marginTop: '-48px',
        paddingTop: 'calc(var(--section-padding, 5rem) + 48px)',
      }}>

      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
           style={{
             backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
             backgroundSize: '20px 20px',
           }} />

      <div className="container-narrow relative z-10">

        {/* Section header */}
        <AnimateIn className="mb-12">
          <span className="inline-flex items-center gap-2 text-accent text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-4 h-px bg-accent/50" />
            Why Al Taqa
            <span className="w-4 h-px bg-accent/50" />
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end gap-4">
            <h2 className="font-display text-navy text-3xl lg:text-4xl font-bold leading-tight">
              Six Reasons Clients{' '}
              <span className="text-accent">Choose Us</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm lg:ml-auto lg:mb-0.5">
              Engineering competence meets operational reliability across Abu Dhabi.
            </p>
          </div>
        </AnimateIn>

        {/* Interactive layout */}
        <div className="grid lg:grid-cols-5 gap-4 lg:gap-6">

          {/* Left: selector list */}
          <AnimateIn className="lg:col-span-2">
            <div className="space-y-2">
              {reasons.map((item, idx) => {
                const isActive = idx === active
                return (
                  <button
                    key={item.title}
                    onClick={() => setActive(idx)}
                    className="w-full text-left rounded-2xl transition-all duration-300 overflow-hidden"
                    style={{
                      background: isActive ? `${item.color}12` : 'rgba(255,255,255,0.85)',
                      border: `1px solid ${isActive ? item.color + '50' : 'rgba(0,0,0,0.07)'}`,
                      boxShadow: isActive ? `0 8px 32px ${item.color}20` : '0 1px 4px rgba(0,0,0,0.05)',
                    }}
                  >
                    <div className="flex items-center gap-3.5 p-4">
                      {/* Colored left accent bar */}
                      <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-all duration-300"
                           style={{
                             background: item.color,
                             opacity: isActive ? 1 : 0.25,
                           }} />

                      {/* Number */}
                      <div
                        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-xs transition-all duration-300"
                        style={{
                          background: isActive ? item.color : `${item.color}18`,
                          color: isActive ? '#fff' : item.color,
                          border: `1px solid ${isActive ? 'transparent' : item.color + '40'}`,
                          boxShadow: isActive ? `0 0 16px ${item.color}50` : 'none',
                        }}
                      >
                        {item.number}
                      </div>

                      {/* Title */}
                      <span
                        className="text-sm font-semibold leading-snug transition-colors duration-300"
                        style={{ color: isActive ? item.color : 'rgba(0,0,0,0.65)' }}
                      >
                        {item.short}
                      </span>

                      {/* Arrow — always visible, colored */}
                      <svg
                        className="ml-auto flex-shrink-0 transition-all duration-300"
                        style={{
                          opacity: isActive ? 1 : 0.3,
                          transform: isActive ? 'translateX(0)' : 'translateX(-4px)',
                        }}
                        width="14" height="14" viewBox="0 0 14 14" fill="none"
                      >
                        <path d="M3 7h8M8 4l3 3-3 3" stroke={item.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>

                    {/* Active color bar at bottom */}
                    {isActive && (
                      <div className="h-px mx-4 mb-3 rounded-full"
                           style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}30)` }} />
                    )}
                  </button>
                )
              })}
            </div>

            {/* CTA below selector */}
            <div className="mt-5 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.08)' }}>
              <p className="text-slate-400 text-xs leading-relaxed italic mb-4">
                &ldquo;Our mission extends beyond technical implementation — we build partnerships that support long-term operational success.&rdquo;
              </p>
              <a href="#contact" className="btn-primary w-full justify-center">
                Start a Conversation
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </AnimateIn>

          {/* Right: image + content panel */}
          <AnimateIn delay={100} className="lg:col-span-3">
            <div
              key={active}
              className="relative rounded-3xl overflow-hidden h-[420px] lg:h-full min-h-[420px]"
              style={{ boxShadow: `0 32px 80px ${r.color}20, 0 8px 32px rgba(0,0,0,0.4)` }}
            >
              {/* Background image */}
              <Image
                src={r.image}
                alt={r.title}
                fill
                className="object-cover transition-all duration-700"
                style={{ filter: 'brightness(0.75) contrast(1.1) saturate(1.1)' }}
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Color grade overlay */}
              <div className="absolute inset-0" style={{ background: `${r.color}18`, mixBlendMode: 'multiply' }} />

              {/* Dark gradient */}
              <div className="absolute inset-0"
                   style={{ background: 'linear-gradient(to top, rgba(5,10,30,0.97) 0%, rgba(5,10,30,0.55) 45%, rgba(5,10,30,0.15) 80%, transparent 100%)' }} />

              {/* Top glow line */}
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                   style={{ background: `linear-gradient(90deg, transparent 0%, ${r.color} 35%, ${r.color} 65%, transparent 100%)` }} />

              {/* Top-right: stat badge */}
              <div className="absolute top-5 right-5">
                <div className="text-right">
                  <div className="font-display font-black text-3xl leading-none" style={{ color: r.color, textShadow: `0 0 20px ${r.color}60` }}>
                    {r.stat.value}
                  </div>
                  <div className="text-white/50 text-[10px] uppercase tracking-wider mt-0.5">{r.stat.label}</div>
                </div>
              </div>

              {/* Top-left: number */}
              <div className="absolute top-5 left-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-xs"
                  style={{ background: `${r.color}25`, border: `1px solid ${r.color}55`, color: r.color }}
                >
                  {r.number}
                </div>
              </div>

              {/* Large watermark number */}
              <div className="absolute bottom-0 right-4 font-display font-black text-[140px] leading-none select-none pointer-events-none"
                   style={{ color: r.color, opacity: 0.07 }}>
                {r.number}
              </div>

              {/* Bottom content */}
              <div className="absolute inset-0 p-7 flex flex-col justify-end">
                {/* Accent line */}
                <div className="rounded-full mb-4"
                     style={{ width: '40px', height: '2px', background: `linear-gradient(90deg, ${r.color}, ${r.color}60)`, boxShadow: `0 0 10px ${r.color}60` }} />

                <h3 className="font-display font-bold text-white text-2xl lg:text-3xl leading-snug mb-3"
                    style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
                  {r.title}
                </h3>

                <p className="text-white/70 text-sm leading-relaxed max-w-md">
                  {r.desc}
                </p>

                {/* Progress dots */}
                <div className="flex gap-1.5 mt-6">
                  {reasons.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === active ? '24px' : '6px',
                        height: '6px',
                        background: i === active ? r.color : 'rgba(255,255,255,0.25)',
                        boxShadow: i === active ? `0 0 8px ${r.color}80` : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}
