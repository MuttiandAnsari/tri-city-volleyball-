import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import { FadeUp, StaggerList, StaggerItem } from '../components/Animate'
import CursorGlow from '../components/CursorGlow'
import Countdown from '../components/Countdown'
import Tilt from '../components/Tilt'
import CourtVisualizer from '../components/CourtVisualizer'

const ease = [0.25, 0.46, 0.45, 0.94]

const clinics = [
  { id: 1, title: 'Beginner Fundamentals', level: 'Beginner', grades: 'K–4', date: 'June 14, 2026', time: '12:00 – 1:00 PM', location: 'Lake Elizabeth, Fremont', spots: 16, maxSpots: 16, price: '$10 / session', description: 'The perfect first step. Athletes learn passing, serving, and court awareness in a fun, zero-pressure environment.', skills: ['Passing', 'Serving', 'Court Movement', 'Team Play'], accent: 'border-emerald-500', badge: 'bg-emerald-500', bar: 'bg-emerald-500' },
  { id: 2, title: 'Intermediate Skills', level: 'Intermediate', grades: '5–7', date: 'June 14, 2026', time: '1:30 – 3:00 PM', location: 'Lake Elizabeth, Fremont', spots: 16, maxSpots: 16, price: '$15 / session', description: 'Build on the basics with consistent setting, attacking, and defensive positioning. For players with at least one season of experience.', skills: ['Setting', 'Attacking', 'Defense', 'Serve Receive'], accent: 'border-amber-500', badge: 'bg-amber-500', bar: 'bg-amber-500' },
  { id: 3, title: 'Advanced Competitive', level: 'Advanced', grades: '18–22', date: 'June 14, 2026', time: '3:30 – 5:00 PM', location: 'Lake Elizabeth, Fremont', spots: 12, maxSpots: 12, price: '$15 / session', description: 'High-intensity training for experienced players. Sharpen competitive skills, game IQ, and tournament readiness.', skills: ['Warm Up', 'Scrimmage'], accent: 'border-rose-500', badge: 'bg-rose-500', bar: 'bg-rose-500' },
  { id: 4, title: 'Summer All-Skills Camp', level: 'All Levels', grades: 'K–12', date: 'TBD', time: 'TBD', location: 'TBD', spots: 14, maxSpots: 24, price: '$150 / week', description: 'A full week of immersive volleyball. Morning skill sessions, afternoon scrimmages, and lunch included every day.', skills: ['All Skills', 'Scrimmages', 'Team Drills', 'Fun Activities'], accent: 'border-cyan-500', badge: 'bg-cyan-500', bar: 'bg-cyan-500' },
]

const gear = [
  { label: 'Athletic shoes', emoji: '👟' },
  { label: 'Water bottle', emoji: '💧' },
  { label: 'Competitive attitude', emoji: '🔥' },
]

const clinicCardVariants = {
  hover: { y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.12)' },
}

