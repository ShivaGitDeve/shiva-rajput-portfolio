import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa6'
import { HiOutlineShieldCheck } from 'react-icons/hi2'

const chips = [
  { Icon: FaReact, label: 'React.js', color: '#61DAFB', className: 'left-0 top-[14%]', delay: '0s' },
  { Icon: FaNodeJs, label: 'Node.js', color: '#5FA04E', className: 'right-0 top-[30%]', delay: '-1.2s' },
  { Icon: FaPython, label: 'AI / ML', color: '#FFD43B', className: 'left-[4%] bottom-[16%]', delay: '-2.1s' },
]

const ring = (rx, ry, tilt, dash) => (
  <svg viewBox="0 0 400 400" className="h-full w-full">
    <defs>
      <linearGradient id={`ring-${tilt}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.9" />
        <stop offset="1" stopColor="#22d3ee" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <ellipse
      cx="200" cy="200" rx={rx} ry={ry} fill="none"
      stroke={`url(#ring-${tilt})`} strokeWidth={dash ? 0.75 : 1} strokeDasharray={dash}
      transform={`rotate(${tilt} 200 200)`}
    />
  </svg>
)

// Layered gradient orb with orbit rings and floating chips — pure CSS + SVG.
// All motion is CSS transform keyframes (GPU-composited, no JS per frame), and the global
// prefers-reduced-motion rule in index.css stops it.
export default function HeroVisual() {
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[300px] select-none sm:max-w-[380px] lg:max-w-[460px]">
      {/* Outer glow */}
      <div className="absolute inset-[12%] rounded-full bg-brand-600/40 blur-[60px] lg:blur-[70px]" />
      <div className="absolute inset-[28%] translate-x-[18%] rounded-full bg-accent-500/25 blur-[50px] lg:blur-[60px]" />

      {/* Rotating conic ring */}
      <div
        className="absolute inset-[10%] animate-spin-14 rounded-full p-[1.5px] will-change-transform"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, #8b5cf6 90deg, #22d3ee 160deg, transparent 220deg, transparent 360deg)',
        }}
      >
        <div className="h-full w-full rounded-full bg-ink-950" />
      </div>

      {/* Orbit rings — each SVG rotates as a whole element so the browser can composite it */}
      <div className="absolute inset-0 animate-spin-30 will-change-transform">
        {ring(190, 70, -25)}
        <span className="absolute right-[7%] top-[30%] h-2 w-2 rounded-full bg-accent-400" />
      </div>
      <div className="absolute inset-0 animate-spin-40-rev will-change-transform">
        {ring(175, 95, 35, '3 7')}
        <span className="absolute left-[15%] top-[27%] h-1.5 w-1.5 rounded-full bg-brand-400" />
      </div>

      {/* Core sphere */}
      <div
        className="absolute inset-[24%] animate-float-slow rounded-full shadow-[0_0_80px_-10px_rgba(139,92,246,0.8)] will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, #f5f3ff 0%, #c4b5fd 8%, #8b5cf6 30%, #4c1d95 62%, #0a0b1a 100%)',
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle at 75% 80%, rgba(34,211,238,0.45) 0%, transparent 45%)' }}
        />
        <div className="absolute inset-0 rounded-full border border-white/20" />
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[clamp(1.5rem,6vw,2.5rem)] font-bold text-white/90">
          {'</>'}
        </div>
      </div>

      {/* Floating chips */}
      {chips.map(({ Icon, label, color, className, delay }) => (
        <div
          key={label}
          className={`absolute flex animate-float items-center gap-1.5 rounded-xl border border-white/10 bg-ink-900/90 px-2.5 py-1.5 text-[11px] font-medium text-slate-200 shadow-xl sm:gap-2 sm:px-3 sm:py-2 sm:text-xs ${className}`}
          style={{ animationDelay: delay }}
        >
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color }} />
          {label}
        </div>
      ))}

      {/* Mini auth card */}
      <div
        className="absolute bottom-[4%] right-[2%] w-32 animate-float-slow rounded-xl border border-white/10 bg-ink-900/90 p-2.5 shadow-2xl sm:w-44 sm:p-3"
        style={{ animationDelay: '-3s' }}
      >
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-300 sm:gap-2 sm:text-[11px]">
          <HiOutlineShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Token verified
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="h-1.5 w-full rounded bg-white/10" />
          <div className="h-1.5 w-3/4 rounded bg-brand-500/40" />
        </div>
      </div>
    </div>
  )
}
