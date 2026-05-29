import { useEffect, useRef } from 'react'

const COLORS = ['#06b6d4', '#38bdf8', '#7dd3fc', '#a5f3fc', '#ffffff', '#3b82f6']

function makeParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -(0.2 + Math.random() * 0.5),
    radius: 0.6 + Math.random() * 1.8,
    glow: 3 + Math.random() * 8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: 0.2 + Math.random() * 0.5,
    streak: Math.random() < 0.2,
    streakLen: 10 + Math.random() * 20,
  }
}

export default function HeroParticles({ count = 120 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: count }, () =>
      makeParticle(canvas.width, canvas.height)
    )

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        ctx.save()
        ctx.globalAlpha = p.alpha

        if (p.streak) {
          const sx = p.x - (p.vx / Math.abs(p.vy || 0.01)) * p.streakLen
          const sy = p.y + p.streakLen
          const grad = ctx.createLinearGradient(p.x, p.y, sx, sy)
          grad.addColorStop(0, p.color)
          grad.addColorStop(1, 'transparent')
          ctx.strokeStyle = grad
          ctx.lineWidth = p.radius * 0.8
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(sx, sy)
          ctx.stroke()
        } else {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius + p.glow)
          grad.addColorStop(0, '#ffffff')
          grad.addColorStop(0.25, p.color)
          grad.addColorStop(1, 'transparent')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius + p.glow, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()

        p.x += p.vx
        p.y += p.vy

        if (p.y < -30) {
          const fresh = makeParticle(canvas.width, canvas.height)
          Object.assign(p, fresh, { y: canvas.height + 10 })
        }
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
    />
  )
}
