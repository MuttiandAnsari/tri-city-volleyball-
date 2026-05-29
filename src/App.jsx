import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import SmoothScroll from './components/SmoothScroll'

function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import Home from './pages/Home'
import Clinics from './pages/Clinics'
import Tournaments from './pages/Tournaments'
import Contact from './pages/Contact'
import ClinicRegister from './pages/ClinicRegister'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <>
    <ScrollReset />
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ width: '100%' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<ClinicRegister />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <ScrollProgress />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col text-gray-900" style={{ width: '100%', maxWidth: '100%' }}>
        <Navbar />
        <main className="flex-1" style={{ width: '100%' }}>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
