import { useId } from 'react'

/** The brand's continuous line. Paths carry `.draw` so drawPaths() can animate them. */
export function FlowLines({ className, strokeWidth = 12 }: { className?: string; strokeWidth?: number }) {
  const uid = useId().replace(/:/g, '')
  const a = `${uid}a`, b = `${uid}b`
  return (
    <svg className={className} viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id={a} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#DD263E" /><stop offset="1" stopColor="#146792" /></linearGradient>
        <linearGradient id={b} x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#146792" /><stop offset="1" stopColor="#DD263E" /></linearGradient>
      </defs>
      <path className="draw" strokeWidth={strokeWidth} stroke={`url(#${a})`} d="M-40 110 C 220 520, 520 300, 660 560 S 560 800, 720 860" />
      <path className="draw" strokeWidth={strokeWidth * 0.55} stroke={`url(#${b})`} d="M1640 60 C 1300 90, 1250 420, 1020 450 S 780 700, 900 860" />
      <path className="draw" strokeWidth={strokeWidth * 0.8} stroke={`url(#${a})`} d="M1640 480 C 1480 360, 1380 640, 1180 700" />
    </svg>
  )
}
