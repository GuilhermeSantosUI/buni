import { useEffect, useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { Logo, WIPE } from '@/components/brand/Logo'
import { EASE } from '@/lib/motion'

interface IntroProps { onReveal: () => void; onDone: () => void }

/** Brand preloader: the symbol builds itself, then the curtain lifts. */
export function Intro({ onReveal, onDone }: IntroProps) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline({ onComplete: onDone })
    tl.from('[data-part=b]', { scale: 0, duration: 0.7, ease: EASE.settle })
      .from('[data-part=dot]', { scale: 0, duration: 0.5, ease: EASE.settle }, '-=0.35')
      .from('[data-wipe]', { attr: { x: WIPE.from }, duration: 0.9, ease: EASE.move }, '-=0.3')
      .from('[data-part=idot]', { y: -260, opacity: 0, duration: 0.7, ease: 'power3.in' }, '-=0.25')
      .to('[data-intro-tag]', { opacity: 1, y: 0, duration: 0.5, ease: EASE.enter }, '-=0.1')
      .to(root.current, { yPercent: -100, duration: 0.9, ease: EASE.move }, '+=0.45')
      .call(onReveal, [], '-=0.55')
  }, { scope: root })

  return (
    <div ref={root} className="fixed inset-0 z-[100] grid place-content-center justify-items-center gap-6 bg-brand-red text-white">
      <Logo bleed className="w-[min(340px,62vw)]" color="#fff" dot="#fff" />
      <span data-intro-tag className="label translate-y-2 opacity-0">Único como você</span>
    </div>
  )
}
