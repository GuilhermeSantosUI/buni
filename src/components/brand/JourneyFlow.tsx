import { useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { RotateCcw } from 'lucide-react'
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface FlowStep { label: string; detail?: ReactNode }

interface JourneyFlowProps {
  steps: FlowStep[]
  /** Step the flow settles on (0-based). */
  start?: number
  /** Walk from step 1 to `start` when the flow enters the viewport. */
  autoplay?: boolean
  /** Show caption and replay control. */
  details?: boolean
  className?: string
}

/**
 * The brand's line, as a component: a continuous track, small ring nodes that fill as they
 * are reached, and ONE blue dot that travels to where the person is.
 * Position is driven by a single CSS variable (--p) so the dot, the fill and the nodes never drift apart.
 */
export function JourneyFlow({ steps, start = 0, autoplay = true, details = true, className }: JourneyFlowProps) {
  const root = useRef<HTMLDivElement>(null)
  const n = steps.length
  const initial = autoplay && !prefersReducedMotion() ? 0 : start
  const [cur, setCur] = useState(initial)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const { contextSafe } = useGSAP({ scope: root })

  const read = () => Number(gsap.getProperty(root.current, '--p')) || 0
  const sync = () => setCur(Math.min(n - 1, Math.max(0, Math.floor(read() + 0.55))))

  /** Move the dot to step `i`, passing through each step in between. */
  const goTo = contextSafe((i: number) => {
    tl.current?.kill()
    if (prefersReducedMotion()) { gsap.set(root.current, { '--p': i }); setCur(i); return }
    const from = read()
    const dir = i >= from ? 1 : -1
    const t = gsap.timeline({ onUpdate: sync, onComplete: sync })
    for (let k = Math.floor(from) + (dir > 0 ? 1 : 0); dir > 0 ? k <= i : k >= i; k += dir) {
      t.to(root.current, { '--p': k, duration: 0.7, ease: EASE.move }, '>' + (k === Math.floor(from) + (dir > 0 ? 1 : 0) ? '' : '+0.18'))
    }
    tl.current = t
  })

  const replay = contextSafe(() => {
    tl.current?.kill()
    gsap.set(root.current, { '--p': 0 })
    setCur(0)
    goTo(start)
  })

  useGSAP(() => {
    gsap.set(root.current, { '--p': initial })
    if (!autoplay || prefersReducedMotion() || start === 0) return
    ScrollTrigger.create({ trigger: root.current, start: 'top 80%', once: true, onEnter: () => goTo(start) })
  }, { scope: root })

  const vars = { '--p': initial, '--n': n } as CSSProperties
  return (
    <div ref={root} style={vars} className={cn('grid gap-8', className)}>
      <div className="relative">
        {/* track + fill, spanning first to last node centers */}
        <div className="absolute top-[13px] h-[1.5px] bg-fg/20" style={{ left: 'calc(50% / var(--n))', right: 'calc(50% / var(--n))' }}>
          <div className="h-[3px] -translate-y-[0.75px] rounded-full bg-accent" style={{ width: 'calc(var(--p) / (var(--n) - 1) * 100%)' }} />
        </div>

        {/* the dot */}
        <div className="pointer-events-none absolute top-[4px] z-10 size-[20px] -translate-x-1/2" style={{ left: 'calc((var(--p) + .5) / var(--n) * 100%)' }}>
          <i className="absolute inset-0 rounded-full bg-[var(--dot)]" style={{ animation: 'halo 2.2s ease-out infinite' }} />
          <i className="absolute inset-0 rounded-full bg-[var(--dot)] ring-4 ring-bg" />
        </div>

        <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {steps.map((s, i) => {
            const reached = i <= cur
            const here = i === cur
            return (
              <li key={s.label} className="grid justify-items-center gap-3 text-center">
                <button
                  onClick={() => goTo(i)}
                  aria-label={`Etapa ${i + 1}: ${s.label}`}
                  aria-current={here ? 'step' : undefined}
                  className="group grid size-7 cursor-pointer place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--dot)]"
                >
                  <i className={cn('block size-3 rounded-full border-[1.75px] bg-bg transition-all duration-300 group-hover:scale-125', reached ? 'scale-100 border-accent bg-accent' : 'border-fg/35', here && 'opacity-0')} />
                </button>
                <span className={cn('px-1 text-[11px] leading-tight transition-colors duration-300 sm:text-[13px]', here ? 'font-bold text-fg' : reached ? 'font-medium text-fg/80' : 'text-fg-muted')}>{s.label}</span>
              </li>
            )
          })}
        </ol>
      </div>

      {details && (
        <div className="flex items-start justify-between gap-6 border-t border-line pt-5">
          <div key={cur} className="min-h-[3.25rem] animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
            <p className="label text-fg-muted">Etapa {cur + 1} de {n}</p>
            <p className="mt-1.5 max-w-[56ch] text-[.95rem]">{steps[cur].detail ?? steps[cur].label}</p>
          </div>
          <button onClick={replay} aria-label="Reproduzir de novo" className="label inline-flex shrink-0 cursor-pointer items-center gap-2 text-fg-muted transition-colors hover:text-fg">
            <RotateCcw className="size-3.5" />Reproduzir
          </button>
        </div>
      )}
    </div>
  )
}
