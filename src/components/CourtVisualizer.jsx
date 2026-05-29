import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const positions = [
  {
    id: 's',
    name: 'Setter',
    abbrev: 'SET',
    x: 85,
    y: 112,
    coaches: ['Viraj Mutti', 'Farhaan Ansari'],
    focus: 'Playmaking & Offense Director',
    description: 'Acting as the team quarterback, the setter runs the offense, coordinates hitters, and controls the flow of the match with fast decision-making.',
    skills: ['Overhead Hand Setting', 'Underhand Platform Setting', 'Jump Setting & Dumping', 'Tactical Offense Calling'],
    drills: ['Target Accuracy Runs', 'Out-of-System Recovery', 'Setter-Hitter Connection Tempo'],
    color: 'from-cyan-400 to-blue-500',
    glow: 'rgba(6,182,212,0.15)',
    zone: { x: 76.6, y: 100, width: 33.4, height: 30 } // Zone 2
  },
  {
    id: 'oh',
    name: 'Outside Hitter',
    abbrev: 'OH',
    x: 25,
    y: 115,
    coaches: ['Farhaan Ansari'],
    focus: 'Primary Attacker & Passer',
    description: 'The outside hitter is the primary outlet on offense, attacking from the left side, while also carrying heavy defensive and serve-receive responsibilities.',
    skills: ['Left-Side Attacking', 'Serve Receive Passing', 'Perimeter Block Defending', 'Transition Tooling'],
    drills: ['Pass-to-Attack Transitions', 'High-Ball Out-of-System Hitting', 'Block Deflection Attacks'],
    color: 'from-blue-400 to-indigo-500',
    glow: 'rgba(59,130,246,0.15)',
    zone: { x: 10, y: 100, width: 33.4, height: 30 } // Zone 4
  },
  {
    id: 'mb',
    name: 'Middle Blocker',
    abbrev: 'MB',
    x: 50,
    y: 110,
    coaches: ['Noah Lukose'],
    focus: 'Net Defense & Quick Attacks',
    description: 'The middle blocker is the anchor of net defense, shifting laterally to block opposing hitters and attacking fast-tempo sets in the center.',
    skills: ['Lateral Block Footwork', 'Quick A/B/C Attack Timing', 'Read-Blocking & Closing', 'Transition Penetration'],
    drills: ['Jousting & Penetration Reps', 'Lateral Shuffle Speed Drills', 'Quick-Tempo Slide Attacks'],
    color: 'from-indigo-400 to-purple-500',
    glow: 'rgba(99,102,241,0.15)',
    zone: { x: 43.4, y: 100, width: 33.2, height: 30 } // Zone 3
  },
  {
    id: 'opp',
    name: 'Opposite Hitter',
    abbrev: 'OPP',
    x: 82,
    y: 160,
    coaches: ['Ayaan Shansab', 'Farhaan Ansari'],
    focus: 'Right-Side Hitter & Blocker',
    description: 'Attacking from the right side, the opposite hitter blocks the opponent’s primary outside hitter and provides back-row attacking options.',
    skills: ['Right-Side Attacking', 'Opposite-Hitter Blocking', 'Back-Row Attack (D-Ball)', 'Serve & Assist Support'],
    drills: ['Line/Cross Blocking Drills', 'Back-Row Transition Swings', 'Defending Zone 1 Off-Block'],
    color: 'from-sky-400 to-cyan-500',
    glow: 'rgba(56,189,248,0.15)',
    zone: { x: 76.6, y: 130, width: 33.4, height: 60 } // Zone 1
  },
  {
    id: 'l',
    name: 'Libero / DS',
    abbrev: 'LIB',
    x: 35,
    y: 165,
    coaches: ['Viraj Mutti', 'Farhaan Ansari'],
    focus: 'Defensive & Receive Specialist',
    description: 'A defensive master, the Libero wears a contrasting jersey, plays strictly back-row, and specializes in serve-receive and spectacular digs.',
    skills: ['Platform Passing Control', 'Digging Hard-Driven Attacks', 'Emergency Hand Setting', 'Floor Coverage & Diving'],
    drills: ['Seam-Coverage Shuffles', 'Rapid-Fire Dig-to-Target', 'Platform Tracking & Reading'],
    color: 'from-emerald-400 to-teal-500',
    glow: 'rgba(16,185,129,0.15)',
    zone: { x: 10, y: 130, width: 66.6, height: 60 } // Zones 5 & 6
  }
]

