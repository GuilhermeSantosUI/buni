import { Band, Heading } from '../Band'
import { JourneyFlow } from '@/components/brand/JourneyFlow'
import { Button } from '@/components/ui/button'
import { STORES } from '../config'

const STEPS = [
  { label: 'Baixe o app', detail: 'Procure por b.Uni na loja do seu celular e instale.' },
  { label: 'Abra sua conta', detail: 'Siga o passo a passo no app. Sem tarifa de manutenção.' },
  { label: 'Use do seu jeito', detail: 'Pague a mensalidade, acompanhe o cashback e fale com a gente quando precisar.' },
]

export function Start() {
  return (
    <Band id="baixe" theme="paper" className="py-28 md:py-40">
      <div className="container-x grid items-center gap-x-16 gap-y-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <Heading eyebrow="Comece agora" title="Comece em *três passos.*" className="!mb-12" />
          <JourneyFlow steps={STEPS} start={2} />
          <div className="mt-12 flex flex-wrap gap-3">
            {STORES.map((s) => <Button key={s.label} asChild size="lg" variant="secondary"><a href={s.href}>{s.label}</a></Button>)}
          </div>
        </div>
        <div className="shape-b overflow-hidden bg-[#efefef] [--shape-r:3rem]">
          <img src="/assets/landing-hand.jpg" alt="Mão segurando um celular com a tela de abertura do app b.Uni" className="w-full" loading="lazy" />
        </div>
      </div>
    </Band>
  )
}
