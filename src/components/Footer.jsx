import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'
import { FadeUp, StaggerList, StaggerItem } from './Animate'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/practices', label: 'Practices' },
  { to: '/tournaments', label: 'Tournaments' },
  { to: '/contact', label: 'Contact' },
]

const programs = [
  { to: '/practices', label: 'Advanced Competitive 14–22' },
  { to: '/practices', label: 'Summer All-Skills Camp' },
  { to: '/tournaments', label: 'Tournaments 14+' },
]

function FooterLink({ to, label }) {
  return (
    <li>
      <Link to={to} className="group flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors duration-200">
        <motion.span
          className="w-0 group-hover:w-3 h-px bg-cyan-400 inline-block transition-all duration-300"
        />
        {label}
      </Link>
    </li>
  )
}

const ease = [0.25, 0.46, 0.45, 0.94]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-blue-900/20 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <Link to="/" className="flex items-center gap-3 mb-5 group">
                <motion.img
                  src={logo}
                  alt="Tri-City VB"
                  className="h-10 w-auto brightness-0 invert"
                  whileHover={{ scale: 1.08, rotate: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                />
                <div>
                  <div className="font-extrabold text-white text-sm leading-tight">Tri-City Volleyball</div>
                  <div className="text-[10px] font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-widest">Academy</div>
                </div>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                Building the next generation of Bay Area volleyball talent. Youth-led, community-driven, competition-ready.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:volleyballtricity@gmail.com"
                  className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold hover:text-cyan-300 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  volleyballtricity@gmail.com
                </a>
                <a
                  href="tel:+13417778673"
                  className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold hover:text-cyan-300 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (341) 777-8673
                </a>
              </div>
            </motion.div>
          </div>

          {/* Quick links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
            >
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-5">Navigate</h3>
              <ul className="space-y-3">
                {navLinks.map((l) => <FooterLink key={l.to + l.label} {...l} />)}
              </ul>
            </motion.div>
          </div>

          {/* Programs */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-5">Programs</h3>
              <ul className="space-y-3">
                {programs.map((l) => <FooterLink key={l.label} {...l} />)}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
            >
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-5">Stay in the Loop</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">Get practice schedules, tournament dates, and updates delivered to your inbox.</p>
              {subscribed ? (
                <motion.div
                  className="flex items-center gap-2 text-emerald-400 text-sm font-bold"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  You're on the list!
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                  <motion.button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-black rounded-xl"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Subscribe
                  </motion.button>
                </form>
              )}

              {/* Locations */}
              <div className="mt-6 flex flex-col gap-1.5">
                {['Lake Elizabeth, Fremont', 'Willow Park, Union City', "Fallon's Park, Dublin"].map((loc) => (
                  <div key={loc} className="flex items-center gap-2 text-slate-400 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    {loc}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Tri-City Volleyball Academy · Fremont, Union City & Dublin, CA · Est. 2026
          </p>
          <div className="flex items-center gap-1">
            <span className="text-slate-600 text-xs mr-2">Made with</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-rose-500 text-xs"
            >♥</motion.span>
            <span className="text-slate-600 text-xs ml-1">by Viraj, Farhaan, Noah & Ayaan</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
