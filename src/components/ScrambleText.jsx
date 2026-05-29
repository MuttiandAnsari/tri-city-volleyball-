import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

export default function ScrambleText({ text, className = '', delay = 0, speed = 35 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(text)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (!isInView) return

    timeoutRef.current = setTimeout(() => {
      let frame = 0
      const totalFrames = text.length * 4

      intervalRef.current = setInterval(() => {
        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ' || char === '.' || char === '!' || char === '-') return char
            if (frame >= i * 4) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          }).join('')
        )
        frame++
        if (frame >= totalFrames) {
          clearInterval(intervalRef.current)
          setDisplay(text)
        }
      }, speed)
    }, delay * 1000)

    return () => {
      clearTimeout(timeoutRef.current)
      clearInterval(intervalRef.current)
    }
  }, [isInView, text, delay, speed])

  return <span ref={ref} className={className}>{display}</span>
}
