import { motion } from 'framer-motion'

const items = [
  'TRAIN', 'COMPETE', 'GROW', 'WIN', 'SERVE', 'SPIKE', 'BLOCK', 'RISE', 'LEAD', 'HUSTLE',
]

export default function Marquee({ bg = 'bg-blue-600', textColor = 'text-white', accentColor = 'text-cyan-300', reverse = false }) {
  const doubled = [...items, ...items]

  return (
    <div className={`${bg} py-3.5 overflow-hidden select-none`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className={`${textColor} font-black text-xs uppercase tracking-[0.2em] mx-5 inline-flex items-center gap-5`}>
            {item}
            <span className={`${accentColor} text-base`}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
