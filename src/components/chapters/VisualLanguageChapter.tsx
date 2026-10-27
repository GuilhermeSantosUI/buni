import { useRef, useState } from 'react'
import { BookOpen, CreditCard, Gift, GraduationCap, Landmark, QrCode, ShieldCheck, Wallet } from 'lucide-react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { Block, Chapter, Fig } from '@/components/brand/Chapter'
import { Logo } from '@/components/brand/Logo'
import { LOOP, LOOP_VIEW, RibbonLayer } from '@/components/brand/Ribbon'
import { JourneyFlow } from '@/components/brand/JourneyFlow'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CashbackRing } from '@/components/product/PhoneApp'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/* Geometry derived from the logo                                      */
/* ------------------------------------------------------------------ */

/** Centerline of the U-n-i stroke: the "line that doesn't stop". */
const CENTERLINE =
  'M645 359.5A153.5 153.5 0 0 1 798.5 513L798.5 506.5A153.5 153.5 0 0 0 1105.5 506.5L1105.5 513A153.5 153.5 0 0 1 1412.5 513L1414 740'

const ARCS = [
  'M288 351.7A198 198 0 1 1 157 538',
  'M645 279A234 234 0 0 1 879 513',
  'M718 506.5A234 234 0 0 0 1186 506.5',
  'M1025 513A234 234 0 0 1 1493 513',
  'M1691 737A234 234 0 0 1 1457 503',
]
const CUTS = ['M157 270H288', 'M645 279V432', 'M1333 740H1495', 'M1456 348H1617', 'M1691 577V737']

type Gesture = 'traco' | 'arco' | 'corte' | 'ponto' | 'fluxo'

const GESTURES: { key: Gesture; name: string; logo: string; means: string; product: string }[] = [
  { key: 'traco', name: 'Traço', logo: 'Uma única espessura em todo o símbolo (x = 161 u). Nenhuma parte pesa mais que as outras.', means: 'Transparência. Nada escondido, nada maior que o resto. É a versão visual de “sem taxas”.', product: 'Ícones, bordas e linhas de progresso na mesma espessura. A hierarquia vem do tamanho e da cor, não do peso de linha.' },
  { key: 'arco', name: 'Arco', logo: 'Curvas de raio 1,45 x e 0,45 x. Não existe ângulo agudo em nenhum ponto do desenho.', means: 'Acolhimento. Um banco que não intimida quem está começando.', product: 'Tudo que se toca é arredondado: botões, seletores, avatares, anéis de progresso, chips.' },
  { key: 'corte', name: 'Corte', logo: 'O traço começa e termina em corte seco: topo do b, início do U, base do n, topo do i.', means: 'Clareza e segurança. O ponto exato onde algo começa ou termina.', product: 'Âncora. O canto reto marca onde a leitura começa (card de destaque e botão primário). Um por bloco.' },
  { key: 'ponto', name: 'Ponto', logo: 'Dois pontos: o encontro entre o b e o Uni, e o ponto azul sobre o i.', means: 'Singularidade. A pessoa no centro, o detalhe que a torna única.', product: 'O único indicador de atenção da tela: notificação, status ao vivo, passo atual. Máximo um por vista.' },
  { key: 'fluxo', name: 'Fluxo', logo: 'O U, o n e o i são uma única linha contínua, sem emendas.', means: 'Jornada. O banco acompanha da matrícula à carreira, sem quebra.', product: 'Progresso, onboarding, jornada do aluno. A linha liga etapas e leva o ponto até a próxima.' },
]

/* ------------------------------------------------------------------ */
/* 7.1 Reading                                                         */
/* ------------------------------------------------------------------ */

