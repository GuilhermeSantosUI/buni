import { useState, type ReactNode } from 'react'
import { Check } from 'lucide-react'
import { Band, Heading } from '../Band'
import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { scrollToId } from '@/lib/lenis'

interface Audience { id: string; tab: string; title: string; text: string; points: string[]; cta: string; visual: ReactNode }

const AUDIENCES: Audience[] = [
  {
    id: 'estudante', tab: 'Estudante', title: 'Para quem estuda.',
    text: 'Primeira conta, sem tarifa, e um retorno sobre o maior gasto do mês: a mensalidade.',
    points: ['Conta sem tarifa de manutenção', 'Cashback na mensalidade da faculdade', 'Aulas curtas de educação financeira'],
    cta: 'Abrir minha conta',
    visual: <img src="/assets/landing-man.jpg" alt="Estudante sorrindo com o celular na mão" className="shape-b aspect-[385/720] max-h-[560px] w-full object-cover [--shape-r:3rem]" />,
  },
  {
    id: 'profissional', tab: 'Profissional da Educação', title: 'Para quem ensina.',
    text: 'Conta sem tarifa, crédito consignado com a conta clara e atendimento que resolve.',
    points: ['Crédito consignado, sujeito a análise', 'Atendimento ágil e humanizado', 'Segurança em primeiro lugar'],
    cta: 'Abrir minha conta',
    visual: (
      <div className="theme-navy shape-b relative grid aspect-[4/5] max-h-[560px] w-full content-end overflow-hidden bg-bg p-8 text-fg [--shape-r:3rem]">
        <Logo className="absolute -right-[30%] top-[8%] w-[150%]" color="#fff" dot="#fff" style={{ opacity: 0.08 }} />
        <p className="relative font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.03em]">“Gente de verdade, no seu ritmo.”</p>
      </div>
    ),
  },
  {
    id: 'instituicao', tab: 'Instituição de ensino', title: 'Para quem faz a Educação acontecer.',
    text: 'Uma parceria para simplificar a mensalidade e aproximar a instituição da vida financeira da comunidade.',
    points: ['Mensalidade mais simples para o aluno', 'Relacionamento mais próximo com a comunidade', 'Conversa direta com o time b.Uni'],
    cta: 'Falar com o time',
    visual: (
      <div className="theme-red shape-b relative grid aspect-[4/5] max-h-[560px] w-full content-end overflow-hidden bg-bg p-8 text-fg [--shape-r:3rem]">
        <Logo mark className="absolute -right-[18%] -top-[6%] w-[110%]" color="#fff" dot="#fff" style={{ opacity: 0.16 }} />
        <p className="relative font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.03em]">Único como a sua comunidade.</p>
      </div>
    ),
  },
]

export function Audiences() {
  const [tab, setTab] = useState(AUDIENCES[0].id)
  return (
    <Band id="para-quem" theme="white" className="py-28 md:py-40">
      <div className="container-x">
        <Heading eyebrow="Para quem" title="Feito para quem *faz a Educação.*" />
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-12">{AUDIENCES.map((a) => <TabsTrigger key={a.id} value={a.id}>{a.tab}</TabsTrigger>)}</TabsList>
          {AUDIENCES.map((a) => (
            <TabsContent key={a.id} value={a.id} className="grid animate-in items-center gap-x-16 gap-y-10 fade-in-0 slide-in-from-bottom-2 duration-500 lg:grid-cols-[1.1fr_.9fr]">
              <div className="grid gap-8">
                <h3 className="display-md text-[clamp(2rem,4vw,3.6rem)]">{a.title}</h3>
                <p className="lead max-w-[44ch]">{a.text}</p>
                <ul className="grid gap-3">{a.points.map((p) => <li key={p} className="flex items-start gap-3 border-t border-line pt-3"><Check className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={2.5} />{p}</li>)}</ul>
                <div><Button size="lg" onClick={() => scrollToId('baixe')}>{a.cta}</Button></div>
              </div>
              <div className="mx-auto w-full max-w-[420px]">{a.visual}</div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Band>
  )
}
