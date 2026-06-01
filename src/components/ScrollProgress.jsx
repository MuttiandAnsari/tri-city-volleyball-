// Pure CSS scroll progress — uses animation-timeline: scroll()
// Runs entirely on the compositor thread, zero JS, never blocks scroll
export default function ScrollProgress() {
  return <div className="scroll-progress-bar" />
}
