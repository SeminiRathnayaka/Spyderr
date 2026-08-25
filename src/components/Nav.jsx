import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

export default function Nav({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-border bg-bg/80 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 md:px-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-sans text-lg tracking-tight"
            style={{ fontWeight: 800 }}
          >
            YASHODYA
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="menu-grow font-mono text-[0.85rem] uppercase tracking-[0.18em] text-muted"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted"
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-text"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile slide-in panel */}
      <div
        className={`fixed inset-0 z-40 bg-bg transition-transform duration-500 md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col items-start justify-center gap-8 px-10">
          {LINKS.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-4xl font-extrabold tracking-tight"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="mr-3 font-mono text-sm text-accent">{`0${i + 1}`}</span>
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}