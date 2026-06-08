import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, animate, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
import logo from '../assets/logo.png'
import photoViraj from '../assets/viraj.jpg'
import photoNoah from '../assets/noah.jpg'
import photoAyaan from '../assets/ayaan.jpg'
import photoFarhaan from '../assets/farhaan.jpg'
import { FadeUp, SlideIn, StaggerList, StaggerItem, BlurIn } from '../components/Animate'
import Marquee from '../components/Marquee'
import CursorGlow from '../components/CursorGlow'
import Tilt from '../components/Tilt'
import MagneticButton from '../components/MagneticButton'
import Reviews from '../components/Reviews'
import VerticalVideoSection from '../components/VerticalVideoSection'

const heroVideo = '/hero.mp4'
const ease = [0.25, 0.46, 0.45, 0.94]


const statItems = [
  { number: 'K–12', display: 'K–12', label: 'All Grade Levels', color: 'text-cyan-400', numeric: false },
  { number: 3, display: '3', label: 'Bay Area Locations', color: 'text-blue-400', numeric: true },
  { number: 4, display: '4', label: 'Dedicated Coaches', color: 'text-indigo-400', numeric: true },
  { number: 100, display: '100%', label: 'Youth-Led Program', color: 'text-sky-400', numeric: true, suffix: '%' },
]

const features = [
  { icon: '🏐', title: 'Skill-First Coaching', description: 'Fundamentals, footwork, and game IQ. Sessions structured to build complete players from day one.', accent: 'from-blue-500 to-cyan-400' },
  { icon: '🤝', title: 'Peer-Led Community', description: 'Coached by high schoolers who know the grind, creating a relatable and motivating environment.', accent: 'from-indigo-500 to-blue-400' },
  { icon: '📍', title: 'Local & Accessible', description: 'Clinics at Lake Elizabeth (Fremont) and Willow Park (Union City), with tournaments at Fallon\'s Park in Dublin. All Bay Area convenient.', accent: 'from-cyan-500 to-sky-400' },
  { icon: '🏆', title: 'Tournament Play', description: 'Regular tournaments give athletes real competitive experience beyond practice.', accent: 'from-sky-500 to-blue-400' },
  { icon: '🌟', title: 'All Ages Welcome', description: 'From kindergartners learning their first serve to seniors refining their game.', accent: 'from-blue-500 to-indigo-400' },
  { icon: '📈', title: 'Player Development', description: 'Individualized feedback and structured progression so every player keeps leveling up.', accent: 'from-indigo-500 to-cyan-400' },
]

const coaches = [
  { name: 'Viraj Mutti', role: 'Co-Founder & Coach', description: 'Viraj plays on the James Logan High School volleyball team and has also played at Lakas and UVA. He focuses on setting and receiving and helps with other aspects of the game as well.', photo: photoViraj, photoPosition: 'center 30%', ring: 'ring-blue-400' },
  { name: 'Farhaan Ansari', role: 'Co-Founder & Coach', description: 'Farhaan plays outside/opposite hitter on the American High School volleyball team. He specializes in setting and receiving while also being knowledgeable in other aspects of the game.', photo: photoFarhaan, photoPosition: 'center 15%', ring: 'ring-indigo-400' },
  { name: 'Noah Lukose', role: 'Co-Founder & Coach', description: 'Noah is a middle blocker on the James Logan Volleyball team and has also played at UVA and Lakas. He specializes in blocking and hitting.', photo: photoNoah, photoPosition: 'center 45%', ring: 'ring-sky-400' },
  { name: 'Ayaan Shansab', role: 'Co-Founder & Coach', description: 'Ayaan plays on the Campolindo High School varsity boys volleyball team as an opposite hitter. He can assist newcomers with the fundamentals of hitting and blocking.', photo: photoAyaan, photoPosition: 'center 20%', ring: 'ring-cyan-400' },
]


const steps = [
  { num: '01', title: 'Sign Up', icon: '✍️', description: 'Browse our clinics, pick your level, and register in minutes. No experience required. We\'ll place you in the right group.' },
  { num: '02', title: 'Train Hard', icon: '💪', description: 'Show up, work hard, and learn from coaches who\'ve been in your shoes. Every session builds on the last.' },
  { num: '03', title: 'Compete', icon: '🏆', description: 'Put your skills to the test. Face real competition in our tournaments and see exactly how far you\'ve come.' },
]

