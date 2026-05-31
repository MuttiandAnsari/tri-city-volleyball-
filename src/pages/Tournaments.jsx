import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import { FadeUp, StaggerList, StaggerItem, SlideIn } from '../components/Animate'
import CursorGlow from '../components/CursorGlow'
import TournamentBracket from '../components/TournamentBracket'

const ease = [0.25, 0.46, 0.45, 0.94]

const upcoming = [
  { id: 1, name: 'Bay Area Summer Showdown', month: 'JUL', day: '19', year: '2026', fullDate: 'July 19, 2026', location: 'Dublin Sports Center', divisions: ['12U', '14U', '16U', '18U'], format: 'Pool play + single elimination', registration: 'Open', deadline: 'July 12, 2026', teams: 24, description: 'Our flagship summer tournament , the best Bay Area youth clubs compete for bragging rights in a full-day showcase.', gradient: 'from-blue-600 to-cyan-500' },
  { id: 2, name: 'Tri-City Invitational', month: 'AUG', day: '09', year: '2026', fullDate: 'August 9, 2026', location: 'Fremont Recreation Center', divisions: ['10U', '12U', '14U'], format: 'Round robin + finals', registration: 'Open', deadline: 'August 2, 2026', teams: 16, description: 'A home event welcoming clubs from across the Tri-City area. Great competition in a welcoming, well-organized environment.', gradient: 'from-indigo-600 to-blue-500' },
  { id: 3, name: 'Fall Kickoff Classic', month: 'SEP', day: '13', year: '2026', fullDate: 'September 13, 2026', location: 'Dublin Sports Center', divisions: ['14U', '16U', '18U'], format: 'Pool play + bracket', registration: 'Coming Soon', deadline: 'September 6, 2026', teams: 20, description: 'Kick off the fall season with high-stakes competition. Built for players gearing up for school or club seasons.', gradient: 'from-blue-700 to-indigo-600' },
]

const past = [
  { name: 'Spring Opener 2026', date: 'April 2026', winner: 'Union City Elite 16U', division: '16U' },
  { name: 'Inaugural Tournament 2026', date: 'February 2026', winner: 'Tri-City Heat 12U', division: '12U' },
]

const info = [
  { icon: '🏐', title: 'Equipment', text: 'Volleyballs provided. Bring non-marking athletic shoes.' },
  { icon: '👕', title: 'Uniforms', text: 'Teams must wear matching jerseys. Libero jersey must be clearly distinct.' },
  { icon: '📋', title: 'Rules', text: 'USAV youth rules apply. Division modifications published two weeks before each event.' },
  { icon: '🏅', title: 'Awards', text: 'Medals for top 3 teams per division. Tournament MVP awards for standout performers.' },
]

const regStyle = {
  Open: { bg: 'bg-emerald-500', label: 'Open' },
  'Coming Soon': { bg: 'bg-amber-500', label: 'Coming Soon' },
  Closed: { bg: 'bg-slate-600', label: 'Closed' },
}

