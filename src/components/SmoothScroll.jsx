import { useEffect } from 'react'
import Lenis from 'lenis'

// Module-level ref so ScrollReset can access the instance
let lenisInstance = null
export function getLenis() { return lenisInstance }

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenisInstance = lenis

    lenis.on('scroll', ({ scroll }) => {
      window.dispatchEvent(new Event('scroll'))
      document.documentElement.scrollTop = scroll
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return null
}
