import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

const ease = [0.25, 0.46, 0.45, 0.94]

const SEED_REVIEWS = []

function Stars({ rating, interactive = false, onRate }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type={interactive ? 'button' : undefined}
          disabled={!interactive}
          onClick={() => interactive && onRate(n)}
          onMouseEnter={() => interactive && setHover(n)}
          onMouseLeave={() => interactive && setHover(0)}
          className={interactive ? 'cursor-pointer' : 'cursor-default pointer-events-none'}
        >
          <svg
            className={`w-5 h-5 transition-colors ${(hover || rating) >= n ? 'text-amber-400' : 'text-slate-600'}`}
            fill="currentColor" viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

function ReviewCard({ name, rating, comment, role, index }) {
  return (
    <motion.div
      className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.07, ease }}
    >
      <Stars rating={rating} />
      <p className="text-slate-300 text-sm leading-relaxed flex-1">"{comment}"</p>
      <div className="flex items-center gap-3 pt-2 border-t border-white/10">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm shrink-0">
          {name[0]}
        </div>
        <div>
          <p className="text-white font-bold text-sm">{name}</p>
          {role && <p className="text-slate-500 text-xs">{role}</p>}
        </div>
      </div>
    </motion.div>
  )
}

export default function Reviews() {
  const [liveReviews, setLiveReviews] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', rating: 0, comment: '', role: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    supabase
      .from('reviews')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setLiveReviews(data) })
  }, [])

  const allReviews = [...liveReviews, ...SEED_REVIEWS]

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.rating) e.rating = 'Please select a star rating.'
    if (!form.comment.trim()) e.comment = 'Please write a short review.'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSending(true)
    const { error } = await supabase.from('reviews').insert({
      name: form.name.trim(),
      rating: form.rating,
      comment: form.comment.trim(),
      role: form.role.trim() || null,
      approved: false,
    })
    setSending(false)
    if (error) { setErrors({ submit: 'Something went wrong. Try again.' }); return }
    setSubmitted(true)
  }

  return (
    <section className="relative bg-slate-900 py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">Reviews</span>
          <h2 className="text-5xl font-black text-white mb-4 text-glow-cyan" style={{ fontFamily: "'Outfit', sans-serif" }}>
            What Athletes Say
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">Hear from the players and parents who've been part of Tri-City.</p>
        </motion.div>

        {/* Review grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {allReviews.map((r, i) => (
            <ReviewCard key={r.id} {...r} index={i} />
          ))}
        </div>

        {/* Leave a review */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <AnimatePresence mode="wait">
            {!showForm && !submitted ? (
              <motion.div key="prompt" className="text-center" exit={{ opacity: 0 }}>
                <motion.button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-black rounded-2xl shadow-lg shadow-amber-900/30 hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Leave a Review
                </motion.button>
              </motion.div>
            ) : submitted ? (
              <motion.div
                key="success"
                className="text-center bg-white/5 border border-white/10 rounded-3xl p-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              >
                <div className="text-4xl mb-3">🙏</div>
                <h3 className="text-white font-black text-xl mb-2">Thanks for the review!</h3>
                <p className="text-slate-400 text-sm">It'll appear here once we've had a chance to review it.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease }}
              >
                <h3 className="text-white font-black text-lg">Share your experience</h3>

                {/* Star rating */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Your Rating *</label>
                  <Stars rating={form.rating} interactive onRate={r => { setForm(f => ({ ...f, rating: r })); setErrors(e => ({ ...e, rating: '' })) }} />
                  {errors.rating && <p className="text-rose-400 text-xs mt-1">{errors.rating}</p>}
                </div>

                {/* Name + role row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Your Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })) }}
                      placeholder="e.g. Jordan S."
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    />
                    {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">You are a…</label>
                    <select
                      value={form.role}
                      onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                      className="w-full bg-slate-800 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    >
                      <option value="">Select (optional)</option>
                      <option value="Athlete">Athlete</option>
                      <option value="Parent">Parent</option>
                    </select>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Your Review *</label>
                  <textarea
                    rows={4}
                    value={form.comment}
                    onChange={e => { setForm(f => ({ ...f, comment: e.target.value })); setErrors(er => ({ ...er, comment: '' })) }}
                    placeholder="Tell us about your experience at Tri-City Volleyball Academy…"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none"
                  />
                  {errors.comment && <p className="text-rose-400 text-xs mt-1">{errors.comment}</p>}
                </div>

                {errors.submit && <p className="text-rose-400 text-sm text-center">{errors.submit}</p>}

                <div className="flex gap-3">
                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black rounded-xl text-sm disabled:opacity-50"
                    whileHover={sending ? {} : { scale: 1.02, y: -1 }}
                    whileTap={sending ? {} : { scale: 0.97 }}
                  >
                    {sending ? 'Submitting…' : 'Submit Review →'}
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-3.5 bg-white/5 border border-white/10 text-slate-400 font-bold rounded-xl text-sm hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
