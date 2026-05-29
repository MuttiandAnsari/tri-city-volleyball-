import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.png'

const links = [
  { to: '/', label: 'Home', num: '01' },
  { to: '/clinics', label: 'Clinics', num: '02' },
  { to: '/tournaments', label: 'Tournaments', num: '03' },
  { to: '/contact', label: 'Contact', num: '04' },
]

const ease = [0.25, 0.46, 0.45, 0.94]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const shadow = useTransform(scrollY, [0, 80], ['0 0 0 0 transparent', '0 4px 32px 0 rgba(0,0,0,0.5)'])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <>
      <motion.nav
        className="backdrop-blur-md sticky top-0 z-50 bg-slate-900/85"
        style={{ boxShadow: shadow }}
      >
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-white/10"
          style={{ opacity: borderOpacity }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
              <motion.img
                src={logo}
                alt="Tri-City VB Logo"
                className="h-10 w-auto"
                whileHover={{ scale: 1.08, rotate: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              />
              <div className="hidden sm:block leading-tight">
                <div className="font-extrabold text-white text-base tracking-tight">Tri-City Volleyball</div>
                <div className="text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent uppercase tracking-widest">Academy</div>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md shadow-blue-200"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{label}</span>
                    </>
                  )}
                </NavLink>
              ))}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link to="/register" className="ml-3 px-5 py-2 btn-gradient text-white rounded-xl text-sm font-bold shadow-md">
                  Register Now
                </Link>
              </motion.div>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              className="md:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setOpen(!open)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block h-0.5 bg-white rounded-full origin-center"
                animate={{ width: open ? 24 : 24, rotate: open ? 45 : 0, y: open ? 8 : 0 }}
                transition={{ duration: 0.3, ease }}
              />
              <motion.span
                className="block h-0.5 bg-white rounded-full"
                animate={{ width: open ? 0 : 18, opacity: open ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 bg-white rounded-full origin-center"
                animate={{ width: open ? 24 : 24, rotate: open ? -45 : 0, y: open ? -8 : 0 }}
                transition={{ duration: 0.3, ease }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-slate-950 flex flex-col"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl" />
            </div>

            <div className="relative flex flex-col justify-center flex-1 px-8 py-24">
              <nav className="space-y-2">
                {links.map(({ to, label, num }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease }}
                  >
                    <NavLink
                      to={to}
                      end={to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `group flex items-baseline gap-4 py-4 border-b border-white/10 last:border-0 ${
                          isActive ? 'text-cyan-400' : 'text-white'
                        }`
                      }
                    >
                      <span className="text-xs font-bold text-slate-600 font-mono">{num}</span>
                      <span className="text-4xl font-black tracking-tight group-hover:text-cyan-400 transition-colors duration-200">{label}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.42, duration: 0.4, ease }}
              >
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="block w-full py-4 btn-gradient text-white rounded-2xl text-lg font-black text-center shadow-xl"
                >
                  Register Now — First Session FREE
                </Link>
              </motion.div>

              <motion.div
                className="mt-8 flex flex-col gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a href="tel:+13417778673" className="text-slate-400 text-sm font-medium">(341) 777-8673</a>
                <a href="mailto:volleyballtricity@gmail.com" className="text-slate-400 text-sm font-medium">volleyballtricity@gmail.com</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
