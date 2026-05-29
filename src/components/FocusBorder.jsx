import { useState } from 'react'
import { motion } from 'framer-motion'

export default function FocusBorder({ children, className = '' }) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div
      className={`relative rounded-xl ${className}`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {children}
      <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.rect
            x="0.75"
            y="0.75"
            width="98.5"
            height="98.5"
            rx="11"
            fill="none"
            stroke="url(#focus-gradient)"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isFocused ? 1 : 0,
              opacity: isFocused ? 1 : 0,
            }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <defs>
            <linearGradient id="focus-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />   {/* cyan-400 */}
              <stop offset="100%" stopColor="#3b82f6" />  {/* blue-500 */}
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
