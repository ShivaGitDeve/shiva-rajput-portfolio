import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiArrowDownTray, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { profile } from '../data/portfolio'

// Dev servers and SPA hosts answer unknown paths with index.html, so a missing PDF can still
// return 200. Treat HTML responses as "missing"; accept any other type, since some hosts
// serve PDFs as application/octet-stream. Only a positive result is cached, so a transient
// network error is retried on the next click.
let available = false
async function checkResume() {
  if (available) return true
  try {
    const res = await fetch(profile.resume, { method: 'HEAD', cache: 'no-store' })
    available = res.ok && !(res.headers.get('content-type') || '').includes('text/html')
  } catch {
    available = false
  }
  return available
}

export default function ResumeButton({ className = 'btn-ghost', label = 'Download Resume', compact = false }) {
  const [message, setMessage] = useState('')
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleClick = async (e) => {
    e.preventDefault()
    if (await checkResume()) {
      const a = document.createElement('a')
      a.href = profile.resume
      a.download = `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
    } else {
      setMessage('Resume is not available yet. Please reach out by email.')
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setMessage(''), 4000)
    }
  }

  return (
    <span className="relative inline-flex">
      <a href={profile.resume} onClick={handleClick} className={className}>
        <HiArrowDownTray aria-hidden className="h-4 w-4" />
        {label}
      </a>
      <span aria-live="polite" className="sr-only">
        {message}
      </span>
      <AnimatePresence>
        {message && (
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`absolute top-full z-50 mt-2 flex w-64 items-start gap-2 rounded-xl border border-amber-400/30 bg-ink-900/95 p-3 text-xs text-amber-200 shadow-xl backdrop-blur ${
              compact ? 'right-0' : 'left-0'
            }`}
          >
            <HiOutlineExclamationTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            {message}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
