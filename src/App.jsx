import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useEffect } from 'react'

const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AnnouncementBanner from './components/AnnouncementBanner'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import LocationToast from './components/LocationToast'
function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
import Home from './pages/Home'
import OpenPlay from './pages/OpenPlay'
import Tournaments from './pages/Tournaments'
import Contact from './pages/Contact'
import OpenPlayRegister from './pages/OpenPlayRegister'
import TournamentRegister from './pages/TournamentRegister'
import TournamentAdmin from './pages/TournamentAdmin'
import Roster from './pages/Roster'

// Single source of truth — the mobile and desktop branches below both render this,
// so a new route can never land in one and not the other.
function SiteRoutes({ location }) {
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/open-play" element={<OpenPlay />} />
      <Route path="/tournaments" element={<Tournaments />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<OpenPlayRegister />} />
      <Route path="/tournament-register" element={<TournamentRegister />} />
      <Route path="/roster" element={<Roster />} />
      {/* Pre-rebrand URL */}
      <Route path="/practices" element={<Navigate to="/open-play" replace />} />
    </Routes>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  // Admin page has no navbar/footer
  if (location.pathname === '/admin') return <TournamentAdmin />
  return (
    <>
    <ScrollReset />
    {/* On mobile: no page transition — transform on the page wrapper kills native scroll speed */}
    {isTouch ? (
      <SiteRoutes location={location} />
    ) : (
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ width: '100%' }}
        >
          <SiteRoutes location={location} />
        </motion.div>
      </AnimatePresence>
    )}
    </>
  )
}

export default function App() {
  return (
    // On mobile: reducedMotion="always" disables every framer-motion animation globally
    // — no whileInView, no entrance animations, nothing firing mid-scroll
    <MotionConfig reducedMotion={isTouch ? 'always' : 'never'}>
    <BrowserRouter>
      <ScrollProgress />
      <ScrollToTop />
      <LocationToast />
      <div className="flex flex-col text-gray-900" style={{ width: '100%', maxWidth: '100%', minHeight: '100svh' }}>
        <AnnouncementBanner />
        <Navbar />
        <main className="flex-1" style={{ width: '100%' }}>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    </MotionConfig>
  )
}
