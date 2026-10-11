import Reveal from './Reveal'

export default function SectionHeading({ id, eyebrow, title, highlight, subtitle, align = 'center' }) {
  const centered = align === 'center'
  return (
    <Reveal className={`mb-12 max-w-2xl sm:mb-16 ${centered ? 'mx-auto text-center' : ''}`}>
      <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-400">
        <span aria-hidden className="h-px w-6 bg-accent-400/70" />
        {eyebrow}
      </span>
      <h2 id={id} className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight text-white">
        {title} {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {subtitle && <p className="mt-4 text-base text-slate-400 sm:text-lg">{subtitle}</p>}
    </Reveal>
  )
}
