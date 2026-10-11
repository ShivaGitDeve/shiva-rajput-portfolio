import { useEffect, useState } from 'react'

// Cycles through `words`, typing and deleting each one. When `enabled` is false
// (e.g. reduced motion) it returns the first word without animating.
export default function useTypewriter(words, { typeSpeed = 80, deleteSpeed = 45, pause = 1600, enabled = true } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const current = words[index % words.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteSpeed : typeSpeed,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause, enabled])

  return enabled ? text : words[0]
}
