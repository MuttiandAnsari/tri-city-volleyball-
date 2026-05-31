import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'
import { SlideIn, FadeUp } from '../components/Animate'
import VolleyballSVG from '../components/VolleyballSVG'
import ParentGuide from '../components/ParentGuide'

const ease = [0.25, 0.46, 0.45, 0.94]

const LOCATIONS = [
  {
    name: 'Lake Elizabeth Park',
    city: 'Fremont',
    address: '40204 Paseo Padre Pkwy, Fremont, CA 94538',
    embed: 'https://maps.google.com/maps?q=Lake+Elizabeth+Park,+Fremont,+CA+94538&output=embed',
  },
  {
    name: 'Willow Park',
    city: 'Union City',
    address: 'Willow Ave, Union City, CA 94587',
    embed: 'https://maps.google.com/maps?q=Willow+Ave+Park,+Union+City,+CA+94587&output=embed',
  },
  {
    name: "Fallon's Sports Park",
    city: 'Dublin',
    address: '4605 Fallon Rd, Dublin, CA 94568',
    embed: 'https://maps.google.com/maps?q=Fallon+Sports+Park,+Dublin,+CA+94568&output=embed',
  },
]

function MapTabs() {
  const [active, setActive] = useState(0)
  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {LOCATIONS.map((loc, i) => (
          <button
            key={loc.name}
            onClick={() => setActive(i)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${active === i ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'}`}
          >
            📍 {loc.city}
          </button>
        ))}
      </div>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease }}
        className="rounded-2xl overflow-hidden border border-white/10"
      >
        <div className="bg-white/5 px-5 py-3 flex items-center gap-3">
          <span className="text-white font-black">{LOCATIONS[active].name}</span>
          <span className="text-slate-500 text-xs">·</span>
          <span className="text-slate-400 text-sm">{LOCATIONS[active].address}</span>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(LOCATIONS[active].address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-cyan-400 text-xs font-bold hover:text-cyan-300 transition-colors whitespace-nowrap"
          >
            Open in Maps →
          </a>
        </div>
        <iframe
          title={LOCATIONS[active].name}
          src={LOCATIONS[active].embed}
          width="100%"
          height="360"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    </div>
  )
}

const contactItems = [
  {
    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>),
    label: 'Email', value: 'volleyballtricity@gmail.com', href: 'mailto:volleyballtricity@gmail.com', color: 'bg-blue-500',
  },
  {
    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>),
    label: 'Phone / Text', value: '(341) 777-8673', href: 'tel:+13417778673', color: 'bg-green-500',
  },
  {
    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
    label: 'Locations', value: 'Lake Elizabeth (Fremont) · Willow Park (Union City) · Fallon\'s Park (Dublin)', color: 'bg-cyan-500',
  },
  {
    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
    label: 'Response Time', value: 'Within 24 hours', color: 'bg-indigo-500',
  },
]

const faqs = [
  { q: 'How much does it cost?', a: 'The first session is completely free for every athlete, no strings attached. After that, Beginner clinics are $10/session and Intermediate & Advanced are $15/session.' },
  { q: 'Do I need prior experience?', a: 'Not at all! Our Beginner clinic (grades K–4) is designed for first-time players. We\'ll meet your child where they are and build from there.' },
  { q: 'What should my child bring?', a: 'Athletic shoes (non-marking soles), a water bottle, and knee pads if they have them. Knee pads are recommended but not required. We provide the volleyballs.' },
  { q: 'What happens at the first session?', a: 'Coaches introduce themselves, split athletes by skill, run fun drills, and make sure every kid feels comfortable. There\'s zero pressure. It\'s all about having a good time and learning the basics.' },
  { q: 'How do I know which level is right for my child?', a: 'Beginner (K–4) is for kids new to volleyball. Intermediate (5–7) is for players with at least one season of experience. Advanced (8–12) is for competitive players. Not sure? Text us at (341) 777-8673 and we\'ll help you decide.' },
  { q: 'Is this for boys and girls?', a: 'Yes! Our clinics are open to all athletes regardless of gender.' },
  { q: 'Are there tryouts?', a: 'No tryouts. Clinics are open enrollment. Just register and show up!' },
  { q: 'Where exactly are the clinics held?', a: 'Clinics are held at Lake Elizabeth Park (Fremont), Willow Park (Union City), and Fallon\'s Park (Dublin, CA).' },
]

const inputClass = "w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
const labelClass = "block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2"

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease }}
    >
      <button
        className="w-full px-5 py-4 text-sm font-bold text-white flex justify-between items-center hover:text-cyan-400 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        {q}
        <motion.svg
          className="w-4 h-4 text-slate-500 shrink-0 ml-2"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <p className="px-5 pb-4 text-slate-400 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const FORMSPREE_URL = 'https://formspree.io/f/mojbpbrr'

