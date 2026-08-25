import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profile from '../assets/profile.jpg'

gsap.registerPlugin(ScrollTrigger)

const STACK = ['Python', 'Java', 'C', 'OpenCV', 'MediaPipe', 'React']

export default function About() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const dropRef = useRef(null)
  const swayRef = useRef(null)
  const bandRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stage = stageRef.current
      const HOLE_Y = 40 // distance from stage top to card top (marginTop) — where the string ties
      const startY = -Math.max(stage.offsetHeight, 480) - 40

      const drop = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top bottom',
          end: 'top 30%',
          scrub: 0.5,
        },
      })

      drop.fromTo(
        dropRef.current,
        { y: startY, rotation: -7 },
        {
          y: 0,
          rotation: 0,
          onUpdate: () => {
            const y = gsap.getProperty(dropRef.current, 'y')
            gsap.set(bandRef.current, { height: Math.abs(y) + HOLE_Y })
          },
        }
      )

      gsap.to(swayRef.current, {
        rotation: 1.6,
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to(swayRef.current, {
        boxShadow: '0 22px 60px rgba(0,0,0,0.18)',
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

      gsap.from('.about-eyebrow', {
        opacity: 0,
        y: 16,
        duration: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.from(
        '.about-heading',
        {
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
          duration: 0.9,
          ease: 'power3.out',
        },
        0.1
      )
        .from('.about-p', { y: 26, opacity: 0, stagger: 0.12, duration: 0.6 }, '-=0.5')
        .from('.about-pill', {
          y: 16,
          opacity: 0,
          stagger: 0.07,
          duration: 0.5,
          ease: 'back.out(1.4)',
        }, '-=0.4')

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto grid max-w-5xl gap-16 px-5 md:grid-cols-2 md:px-8 md:gap-12">
        {/* Text column */}
        <div>
          <p className="about-eyebrow mb-4 flex items-center gap-2 font-mono text-[0.8rem] uppercase tracking-[0.24em] text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-red" />
            Behind the Mask
          </p>
          <h2
            className="about-heading font-sans text-4xl font-black uppercase tracking-tight sm:text-5xl"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          >
            Hi, I&apos;m <span className="italic text-accent">YASHODYA.</span>
          </h2>

          <p className="about-p mt-8 text-lg leading-relaxed text-muted sm:text-xl">
            I&apos;m First-year BHICT undergraduate with a curious mind and a habit of asking, “What if we could make this better?”🚀
            I&apos;m passionate about AI, healthcare, and building technology that actually feels useful to people. 
            I love working with a team, learning new things, turning ideas into projects, and occasionally breaking things just to figure out how they work.😄
            My goal is to create healthcare technology that is inclusive, accessible, and genuinely human.
            Still learning. Still building. Still curious.
            And I am just getting started!!🤖

          </p>
          <p className="about-p mt-5 text-lg leading-relaxed text-muted sm:text-xl">
             My goal is to create healthcare technology that is inclusive, accessible, and genuinely human!!
             Still learning. Still building. Still curious.
          </p>

          <p className="about-p mt-9 mb-4 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-muted">
            Primary Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {STACK.map((item) => (
              <span key={item} className="about-pill pill">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ID card column */}
        <div ref={stageRef} className="relative">
          {/* Lanyard string */}
          <div
            ref={bandRef}
            className="absolute left-1/2 top-0 w-px -translate-x-1/2"
            style={{
              height: 0,
              background: 'var(--text-muted)',
              opacity: 0.6,
            }}
          >
            {/* knot where the string meets the card */}
            <span
              className="absolute -bottom-[2px] left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full"
              style={{ background: 'var(--text-muted)', opacity: 0.8 }}
            />
          </div>

          {/* drop wrapper — the full ID card, hanging on the string */}
          <div ref={dropRef} className="relative" style={{ marginTop: '40px' }}>
            <div
              ref={swayRef}
              className="mx-auto w-full max-w-[300px]"
              style={{ transformOrigin: '50% 0%' }}
            >
              <img
                src={profile}
                alt="Yashodya band ID"
                className="h-auto w-full rounded-md shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}