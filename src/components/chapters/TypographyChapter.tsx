import { useState } from 'react'
import { Block, Chapter, Fig } from '@/components/brand/Chapter'
import { Reveal } from '@/components/brand/Reveal'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÂÊÔÃÕÇ.,;:!?R$%+→'

const WEIGHTS = [[400, 'Regular', 'Texto corrido e legendas'], [500, 'Medium', 'Rótulos e interface'], [700, 'Bold', 'Subtítulos e botões'], [800, 'ExtraBold', 'Títulos e valores'], [900, 'Black', 'Ênfase máxima, uso raro']] as const

const SCALE = [
  { token: 'Display XL', spec: 'Maven Pro 800 · 152/94% · −4,5%', cls: 'font-extrabold', size: 'clamp(3rem,9vw,9.5rem)', lh: 0.94, ls: '-0.045em', sample: 'Único' },
  { token: 'Display L', spec: 'Maven Pro 800 · 96/98% · −4%', cls: 'font-extrabold', size: 'clamp(2.4rem,6vw,6rem)', lh: 0.98, ls: '-0.04em', sample: 'Chegou b.Uni.' },
  { token: 'H1', spec: 'Maven Pro 800 · 56/104% · −3%', cls: 'font-extrabold', size: '3.5rem', lh: 1.04, ls: '-0.03em', sample: 'A primeira conta digital da Educação.' },
  { token: 'H2', spec: 'Maven Pro 700 · 40/108% · −3%', cls: 'font-bold', size: '2.5rem', lh: 1.08, ls: '-0.03em', sample: 'Cashback na mensalidade.' },
  { token: 'H3', spec: 'Maven Pro 700 · 28/115% · −2%', cls: 'font-bold', size: '1.75rem', lh: 1.15, ls: '-0.02em', sample: 'Sua conta, sem taxas.' },
  { token: 'Lead', spec: 'Maven Pro 400 · 22/150%', cls: 'font-normal', size: '1.375rem', lh: 1.5, ls: '0', sample: 'Abra sua conta e acompanhe seu dinheiro do jeito que a sua rotina pede.' },
  { token: 'Corpo', spec: 'Maven Pro 400 · 16/160%', cls: 'font-normal', size: '1rem', lh: 1.6, ls: '0', sample: 'Sem tarifa de manutenção, com atendimento de gente de verdade e segurança em primeiro lugar.' },
  { token: 'Rótulo', spec: 'Maven Pro 500 · 11/120% · +14% · CAIXA ALTA', cls: 'font-medium uppercase', size: '0.6875rem', lh: 1.2, ls: '0.14em', sample: 'Conta digital da Educação' },
]

function Specimens() {
  return (
    <div className="grid gap-px border border-line bg-line lg:grid-cols-[1.3fr_1fr]">
      <article className="grid gap-8 bg-paper p-8">
        <div className="flex items-start justify-between">
          <span className="label">Família única · todo o texto</span>
          <span className="label text-fg-muted">Google Fonts</span>
        </div>
        <div className="text-[clamp(8rem,20vw,17rem)] font-extrabold leading-[.85] tracking-[-0.05em] text-accent">Aa</div>
        <div>
          <h4 className="text-4xl font-extrabold tracking-tight">Maven Pro</h4>
          <p className="mt-2 max-w-[48ch] text-sm text-fg-muted">Arredondada e acolhedora, com formas abertas que lembram as curvas do logo. Uma única família, variável de 400 a 900, mantém a marca coesa e leve para carregar.</p>
        </div>
        <p className="break-all text-lg leading-snug opacity-70">{GLYPHS}</p>
      </article>
      <article className="grid content-start bg-paper p-8">
        <span className="label mb-4">Pesos e papéis</span>
        {WEIGHTS.map(([w, l, u]) => (
          <div key={l} className="flex items-baseline justify-between gap-6 border-t border-line py-4">
            <span className="text-3xl tracking-tight" style={{ fontWeight: w }}>{l}</span>
            <span className="max-w-[20ch] text-right text-xs text-fg-muted">{w} · {u}</span>
          </div>
        ))}
      </article>
    </div>
  )
}

function Scale() {
  return (
    <div>
      {SCALE.map((s) => (
        <div key={s.token} className="grid gap-x-8 gap-y-3 border-t border-line py-7 md:grid-cols-[170px_1fr]">
          <div className="grid content-start gap-1">
            <span className="font-display text-sm font-bold">{s.token}</span>
            <span className="text-xs text-fg-muted">{s.spec}</span>
          </div>
          <p className={cn('max-w-full font-body', s.cls)} style={{ fontSize: s.size, lineHeight: s.lh, letterSpacing: s.ls, whiteSpace: s.token.startsWith('Display') ? 'nowrap' : 'normal' }}>{s.sample}</p>
        </div>
      ))}
      <div className="border-t border-line" />
    </div>
  )
}