function Reading() {
  const ref = useRef<SVGSVGElement>(null)
  const [active, setActive] = useState<'todos' | Gesture>('todos')

  useGSAP(() => {
    const path = ref.current?.querySelector<SVGPathElement>('[data-line]')
    const dot = ref.current?.querySelector<SVGCircleElement>('[data-run]')
    if (!path || !dot || prefersReducedMotion()) return
    const len = path.getTotalLength()
    const o = { p: 0 }
    gsap.to(o, {
      p: 1, duration: 4.2, ease: 'power1.inOut', repeat: -1, repeatDelay: 0.8,
      onUpdate: () => { const pt = path.getPointAtLength(o.p * len); dot.setAttribute('cx', String(pt.x)); dot.setAttribute('cy', String(pt.y)) },
    })
  }, { scope: ref })

  const on = (k: Gesture) => (active === 'todos' || active === k ? 1 : 0.1)
  const fade = { transition: 'opacity .35s ease' }

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
        {(['todos', ...GESTURES.map((g) => g.key)] as const).map((k) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            className={cn('label cursor-pointer border-b-2 pb-2 transition-colors', active === k ? 'border-brand-red text-fg' : 'border-transparent text-fg-muted hover:text-fg')}
          >
            {k === 'todos' ? 'Todos' : GESTURES.find((g) => g.key === k)!.name}
          </button>
        ))}
      </div>

      <div className="theme-navy overflow-hidden bg-bg p-[5%]">
        <svg ref={ref} viewBox="100 150 1650 700" className="w-full" aria-label="Leitura do logo: traço, arco, corte, ponto e fluxo">
          <Logo x={157} y={192} width={1535} height={550} color="#fff" dot="#fff" style={{ opacity: 0.1 }} />

          <g style={{ opacity: on('arco'), ...fade }} fill="none" stroke="#ff8b9a" strokeWidth={6} strokeLinecap="round">
            {ARCS.map((d) => <path key={d} d={d} />)}
          </g>

          <g style={{ opacity: on('corte'), ...fade }} fill="none" stroke="#fff" strokeWidth={10}>
            {CUTS.map((d) => <path key={d} d={d} />)}
          </g>

          <g style={{ opacity: on('ponto'), ...fade }} fill="none" stroke="#1c90c8" strokeWidth={5}>
            <circle cx={629} cy={522} r={88} />
            <circle cx={1540} cy={260} r={88} />
          </g>

          <g style={{ opacity: on('traco'), ...fade }} stroke="#fff" strokeWidth={3} fill="none">
            <path d="M1333 770V810M1495 770V810M1333 790H1495" />
            <text x={1414} y={850} textAnchor="middle" fill="#fff" stroke="none" fontFamily="Maven Pro Variable, sans-serif" fontSize={34} fontWeight={700}>x</text>
          </g>

          <g style={{ opacity: on('fluxo'), ...fade }}>
            <path data-line d={CENTERLINE} fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="2 14" strokeLinecap="round" />
            <circle data-run cx={645} cy={359.5} r={26} fill="#fff" />
          </g>
        </svg>
      </div>
      <Fig>Fig. 6.1 · Cinco gestos extraídos do símbolo. Use os filtros para isolar cada um. O ponto branco percorre o eixo central do U-n-i.</Fig>

      <Table className="mt-12">
        <TableHeader><TableRow className="border-t-0"><TableHead className="w-28">Gesto</TableHead><TableHead>No logo</TableHead><TableHead>O que significa</TableHead><TableHead>No produto</TableHead></TableRow></TableHeader>
        <TableBody>
          {GESTURES.map((g) => (
            <TableRow key={g.key} className={cn('transition-opacity', active !== 'todos' && active !== g.key && 'opacity-30')}>
              <TableCell className="font-display text-lg font-extrabold tracking-tight">{g.name}</TableCell>
              <TableCell className="min-w-56 text-fg-muted">{g.logo}</TableCell>
              <TableCell className="min-w-56">{g.means}</TableCell>
              <TableCell className="min-w-56 text-fg-muted">{g.product}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 7.2 Before / after                                                  */
/* ------------------------------------------------------------------ */

function Marker({ n, className }: { n: number; className?: string }) {
  return <i className={cn('absolute z-10 grid size-5 place-items-center rounded-full bg-brand-pink font-display text-[10px] font-extrabold not-italic text-ink', className)}>{n}</i>
}

const STEPS = ['Conta aberta', 'Primeiro Pix', 'Cartão', 'Cashback']
const STEPS_DETAIL = STEPS.map((label) => ({ label }))
const FLOW_DEMO = [
  { label: STEPS[0], detail: 'Conta aberta, sem taxas. O ponto de partida da jornada.' },
  { label: STEPS[1], detail: 'O primeiro dinheiro se movimenta. A linha avança.' },
  { label: STEPS[2], detail: 'Cartão Visa Internacional a caminho. O ponto mostra onde você está.' },
  { label: STEPS[3], detail: 'Parte da mensalidade volta para você. Fim de uma etapa, começo da próxima.' },
]

function BeforeAfter() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Generic */}
      <figure className="grid gap-4">
        <div className="rounded-3xl border border-black/5 bg-white p-6 text-slate-800 shadow-xl">
          <div className="flex items-center gap-3">
            {[['bg-purple-500', Wallet], ['bg-emerald-500', Gift], ['bg-orange-400', ShieldCheck]].map(([c, I], i) => {
              const Icon = I as typeof Wallet
              return <span key={i} className={cn('grid size-10 place-items-center rounded-full text-white', c as string)}><Icon className="size-5" fill="currentColor" strokeWidth={0} /></span>
            })}
            <span className="ml-auto rounded-md bg-purple-100 px-2 py-1 text-[10px] font-bold text-purple-700">NOVO</span>
            <span className="rounded-md bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">-10%</span>
          </div>
          <p className="mt-6 text-xl font-bold">Seu cashback 🎉</p>
          <p className="text-sm text-slate-500">R$ 48,90 de R$ 78,00</p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[62%] rounded-full bg-emerald-500" /></div>
          <div className="mt-6 flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s} className="grid justify-items-center gap-1.5">
                <span className={cn('grid size-6 place-items-center rounded-full text-[10px] font-bold text-white', i < 2 ? 'bg-teal-500' : i === 2 ? 'bg-sky-500' : 'bg-slate-300')}>{i < 2 ? '✓' : i + 1}</span>
                <span className="text-[10px] text-slate-500">{s}</span>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 py-3 text-sm font-bold text-white">Resgatar agora</button>
        </div>
        <figcaption className="grid gap-1">
          <span className="label text-fg-muted">Sem a gramática</span>
          <p className="text-sm text-fg-muted">Cantos todos iguais, cinco cores fora da paleta, ícones preenchidos, três destaques competindo, emoji e degradê no botão. Poderia ser qualquer banco.</p>
        </figcaption>
      </figure>

      {/* With grammar */}
      <figure className="grid gap-4">
        <div className="relative shape-b bg-ink p-6 text-white [--shape-r:2rem]">
          <Marker n={3} className="-left-2 -top-2" />
          <div className="relative flex items-center gap-4 text-white/90">
            <Marker n={1} className="-left-3 -top-3" />
            {[Wallet, Gift, ShieldCheck].map((Icon, i) => <Icon key={i} className="size-6" strokeWidth={1.75} />)}
          </div>
          <p className="mt-6 font-display text-xl font-extrabold tracking-tight">Cashback da mensalidade</p>
          <p className="text-sm text-white/65">R$ 48,90 de R$ 78,00</p>
          <div className="relative mt-5 h-px bg-white/25">
            <div className="absolute inset-y-0 left-0 h-[2px] w-[62%] -translate-y-px bg-brand-red" />
            <Marker n={5} className="-top-3 left-[18%]" />
          </div>
          <div className="theme-ink relative mt-8 bg-bg">
            <JourneyFlow steps={STEPS_DETAIL} start={2} autoplay={false} details={false} />
            <Marker n={4} className="-top-3 left-[66%]" />
          </div>
          <Button variant="light" className="relative mt-6 w-full"><Marker n={2} className="-left-2 -top-2" />Ver meu cashback</Button>
        </div>
        <figcaption className="grid gap-1">
          <span className="label text-fg-muted">Com a gramática</span>
          <p className="text-sm text-fg-muted">
            <b className="text-fg">1</b> traço único nos ícones · <b className="text-fg">2</b> botão em arco com ação clara · <b className="text-fg">3</b> canto reto só no card de destaque · <b className="text-fg">4</b> um único ponto: onde o aluno está · <b className="text-fg">5</b> linha contínua de progresso.
          </p>
        </figcaption>
      </figure>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 7.3 Mechanics                                                       */
/* ------------------------------------------------------------------ */

function Mechanics() {
  const cell = 'grid content-between gap-8 bg-paper p-6'
  return (
    <div className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
      <div className={cell}>
        <div><span className="label text-accent">Corte · âncora</span><p className="mt-1 text-sm text-fg-muted">O que abre a leitura recebe o canto reto. O resto é arco.</p></div>
        <div className="grid gap-3">
          <div className="shape-b bg-ink p-4 text-white [--shape-r:1.5rem]"><p className="label text-white/60">Destaque</p><p className="font-display text-lg font-extrabold tracking-tight">R$ 1.248,90</p></div>
          <div className="flex items-center gap-2"><Button size="sm">Pagar</Button><Button size="sm" variant="outline">Extrato</Button><span className="label rounded-full bg-fg/8 px-2.5 py-1.5">Pix</span></div>
        </div>
      </div>

      <div className={cn(cell, 'lg:col-span-2')}>
        <div><span className="label text-accent">Fluxo · jornada</span><p className="mt-1 text-sm text-fg-muted">A linha liga etapas. O ponto é o único elemento que mostra onde a pessoa está.</p></div>
        <JourneyFlow steps={FLOW_DEMO} start={2} />
      </div>

      <div className={cell}>
        <div><span className="label text-accent">Ponto · atenção</span><p className="mt-1 text-sm text-fg-muted">Um por vista. Se tudo chama, nada chama.</p></div>
        <div className="grid gap-4">
          <div className="flex items-center gap-3"><span className="relative inline-grid"><Wallet className="size-7" strokeWidth={1.75} /><i className="absolute -right-0.5 -top-0.5 size-3 rounded-full bg-brand-blue ring-2 ring-paper" /></span><span className="text-sm">Novo cashback</span></div>
          <div className="flex items-center gap-3 text-fg-muted line-through decoration-fg/30"><span className="relative inline-grid"><Landmark className="size-7" strokeWidth={1.75} /><i className="absolute -right-0.5 -top-0.5 size-3 rounded-full bg-brand-blue ring-2 ring-paper" /><i className="absolute -left-0.5 -top-0.5 size-3 rounded-full bg-brand-blue ring-2 ring-paper" /></span><span className="text-sm">Dois pontos na mesma vista</span></div>
        </div>
      </div>

      <div className={cell}>
        <div><span className="label text-accent">Arco · toque</span><p className="mt-1 text-sm text-fg-muted">Tudo que responde ao dedo é arredondado.</p></div>
        <div className="flex items-center gap-5">
          <div className="relative"><CashbackRing size={72} /><span className="absolute inset-0 grid place-items-center font-display text-xs font-extrabold">62%</span></div>
          <span className="grid size-12 place-items-center rounded-full bg-brand-navy p-3"><Logo mark color="#fff" dot="#fff" className="w-full" /></span>
          <span className="relative h-7 w-12 rounded-full bg-brand-red"><i className="absolute right-1 top-1 size-5 rounded-full bg-white" /></span>
        </div>
      </div>

      <div className={cell}>
        <div><span className="label text-accent">Traço · consistência</span><p className="mt-1 text-sm text-fg-muted">Ícones e bordas na mesma espessura (1,75 px).</p></div>
        <div className="grid gap-4">
          <div className="flex gap-4">{[QrCode, CreditCard, GraduationCap, BookOpen].map((Icon, i) => <Icon key={i} className="size-7" strokeWidth={1.75} />)}</div>
          <div className="rounded-full border-[1.75px] border-fg px-4 py-2 text-sm">Valor do Pix</div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 7.4 Trajectory                                                      */
/* ------------------------------------------------------------------ */

function Trajectory() {
  const wrap = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const svg = wrap.current
    if (!svg) return
    const path = svg.querySelector<SVGPathElement>('[data-traj]')!
    const dot = svg.querySelector<SVGCircleElement>('[data-tdot]')!
    const len = path.getTotalLength()
    if (prefersReducedMotion()) { path.style.strokeDasharray = 'none'; return }
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
    const o = { p: 0 }
    gsap.to(o, {
      p: 1, ease: 'none',
      scrollTrigger: { trigger: svg, start: 'top 75%', end: 'bottom 35%', scrub: 0.6 },
      onUpdate: () => {
        path.style.strokeDashoffset = String(len * (1 - o.p))
        const pt = path.getPointAtLength(len * o.p)
        dot.setAttribute('cx', String(pt.x)); dot.setAttribute('cy', String(pt.y))
      },
    })
  }, { scope: wrap })

  return (
    <div>
      <div ref={wrap} className="overflow-hidden border border-line bg-white">
        <svg viewBox="-300 230 2000 700" className="w-full" aria-label="A trajetória que sai do logo">
          <defs>
            <linearGradient id="traj" x1="0" x2="1"><stop offset="0" stopColor="#DD263E" /><stop offset="1" stopColor="#146792" /></linearGradient>
          </defs>
          <Logo x={157} y={192} width={1535} height={550} color="#0A1A2A" dot="#0A1A2A" style={{ opacity: 0.07 }} />
          <path data-traj d={`M-300 359.5H645${CENTERLINE.slice(CENTERLINE.indexOf('A'))}V880`} fill="none" stroke="url(#traj)" strokeWidth={10} strokeLinecap="round" />
          <circle data-tdot cx={-300} cy={359.5} r={34} fill="#146792" stroke="#fff" strokeWidth={10} />
          <g fill="#0A1A2A" fontFamily="Maven Pro Variable, sans-serif" fontSize={30} fontWeight={500} letterSpacing="3">
            <text x={-270} y={310}>INÍCIO</text>
            <text x={160} y={810}>O LOGO É UM TRECHO DESTA LINHA</text>
            <text x={1470} y={820}>CONTINUA</text>
          </g>
        </svg>
      </div>
      <Fig>Fig. 6.4 · A linha de campanha não é desenho livre: é o eixo central do U-n-i, prolongado para fora do logo. Role para ver o ponto percorrê-la.</Fig>
    </div>
  )
}

function Crops() {
  const crops = [
    { l: 'O b', cls: 'bg-brand-red', style: { width: '210%', left: '-12%', top: '-8%' } },
    { l: 'O arco', cls: 'bg-brand-navy', style: { width: '260%', left: '-70%', top: '-18%' } },
    { l: 'O i', cls: 'bg-brand-gradient', style: { width: '320%', left: '-205%', top: '-30%' } },
  ]
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-3">
        {crops.map((c) => (
          <figure key={c.l} className="grid gap-3">
            <div className={cn('relative aspect-[4/5] overflow-hidden', c.cls)}><Logo className="absolute" style={c.style} color="#fff" dot="#fff" /></div>
            <figcaption className="label text-fg-muted">{c.l}</figcaption>
          </figure>
        ))}
      </div>
      <Fig>Fig. 6.4b · Recortes ampliados do próprio logo servem de fundo de capas e campanhas, sempre sem texto corrido por cima.</Fig>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 6.5 The loop                                                        */
/* ------------------------------------------------------------------ */

const LOOP_RULES = [
  ['Uma pessoa no centro', 'O laço existe para destacar uma pessoa real. Sem pessoa, não há laço.'],
  ['Metade atrás, metade na frente', 'A faixa passa por trás do retrato e cruza a frente pela parte de baixo, nunca sobre o rosto.'],
  ['Espessura do logo', 'A faixa tem a mesma espessura relativa do traço do logo e termina sempre fechada, sem emendas.'],
  ['Só a assinatura corre', 'O texto é “Único como você.” e o nome da marca. Nada de slogans novos ou textos longos.'],
  ['Degradê da marca', 'Vermelho, roxo e índigo, em ângulo contínuo. Texto sempre em branco.'],
  ['Um laço por peça', 'É o gesto de campanha. Em interface, a gramática continua sendo traço, arco, corte, ponto e fluxo.'],
]

function Loop() {
  return (
    <div className="grid items-center gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,520px)_1fr]">
      <figure>
        <div className="relative mx-auto aspect-[560/640] w-full max-w-[520px] overflow-visible bg-white/0">
          <RibbonLayer {...LOOP} viewBox={LOOP_VIEW} part="back" sync="book" className="absolute inset-0 z-0 size-full" />
          <div className="absolute left-[11.4%] top-0 z-10 w-[46%]">
            <img src="/assets/landing-man.jpg" alt="Estudante sorrindo com o celular na mão" className="shape-b aspect-[385/720] w-full object-cover [--shape-r:3rem]" />
          </div>
          <RibbonLayer {...LOOP} viewBox={LOOP_VIEW} part="front" sync="book" className="absolute inset-0 z-20 size-full" />
        </div>
        <Fig>Fig. 6.5 · O laço: o traço do logo fechado em torno de uma pessoa. Metade atrás, metade na frente.</Fig>
      </figure>
      <ul className="grid">
        {LOOP_RULES.map(([t, d], i) => (
          <li key={t} className="grid gap-1 border-t border-line py-5 sm:grid-cols-[40px_1fr]">
            <span className="font-display text-sm font-bold text-accent">0{i + 1}</span>
            <div><h4 className="font-display text-lg font-bold tracking-tight">{t}</h4><p className="mt-1 text-fg-muted">{d}</p></div>
          </li>
        ))}
        <li className="border-t border-line" aria-hidden />
      </ul>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 6.6 Limits                                                          */
/* ------------------------------------------------------------------ */

const LIMITS = [
  ['Um ponto azul por tela', 'O ponto é “o único”. Se vários elementos pedem atenção, nenhum é único.'],
  ['Canto reto só no que abre o bloco', 'Vale para o painel de destaque e para o item selecionado que o acompanha, com o mesmo raio. Em chips, avatares e campos, a âncora vira ruído.'],
  ['A linha só existe onde há jornada', 'Progresso, onboarding e campanha. Nunca como enfeite atrás de texto ou de valores.'],
  ['Uma espessura por contexto', 'Ícones, bordas e trilhos de progresso compartilham 1,5 a 2 px. Pesos diferentes quebram a lógica do traço.'],
  ['Arco para tocar, corte para começar', 'Elementos interativos são sempre arredondados. Ângulos agudos não existem nesta marca.'],
  ['Cor com função', 'Vermelho é ação. Azul é estado e ponto. Degradê é momento de marca, não de interface.'],
]

function Limits() {
  return (
    <div>
      <Table>
        <TableHeader><TableRow className="border-t-0"><TableHead className="w-12">#</TableHead><TableHead>Regra</TableHead><TableHead>Por quê</TableHead></TableRow></TableHeader>
        <TableBody>
          {LIMITS.map(([r, w], i) => (
            <TableRow key={r}>
              <TableCell className="font-display text-sm font-bold text-accent">0{i + 1}</TableCell>
              <TableCell className="min-w-64 font-display text-lg font-bold tracking-tight">{r}</TableCell>
              <TableCell className="text-fg-muted">{w}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-10 max-w-[56ch] border-l-2 border-brand-red pl-5 font-display text-xl font-bold leading-snug tracking-tight">
        Teste final: se eu tirar este elemento, a tela perde informação ou hierarquia? Se não, tire.
      </p>
    </div>
  )
}

export function VisualLanguageChapter() {
  return (
    <Chapter
      id="forma" n="06" title="A *linguagem* visual" theme="paper"
      intro="O logo não é só um desenho: é uma gramática. Cinco gestos, extraídos do próprio símbolo, explicam como a marca se constrói e como ela vira interface. Importa tanto o que usar quanto o que deixar de fora."
    >
      <Block n="6.1" title="Leitura do logo" note="De onde vem cada gesto, o que ele diz sobre o banco e onde aparece no produto."><Reading /></Block>
      <Block n="6.2" title="Antes e depois" note="A mesma tela de cashback, com e sem a gramática."><BeforeAfter /></Block>
      <Block n="6.3" title="Mecânica" note="Cada gesto em um componente real."><Mechanics /></Block>
      <Block n="6.4" title="A linha e os recortes" note="Como a marca se expande além do logo, em campanha."><div className="grid gap-16"><Trajectory /><Crops /></div></Block>
      <Block n="6.5" title="O laço" note="O gesto de campanha: o traço do logo fechado em torno de uma pessoa."><Loop /></Block>
      <Block n="6.6" title="Limites" note="Seis regras que mantêm o sistema reconhecível e evitam o enfeite."><Limits /></Block>
    </Chapter>
  )
}
