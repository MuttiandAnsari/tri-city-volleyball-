import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

const ROUND_NAMES = { 1: 'Quarterfinals', 2: 'Semifinals', 3: 'Final' }
const MATCH_TIMES = {
  // round: { match_number: time }
  1: { 1: '9:00 AM', 2: '9:00 AM', 3: '10:30 AM', 4: '10:30 AM' },
  2: { 1: '1:00 PM', 2: '1:00 PM' },
  3: { 1: '3:30 PM' },
}
const COURTS = {
  1: { 1: 'Court 1', 2: 'Court 2', 3: 'Court 1', 4: 'Court 2' },
  2: { 1: 'Court 1', 2: 'Court 2' },
  3: { 1: 'Center Court' },
}

function MatchCard({ match, teams, winner }) {
  const team1 = teams[match.team1_id]
  const team2 = teams[match.team2_id]
  const time = MATCH_TIMES[match.round]?.[match.match_number]
  const court = COURTS[match.round]?.[match.match_number]
  const isDone = !!match.winner_id

  return (
    <motion.div
      className={`rounded-xl border overflow-hidden text-sm w-52 ${isDone ? 'border-white/20' : 'border-white/10'} bg-slate-900`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Time header */}
      <div className="bg-slate-800 px-3 py-1.5 flex justify-between items-center">
        <span className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">{time}</span>
        <span className="text-slate-500 text-[10px] font-bold">{court}</span>
      </div>

      {/* Team 1 */}
      <div className={`px-3 py-2.5 flex justify-between items-center border-b border-white/5 ${match.winner_id === match.team1_id ? 'bg-emerald-900/30' : ''}`}>
        <span className={`font-bold truncate max-w-[130px] ${!team1 ? 'text-slate-600 italic' : match.winner_id === match.team1_id ? 'text-emerald-300' : 'text-white'}`}>
          {team1 ? team1.team_name : 'TBD'}
        </span>
        {match.winner_id === match.team1_id && <span className="text-emerald-400 text-xs ml-1">✓</span>}
      </div>

      {/* vs divider */}
      <div className="px-3 py-1 text-center">
        <span className="text-slate-600 text-[10px] font-black uppercase">vs</span>
      </div>

      {/* Team 2 */}
      <div className={`px-3 py-2.5 flex justify-between items-center ${match.winner_id === match.team2_id ? 'bg-emerald-900/30' : ''}`}>
        <span className={`font-bold truncate max-w-[130px] ${!team2 ? 'text-slate-600 italic' : match.winner_id === match.team2_id ? 'text-emerald-300' : 'text-white'}`}>
          {team2 ? team2.team_name : 'TBD'}
        </span>
        {match.winner_id === match.team2_id && <span className="text-emerald-400 text-xs ml-1">✓</span>}
      </div>
    </motion.div>
  )
}

export default function TournamentBracket() {
  const [matches, setMatches] = useState([])
  const [teams, setTeams] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBracket()
    const channel = supabase
      .channel('bracket-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tournament_matches' }, fetchBracket)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tournament_teams' }, fetchBracket)
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  async function fetchBracket() {
    const [{ data: matchData }, { data: teamData }] = await Promise.all([
      supabase.from('tournament_matches').select('*').order('round').order('match_number'),
      supabase.from('tournament_teams').select('*'),
    ])
    if (teamData) {
      const map = {}
      teamData.forEach(t => { map[t.id] = t })
      setTeams(map)
    }
    if (matchData) setMatches(matchData)
    setLoading(false)
  }

  if (loading) return (
    <div className="flex justify-center py-12">
      <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (matches.length === 0) return (
    <div className="text-center py-12">
      <p className="text-slate-500 text-sm">The bracket will appear here once all 32 players are registered.</p>
    </div>
  )

  const rounds = [1, 2, 3]
  const champion = matches.find(m => m.round === 3 && m.winner_id) ? teams[matches.find(m => m.round === 3).winner_id] : null

  return (
    <div className="overflow-x-auto pb-4">
      {champion && (
        <motion.div
          className="text-center mb-8 p-4 bg-gradient-to-r from-amber-900/40 to-yellow-900/40 border border-amber-500/30 rounded-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-1">🏆 Tournament Champion</p>
          <p className="text-white font-black text-2xl">{champion.team_name}</p>
        </motion.div>
      )}

      <div className="flex gap-12 items-center min-w-max mx-auto w-fit">
        {rounds.map(round => {
          const roundMatches = matches.filter(m => m.round === round)
          const gap = round === 1 ? 'gap-4' : round === 2 ? 'gap-28' : 'gap-0'
          return (
            <div key={round} className="flex flex-col items-center">
              <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-5">{ROUND_NAMES[round]}</p>
              <div className={`flex flex-col ${gap}`}>
                {roundMatches.map(m => (
                  <MatchCard key={m.id} match={m} teams={teams} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
