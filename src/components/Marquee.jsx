const items = [
  'FREMONT', 'UNION CITY', 'DUBLIN', 'AGES 5–22', 'ALL FREE', 'JUNE 14', 'LAKE ELIZABETH', 'TRAIN HARD', 'COMPETE', 'SHOW UP',
]

// Pure CSS marquee — runs on the compositor thread, never blocks scroll
export default function Marquee({ bg = 'bg-blue-600', textColor = 'text-white', accentColor = 'text-cyan-300', reverse = false }) {
  const doubled = [...items, ...items]

  return (
    <div className={`${bg} py-3.5 overflow-hidden select-none`}>
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee-scroll 24s linear infinite ${reverse ? 'reverse' : ''}`,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className={`${textColor} font-black text-xs uppercase tracking-[0.2em] mx-5 inline-flex items-center gap-5`}>
            {item}
            <span className={`${accentColor} text-base`}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
