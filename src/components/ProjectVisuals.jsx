import { createContext, useContext, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  HiOutlineLockClosed, HiOutlineShieldCheck, HiOutlineKey, HiOutlineMicrophone,
  HiOutlineUser, HiOutlineArrowPath,
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

export function AuthVisual() {
  const steps = [
    { icon: HiOutlineUser, label: 'Client' },
    { icon: HiOutlineShieldCheck, label: 'Auth API' },
    { icon: HiOutlineKey, label: 'Tokens' },
  ]
  return (
    <Frame className="bg-gradient-to-br from-brand-600/30 via-ink-900 to-accent-500/20">
      <div className="relative flex h-full flex-col items-center justify-center gap-6 p-6 sm:p-8">
        {/* Login card */}
        <div className="w-full max-w-[280px] rounded-2xl border border-white/10 bg-ink-950/80 p-5 shadow-2xl backdrop-blur">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-white">
              <HiOutlineLockClosed className="h-4 w-4" />
            </span>
            <span className="font-display text-sm font-semibold text-white">Sign in</span>
          </div>
          <div className="space-y-2.5">
            <div className="h-8 rounded-lg border border-white/10 bg-white/[0.04] px-3 font-mono text-[11px] leading-8 text-slate-400">
              user@example.com
            </div>
            <div className="h-8 rounded-lg border border-white/10 bg-white/[0.04] px-3 font-mono text-[11px] leading-8 tracking-[0.3em] text-slate-400">
              ••••••••
            </div>
            <div className="h-8 rounded-lg bg-brand-gradient text-center text-[11px] font-semibold leading-8 text-white">
              Login
            </div>
          </div>
        </div>

        {/* Token flow */}
        <div className="flex w-full max-w-[320px] items-center justify-between">
          {steps.map(({ icon: Icon, label }, i) => (
            <div key={label} className="contents">
              <div className="flex flex-col items-center gap-1.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-ink-950/80 text-accent-400">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-[10px] text-slate-400">{label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="relative mx-2 mb-5 h-px flex-1 bg-white/15">
                  {/* the wrapper spans the line, so x: 100% travels its full width (transform, no layout) */}
                  <Loop
                    className="absolute inset-y-0 left-0 right-[7px]"
                    animate={{ x: ['0%', '100%'] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.9 }}
                  >
                    <span className="absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-accent-400 shadow-glow-cyan" />
                  </Loop>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 font-mono text-[10px]">
          <span className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-emerald-300">access_token ✓</span>
          <span className="inline-flex items-center gap-1 rounded-md border border-brand-400/30 bg-brand-500/10 px-2 py-1 text-brand-400">
            <HiOutlineArrowPath className="h-3 w-3" /> refresh rotated
          </span>
        </div>
      </div>
    </Frame>
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

export const visuals = { auth: AuthVisual, chat: ChatVisual, web: WebVisual }
