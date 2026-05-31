import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FocusBorder({ children, className = '', color = 'cyan', radius = 12 }) {
  const [focused, setFocused] = useState(false)
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const ref = useRef(null)

  const colors = {
    cyan:  { stroke: '#22d3ee', glow: 'rgba(34,211,238,0.35)',  grad: ['#22d3ee', '#3b82f6'] },
    blue:  { stroke: '#3b82f6', glow: 'rgba(59,130,246,0.35)',  grad: ['#3b82f6', '#6366f1'] },
    green: { stroke: '#10b981', glow: 'rgba(16,185,129,0.35)',  grad: ['#10b981', '#22d3ee'] },
  }
  const c = colors[color] || colors.cyan

  useEffect(() => {
    if (!ref.current) return
    const obs = new ResizeObserver(([entry]) => {
      setDims({ w: entry.contentRect.width, h: entry.contentRect.height })
    })
    obs.observe(ref.current)
    setDims({ w: ref.current.offsetWidth, h: ref.current.offsetHeight })
    return () => obs.disconnect()
  }, [])

  const id = `fg-${color}-${radius}`
  const glowId = `glow-${color}`

  // Perimeter for stroke-dasharray
  const perimeter = dims.w && dims.h
    ? 2 * (dims.w + dims.h) - 8 * radius + 2 * Math.PI * radius
    : 9999

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}

      {/* SVG border overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        style={{ zIndex: 10 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c.grad[0]} />
            <stop offset="100%" stopColor={c.grad[1]} />
          </linearGradient>
          <filter id={glowId} x="-10%" y="-20%" width="120%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <AnimatePresence>
          {focused && dims.w > 0 && (
            <>
              {/* Glow layer */}
              <motion.rect
                key="glow"
                x="1"
                y="1"
                width={dims.w - 2}
                height={dims.h - 2}
                rx={radius}
                ry={radius}
                fill="none"
                stroke={c.glow}
                strokeWidth="6"
                filter={`url(#${glowId})`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
              {/* Drawing border */}
              <motion.rect
                key="border"
                x="1"
                y="1"
                width={dims.w - 2}
                height={dims.h - 2}
                rx={radius}
                ry={radius}
                fill="none"
                stroke={`url(#${id})`}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray={perimeter}
                initial={{ strokeDashoffset: perimeter, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                exit={{ strokeDashoffset: perimeter, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </>
          )}
        </AnimatePresence>
      </svg>
    </div>
  )
}
