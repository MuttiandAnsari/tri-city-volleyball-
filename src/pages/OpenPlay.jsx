import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import PageHero from '../components/PageHero'
import { FadeUp, StaggerList, StaggerItem } from '../components/Animate'
import CursorGlow from '../components/CursorGlow'
import CourtVisualizer from '../components/CourtVisualizer'
import { supabase } from '../lib/supabase'

const ease = [0.25, 0.46, 0.45, 0.94]

// `title` is the source of truth for practice_registrations.practice_name —
// the Roster and the spot counter both key off this exact string.
const SESSION = {
  title: 'Open Play',
  level: 'All Levels',
  ages: '13+',
  date: 'TBD — check back soon',
  time: 'TBD',
  location: 'Lake Elizabeth Park, Fremont',
  maxSpots: 24,
  price: 'Free',
  description: 'Grass volleyball, open to anyone 13 and up. We bring the nets and the balls, you bring yourself. Teams get sorted on site and winners rotate in — no rosters, no cuts, no coaches.',
  skills: ['Grass Courts', '4v4', 'Rotate In', 'All Levels'],
  accent: 'border-emerald-500',
  badge: 'bg-emerald-500',
  bar: 'bg-emerald-500',
}

const courts = [
  { name: 'Lake Elizabeth Park', city: 'Fremont', note: 'Our home grass — most open play runs here.' },
  { name: 'Willow Park', city: 'Union City', note: 'Second grass site. Watch for pop-up sessions.' },
  { name: "Fallon's Sports Park", city: 'Dublin', note: 'Where we run the bracket tournaments.' },
]

const gear = [
  { label: 'Bare feet or turf shoes', emoji: '👣' },
  { label: 'Water bottle', emoji: '💧' },
  { label: 'Sunscreen', emoji: '🧴' },
  { label: 'Nets and balls are on us', emoji: '🏐' },
]

const sessionCardVariants = {
  hover: { y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.12)' },
}

