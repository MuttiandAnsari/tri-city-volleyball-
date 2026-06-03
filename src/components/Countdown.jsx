import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TARGET = new Date('2026-06-14T12:00:00')

function getTimeLeft() {
  const diff = TARGET - Date.now()
  if (diff <= 0) return null
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Digit({ value, label, index }) {
  const display = String(value).padStart(2, '0')
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="relative">
        <motion.div
          key={display}
          className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/40"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <span className="text-white font-black text-2xl sm:text-3xl tabular-nums">{display}</span>
        </motion.div>
      </div>
      <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">{label}</span>
    </motion.div>
  )
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!timeLeft) return null

  return (
    <div className="bg-slate-950 border-b border-white/5 py-10 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          First Clinic Starts In
        </motion.p>
        <motion.h3
          className="text-white font-black text-xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          June 14, 2026 · Lake Elizabeth, Fremont
        </motion.h3>
        <div className="flex items-end justify-center gap-3 sm:gap-5">
          <Digit value={timeLeft.days}    label="Days"    index={0} />
          <span className="text-slate-500 font-black text-3xl mb-8 leading-none">:</span>
          <Digit value={timeLeft.hours}   label="Hours"   index={1} />
          <span className="text-slate-500 font-black text-3xl mb-8 leading-none">:</span>
          <Digit value={timeLeft.minutes} label="Minutes" index={2} />
          <span className="text-slate-500 font-black text-3xl mb-8 leading-none">:</span>
          <Digit value={timeLeft.seconds} label="Seconds" index={3} />
        </div>
      </div>
    </div>
  )
}
