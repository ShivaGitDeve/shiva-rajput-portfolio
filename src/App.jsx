import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { ScrollProgress, CursorGlow, BackToTop } from './components/Effects'

// The page is rendered client-side, so the browser's own jump to a URL fragment
// (e.g. /#projects after a refresh) happens before the target exists. Re-apply it
// after mount, and again once web fonts have loaded and settled the layout.
function useInitialHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const jump = () => document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    const frame = requestAnimationFrame(jump)
    document.fonts?.ready.then(jump)
    return () => cancelAnimationFrame(frame)
  }, [])
}

export default function App() {
  useInitialHashScroll()

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  )
}
