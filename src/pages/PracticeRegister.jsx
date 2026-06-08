import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import PageHero from '../components/PageHero'
import VolleyballSVG from '../components/VolleyballSVG'
import FocusBorder from '../components/FocusBorder'

// Paste your Formspree endpoint here (formspree.io → New Form → copy URL)
const FORMSPREE_URL = 'https://formspree.io/f/mojbpbrr'

const ease = [0.25, 0.46, 0.45, 0.94]

// Age ranges per practice (inclusive)
const practiceRules = {
  'Beginner Fundamentals':   { min: 5,  max: 10 },
  'Intermediate Skills':     { min: 10, max: 13 },
  'Advanced Competitive':    { min: 18, max: 22 },
  'Summer All-Skills Camp':  { min: 5,  max: 18 },
}

const allPractices = [
  { name: 'Beginner Fundamentals',  ages: '5–10',   ages: '5–10'  },
  { name: 'Intermediate Skills',    ages: '10–13',   ages: '10–13' },
  { name: 'Advanced Competitive',   ages: '18–22',  ages: '18–22' },
  { name: 'Summer All-Skills Camp', ages: '5–22',  ages: '5–18'  },
]

function getAgeError(practiceName, age) {
  const rule = practiceRules[practiceName]
  if (!rule || !age) return null
  const n = Number(age)
  if (n >= rule.min && n <= rule.max) return null

  const suggestions = allPractices.filter(c => {
    const r = practiceRules[c.name]
    return c.name !== practiceName && r && n >= r.min && n <= r.max
  })

  return { tooYoung: n < rule.min, suggestions }
}

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

export default function PracticeRegister() {
  const [params] = useSearchParams()
  const practiceName = params.get('practice') || 'Practice'

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    parentPhone: '',
    position: '',
    skills: '',
    questions: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [errors, setErrors] = useState({})

  const isMinor   = form.age !== '' && Number(form.age) <= 13
  const ageError  = getAgeError(practiceName, form.age)
  const ageBlocked = ageError !== null

  function set(field, val) {
    setForm(f => ({ ...f, [field]: val }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required.'
    if (!form.lastName.trim()) e.lastName = 'Last name is required.'
    if (!form.age.trim()) e.age = 'Age is required.'
    if (isMinor && !form.parentPhone.trim()) e.parentPhone = 'Required for athletes 13 and under.'
    if (!form.position) e.position = 'Please select a position.'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    if (ageBlocked) return

    setSending(true)
    setSendError('')

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          practice:        practiceName,
          first_name:    form.firstName,
          last_name:     form.lastName,
          age:           form.age,
          parent_phone:  form.parentPhone || 'N/A',
          position:      form.position,
          skills:        form.skills || 'None specified',
          questions:     form.questions || 'None',
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        confetti({ particleCount: 140, spread: 80, origin: { y: 0.55 }, colors: ['#3b82f6','#06b6d4','#ffffff','#a5f3fc'] })
      } else {
        setSendError('Submission failed. Please email us directly at volleyballtricity@gmail.com.')
      }
    } catch {
      setSendError('Network error. Please email us directly at volleyballtricity@gmail.com.')
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
        title={<>Register for a<br /><span className="text-gradient">Practice.</span></>}
        subtitle={`You're signing up for: ${practiceName}`}
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
                <VolleyballSVG size={80} color="#06b6d4" float spin className="mx-auto mb-6" />
                <h2 className="text-3xl font-black text-slate-900 mb-3">You're on the list!</h2>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                  Your registration has been sent. We'll follow up with confirmation details soon.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link to="/practices" className="block px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black rounded-2xl shadow-lg">
                      Back to Practices
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link to="/" className="block px-8 py-3 bg-white border border-slate-200 text-slate-700 font-black rounded-2xl shadow-sm">
                      Go Home
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-xl shadow-blue-50 border border-slate-100 p-8 sm:p-10 space-y-6"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease }}
              >
                {/* Practice badge */}
                <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 mb-2">
                  <span className="text-2xl">📋</span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Registering for</p>
                    <p className="text-blue-800 font-black text-sm">{practiceName}</p>
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

                {/* Age */}
                <Field label="Age" hint="used to determine if a parent contact is needed">
                  <FocusBorder radius={12} color={ageBlocked ? 'green' : 'cyan'}>
                    <input
                      type="number"
                      min="4"
                      max="18"
                      value={form.age}
                      onChange={e => set('age', e.target.value)}
                      placeholder="e.g. 12"
                      className={`${inputBase} ${errors.age ? inputErr : ''} ${ageBlocked ? 'border-amber-400 bg-amber-50' : ''}`}
                    />
                  </FocusBorder>
                  {errors.age && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.age}</p>}
                </Field>

                {/* Age mismatch banner */}
                <AnimatePresence>
                  {ageBlocked && (
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
                            Age {form.age} is {ageError.tooYoung ? 'too young' : 'too old'} for {practiceName}.
                          </p>
                          {ageError.suggestions.length > 0 ? (
                            <>
                              <p className="text-amber-700 text-xs font-medium mb-2">
                                Based on your age, you're eligible for:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {ageError.suggestions.map(c => (
                                  <Link
                                    key={c.name}
                                    to={`/register?practice=${encodeURIComponent(c.name)}`}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-300 text-amber-800 text-xs font-black rounded-xl hover:bg-amber-100 transition-colors"
                                  >
                                    {c.name}
                                    <span className="text-amber-500">Grades {c.grades}</span>
                                    →
                                  </Link>
                                ))}
                              </div>
                            </>
                          ) : (
                            <p className="text-amber-700 text-xs font-medium">
                              Unfortunately we don't have a practice for your age group right now. Contact us at{' '}
                              <a href="mailto:volleyballtricity@gmail.com" className="underline font-bold">
                                volleyballtricity@gmail.com
                              </a>{' '}
                              and we'll see what we can do!
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Parent phone , animated in/out */}
                <AnimatePresence>
                  {isMinor && (
                    <motion.div
                      key="parentPhone"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <Field
                        label="Parent / Guardian Phone Number"
                        hint="required for athletes 13 and under"
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
                <Field label="What position do you play?">
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

                {/* Skills */}
                <Field label="Any specific skills you want to work on?" hint="optional">
                  <FocusBorder radius={12}>
                    <textarea
                      rows={3}
                      value={form.skills}
                      onChange={e => set('skills', e.target.value)}
                      placeholder="e.g. Serving consistency, passing, jump approach…"
                      className={`${inputBase} resize-none`}
                    />
                  </FocusBorder>
                </Field>

                {/* Questions */}
                <Field label="Any questions for us?" hint="optional">
                  <FocusBorder radius={12}>
                    <textarea
                      rows={3}
                      value={form.questions}
                      onChange={e => set('questions', e.target.value)}
                      placeholder="e.g. What should I bring? Is equipment provided?…"
                      className={`${inputBase} resize-none`}
                    />
                  </FocusBorder>
                </Field>

                {/* First session free reminder */}
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3">
                  <span className="text-xl">🎉</span>
                  <p className="text-emerald-700 text-sm font-bold">Your first session is completely free. No payment needed today.</p>
                </div>

                {sendError && (
                  <p className="text-rose-500 text-sm font-semibold text-center">{sendError}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={sending || ageBlocked}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-base rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  whileHover={sending || ageBlocked ? {} : { scale: 1.02, y: -2 }}
                  whileTap={sending || ageBlocked ? {} : { scale: 0.97 }}
                >
                  {sending ? 'Sending…' : 'Submit Registration →'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
