import Image from 'next/image'
import { useState } from 'react'
import AnimateIn from './AnimateIn'

const services = [
  {
    number: '01',
    title: 'Annual Maintenance Contracts',
    short: 'Ongoing System Health',
    desc: 'Brand-agnostic preventive maintenance and 24/7 emergency response to keep your BMS running at peak efficiency — year after year.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=85',
    color: '#3b82f6',
    highlights: ['Brand-Agnostic Support', 'Preventive Strategies', '24/7 Emergency Response', 'Performance Optimisation'],
    stat: { value: '24/7', label: 'Emergency SLA' },
  },
  {
    number: '02',
    title: 'Energy Retrofit Solutions',
    short: 'Transform Existing Facilities',
    desc: 'Comprehensive energy audits and retrofit programmes that cut operational costs significantly while meeting your sustainability targets.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85',
    color: '#10b981',
    highlights: ['Comprehensive Energy Audits', 'Significant Cost Savings', 'Sustainability Goals', 'Seamless Integration'],
    stat: { value: '30%', label: 'Avg. Energy Saved' },
  },
  {
    number: '03',
    title: 'Smart Metering Solutions',
    short: 'Real-Time Utility Visibility',
    desc: 'BTU, water, and utility monitoring with tenant billing software — complete consumption visibility across every zone of your facility.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85',
    color: '#8b5cf6',
    highlights: ['BTU Meters', 'Water Meters', 'Smart Shut-off Valves', 'Tenant Billing Software'],
    stat: { value: '100%', label: 'Utility Visibility' },
  },
]

type Service = typeof services[0]

function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group relative rounded-3xl overflow-hidden cursor-default h-[420px] lg:h-[480px]"
      style={{
        boxShadow: hovered
          ? `0 24px 64px ${service.color}28, 0 4px 16px rgba(0,0,0,0.14)`
          : '0 4px 24px rgba(0,0,0,0.09)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'box-shadow 0.35s ease, transform 0.35s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background photo */}
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ filter: 'brightness(0.82) contrast(1.1) saturate(1.1)' }}
        sizes="(max-width: 1024px) 100vw, 33vw"
      />

      {/* Depth gradient — heavy at bottom for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(5,10,30,0.97) 0%, rgba(5,10,30,0.70) 40%, rgba(5,10,30,0.25) 70%, transparent 100%)',
        }}
      />

      {/* Subtle colour grade */}
      <div
        className="absolute inset-0"
        style={{ background: `${service.color}12`, mixBlendMode: 'multiply' }}
      />

      {/* Top glow line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${service.color} 40%, ${service.color} 60%, transparent 100%)` }}
      />

      {/* ── Top bar: number + category + stat ── */}
      <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-10">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-display"
            style={{
              background: `${service.color}22`,
              border: `1px solid ${service.color}55`,
              color: service.color,
              boxShadow: `0 0 10px ${service.color}30`,
            }}
          >
            {service.number}
          </div>
          <span className="text-white/60 text-[10px] font-semibold uppercase tracking-widest
                           bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {service.short}
          </span>
        </div>

        {/* Stat badge — amber */}
        <div className="text-right">
          <div className="font-display font-bold text-2xl leading-none" style={{ color: '#F59E0B' }}>
            {service.stat.value}
          </div>
          <div className="text-white/45 text-[9px] uppercase tracking-wider mt-0.5">
            {service.stat.label}
          </div>
        </div>
      </div>

      {/* ── Bottom content ── */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">

        {/* Amber accent line — expands on hover */}
        <div
          className="rounded-full mb-4 transition-all duration-500 group-hover:w-14"
          style={{ width: '24px', height: '2px', background: 'linear-gradient(90deg, #D97706, #F59E0B)', boxShadow: '0 0 8px rgba(217,119,6,0.5)' }}
        />

        <h3
          className="font-display text-white font-bold text-xl leading-snug mb-2"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}
        >
          {service.title}
        </h3>

        {/* Description — slides up on hover */}
        <p
          className="text-white/72 text-sm leading-relaxed mb-4 transition-all duration-400
                     lg:opacity-0 lg:translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
        >
          {service.desc}
        </p>

        {/* Feature pills */}
        <div
          className="flex flex-wrap gap-1.5 transition-all duration-400
                     lg:opacity-0 lg:translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
          style={{ transitionDelay: '60ms' }}
        >
          {service.highlights.map((h) => (
            <span
              key={h}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md text-white"
              style={{
                background: `${service.color}22`,
                border: `1px solid ${service.color}50`,
              }}
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="section-padding section-light">
      <div className="container-narrow">

        <AnimateIn className="max-w-xl mb-14">
          <span className="label-tag">Our Services</span>
          <h2 className="heading-section mb-4">
            Comprehensive Technical{' '}
            <span className="text-accent">Service Offering</span>
          </h2>
          <p className="body-lead">
            From ongoing maintenance contracts to full energy retrofit programmes,
            we provide the full lifecycle of building technology services.
          </p>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, idx) => (
            <AnimateIn key={service.title} delay={idx * 100}>
              <ServiceCard service={service} />
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
