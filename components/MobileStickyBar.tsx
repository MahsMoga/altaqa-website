export default function MobileStickyBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
      style={{
        background: 'rgba(10, 22, 40, 0.97)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3">

        {/* WhatsApp */}
        <a
          href="https://wa.me/971585761499"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-sm text-white transition-opacity active:opacity-70"
          style={{ background: '#25D366' }}
          aria-label="Chat on WhatsApp"
        >
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path
              d="M14 2C7.373 2 2 7.373 2 14c0 2.12.557 4.11 1.53 5.835L2 26l6.345-1.49A11.94 11.94 0 0014 26c6.627 0 12-5.373 12-12S20.627 2 14 2z"
              fill="white"
            />
            <path
              d="M10.5 9.5c.3.9.9 1.8 1.65 2.55.75.75 1.65 1.35 2.55 1.65l1.35-1.35c.15-.15.38-.22.58-.12l2.77 1.35c.25.12.37.4.3.67l-.45 1.88c-.1.33-.42.57-.75.52C11.25 16.5 9 10.5 9 10.5c-.05-.33.19-.65.52-.75l1.88-.45c.27-.07.55.05.67.3l1.35 2.77c.1.2.03.5-.12.6l-.8.53z"
              fill="#25D366"
            />
          </svg>
          WhatsApp
        </a>

        {/* Divider */}
        <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.12)' }} />

        {/* Get Quote */}
        <a
          href="#contact"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-opacity active:opacity-70"
          style={{ background: 'linear-gradient(135deg, #D97706, #B45309)' }}
          aria-label="Get a free quote"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 4h12M2 8h8M2 12h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Get Quote
        </a>

      </div>
    </div>
  )
}
