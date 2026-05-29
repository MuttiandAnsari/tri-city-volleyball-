import { useId } from 'react'
import { motion } from 'framer-motion'

export default function VolleyballSVG({
  size = 80,
  color = 'currentColor',
  opacity = 1,
  spin = false,
  float = false,
  className = '',
}) {
  const id = useId()
  const clipId = `vb-clip-${id.replace(/:/g, '')}`

  const floatAnim = float ? { y: [0, -14, 0], rotate: [0, 8, -8, 0] } : {}
  const floatTrans = float ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : {}
  const spinAnim = spin ? { rotate: 360 } : {}
  const spinTrans = spin ? { duration: 18, repeat: Infinity, ease: 'linear' } : {}

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="2.8"
      strokeLinecap="round"
      className={className}
      style={{ opacity }}
      animate={{ ...floatAnim, ...spinAnim }}
      transition={spin ? spinTrans : floatTrans}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="50" cy="50" r="44" />
        </clipPath>
      </defs>

      {/* Outer circle */}
      <circle cx="50" cy="50" r="46" />

      {/* Three S-curve seams rotated 120° apart — real volleyball panel pattern */}
      <g clipPath={`url(#${clipId})`}>
        <path d="M 50 4 C 15 22 85 78 50 96" />
        <path d="M 50 4 C 15 22 85 78 50 96" transform="rotate(120 50 50)" />
        <path d="M 50 4 C 15 22 85 78 50 96" transform="rotate(240 50 50)" />
      </g>
    </motion.svg>
  )
}
