import { useEffect, useRef } from 'react'

const COLORS = ['#06b6d4', '#0ea5e9', '#38bdf8', '#7dd3fc', '#1d4ed8', '#3b82f6', '#ffffff']

function makeParticle(canvasWidth, canvasHeight) {
  const onLeft = Math.random() < 0.5
  return {
    x: onLeft
      ? Math.random() * canvasWidth * 0.18
      : canvasWidth * 0.82 + Math.random() * canvasWidth * 0.18,
    y: Math.random() * canvasHeight,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -(0.25 + Math.random() * 0.7),
    radius: 0.8 + Math.random() * 2.4,
    glow: 4 + Math.random() * 10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: 0.35 + Math.random() * 0.65,
    streak: Math.random() < 0.28,
    streakLen: 14 + Math.random() * 28,
    onLeft,
  }
}

export default function ParticleSides({ count = 90 }) {
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
          // Light streak — thin line trailing upward
          const sx = p.x - (p.vx / Math.abs(p.vy)) * p.streakLen
          const sy = p.y + p.streakLen
          const grad = ctx.createLinearGradient(p.x, p.y, sx, sy)
          grad.addColorStop(0, p.color)
          grad.addColorStop(1, 'transparent')
          ctx.strokeStyle = grad
          ctx.lineWidth = p.radius * 0.9
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(sx, sy)
          ctx.stroke()
        } else {
          // Glowing dot
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius + p.glow)
          grad.addColorStop(0, '#ffffff')
          grad.addColorStop(0.2, p.color)
          grad.addColorStop(1, 'transparent')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius + p.glow, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()

        // Move upward
        p.x += p.vx
        p.y += p.vy

        // Reset when off the top
        if (p.y < -p.streakLen - 20) {
          const fresh = makeParticle(canvas.width, canvas.height)
          Object.assign(p, fresh, { y: canvas.height + 20 })
        }
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
