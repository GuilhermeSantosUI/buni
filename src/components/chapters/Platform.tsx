import { useRef } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { Block, Chapter } from '@/components/brand/Chapter'
import { Reveal } from '@/components/brand/Reveal'
import { cn } from '@/lib/utils'

const MANIFESTO = [
  'A maioria dos bancos foi pensada para quem já tem dinheiro.',
  'O b.Uni foi pensado para quem está *aprendendo* a ter.',
  'Para quem estuda, para quem ensina, para quem paga a faculdade com o que dá.',
  'Aqui o banco acompanha a vida acadêmica, *sem taxas* e sem juridiquês.',
  'Porque cada pessoa é *única*. O dinheiro dela também.',
]

const PILLARS = [
  { k: 'Propósito', v: 'Tornar a vida financeira de quem faz a Educação acontecer mais simples, justa e acessível.' },
  { k: 'Posicionamento', v: 'A primeira conta digital da Educação. Um banco que fala a língua de estudantes, professores e instituições, em vez de pedir que eles aprendam a língua do banco.' },
  { k: 'Promessa', v: 'Único como você: serviços, atendimento e conteúdo que reconhecem a pessoa e o momento dela, sem taxas e com segurança em primeiro lugar.' },
  { k: 'Arquétipo', v: 'O Mentor Próximo. Cuida sem tutelar, orienta sem sermão e comemora cada avanço, do primeiro Pix ao primeiro salário.' },
]

const VS = [
  ['Pensado para quem já tem patrimônio', 'Pensado para quem está começando e para quem sustenta o ensino'],
  ['Tarifas explicadas em letras miúdas', 'Conta sem taxas, dito logo na primeira frase'],
  ['Produto primeiro, pessoa depois', 'Momento de vida primeiro: matrícula, mensalidade, formatura'],
  ['Educação financeira como brinde', 'Educação financeira personalizada como parte da conta'],
  ['Atendimento por protocolo', 'Atendimento ágil e humanizado'],
  ['Benefícios genéricos', 'Cashback na mensalidade da faculdade'],
]

const VALUES = [
  ['Acessível', 'Sem barreira de entrada, sem letra miúda, sem taxa escondida.'],
  ['Humano', 'Atrás de cada conta existe uma pessoa com uma rotina.'],
  ['Educador', 'Ensinamos a lidar com dinheiro; vender produto vem depois.'],
  ['Confiável', 'Segurança é a primeira promessa, não nota de rodapé.'],
  ['Singular', 'Nada de molde único. O banco se adapta à jornada de cada um.'],
]

const AXES = [
  ['Formal', 'Descontraído', 72],
  ['Técnico', 'Simples', 88],
  ['Sério', 'Leve', 58],
  ['Reservado', 'Entusiasmado', 64],
] as const

function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.fromTo('[data-line]', { opacity: 0.16 }, {
      opacity: 1, stagger: 1, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 60%', scrub: true },
    })
  }, { scope: ref })
  return (
    <div ref={ref} className="mb-32 grid gap-5 md:mb-48">
      {MANIFESTO.map((line) => (
        <p key={line} data-line className="display-md max-w-[22ch] md:max-w-[34ch] md:text-[clamp(2rem,4vw,3.8rem)]">
          {line.split(/(\*[^*]+\*)/).filter(Boolean).map((p, i) =>
            p.startsWith('*') ? <em key={i} className="not-italic text-accent">{p.slice(1, -1)}</em> : <span key={i} className="font-normal">{p}</span>,
          )}
        </p>
      ))}
    </div>
  )
}

function Axes() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.from('[data-fill]', { scaleX: 0, transformOrigin: '0 50%', duration: 1.4, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
    gsap.from('[data-knob]', { opacity: 0, scale: 0, duration: 0.5, stagger: 0.12, delay: 1, scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
  }, { scope: ref })
  return (
    <div ref={ref} className="grid gap-9">
      {AXES.map(([a, b, v]) => (
        <div key={a} className="grid gap-3">
          <div className="flex justify-between font-display text-sm font-bold"><span>{a}</span><span>{b}</span></div>
          <div className="relative h-px bg-line">
            <div data-fill className="absolute inset-y-0 left-0 h-[3px] -translate-y-px bg-accent" style={{ width: `${v}%` }} />
            <i data-knob className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" style={{ left: `${v}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function Platform() {
  return (
    <Chapter
      id="plataforma" n="01" title="A *plataforma* de marca" theme="paper"
      intro="O que o b.Uni acredita, o que promete e como se diferencia. Tudo que vem depois neste livro nasce daqui."
    >
      <Manifesto />

      <Block n="1.1" title="Fundamentos" note="Quatro frases que orientam qualquer decisão de marca.">
        <Reveal stagger={0.1}>
          {PILLARS.map((p) => (
            <div key={p.k} className="grid gap-3 border-t border-line py-7 md:grid-cols-[180px_1fr] md:gap-10">
              <span className="label pt-1.5 text-accent">{p.k}</span>
              <p className="max-w-[44ch] font-display text-[clamp(1.15rem,1.7vw,1.6rem)] font-semibold leading-[1.3] tracking-tight">{p.v}</p>
            </div>
          ))}
        </Reveal>
      </Block>

      <Block n="1.2" title="De → Para" note="O que muda quando o banco nasce dentro da Educação.">
        <div className="grid grid-cols-[1fr_1fr] gap-x-6 border-b border-line">
          <span className="label border-t border-line py-3 text-fg-muted">Banco tradicional</span>
          <span className="label border-t border-line py-3 text-accent">b.Uni</span>
          {VS.map(([from, to], i) => (
            <div key={i} className="contents">
              <p className="border-t border-line py-5 text-fg-muted line-through decoration-fg/25">{from}</p>
              <p className="border-t border-line py-5 font-display font-bold tracking-tight">{to}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block n="1.3" title="Valores" note="Cinco palavras que a equipe deve conseguir citar de cabeça.">
        <Reveal stagger={0.08} className="grid sm:grid-cols-2 lg:grid-cols-5">
          {VALUES.map(([t, d], i) => (
            <div key={t} className={cn('grid content-start gap-3 border-t border-line pb-6 pr-6 pt-5', i > 0 && 'lg:pl-5 lg:border-l')}>
              <span className="label text-fg-muted">0{i + 1}</span>
              <h4 className="font-display text-2xl font-extrabold tracking-tight">{t}</h4>
              <p className="text-sm text-fg-muted">{d}</p>
            </div>
          ))}
        </Reveal>
      </Block>

      <Block n="1.4" title="Personalidade" note="Onde a voz do b.Uni se posiciona em quatro eixos.">
        <Axes />
        <p className="mt-10 max-w-[56ch] text-fg-muted">
          Entre a seriedade de quem cuida do seu dinheiro e a leveza de um colega de turma. O b.Uni nunca perde o rigor com os números, mas nunca usa o rigor como desculpa para ser distante.
        </p>
      </Block>

      <p className="label mt-8 max-w-[70ch] border-l-2 border-current pl-4 text-fg-muted normal-case tracking-normal">
        Nota editorial: textos de propósito, arquétipo e personalidade são uma proposta construída a partir do material público de comunicação do b.Uni. Valide com o time de marca antes da versão oficial.
      </p>
    </Chapter>
  )
}
