const QUICK_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
]

const CONNECT = [
  { label: 'GitHub', href: 'https://github.com/SeminiRathnayaka' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/semini-rathnayaka-07a72b393' },
  { label: 'Email', href: 'mailto:hello@yashodya.dev' },
]

export default function Footer() {
  const scrollTo = (href) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-5xl px-5 py-16 md:px-8">
        {/* Tagline */}
        <p className="mb-12 max-w-md text-lg leading-relaxed text-muted sm:text-xl">
          Building things that listens, understands, and heals.
        </p>

        {/* Links grid */}
        <div className="grid grid-cols-2 gap-10 sm:gap-16 md:w-md">
          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-base text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
              Connect
            </h4>
            <ul className="space-y-3">
              {CONNECT.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="text-base text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-14 border-t border-border pt-8">
          <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted">
            &copy; 2026 Yashodya Rathnayaka &middot; Built with &#10084; React + GSAP &middot; Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  )
}
