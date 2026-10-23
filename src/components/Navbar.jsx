import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiBars3, HiXMark } from 'react-icons/hi2'
import { navLinks, profile, socialList } from '../data/portfolio'
import useActiveSection from '../hooks/useActiveSection'
import ResumeButton from './ResumeButton'
import Logo from './Logo'

const sectionIds = navLinks.map((l) => l.id)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Close the mobile menu when resizing up to desktop.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        aria-label="Primary"
        // backdrop-blur only from md up: on phones a blurred fixed bar must be re-rendered on every
        // scroll frame, which made scrolling and the menu janky
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-3 py-2.5 transition-[background-color,border-color,box-shadow] duration-300 sm:px-5 ${
          scrolled || open
            ? 'border-white/10 bg-ink-950/95 shadow-2xl shadow-black/40 md:bg-ink-950/70 md:backdrop-blur-xl'
            : 'border-transparent'
        }`}
      >
        <a href="#home" className="group flex items-center gap-2.5 rounded-xl" aria-label={`${profile.name} — home`}>
          <Logo className="h-10 w-10 transition-transform duration-300 group-hover:scale-105" />
          {/* name hidden at tablet width where six links + Resume leave no room; the link keeps its aria-label */}
          <span className="whitespace-nowrap font-display text-lg font-semibold text-white md:max-lg:hidden">
            {profile.name}
            <span className="text-accent-400">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative block rounded-lg px-3 py-2 text-sm font-medium transition-colors lg:px-4 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {/* hover underline */}
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-white/40 transition-transform duration-300 group-hover:scale-x-100 lg:inset-x-4"
                  />
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-brand-gradient shadow-glow lg:inset-x-4"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ResumeButton className="btn-primary !min-h-0 !px-5 !py-2 text-sm" label="Resume" compact />
          </div>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-white transition-colors hover:bg-white/5 md:hidden"
          >
            {/* instant icon swap — the previous exit-then-enter animation delayed feedback by ~400ms */}
            {open ? <HiXMark aria-hidden className="h-6 w-6" /> : <HiBars3 aria-hidden className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              aria-hidden
              className="fixed inset-0 -z-10 bg-ink-950/75 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-ink-900 shadow-2xl shadow-black/50 md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <ul className="flex flex-col p-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === link.id ? 'true' : undefined}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-medium transition-colors ${
                        active === link.id ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                      {active === link.id && <span className="h-2 w-2 rounded-full bg-accent-400" />}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between gap-3 border-t border-white/10 p-4">
                <ResumeButton className="btn-primary !min-h-[44px] !px-5 !py-2 text-sm" label="Resume" />
                <div className="flex gap-2">
                  {socialList.map(({ name, url, icon: Icon }) => (
                    <a
                      key={name}
                      href={url}
                      target={url.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      aria-label={name}
                      className="icon-btn"
                    >
                      <Icon aria-hidden className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