function ClinicCard({ clinic, index }) {
  const num = String(index + 1).padStart(2, '0')
  const pct = Math.round((clinic.spots / clinic.maxSpots) * 100)
  const low = clinic.spots <= 3

  return (
    <motion.div
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm border-l-4 ${clinic.accent}`}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      variants={clinicCardVariants}
      whileHover="hover"
    >
      {/* Shine sweep on hover */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-r-2xl" aria-hidden="true">
        <motion.div
          className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          variants={{ hover: { x: '380%', transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } } }}
        />
      </div>

      <div className="p-6 sm:p-7 relative overflow-hidden">
        {/* Ghost number */}
        <motion.span
          className="absolute -top-3 right-4 text-8xl font-black text-gray-50 select-none pointer-events-none leading-none"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3, ease }}
        >
          {num}
        </motion.span>

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <motion.span
                className={`inline-block px-2.5 py-0.5 ${clinic.badge} text-white text-[10px] font-black uppercase tracking-widest rounded mb-2`}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
              >
                {clinic.level}
              </motion.span>
              <h3 className="text-xl font-black text-slate-900 leading-tight">{clinic.title}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Grades {clinic.grades}</p>
            </div>
          </div>

          <p className="text-slate-500 text-sm leading-relaxed mb-5">{clinic.description}</p>

          <div className="grid grid-cols-2 gap-2 mb-5">
            {[
              { label: 'Schedule', value: clinic.date },
              { label: 'Time', value: clinic.time },
              { label: 'Location', value: clinic.location },
              { label: 'Price', value: clinic.price },
            ].map(({ label, value }) => (
              <motion.div
                key={label}
                className="bg-slate-50 rounded-xl p-3"
                whileHover={{ backgroundColor: '#eff6ff' }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
                <p className="text-sm font-bold text-slate-800">{value}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {clinic.skills.map((s, i) => (
              <motion.span
                key={s}
                className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 + i * 0.05 }}
                whileHover={{ scale: 1.08, backgroundColor: '#dbeafe' }}
              >
                {s}
              </motion.span>
            ))}
          </div>

          {/* Animated capacity bar */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Availability</span>
              <span className={`text-xs font-black ${low ? 'text-rose-600' : 'text-slate-700'}`}>
                {low ? `Only ${clinic.spots} left!` : `${clinic.spots} spots open`}
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${low ? 'bg-rose-500' : clinic.bar}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: index * 0.1 + 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to={`/register?clinic=${encodeURIComponent(clinic.title)}`}
              className={`flex items-center justify-center gap-2 w-full py-3 font-black text-sm rounded-xl text-white transition-opacity hover:opacity-90 ${clinic.badge}`}
            >
              Register for This Clinic
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Clinics() {
  return (
    <>
      <PageHero
        label="Training Programs"
        title={<>Train Smarter.<br /><span className="text-gradient">Level Up Faster.</span></>}
        subtitle="Structured sessions for every grade level, from K through 12th, in Union City, Fremont & Dublin."
        watermark="TRAIN"
      />

      <Countdown />

      {/* FREE first session banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-800 to-cyan-700 py-6 px-4">
        <motion.div
          className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-3xl">🎉</span>
          <div>
            <span className="text-white font-black text-xl sm:text-2xl tracking-tight">Your first session is </span>
            <span className="text-cyan-300 font-black text-2xl sm:text-3xl uppercase tracking-widest underline decoration-wavy decoration-cyan-400/60">completely FREE</span>
            <span className="text-white font-black text-xl sm:text-2xl"> for everyone!</span>
          </div>
        </motion.div>
        <p className="text-center text-blue-200 text-sm mt-2 font-medium">No commitment, no cost. Just come out and play.</p>
      </div>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clinics.map((clinic, i) => (
              <Tilt key={clinic.id} intensity={6}>
                <ClinicCard clinic={clinic} index={i} />
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* What to bring , dark strip */}
      <CursorGlow><section className="bg-slate-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-10">
            <FadeUp className="md:w-64 shrink-0">
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Checklist</span>
              <h2 className="text-3xl font-black text-white mt-2">What to<br />Bring</h2>
            </FadeUp>
            <StaggerList className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1" stagger={0.12}>
              {gear.map(({ emoji, label }) => (
                <StaggerItem key={label}>
                  <motion.div
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', y: -4, borderColor: 'rgba(6,182,212,0.4)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      className="text-3xl block mb-3"
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      {emoji}
                    </motion.span>
                    <span className="text-white text-sm font-semibold leading-snug">{label}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerList>
          </div>
        </div>
      </section></CursorGlow>

      <CourtVisualizer />

      {/* CTA */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <FadeUp>
            <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest block mb-4">We're Here to Help</span>
            <h2 className="text-4xl font-black text-white mb-4">Not sure which clinic<br />is right for you?</h2>
            <p className="text-blue-200 mb-8 text-lg">Message us and we'll find the perfect fit for your athlete.</p>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-9 py-4 bg-white text-blue-800 font-black rounded-2xl shadow-xl hover:bg-cyan-50 transition-colors"
              >
                Contact Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
