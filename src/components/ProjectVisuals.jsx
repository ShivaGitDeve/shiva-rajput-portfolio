import { createContext, useContext, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  HiOutlineShieldCheck, HiOutlineMicrophone, HiOutlineSquares2X2, HiOutlineUserGroup, HiOutlineCheckCircle,
} from 'react-icons/hi2'

// Decorative CSS illustrations for the project cards.

const ActiveContext = createContext(false)

// Infinite animation that only runs while its card is near the viewport.
// Re-keying on toggle unmounts the running animation instead of leaving it looping off-screen.
function Loop({ as = 'span', animate, transition, ...props }) {
  const active = useContext(ActiveContext)
  const Component = motion[as]
  return active ? (
    <Component key="on" animate={animate} transition={transition} {...props} />
  ) : (
    <Component key="off" {...props} />
  )
}

function Frame({ children, className = '' }) {
  const ref = useRef(null)
  const active = useInView(ref, { margin: '150px' })
  return (
    <div ref={ref} aria-hidden className={`relative h-full w-full overflow-hidden ${className}`}>
      <div className="grid-bg absolute inset-0 opacity-60" />
      <ActiveContext.Provider value={active}>{children}</ActiveContext.Provider>
    </div>
  )
}

const team = [
  { initials: 'AK', bg: 'bg-violet-500' },
  { initials: 'RS', bg: 'bg-cyan-500' },
  { initials: 'MJ', bg: 'bg-emerald-500' },
]

const columns = [
  {
    title: 'To Do',
    dot: 'bg-slate-400',
    tasks: [
      { tag: 'bg-amber-400/80', w: 'w-4/5', who: 0 },
      { tag: 'bg-sky-400/80', w: 'w-3/5', who: 2 },
    ],
  },
  {
    title: 'In Progress',
    short: 'Doing',
    dot: 'bg-brand-400',
    tasks: [
      { tag: 'bg-brand-400', w: 'w-full', who: 1, active: true },
      { tag: 'bg-pink-400/80', w: 'w-2/3', who: 0 },
    ],
  },
  {
    title: 'Done',
    dot: 'bg-emerald-400',
    tasks: [
      { tag: 'bg-emerald-400/80', w: 'w-3/4', who: 2, done: true },
      { tag: 'bg-emerald-400/80', w: 'w-1/2', who: 1, done: true },
    ],
  },
]

