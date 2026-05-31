import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94]

const SECTIONS = [
  {
    id: 'scoring',
    label: 'Scoring',
    icon: '🏆',
    content: (
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <p>Volleyball uses <span className="text-white font-bold">rally scoring</span> — a point is scored on every single rally, regardless of who served.</p>
        <div className="space-y-2">
          {[
            { label: 'Set', desc: 'First team to 25 points wins (must win by 2). A match is best of 5 sets.' },
            { label: '5th Set', desc: 'If the match reaches a 5th set, it goes to only 15 points (still win by 2).' },
            { label: 'Point', desc: 'Scored when the ball hits the floor, goes out of bounds, or the other team commits a fault.' },
          ].map(({ label, desc }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="text-cyan-400 font-black text-xs uppercase tracking-widest">{label} — </span>
              <span>{desc}</span>
            </div>
          ))}
        </div>
        <p className="text-slate-400 text-xs">💡 Think of it like tennis sets, but every rally counts — even when returning serve.</p>
      </div>
    ),
  },
  {
    id: 'rotations',
    label: 'Rotations',
    icon: '🔄',
    content: (
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <p>Each time your team wins the serve back, all 6 players <span className="text-white font-bold">rotate one position clockwise</span>. This ensures every player serves and plays every zone.</p>
        <RotationDiagram />
        <div className="space-y-2">
          {[
            { label: 'Front Row', desc: 'Positions 2, 3, 4 — can attack and block at the net.' },
            { label: 'Back Row', desc: 'Positions 1, 5, 6 — can only attack from behind the 10-foot line.' },
            { label: 'Overlap Fault', desc: 'Players must be in the correct relative position at the moment of serve — getting caught out of position is a fault.' },
          ].map(({ label, desc }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="text-cyan-400 font-black text-xs uppercase tracking-widest">{label} — </span>
              <span>{desc}</span>
            </div>
          ))}
        </div>
        <p className="text-slate-400 text-xs">💡 After the serve, players can move freely — the rotation rule only applies at the moment the ball is served.</p>
      </div>
    ),
  },
  {
    id: 'positions',
    label: 'Positions',
    icon: '📍',
    content: (
      <div className="space-y-3 text-sm">
        {[
          { pos: 'Outside Hitter', abbrev: 'OH', color: 'text-blue-400', desc: 'Primary attacker on the left side. Also passes a lot on serve receive. The "workhorse" of the team.' },
          { pos: 'Opposite Hitter', abbrev: 'OPP', color: 'text-rose-400', desc: 'Attacks from the right side. Rarely passes. Usually the team\'s best blocker opposite the setter.' },
          { pos: 'Middle Blocker', abbrev: 'MB', color: 'text-indigo-400', desc: 'Anchors the block in the middle of the net. Runs fast quick attacks. Tallest player on the team.' },
          { pos: 'Setter', abbrev: 'S', color: 'text-amber-400', desc: 'The quarterback. Touches the ball second and "sets" it up for a hitter to attack. Controls the offense.' },
          { pos: 'Libero', abbrev: 'L', color: 'text-emerald-400', desc: 'Defensive specialist in a different colored jersey. Cannot attack or serve (in most formats). Best passer on the team.' },
          { pos: 'Defensive Specialist', abbrev: 'DS', color: 'text-cyan-400', desc: 'Substitutes in for back-row play. Focuses on passing and digging. Similar role to the libero.' },
        ].map(({ pos, abbrev, color, desc }) => (
          <div key={pos} className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
            <span className={`${color} font-black text-xs w-8 shrink-0 mt-0.5`}>{abbrev}</span>
            <div>
              <p className="text-white font-bold text-xs mb-0.5">{pos}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'terms',
    label: 'Terms',
    icon: '📖',
    content: (
      <div className="space-y-2 text-sm">
        {[
          { term: 'Ace', def: 'A serve that lands untouched or causes an unplayable pass.' },
          { term: 'Dig', def: 'A defensive save of a hard-driven attack, usually a diving or low pass.' },
          { term: 'Kill', def: 'An attack that results in an immediate point — either hits the floor or forces an error.' },
          { term: 'Stuff Block', def: 'When a blocker deflects the ball straight down into the attacker\'s court for a point.' },
          { term: 'Serve Receive', def: 'The first pass after an opponent\'s serve. A clean pass sets up a good offense.' },
          { term: 'Free Ball', def: 'When the other team can only send the ball over as a simple pass — gives your team an easy attack.' },
          { term: 'Side Out', def: 'Winning back the serve from the other team. In rally scoring, you also score a point.' },
          { term: 'Float Serve', def: 'A serve with no spin that moves unpredictably in the air — harder to pass.' },
          { term: 'Jump Serve', def: 'A powerful topspin serve with a running approach — fastest and hardest to handle.' },
          { term: 'Pancake', def: 'A last-resort defensive move where a player slides their flat hand under the ball.' },
        ].map(({ term, def }) => (
          <div key={term} className="flex gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <span className="text-cyan-400 font-black text-xs shrink-0 mt-0.5 w-20">{term}</span>
            <span className="text-slate-300 text-xs leading-relaxed">{def}</span>
          </div>
        ))}
      </div>
    ),
  },
]

function RotationDiagram() {
  const [rotation, setRotation] = useState(0)
  const basePositions = [
    { label: 'S',  x: 67, y: 25 },
    { label: 'MB', x: 50, y: 25 },
    { label: 'OH', x: 33, y: 25 },
    { label: 'L',  x: 33, y: 65 },
    { label: 'MB', x: 50, y: 65 },
    { label: 'OH', x: 67, y: 65 },
  ]
  const rotated = [...basePositions.slice(rotation), ...basePositions.slice(0, rotation)]
  const serveIdx = 5 // position 1 (back right) always serves

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
      <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/2', background: 'linear-gradient(180deg, #166534 0%, #15803d 100%)' }}>
        {/* Court lines */}
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/40" />
          <div className="absolute left-0 right-0 top-[40%] h-px bg-white/60" />
          <div className="absolute left-0 right-0 bottom-0 h-px bg-white/40" />
          <div className="absolute left-0 right-0 top-0 h-px bg-white/40" />
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/40" />
          <div className="absolute right-0 top-0 bottom-0 w-px bg-white/40" />
          {/* Net */}
          <div className="absolute left-0 right-0 top-[40%] h-1 bg-white/80" />
          <p className="absolute right-1 top-[30%] text-white/60 text-[8px] font-bold">OPP TEAM</p>
          <p className="absolute right-1 bottom-2 text-white/60 text-[8px] font-bold">YOUR TEAM</p>
        </div>
        {/* Players */}
        {rotated.map((p, i) => {
          const isServer = i === serveIdx
          return (
            <motion.div
              key={i}
              className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black shadow-lg ${isServer ? 'bg-cyan-500 text-white ring-2 ring-white' : 'bg-blue-600 text-white'}`}
              style={{ left: `${p.x}%`, top: `${p.y + 30}%`, transform: 'translate(-50%, -50%)' }}
              animate={{ left: `${p.x}%`, top: `${p.y + 30}%` }}
              transition={{ duration: 0.5, ease }}
            >
              {p.label}
            </motion.div>
          )
        })}
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-slate-400 text-xs"><span className="text-cyan-400 font-bold">Cyan</span> = server · Rotate clockwise when winning serve</p>
        <button
          onClick={() => setRotation(r => (r + 1) % 6)}
          className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-black rounded-lg"
        >
          Rotate →
        </button>
      </div>
    </div>
  )
}

export default function ParentGuide() {
  const [active, setActive] = useState('scoring')
  const section = SECTIONS.find(s => s.id === active)

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${active === s.id ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'}`}
          >
            <span>{s.icon}</span> {s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease }}
          className="bg-white/5 border border-white/10 rounded-2xl p-4"
        >
          {section?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