export default function CourtVisualizer() {
  const [active, setActive] = useState(positions[0])
  const [hovered, setHovered] = useState(null)

  const current = hovered || active

  return (
    <section className="relative bg-slate-950 py-24 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-40" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-4">Training Blueprint</span>
          <h2 className="text-4xl sm:text-5xl font-black text-glow-cyan text-white mb-4">Explore Court Positions</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Click or hover on any position to understand its tactical focus, skills checklist, and coaching staff.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          {/* Left / Center: Interactive SVG Court (takes 2/5 grid) */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative w-full max-w-[340px] aspect-[3/5] bg-slate-900 rounded-3xl p-5 border border-white/10 shadow-2xl">
              {/* Outer boundary glowing grid */}
              <div className="absolute inset-4 border-2 border-white/10 rounded-2xl overflow-hidden">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 120 200"
                  fill="none"
                >
                  {/* Grid / Floor Pattern */}
                  <defs>
                    <pattern id="court-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <rect width="20" height="20" fill="transparent" />
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect x="0" y="0" width="120" height="200" fill="url(#court-grid)" />

                  {/* Highlight active/hovered Zone */}
                  <AnimatePresence>
                    {current.zone && (
                      <motion.rect
                        key={current.id}
                        x={current.zone.x}
                        y={current.zone.y}
                        width={current.zone.width}
                        height={current.zone.height}
                        fill={current.id === 'l' ? 'rgba(16,185,129,0.08)' : 'rgba(6,182,212,0.08)'}
                        stroke={current.id === 'l' ? '#10b981' : '#22d3ee'}
                        strokeWidth="0.8"
                        strokeDasharray="2,2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Court Lines */}
                  {/* Boundaries */}
                  <rect x="10" y="10" width="100" height="180" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
                  {/* Center line (Net) */}
                  <line x1="8" y1="100" x2="112" y2="100" stroke="#ef4444" strokeWidth="2" strokeDasharray="1,1" />
                  {/* 3m Attack Lines */}
                  <line x1="10" y1="70" x2="110" y2="70" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                  {/* Bottom Court Attack Line */}
                  <line x1="10" y1="130" x2="110" y2="130" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

                  {/* Serving ticks / ticks line */}
                  <line x1="10" y1="190" x2="18" y2="190" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <line x1="102" y1="190" x2="110" y2="190" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

                  {/* Opponent side marker */}
                  <text x="60" y="55" fill="rgba(255,255,255,0.12)" fontSize="5" fontWeight="900" textAnchor="middle" letterSpacing="0.3em" transform="rotate(180 60 55)">
                    OPPONENT SIDE
                  </text>

                  {/* Interactive positions */}
                  {positions.map((p) => {
                    const isActive = current.id === p.id
                    return (
                      <g
                        key={p.id}
                        className="cursor-pointer"
                        onClick={() => setActive(p)}
                        onMouseEnter={() => setHovered(p)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        {/* Outer pulsing ring for active position */}
                        {isActive && (
                          <motion.circle
                            cx={p.x}
                            cy={p.y}
                            r="10"
                            stroke={p.id === 'l' ? '#10b981' : '#22d3ee'}
                            strokeWidth="1"
                            fill="transparent"
                            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        )}
                        {/* Position marker circle */}
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="6.5"
                          fill={isActive ? '#ffffff' : 'rgba(15,23,42,0.9)'}
                          stroke={p.id === 'l' ? '#10b981' : '#22d3ee'}
                          strokeWidth={isActive ? '2.5' : '1.5'}
                          className="transition-all duration-300"
                        />
                        {/* Inner text */}
                        <text
                          x={p.x}
                          y={p.y + 1.8}
                          fontSize="5.2"
                          fontWeight="900"
                          textAnchor="middle"
                          fill={isActive ? (p.id === 'l' ? '#047857' : '#0369a1') : '#ffffff'}
                          className="transition-colors duration-300 font-sans"
                        >
                          {p.shortName || p.abbrev.substring(0, 2)}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Right: Glassmorphic Details Card (takes 3/5 grid) */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 sm:p-10 shadow-2xl relative"
                style={{ boxShadow: `0 24px 64px -16px ${current.glow || 'rgba(6,182,212,0.1)'}` }}
              >
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-1">
                      {current.focus}
                    </span>
                    <h3 className="text-3xl font-black text-white">{current.name}</h3>
                  </div>
                  <span className={`px-4 py-1.5 rounded-xl bg-gradient-to-r ${current.color} text-white text-xs font-extrabold tracking-widest`}>
                    {current.abbrev}
                  </span>
                </div>

                <p className="text-slate-300 text-base leading-relaxed mb-8 border-b border-white/5 pb-6">
                  {current.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                  {/* Skills checklist */}
                  <div>
                    <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="text-cyan-400">✓</span> Skills Focus
                    </h4>
                    <ul className="space-y-2.5">
                      {current.skills.map((s) => (
                        <li key={s} className="flex items-start gap-2.5 text-sm text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Standard drills */}
                  <div>
                    <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="text-cyan-400">⚙</span> Training Drills
                    </h4>
                    <ul className="space-y-2.5">
                      {current.drills.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 mt-2 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Coaching alignment */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Specialist Staff</p>
                    <p className="text-white font-bold text-sm">{current.coaches.join(' & ')}</p>
                  </div>
                  <div className="flex -space-x-2.5">
                    {current.coaches.map((c) => {
                      const short = c.split(' ')[0].toLowerCase()
                      return (
                        <div
                          key={c}
                          className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden"
                          title={c}
                        >
                          <img
                            src={`/src/assets/${short}.jpg`}
                            alt={c}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
