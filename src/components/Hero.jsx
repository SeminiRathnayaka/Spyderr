import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import heroMask from '../assets/hero-mask.jpg'
import heroPhoto from '../assets/hero-photo.jpg'

export default function Hero() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const maskRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const el = maskRef.current
    if (!card || !el) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-eyebrow', { y: 14, opacity: 0, duration: 0.45 })
        .from('.hero-title-line', { y: 48, opacity: 0, duration: 0.9, stagger: 0.16 })
        .from('.hero-sub', { y: 22, opacity: 0, duration: 0.6 })
        .from('.hero-cta', { y: 18, opacity: 0, duration: 0.55 })
        .from('.hero-card-reveal', { opacity: 0, duration: 0.9 })
        .from('.hero-hint', { opacity: 0, duration: 0.7 })
        .eventCallback('onComplete', activate)
    }, sectionRef)

    // ---- cursor "wipe reveal" logic (clip-path, GPU friendly) ----
    const cursor = { x: 0, y: 0, size: 120 }
    const hasHover = window.matchMedia('(hover: hover)').matches

    const draw = () => {
      el.style.clipPath = `circle(${cursor.size}px at ${cursor.x}px ${cursor.y}px)`
      el.style.webkitClipPath = el.style.clipPath
    }

    const qx = gsap.quickTo(cursor, 'x', { duration: 0.12, ease: 'power3.out', onUpdate: draw })
    const qy = gsap.quickTo(cursor, 'y', { duration: 0.12, ease: 'power3.out', onUpdate: draw })

    let rect = card.getBoundingClientRect()
    let rafId = null

    const onMove = (e) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        qx(e.clientX - rect.left)
        qy(e.clientY - rect.top)
        rafId = null
      })
    }

    const onResize = () => { rect = card.getBoundingClientRect() }

    const onEnter = (e) => {
      rect = card.getBoundingClientRect()
      cursor.x = e.clientX - rect.left
      cursor.y = e.clientY - rect.top
      gsap.to(cursor, {
        size: Math.min(rect.width, rect.height) * 0.6,
        duration: 0.35,
        ease: 'power2.out',
        onUpdate: draw,
      })
    }

    const onLeave = () => {
      gsap.to(cursor, { size: 0, duration: 0.5, ease: 'power2.inOut', onUpdate: draw })
    }

    function activate() {
      window.addEventListener('resize', onResize)
      if (hasHover) {
        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseenter', onEnter)
        card.addEventListener('mouseleave', onLeave)
      } else {
        cursor.x = card.offsetWidth / 2
        cursor.y = card.offsetHeight / 2
        cursor.size = Math.min(card.offsetWidth, card.offsetHeight) * 0.55
      }
      draw()
    }

    draw()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      ctx.revert()
      window.removeEventListener('resize', onResize)
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hook-cursor relative flex min-h-screen items-center overflow-hidden bg-white"
    >
      {/* PHOTO + MASK — FULL SCREEN, photo on top (visible), Spider-Man mask hidden behind */}
      <div ref={cardRef} className="hero-card-reveal absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#16161a]" />
        <img
          src={heroMask}
          alt="Spider-Man mask"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          ref={maskRef}
          src={heroPhoto}
          alt="Person"
          className="absolute inset-0 z-[1] h-full w-full object-cover"
          style={{ willChange: 'clip-path' }}
        />
      </div>

      {/* TEXT — always on the clean/gradient-protected background */}
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-28 md:px-8 md:pt-24">
        <div className="max-w-xl text-left" style={{ textAlign: 'left' }}>
          <p className="hero-eyebrow mb-6 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-accent">
            Aspiring Robotics &amp; AI Engineer
          </p>
          <h1 className="text-left font-sans font-black uppercase leading-[0.95] tracking-tight">
            <span className="hero-title-line block text-5xl font-extrabold text-gray-900 sm:text-6xl">
              Hi, I&apos;m
            </span>
            <span className="hero-title-line hero-lockup block italic text-4xl text-gray-900 sm:text-5xl md:text-6xl">
              {"YASHODYA".split("").map((letter, i) => (
                <span key={i} className="hero-letter inline-block">{letter}</span>
              ))}
            </span>
            <span className="hero-title-line block text-left text-base font-normal not-italic tracking-[0.25em] text-gray-700 sm:text-lg">
                RATHNAYAKA
            </span>
          </h1>
          <p className="hero-sub mt-6 text-left text-base font-medium text-gray-700 sm:text-lg">
            Building AI that listens, sees and cares - turning computer vision and
            language models into tools that make healthcare simpler for everyone.
          </p>
          <div className="hero-cta pointer-events-auto mt-10 flex flex-col items-start justify-start gap-4">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative overflow-hidden bg-accent px-8 py-3.5 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-black transition-shadow hover:shadow-[0_8px_30px_var(--glow)]"
            >
              Explore Projects
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
            <a
              href="/resume.pdf"
              download
              className="border border-gray-400 px-8 py-3.5 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gray-800 transition-colors hover:border-accent hover:text-accent"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>

      <p className="hero-hint pointer-events-none absolute bottom-8 right-8 z-10 text-right font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gray-500">
        Hover to reveal
      </p>
    </section>
  )
}