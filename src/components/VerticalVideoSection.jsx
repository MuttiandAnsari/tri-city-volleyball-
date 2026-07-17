import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94]

export default function VerticalVideoSection({ src, poster, title = 'Watch Us Play', subtitle = 'See the energy from our latest open play sessions.' }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  function toggle() {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setPlaying(true)
    } else {
      videoRef.current.pause()
      setPlaying(false)
    }
  }

  return (
    <section className="relative bg-slate-950 py-24 overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-40" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-14">

          {/* Text side */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-5">Highlights</span>
            <h2 className="text-5xl font-black text-white mb-5 text-glow-cyan" style={{ fontFamily: "'Outfit', sans-serif" }}>{title}</h2>
            <p className="text-slate-400 max-w-md mx-auto lg:mx-0 leading-relaxed">{subtitle}</p>
          </motion.div>

          {/* Phone frame */}
          <motion.div
            className="shrink-0 w-64 sm:w-72"
            initial={{ opacity: 0, x: 32, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <motion.div
              className="phone-frame cursor-pointer select-none"
              style={{ aspectRatio: '9/16' }}
              onClick={toggle}
              whileTap={{ scale: 0.98 }}
            >
              <video
                ref={videoRef}
                src={src}
                poster={poster}
                loop
                playsInline
                muted
                className="w-full h-full object-cover"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />
              {/* Play/pause overlay */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ opacity: playing ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                style={{ background: 'rgba(0,0,0,0.35)' }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '2px solid rgba(255,255,255,0.4)',
                    animation: 'play-pulse 2s ease-in-out infinite',
                  }}
                >
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
