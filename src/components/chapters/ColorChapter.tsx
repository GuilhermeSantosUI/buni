import { useRef } from 'react'
import { Copy } from 'lucide-react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { Block, Chapter, Fig } from '@/components/brand/Chapter'
import { Reveal } from '@/components/brand/Reveal'
import { useCopy } from '@/hooks/useCopy'
import { cmyk, contrast, hexToRgb, mix } from '@/lib/color'
import { cn } from '@/lib/utils'

const PALETTE = [
  { name: 'Vermelho b.Uni', role: 'Primária · ação e energia', hex: '#DD263E', fg: '#fff' },
  { name: 'Azul Profundo', role: 'Primária · confiança', hex: '#00375E', fg: '#fff' },
  { name: 'Azul Ponto', role: 'Assinatura · detalhe', hex: '#146792', fg: '#fff' },
  { name: 'Grafite', role: 'Texto secundário', hex: '#575756', fg: '#fff' },
  { name: 'Tinta', role: 'Texto sobre claro*', hex: '#0A1A2A', fg: '#fff' },
  { name: 'Branco', role: 'Base e respiro', hex: '#FFFFFF', fg: '#0A1A2A' },
]

const RAMPS = [
  { name: 'Vermelho', base: '#DD263E' },
  { name: 'Azul Profundo', base: '#00375E' },
  { name: 'Azul Ponto', base: '#146792' },
]
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

function ramp(base: string) {
  return STEPS.map((s) => {
    if (s === 500) return base
    return s < 500 ? mix('#FFFFFF', base, 0.12 + (s / 500) * 0.88) : mix(base, '#000000', ((s - 500) / 400) * 0.62)
  })
}

const PAIRS = [
  ['#FFFFFF', '#DD263E', 'Branco sobre vermelho'],
  ['#FFFFFF', '#00375E', 'Branco sobre azul profundo'],
  ['#FFFFFF', '#146792', 'Branco sobre azul ponto'],
  ['#0A1A2A', '#F5F3EF', 'Tinta sobre papel'],
  ['#DD263E', '#FFFFFF', 'Vermelho sobre branco'],
  ['#575756', '#FFFFFF', 'Grafite sobre branco'],
  ['#FF8B9A', '#00375E', 'Rosa de apoio sobre azul'],
  ['#FFFFFF', '#1C90C8', 'Branco sobre ciano'],
]

function Palette() {
  const copy = useCopy()
  return (
    <>
      <Reveal className="flex flex-col border border-line md:h-[560px] md:flex-row">
        {PALETTE.map((c) => {
          const [r, g, b] = hexToRgb(c.hex)
          const k = cmyk(c.hex)
          return (
            <button
              key={c.hex}
              onClick={() => copy(c.hex)}
              style={{ backgroundColor: c.hex, color: c.fg }}
              className={cn('group relative flex min-h-36 flex-1 cursor-pointer flex-col justify-between p-5 text-left outline-none transition-[flex-grow] duration-500 ease-out md:hover:flex-[2.2]', c.hex === '#FFFFFF' && 'border-l border-line')}
            >
              <span className="label opacity-80">{c.role}</span>
              <div className="grid gap-3">
                <h4 className="font-display text-2xl font-extrabold leading-none tracking-tight" style={{ color: c.fg }}>{c.name}</h4>
                <dl className="grid gap-0.5 text-[.8rem] opacity-90">
                  <div className="flex gap-3"><dt className="w-10 opacity-60">HEX</dt><dd>{c.hex}</dd></div>
                  <div className="flex gap-3"><dt className="w-10 opacity-60">RGB</dt><dd>{r} {g} {b}</dd></div>
                  <div className="flex gap-3"><dt className="w-10 opacity-60">CMYK</dt><dd>{k.join(' ')}</dd></div>
                </dl>
                <Copy className="size-4 opacity-0 transition-opacity group-hover:opacity-80" />
              </div>
            </button>
          )
        })}
      </Reveal>
      <Fig>Fig. 4.1 · Clique para copiar o HEX. *Tinta é derivada do Azul Profundo para texto; CMYK é conversão aproximada, calibre com a gráfica.</Fig>
    </>
  )
}

function Ramps() {
  const copy = useCopy()
  return (
    <div className="grid gap-10">
      {RAMPS.map((r) => (
        <Reveal key={r.name} className="grid gap-3">
          <span className="label">{r.name}</span>
          <div className="grid grid-cols-5 border border-line md:grid-cols-10">
            {ramp(r.base).map((hex, i) => (
              <button
                key={STEPS[i]}
                onClick={() => copy(hex)}
                style={{ backgroundColor: hex, color: contrast('#FFFFFF', hex) >= 4.5 ? '#fff' : '#0A1A2A' }}
                className="group relative grid aspect-[3/4] cursor-pointer content-end p-2 text-left text-[.65rem] leading-tight outline-none transition-transform hover:z-10 hover:scale-110"
              >
                <b className="font-display">{STEPS[i]}</b>
                <span className="opacity-70">{hex.slice(1)}</span>
                {STEPS[i] === 500 && <i className="absolute right-2 top-2 size-1.5 rounded-full bg-current" />}
              </button>
            ))}
          </div>
        </Reveal>
      ))}
      <Fig>Fig. 4.2 · Escalas para interface. O passo 500 é a cor da marca; 50–200 para fundos suaves, 600–900 para estados e texto.</Fig>
    </div>
  )
}

