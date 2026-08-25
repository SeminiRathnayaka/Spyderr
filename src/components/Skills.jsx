import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { name: 'Python', cat: 'AI/ML · Robotics', level: 'Proficient' },
  { name: 'Java', cat: 'Backend · Tooling', level: 'Proficient' },
  { name: 'C', cat: 'Firmware · Fundamentals', level: 'Proficient' },
  { name: 'OpenCV', cat: 'Computer Vision', level: 'Learning' },
  { name: 'MediaPipe', cat: 'Hand / Gesture Tracking', level: 'Learning' },
  { name: 'React', cat: 'Dashboards · Frontend', level: 'Proficient' },
  { name: 'Scikit-learn', cat: 'ML Pipelines', level: 'Proficient' },
  { name: 'Robotics', cat: 'Mechanics · Control', level: 'Learning' },
  { name: 'UI/UX Basics', cat: 'Interface Design', level: 'Proficient' },
  { name: 'Git & GitHub', cat: 'Version Control', level: 'Proficient' },
]

function LevelDot({ level }) {
  const isLearning = level === 'Learning'
  return (
    <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.15em]">
      <span
        className={`skill-dot inline-block h-2 w-2 animate-pulse rounded-full ${
          isLearning ? 'bg-accent-red' : 'bg-accent-blue'
        }`}
      >
        <span className="absolute inset-0 rounded-full opacity-50" />
      </span>
      <span className="skill-level">{level}</span>
    </span>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-item', {
        y: 34,
        opacity: 0,
        scale: 0.96,
        ease: 'back.out(1.5)',
        stagger: 0.05,
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
    <section ref={sectionRef} id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-muted">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent-blue align-middle" />
          Capabilities
        </p>
        <h2 className="mb-12 font-sans text-4xl font-black uppercase tracking-tight sm:text-5xl">
          What I <span className="italic text-accent">Build</span> With
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {SKILLS.map((skill) => (
            <div key={skill.name} className="skills-item skill-card rounded-lg p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="skill-name font-sans text-lg font-bold tracking-tight">
                    {skill.name}
                  </p>
                  <p className="skill-cat mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                    {skill.cat}
                  </p>
                </div>
                <LevelDot level={skill.level} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}