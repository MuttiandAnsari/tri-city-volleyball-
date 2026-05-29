import { useRef } from 'react'

export default function CursorGlow({ children, color = 'rgba(6,182,212,0.07)', size = 600 }) {
  const ref = useRef(null)

  function handleMouseMove(e) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ref.current.style.setProperty('--x', `${x}px`)
    ref.current.style.setProperty('--y', `${y}px`)
  }

  return (
    <div
      ref={ref}
      className="relative group/glow"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover/glow:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(${size}px circle at var(--x, -9999px) var(--y, -9999px), ${color}, transparent 40%)`,
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}
