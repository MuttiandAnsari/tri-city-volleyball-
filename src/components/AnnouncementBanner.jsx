import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const MAX_SPOTS = 24
const SESSION_KEY = 'banner-open-play'

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return !sessionStorage.getItem(SESSION_KEY)
  })
  const [isFull, setIsFull] = useState(false)

  useEffect(() => {
    async function checkSpots() {
      const { data } = await supabase
        .from('practice_registrations')
        .select('practice_name')
        .eq('practice_name', 'Open Play')
      if (data && data.length >= MAX_SPOTS) setIsFull(true)
    }
    checkSpots()
  }, [])

  function dismiss() {
    sessionStorage.setItem(SESSION_KEY, '1')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`relative z-50 text-white text-sm ${isFull ? 'bg-slate-700' : 'bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-700'}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
            <p className="font-semibold text-center flex-1 text-xs sm:text-sm">
              {isFull ? (
                <>🔒 Open play is <span className="font-black">FULL</span> for the next session. Check back for the next date.</>
              ) : (
                <>
                  🏐 Open grass volleyball at Lake Elizabeth Park, Fremont — ages 13+, always free.
                  <Link
                    to="/register?session=Open%20Play"
                    className="ml-2 underline font-black hover:text-cyan-200 transition-colors whitespace-nowrap"
                  >
                    Save Your Spot →
                  </Link>
                </>
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
