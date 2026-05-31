import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, MAX_PLAYERS, TEAM_SIZE } from '../lib/supabase'
import PageHero from '../components/PageHero'

const ease = [0.25, 0.46, 0.45, 0.94]

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-1">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 text-sm transition-all ${className}`}
      {...props}
    />
  )
}

const emptyPlayer = { name: '', email: '', phone: '' }

export default function TournamentRegister() {
  const [type, setType] = useState('individual') // 'individual' | 'team'
  const [playerCount, setPlayerCount] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [full, setFull] = useState(false)
  const [errors, setErrors] = useState({})

  // Individual fields
  const [individual, setIndividual] = useState({ name: '', email: '', phone: '', skill: 'Beginner' })

  // Team fields
  const [teamName, setTeamName] = useState('')
  const [players, setPlayers] = useState([
    { ...emptyPlayer },
    { ...emptyPlayer },
    { ...emptyPlayer },
    { ...emptyPlayer },
  ])

  useEffect(() => {
    fetchCount()
    const channel = supabase
      .channel('registrations-count')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tournament_registrations' }, fetchCount)
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  async function fetchCount() {
    const { data } = await supabase.from('tournament_registrations').select('registration_type')
    if (!data) return
    const total = data.reduce((sum, r) => sum + (r.registration_type === 'team' ? TEAM_SIZE : 1), 0)
    setPlayerCount(total)
    setFull(total >= MAX_PLAYERS)
  }

  function updatePlayer(i, field, val) {
    setPlayers(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: val } : p))
  }

  function validate() {
    const errs = {}
    if (type === 'individual') {
      if (!individual.name.trim()) errs.name = 'Name is required'
      if (!individual.email.trim() || !/\S+@\S+\.\S+/.test(individual.email)) errs.email = 'Valid email required'
      if (!individual.phone.trim()) errs.phone = 'Phone is required'
    } else {
      if (!teamName.trim()) errs.teamName = 'Team name is required'
      players.forEach((p, i) => {
        if (!p.name.trim()) errs[`p${i}name`] = 'Name is required'
        // Only captain (player 1) requires email
        if (i === 0 && (!p.email.trim() || !/\S+@\S+\.\S+/.test(p.email))) errs[`p${i}email`] = 'Valid email required'
        // Other players: validate format only if they filled something in
        if (i > 0 && p.email.trim() && !/\S+@\S+\.\S+/.test(p.email)) errs[`p${i}email`] = 'Invalid email format'
      })
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    const payload = type === 'individual'
      ? {
          registration_type: 'individual',
          player1_name: individual.name,
          player1_email: individual.email,
          player1_phone: individual.phone,
          skill_level: individual.skill,
        }
      : {
          registration_type: 'team',
          team_name: teamName,
          player1_name: players[0].name,
          player1_email: players[0].email,
          player1_phone: players[0].phone,
          player2_name: players[1].name,
          player2_email: players[1].email,
          player2_phone: players[1].phone,
          player3_name: players[2].name,
          player3_email: players[2].email,
          player3_phone: players[2].phone,
          player4_name: players[3].name,
          player4_email: players[3].email,
          player4_phone: players[3].phone,
        }

    const { error } = await supabase.from('tournament_registrations').insert(payload)
    setLoading(false)
    if (error) { alert('Something went wrong. Please try again.'); return }
    setSubmitted(true)
    fetchCount()
  }

  const spotsLeft = MAX_PLAYERS - (playerCount ?? 0)
  const pct = Math.min(100, ((playerCount ?? 0) / MAX_PLAYERS) * 100)

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <motion.div
          className="bg-slate-900 border border-white/10 rounded-3xl p-10 text-center max-w-md w-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        >
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-black text-white mb-3">You're Registered!</h2>
          <p className="text-slate-400 mb-6 text-sm leading-relaxed">
            {type === 'individual'
              ? "You're on the list! We'll group you with other individual players and notify you once teams are formed."
              : `Team "${teamName}" is locked in! We'll reach out with bracket and schedule info soon.`}
          </p>
          <Link to="/tournaments" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black rounded-xl text-sm">
            View Bracket →
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <PageHero
        label="Tournament Sign-Up"
        title={<>Register for the<br /><span className="text-gradient">Summer Showdown</span></>}
        subtitle="July 19, 2026 · Dublin Sports Center · Single Elimination · 8 teams of 4"
        watermark="REG"
      />

      <section className="bg-slate-950 py-16">
        <div className="max-w-2xl mx-auto px-4">

          {/* Capacity bar */}
          <motion.div
            className="bg-slate-900 border border-white/10 rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-black">Registration Spots</span>
              <span className={`text-sm font-bold ${full ? 'text-red-400' : spotsLeft <= 8 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {full ? 'FULL' : `${spotsLeft} spots left`}
              </span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${full ? 'bg-red-500' : spotsLeft <= 8 ? 'bg-amber-500' : 'bg-gradient-to-r from-blue-500 to-cyan-400'}`}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <p className="text-slate-500 text-xs mt-2">{playerCount ?? '...'} / {MAX_PLAYERS} players registered</p>
          </motion.div>

          {full ? (
            <motion.div
              className="bg-red-950/50 border border-red-500/30 rounded-2xl p-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-white font-black text-xl mb-2">Registration is Closed</h3>
              <p className="text-slate-400 text-sm">All 32 spots have been filled. Check the tournament bracket on the Tournaments page.</p>
              <Link to="/tournaments" className="inline-flex mt-4 px-6 py-3 bg-blue-600 text-white font-black rounded-xl text-sm">
                View Bracket →
              </Link>
            </motion.div>
          ) : (
            <motion.div
              className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* Type toggle */}
              <div className="flex border-b border-white/10">
                {['individual', 'team'].map(t => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`flex-1 py-4 text-sm font-black uppercase tracking-widest transition-colors ${type === t ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    {t === 'individual' ? '👤 Individual' : '👥 Full Team of 4'}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                <AnimatePresence mode="wait">
                  {type === 'individual' ? (
                    <motion.div
                      key="individual"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      <p className="text-slate-400 text-sm">Register solo — we'll group you with other individual players to form a team of 4.</p>
                      <Field label="Full Name *" error={errors.name}>
                        <Input value={individual.name} onChange={e => setIndividual(p => ({ ...p, name: e.target.value }))} placeholder="Your name" />
                      </Field>
                      <Field label="Email *" error={errors.email}>
                        <Input type="email" value={individual.email} onChange={e => setIndividual(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" />
                      </Field>
                      <Field label="Phone *" error={errors.phone}>
                        <Input type="tel" value={individual.phone} onChange={e => setIndividual(p => ({ ...p, phone: e.target.value }))} placeholder="(555) 555-5555" />
                      </Field>
                      <Field label="Skill Level">
                        <select
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm"
                          value={individual.skill}
                          onChange={e => setIndividual(p => ({ ...p, skill: e.target.value }))}
                        >
                          {['Beginner', 'Intermediate', 'Advanced'].map(s => <option key={s}>{s}</option>)}
                        </select>
                      </Field>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="team"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <p className="text-slate-400 text-sm">Register your full team of 4. This locks in one team slot immediately.</p>
                      <Field label="Team Name *" error={errors.teamName}>
                        <Input value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="e.g. Bay Area Ballers" />
                      </Field>
                      {players.map((p, i) => (
                        <div key={i} className="bg-slate-800/50 rounded-2xl p-4 space-y-3">
                          <p className="text-cyan-400 text-xs font-black uppercase tracking-widest">
                            Player {i + 1}{i === 0 ? ' (Captain)' : ''}
                          </p>
                          <Field label="Full Name *" error={errors[`p${i}name`]}>
                            <Input value={p.name} onChange={e => updatePlayer(i, 'name', e.target.value)} placeholder="Player name" />
                          </Field>
                          <Field label={i === 0 ? 'Email *' : 'Email (optional)'} error={errors[`p${i}email`]}>
                            <Input type="email" value={p.email} onChange={e => updatePlayer(i, 'email', e.target.value)} placeholder="player@email.com" />
                          </Field>
                          <Field label={i === 0 ? 'Phone *' : 'Phone (optional)'}>
                            <Input type="tel" value={p.phone} onChange={e => updatePlayer(i, 'phone', e.target.value)} placeholder="(555) 555-5555" />
                          </Field>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black rounded-xl text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Registering...' : type === 'individual' ? 'Register as Individual' : 'Register Full Team'}
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
