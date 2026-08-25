import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/SeminiRathnayaka',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.41 1.02.01 2.04.14 3 .41 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.82 1.11.82 2.24v3.32c0 .32.22.7.82.58A12 12 0 0 0 24 12C24 5.37 18.63 0 12 0Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/semini-rathnayaka-07a72b393',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77A1.76 1.76 0 0 0 0 1.75v20.5A1.76 1.76 0 0 0 1.77 24h20.45A1.77 1.77 0 0 0 24 22.25V1.75A1.76 1.76 0 0 0 22.22 0Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/nsy_rathnayaka_/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.088 4.088 0 0 1 1.47.957c.453.453.738.898.957 1.47.164.46.35 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.088 4.088 0 0 1-.957 1.47 4.088 4.088 0 0 1-1.47.957c-.46.164-1.26.35-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.088 4.088 0 0 1-1.47-.957 4.088 4.088 0 0 1-.957-1.47c-.164-.46-.35-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43A4.088 4.088 0 0 1 3.593 3.25a4.088 4.088 0 0 1 1.47-.957c.46-.164 1.26-.35 2.43-.403C8.76 2.175 9.14 2.163 12 2.163Zm0 1.802c-3.15 0-3.504.013-4.74.07-1.07.049-1.65.228-2.035.38a3.42 3.42 0 0 0-1.295.837 3.42 3.42 0 0 0-.837 1.295c-.152.385-.331.965-.38 2.035-.057 1.236-.07 1.59-.07 4.74s.013 3.504.07 4.74c.049 1.07.228 1.65.38 2.035.174.532.393.974.837 1.295.321.444.763.663 1.295.837.385.152.965.331 2.035.38 1.236.057 1.59.07 4.74.07s3.504-.013 4.74-.07c1.07-.049 1.65-.228 2.035-.38a3.42 3.42 0 0 0 1.295-.837c.444-.321.663-.763.837-1.295.152-.385.331-.965.38-2.035.057-1.236.07-1.59.07-4.74s-.013-3.504-.07-4.74c-.049-1.07-.228-1.65-.38-2.035a3.42 3.42 0 0 0-.837-1.295 3.42 3.42 0 0 0-1.295-.837c-.385-.152-.965-.331-2.035-.38-1.236-.057-1.59-.07-4.74-.07Zm0 3.07a4.965 4.965 0 1 1 0 9.93 4.965 4.965 0 0 1 0-9.93Zm0 1.802a3.163 3.163 0 1 0 0 6.326 3.163 3.163 0 0 0 0-6.326Zm6.336-3.09a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0Z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:hello@yashodya.dev',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const statusRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(['.contact-head', '.contact-field'], {
        y: 28,
        opacity: 0,
        stagger: 0.07,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!submitted) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.check-circle',
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.7)' }
      )
      gsap.fromTo(
        '.check-mark',
        { strokeDashoffset: 60 },
        { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out', delay: 0.15 }
      )
    }, statusRef)

    const t = setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', message: '' })
    }, 4000)

    return () => {
      ctx.revert()
      clearTimeout(t)
    }
  }, [submitted])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSubmitted(true)
  }

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden py-24 md:py-32">
      {/* ambient blurred circle */}
      <div className="blob-blur left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2" style={{ background: 'var(--accent)', opacity: 0.05 }} />

      <div className="relative mx-auto max-w-3xl px-5 md:px-8">
        <div className="contact-head mb-10 text-center">
          <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-muted">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent-red align-middle" />
            Get in Touch
          </p>
          <h2 className="font-sans text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Let&apos;s Build <span className="italic text-accent">Together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-muted">
            Have a project, an idea for healthcare tech, or just want to say hi?
            My inbox is always open.
          </p>
        </div>

        <div
          ref={statusRef}
          className="rounded-xl border border-border bg-surface p-6 sm:p-8"
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <svg width="64" height="64" viewBox="0 0 40 40" fill="none">
                <circle className="check-circle" cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent)', opacity: 0 }} />
                <path
                  className="check-mark"
                  d="M12 20.5 17.5 26 28 14.5"
                  stroke="#000"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  strokeDasharray="60"
                  strokeDashoffset="60"
                />
              </svg>
              <p className="font-sans text-xl font-bold">Message sent!</p>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                I&apos;ll get back to you soon
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  className="contact-field w-full border-b border-border bg-transparent px-1 py-3 font-sans text-base outline-none transition-colors placeholder:text-muted focus:border-accent"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={update('name')}
                  required
                />
                <input
                  className="contact-field w-full border-b border-border bg-transparent px-1 py-3 font-sans text-base outline-none transition-colors placeholder:text-muted focus:border-accent"
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={update('email')}
                  required
                />
              </div>
              <textarea
                className="contact-field w-full resize-none border-b border-border bg-transparent px-1 py-3 font-sans text-base outline-none transition-colors placeholder:text-muted focus:border-accent"
                rows="4"
                placeholder="Your message…"
                value={form.message}
                onChange={update('message')}
                required
              />
              <button
                type="submit"
                className="contact-field mt-2 bg-accent px-8 py-3.5 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-black transition-shadow hover:shadow-[0_8px_30px_var(--glow)]"
              >
                Send Message
              </button>
            </form>
          )}

          <div className="mt-8 flex items-center justify-center gap-4 border-t border-border pt-8">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={social.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted transition-all duration-300 hover:border-accent hover:bg-accent hover:text-black"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}