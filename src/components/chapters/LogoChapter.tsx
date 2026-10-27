import { useRef } from 'react'
import { X } from 'lucide-react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { Block, Chapter, Fig } from '@/components/brand/Chapter'
import { Logo } from '@/components/brand/Logo'
import { Lockup } from '@/components/brand/Lockup'
import { Reveal } from '@/components/brand/Reveal'
import { cn } from '@/lib/utils'

/* ---------- 4.1 Construção ---------- */
const CIRCLES: [number, number, number, boolean?][] = [
  [355, 538, 198], [355, 538, 68], [629, 522, 68], [629, 522, 90, true],
  [952, 506.5, 234], [952, 506.5, 73], [1259, 513, 234], [1259, 513, 73],
  [645, 513, 234], [1691, 503, 234], [1691, 503, 74], [1540, 260, 68],
]

function Construction() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion() || !ref.current) return
    const items = gsap.utils.toArray<SVGGeometryElement>('[data-cn]', ref.current)
    items.forEach((el) => { const l = el.getTotalLength(); gsap.set(el, { strokeDasharray: el.dataset.dash ? '10 12' : l, strokeDashoffset: el.dataset.dash ? 0 : l, opacity: el.dataset.dash ? 0 : 1 }) })
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 45%', scrub: 0.6 } })
    items.forEach((el, i) => tl.to(el, el.dataset.dash ? { opacity: 1, duration: 0.4 } : { strokeDashoffset: 0, duration: 1, ease: 'none' }, i * 0.28))
    tl.from('[data-lbl]', { opacity: 0, y: 10, stagger: 0.2, duration: 0.5 }, 1.2)
  }, { scope: ref })

  return (
    <div ref={ref}>
      <div className="shape-b overflow-hidden bg-brand-navy p-[6%] text-white [--shape-r:3rem]">
        <svg viewBox="100 150 1650 700" className="w-full" aria-label="Construção geométrica do logo">
          <Logo x={157} y={192} width={1535} height={550} color="#fff" dot="#fff" style={{ opacity: 0.12 }} />
          <g fill="none" stroke="#ff8b9a" strokeWidth={3}>
            {CIRCLES.map(([cx, cy, r, dash], i) => (
              <circle key={i} data-cn data-dash={dash ? '1' : undefined} cx={cx} cy={cy} r={r} />
            ))}
          </g>
          <g stroke="#fff" strokeWidth={2.5} fill="none" opacity={0.9}>
            <path data-cn d="M1333 770V840M1495 770V840M1333 805H1495" />
            <path data-cn d="M157 760H1692" strokeDasharray="0" />
          </g>
          <g fill="#fff" fontFamily="Maven Pro Variable, sans-serif" fontSize={30} fontWeight={500} letterSpacing="2">
            <text data-lbl x={1414} y={880} textAnchor="middle">x</text>
            <text data-lbl x={157} y={800}>LINHA BASE</text>
          </g>
        </svg>
      </div>
      <Fig>Fig. 3.1 · O símbolo inteiro é desenhado com uma única espessura de traço (x) usando apenas círculos e quartos de círculo.</Fig>
      <dl className="mt-10 grid grid-cols-2 gap-x-6 border-t border-line md:grid-cols-4">
        {[
          ['Módulo x', '161 u', 'Espessura do traço'],
          ['Raio externo', '1,45 x', 'Curvas do U, n e i'],
          ['Raio interno', '0,45 x', 'Vazios das curvas'],
          ['Ponto', 'Ø 0,85 x', 'Dois pontos, mesmo diâmetro'],
        ].map(([k, v, d]) => (
          <div key={k} className="grid gap-1 py-5">
            <dt className="label text-fg-muted">{k}</dt>
            <dd className="font-display text-2xl font-extrabold tracking-tight">{v}</dd>
            <p className="text-sm text-fg-muted">{d}</p>
          </div>
        ))}
      </dl>
    </div>
  )
}