function SessionCard({ session }) {
  const pct = Math.round((session.spots / session.maxSpots) * 100)
  const low = session.spots > 0 && session.spots <= 3
  const full = session.spots === 0

  return (
    <motion.div
      className={`group relative rounded-2xl overflow-hidden shadow-sm border-l-4 ${session.accent} ${full ? 'bg-slate-100 opacity-75' : 'bg-white'}`}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: full ? 0.75 : 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease }}
      variants={full ? {} : sessionCardVariants}
      whileHover={full ? {} : 'hover'}
    >
      <div className="p-6 sm:p-8 relative overflow-hidden">
        {/* Ghost number */}
        <motion.span
          className="absolute -top-3 right-4 text-8xl font-black text-gray-50 select-none pointer-events-none leading-none"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
        >
          01
        </motion.span>

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <motion.span
                className={`inline-block px-2.5 py-0.5 ${session.badge} text-white text-[10px] font-black uppercase tracking-widest rounded mb-2`}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {session.level}
              </motion.span>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">{session.title}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Ages {session.ages} · No upper limit</p>
            </div>
          </div>

          <p className="text-slate-500 text-sm leading-relaxed mb-5">{session.description}</p>

          <div className="grid grid-cols-2 gap-2 mb-5">
            {[
              { label: 'Next Date', value: session.date },
              { label: 'Time', value: session.time },
              { label: 'Location', value: session.location },
              { label: 'Price', value: session.price },
            ].map(({ label, value }) => (
              <motion.div
                key={label}
                className="bg-slate-50 rounded-xl p-3"
                whileHover={{ backgroundColor: '#ecfdf5' }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
                <p className="text-sm font-bold text-slate-800">{value}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {session.skills.map((s, i) => (
              <motion.span
                key={s}
                className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                whileHover={{ scale: 1.08, backgroundColor: '#d1fae5' }}
              >
                {s}
              </motion.span>
            ))}
          </div>

          {/* Animated capacity bar */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Availability</span>
              <span className={`text-xs font-black ${full ? 'text-slate-400' : low ? 'text-rose-600' : 'text-slate-700'}`}>
                {full ? `Sign-ups closed — 0 of ${session.maxSpots} spots left` : low ? `Only ${session.spots} of ${session.maxSpots} left!` : `${session.spots} of ${session.maxSpots} spots open`}
              </span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${full ? 'bg-slate-400' : low ? 'bg-rose-500' : session.bar}`}
                initial={{ width: 0 }}
                whileInView={{ width: full ? '100%' : `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

          {full ? (
            <div className="flex items-center justify-center gap-2 w-full py-3 font-black text-sm rounded-xl text-slate-400 bg-slate-200 cursor-not-allowed select-none">
              🔒 Sign-ups Closed — Spots Full
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to={`/register?session=${encodeURIComponent(session.title)}`}
                className={`flex items-center justify-center gap-2 w-full py-3 font-black text-sm rounded-xl text-white transition-opacity hover:opacity-90 ${session.badge}`}
              >
                Save Your Spot
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
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function OpenPlay() {
  const [session, setSession] = useState({ ...SESSION, spots: SESSION.maxSpots })

  useEffect(() => {
    async function fetchCount() {
      const { data, error } = await supabase
        .from('practice_registrations')
        .select('practice_name')
        .eq('practice_name', SESSION.title)
      if (error || !data) return
      setSession({ ...SESSION, spots: Math.max(0, SESSION.maxSpots - data.length) })
    }
    fetchCount()
  }, [])

  return (
    <>
      <PageHero
        label="Open Grass Volleyball"
        title={<>Show Up.<br /><span className="text-gradient">Get On a Team.</span></>}
        subtitle="Grass courts across Fremont, Union City & Dublin. Ages 13+, all levels, always free."
        watermark="GRASS"
      />

      {/* Free banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-700 to-cyan-700 py-6 px-4">
        <motion.div
          className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-3xl">🏐</span>
          <div>
            <span className="text-white font-black text-xl sm:text-2xl tracking-tight">Open play is </span>
            <span className="text-cyan-300 font-black text-2xl sm:text-3xl uppercase tracking-widest underline decoration-wavy decoration-cyan-400/60">completely FREE</span>
          </div>
        </motion.div>
        <p className="text-center text-emerald-100 text-sm mt-2 font-medium">No dues, no commitment, no tryouts. Just come out and play.</p>
      </div>

      {/* Session */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <SessionCard session={session} />
          <FadeUp className="mt-6">
            <p className="text-center text-slate-400 text-sm">
              Dates go up here as soon as they're locked in. Sign up now and we'll let you know the next one.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Where we play */}
      <section className="bg-white py-16 sm:py-20 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Three Cities</span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">Where We Play</h2>
          </FadeUp>
          <StaggerList className="grid grid-cols-1 sm:grid-cols-3 gap-5" stagger={0.1}>
            {courts.map(({ name, city, note }) => (
              <StaggerItem key={name}>
                <motion.div
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-100 h-full"
                  whileHover={{ y: -6, borderColor: '#a7f3d0', backgroundColor: '#ecfdf5', boxShadow: '0 20px 40px rgba(16,185,129,0.1)' }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2">{city}</p>
                  <h3 className="font-black text-slate-900 mb-2">{name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{note}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* What to bring — dark strip */}
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
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-800 to-cyan-700 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <FadeUp>
            <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest block mb-4">Never Played on Grass?</span>
            <h2 className="text-4xl font-black text-white mb-4">You'll be fine.</h2>
            <p className="text-emerald-100 mb-8 text-lg">Grass is slower and more forgiving than sand or hardwood. Show up on your own and you'll leave having played with a dozen new people.</p>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-9 py-4 bg-white text-emerald-800 font-black rounded-2xl shadow-xl hover:bg-emerald-50 transition-colors"
              >
                Ask Us Anything
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
