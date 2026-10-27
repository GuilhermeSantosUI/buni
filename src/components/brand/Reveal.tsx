import { useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { EASE } from '@/lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Animate direct children one after another instead of the wrapper. */
  stagger?: number
  x?: number
  y?: number
  start?: string
}

export function Reveal({ children, className, stagger, x = 0, y = 32, start = 'top 88%' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion() || !ref.current) return
    const targets = stagger ? Array.from(ref.current.children) : ref.current
    gsap.from(targets, {
      x, y, opacity: 0, duration: 0.9, stagger: stagger ?? 0, ease: EASE.enter,
      scrollTrigger: { trigger: ref.current, start },
    })
  }, { scope: ref })
  return <div ref={ref} className={className}>{children}</div>
}
