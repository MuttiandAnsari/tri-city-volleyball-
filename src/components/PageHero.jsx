import { motion } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94]

export default function PageHero({ label, title, subtitle, watermark, children }) {
  return (
    <section className="relative bg-black overflow-hidden py-20 sm:py-28 border-b border-white/[0.07]">

      {/* Vertical accent line — left edge */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: 'linear-gradient(to bottom, #22d3ee, rgba(59,130,246,0.6), transparent)' }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.9, ease }}
      />

      {/* Ghost watermark */}
      <div className="absolute inset-y-0 right-0 flex items-center overflow-hidden pointer-events-none select-none">
        <motion.span
          className="font-black text-white/[0.03] leading-none tracking-tighter pr-6"
          style={{ fontSize: 'clamp(7rem, 18vw, 14rem)' }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          {watermark}
        </motion.span>
      </div>

      {/* Subtle atmospheric glow */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-8">
        {label && (
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <div className="w-5 h-px bg-cyan-400" />
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">{label}</span>
          </motion.div>
        )}

        <div
          className="font-black text-white leading-[0.9] mb-6 tracking-tight"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          {typeof title === 'string' ? (
            title.split(' ').map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-3 last:mr-0">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.08, ease }}
                >
                  {word}
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
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            <div className="w-10 h-px bg-white/20 mb-5" />
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">{subtitle}</p>
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}
