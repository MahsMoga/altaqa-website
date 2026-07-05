import { useState, useMemo } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const FACILITY_TYPES = [
  { label: 'Hotel / Hospitality',   value: 'hotel',       saving: 0.28, icon: '🏨' },
  { label: 'Commercial Office',     value: 'office',      saving: 0.22, icon: '🏢' },
  { label: 'Industrial / Warehouse',value: 'industrial',  saving: 0.18, icon: '🏭' },
  { label: 'Healthcare / Hospital', value: 'healthcare',  saving: 0.20, icon: '🏥' },
  { label: 'Retail / Mall',         value: 'retail',      saving: 0.24, icon: '🏬' },
  { label: 'Residential / Mixed',   value: 'residential', saving: 0.16, icon: '🏗️' },
]

const BMS_STATUS = [
  { label: 'No BMS installed',        value: 'none',   multiplier: 1.0 },
  { label: 'Legacy BMS (10+ years)',   value: 'legacy', multiplier: 0.65 },
  { label: 'Modern BMS (< 10 years)', value: 'modern', multiplier: 0.35 },
]

const CO2_PER_KWH_UAE = 0.45 // kg CO2 per kWh (UAE grid factor)
const AED_PER_KWH     = 0.38 // average UAE commercial tariff

function fmt(n: number) {
  return new Intl.NumberFormat('en-AE', { maximumFractionDigits: 0 }).format(n)
}

