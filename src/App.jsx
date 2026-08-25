import Nav from './components/Nav'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Particles from './components/Particles'
import useTheme from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      {/* Dark-mode ambient background — behind everything */}
      <div className="pointer-events-none fixed inset-0 z-[-3] bg-bg" />

      <Particles />

      <Nav theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  )
}