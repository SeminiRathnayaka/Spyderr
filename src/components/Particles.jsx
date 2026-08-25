import { useEffect, useRef } from 'react'

const DOT_COUNT = 50
const CONNECT_DIST = 140
const DOT_RADIUS = 1.2
const LINE_ALPHA = 0.06
const DOT_ALPHA = 0.12
const SPEED = 0.15

export default function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let dots = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function init() {
      resize()
      dots = Array.from({ length: DOT_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
      }))
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const a = LINE_ALPHA * (1 - dist / CONNECT_DIST)
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(160,160,154,${a})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      for (const d of dots) {
        ctx.beginPath()
        ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(160,160,154,${DOT_ALPHA})`
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    init()
    tick()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}
