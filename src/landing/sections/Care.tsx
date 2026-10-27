import { Band, Heading } from '../Band'
import { Reveal } from '@/components/brand/Reveal'
import { LearnCard, SecurityCard, SupportCard } from '@/components/product/MiniCards'
import type { ReactNode } from 'react'

const ITEMS: { n: string; title: string; text: string; card: ReactNode }[] = [
  { n: '01', title: 'Segurança em primeiro lugar.', text: 'Sua conta protegida antes de qualquer novidade. Você decide o que fica ligado.', card: <SecurityCard /> },
  { n: '02', title: 'Atendimento de gente de verdade.', text: 'Uma pessoa responde pelo seu nome, no seu ritmo. Sem fila de menus.', card: <SupportCard /> },
  { n: '03', title: 'Educação financeira no seu ritmo.', text: 'Aulas curtas, pensadas para o momento de quem estuda e de quem ensina.', card: <LearnCard /> },
]

export function Care() {
  return (
    <Band id="cuidado" theme="paper" className="py-28 md:py-40">
      <div className="container-x">
        <Heading eyebrow="Cuidado" title="Cuidado de verdade, *em cada detalhe.*" lead="Três coisas que um banco deveria fazer bem antes de qualquer produto novo." />
        <Reveal stagger={0.12} className="grid gap-x-8 gap-y-14 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <article key={it.n} className="grid content-start gap-6">
              <div className="grid gap-3 border-t border-line pt-5">
                <span className="font-display text-sm font-bold text-accent">{it.n}</span>
                <h3 className="font-display text-2xl font-extrabold leading-[1.1] tracking-[-0.03em]">{it.title}</h3>
                <p className="max-w-[36ch] text-fg-muted">{it.text}</p>
              </div>
              <div className="rounded-[2rem] bg-muted p-4">{it.card}</div>
            </article>
          ))}
        </Reveal>
        <p className="label mt-10 max-w-[64ch] text-fg-muted normal-case tracking-normal">Telas ilustrativas. Os recursos disponíveis podem variar conforme a versão do app.</p>
      </div>
    </Band>
  )
}
