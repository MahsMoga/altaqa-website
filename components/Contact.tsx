import { useState, FormEvent } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // In production: send to API / email service
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section-padding bg-slate-corporate">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: info */}
          <div>
            <span className="label-tag">Contact Us</span>
            <h2 className="heading-section mb-6">
              Ready to Transform{' '}
              <span className="text-accent">Your Facility?</span>
            </h2>
            <p className="body-lead mb-10">
              Speak with our engineering team to discover how Al Taqa Technical
              can elevate your building's intelligence, efficiency, and
              sustainability.
            </p>

            {/* Contact info */}
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 1.5C6.515 1.5 4.5 3.515 4.5 6c0 4.125 4.5 10.5 4.5 10.5S13.5 10.125 13.5 6c0-2.485-2.015-4.5-4.5-4.5z" stroke="#2F80ED" strokeWidth="1.4"/>
                    <circle cx="9" cy="6" r="1.5" stroke="#2F80ED" strokeWidth="1.4"/>
                  </svg>
                </div>
                <div>
                  <div className="text-navy font-semibold text-sm mb-0.5" style={{ fontFamily: 'var(--font-sora)' }}>
                    Location
                  </div>
                  <div className="text-slate-500 text-sm">Abu Dhabi, United Arab Emirates</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="1.5" y="4" width="15" height="10" rx="1.5" stroke="#2F80ED" strokeWidth="1.4"/>
                    <path d="M1.5 6l7.5 5 7.5-5" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-navy font-semibold text-sm mb-0.5" style={{ fontFamily: 'var(--font-sora)' }}>
                    Email
                  </div>
                  <div className="text-slate-500 text-sm">info@altaqauae.com</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 3h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a1.5 1.5 0 01-1.5 1.5C6.5 18 0 11.5 0 4.5A1.5 1.5 0 013 3z" stroke="#2F80ED" strokeWidth="1.4" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-navy font-semibold text-sm mb-0.5" style={{ fontFamily: 'var(--font-sora)' }}>
                    Response Time
                  </div>
                  <div className="text-slate-500 text-sm">Within 24 hours on business days</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="7.5" stroke="#2F80ED" strokeWidth="1.4"/>
                    <path d="M9 5v4l2.5 2.5" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-navy font-semibold text-sm mb-0.5" style={{ fontFamily: 'var(--font-sora)' }}>
                    Emergency Support
                  </div>
                  <div className="text-slate-500 text-sm">24/7 for AMC contract clients</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl border border-slate-border p-8 shadow-card">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M6 14l5.5 5.5L22 8" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-navy font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-sora)' }}>
                  Message Sent
                </h3>
                <p className="text-slate-500 text-sm">
                  Thank you for reaching out. Our team will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-navy font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-sora)' }}>
                    Send Us a Message
                  </h3>
                  <p className="text-slate-400 text-xs">All fields are required</p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ahmed Al Rashidi"
                    className="w-full border border-slate-border rounded-lg px-4 py-3 text-sm text-navy placeholder-slate-400
                               focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ahmed@company.ae"
                    className="w-full border border-slate-border rounded-lg px-4 py-3 text-sm text-navy placeholder-slate-400
                               focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
                    Company / Organisation
                  </label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Facility name or company"
                    className="w-full border border-slate-border rounded-lg px-4 py-3 text-sm text-navy placeholder-slate-400
                               focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your facility, current BMS setup, or project requirements..."
                    className="w-full border border-slate-border rounded-lg px-4 py-3 text-sm text-navy placeholder-slate-400
                               focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary justify-center py-4 text-sm"
                >
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