export default function EnergyCalculator() {
  const [facilityType, setFacilityType] = useState('hotel')
  const [bmsStatus,    setBmsStatus]    = useState('none')
  const [monthlyBill,  setMonthlyBill]  = useState(50000)
  const [area,         setArea]         = useState(5000)
  const [submitted,    setSubmitted]    = useState(false)

  const facility = FACILITY_TYPES.find(f => f.value === facilityType)!
  const bms      = BMS_STATUS.find(b => b.value === bmsStatus)!

  const results = useMemo(() => {
    const baseSaving     = facility.saving * bms.multiplier
    const annualBill     = monthlyBill * 12
    const annualSaving   = annualBill * baseSaving
    const monthlySaving  = annualSaving / 12
    const fiveYearSaving = annualSaving * 5

    // Rough BMS investment estimate: AED 120–200/m² depending on complexity
    const investmentLow  = area * 120
    const investmentHigh = area * 200
    const investmentMid  = (investmentLow + investmentHigh) / 2

    const paybackMonths  = annualSaving > 0 ? (investmentMid / annualSaving) * 12 : 0

    // CO2: convert AED bill to kWh, then to CO2
    const annualKwh      = annualBill / AED_PER_KWH
    const co2Saved       = annualKwh * baseSaving * CO2_PER_KWH_UAE / 1000 // tonnes

    return {
      baseSaving: Math.round(baseSaving * 100),
      annualSaving,
      monthlySaving,
      fiveYearSaving,
      investmentLow,
      investmentHigh,
      paybackMonths: Math.round(paybackMonths),
      co2Saved: Math.round(co2Saved),
    }
  }, [facilityType, bmsStatus, monthlyBill, area, facility, bms])

  return (
    <>
      <Head>
        <title>BMS Energy Savings Calculator | Al Taqa Technical Abu Dhabi</title>
        <meta name="description"
          content="Calculate your potential energy savings and ROI from a Building Management System. Free BMS savings estimator for UAE facilities — hotels, offices, industrial, healthcare." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.altaqauae.com/energy-calculator" />
      </Head>

      <Navbar />

      <main className="bg-white min-h-screen">
        {/* Hero band */}
        <div className="bg-navy pt-32 pb-16">
          <div className="container-narrow">
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Free Tool</p>
            <h1 className="font-display text-white text-3xl lg:text-4xl font-bold leading-tight max-w-2xl">
              BMS Energy Savings Calculator
            </h1>
            <p className="text-white/55 text-sm mt-4 max-w-xl leading-relaxed">
              Estimate how much your facility could save with a modern Building Management System.
              Based on UAE commercial energy tariffs and real-world BMS performance data.
            </p>
          </div>
        </div>

        <div className="container-narrow py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* ── Left: Inputs ─────────────────────────────── */}
            <div className="space-y-7">

              {/* Facility type */}
              <div>
                <label className="block text-navy text-xs font-bold uppercase tracking-widest mb-3">
                  Facility Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FACILITY_TYPES.map(f => (
                    <button
                      key={f.value}
                      onClick={() => setFacilityType(f.value)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-semibold
                                  transition-all duration-200 cursor-pointer
                                  ${facilityType === f.value
                                    ? 'border-accent bg-accent/5 text-accent'
                                    : 'border-slate-200 text-slate-500 hover:border-accent/40 hover:text-accent/70'}`}
                    >
                      <span className="text-xl">{f.icon}</span>
                      <span className="text-center leading-tight">{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* BMS Status */}
              <div>
                <label className="block text-navy text-xs font-bold uppercase tracking-widest mb-3">
                  Current BMS Status
                </label>
                <div className="space-y-2">
                  {BMS_STATUS.map(b => (
                    <button
                      key={b.value}
                      onClick={() => setBmsStatus(b.value)}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border text-sm font-medium
                                  transition-all duration-200 text-left cursor-pointer
                                  ${bmsStatus === b.value
                                    ? 'border-accent bg-accent/5 text-navy'
                                    : 'border-slate-200 text-slate-500 hover:border-accent/30'}`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                      ${bmsStatus === b.value ? 'border-accent' : 'border-slate-300'}`}>
                        {bmsStatus === b.value && <div className="w-2 h-2 rounded-full bg-accent" />}
                      </div>
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly energy bill */}
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-navy text-xs font-bold uppercase tracking-widest">
                    Monthly Energy Bill
                  </label>
                  <span className="text-accent font-bold text-sm">AED {fmt(monthlyBill)}</span>
                </div>
                <input
                  type="range"
                  min={5000} max={500000} step={5000}
                  value={monthlyBill}
                  onChange={e => setMonthlyBill(Number(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>AED 5,000</span><span>AED 500,000</span>
                </div>
              </div>

              {/* Building area */}
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-navy text-xs font-bold uppercase tracking-widest">
                    Building Floor Area
                  </label>
                  <span className="text-accent font-bold text-sm">{fmt(area)} m²</span>
                </div>
                <input
                  type="range"
                  min={500} max={100000} step={500}
                  value={area}
                  onChange={e => setArea(Number(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>500 m²</span><span>100,000 m²</span>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-slate-400 text-xs leading-relaxed">
                Estimates are based on UAE commercial energy tariffs (AED 0.38/kWh) and
                published BMS performance benchmarks. Actual savings will vary based on
                facility condition, occupancy patterns, and system configuration.
                Contact us for a detailed site-specific assessment.
              </p>
            </div>

            {/* ── Right: Results ────────────────────────────── */}
            <div className="lg:sticky lg:top-24 space-y-4">

              {/* Headline saving */}
              <div className="rounded-3xl p-8 text-white"
                   style={{ background: 'linear-gradient(135deg, #0f1c3f 0%, #1a3468 100%)' }}>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">
                  Estimated annual saving
                </p>
                <div className="font-display text-4xl font-bold mb-1">
                  AED {fmt(results.annualSaving)}
                </div>
                <p className="text-white/60 text-sm">
                  AED {fmt(results.monthlySaving)} per month &nbsp;·&nbsp; {results.baseSaving}% reduction
                </p>

                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-white/45 text-[10px] uppercase tracking-wider mb-1">5-Year Saving</div>
                    <div className="text-white font-bold text-base">AED {fmt(results.fiveYearSaving)}</div>
                  </div>
                  <div>
                    <div className="text-white/45 text-[10px] uppercase tracking-wider mb-1">Payback Period</div>
                    <div className="text-white font-bold text-base">
                      {results.paybackMonths > 0 ? `${results.paybackMonths} months` : '—'}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/45 text-[10px] uppercase tracking-wider mb-1">CO₂ Saved</div>
                    <div className="text-white font-bold text-base">{fmt(results.co2Saved)} t/yr</div>
                  </div>
                </div>
              </div>

              {/* Estimated investment */}
              <div className="rounded-2xl border border-slate-200 p-6">
                <p className="text-navy text-xs font-bold uppercase tracking-widest mb-4">
                  Indicative BMS Investment
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-slate-400 text-xs mb-1">Estimated range</div>
                    <div className="font-display text-navy font-bold text-lg">
                      AED {fmt(results.investmentLow)} – {fmt(results.investmentHigh)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-xs mb-1">ROI achieved by</div>
                    <div className="font-display text-accent font-bold text-lg">
                      Month {results.paybackMonths}
                    </div>
                  </div>
                </div>
                {/* ROI bar */}
                <div className="mt-4 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-accent transition-all duration-500"
                    style={{ width: `${Math.min(100, (results.paybackMonths / 60) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Now</span><span>5 years</span>
                </div>
              </div>

              {/* CTA */}
              {!submitted ? (
                <div className="rounded-2xl bg-accent/5 border border-accent/20 p-6">
                  <p className="text-navy font-display font-bold text-sm mb-1">
                    Get a detailed assessment
                  </p>
                  <p className="text-slate-500 text-xs mb-4 leading-relaxed">
                    These are estimates. Our engineers will provide a precise saving
                    projection for your specific facility — at no cost.
                  </p>
                  <a
                    href="/#contact"
                    className="btn-primary w-full justify-center"
                    onClick={() => setSubmitted(true)}
                  >
                    Request Free Site Assessment
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              ) : (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6 text-center">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="mx-auto mb-3">
                    <path d="M6 14l5.5 5.5L22 8" stroke="#16a34a" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-emerald-700 font-semibold text-sm">
                    Redirecting you to our contact form...
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
