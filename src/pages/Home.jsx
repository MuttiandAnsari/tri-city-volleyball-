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

const heroVideo = '/hero.mp4'
const ease = [0.25, 0.46, 0.45, 0.94]

const statItems = [
  { number: '13+', display: '13+', label: 'All Ages Welcome', color: 'text-white', numeric: false },
  { number: 3, display: '3', label: 'Bay Area Grass Courts', color: 'text-cyan-400', numeric: true },
  { number: 0, display: '0', label: 'Cost to Play', color: 'text-white', numeric: true, prefix: '$' },
  { number: 100, display: '100', label: 'Player-Run', color: 'text-cyan-400', numeric: true, suffix: '%' },
]

const features = [
  { num: '01', title: 'Grass, Not Hardwood', description: 'Outdoor grass courts. Softer landings, longer rallies, and you can actually go for the dig. It\'s the version of volleyball people play because they want to, not because a gym was booked.' },
  { num: '02', title: 'No Coaches. No Drills. Just Play.', description: 'Nobody\'s running you through passing lines. You show up, get on a team, and play the game. That\'s the whole thing.' },
  { num: '03', title: 'Lake Elizabeth. Willow Park. Fallon\'s Park.', description: 'Three Bay Area grass sites across Fremont, Union City, and Dublin. We bring the nets and the balls.' },
  { num: '04', title: 'No Tryouts. No Cuts. Show Up.', description: 'Anyone 13 or older is welcome — no upper age limit. Bring a whole crew or come solo, we\'ll get you on a side.' },
  { num: '05', title: 'Real Bracket Tournaments', description: 'When you want the competitive version: pool play into a losers bracket, teams from across the Bay, a full day of volleyball that actually counts.' },
  { num: '06', title: 'Run by People Who Play', description: 'Four of us organize this, and we\'re on the grass every session too. It\'s a pickup community we wanted to exist, so we built it.' },
]

const founders = [
  { name: 'Viraj Mutti', role: 'Organizer', school: 'Middle Blocker', description: 'Plays middle blocker at James Logan High School. Also competed at Lakas and UVA.', photo: photoViraj, photoPosition: 'center 30%' },
  { name: 'Farhaan Ansari', role: 'Organizer', school: 'Outside / Opposite', description: 'Outside and opposite hitter at American High School.', photo: photoFarhaan, photoPosition: 'center 15%' },
  { name: 'Noah Lukose', role: 'Organizer', school: 'Middle Blocker', description: 'Middle blocker at James Logan, also played at UVA and Lakas.', photo: photoNoah, photoPosition: 'center 45%' },
  { name: 'Ayaan Shansab', role: 'Organizer', school: 'Opposite Hitter', description: 'Varsity opposite hitter at Campolindo High School.', photo: photoAyaan, photoPosition: 'center 20%' },
]

const steps = [
  { num: '01', title: 'Sign Up', icon: '✍️', description: 'Tell us you\'re coming so we know how many nets to put up. Takes 60 seconds. No payment, no commitment, no obligation to show.' },
  { num: '02', title: 'Show Up', icon: '🏐', description: 'Come to the grass. Teams get sorted on site, winners rotate in. Come alone and you\'ll be playing within five minutes.' },
  { num: '03', title: 'Compete', icon: '🏆', description: 'Want it to count? Enter a bracket tournament. Pool play, real seeding, teams from across the Bay Area.' },
]

const openPlayFacts = [
  { num: '01', title: 'Free, Always', accent: 'text-emerald-400', points: ['No dues, no drop-in fee', 'No commitment to keep coming back', 'Nets and balls are on us'] },
  { num: '02', title: 'Ages 13+', accent: 'text-cyan-400', points: ['No upper age limit', 'Every skill level plays', 'No tryouts, no cuts'] },
  { num: '03', title: 'On the Grass', accent: 'text-blue-400', points: ['Lake Elizabeth Park, Fremont', 'Teams get sorted on site', 'Winners rotate in'] },
]

const homeFaqs = [
  { q: 'How much does it cost?', a: 'Open play is completely free. No dues, no drop-in fee. Tournaments are ticketed separately — details on each tournament listing.' },
  { q: 'What should I bring?', a: 'Bare feet or turf shoes, a water bottle, and sunscreen. We bring the nets and the balls.' },
  { q: 'Do I need a team?', a: 'Nope. Most people show up alone. Teams get made on site and we rotate winners, so you\'ll play with a bunch of different people.' },
  { q: 'Who can play?', a: 'Anyone 13 or older. There\'s no upper age limit — we have high schoolers and folks well into their forties on the same court.' },
  { q: 'Do I need to be any good?', a: 'No. All levels play. Grass is slower and more forgiving than sand or indoor, so it\'s a genuinely good place to learn.' },
  { q: 'When and where is the next open play?', a: 'The next date is still being locked in — check the Open Play page, or sign up and we\'ll let you know as soon as it\'s set.' },
]

function HomeFaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/[0.08] last:border-0">
      <button
        className="w-full py-5 flex justify-between items-center text-left gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-bold text-white group-hover:text-cyan-400 transition-colors duration-200">{q}</span>
        <motion.span
          className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 text-xl leading-none"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22 }}
        >+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.p
            className="text-slate-400 text-sm leading-relaxed pb-5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function AnimatedStat({ number, display, label, color, numeric, prefix = '', suffix = '', index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(isTouch || !numeric ? display : 0)

  useEffect(() => {
    if (isTouch || !isInView || !numeric) return
    const controls = animate(0, number, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return controls.stop
  }, [isInView, number, numeric])

  return (
    <motion.div
      ref={ref}
      className="px-8 py-10 flex flex-col items-center md:items-start"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.08 * index, ease }}
    >
      <div className={`text-4xl sm:text-5xl font-black ${color} mb-1.5 tabular-nums leading-none tracking-tight`}>
        {numeric ? prefix + count + suffix : display}
      </div>
      <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.16em]">{label}</div>
    </motion.div>
  )
}

function FounderCard({ name, school, description, photo, photoPosition, index }) {
  if (isTouch) return (
    <div className="group">
      <div className="relative overflow-hidden rounded-2xl mb-5" style={{ aspectRatio: '3/4' }}>
        <img src={photo} alt={name} className="w-full h-full object-cover" style={{ objectPosition: photoPosition }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-white font-black text-xl leading-tight mb-1">{name}</p>
          <p className="text-cyan-400 text-[11px] font-bold uppercase tracking-widest">{school}</p>
        </div>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
    >
      <div className="relative overflow-hidden rounded-2xl mb-5" style={{ aspectRatio: '3/4' }}>
        <motion.img
          src={photo}
          alt={name}
          className="w-full h-full object-cover"
          style={{ objectPosition: photoPosition }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.04 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-white font-black text-xl leading-tight mb-1">{name}</p>
          <p className="text-cyan-400 text-[11px] font-bold uppercase tracking-widest">{school}</p>
        </div>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const heroOverlayOpacityTransform = useTransform(scrollY, [0, 600], [0.42, 0.75])
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
    if (videoRef.current) videoRef.current.play().catch(() => {})
    setShowTapToPlay(false)
  }

  return (
    <>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative text-white" style={{ width: '100%', minHeight: '100svh' }}>
        <video
          ref={videoRef}
          autoPlay loop muted playsInline preload="auto"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <AnimatePresence>
          {showTapToPlay && (
            <motion.button
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 md:hidden"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }} onClick={handleTapToPlay}
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)', animation: 'play-pulse 2s ease-in-out infinite' }}>
                <svg className="w-9 h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <span className="text-white text-lg font-semibold tracking-wide" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>Tap to Play</span>
            </motion.button>
          )}
        </AnimatePresence>

        <motion.div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgb(10,20,40)', opacity: heroOverlayOpacity, willChange: 'opacity' }} />

        <motion.div
          className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[100svh] flex flex-col items-center justify-center text-center py-24"
          style={{ willChange: 'auto' }}
        >
          <motion.div className="relative mb-8" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}>
            <motion.div
              className="absolute inset-0 bg-cyan-400 blur-[80px] opacity-25 scale-150 pointer-events-none"
              animate={{ opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src={logo} alt="Tri-City VB Logo"
              className="relative h-72 w-auto"
              style={{ filter: 'brightness(0) invert(1) drop-shadow(0 8px 32px rgba(6,182,212,0.5)) drop-shadow(0 2px 8px rgba(255,255,255,0.3))' }}
              whileHover={{ scale: 1.06, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            />
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-2.5 border border-white/20 rounded-full px-4 py-1.5 mb-7 text-sm font-medium text-cyan-200"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-dot" />
            Fremont · Union City · Dublin, CA — Est. 2026
          </motion.div>

          <div className="text-6xl sm:text-7xl lg:text-[88px] font-black leading-[0.9] mb-7 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <span className="inline-block overflow-hidden">
              <motion.span className="inline-block text-white" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.7, delay: 0.5, ease }}>
                Tri-City
              </motion.span>
            </span>
            <br />
            {['Grass', 'Volleyball'].map((word, i) => (
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

          <motion.p
            className="text-lg sm:text-xl text-blue-100/90 max-w-xl mb-10 leading-relaxed font-medium"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease }}
          >
            Open play on the grass and real bracket tournaments across the Bay Area. Ages 13+, all levels, no tryouts. Show up and play.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease }}
          >
            <MagneticButton>
              <Link to="/open-play" className="block px-9 py-3.5 bg-white text-blue-900 font-black rounded-2xl shadow-xl hover:bg-cyan-50 transition-colors tracking-tight">
                Open Play
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/tournaments" className="block px-9 py-3.5 border border-white/30 text-white font-black rounded-2xl hover:bg-white/10 transition-colors tracking-tight" style={{ background: 'rgba(255,255,255,0.07)' }}>
                Tournaments
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.div
            className="mt-7 flex items-center gap-2.5 border border-cyan-400/30 rounded-xl px-5 py-3"
            style={{ background: 'rgba(6,182,212,0.07)' }}
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.3, ease }}
          >
            <span className="text-lg">🎉</span>
            <p className="text-white font-black text-sm sm:text-base">
              Open play is <span className="text-cyan-300 underline decoration-wavy decoration-cyan-400/60">completely free</span> — always
            </p>
          </motion.div>
        </motion.div>

        <motion.button
          className="absolute bottom-8 left-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors duration-300 cursor-pointer z-10"
          style={{ translateX: '-50%' }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          aria-label="Scroll down"
        >
          <div style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </motion.button>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-black border-y border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.07]">
            {statItems.map((s, i) => (
              <AnimatedStat key={s.label} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <Marquee />

      {/* ── Why section — editorial numbered list ── */}
      <CursorGlow color="rgba(6,182,212,0.04)">
        <section className="relative bg-[#060d1e] py-24 overflow-hidden">
          <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-28">

              {/* Left — section header */}
              <FadeUp className="lg:w-80 shrink-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-cyan-400" />
                  <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">Why Tri-City</span>
                </div>
                <h2 className="text-6xl font-black text-white leading-[0.92] mb-6 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  What We<br />Stand For.
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  Not a club. Not a league. Not a training program. Just good volleyball on grass, open to anyone 13 or older.
                </p>
                <motion.div className="mt-10" whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Link to="/open-play" className="inline-flex items-center gap-2 text-white font-black text-sm border-b border-white/20 hover:border-cyan-400 hover:text-cyan-400 transition-colors pb-0.5">
                    See open play
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </motion.div>
              </FadeUp>

              {/* Right — numbered list */}
              <div className="flex-1 divide-y divide-white/[0.08]">
                {features.map((f, i) => (
                  <motion.div
                    key={f.num}
                    className="py-7 flex gap-6 group cursor-default"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: i * 0.06, ease }}
                  >
                    <span className="text-4xl font-black text-white/[0.07] shrink-0 w-10 leading-tight tabular-nums group-hover:text-cyan-400/25 transition-colors duration-300">
                      {f.num}
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-white mb-2 group-hover:text-cyan-300 transition-colors duration-200 leading-snug">{f.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </CursorGlow>

      {/* ── How It Works ── */}
      <section className="relative bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 dot-pattern pointer-events-none opacity-50" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-700/8 blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="border-b border-white/[0.07] py-16 sm:py-20">
            <FadeUp className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-px bg-cyan-400" />
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">The Process</span>
              </div>
              <h2 className="text-6xl font-black text-white leading-[0.92] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                How It Works
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.07] border border-white/[0.07]">
              {steps.map(({ num, title, icon, description }, i) => (
                <motion.div
                  key={num}
                  className="relative p-8 sm:p-10 group overflow-hidden"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.12, ease }}
                >
                  <div className="absolute -right-3 -bottom-4 text-[9rem] font-black text-white/[0.035] leading-none pointer-events-none select-none group-hover:text-white/[0.055] transition-colors duration-500">{num}</div>
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mb-7 text-xl shadow-lg shadow-blue-900/30">
                      {icon}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <FadeUp className="mt-10 flex justify-start">
              <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Link to="/open-play" className="inline-flex items-center gap-2 text-white font-black text-sm border-b border-white/20 hover:border-cyan-400 hover:text-cyan-400 transition-colors pb-0.5">
                  Get on the grass
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Reverse marquee ── */}
      <Marquee bg="bg-slate-950" textColor="text-slate-500" accentColor="text-slate-700" reverse />

      {/* ── Founders ── */}
      <CursorGlow color="rgba(99,102,241,0.05)">
        <section className="relative bg-[#060d1e] py-24 overflow-hidden">
          <div className="absolute inset-0 grid-pattern pointer-events-none opacity-30" />
          <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-indigo-700/8 blur-3xl pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-px bg-cyan-400" />
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">Who Runs It</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                <h2 className="text-6xl font-black text-white leading-[0.92] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Meet the<br />Organizers.
                </h2>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[11px] font-bold uppercase tracking-wider">
                    We're on the grass too
                  </span>
                </div>
              </div>
            </FadeUp>

            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0 lg:mx-0 lg:px-0">
              {founders.map((f, i) => (
                <div key={f.name} className="snap-center shrink-0 w-64 sm:w-72 lg:w-auto">
                  <FounderCard {...f} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </CursorGlow>

      {/* ── Open Play ── */}
      <section className="relative bg-black overflow-hidden">
        {/* Ghost text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
          <span className="text-[22vw] font-black text-white/[0.02] leading-none whitespace-nowrap">GRASS</span>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <FadeUp className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px bg-cyan-400" />
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">Next Open Play</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <h2 className="text-7xl sm:text-8xl font-black text-white leading-[0.88] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Date TBD<span className="text-white/20">.</span>
                </h2>
                <h2 className="text-3xl sm:text-4xl font-black text-white/30 leading-none tracking-tight mt-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Sign up and hear it first.</h2>
              </div>
              <div className="sm:text-right pb-2">
                <p className="text-slate-300 font-bold text-lg">Lake Elizabeth Park</p>
                <p className="text-slate-500 text-sm">Fremont, CA · Ages 13+ · Always free</p>
              </div>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
            {openPlayFacts.map((f, i) => (
              <motion.div
                key={f.title}
                className="relative bg-black p-8 sm:p-10 group hover:bg-white/[0.03] transition-colors duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
              >
                <div className="absolute -right-3 -bottom-6 text-[9rem] font-black text-white/[0.03] leading-none pointer-events-none select-none">{f.num}</div>
                <div className="relative">
                  <p className="text-slate-600 text-xs font-black font-mono mb-6 tracking-wider">{f.num}</p>
                  <h3 className={`text-3xl font-black tracking-tight mb-6 ${f.accent}`}>{f.title}</h3>
                  <ul className="space-y-2.5">
                    {f.points.map(p => (
                      <li key={p} className="text-slate-400 text-sm flex items-center gap-2.5">
                        <span className="w-1 h-1 rounded-full bg-cyan-500/50 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <FadeUp className="mt-10">
            <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }} className="inline-block">
              <Link
                to="/register?session=Open%20Play"
                className="inline-flex items-center gap-2 text-white font-black text-sm border-b border-white/20 hover:border-cyan-400 hover:text-cyan-400 transition-colors pb-0.5"
              >
                Save your spot for the next one
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </FadeUp>
        </div>
      </section>

      {/* ── Tournament callout ── */}
      <section className="bg-black border-t border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border border-white/[0.08] rounded-2xl px-8 py-7 hover:border-cyan-400/20 transition-colors duration-300">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-5 h-px bg-cyan-400" />
                  <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">Want It to Count?</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">Bracket tournaments, open to all players 13+</h3>
                <p className="text-slate-400 text-sm mt-1">Pool play into a losers bracket, teams from across the Bay Area. Next up: the Tri-City Invitational on August 9, 2026.</p>
              </div>
              <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }} className="shrink-0">
                <Link to="/tournaments" className="inline-flex items-center gap-2 text-white font-black text-sm border-b border-white/20 hover:border-cyan-400 hover:text-cyan-400 transition-colors pb-0.5 whitespace-nowrap">
                  View Tournaments
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#060d1e] py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeUp className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px bg-cyan-400" />
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">Before You Sign Up</span>
            </div>
            <h2 className="text-6xl font-black text-white leading-[0.92] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Good<br />Questions.
            </h2>
          </FadeUp>
          <div className="border-t border-white/[0.08]">
            {homeFaqs.map((faq) => <HomeFaqItem key={faq.q} {...faq} />)}
          </div>
          <FadeUp className="mt-10">
            <p className="text-slate-500 text-sm">
              Still have questions?{' '}
              <a href="tel:+13417778673" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors">Text (341) 777-8673</a>
              {' '}— we reply fast.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Reviews ── */}
      <Reviews />

      {/* ── CTA ── */}
      <section className="relative bg-black py-28 overflow-hidden border-t border-white/[0.07]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[28vw] font-black text-white/[0.02] leading-none whitespace-nowrap">PLAY</div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <FadeUp>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px flex-1 max-w-[80px] bg-white/10" />
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">Fremont · Union City · Dublin</span>
              <div className="h-px flex-1 max-w-[80px] bg-white/10" />
            </div>
            <h2 className="text-6xl sm:text-7xl font-black text-white mb-6 leading-[0.9] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Get on the<br />Grass.
            </h2>
            <p className="text-slate-400 mb-12 text-lg max-w-xl mx-auto leading-relaxed">
              Open play is free and open to anyone 13 or older. Come alone, come with a crew — either way you're playing within five minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <Link to="/open-play" className="block px-10 py-4 bg-white text-black font-black rounded-2xl shadow-xl hover:bg-cyan-50 transition-colors tracking-tight text-base">
                  See Open Play
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/contact" className="block px-10 py-4 border border-white/20 text-white font-black rounded-2xl hover:bg-white/5 transition-colors tracking-tight text-base">
                  Get in Touch
                </Link>
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
