export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/971585761499"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 group"
    >
      {/* Tooltip label */}
      <span
        className="hidden sm:block bg-white text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full
                   shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
                   transition-all duration-200 whitespace-nowrap pointer-events-none"
      >
        Chat on WhatsApp
      </span>

      {/* Button */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl
                   transition-transform duration-200 group-hover:scale-110 active:scale-95"
        style={{ background: '#25D366' }}
      >
        {/* Pulse ring */}
        <span className="absolute w-14 h-14 rounded-full opacity-20" style={{ background: '#25D366', animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite' }} />
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M14 2C7.373 2 2 7.373 2 14c0 2.12.557 4.11 1.53 5.835L2 26l6.345-1.49A11.94 11.94 0 0014 26c6.627 0 12-5.373 12-12S20.627 2 14 2z"
            fill="white"
          />
          <path
            d="M10.5 9.5c.3.9.9 1.8 1.65 2.55.75.75 1.65 1.35 2.55 1.65l1.35-1.35c.15-.15.38-.22.58-.12l2.77 1.35c.25.12.37.4.3.67l-.45 1.88c-.1.33-.42.57-.75.52C11.25 16.5 9 10.5 9 10.5c-.05-.33.19-.65.52-.75l1.88-.45c.27-.07.55.05.67.3l1.35 2.77c.1.2.03.5-.12.6l-.8.53z"
            fill="#25D366"
          />
        </svg>
      </div>
    </a>
  )
}
