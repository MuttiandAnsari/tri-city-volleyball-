import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MAPS_URL = 'https://www.google.com/maps?q=37.5449580,-121.9625977'
const SESSION_KEY = 'location-toast-seen'

export default function LocationToast() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    // Small delay so it doesn't fire instantly on load
    const show = setTimeout(() => setVisible(true), 1800)
    return () => clearTimeout(show)
  }, [])

  useEffect(() => {
    if (!visible) return
    const hide = setTimeout(() => dismiss(), 8000)
    return () => clearTimeout(hide)
  }, [visible])

  function dismiss() {
    sessionStorage.setItem(SESSION_KEY, '1')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-5 right-5 z-[100] max-w-xs w-full"
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Progress bar auto-dismiss */}
            <motion.div
              className="h-0.5 bg-cyan-500 origin-left"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 8, ease: 'linear' }}
            />

            <div className="p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-0.5">Practice Location</p>
                    <p className="text-white font-black text-sm leading-tight">Lake Elizabeth Park</p>
                    <p className="text-slate-400 text-xs font-medium">Fremont, CA · June 14</p>
                  </div>
                </div>
                <button
                  onClick={dismiss}
                  className="text-slate-500 hover:text-white transition-colors mt-0.5 shrink-0"
                  aria-label="Dismiss"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={dismiss}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-black text-xs rounded-xl transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
