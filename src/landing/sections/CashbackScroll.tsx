import { useRef } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { Band } from '../Band'
import { SplitReveal } from '@/components/brand/SplitReveal'

const STEPS = ['Pague a mensalidade pelo b.Uni.', 'Parte do valor volta para a sua conta.', 'Acompanhe tudo no app, mês a mês.']
const R = 15.9155
const FINAL = 0.62

/** Scroll-scrubbed ring: the line fills and the single blue dot rides its tip. */
export function CashbackScroll() {
  const root = useRef<HTMLDivElement>(null)
  const ring = useRef<SVGCircleElement>(null)
  const dot = useRef<SVGCircleElement>(null)
  const amount = useRef<HTMLSpanElement>(null)
  const pct = useRef<HTMLSpanElement>(null)

  const paint = (p: number) => {
    if (ring.current) ring.current.style.strokeDashoffset = String(100 - p * 100)
    if (dot.current) {
      const a = p * Math.PI * 2 - Math.PI / 2
      dot.current.setAttribute('cx', String(18 + R * Math.cos(a)))
      dot.current.setAttribute('cy', String(18 + R * Math.sin(a)))
    }
    if (amount.current) amount.current.textContent = ((p / FINAL) * 48.9).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    if (pct.current) pct.current.textContent = `${Math.round(p * 100)}%`
  }

  useGSAP(() => {
    if (prefersReducedMotion()) { paint(FINAL); return }
    paint(0)
    const o = { p: 0 }
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
    tl.to(o, { p: FINAL, ease: 'none', duration: 3, onUpdate: () => paint(o.p) }, 0)
    gsap.utils.toArray<HTMLElement>('[data-step]', root.current).forEach((el, i) => {
      tl.fromTo(el, { opacity: 0.2, x: -12 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, i * 1)
    })
  }, { scope: root })

  return (
    <Band id="cashback" theme="navy">
      <div ref={root} className="relative h-[230vh]">
        <div className="sticky top-0 grid h-screen content-center overflow-hidden pt-16">
          <div className="container-x grid items-center gap-x-16 gap-y-10 lg:grid-cols-[1.1fr_.9fr]">
            <div className="grid gap-8">
              <p className="label flex items-center gap-3"><i className="h-px w-8 bg-current opacity-50" />Cashback na mensalidade</p>
              <SplitReveal as="h2" text="A mensalidade volta *pra você.*" className="display-lg" />
              <ol className="grid gap-0">
                {STEPS.map((s, i) => (
                  <li key={s} data-step className="flex items-baseline gap-5 border-t border-line py-4">
                    <span className="font-display text-sm font-bold text-accent">0{i + 1}</span>
                    <span className="font-display text-lg font-bold tracking-tight md:text-xl">{s}</span>
                  </li>
                ))}
                <li className="border-t border-line" aria-hidden />
              </ol>
              <p className="max-w-[56ch] text-xs text-fg-muted">Valores ilustrativos. Regras, percentuais e instituições participantes ficam disponíveis no app.</p>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[420px]">
              <svg viewBox="0 0 36 36" className="size-full -rotate-0 overflow-visible" role="img" aria-label="Anel de progresso do cashback">
                <g transform="rotate(-90 18 18)">
                  <circle cx="18" cy="18" r={R} fill="none" stroke="#fff" strokeOpacity=".14" strokeWidth="1.1" />
                  <circle ref={ring} cx="18" cy="18" r={R} fill="none" stroke="#ff8b9a" strokeWidth="1.1" strokeLinecap="round" pathLength={100} strokeDasharray="100" strokeDashoffset="100" />
                </g>
                <circle ref={dot} cx="18" cy={18 - R} r="1.5" fill="#1c90c8" stroke="#00375e" strokeWidth=".9" />
              </svg>
              <div className="absolute inset-0 grid place-content-center justify-items-center gap-1 text-center">
                <span className="label text-fg-muted">Voltou para você</span>
                <p className="font-display text-[clamp(2.4rem,6vw,4.4rem)] font-extrabold leading-none tracking-[-0.05em]">R$ <span ref={amount}>48,90</span></p>
                <span className="text-sm text-fg-muted">meta do mês · <span ref={pct}>62%</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Band>
  )
}
