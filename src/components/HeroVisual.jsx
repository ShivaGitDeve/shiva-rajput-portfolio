import { motion } from 'framer-motion'
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa6'
import { HiOutlineShieldCheck } from 'react-icons/hi2'

const chips = [
  { Icon: FaReact, label: 'React.js', color: '#61DAFB', className: 'left-0 top-[14%]', delay: 0 },
  { Icon: FaNodeJs, label: 'Node.js', color: '#5FA04E', className: 'right-0 top-[30%]', delay: 1.2 },
  { Icon: FaPython, label: 'AI / ML', color: '#FFD43B', className: 'left-[4%] bottom-[16%]', delay: 2.1 },
]

// Layered gradient orb with orbit rings and floating chips — pure CSS + SVG.
export default function HeroVisual() {
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[460px] select-none">
      {/* Outer glow */}
      <div className="absolute inset-[12%] rounded-full bg-brand-600/40 blur-[70px]" />
      <div className="absolute inset-[28%] translate-x-[18%] rounded-full bg-accent-500/25 blur-[60px]" />

      {/* Rotating conic ring */}
      <motion.div
        className="absolute inset-[10%] rounded-full p-[1.5px]"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, #8b5cf6 90deg, #22d3ee 160deg, transparent 220deg, transparent 360deg)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        <div className="h-full w-full rounded-full bg-ink-950" />
      </motion.div>

      {/* Orbit rings */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.9" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <motion.g
          style={{ originX: '200px', originY: '200px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <ellipse cx="200" cy="200" rx="190" ry="70" fill="none" stroke="url(#ring)" strokeWidth="1" transform="rotate(-25 200 200)" />
          <circle cx="372" cy="120" r="4" fill="#22d3ee" />
        </motion.g>
        <motion.g
          style={{ originX: '200px', originY: '200px' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <ellipse cx="200" cy="200" rx="175" ry="95" fill="none" stroke="url(#ring)" strokeWidth="0.75" strokeDasharray="3 7" transform="rotate(35 200 200)" />
          <circle cx="60" cy="110" r="3" fill="#a78bfa" />
        </motion.g>
      </svg>

      {/* Core sphere */}
      <motion.div
        className="absolute inset-[24%] rounded-full shadow-[0_0_80px_-10px_rgba(139,92,246,0.8)]"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, #f5f3ff 0%, #c4b5fd 8%, #8b5cf6 30%, #4c1d95 62%, #0a0b1a 100%)',
        }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="absolute inset-0 rounded-full mix-blend-screen"
          style={{ background: 'radial-gradient(circle at 75% 80%, rgba(34,211,238,0.55) 0%, transparent 45%)' }}
        />
        <div className="absolute inset-0 rounded-full border border-white/20" />
        {/* code glyph */}
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-white/90">
          {'</>'}
        </div>
      </motion.div>

      {/* Floating chips */}
      {chips.map(({ Icon, label, color, className, delay }) => (
        <motion.div
          key={label}
          className={`absolute flex items-center gap-2 rounded-xl border border-white/10 bg-ink-900/80 px-3 py-2 text-xs font-medium text-slate-200 shadow-xl backdrop-blur-md ${className}`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          <Icon className="h-4 w-4" style={{ color }} />
          {label}
        </motion.div>
      ))}

      {/* Mini auth card */}
      <motion.div
        className="absolute bottom-[4%] right-[2%] w-44 rounded-xl border border-white/10 bg-ink-900/85 p-3 shadow-2xl backdrop-blur-md"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      >
        <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-300">
          <HiOutlineShieldCheck className="h-4 w-4" /> Token verified
        </div>
        <div className="mt-2 space-y-1.5 font-mono text-[10px] text-slate-400">
          <div className="h-1.5 w-full rounded bg-white/10" />
          <div className="h-1.5 w-3/4 rounded bg-brand-500/40" />
        </div>
      </motion.div>
    </div>
  )
}