const homeFaqs = [
  { q: 'How much does it cost?', a: 'Your first session is completely free, no commitment needed. After that, Beginner clinics (K–4) are $10/session and Intermediate & Advanced are $15/session.' },
  { q: 'What should my child bring?', a: 'Athletic shoes, a water bottle, and a competitive attitude. We provide all the volleyballs.' },
  { q: 'What happens at the first free session?', a: 'Coaches introduce themselves, group kids by skill level, run fun drills, and make sure every athlete feels welcome. Zero pressure. Just come out and play!' },
  { q: 'How do I pick the right level?', a: 'Beginner (K–4) is for kids brand new to the sport. Intermediate (grades 5–7) is for players with at least a season of experience. Advanced (ages 18–22) is for competitive players. Still unsure? Text us at (341) 777-8673.' },
  { q: 'Is this for boys and girls?', a: 'Yes! All clinics are open to every athlete regardless of gender.' },
  { q: 'When and where is the next clinic?', a: 'Our next clinic is June 14, 2026 at Lake Elizabeth Park, Fremont. Beginner runs 12–1 PM, Intermediate 1:30–3 PM, and Advanced 3:30–5 PM. Future clinics will also be held at Willow Park in Union City and Fallon\'s Park in Dublin.' },
]

function HomeFaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        className="w-full py-5 flex justify-between items-center text-left gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">{q}</span>
        <motion.div
          className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0"
          animate={{ backgroundColor: open ? '#0891b2' : 'rgba(6,182,212,0.15)' }}
          transition={{ duration: 0.2 }}
        >
          <motion.svg
            className="w-3.5 h-3.5"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
            animate={{ rotate: open ? 45 : 0, color: open ? '#ffffff' : '#22d3ee' }}
            transition={{ duration: 0.25 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </motion.svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.p
            className="text-slate-400 text-sm leading-relaxed pb-5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease }}
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function AnimatedStat({ number, label, color, numeric, suffix = '', index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(isTouch ? number : 0)

  useEffect(() => {
    // Skip counter animation on mobile — rapid setState calls cause scroll jank
    if (isTouch || !isInView || !numeric) return
    const controls = animate(0, number, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return controls.stop
  }, [isInView, number, numeric])

  if (isTouch) {
    return (
      <div className="text-center px-4">
        <div className={`text-5xl font-black ${color} mb-1 tracking-tight tabular-nums whitespace-nowrap`}>
          {numeric ? number + suffix : label === 'All Grade Levels' ? 'K–12' : number}
        </div>
        <div className="text-slate-400 text-sm font-medium">{label}</div>
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className="text-center px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease }}
    >
      <div className={`text-5xl font-black ${color} mb-1 tracking-tight tabular-nums whitespace-nowrap`}>
        {numeric ? count + suffix : label === 'All Grade Levels' ? 'K–12' : number}
      </div>
      <div className="text-slate-400 text-sm font-medium">{label}</div>
    </motion.div>
  )
}

function FeatureCard({ icon, title, description, accent, index }) {
  if (isTouch) return (
    <div className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 glow-card">
      <div className={`h-1 w-full bg-gradient-to-r ${accent}`} />
      <div className="p-6">
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-2xl">{icon}</div>
        <h3 className="font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
  return (
    <motion.div
      className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 glow-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease }}
      whileHover={{ y: -6 }}
    >
      <div className={`h-1 w-full bg-gradient-to-r ${accent}`} />
      <div className="p-6">
        <motion.div
          className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-2xl"
          whileHover={{ scale: 1.12, rotate: 6 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {icon}
        </motion.div>
        <h3 className="font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

function CoachCard({ name, role, description, photo, photoPosition, ring, index }) {
  if (isTouch) return (
    <div className="group gradient-border bg-white/5 rounded-2xl p-6 text-center glow-card">
      <div className={`w-32 h-32 rounded-full mx-auto mb-5 ring-2 ${ring} ring-opacity-60 overflow-hidden`} style={{ boxShadow: '0 0 24px rgba(6,182,212,0.2)' }}>
        <img src={photo} alt={name} className="w-full h-full object-cover" style={{ objectPosition: photoPosition }} />
      </div>
      <h3 className="font-black text-white text-lg mb-1">{name}</h3>
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">{role}</p>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
  return (
    <motion.div
      className="group gradient-border bg-white/5 rounded-2xl p-6 text-center glow-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.07, ease }}
      whileHover={{ y: -8 }}
    >
      <motion.div
        className={`w-32 h-32 rounded-full mx-auto mb-5 ring-2 ${ring} ring-opacity-60 overflow-hidden`}
        whileHover={{ scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ boxShadow: '0 0 24px rgba(6,182,212,0.2)' }}
      >
        <img src={photo} alt={name} className="w-full h-full object-cover" style={{ objectPosition: photoPosition }} />
      </motion.div>
      <h3 className="font-black text-white text-lg mb-1">{name}</h3>
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">{role}</p>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const heroOverlayOpacityTransform = useTransform(scrollY, [0, 600], [0.42, 0.75])
  // On mobile: static value only — no scroll-linked DOM updates
  const heroOverlayOpacity = isTouch ? 0.55 : heroOverlayOpacityTransform

  const videoRef = useRef(null)
  const [showTapToPlay, setShowTapToPlay] = useState(false)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (isMobile) setShowTapToPlay(true)
      })
    }
  }, [])

  const handleTapToPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
    setShowTapToPlay(false)
  }


  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative text-white"
        style={{ width: '100%', minHeight: '100svh' }}
      >
        {/* Full-bleed video — 100vw × 100vh, no gaps */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Tap to Play overlay — mobile only, shown when autoplay is blocked */}
        <AnimatePresence>
          {showTapToPlay && (
            <motion.button
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 md:hidden"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleTapToPlay}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)', animation: 'play-pulse 2s ease-in-out infinite' }}
              >
                <svg className="w-9 h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-white text-lg font-semibold tracking-wide" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
                Tap to Play
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scroll-deepening dark overlay */}
        <motion.div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgb(10,20,40)', opacity: heroOverlayOpacity, willChange: 'opacity' }} />



        <motion.div
          className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[100svh] flex flex-col items-center justify-center text-center py-24"
          style={{ willChange: 'auto' }}
        >
          <motion.div className="relative mb-8" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}>
            {/* Ambient glow behind logo */}
            <motion.div
              className="absolute inset-0 bg-cyan-400 blur-[80px] opacity-25 scale-150 pointer-events-none"
              animate={{ opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src={logo}
              alt="Tri-City VB Logo"
              className="relative h-72 w-auto brightness-0 invert"
              style={{ filter: 'brightness(0) invert(1) drop-shadow(0 8px 32px rgba(6,182,212,0.5)) drop-shadow(0 2px 8px rgba(255,255,255,0.3))' }}
              whileHover={{ scale: 1.08, y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            />
          </motion.div>

          <motion.div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm font-medium text-cyan-200" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45, ease }}>
            <span className="w-2 h-2 rounded-full bg-cyan-400 pulse-dot" />
            Fremont, Union City & Dublin, CA · Est. 2026
          </motion.div>

          <div className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <span className="inline-block overflow-hidden">
              <motion.span className="inline-block text-white" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.7, delay: 0.5, ease }}>
                Tri-City
              </motion.span>
            </span>
            <br />
            {['Volleyball', 'Academy'].map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-3 last:mr-0">
                <motion.span
                  className="inline-block text-gradient"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.65 + i * 0.12, ease }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          <motion.p className="text-lg sm:text-xl text-blue-100 max-w-2xl mb-10 leading-relaxed" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.95, ease }}>
            A youth K–12 volleyball program built by players, for players. Grow your skills, compete hard, and love the game.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1, ease }}>
            <MagneticButton>
              <Link to="/clinics" className="block px-9 py-3.5 bg-white text-blue-800 font-extrabold rounded-2xl shadow-xl hover:bg-cyan-50 transition-colors">View Clinics</Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/register" className="block px-9 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-extrabold rounded-2xl hover:bg-white/20 transition-colors">Register Now</Link>
            </MagneticButton>
          </motion.div>

          <motion.div
            className="mt-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-cyan-400/40 rounded-2xl px-5 py-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.3, ease }}
          >
            <span className="text-lg">🎉</span>
            <p className="text-white font-black text-sm sm:text-base tracking-tight">
              First session is <span className="text-cyan-300 underline decoration-wavy decoration-cyan-400/70">completely FREE</span> for every athlete!
            </p>
          </motion.div>
        </motion.div>

        {/* Bouncing scroll-down indicator */}
        <motion.button
          className="absolute bottom-8 left-1/2 flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors duration-300 cursor-pointer z-10"
          style={{ translateX: '-50%' }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          aria-label="Scroll down"
        >
          <div style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </motion.button>
      </section>

      {/* ── Stats ── */}
      <section className="-mt-8 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl border border-white/10 py-8 px-6 glow-card">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-0 md:divide-x divide-gray-100">
              {statItems.map((s, i) => <AnimatedStat key={s.label} {...s} index={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="mt-12">
        <Marquee />
      </div>

      {/* ── Why section ── */}
      <section className="relative bg-slate-900 pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-pattern pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">Why Choose Us</span>
            <h2 className="text-5xl font-black text-white mb-4 text-glow-cyan" style={{ fontFamily: "'Outfit', sans-serif" }}>Built Different.</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Competitive training meets a supportive community. Every athlete gets the tools to reach their potential.</p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Tilt key={f.title} intensity={7}>
                <FeatureCard {...f} index={i} />
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <CursorGlow color="rgba(6,182,212,0.06)">
        <section className="relative bg-slate-950 py-24 overflow-hidden">
          <div className="absolute inset-0 dot-pattern pointer-events-none opacity-60" />
          <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full bg-blue-700/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp className="text-center mb-16">
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-4">The Journey</span>
              <h2 className="text-5xl font-black text-white mb-4 text-glow-cyan" style={{ fontFamily: "'Outfit', sans-serif" }}>How It Works</h2>
              <p className="text-slate-400 max-w-xl mx-auto">From signing up to stepping onto the court, here's what to expect.</p>
            </FadeUp>

            <div className="relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-12 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  style={{ originX: 0 }}
                  transition={{ duration: 1.2, delay: 0.4, ease }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map(({ num, title, icon, description }, i) => (
                  <motion.div
                    key={num}
                    className="relative text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease }}
                  >
                    {/* Step circle */}
                    <motion.div
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex flex-col items-center justify-center mx-auto mb-6 relative z-10 shadow-xl shadow-blue-900/40"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    >
                      <span className="text-2xl">{icon}</span>
                      <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">{num}</span>
                    </motion.div>
                    <h3 className="text-xl font-black text-white mb-3">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">{description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <FadeUp className="text-center mt-14">
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link to="/clinics" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black rounded-2xl shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40 transition-all">
                  Find Your Clinic
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </motion.div>
            </FadeUp>
          </div>
        </section>
      </CursorGlow>

      {/* ── Reverse marquee ── */}
      <Marquee bg="bg-slate-950" textColor="text-slate-500" accentColor="text-slate-700" reverse />

      {/* ── Coaches ── */}
      <CursorGlow color="rgba(99,102,241,0.07)">
        <section className="relative bg-slate-900 py-24 overflow-hidden">
          <div className="absolute inset-0 grid-pattern pointer-events-none opacity-50" />
            <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-indigo-700/10 blur-3xl pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp className="text-center mb-14">
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-4">The Team</span>
              <div className="flex items-center justify-center gap-3 mb-4">
                <h2 className="text-5xl font-black text-white text-glow-cyan" style={{ fontFamily: "'Outfit', sans-serif" }}>Meet the Coaches</h2>
              </div>
              <p className="text-slate-400 max-w-xl mx-auto mb-5">Four high school athletes passionate about giving back to the game they love.</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  2 Coaches: USA Volleyball 16U Nationals Qualified
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-4-3h8"/></svg>
                  All Active High School Athletes
                </span>
              </div>
            </FadeUp>
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0 lg:mx-0 lg:px-0">
              {coaches.map((c, i) => (
                <div key={c.name} className="snap-center shrink-0 w-72 lg:w-auto">
                  <CoachCard {...c} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </CursorGlow>

      {/* ── Pricing ── */}
      <section className="relative bg-slate-950 py-24 overflow-hidden">
        <div className="absolute inset-0 dot-pattern pointer-events-none opacity-40" />
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/8 blur-3xl rounded-full pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">Simple Pricing</span>
            <h2 className="text-5xl font-black text-white mb-3 text-glow-cyan" style={{ fontFamily: "'Outfit', sans-serif" }}>Clear. Affordable. Worth It.</h2>
            <p className="text-slate-400 max-w-lg mx-auto">Your first session is always free. After that, pricing stays simple.</p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { level: 'Beginner', grades: 'K–4', price: '$10', per: 'per session', time: '12:00 – 1:00 PM', color: 'from-emerald-500 to-teal-400', ring: 'ring-emerald-500/30', glow: 'rgba(16,185,129,0.15)', features: ['Passing & serving basics', 'Court awareness', 'Zero pressure environment', 'First session FREE'] },
              { level: 'Intermediate', grades: 'Grades 5–7', price: '$15', per: 'per session', time: '1:30 – 3:00 PM', color: 'from-blue-500 to-cyan-400', ring: 'ring-blue-500/30', glow: 'rgba(59,130,246,0.15)', popular: true, features: ['Setting & attacking', 'Defensive positioning', 'Serve receive', 'First session FREE'] },
              { level: 'Advanced', grades: 'Ages 18–22', price: '$15', per: 'per session', time: '3:30 – 5:00 PM', color: 'from-rose-500 to-pink-400', ring: 'ring-rose-500/30', glow: 'rgba(244,63,94,0.15)', features: ['Competitive game strategy', 'Tournament prep', 'Film review', 'First session FREE'] },
            ].map((plan, i) => (
              <motion.div
                key={plan.level}
                className={`relative gradient-border bg-white/5 backdrop-blur-sm rounded-2xl p-7 glow-card ${plan.popular ? 'ring-1 ring-cyan-400/40' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                whileHover={{ y: -6 }}
                style={{ boxShadow: plan.popular ? `0 0 40px ${plan.glow}` : undefined }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">Most Popular</span>
                  </div>
                )}
                <div className={`h-1 w-full bg-gradient-to-r ${plan.color} rounded-full mb-6`} />
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{plan.grades}</p>
                <h3 className="text-xl font-black text-white mb-1">{plan.level}</h3>
                <p className="text-slate-500 text-xs mb-5">{plan.time} · June 14, 2026</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${plan.color}`}>{plan.price}</span>
                  <span className="text-slate-500 text-sm mb-1">{plan.per}</span>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className={`w-4 h-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center shrink-0`}>
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/clinics" className={`block w-full py-3 text-center font-black text-sm rounded-xl text-white bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity`}>
                  Register Free
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">Parent FAQ</span>
            <h2 className="text-5xl font-black text-white mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Common Questions</h2>
            <p className="text-slate-400">Everything families want to know before signing up.</p>
          </FadeUp>
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 px-6 sm:px-10 glow-card">
            {homeFaqs.map((faq, i) => <HomeFaqItem key={faq.q} {...faq} index={i} />)}
          </div>
          <FadeUp className="text-center mt-8">
            <p className="text-slate-400 text-sm">Still have questions? <a href="tel:+13417778673" className="text-cyan-400 font-bold hover:text-cyan-300">Text us at (341) 777-8673</a> and we reply fast.</p>
          </FadeUp>
        </div>
      </section>

      {/* ── Reviews ── */}
      <Reviews />

      {/* ── CTA ── */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 py-24 overflow-hidden clip-hero-bottom-rev">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-cyan-400 opacity-10 blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <FadeUp>
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6">Limited Spots</span>
            <h2 className="text-4xl font-extrabold text-white mb-4">Ready to play?</h2>
            <p className="text-blue-200 mb-10 text-lg">Spots fill up fast. Register for an upcoming clinic or tournament today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <Link to="/clinics" className="block px-9 py-3.5 bg-white text-blue-800 font-extrabold rounded-2xl shadow-xl hover:bg-cyan-50 transition-colors">Browse Clinics</Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/contact" className="block px-9 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-extrabold rounded-2xl hover:bg-white/20 transition-colors">Get in Touch</Link>
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
