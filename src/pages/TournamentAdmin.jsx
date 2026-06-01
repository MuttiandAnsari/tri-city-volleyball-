import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, MAX_PLAYERS, TEAM_SIZE, ADMIN_PASSWORD } from '../lib/supabase'

const ease = [0.25, 0.46, 0.45, 0.94]

// ─── Bracket generation ───────────────────────────────────────────────────────
function generateBracket(teams) {
  // Shuffle teams for random seeding
  const shuffled = [...teams].sort(() => Math.random() - 0.5)
  const matchTimes = {
    1: { 1: '9:00 AM', 2: '9:00 AM', 3: '10:30 AM', 4: '10:30 AM' },
    2: { 1: '1:00 PM', 2: '1:00 PM' },
    3: { 1: '3:30 PM' },
  }
  const matches = []
  // QF: 4 matches
  for (let i = 0; i < 4; i++) {
    matches.push({
      round: 1,
      match_number: i + 1,
      team1_id: shuffled[i * 2]?.id ?? null,
      team2_id: shuffled[i * 2 + 1]?.id ?? null,
      winner_id: null,
    })
  }
  // SF: 2 matches (no teams yet)
  for (let i = 0; i < 2; i++) {
    matches.push({ round: 2, match_number: i + 1, team1_id: null, team2_id: null, winner_id: null })
  }
  // Final
  matches.push({ round: 3, match_number: 1, team1_id: null, team2_id: null, winner_id: null })
  return matches
}

// Group individual registrations into teams of 4
function groupIndividuals(registrations) {
  const individuals = registrations.filter(r => r.registration_type === 'individual')
  const teamRegs = registrations.filter(r => r.registration_type === 'team')
  const teams = []

  // Team registrations → teams directly
  teamRegs.forEach((r, i) => {
    teams.push({
      team_name: r.team_name || `Team ${i + 1}`,
      player1: r.player1_name,
      player2: r.player2_name,
      player3: r.player3_name,
      player4: r.player4_name,
      seed: null,
    })
  })

  // Group individuals into teams of 4
  for (let i = 0; i < individuals.length; i += TEAM_SIZE) {
    const group = individuals.slice(i, i + TEAM_SIZE)
    teams.push({
      team_name: `Team ${teams.length + 1}`,
      player1: group[0]?.player1_name ?? '',
      player2: group[1]?.player1_name ?? '',
      player3: group[2]?.player1_name ?? '',
      player4: group[3]?.player1_name ?? '',
      seed: null,
    })
  }

  return teams
}

// ─── Login screen ─────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  function submit(e) {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { onLogin(); setErr(false) }
    else setErr(true)
  }
  return (
    <div className="min-h-[100svh] bg-slate-950 flex items-center justify-center px-4">
      <motion.div
        className="bg-slate-900 border border-white/10 rounded-3xl p-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-white font-black text-xl">Admin Panel</h1>
          <p className="text-slate-500 text-sm mt-1">Tournament Management</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {err && <p className="text-red-400 text-xs">Incorrect password</p>}
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-black rounded-xl text-sm">
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  )
}

