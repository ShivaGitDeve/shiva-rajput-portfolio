import { motion } from 'framer-motion'
import { skillGroups } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
}
const pill = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section overflow-hidden">
      <div aria-hidden className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-accent-500/[0.07] blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills"
          title="Technologies I"
          highlight="work with"
          subtitle="The languages, frameworks and tools behind my frontend, backend and AI work."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map(({ title, icon: GroupIcon, skills }, i) => (
            <Reveal
              key={title}
              delay={(i % 3) * 0.08}
              className={i < 2 ? 'lg:col-span-3' : i === 4 ? 'md:col-span-2 lg:col-span-2' : 'lg:col-span-2'}
            >
              <motion.div whileHover={{ y: -4 }} className="card group h-full p-6 sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-400 transition-colors duration-300 group-hover:border-brand-500/40 group-hover:text-accent-400">
                    <GroupIcon aria-hidden className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
                </div>

                <motion.ul
                  className="flex flex-wrap gap-2.5"
                  variants={list}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {skills.map(({ name, icon: Icon, color }) => (
                    <motion.li
                      key={name}
                      variants={pill}
                      whileHover={{ y: -3, scale: 1.04 }}
                      className="group/skill flex cursor-default items-center gap-2 rounded-xl border border-white/[0.08] bg-ink-900/60 px-3.5 py-2.5 text-sm font-medium text-slate-200 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                      style={{ '--skill': color }}
                    >
                      <Icon
                        aria-hidden
                        className="h-[18px] w-[18px] transition-[filter] duration-300 group-hover/skill:[filter:drop-shadow(0_0_6px_var(--skill))]"
                        style={{ color }}
                      />
                      {name}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