function InUse() {
  return (
    <Reveal>
      <div className="shape-b relative overflow-hidden bg-brand-navy p-8 text-white [--shape-r:3rem] md:p-14">
        <div className="relative grid gap-5 md:max-w-[620px]">
          <span className="label text-brand-pink">Rótulo · Conta digital da Educação</span>
          <p className="font-display text-[clamp(1.5rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-tight">Chegou b.Uni.</p>
          <p className="font-display text-[clamp(2.2rem,5vw,4.6rem)] font-extrabold leading-[.98] tracking-[-0.04em] text-white">A primeira conta digital da <span className="text-brand-pink">Educação.</span></p>
          <p className="max-w-[44ch] font-body text-lg font-normal text-white/75">Sem taxas, com cashback na mensalidade e atendimento de gente de verdade.</p>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/20 pt-4 text-xs text-white/60 md:max-w-[620px]">
          <span><b className="mb-1 block font-display text-white">Display</b>Medium + ExtraBold</span>
          <span><b className="mb-1 block font-display text-white">Lead</b>Regular 400</span>
          <span><b className="mb-1 block font-display text-white">Rótulo</b>Caixa alta +14%</span>
        </div>
      </div>
      <Fig>Fig. 5.3 · Composição padrão: chamada em Medium, ênfase em ExtraBold, ponto final como assinatura.</Fig>
    </Reveal>
  )
}

function Tester() {
  const [text, setText] = useState('Único como você.')
  const [fam, setFam] = useState('800')
  const [size, setSize] = useState(96)
  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Tabs value={fam} onValueChange={setFam}>
          <TabsList>{[['400', 'Regular'], ['700', 'Bold'], ['800', 'ExtraBold'], ['900', 'Black']].map(([v, l]) => <TabsTrigger key={v} value={v}>{l}</TabsTrigger>)}</TabsList>
        </Tabs>
        <label className="label flex items-center gap-4">Tamanho {size}px
          <input type="range" min={24} max={160} value={size} onChange={(e) => setSize(+e.target.value)} className="w-40 accent-brand-red" />
        </label>
      </div>
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Digite um texto" aria-label="Texto de teste" />
      <p className="min-h-[1.2em] break-words tracking-[-0.035em]" style={{ fontSize: size, lineHeight: 1.02, fontWeight: Number(fam) }}>{text || '\u00a0'}</p>
    </div>
  )
}

export function TypographyChapter() {
  return (
    <Chapter
      id="tipografia" n="05" title="A *tipografia*" theme="white"
      intro="Uma única família, a Maven Pro, em pesos de 400 a 900. O contraste de peso, e não de fonte, dá a hierarquia e a personalidade ao texto."
    >
      <Block n="5.1" title="Família" note="Gratuita, com suporte completo ao português."><Specimens /></Block>
      <Block n="5.2" title="Escala" note="Tamanhos reais, na proporção do site. Em peças impressas, mantenha as proporções."><Scale /></Block>
      <Block n="5.3" title="Em uso" note="Hierarquia clara: um gesto grande, um apoio, um rótulo."><InUse /></Block>
      <Block n="5.4" title="Testador" note="Escreva e veja como o b.Uni soaria."><Tester /></Block>
      <Block n="5.5" title="Regras" note="Poucas, e sem exceção.">
        <ul className="grid gap-x-8 md:grid-cols-2">
          {[
            'Títulos em caixa mista, com tracking negativo. Caixa alta só em rótulos curtos.',
            'Contraste de peso é o recurso de ênfase: Regular ou Medium ao lado de ExtraBold na mesma frase. Nunca itálico.',
            'Texto corrido em Regular 400, de 60 a 70 caracteres por linha.',
            'Mínimo de 14 px em interface e 8 pt em impressos.',
            'Alinhamento à esquerda. Centralizado só em frases curtas de campanha.',
            'Títulos de campanha terminam com ponto final, como “Chegou b.Uni.”.',
          ].map((r, i) => (
            <li key={r} className="flex gap-4 border-t border-line py-5"><span className="font-display text-sm font-bold text-accent">0{i + 1}</span><span>{r}</span></li>
          ))}
        </ul>
      </Block>
    </Chapter>
  )
}
