import { useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { Block, Chapter, Fig } from '@/components/brand/Chapter'
import { Reveal } from '@/components/brand/Reveal'
import { Button } from '@/components/ui/button'
import { DUR, EASE } from '@/lib/motion'

const PRINCIPLES = [
  ['Calmo, não lento', 'Entradas de 600 a 900 ms, sempre com desaceleração. Nada que faça o usuário esperar.'],
  ['Responde ao toque', 'Interações diretas (hover, clique) em 200 ms ou menos.'],
  ['Dinheiro nunca quica', 'Em valores, saldos e pagamentos, só curvas suaves. Sem bounce, sem elasticidade.'],
  ['Celebra o que importa', 'Um momento de alegria é permitido: cashback recebido, meta batida, primeira conta.'],
]

const EASES: [string, string, string, number][] = [
  ['enter', EASE.enter, 'Elementos que chegam', DUR.base],
  ['move', EASE.move, 'Elementos que se deslocam', DUR.slow],
  ['exit', EASE.exit, 'Elementos que saem', DUR.fast * 2],
  ['settle', EASE.settle, 'Textos e cenas', DUR.scene],
]

function curve(name: string) {
  const fn = gsap.parseEase(name)
  const pts = Array.from({ length: 41 }, (_, i) => { const t = i / 40; return `${(t * 100).toFixed(1)},${(100 - fn(t) * 100).toFixed(1)}` })
  return `M${pts.join(' L')}`
}

function Tokens() {
  return (
    <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {EASES.map(([k, e, d, dur]) => (
        <div key={k} className="grid gap-5 bg-paper p-5">
          <div className="flex items-baseline justify-between"><span className="font-display text-lg font-extrabold">{k}</span><span className="label text-fg-muted">{dur * 1000} ms</span></div>
          <svg viewBox="-6 -6 112 112" className="aspect-square w-full overflow-visible">
            <path d="M0 100H100M0 0V100" stroke="currentColor" strokeOpacity=".15" fill="none" />
            <path d="M0 100L100 0" stroke="currentColor" strokeOpacity=".12" strokeDasharray="3 3" fill="none" />
            <path d={curve(e)} fill="none" stroke="#DD263E" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div><p className="font-mono text-[.75rem]">{e}</p><p className="mt-1 text-sm text-fg-muted">{d}</p></div>
        </div>
      ))}
    </div>
  )
}

const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function Demo() {
  const root = useRef<HTMLDivElement>(null)
  const [n, setN] = useState(0)
  const { contextSafe } = useGSAP({ scope: root })

  const play = contextSafe(() => {
    EASES.forEach(([k, e, , dur]) => {
      gsap.fromTo(`[data-dot=${k}]`, { left: '0%' }, { left: '100%', duration: dur * 1.6, ease: e })
    })
    gsap.fromTo('[data-dot=celebrate]', { left: '0%', scale: 0.6 }, { left: '100%', scale: 1, duration: 1.1, ease: 'back.out(2.2)' })
    const o = { v: 0 }
    gsap.to(o, { v: 1248.9, duration: 1.8, ease: EASE.enter, onUpdate: () => setN(o.v) })
  })

  return (
    <div ref={root} className="grid gap-8">
      <div className="grid gap-5">
        {[...EASES.map(([k, e]) => [k, e] as [string, string]), ['celebrate', 'back.out — só para celebrar'] as [string, string]].map(([k, e]) => (
          <div key={k} className="grid items-center gap-4 sm:grid-cols-[120px_1fr]">
            <div><span className="font-display text-sm font-bold">{k}</span><p className="font-mono text-[.7rem] text-fg-muted">{e}</p></div>
            <div className="relative h-px bg-line"><i data-dot={k} className={`absolute left-0 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full ${k === 'celebrate' ? 'bg-brand-blue' : 'bg-brand-red'}`} /></div>
          </div>
        ))}
      </div>
      <div className="grid items-end gap-6 border-t border-line pt-8 sm:grid-cols-[1fr_auto]">
        <div><span className="label text-fg-muted">Valor em contagem · enter</span><p className="font-display text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-none tracking-[-0.04em]">R$ {fmt(n)}</p></div>
        <Button onClick={play} size="lg"><Play className="size-4" />Reproduzir</Button>
      </div>
    </div>
  )
}

export function MotionChapter() {
  return (
    <Chapter
      id="movimento" n="10" title="Como a marca *se move*" theme="paper"
      intro="Movimento é parte da voz. O b.Uni se move com a calma de quem sabe o que está fazendo, e só se permite uma pequena festa quando o assunto é bom."
    >
      <Block n="10.1" title="Princípios" note="O que deve ser verdade em qualquer animação da marca.">
        <Reveal stagger={0.08} className="grid gap-x-8 md:grid-cols-2">
          {PRINCIPLES.map(([t, d], i) => (
            <div key={t} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[40px_1fr]">
              <span className="font-display text-sm font-bold text-accent">0{i + 1}</span>
              <div><h4 className="font-display text-lg font-bold tracking-tight">{t}</h4><p className="mt-1 text-fg-muted">{d}</p></div>
            </div>
          ))}
        </Reveal>
      </Block>
      <Block n="10.2" title="Curvas e duração" note="Quatro curvas cobrem 95% dos casos. Implementação em GSAP."><Tokens /><Fig>Fig. 10.2 · Curvas reais amostradas do GSAP. Linha tracejada = movimento linear.</Fig></Block>
      <Block n="10.3" title="Ao vivo" note="Compare as curvas lado a lado."><Demo /></Block>
    </Chapter>
  )
}
