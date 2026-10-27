import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { EASE } from '@/lib/motion'
import { scrollToId } from '@/lib/lenis'
import { Band } from '../Band'
import { SplitReveal } from '@/components/brand/SplitReveal'
import { LOOP, LOOP_VIEW, RibbonLayer, useRibbonEntrance } from '@/components/brand/Ribbon'
import { PhoneApp } from '@/components/product/PhoneApp'
import { Button } from '@/components/ui/button'

const RING = LOOP
const VIEW = LOOP_VIEW

const FACTS = ['Sem tarifa de manutenção', 'Segurança em primeiro lugar', 'Atendimento de gente de verdade']

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useRibbonEntrance('hero', RING, 0.5)

  // the phone is a fixed-size component: scale it with the composition
  useEffect(() => {
    const el = stage.current
    if (!el) return
    const ro = new ResizeObserver(() => setScale(Math.min(1, el.clientWidth / 560)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useGSAP(() => {
    if (prefersReducedMotion() || !root.current) return
    const tl = gsap.timeline({ defaults: { ease: EASE.enter } })
    tl.from('[data-h]', { y: 24, opacity: 0, duration: 0.9, stagger: 0.09 }, 0.55)
      .from('[data-photo]', { clipPath: 'inset(0 0 100% 0)', duration: 1.4, ease: EASE.move }, 0.2)
      .from('[data-phone]', { y: 90, opacity: 0, duration: 1.3, ease: EASE.settle }, 0.6)
      // the one celebratory moment on the page's first view: a notification may bounce
      .from('[data-chip]', { scale: 0.6, opacity: 0, duration: 0.7, ease: 'back.out(1.8)' }, 1.7)
    gsap.to('[data-photo-wrap]', { yPercent: -5, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    gsap.to('[data-phone]', { yPercent: 4, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
  }, { scope: root })

  return (
    <Band id="topo" theme="paper" className="overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36">
      <div ref={root as React.RefObject<HTMLDivElement>}>
                <div className="container-x relative grid items-center gap-x-10 gap-y-16 lg:grid-cols-[1.05fr_.95fr]">
          <div className="grid gap-8">
            <p data-h className="label flex items-center gap-3"><i className="h-px w-8 bg-current opacity-50" />Conta digital da Educação</p>
            <SplitReveal as="h1" immediate delay={0.2} text="A primeira conta digital da *Educação.*" className="text-[clamp(2.9rem,6.6vw,6.6rem)] font-extrabold leading-[.95] tracking-[-0.045em]" />
            <p data-h className="lead max-w-[46ch]">Sem tarifa de manutenção, com cashback na mensalidade da faculdade e atendimento de gente de verdade. Único como você.</p>
            <div data-h className="flex flex-wrap items-center gap-4">
              <Button size="lg" onClick={() => scrollToId('baixe')}>Abrir minha conta <ArrowRight className="size-5" /></Button>
              <Button size="lg" variant="ghost" onClick={() => scrollToId('produtos')}>Ver o que tem no app</Button>
            </div>
            <ul data-h className="grid gap-2.5 border-t border-line pt-6 text-sm sm:grid-cols-3 sm:gap-6">
              {FACTS.map((f) => <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.5} />{f}</li>)}
            </ul>
          </div>

          <div ref={stage} style={{ '--s': scale } as CSSProperties} className="relative mx-auto aspect-[560/640] w-full max-w-[560px]">
            <RibbonLayer {...RING} viewBox={VIEW} part="back" sync="hero" className="absolute inset-0 z-0 size-full" />
            <div data-photo-wrap className="absolute left-[11.4%] top-0 z-10 w-[46%]">
              <img data-photo src="/assets/landing-man.jpg" alt="Estudante sorrindo, com o celular na mão" className="shape-b aspect-[385/720] w-full object-cover [--shape-r:3rem]" />
            </div>
            <RibbonLayer {...RING} viewBox={VIEW} part="front" sync="hero" className="absolute inset-0 z-20 size-full" />
            <div className="absolute bottom-0 right-0 z-30 origin-bottom-right" style={{ transform: 'scale(calc(var(--s) * .8))' }}><div data-phone><PhoneApp /></div></div>
            <div className="absolute bottom-[9%] left-0 z-40 origin-bottom-left" style={{ transform: 'scale(calc(var(--s) * .9 + .1))' }}>
              <div data-chip className="flex max-w-[250px] items-center gap-3 rounded-[1.25rem] bg-white p-3 pr-4 shadow-[0_24px_40px_-18px_rgba(10,26,42,.45)] ring-1 ring-ink/5">
                <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-brand-navy"><i className="size-3 rounded-full bg-white" /><i className="absolute -right-0.5 -top-0.5 size-3 rounded-full bg-brand-blue ring-2 ring-white" /></span>
                <div><p className="font-display text-sm font-extrabold leading-tight tracking-tight text-ink">Seu cashback chegou</p><p className="text-xs text-ink/60">R$ 48,90 voltaram da mensalidade</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Band>
  )
}