function SidebarTabs() {
  const [tab, setTab] = useState('faq')
  return (
    <div>
      <div className="flex gap-2 mb-5">
        {[{ id: 'faq', label: 'FAQ' }, { id: 'guide', label: "Parent Guide" }].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === t.id ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {tab === 'faq' ? (
          <motion.div key="faq" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-3">
            {faqs.map((f, i) => <FaqItem key={f.q} {...f} index={i} />)}
          </motion.div>
        ) : (
          <motion.div key="guide" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
            <ParentGuide />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', grade: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [focused, setFocused] = useState(null)

  function handleChange(e) { setForm((p) => ({ ...p, [e.target.name]: e.target.value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setSendError('')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ form_type: 'Contact', ...form }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setSendError('Something went wrong. Please email us directly at volleyballtricity@gmail.com.')
      }
    } catch {
      setSendError('Network error. Please email us directly at volleyballtricity@gmail.com.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <PageHero
        label="Get in Touch"
        title={<>Let's Talk<br /><span className="text-gradient">Volleyball.</span></>}
        subtitle="Questions about clinics, tournaments, or registration? We typically respond within 24 hours."
        watermark="HELLO"
      />

      {/* ── Google Maps ── */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">Locations</span>
            <h2 className="text-3xl font-black text-white">Find Us</h2>
          </div>
          <MapTabs />
        </div>
      </section>

      <section className="bg-slate-950 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <SlideIn from="left">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-5">Contact Info</h2>
                </SlideIn>
                <div className="space-y-3">
                  {contactItems.map(({ icon, label, value, href, color }, i) => (
                    <motion.div
                      key={label}
                      className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4"
                      initial={{ opacity: 0, x: -32 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease }}
                      whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(6,182,212,0.3)' }}
                    >
                      <motion.div
                        className={`${color} w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0`}
                        whileHover={{ scale: 1.15, rotate: -8 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        {icon}
                      </motion.div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</p>
                        {href ? (
                          <a href={href} className="text-white font-bold text-sm hover:text-cyan-400 transition-colors">{value}</a>
                        ) : (
                          <p className="text-white font-bold text-sm">{value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <SlideIn from="left" delay={0.1}>
                  <SidebarTabs />
                </SlideIn>
              </div>
            </div>

            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15, ease }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <VolleyballSVG size={80} color="#06b6d4" float spin className="mx-auto mb-6" />
                    <motion.h3
                      className="text-3xl font-black text-white mb-3"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      Message Sent!
                    </motion.h3>
                    <motion.p
                      className="text-slate-400 mb-8 max-w-xs"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      Thanks {form.name.split(' ')[0]}! We'll be in touch within 24 hours.
                    </motion.p>
                    <motion.button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', grade: '', message: '' }) }}
                      className="px-7 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black rounded-xl shadow-lg"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-black text-white mb-8">Send a Message</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      {[
                        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Smith', required: true },
                        { name: 'email', label: 'Email', type: 'email', placeholder: 'jane@example.com', required: true },
                        { name: 'phone', label: 'Phone', type: 'tel', placeholder: '(510) 555-0100', required: false },
                      ].map(({ name, label, type, placeholder, required }, i) => (
                        <motion.div
                          key={name}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.4 }}
                        >
                          <label className={labelClass}>{label}{required && <span className="text-rose-500 ml-1">*</span>}</label>
                          <motion.input
                            type={type} name={name} value={form[name]} onChange={handleChange}
                            required={required} placeholder={placeholder}
                            className={inputClass}
                            onFocus={() => setFocused(name)}
                            onBlur={() => setFocused(null)}
                            animate={{ borderColor: focused === name ? 'rgba(6,182,212,0.6)' : 'rgba(255,255,255,0.1)' }}
                          />
                        </motion.div>
                      ))}
                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.4 }}>
                        <label className={labelClass}>Athlete's Grade</label>
                        <select name="grade" value={form.grade} onChange={handleChange} className={inputClass + ' cursor-pointer'}>
                          <option value="" className="bg-slate-900">Select grade...</option>
                          {['Kindergarten','1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th'].map((g) => (
                            <option key={g} value={g} className="bg-slate-900">{g} Grade</option>
                          ))}
                        </select>
                      </motion.div>
                    </div>

                    <motion.div className="mb-5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.4 }}>
                      <label className={labelClass}>Subject <span className="text-rose-500">*</span></label>
                      <select name="subject" value={form.subject} onChange={handleChange} required className={inputClass + ' cursor-pointer'}>
                        <option value="" className="bg-slate-900">Select a topic...</option>
                        <option value="clinic-registration" className="bg-slate-900">Clinic Registration</option>
                        <option value="tournament-registration" className="bg-slate-900">Tournament Registration</option>
                        <option value="general-question" className="bg-slate-900">General Question</option>
                        <option value="partnership" className="bg-slate-900">Partnership / Sponsorship</option>
                        <option value="other" className="bg-slate-900">Other</option>
                      </select>
                    </motion.div>

                    <motion.div className="mb-8" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
                      <label className={labelClass}>Message <span className="text-rose-500">*</span></label>
                      <textarea
                        name="message" value={form.message} onChange={handleChange}
                        required rows={5}
                        placeholder="Tell us about your athlete, which clinic or tournament you're interested in, or any questions you have..."
                        className={inputClass + ' resize-none'}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                      />
                    </motion.div>

                    {sendError && (
                      <p className="text-rose-400 text-sm font-semibold text-center mb-3">{sendError}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={sending}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black rounded-xl text-sm tracking-wide relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                      whileHover={sending ? {} : { scale: 1.02, y: -2, boxShadow: '0 20px 40px rgba(59,130,246,0.4)' }}
                      whileTap={sending ? {} : { scale: 0.98 }}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.36, duration: 0.4 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative">{sending ? 'Sending…' : 'Send Message →'}</span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
