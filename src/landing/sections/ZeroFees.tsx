import { useRef } from 'react'
import { Check } from 'lucide-react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { EASE } from '@/lib/motion'
import { Band } from '../Band'

const POINTS = [
  'Conta digital sem tarifa de manutenção.',
  'Conta, crédito e seguros no mesmo app.',
  'Se algum serviço tiver custo, você vê antes de contratar.',
]

export function ZeroFees() {
  const root = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion()) return
    const st = { trigger: root.current, start: 'top 70%' }
    gsap.from('[data-fee]', { y: 40, opacity: 0, duration: 0.9, ease: EASE.enter, scrollTrigger: st })
    // the strike-through draws like a pen stroke: the "traço" removing the fee
    gsap.fromTo('[data-strike]', { scaleX: 0 }, { scaleX: 1, duration: 0.9, delay: 0.7, ease: EASE.move, transformOrigin: '0 50%', scrollTrigger: st })
    gsap.from('[data-zero]', { y: 70, opacity: 0, duration: 1.2, delay: 1.4, ease: EASE.settle, scrollTrigger: st })
    gsap.from('[data-pt]', { y: 20, opacity: 0, duration: 0.8, stagger: 0.12, delay: 1.7, ease: EASE.enter, scrollTrigger: st })
  }, { scope: root })

  return (
    <Band id="sem-taxas" theme="red" className="py-28 md:py-44">
      <div ref={root} className="container-x grid items-end gap-x-12 gap-y-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-4">
          <p className="label flex items-center gap-3"><i className="h-px w-8 bg-current opacity-50" />Conta digital sem taxas</p>
          <p data-fee className="relative w-fit font-display text-[clamp(1.8rem,4.4vw,4.2rem)] font-bold leading-none tracking-[-0.03em]">
            Tarifa de manutenção
            <i data-strike className="absolute left-0 top-[52%] h-[.1em] w-full bg-white" />
          </p>
          <p data-zero className="font-display whitespace-nowrap text-[clamp(4.2rem,11.5vw,11rem)] font-extrabold leading-[.85] tracking-[-0.06em]">R$ 0,00</p>
        </div>
        <div className="grid gap-8 pb-4">
          <p className="lead max-w-[30ch] !text-white">Sem pegadinha. Sem letra miúda.</p>
          <ul className="grid gap-4">
            {POINTS.map((p) => (
              <li key={p} data-pt className="flex items-start gap-3 border-t border-line pt-4"><Check className="mt-0.5 size-5 shrink-0" strokeWidth={2.5} /><span>{p}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </Band>
  )
}
