import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import { supabase } from '../lib/supabase'

const ease = [0.25, 0.46, 0.45, 0.94]

const positionColors = {
  'Setter': 'bg-blue-100 text-blue-700',
  'Outside Hitter': 'bg-rose-100 text-rose-700',
  'Opposite Hitter': 'bg-orange-100 text-orange-700',
  'Middle Blocker': 'bg-purple-100 text-purple-700',
  'Libero / Defensive Specialist': 'bg-cyan-100 text-cyan-700',
  'Serving Specialist': 'bg-emerald-100 text-emerald-700',
  'Not sure yet': 'bg-slate-100 text-slate-500',
}

export default function Roster() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRoster() {
      try {
        const { data, error } = await supabase
          .from('practice_registrations')
          .select('first_name, last_name, position, created_at')
          .eq('practice_name', 'Open Play')
          .order('created_at', { ascending: true })
        if (error) console.error('Roster fetch error:', error)
        setPlayers(data ?? [])
      } catch (err) {
        console.error('Roster fetch threw:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchRoster()
  }, [])

  return (
    <>
      <PageHero
        label="Open Play"
        title={<>Who's<br /><span className="text-gradient">Showing Up.</span></>}
        subtitle={`${players.length} players signed up for open play at Lake Elizabeth Park`}
        watermark="ROSTER"
      />

      <section className="bg-slate-50 py-16 sm:py-20 min-h-[60vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {loading ? (
            <div className="flex justify-center py-20">
              <motion.div
                className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          ) : (
            <>
              {/* Stats strip */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { label: 'Signed Up', value: players.length },
                  { label: 'Spots Left', value: Math.max(0, 24 - players.length) },
                  { label: 'Next Date', value: 'TBD' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm">
                    <p className="text-2xl sm:text-3xl font-black text-slate-900">{value}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {/* Player list */}
              <div className="space-y-3">
                {players.map((player, i) => (
                  <motion.div
                    key={i}
                    className="bg-white border border-slate-100 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04, ease }}
                  >
                    {/* Number */}
                    <span className="text-xs font-black text-slate-300 font-mono w-6 shrink-0 text-right">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Avatar initial */}
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
                      <span className="text-white font-black text-sm">
                        {player.first_name?.trim()[0]?.toUpperCase() || '?'}
                      </span>
                    </div>

                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-slate-900 text-sm leading-tight truncate">
                        {player.first_name?.trim()} {player.last_name?.trim()}
                      </p>
                    </div>

                    {/* Position badge */}
                    {player.position && (
                      <span className={`shrink-0 px-2.5 py-1 text-[10px] font-black rounded-lg uppercase tracking-wide ${positionColors[player.position] || 'bg-slate-100 text-slate-500'}`}>
                        {player.position === 'Libero / Defensive Specialist' ? 'Libero' : player.position}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

              {players.length === 0 && (
                <div className="text-center py-16 text-slate-400 font-semibold">
                  No signups yet — be the first!
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
