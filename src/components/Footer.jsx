import { navLinks, profile, socialList } from '../data/portfolio'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div className="container-x grid gap-8 py-12 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-12">
        <div>
          <a href="#home" className="inline-flex items-center gap-2.5 rounded-xl">
            <Logo className="h-10 w-10" />
            <span className="font-display text-lg font-semibold text-white">{profile.name}</span>
          </a>
          <p className="mt-3 max-w-xs text-sm text-slate-400">{profile.headline}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-slate-400 transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-3">
          {socialList.map(({ name, icon: Icon, url }) => (
            <a
              key={name}
              href={url}
              target={url.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={name}
              className="icon-btn hover:-translate-y-0.5"
            >
              <Icon aria-hidden className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </div>
    </footer>
  )
}