/* ---------- 4.2 Área de proteção + tamanho mínimo ---------- */
function Clearspace() {
  return (
    <div className="grid gap-12">
      <div className="grid place-items-center overflow-hidden border border-line bg-white py-24">
        {/* x = 161/1535 of the logo width; with the box = logo + 2x, padding = 8.67% of the box */}
        <div className="@container w-[min(480px,78%)]">
          <div className="relative box-border w-full" style={{ ['--x' as string]: '8.67cqw', padding: 'var(--x)' }}>
            <div className="pointer-events-none absolute inset-0 border border-dashed border-brand-red" />
            <Logo className="relative block w-full outline outline-1 outline-brand-blue/40" />
            {['left-0 top-0', 'right-0 top-0', 'left-0 bottom-0', 'right-0 bottom-0'].map((p) => (
              <i key={p} className={cn('absolute grid place-items-center bg-brand-red/15 font-display text-[10px] font-bold not-italic text-brand-red', p)} style={{ width: 'var(--x)', height: 'var(--x)' }}>x</i>
            ))}
          </div>
        </div>
      </div>
      <Fig>Fig. 3.2 · Área de proteção: 1 x em todos os lados. Nada invade esse espaço.</Fig>

      <div className="grid gap-px border border-line bg-line md:grid-cols-3">
        {[
          { l: 'Logo completo · digital', m: '96 px de largura', node: <Logo style={{ width: 96 }} /> },
          { l: 'Símbolo reduzido · digital', m: '24 px de largura', node: <Logo mark style={{ width: 24 }} /> },
          { l: 'Logo completo · impresso', m: '25 mm de largura', node: <Logo style={{ width: '25mm' }} /> },
        ].map((t) => (
          <div key={t.l} className="grid min-h-48 content-between gap-8 bg-paper p-6">
            <span className="label text-fg-muted">{t.l}</span>
            <div className="flex min-h-12 items-end">{t.node}</div>
            <p className="font-display text-sm font-bold">{t.m}</p>
          </div>
        ))}
      </div>
      <Fig>Fig. 3.3 · Tamanhos mínimos (tamanho real). Abaixo disso, use o símbolo reduzido.</Fig>
    </div>
  )
}

/* ---------- 4.3 Versões ---------- */
interface TileProps { label: string; note: string; className: string; children: React.ReactNode; dark?: boolean }
function Tile({ label, note, className, children, dark }: TileProps) {
  return (
    <figure className="grid gap-3">
      <div className={cn('grid aspect-[4/3] place-items-center overflow-hidden p-[12%]', className)}>{children}</div>
      <figcaption className="grid gap-0.5">
        <span className={cn('label', dark && 'text-fg')}>{label}</span>
        <span className="text-sm text-fg-muted">{note}</span>
      </figcaption>
    </figure>
  )
}

function Versions() {
  return (
    <Reveal stagger={0.08} className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      <Tile label="Principal" note="Fundos claros. Versão preferida." className="border border-line bg-white text-brand-red"><Lockup color="#DD263E" /></Tile>
      <Tile label="Negativa · vermelho" note="Fundo vermelho da marca." className="bg-brand-red"><Lockup color="#fff" dot="#fff" /></Tile>
      <Tile label="Negativa · azul" note="Fundo azul profundo." className="bg-brand-navy"><Lockup color="#fff" dot="#fff" /></Tile>
      <Tile label="Sobre degradê" note="Cartão e telas de abertura." className="bg-brand-gradient"><Lockup color="#fff" dot="#fff" /></Tile>
      <Tile label="Monocromática escura" note="Impressão em uma cor." className="border border-line bg-white text-ink"><Lockup color="#0A1A2A" dot="#0A1A2A" /></Tile>
      <Tile label="Sobre fotografia" note="Branca, sobre áreas calmas." className="relative bg-ink"><img src="/assets/campanha.png" alt="" className="absolute inset-0 size-full object-cover opacity-60" /><div className="relative w-full"><Lockup color="#fff" dot="#fff" /></div></Tile>
    </Reveal>
  )
}

