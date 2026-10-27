import { useRef, type ElementType } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface SplitRevealProps {
  /** Words wrapped in *asterisks* become accent-colored emphasis. */
  text: string
  as?: ElementType
  className?: string
  delay?: number
  /** Start on mount instead of on scroll. */
  immediate?: boolean
}

export function SplitReveal({ text, as: Tag = 'h2', className, delay = 0, immediate }: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion() || !ref.current) return
    gsap.from(ref.current.querySelectorAll('[data-word]'), {
      yPercent: 110, duration: 1, stagger: 0.045, delay, ease: EASE.settle,
      scrollTrigger: immediate ? undefined : { trigger: ref.current, start: 'top 88%' },
    })
  }, { scope: ref })

  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean)
  return (
    <Tag ref={ref} className={className}>
      {parts.map((part, i) => {
        const em = part.startsWith('*')
        const words = (em ? part.slice(1, -1) : part).split(' ').filter(Boolean)
        return words.map((w, j) => (
          <span key={`${i}-${j}`} className="-mb-[.24em] -mt-[.14em] inline-block overflow-hidden pb-[.24em] pt-[.14em] align-top">
            <span data-word className={cn('inline-block', em && 'text-accent')}>{w}</span>
            {' '}
          </span>
        ))
      })}
    </Tag>
  )
}
