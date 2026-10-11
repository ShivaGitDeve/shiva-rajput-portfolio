import { cloneElement, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiEnvelope, HiPhone, HiMapPin, HiPaperAirplane, HiOutlineInformationCircle } from 'react-icons/hi2'
import { profile, socials } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const contactItems = [
  { icon: HiEnvelope, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: HiPhone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { icon: socials.linkedin.icon, label: 'LinkedIn', value: socials.linkedin.handle, href: socials.linkedin.url, external: true },
  { icon: socials.github.icon, label: 'GitHub', value: socials.github.handle, href: socials.github.url, external: true },
]

const emptyForm = { name: '', email: '', subject: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.subject.trim()) errors.subject = 'Please add a subject.'
  if (values.message.trim().length < 10) errors.message = 'Your message should be at least 10 characters.'
  return errors
}

export default function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const formRef = useRef(null)

  const update = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }))
  }

  // No backend is configured, so the form hands off to the visitor's email app via mailto.
  const submit = (e) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus('')
      formRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }
    const subject = encodeURIComponent(form.subject.trim())
    const body = encodeURIComponent(`${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus('handoff')
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section overflow-hidden">
      <div aria-hidden className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent-500/10 blur-[120px]" />
      <div aria-hidden className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-brand-600/15 blur-[120px]" />

      <div className="container-x relative">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Have a project in mind?"
          highlight="Let's connect."
          subtitle="Whether it's a role, a collaboration or a question — I'd love to hear from you."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.35fr] lg:gap-8">
          <Reveal direction="right">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactItems.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label}>
                  <motion.a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    whileHover={{ x: 4 }}
                    className="card group flex items-center gap-4 p-4 sm:p-5"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-500/30 bg-brand-500/10 text-brand-400 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-widest text-slate-400">{label}</span>
                      {/* allow a line break after "@" in long emails rather than mid-word */}
                      <span className="block break-words font-medium text-white sm:truncate">
                        {value.includes('@') ? (
                          <>
                            {value.split('@')[0]}@<wbr />
                            {value.split('@')[1]}
                          </>
                        ) : (
                          value
                        )}
                      </span>
                    </span>
                  </motion.a>
                </li>
              ))}
              <li className="flex items-center gap-2 px-1 pt-1 text-sm text-slate-400">
                <HiMapPin aria-hidden className="text-brand-400" /> {profile.location}
              </li>
            </ul>
          </Reveal>

          <Reveal direction="left">
            <form ref={formRef} onSubmit={submit} noValidate className="card space-y-5 p-5 sm:p-8" aria-describedby="form-note">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id="name" label="Name" error={errors.name}>
                  <input id="name" name="name" autoComplete="name" value={form.name} onChange={update} placeholder="Your name" />
                </Field>
                <Field id="email" label="Email" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={update}
                    placeholder="you@example.com"
                  />
                </Field>
              </div>
              <Field id="subject" label="Subject" error={errors.subject}>
                <input id="subject" name="subject" value={form.subject} onChange={update} placeholder="What's this about?" />
              </Field>
              <Field id="message" label="Message" error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={update}
                  placeholder="Tell me about your project or opportunity..."
                  className="resize-y"
                />
              </Field>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.96 }}
                  className="btn-primary group w-full sm:w-auto"
                >
                  Send Message
                  <HiPaperAirplane aria-hidden className="transition-transform duration-300 group-hover:-rotate-45 group-hover:translate-x-0.5" />
                </motion.button>
                <p id="form-note" className="text-xs text-slate-400">
                  Opens your email app with the message pre-filled.
                </p>
              </div>

              <div aria-live="polite">
                <AnimatePresence>
                  {status === 'handoff' && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-2 rounded-xl border border-accent-400/20 bg-accent-400/[0.06] p-3 text-sm text-slate-300"
                    >
                      <HiOutlineInformationCircle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
                      <span>
                        Your email app should now open with this message ready to send. If it didn&apos;t, email me directly at{' '}
                        <a href={`mailto:${profile.email}`} className="font-medium text-accent-400 underline-offset-2 hover:underline">
                          {profile.email}
                        </a>
                        .
                      </span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, error, children }) {
  const errorId = `${id}-error`
  const control = cloneElement(children, {
    className: `input ${children.props.className || ''}`,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? errorId : undefined,
    required: true,
  })
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>
      {control}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-rose-300">
          {error}
        </p>
      )}
    </div>
  )
}
