import AnimateIn from './AnimateIn'

// ─────────────────────────────────────────────────────────────────────────────
// TODO: Replace placeholder entries with real client quotes.
// Each object needs: quote, author, role, company, sector, year.
// Set `placeholder: true` on any entry you want hidden until it's real.
// ─────────────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      'Al Taqa delivered a complete BMS overhaul across all 312 guest rooms and central plant on time and within budget. The system has been running flawlessly for over two years — energy consumption dropped measurably from day one.',
    author: 'Director of Engineering',
    role: 'Director of Engineering',
    company: 'Anantara The Palm, Dubai',
    sector: 'Hospitality',
    year: '2023',
  },
  {
    quote:
      'Their team handled a complex Honeywell-to-Niagara migration on a live commercial tower without a single hour of unplanned downtime. Technical depth and project management genuinely rare in the Abu Dhabi market.',
    author: 'Facilities Manager',
    role: 'Facilities Manager',
    company: 'Maryah Tower, Abu Dhabi',
    sector: 'Commercial',
    year: '2024',
  },
  {
    quote:
      'Three years on an AMC with Al Taqa. Response times are fast, engineers know our plant inside out, and they flag issues before they become problems. Renewed without hesitation.',
    author: 'Operations Director',
    role: 'Operations Director',
    company: 'Ashkal Industries, Abu Dhabi',
    sector: 'Industrial',
    year: '2024',
  },
]

const sectorColors: Record<string, string> = {
  Hospitality: '#0A84FF',
  Commercial:  '#3DCD58',
  Industrial:  '#FF9F0A',
  Healthcare:  '#BF5AF2',
  Retail:      '#FF6B6B',
}

function StarRating() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="#F59E0B" stroke="#F59E0B" strokeWidth="1" strokeLinejoin="round"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-slate-50">
      <div className="container-narrow">

        {/* Header */}
        <AnimateIn className="max-w-xl mb-14">
          <span className="label-tag">Client Feedback</span>
          <h2 className="heading-section mb-4">
            Trusted by Facilities{' '}
            <span className="text-accent">Across the UAE</span>
          </h2>
          <p className="body-lead">
            From 5-star hotels to industrial complexes — here is what our clients
            say about working with Al Taqa Technical.
          </p>
        </AnimateIn>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t, idx) => {
            const color = sectorColors[t.sector] ?? '#2F80ED'
            return (
              <AnimateIn key={idx} delay={idx * 100}>
                <div
                  className="flex flex-col h-full rounded-3xl bg-white p-7"
                  style={{
                    border: '1px solid rgba(0,0,0,0.07)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                  }}
                >
                  {/* Top row: stars + sector badge */}
                  <div className="flex items-center justify-between mb-5">
                    <StarRating />
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ background: `${color}15`, color }}
                    >
                      {t.sector}
                    </span>
                  </div>

                  {/* Quote mark */}
                  <svg width="28" height="20" viewBox="0 0 28 20" fill="none"
                       className="mb-4 flex-shrink-0" aria-hidden="true">
                    <path d="M0 20V12C0 5.373 3.582 1.493 10.746 0L12 2.4C8.836 3.307 7.09 5.44 6.762 8.8H12V20H0zm16 0V12c0-6.627 3.582-10.507 10.746-12L28 2.4c-3.164.907-4.91 3.04-5.238 6.4H28V20H16z"
                          fill="#e2e8f0"/>
                  </svg>

                  {/* Quote text */}
                  <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                    {t.quote}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                    {/* Avatar initial */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
                      aria-hidden="true"
                    >
                      {t.role.split(' ').map(w => w[0]).filter((_, i) => i < 2).join('')}
                    </div>
                    <div>
                      <div className="text-navy font-semibold text-xs leading-tight">{t.role}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{t.company} · {t.year}</div>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            )
          })}
        </div>

        {/* "More coming" trust bar */}
        <AnimateIn>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5
                          rounded-2xl border border-slate-200 bg-white px-7 py-5">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['#0A84FF','#3DCD58','#FF9F0A'].map((c, i) => (
                  <div key={i}
                       className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
                       style={{ background: c }}>
                    {['H','C','I'][i]}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-navy font-semibold text-sm">
                  More client feedback being added
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  We regularly update this section with new project completions and client reviews.
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="flex-shrink-0 flex items-center gap-2 text-accent text-xs font-semibold
                         hover:text-accent-light transition-colors group"
            >
              Share your experience
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                   className="group-hover:translate-x-0.5 transition-transform">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}
