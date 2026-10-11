import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { HiBriefcase, HiCalendarDays, HiMapPin } from 'react-icons/hi2'
import { experience } from '../data/portfolio'
import SectionHeading from './SectionHeading'

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })

  return (
    <section id="experience" aria-labelledby="experience-title" className="section overflow-hidden">
      <div aria-hidden className="absolute left-0 top-1/4 h-80 w-80 rounded-full bg-brand-600/10 blur-[110px]" />
      <div className="container-x relative">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="Where I've"
          highlight="worked"
          subtitle="From frontend dashboards to conversational AI and enterprise ERP."
        />

        <div ref={ref} className="relative mx-auto max-w-4xl">
          {/* Timeline track + animated progress */}
          <div aria-hidden className="absolute bottom-0 left-[19px] top-0 w-px bg-white/10 md:left-1/2" />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-gradient-to-b from-brand-500 via-indigo-500 to-accent-400 md:left-1/2"
            style={{ scaleY: scrollYProgress }}
          />

          <ol className="space-y-10 sm:space-y-14">
            {experience.map((job, i) => {
              const left = i % 2 === 0
              return (
                <li key={job.company} className="relative md:grid md:grid-cols-2 md:gap-14">
                  <motion.span
                    aria-hidden
                    className={`absolute left-[19px] top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-ink-950 text-white md:left-1/2 ${
                      job.current ? 'bg-brand-gradient shadow-glow' : 'bg-ink-700'
                    }`}
                    // centre on the line via Framer (an inline transform would override Tailwind's translate)
                    style={{ x: '-50%' }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <HiBriefcase className="h-4 w-4" />
                  </motion.span>

                  <motion.article
                    className={`ml-14 md:ml-0 ${left ? 'md:col-start-1' : 'md:col-start-2'}`}
                    initial={{ opacity: 0, x: left ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="card group p-5 hover:shadow-glow sm:p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        {job.current && (
                          <span className="rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                            Current
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-400">
                          <HiCalendarDays aria-hidden className="text-brand-400" /> {job.period}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-xl font-semibold text-white">{job.role}</h3>
                      <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm">
                        <span className="font-medium text-accent-400">{job.company}</span>
                        <span aria-hidden className="text-slate-600">•</span>
                        <span className="inline-flex items-center gap-1 text-slate-400">
                          <HiMapPin aria-hidden className="h-3.5 w-3.5" /> {job.location}
                        </span>
                      </p>
                      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-400">
                        {job.points.map((p) => (
                          <li key={p} className="flex gap-2.5">
                            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {job.tech.map((t) => (
                          <span key={t} className="chip">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