function TournamentCard({ t, index }) {
  const reg = regStyle[t.registration]
  return (
    <motion.div
      className="group bg-slate-900 rounded-2xl overflow-hidden border border-white/5"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.12, ease }}
      whileHover={{ y: -8, boxShadow: '0 32px 64px rgba(0,0,0,0.4)' }}
    >
      {/* Ticket header */}
      <div className={`relative bg-gradient-to-br ${t.gradient} p-6 pb-10`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <motion.p
              className="text-white/60 text-xs font-black uppercase tracking-widest"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 + 0.3 }}
            >
              {t.month}
            </motion.p>
            <motion.p
              className="text-white text-7xl font-black leading-none"
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: index * 0.12 + 0.2 }}
            >
              {t.day}
            </motion.p>
            <p className="text-white/60 text-sm font-bold">{t.year}</p>
          </div>
          <div className="relative flex-shrink-0">
            {t.registration === 'Open' && [0, 0.8, 1.6].map((d) => (
              <motion.div
                key={d}
                className="absolute inset-0 rounded-full bg-emerald-400"
                animate={{ scale: [1, 2.8], opacity: [0.45, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: d, ease: 'easeOut' }}
              />
            ))}
            <motion.span
              className={`relative z-10 ${reg.bg} text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full`}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 + 0.4, type: 'spring', stiffness: 300, damping: 20 }}
            >
              {reg.label}
            </motion.span>
          </div>
        </div>
        <h3 className="text-white font-black text-xl leading-tight">{t.name}</h3>

        {/* Perforated edge */}
        <div className="absolute bottom-0 left-0 right-0 h-5 overflow-hidden">
          <div className="flex justify-between px-1">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-slate-900 -mb-1.5" />
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{t.description}</p>
        <div className="space-y-2.5 mb-5">
          {[
            { label: 'Location', value: t.location },
            { label: 'Format', value: t.format },
            { label: 'Reg. Deadline', value: t.deadline },
            { label: 'Team Cap', value: `${t.teams} teams` },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-slate-500 font-semibold">{label}</span>
              <span className="text-slate-200 font-bold">{value}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {t.divisions.map((d, i) => (
            <motion.span
              key={d}
              className="px-3 py-1 bg-white/10 text-slate-200 text-xs font-black rounded-lg border border-white/10"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 + 0.5 + i * 0.05 }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              {d}
            </motion.span>
          ))}
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/contact"
            className={`flex items-center justify-center gap-2 w-full py-3 font-black text-sm rounded-xl transition-all duration-200 ${
              t.registration === 'Open'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg hover:shadow-blue-900/40'
                : 'bg-white/10 text-slate-500 cursor-default pointer-events-none'
            }`}
          >
            {t.registration === 'Open' ? (
              <>Register Your Team <motion.svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></motion.svg></>
            ) : 'Registration Opens Soon'}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Tournaments() {
  return (
    <>
      <PageHero
        label="Events & Competition"
        title={<>Compete.<br /><span className="text-gradient">Rise Up.</span></>}
        subtitle="Youth tournaments across all age groups. Test your skills against the best teams in the Bay Area."
        watermark="COMPETE"
      />

      {/* Upcoming */}
      <CursorGlow color="rgba(6,182,212,0.06)"><section className="bg-slate-950 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn from="left" className="mb-10">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">2026 Season</span>
            <div className="flex items-center gap-3 mt-1">
              <h2 className="text-3xl font-black text-white">Upcoming Tournaments</h2>
            </div>
          </SlideIn>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {upcoming.map((t, i) => (
              <TournamentCard key={t.id} t={t} index={i} />
            ))}
          </div>
        </div>
      </section></CursorGlow>

      {/* Live Bracket */}
      <section className="bg-slate-950 py-16 sm:py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SlideIn from="left">
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Live · Updates in Real Time</span>
              <h2 className="text-3xl font-black text-white mt-1">Summer Showdown Bracket</h2>
              <p className="text-slate-500 text-sm mt-1">July 19, 2026 · Dublin Sports Center · Single Elimination</p>
            </SlideIn>
            <Link
              to="/tournament-register"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-sm rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all"
            >
              Register Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <TournamentBracket />
        </div>
      </section>

      {/* Info */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <span className="text-cyan-600 text-xs font-bold uppercase tracking-widest">Day-Of Guide</span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">Tournament Info</h2>
          </FadeUp>
          <StaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.1}>
            {info.map(({ icon, title, text }) => (
              <StaggerItem key={title}>
                <motion.div
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-100 h-full"
                  whileHover={{ y: -6, borderColor: '#bfdbfe', backgroundColor: '#eff6ff', boxShadow: '0 20px 40px rgba(59,130,246,0.1)' }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl mb-4 shadow-sm"
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {icon}
                  </motion.div>
                  <h3 className="font-black text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* Past results */}
      <CursorGlow><section className="bg-slate-900 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn from="left" className="mb-10">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Record Books</span>
            <h2 className="text-3xl font-black text-white mt-1">Past Champions</h2>
          </SlideIn>
          <div className="space-y-3">
            {past.map((r, i) => (
              <motion.div
                key={r.name}
                className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-6 py-5"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', x: 4 }}
              >
                <div>
                  <p className="text-white font-black">{r.name}</p>
                  <p className="text-slate-500 text-sm">{r.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:block px-3 py-1 bg-white/10 text-slate-300 text-xs font-black rounded-full">{r.division}</span>
                  <motion.span
                    className="text-amber-400 font-black text-sm"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  >
                    {r.winner}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section></CursorGlow>

      {/* CTA */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 py-20 overflow-hidden clip-hero-bottom-rev">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <FadeUp>
            <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest block mb-4">Partner With Us</span>
            <h2 className="text-4xl font-black text-white mb-4">Want to host or sponsor?</h2>
            <p className="text-blue-200 mb-8 text-lg">Connect with us for sponsorships, volunteering, or partnership opportunities.</p>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" className="inline-flex items-center gap-2 px-9 py-4 bg-white text-blue-800 font-black rounded-2xl shadow-xl hover:bg-cyan-50 transition-colors">
                Get in Touch
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
