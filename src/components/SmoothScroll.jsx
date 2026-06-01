import { useEffect } from 'react'
import Lenis from 'lenis'

// Module-level ref so ScrollReset can access the instance
let lenisInstance = null
export function getLenis() { return lenisInstance }

// Detect touch/mobile devices — let native scroll handle them
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export default function SmoothScroll() {
  useEffect(() => {
    // On mobile/touch devices native scrolling is smoother — skip Lenis
    if (isTouchDevice()) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      infinite: false,
    })

    lenisInstance = lenis

    lenis.on('scroll', () => {
      window.dispatchEvent(new Event('scroll'))
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