// Team & Project Management SaaS: sprint board with team, progress and task columns.
export function SaasVisual() {
  return (
    <Frame className="bg-gradient-to-br from-brand-600/30 via-ink-900 to-accent-500/20">
      <div className="relative flex h-full flex-col items-center justify-center gap-5 p-5 sm:p-8">
        <div className="w-full max-w-[360px] rounded-2xl border border-white/10 bg-ink-950/90 p-3 shadow-2xl sm:p-4">
          {/* Board header */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white">
                <HiOutlineSquares2X2 className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-white">Product Launch</p>
                <p className="whitespace-nowrap font-mono text-[10px] text-slate-400">Sprint 4 · 12 tasks</p>
              </div>
            </div>
            <div className="flex shrink-0 -space-x-1">
              {team.map((m, i) => (
                <span
                  key={m.initials}
                  className={`h-6 w-6 items-center justify-center rounded-full border-2 border-ink-950 text-[8px] font-bold text-white ${m.bg} ${i === 2 ? "hidden min-[400px]:flex" : "flex"}`}
                >
                  {m.initials}
                </span>
              ))}
              <span className="hidden h-6 w-6 items-center justify-center rounded-full border-2 border-ink-950 bg-ink-700 text-[8px] font-semibold text-slate-300 min-[400px]:flex">
                +4
              </span>
            </div>
          </div>

          {/* Sprint progress */}
          <div className="mt-3">
            <div className="flex justify-between font-mono text-[10px] text-slate-400">
              <span>Progress</span>
              <span className="text-accent-400">68%</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[68%] rounded-full bg-brand-gradient" />
            </div>
          </div>

          {/* Task columns */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {columns.map((col) => (
              <div key={col.title} className="min-w-0 rounded-lg bg-white/[0.03] p-1.5">
                <p className="mb-1.5 flex items-center gap-1 truncate text-[9px] font-semibold text-slate-300 sm:text-[10px]">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${col.dot}`} />
                  {/* shorter label on small phones so three columns fit */}
                  {col.short ? (
                    <>
                      <span className="sm:hidden">{col.short}</span>
                      <span className="hidden sm:inline">{col.title}</span>
                    </>
                  ) : (
                    col.title
                  )}
                </p>
                <div className="space-y-1.5">
                  {col.tasks.map((t, i) =>
                    t.active ? (
                      <Loop
                        as="div"
                        key={i}
                        className="rounded-md border border-brand-400/60 bg-brand-500/15 p-1.5 shadow-glow"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <TaskBody task={t} />
                      </Loop>
                    ) : (
                      <div key={i} className="rounded-md border border-white/10 bg-ink-900 p-1.5">
                        <TaskBody task={t} />
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature badges — tie the board to the project's auth & access-control work */}
        <div className="flex flex-wrap justify-center gap-2 font-mono text-[10px]">
          <span className="inline-flex items-center gap-1 rounded-md border border-accent-400/30 bg-accent-400/10 px-2 py-1 text-accent-400">
            <HiOutlineUserGroup className="h-3 w-3" /> Teams
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-brand-400/30 bg-brand-500/10 px-2 py-1 text-brand-400">
            <HiOutlineShieldCheck className="h-3 w-3" /> Role-based access
          </span>
          <span className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-emerald-300">JWT auth ✓</span>
        </div>
      </div>
    </Frame>
  )
}

function TaskBody({ task }) {
  return (
    <>
      <span className={`block h-1 w-5 rounded-full ${task.tag}`} />
      <span className={`mt-1.5 block h-1.5 rounded bg-white/40 ${task.w}`} />
      <span className="mt-1 block h-1.5 w-1/2 rounded bg-white/15" />
      <span className="mt-1.5 flex items-center justify-between">
        <span className={`h-3 w-3 rounded-full ${team[task.who].bg}`} />
        {task.done && <HiOutlineCheckCircle className="h-3 w-3 text-emerald-400" />}
      </span>
    </>
  )
}

export function ChatVisual() {
  const bars = [0.4, 0.8, 0.55, 1, 0.7, 0.35, 0.9, 0.6, 0.45, 0.75]
  return (
    <Frame className="bg-gradient-to-br from-fuchsia-600/25 via-ink-900 to-brand-600/25">
      <div className="relative mx-auto flex h-full w-full max-w-sm flex-col justify-center gap-3 p-6">
        <div className="max-w-[75%] self-start rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs text-slate-200">
          Hi! How can I help you today?
        </div>
        <div className="max-w-[75%] self-end rounded-2xl rounded-br-sm bg-brand-gradient px-3.5 py-2 text-xs text-white">
          What did we talk about earlier?
        </div>
        <div className="flex items-center gap-1 self-start rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.06] px-3.5 py-3">
          {[0, 1, 2].map((d) => (
            <Loop
              key={d}
              className="h-1.5 w-1.5 rounded-full bg-slate-300"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center gap-3 rounded-full border border-white/10 bg-ink-950/70 px-3 py-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-500/20 text-accent-400">
            <HiOutlineMicrophone className="h-4 w-4" />
          </span>
          <div className="flex h-6 flex-1 items-center gap-[3px]">
            {bars.map((h, i) => (
              <Loop
                key={i}
                className="w-[3px] flex-1 rounded-full bg-accent-400/80"
                style={{ height: `${h * 100}%` }}
                animate={{ scaleY: [1, 0.35, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.08 }}
              />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}

export function WebVisual() {
  return (
    <Frame className="bg-gradient-to-br from-emerald-500/20 via-ink-900 to-accent-500/20">
      <div className="relative flex h-full items-center justify-center p-6">
        <div className="w-full max-w-[300px] overflow-hidden rounded-xl border border-white/10 bg-ink-950/85 shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-rose-400/80" />
            <span className="h-2 w-2 rounded-full bg-amber-400/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
            <span className="ml-2 h-3 flex-1 rounded bg-white/5" />
          </div>
          <div className="space-y-3 p-3">
            <div className="flex items-center justify-between">
              <span className="h-2 w-10 rounded bg-emerald-400/70" />
              <span className="flex gap-1.5">
                <span className="h-1.5 w-5 rounded bg-white/20" />
                <span className="h-1.5 w-5 rounded bg-white/20" />
                <span className="h-1.5 w-5 rounded bg-white/20" />
              </span>
            </div>
            <div className="space-y-1.5 py-1">
              <span className="block h-2.5 w-3/4 rounded bg-white/60" />
              <span className="block h-2 w-1/2 rounded bg-white/25" />
              <span className="mt-2 block h-4 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-accent-400" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <Loop
                  as="div"
                  key={i}
                  className="space-y-1 rounded-lg border border-white/10 bg-white/[0.04] p-2"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                >
                  <span className="block h-3 w-3 rounded bg-accent-400/60" />
                  <span className="block h-1.5 w-full rounded bg-white/20" />
                  <span className="block h-1.5 w-2/3 rounded bg-white/10" />
                </Loop>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Frame>
  )
}

export const visuals = { saas: SaasVisual, chat: ChatVisual, web: WebVisual }
