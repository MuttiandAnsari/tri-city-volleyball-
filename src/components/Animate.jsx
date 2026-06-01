import { motion } from 'framer-motion'

const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

// On mobile: skip all scroll animations — render children immediately.
// whileInView fires JS mid-scroll and causes stutter on mobile.
function PassThrough({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

const ease = [0.25, 0.46, 0.45, 0.94]

export function FadeUp({ children, delay = 0, duration = 0.6, className = '' }) {
  if (isTouch) return <PassThrough className={className}>{children}</PassThrough>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function FadeIn({ children, delay = 0, duration = 0.5, className = '' }) {
  if (isTouch) return <PassThrough className={className}>{children}</PassThrough>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  )
}

export function SlideIn({ children, from = 'left', delay = 0, className = '' }) {
  if (isTouch) return <PassThrough className={className}>{children}</PassThrough>
  const x = from === 'left' ? -64 : from === 'right' ? 64 : 0
  const y = from === 'bottom' ? 48 : 0
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({ children, delay = 0, className = '' }) {
  if (isTouch) return <PassThrough className={className}>{children}</PassThrough>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

const staggerContainer = {
  hidden: {},
  visible: (stagger) => ({ transition: { staggerChildren: stagger ?? 0.1 } }),
}
const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export function StaggerList({ children, className = '', stagger = 0.1, margin = '-80px' }) {
  if (isTouch) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      custom={stagger}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  if (isTouch) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  )
}

export function BlurIn({ children, delay = 0, duration = 0.7, className = '' }) {
  if (isTouch) return <PassThrough className={className}>{children}</PassThrough>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(14px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function ClipReveal({ children, delay = 0, className = '' }) {
  if (isTouch) return <div className={className}>{children}</div>
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, delay, ease }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function TextReveal({ text, className = '', delay = 0, as: Tag = 'span' }) {
  if (isTouch) return <Tag className={className}>{text}</Tag>
  const words = String(text).split(' ')
  const MotionTag = motion[Tag] ?? motion.span
  return (
    <MotionTag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-tight">
          <motion.span
            className="inline-block"
            initial={{ y: '105%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: delay + i * 0.07, ease }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
