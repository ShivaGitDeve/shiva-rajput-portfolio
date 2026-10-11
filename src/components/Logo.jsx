import { profile } from '../data/portfolio'

// Round profile-photo logo with a gradient ring. Falls back to initials if no logo is set.
export default function Logo({ className = 'h-10 w-10' }) {
  return (
    <span className={`relative block shrink-0 rounded-full bg-brand-gradient p-[2px] shadow-glow ${className}`}>
      {profile.logo ? (
        <span className="block h-full w-full overflow-hidden rounded-full bg-ink-900">
          <img
            src={profile.logo}
            alt=""
            width="40"
            height="40"
            decoding="async"
            className="h-full w-full scale-[1.12] object-cover"
          />
        </span>
      ) : (
        <span className="flex h-full w-full items-center justify-center rounded-full bg-ink-900 font-display text-sm font-bold text-white">
          {profile.initials}
        </span>
      )}
    </span>
  )
}
