import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const ANNOUNCEMENT = {
  id: 'practice-june-13',
  text: '🏐 First Practice — June 14 at Lake Elizabeth Park, Fremont.',
  cta: 'Register Now',
  href: '/register?practice=Advanced%20Competitive',
}

export default function AnnouncementBanner() {
  // Check synchronously so banner is visible on first render — avoids layout shift
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return !sessionStorage.getItem(`banner-${ANNOUNCEMENT.id}`)
  })

  function dismiss() {
    sessionStorage.setItem(`banner-${ANNOUNCEMENT.id}`, '1')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="relative z-50 bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-700 text-white text-sm"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
            <p className="font-semibold text-center flex-1 text-xs sm:text-sm">
              {ANNOUNCEMENT.text}
              {ANNOUNCEMENT.href && (
                <Link
                  to={ANNOUNCEMENT.href}
                  className="ml-2 underline font-black hover:text-cyan-200 transition-colors whitespace-nowrap"
                >
                  {ANNOUNCEMENT.cta} →
                </Link>
              )}
            </p>
            <button
              onClick={dismiss}
              className="shrink-0 text-white/70 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