// ─── Main admin ───────────────────────────────────────────────────────────────
export default function TournamentAdmin() {
  const [authed, setAuthed] = useState(false)
  const [registrations, setRegistrations] = useState([])
  const [teams, setTeams] = useState([])
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [tab, setTab] = useState('registrations') // 'registrations' | 'bracket'

  useEffect(() => {
    if (!authed) return
    fetchAll()
    const channel = supabase
      .channel('admin-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tournament_registrations' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tournament_matches' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tournament_teams' }, fetchAll)
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [authed])

  async function fetchAll() {
    const [{ data: regs }, { data: teamData }, { data: matchData }] = await Promise.all([
      supabase.from('tournament_registrations').select('*').order('created_at'),
      supabase.from('tournament_teams').select('*').order('seed'),
      supabase.from('tournament_matches').select('*').order('round').order('match_number'),
    ])
    setRegistrations(regs ?? [])
    setTeams(teamData ?? [])
    setMatches(matchData ?? [])
    setLoading(false)
  }

  const playerCount = registrations.reduce((s, r) => s + (r.registration_type === 'team' ? TEAM_SIZE : 1), 0)
  const bracketGenerated = matches.length > 0

  async function handleGenerateBracket() {
    if (playerCount < MAX_PLAYERS) {
      alert(`Need ${MAX_PLAYERS} players to generate bracket. Currently: ${playerCount}`)
      return
    }
    if (bracketGenerated) {
      if (!confirm('Bracket already exists. Regenerate? This will reset all match results.')) return
      await supabase.from('tournament_matches').delete().neq('id', '00000000-0000-0000-0000-000000000000')
      await supabase.from('tournament_teams').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    }
    setGenerating(true)
    const newTeams = groupIndividuals(registrations)
    const { data: insertedTeams, error: teamErr } = await supabase
      .from('tournament_teams')
      .insert(newTeams.map((t, i) => ({ ...t, seed: i + 1 })))
      .select()
    if (teamErr) { alert('Error creating teams: ' + teamErr.message); setGenerating(false); return }

    const bracketMatches = generateBracket(insertedTeams)
    const { error: matchErr } = await supabase.from('tournament_matches').insert(bracketMatches)
    if (matchErr) { alert('Error creating bracket: ' + matchErr.message); setGenerating(false); return }

    setGenerating(false)
    setTab('bracket')
    fetchAll()
  }

  async function handleSetWinner(match, winnerId) {
    await supabase.from('tournament_matches').update({ winner_id: winnerId }).eq('id', match.id)

    // Advance winner to next round
    if (match.round < 3) {
      const nextRound = match.round + 1
      const nextMatchNumber = Math.ceil(match.match_number / 2)
      const slot = match.match_number % 2 === 1 ? 'team1_id' : 'team2_id'
      const { data: nextMatches } = await supabase
        .from('tournament_matches')
        .select('*')
        .eq('round', nextRound)
        .eq('match_number', nextMatchNumber)
      if (nextMatches?.[0]) {
        await supabase.from('tournament_matches')
          .update({ [slot]: winnerId })
          .eq('id', nextMatches[0].id)
      }
    }
    fetchAll()
  }

  async function handleDeleteRegistration(id) {
    if (!confirm('Delete this registration?')) return
    await supabase.from('tournament_registrations').delete().eq('id', id)
    fetchAll()
  }

  if (!authed) return <Login onLogin={() => setAuthed(true)} />

  const teamMap = {}
  teams.forEach(t => { teamMap[t.id] = t })

  return (
    <div className="min-h-[100svh] bg-slate-950 text-white">
      {/* Header */}
      <div className="bg-slate-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-black text-lg">Tournament Admin</h1>
          <p className="text-slate-500 text-xs">Bay Area Summer Showdown · June 26, 2026 · Fallon's Sports Park, Dublin</p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-xs font-black ${playerCount >= MAX_PLAYERS ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            {playerCount} / {MAX_PLAYERS} players
          </span>
          <button onClick={() => setAuthed(false)} className="text-slate-500 text-xs hover:text-white">Sign out</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {[['registrations', 'Registrations'], ['bracket', 'Bracket']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-6 py-3 text-sm font-black uppercase tracking-widest transition-colors ${tab === key ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-white'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* ── Registrations tab ── */}
            {tab === 'registrations' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-black text-xl">All Registrations</h2>
                  <button
                    onClick={handleGenerateBracket}
                    disabled={generating || playerCount < MAX_PLAYERS}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {generating ? 'Generating...' : bracketGenerated ? '↻ Regenerate Bracket' : `Generate Bracket (${playerCount}/${MAX_PLAYERS})`}
                  </button>
                </div>

                {registrations.length === 0 ? (
                  <p className="text-slate-500 text-center py-12">No registrations yet.</p>
                ) : (
                  <div className="space-y-3">
                    {registrations.map(r => (
                      <motion.div
                        key={r.id}
                        className="bg-slate-900 border border-white/10 rounded-2xl p-5"
                        layout
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${r.registration_type === 'team' ? 'bg-blue-500/20 text-blue-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                                {r.registration_type}
                              </span>
                              {r.team_name && <span className="text-white font-black text-sm">{r.team_name}</span>}
                              <span className="text-slate-600 text-xs">{new Date(r.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {[1, 2, 3, 4].map(n => r[`player${n}_name`] ? (
                                <div key={n} className="text-xs">
                                  <p className="text-white font-semibold">{r[`player${n}_name`]}</p>
                                  <p className="text-slate-500">{r[`player${n}_email`]}</p>
                                </div>
                              ) : null)}
                            </div>
                            {r.skill_level && <p className="text-slate-500 text-xs mt-1">Skill: {r.skill_level}</p>}
                          </div>
                          <button
                            onClick={() => handleDeleteRegistration(r.id)}
                            className="text-red-500/50 hover:text-red-400 transition-colors shrink-0"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Bracket tab ── */}
            {tab === 'bracket' && (
              <div>
                <h2 className="font-black text-xl mb-6">Bracket Management</h2>
                {matches.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-500 mb-4">No bracket generated yet.</p>
                    <button
                      onClick={handleGenerateBracket}
                      disabled={playerCount < MAX_PLAYERS}
                      className="px-6 py-3 bg-blue-600 text-white font-black rounded-xl text-sm disabled:opacity-40"
                    >
                      Generate Bracket ({playerCount}/{MAX_PLAYERS} players)
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {[1, 2, 3].map(round => {
                      const roundMatches = matches.filter(m => m.round === round)
                      const roundNames = { 1: 'Quarterfinals', 2: 'Semifinals', 3: 'Final' }
                      return (
                        <div key={round}>
                          <h3 className="text-cyan-400 font-black text-sm uppercase tracking-widest mb-4">{roundNames[round]}</h3>
                          <div className="space-y-3">
                            {roundMatches.map(m => {
                              const t1 = teamMap[m.team1_id]
                              const t2 = teamMap[m.team2_id]
                              return (
                                <div key={m.id} className="bg-slate-900 border border-white/10 rounded-2xl p-5">
                                  <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex-1 min-w-0">
                                      <p className="text-slate-500 text-xs mb-2">Match {m.match_number}</p>
                                      <div className="flex items-center gap-3">
                                        <span className={`font-black truncate ${m.winner_id === m.team1_id ? 'text-emerald-400' : 'text-white'}`}>
                                          {t1?.team_name ?? 'TBD'}
                                        </span>
                                        <span className="text-slate-600 text-xs font-black">VS</span>
                                        <span className={`font-black truncate ${m.winner_id === m.team2_id ? 'text-emerald-400' : 'text-white'}`}>
                                          {t2?.team_name ?? 'TBD'}
                                        </span>
                                      </div>
                                    </div>
                                    {t1 && t2 && (
                                      <div className="flex gap-2 shrink-0">
                                        <button
                                          onClick={() => handleSetWinner(m, m.team1_id)}
                                          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${m.winner_id === m.team1_id ? 'bg-emerald-600 text-white' : 'bg-white/10 text-slate-300 hover:bg-emerald-600/30 hover:text-emerald-300'}`}
                                        >
                                          {t1.team_name} Wins
                                        </button>
                                        <button
                                          onClick={() => handleSetWinner(m, m.team2_id)}
                                          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${m.winner_id === m.team2_id ? 'bg-emerald-600 text-white' : 'bg-white/10 text-slate-300 hover:bg-emerald-600/30 hover:text-emerald-300'}`}
                                        >
                                          {t2.team_name} Wins
                                        </button>
                                      </div>
                                    )}
                                    {m.winner_id && (
                                      <span className="text-emerald-400 text-xs font-black shrink-0">✓ Complete</span>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
