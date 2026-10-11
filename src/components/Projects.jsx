import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FaGithub } from 'react-icons/fa6'
import { HiArrowTopRightOnSquare, HiStar, HiCheck } from 'react-icons/hi2'
import { projects } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { visuals } from './ProjectVisuals'
import { useFinePointer } from './Effects'

function useTilt(max = 6) {
  const enabled = useFinePointer()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 180, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 180, damping: 20 })

  if (!enabled) return { style: {}, handlers: {} }
  return {
    style: { rotateX, rotateY, transformPerspective: 1200 },
    handlers: {
      onMouseMove: (e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left) / r.width - 0.5)
        y.set((e.clientY - r.top) / r.height - 0.5)
      },
      onMouseLeave: () => {
        x.set(0)
        y.set(0)
      },
    },
  }
}

function ProjectLinks({ links, title }) {
  const items = [
    links.github && { href: links.github, label: 'Source Code', icon: FaGithub, primary: false },
    links.live && { href: links.live, label: 'Live Demo', icon: HiArrowTopRightOnSquare, primary: true },
  ].filter(Boolean)

  if (!items.length) return null
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {items.map(({ href, label, icon: Icon, primary }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${label} — ${title}`}
          className={`${primary ? 'btn-primary' : 'btn-ghost'} !min-h-[44px] !px-5 !py-2 text-sm`}
        >
          <Icon aria-hidden className="h-4 w-4" /> {label}
        </a>
      ))}
    </div>
  )
}

function ProjectCard({ project, index }) {
  const { style, handlers } = useTilt(project.featured ? 3 : 6)
  const Visual = visuals[project.visual]
  const featured = project.featured

  return (
    <Reveal delay={index * 0.1} className={featured ? 'lg:col-span-2' : ''}>
      <motion.article
        style={style}
        {...handlers}
        aria-labelledby={`project-${project.id}`}
        className={`card group relative h-full overflow-hidden hover:shadow-glow ${
          featured ? 'grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]' : 'flex flex-col'
        }`}
      >
        {featured && (
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/10 via-transparent to-accent-500/10" />
        )}

        <div
          className={`relative overflow-hidden ${
            featured ? 'min-h-[390px] lg:order-2 lg:min-h-[440px]' : 'aspect-[16/10] min-h-[230px]'
          }`}
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <Visual />
          </div>
        </div>

        <div className={`relative flex flex-1 flex-col ${featured ? 'p-6 sm:p-8 lg:p-10' : 'p-6 sm:p-7'}`}>
          <div className="flex flex-wrap items-center gap-2">
            {featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
                <HiStar aria-hidden className="h-3.5 w-3.5" /> Featured Project
              </span>
            )}
            <span className="font-mono text-xs uppercase tracking-widest text-accent-400">
              {project.subtitle}
              {project.year && ` · ${project.year}`}
            </span>
          </div>

          <h3
            id={`project-${project.id}`}
            className={`mt-3 font-display font-bold text-white ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}
          >
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">{project.description}</p>

          {project.points && (
            <ul className="mt-5 grid gap-2 text-sm text-slate-300">
              {project.points.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <HiCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                  {p}
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>

          <ProjectLinks links={project.links} title={project.title} />
        </div>
      </motion.article>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section overflow-hidden">
      <div aria-hidden className="absolute left-1/2 top-40 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-brand-600/10 blur-[130px]" />
      <div className="container-x relative">
        <SectionHeading
          id="projects-title"
          eyebrow="Projects"
          title="Featured"
          highlight="work"
          subtitle="Full-stack systems, AI applications and web products I've built."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
