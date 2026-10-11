import { motion } from 'framer-motion'
import { HiAcademicCap, HiCalendarDays, HiMapPin } from 'react-icons/hi2'
import { education } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative pb-20 sm:pb-28">
      <div className="container-x">
        <SectionHeading id="education-title" eyebrow="Education" title="Academic" highlight="background" />

        <Reveal className="mx-auto max-w-4xl">
          <motion.article
            whileHover={{ y: -4 }}
            className="card relative overflow-hidden p-6 hover:shadow-glow sm:p-8"
          >
            <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/15 blur-3xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                <HiAcademicCap aria-hidden className="h-8 w-8" />
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                  {education.degree} — {education.field}
                </h3>
                <p className="mt-2 flex items-start gap-1.5 text-slate-300">
                  <HiMapPin aria-hidden className="mt-1 h-4 w-4 shrink-0 text-brand-400" />
                  {education.school}
                </p>
                <p className="mt-1 flex items-center gap-1.5 font-mono text-sm text-slate-400">
                  <HiCalendarDays aria-hidden className="h-4 w-4 text-brand-400" />
                  {education.period}
                </p>
              </div>

              <div className="flex shrink-0 items-baseline gap-2 self-start rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 sm:flex-col sm:items-center sm:gap-0 sm:self-center">
                <span className="font-display text-3xl font-bold gradient-text">{education.cgpa}</span>
                <span className="text-xs uppercase tracking-widest text-slate-400">CGPA</span>
              </div>
            </div>
          </motion.article>
        </Reveal>
      </div>
    </section>
  )
}
