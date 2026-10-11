import { motion, useReducedMotion } from 'framer-motion'
import { HiArrowRight, HiMapPin } from 'react-icons/hi2'
import { profile, socialList } from '../data/portfolio'
import useTypewriter from '../hooks/useTypewriter'
import ResumeButton from './ResumeButton'
import HeroVisual from './HeroVisual'
import { useMediaQuery } from './Effects'

const ease = [0.22, 1, 0.36, 1]
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}
// Each word slides up from behind a mask.
const word = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.9, ease } },
}

function MaskedWords({ text, className = '' }) {
  return text.split(' ').map((w, i) => (
    <span key={i}>
      <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
        <motion.span variants={word} className={`inline-block ${className}`}>
          {w}
        </motion.span>
      </span>{' '}
    </span>
  ))
}

// Isolated so each typed character re-renders only this span, not the whole hero.
function RoleTicker() {
  const reduceMotion = useReducedMotion()
  const role = useTypewriter(profile.roles, { enabled: !reduceMotion })
  return <span aria-hidden>{role}</span>
}

export default function Hero() {
  // The orb is desktop-only; don't mount it (and its infinite animations) on smaller screens.
  const showVisual = useMediaQuery('(min-width: 1024px)')

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 sm:pt-32"
    >
      {/* Ambient background */}
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div aria-hidden className="absolute -left-32 top-16 h-72 w-72 rounded-full bg-brand-600/25 blur-[90px] md:h-[28rem] md:w-[28rem] md:animate-blob md:blur-[120px]" />
      <div aria-hidden className="absolute -right-32 top-1/3 h-64 w-64 rounded-full bg-accent-500/15 blur-[90px] md:h-[26rem] md:w-[26rem] md:animate-blob md:blur-[120px] md:[animation-delay:-6s]" />

      <div className="container-x relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <motion.div variants={container} initial="hidden" animate="show" className="min-w-0">
          {profile.available && (
            <motion.div
              variants={item}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3.5 py-1.5 text-xs font-medium text-emerald-200 sm:text-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Open to new opportunities
            </motion.div>
          )}

          <motion.p variants={item} className="font-mono text-sm text-accent-400 sm:text-base">
            Hi, I&apos;m <span className="text-white">{profile.name}</span> 👋
          </motion.p>

          <motion.h1
            variants={container}
            className="mt-4 font-display text-[clamp(2.25rem,8vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white"
          >
            <MaskedWords text="Building Digital Experiences" />
            <MaskedWords text="That Feel Different." className="gradient-text animate-shimmer" />
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-6 flex min-h-[2.25rem] flex-wrap items-center font-mono text-base text-slate-200 sm:text-xl"
          >
            <span className="sr-only">Roles: {profile.roles.join(', ')}</span>
            <span aria-hidden className="mr-2 text-brand-400">&gt;</span>
            <RoleTicker />
            <span aria-hidden className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-accent-400 sm:h-6" />
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Full Stack Developer crafting responsive React.js interfaces, secure Node.js backends and REST APIs,
            and AI-powered applications — with a focus on clean code and thoughtful user experience.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap sm:gap-4">
            <a href="#projects" className="btn-primary group">
              Explore My Work
              <HiArrowRight aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <ResumeButton className="btn-ghost w-full min-[420px]:w-auto" />
          </motion.div>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
            <div className="flex gap-3">
              {socialList.map(({ name, icon: Icon, url }) => (
                <motion.a
                  key={name}
                  href={url}
                  target={url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={name}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  className="icon-btn"
                >
                  <Icon aria-hidden className="h-[18px] w-[18px]" />
                </motion.a>
              ))}
            </div>
            <span aria-hidden className="hidden h-px w-10 bg-white/20 sm:block" />
            <span className="flex items-center gap-1.5 text-sm text-slate-400">
              <HiMapPin aria-hidden className="text-brand-400" /> {profile.location}
            </span>
          </motion.div>
        </motion.div>

        {showVisual && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
          >
            <HeroVisual />
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-400 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <span className="flex h-11 w-6 justify-center rounded-full border-2 border-white/20 pt-2">
          <motion.span
            className="h-2 w-1 rounded-full bg-white/70"
            animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </span>
        Scroll
      </motion.a>
    </section>
  )
}
