import { motion } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94]

export default function PageHero({ label, title, subtitle, watermark, children }) {
  return (
    <section className="relative bg-slate-900 overflow-hidden py-20 sm:py-24">
      {/* Animated left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease }}
      />

      {/* Animated ghost watermark */}
      <div className="absolute inset-y-0 right-0 flex items-center overflow-hidden pointer-events-none select-none">
        <motion.span
          className="text-[9rem] sm:text-[13rem] font-black text-white/[0.035] leading-none tracking-tighter pr-6"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          {watermark}
        </motion.span>
      </div>

      {/* Glow */}
      <motion.div
        className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-blue-700/20 blur-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.12) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />


      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-8">
        {label && (
          <motion.span
            className="inline-block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            {label}
          </motion.span>
        )}

        <div className="text-5xl sm:text-6xl font-black text-white leading-tight mb-4">
          {typeof title === 'string' ? (
            title.split(' ').map((word, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.08, ease }}
                >
                  {word}{' '}
                </motion.span>
              </span>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              {title}
            </motion.div>
          )}
        </div>

        {subtitle && (
          <motion.p
            className="text-slate-400 text-lg max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  )
}
