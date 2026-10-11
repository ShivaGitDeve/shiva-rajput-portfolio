import { motion } from 'framer-motion'
import { HiEnvelope, HiMapPin, HiBriefcase, HiAcademicCap } from 'react-icons/hi2'
import { about, education, experience, profile } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const facts = [
  { icon: HiBriefcase, label: 'Currently', value: `${experience[0].role} at ${experience[0].company}` },
  { icon: HiMapPin, label: 'Based in', value: profile.location },
  { icon: HiAcademicCap, label: 'Education', value: `B.Tech, ${education.field}` },
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-x">
        <SectionHeading
          id="about-title"
          eyebrow="About Me"
          title="Engineering interfaces,"
          highlight="APIs & intelligence"
          subtitle={profile.headline}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <Reveal direction="right" className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-slate-300 sm:text-lg">
                {p}
              </p>
            ))}

            <ul className="card mt-8 divide-y divide-white/[0.06] !bg-white/[0.02]">
              {facts.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-4 p-4 sm:p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <p className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-slate-400">{label}</span>
                    <span className="mt-0.5 block font-medium text-white">{value}</span>
                  </p>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <a href="#contact" className="btn-primary">
                <HiEnvelope aria-hidden /> Let&apos;s Connect
              </a>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {about.highlights.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }} className="card group relative h-full overflow-hidden p-6">
                  <div
                    aria-hidden
                    className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/30 bg-brand-500/10 text-brand-400 transition-all duration-500 group-hover:bg-brand-gradient group-hover:text-white group-hover:shadow-glow">
                    <Icon aria-hidden className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
                </motion.div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
