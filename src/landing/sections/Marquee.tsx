import { useRef } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { Logo } from '@/components/brand/Logo'

const WORDS = ['Único como você', 'Sem tarifa de manutenção', 'Cashback na mensalidade', 'Atendimento humano', 'Segurança em primeiro lugar']

export function Marquee() {
  const track = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.to(track.current, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 })
  }, { scope: track })
  const row = WORDS.map((w, i) => (
    <span key={w} className="flex shrink-0 items-center gap-10 pr-10">
      <span className={i % 2 ? 'font-medium opacity-80' : 'font-extrabold'}>{w}</span>
      <Logo mark className="h-5 w-auto opacity-60" color="#fff" dot="#fff" />
    </span>
  ))
  return (
    <div aria-hidden className="theme-ink overflow-hidden bg-bg py-6 text-fg">
      <div ref={track} className="flex w-max font-display text-[clamp(1.4rem,2.6vw,2.2rem)] tracking-tight">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  )
}