/* ---------- 4.4 Símbolo reduzido ---------- */
function MarkUse() {
  return (
    <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {[
        { l: 'Ícone do app', node: <div className="grid size-28 place-items-center rounded-[26px] bg-brand-red p-6 text-white"><Logo mark color="#fff" dot="#fff" className="w-full" /></div> },
        { l: 'Ícone alternativo', node: <div className="grid size-28 place-items-center rounded-[26px] bg-brand-gradient p-6"><Logo mark color="#fff" dot="#fff" className="w-full" /></div> },
        { l: 'Avatar', node: <div className="grid size-28 place-items-center rounded-full bg-brand-navy p-7"><Logo mark color="#fff" dot="#fff" className="w-full" /></div> },
        { l: 'Favicon', node: (
          <div className="flex items-end gap-4">
            {[16, 32, 48].map((s) => (
              <div key={s} className="grid place-items-center rounded-[22%] bg-brand-red" style={{ width: s, height: s, padding: s * 0.2 }}><Logo mark color="#fff" dot="#fff" className="w-full" /></div>
            ))}
          </div>
        ) },
      ].map((t) => (
        <div key={t.l} className="grid min-h-64 content-between gap-8 bg-paper p-6">
          <span className="label text-fg-muted">{t.l}</span>
          <div className="flex items-end">{t.node}</div>
        </div>
      ))}
    </div>
  )
}

/* ---------- 4.5 Usos incorretos ---------- */
const MISUSE: { l: string; node: React.ReactNode; bg?: string }[] = [
  { l: 'Não distorça', node: <Logo className="w-32 [transform:scaleX(1.5)_scaleY(.8)]" color="#DD263E" /> },
  { l: 'Não gire', node: <Logo className="w-36 -rotate-12" color="#DD263E" /> },
  { l: 'Não altere as cores', node: <Logo className="w-36" color="#16a34a" dot="#f59e0b" /> },
  { l: 'Não use contorno', node: <Logo className="w-36 [&_*]:fill-none [&_*]:stroke-brand-red [&_*]:stroke-[14]" color="none" dot="none" /> },
  { l: 'Não aplique sombras', node: <Logo className="w-36 drop-shadow-[8px_10px_6px_rgba(0,0,0,.45)]" color="#DD263E" /> },
  { l: 'Não mova o ponto', node: <Logo className="w-36 [&_[data-part=idot]]:[transform:translate(-720px,430px)]" color="#DD263E" /> },
  { l: 'Não use sobre fundos que brigam', bg: 'bg-[repeating-linear-gradient(45deg,#DD263E_0_14px,#1c90c8_14px_28px)]', node: <Logo className="w-36" color="#DD263E" /> },
  { l: 'Não use baixo contraste', bg: 'bg-brand-navy', node: <Logo className="w-36" color="#146792" dot="#00375E" /> },
]

function Misuse() {
  return (
    <Reveal stagger={0.06} className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
      {MISUSE.map((m) => (
        <figure key={m.l} className="grid gap-3">
          <div className={cn('relative grid aspect-square place-items-center overflow-hidden border border-line bg-white', m.bg)}>
            {m.node}
            <span className="absolute right-3 top-3 grid size-6 place-items-center rounded-full bg-brand-red text-white"><X className="size-3.5" strokeWidth={3} /></span>
          </div>
          <figcaption className="text-sm">{m.l}</figcaption>
        </figure>
      ))}
    </Reveal>
  )
}

export function LogoChapter() {
  return (
    <Chapter
      id="logo" n="03" title="O *logo*" theme="paper"
      intro={<>Uma linha só, com a mesma espessura do começo ao fim. O <b className="font-bold text-fg">b</b> é a pessoa, o ponto é o encontro e <b className="font-bold text-fg">Uni</b> corre sem interrupção. O ponto azul no <b className="font-bold text-fg">i</b> é a assinatura: o que torna cada um único.</>}
    >
      <Block n="3.1" title="Construção" note="Geometria que serve de régua para todo o resto da marca."><Construction /></Block>
      <Block n="3.2" title="Proteção e tamanho" note="Espaço mínimo ao redor e menor tamanho de uso."><Clearspace /></Block>
      <Block n="3.3" title="Versões" note="Escolha a versão pelo fundo, nunca pelo gosto."><Versions /></Block>
      <Block n="3.4" title="Símbolo reduzido" note="O “b·” funciona sozinho onde o logo completo não cabe."><MarkUse /></Block>
      <Block n="3.5" title="Usos incorretos" note="O logo é feito de geometria precisa. Qualquer mudança quebra a lógica."><Misuse /></Block>
    </Chapter>
  )
}
