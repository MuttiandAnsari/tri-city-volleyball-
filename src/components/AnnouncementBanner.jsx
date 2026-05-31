import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const ANNOUNCEMENT = {
  id: 'showdown-june-26',
  text: '🏐 Tri-City Showdown — June 26 at Fallon\'s Sports Park, Dublin.',
  cta: 'Register Now',
  href: '/tournament-register',
}

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem(`banner-${ANNOUNCEMENT.id}`)
    if (!dismissed) setVisible(true)
  }, [])

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
