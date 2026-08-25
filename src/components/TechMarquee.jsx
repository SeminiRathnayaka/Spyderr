import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const ROW_1 = [
  'Python',
  'OpenCV',
  'MediaPipe',
  'React',
  'TensorFlow',
  'Scikit-learn',
  'Robotics',
  'AI/ML',
]

const ROW_2 = [
  'Computer Vision',
  'Gesture Recognition',
  'Healthcare Tech',
  'Java',
  'C',
  'Health Informatics',
]

function Batch({ items }) {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span
            className={`marquee-pill ${Math.random() > 0.5 ? 'mp-red' : 'mp-blue'}`}
          >
            {item}
          </span>
          <span className="mx-6 h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      ))}
    </div>
  )
}

export default function TechMarquee() {
  const sectionRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)
  const tweensRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.fromTo(
        row1Ref.current,
        { xPercent: 0 },
        { xPercent: -33.333, repeat: -1, duration: 18, ease: 'none' }
      )
      gsap.set(row2Ref.current, { xPercent: -33.333 })
      const t2 = gsap.to(row2Ref.current, {
        xPercent: 0,
        repeat: -1,
        duration: 26,
        ease: 'none',
      })
      tweensRef.current = [t1, t2]
    }, sectionRef)

    const slowDown = () => {
      tweensRef.current.forEach((t) => t && gsap.to(t, { timeScale: 0.12, duration: 0.3 }))
    }
    const restore = () => {
      tweensRef.current.forEach((t) => t && gsap.to(t, { timeScale: 1, duration: 0.3 }))
    }

    const section = sectionRef.current
    section.addEventListener('mouseenter', slowDown)
    section.addEventListener('mouseleave', restore)

    return () => {
      ctx.revert()
      section.removeEventListener('mouseenter', slowDown)
      section.removeEventListener('mouseleave', restore)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center overflow-hidden py-8"
      style={{ height: '18vh', minHeight: '140px' }}
      aria-hidden="true"
    >
      <div className="rotate-2" style={{ marginLeft: '-7%', width: '114%' }}>
        <div ref={row1Ref} className="flex w-max">
          {[...Array(3)].map((_, i) => (
            <Batch key={i} items={ROW_1} />
          ))}
        </div>
      </div>
      <div className="mt-6 -rotate-2" style={{ marginLeft: '-7%', width: '114%' }}>
        <div ref={row2Ref} className="flex w-max">
          {[...Array(3)].map((_, i) => (
            <Batch key={i} items={ROW_2} />
          ))}
        </div>
      </div>
    </section>
  )
}