const CSS_GRADIENT = 'linear-gradient(135deg, #1C90C8 0%, #843077 38%, #E92F44 68%, #3E4889 100%)'

function Gradient() {
  const ref = useRef<HTMLDivElement>(null)
  const copy = useCopy()
  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.fromTo('[data-gfill]', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'power3.inOut', scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
  }, { scope: ref })
  return (
    <div ref={ref}>
      <div data-gfill className="shape-b relative aspect-[21/9] overflow-hidden bg-brand-gradient [--shape-r:3rem]">
        <div className="absolute inset-x-0 bottom-0 flex justify-between p-5 text-[.7rem] font-medium text-white">
          {[['#1C90C8', '0%'], ['#843077', '38%'], ['#E92F44', '68%'], ['#3E4889', '100%']].map(([h, p]) => (
            <span key={h} className="grid gap-0.5"><b className="font-display">{h}</b><span className="opacity-70">{p}</span></span>
          ))}
        </div>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1fr]">
        <button onClick={() => copy(CSS_GRADIENT)} className="group cursor-pointer border border-line bg-ink p-5 text-left font-mono text-xs leading-relaxed text-white/80 transition-colors hover:bg-ink/90">
          <span className="label mb-3 flex items-center justify-between text-white/50">CSS <Copy className="size-3.5" /></span>
          background: {CSS_GRADIENT};
        </button>
        <ul className="grid gap-3 text-sm">
          {['Use o degradê em superfícies de destaque: cartão, abertura de app, capas.', 'Logo e texto sobre ele sempre em branco.', 'Nunca atrás de texto corrido ou de números financeiros.', 'Ângulo fixo em 135°. Não inverta a ordem das cores.'].map((t) => (
            <li key={t} className="border-t border-line pt-3">{t}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Proportion() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.from('[data-r]', { flexGrow: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 85%' } })
  }, { scope: ref })
  return (
    <div ref={ref} className="flex h-40 border border-line">
      {[
        ['Branco · papel', 45, '#FFFFFF', '#0A1A2A'],
        ['Vermelho', 25, '#DD263E', '#fff'],
        ['Azul profundo', 20, '#00375E', '#fff'],
        ['Degradê', 10, CSS_GRADIENT, '#fff'],
      ].map(([l, w, bg, fg]) => (
        <div key={l as string} data-r style={{ flex: w as number, background: bg as string, color: fg as string }} className="flex items-end overflow-hidden p-3">
          <span className="label whitespace-nowrap">{l} {w}%</span>
        </div>
      ))}
    </div>
  )
}

function Contrast() {
  return (
    <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {PAIRS.map(([fg, bg, label]) => {
        const ratio = contrast(fg, bg)
        const tests: [string, boolean][] = [['AA texto', ratio >= 4.5], ['AA grande', ratio >= 3], ['AAA', ratio >= 7]]
        return (
          <div key={label} className="grid gap-5 bg-paper p-4">
            <div className="grid h-28 place-items-center border border-line font-display text-5xl font-extrabold tracking-tight" style={{ color: fg, backgroundColor: bg }}>Aa</div>
            <div className="grid gap-2">
              <p className="text-sm">{label}</p>
              <p className="font-display text-2xl font-extrabold tracking-tight">{ratio.toFixed(2)}<span className="text-sm font-bold text-fg-muted"> : 1</span></p>
              <div className="flex flex-wrap gap-1.5">
                {tests.map(([t, ok]) => (
                  <span key={t} className={cn('label rounded-full px-2 py-1 text-[.6rem]', ok ? 'bg-ink text-white' : 'bg-fg/8 text-fg-muted line-through')}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ColorChapter() {
  return (
    <Chapter
      id="cor" n="04" title="A *cor* da marca" theme="paper"
      intro="Vermelho e azul em tensão: energia e confiança. O vermelho chama para a ação; o azul sustenta a conversa. O degradê entre os dois é o que dá movimento ao universo b.Uni."
    >
      <Block n="4.1" title="Paleta" note="Seis cores. Duas primárias carregam quase tudo."><Palette /></Block>
      <Block n="4.2" title="Escalas" note="Tons derivados para estados, fundos e texto em interface."><Ramps /></Block>
      <Block n="4.3" title="Degradê" note="O momento de expressão da marca."><Gradient /></Block>
      <Block n="4.4" title="Proporção" note="Quanto de cada cor, em uma peça equilibrada."><Proportion /></Block>
      <Block n="4.5" title="Acessibilidade" note="Razões de contraste calculadas (WCAG 2.2) para os pares mais usados."><Contrast /><Fig>Fig. 4.5 · Texto de corpo exige AA (4,5:1). Pares sem AA só valem para elementos grandes ou decorativos.</Fig></Block>
    </Chapter>
  )
}
