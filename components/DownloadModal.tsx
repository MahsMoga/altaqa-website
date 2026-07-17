'use client'
import { useEffect, useRef, useState } from 'react'
import { gtagEvent } from '../lib/gtag'

interface Props {
  open: boolean
  onClose: () => void
}

type Stage = 'form' | 'submitting' | 'done' | 'error'

export default function DownloadModal({ open, onClose }: Props) {
  const [stage, setStage] = useState<Stage>('form')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const firstRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setStage('form')
      setTimeout(() => firstRef.current?.focus(), 80)
    }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStage('submitting')
    try {
      await fetch('/api/download-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email }),
      })
      setStage('done')
      gtagEvent('company_profile_download', { company, email })
      // Trigger download after a short delay so the success state is visible
      setTimeout(() => {
        const a = document.createElement('a')
        a.href = '/company-profile.pdf'
        a.download = 'Al-Taqa-Technical-Company-Profile.pdf'
        a.click()
      }, 600)
    } catch {
      setStage('error')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(5,12,28,0.82)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'linear-gradient(175deg, #0d1527 0%, #0f1c3a 100%)', border: '1px solid rgba(255,255,255,0.09)' }}
      >
        {/* Top accent bar */}
        <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706)' }} />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="px-7 pt-6 pb-7">
          {stage === 'done' ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L19 7" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-2">Your download is starting</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                The Al Taqa Technical company profile is downloading now.<br/>
                Our team will be in touch shortly.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                     style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#f59e0b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" stroke="#f59e0b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg leading-snug mb-1">
                    Download Company Profile
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">
                    Our full capability profile — services, certifications, project references, and partner brands.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    ref={firstRef}
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Mohammed Al Rashidi"
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>

                <div>
                  <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
                    Company <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="Aldar Properties"
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>

                <div>
                  <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
                    Work Email <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="m.rashidi@aldar.com"
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>

                {stage === 'error' && (
                  <p className="text-red-400 text-xs">Something went wrong — please try again or contact us directly.</p>
                )}

                <button
                  type="submit"
                  disabled={stage === 'submitting'}
                  className="w-full mt-1 py-3.5 rounded-xl font-bold text-sm transition-all"
                  style={{
                    background: stage === 'submitting'
                      ? 'rgba(245,158,11,0.4)'
                      : 'linear-gradient(135deg, #d97706, #f59e0b)',
                    color: 'white',
                    boxShadow: stage === 'submitting' ? 'none' : '0 4px 20px rgba(217,119,6,0.35)',
                  }}
                >
                  {stage === 'submitting' ? 'Preparing download…' : 'Download PDF — Free'}
                </button>

                <p className="text-white/25 text-[11px] text-center leading-relaxed">
                  No spam. We only contact you if your project is a fit.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
