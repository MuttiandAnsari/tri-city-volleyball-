import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import PageHero from '../components/PageHero'
import VolleyballSVG from '../components/VolleyballSVG'
import FocusBorder from '../components/FocusBorder'
import { supabase } from '../lib/supabase'

// Paste your Formspree endpoint here (formspree.io → New Form → copy URL)
const FORMSPREE_URL = 'https://formspree.io/f/mojbpbrr'

const ease = [0.25, 0.46, 0.45, 0.94]

// Must match SESSION.title in OpenPlay.jsx — it is the practice_registrations.practice_name value.
const SESSION_NAME = 'Open Play'
const MIN_AGE = 13
const GUARDIAN_CONTACT_UNDER = 18

const positions = [
  'Not sure yet',
  'Setter',
  'Outside Hitter',
  'Opposite Hitter',
  'Middle Blocker',
  'Libero / Defensive Specialist',
  'Serving Specialist',
]

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-black text-slate-800 mb-1">
        {label}
        {hint && <span className="ml-2 text-xs font-semibold text-slate-400 normal-case">({hint})</span>}
      </label>
      {children}
    </div>
  )
}

export default function OpenPlayRegister() {
  const [params] = useSearchParams()
  // Only one session exists, so anything unrecognized falls back to it.
  const sessionName = params.get('session') === SESSION_NAME ? params.get('session') : SESSION_NAME

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phone: '',
    parentPhone: '',
    position: '',
    questions: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [errors, setErrors] = useState({})

  const age = form.age === '' ? null : Number(form.age)
  const needsGuardian = age !== null && age >= MIN_AGE && age < GUARDIAN_CONTACT_UNDER
  const tooYoung = age !== null && form.age.trim() !== '' && age < MIN_AGE

  function set(field, val) {
    setForm(f => ({ ...f, [field]: val }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required.'
    if (!form.lastName.trim()) e.lastName = 'Last name is required.'
    if (!form.age.trim()) e.age = 'Age is required.'
    if (!form.phone.trim()) e.phone = 'Phone number is required.'
    if (needsGuardian && !form.parentPhone.trim()) e.parentPhone = 'Required for players under 18.'
    if (!form.position) e.position = 'Please select a position.'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    if (tooYoung) return

    setSending(true)
    setSendError('')

    try {
      // Always insert to Supabase first so spot count is always tracked
      await supabase.from('practice_registrations').insert({
        practice_name: sessionName,
        first_name:    form.firstName,
        last_name:     form.lastName,
        age:           Number(form.age),
        phone:         form.phone || null,
        parent_phone:  form.parentPhone || null,
        position:      form.position || null,
        questions:     form.questions || null,
      })

      // Also send to Formspree for email notifications (best-effort)
      fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          session:    sessionName,
          first_name: form.firstName,
          last_name:  form.lastName,
          age:        form.age,
          phone:      form.phone,
          position:   form.position,
          questions:  form.questions || 'None',
        }),
      }).catch(() => {}) // silently ignore Formspree failures

      setSubmitted(true)
      confetti({ particleCount: 140, spread: 80, origin: { y: 0.55 }, colors: ['#10b981','#06b6d4','#ffffff','#a7f3d0'] })
    } catch {
      setSendError('Submission failed. Please email us directly at volleyballtricity@gmail.com.')
    } finally {
      setSending(false)
    }
  }

  const inputBase =
    'w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-medium placeholder-slate-400 focus:outline-none transition-all'
  const inputErr = 'border-rose-400 bg-rose-50'

  return (
    <>
      <PageHero
        label="Sign Up"
        title={<>Save Your<br /><span className="text-gradient">Spot.</span></>}
        subtitle="Open play on the grass — free, ages 13 and up. Takes about 60 seconds."
        watermark="JOIN"
      />

      <section className="bg-slate-50 py-16 sm:py-20 min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              >
                <VolleyballSVG size={80} color="#10b981" float spin className="mx-auto mb-6" />
                <h2 className="text-3xl font-black text-slate-900 mb-3">You're on the list!</h2>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                  You're signed up for open play. We'll reach out with the next date and time as soon as it's set.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link to="/roster" className="block px-8 py-3 bg-gradient-to-r from-emerald-600 to-cyan-500 text-white font-black rounded-2xl shadow-lg">
                      See Who's Coming
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link to="/tournaments" className="block px-8 py-3 bg-white border border-slate-200 text-slate-700 font-black rounded-2xl shadow-sm">
                      Browse Tournaments
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-xl shadow-emerald-50 border border-slate-100 p-8 sm:p-10 space-y-6"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease }}
              >
                {/* Session badge */}
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3 mb-2">
                  <span className="text-2xl">🏐</span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Signing up for</p>
                    <p className="text-emerald-800 font-black text-sm">{sessionName} · Lake Elizabeth Park, Fremont</p>
                  </div>
                </div>

                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="First Name" >
                    <FocusBorder radius={12}>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={e => set('firstName', e.target.value)}
                        placeholder="e.g. Jordan"
                        className={`${inputBase} ${errors.firstName ? inputErr : ''}`}
                      />
                    </FocusBorder>
                    {errors.firstName && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.firstName}</p>}
                  </Field>
                  <Field label="Last Name">
                    <FocusBorder radius={12}>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={e => set('lastName', e.target.value)}
                        placeholder="e.g. Smith"
                        className={`${inputBase} ${errors.lastName ? inputErr : ''}`}
                      />
                    </FocusBorder>
                    {errors.lastName && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.lastName}</p>}
                  </Field>
                </div>

                {/* Phone */}
                <Field label="Your Phone Number">
                  <FocusBorder radius={12}>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      placeholder="(555) 000-0000"
                      className={`${inputBase} ${errors.phone ? inputErr : ''}`}
                    />
                  </FocusBorder>
                  {errors.phone && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.phone}</p>}
                </Field>

                {/* Age */}
                <Field label="Age" hint="13 and up — no upper limit">
                  <FocusBorder radius={12} color={tooYoung ? 'green' : 'cyan'}>
                    <input
                      type="number"
                      min={MIN_AGE}
                      value={form.age}
                      onChange={e => set('age', e.target.value)}
                      placeholder="e.g. 24"
                      className={`${inputBase} ${errors.age ? inputErr : ''} ${tooYoung ? 'border-amber-400 bg-amber-50' : ''}`}
                    />
                  </FocusBorder>
                  {errors.age && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.age}</p>}
                </Field>

                {/* Too young banner */}
                <AnimatePresence>
                  {tooYoung && (
                    <motion.div
                      key="age-warn"
                      className="bg-amber-50 border border-amber-200 rounded-2xl p-4"
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -8, height: 0 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <div className="flex gap-3 items-start">
                        <span className="text-xl mt-0.5">⚠️</span>
                        <div>
                          <p className="text-amber-800 font-black text-sm mb-1">
                            Open play is for players {MIN_AGE} and up.
                          </p>
                          <p className="text-amber-700 text-xs font-medium">
                            Age {form.age} is a little young for our sessions right now. Reach out at{' '}
                            <a href="mailto:volleyballtricity@gmail.com" className="underline font-bold">
                              volleyballtricity@gmail.com
                            </a>{' '}
                            and we'll let you know if that changes.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Guardian phone — animated in/out */}
                <AnimatePresence>
                  {needsGuardian && (
                    <motion.div
                      key="parentPhone"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <Field
                        label="Parent / Guardian Phone Number"
                        hint="required for players under 18"
                      >
                        <FocusBorder radius={12}>
                          <input
                            type="tel"
                            value={form.parentPhone}
                            onChange={e => set('parentPhone', e.target.value)}
                            placeholder="(555) 000-0000"
                            className={`${inputBase} ${errors.parentPhone ? inputErr : ''}`}
                          />
                        </FocusBorder>
                        {errors.parentPhone && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.parentPhone}</p>}
                      </Field>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Position */}
                <Field label="What position do you play?" hint="just so we can balance teams">
                  <FocusBorder radius={12}>
                    <select
                      value={form.position}
                      onChange={e => set('position', e.target.value)}
                      className={`${inputBase} ${errors.position ? inputErr : ''}`}
                    >
                      <option value="" disabled>Select a position…</option>
                      {positions.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </FocusBorder>
                  {errors.position && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.position}</p>}
                </Field>

                {/* Any questions */}
                <Field label="Any questions?" hint="optional">
                  <FocusBorder radius={12}>
                    <textarea
                      rows={3}
                      value={form.questions}
                      onChange={e => set('questions', e.target.value)}
                      placeholder="e.g. Can I bring a friend? I've never played on grass — is that okay?"
                      className={`${inputBase} resize-none`}
                    />
                  </FocusBorder>
                </Field>

                {/* Free reminder */}
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3">
                  <span className="text-xl">🎉</span>
                  <p className="text-emerald-700 text-sm font-bold">Open play is always free. No payment, ever.</p>
                </div>

                {sendError && (
                  <p className="text-rose-500 text-sm font-semibold text-center">{sendError}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={sending || tooYoung}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-cyan-500 text-white font-black text-base rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  whileHover={sending || tooYoung ? {} : { scale: 1.02, y: -2 }}
                  whileTap={sending || tooYoung ? {} : { scale: 0.97 }}
                >
                  {sending ? 'Sending…' : 'Save My Spot →'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
