import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    name: 'Orayan AI',
    desc: 'Orayan - the friend who turns "medical mumbo-jumbo" into "oh, now I get it!" Built for Sri Lankan elders and patients who feel scared when they read their own reports. Orayan reads the report and explains it in simple Sinhala or easy English, like a kind grandchild sitting beside you. No more Google-searching scary words at midnight.',
    tags: ['Python', 'NLP', 'Healthcare', 'Sinhala Localization'],
    inProgress: false,
  },
  {
    name: 'ASTERIA',
    desc: 'Therapy... but make it a game. ASTERIA turns hand exercises into fun puzzles using just a camera - no expensive equipment needed. Built for children with paralysis or disability, so their "boring therapy session" becomes "can I play one more round?" Small movements, big smiles.',
    tags: ['OpenCV', 'MediaPipe', 'Python', 'Accessibility'],
    inProgress: true,
  },
  {
    name: 'Baymax',
    desc: 'Your own health buddy, living quietly inside your laptop - no internet needed, no data leaving your machine. Ask it anything about health in simple English, and it talks back like a calm, caring assistant. Inspired by the big white robot, minus the inflatable body - just the heart.',
    tags: ['Python', 'Local LLM', 'Voice', 'Health Assistant'],
    inProgress: true,
  },
  {
    name: 'SPEAK SILENCE',
    desc: 'Some patients can\'t speak. This app makes sure they\'re still heard. It watches hand gestures and instantly turns them into text and voice - in Sinhala and English - so deaf and mute patients in hospitals aren\'t left in silence during their most vulnerable moments. Starting with 15 gestures that matter most in a hospital. Small vocabulary, huge impact.\n\n"They are speaking!! You just couldn\'t hear them - until now."',
    tags: ['MediaPipe', 'OpenCV', 'Scikit-learn', 'gTTS', 'Accessibility'],
    inProgress: true,
  },
]

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-item', {
        y: 40,
        opacity: 0,
        scale: 0.97,
        ease: 'back.out(1.5)',
        stagger: 0.08,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-muted">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
          Selected Work
        </p>
        <h2 className="mb-12 font-sans text-4xl font-black uppercase tracking-tight sm:text-5xl">
          Things I&apos;m <span className="italic text-accent">Building</span>
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <article
              key={project.name}
              className="projects-item group relative overflow-hidden rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent"
            >
              {/* top accent bar */}
              <span className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />

              <div className="flex items-start justify-between gap-4">
                <h3 className="font-sans text-2xl font-extrabold tracking-tight">
                  {project.name}
                </h3>
                <span className="inline-flex translate-x-0 -rotate-12 items-center text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:rotate-0 group-hover:text-accent">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </span>
              </div>

              {project.inProgress && (
                <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  In Progress
                </span>
              )}

              <div className="mt-4 space-y-3">
                {project.desc.split('\n\n').map((para, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted">
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="pill text-[0.55rem]">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}