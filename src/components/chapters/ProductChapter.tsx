import { Copy } from 'lucide-react'
import { Block, Chapter, Fig } from '@/components/brand/Chapter'
import { Reveal } from '@/components/brand/Reveal'
import { Components } from '@/components/product/Components'
import { PhoneApp } from '@/components/product/PhoneApp'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useCopy } from '@/hooks/useCopy'

const TOKENS: [string, string, string, string][] = [
  ['Cor', 'color.brand.red', '#DD263E', 'Ação principal e destaques'],
  ['Cor', 'color.brand.navy', '#00375E', 'Fundos escuros e títulos'],
  ['Cor', 'color.signal', '#146792', 'Status, notificações, ponto'],
  ['Cor', 'color.text.muted', '#575756', 'Texto secundário'],
  ['Raio', 'radius.md', '16px', 'Campos, chips, listas'],
  ['Raio', 'radius.lg', '32px', 'Cards de conteúdo'],
  ['Raio', 'radius.xl', '48px', 'Painéis de destaque. Canto superior esquerdo reto (âncora)'],
  ['Espaço', 'space.1 … space.8', '4 · 8 · 12 · 16 · 24 · 32 · 48 · 64', 'Escala em múltiplos de 4'],
  ['Sombra', 'elevation.1', '0 1px 2px rgba(10,26,42,.08)', 'Listas e campos'],
  ['Sombra', 'elevation.2', '0 12px 32px -12px rgba(10,26,42,.25)', 'Cards em destaque e modais'],
  ['Fonte', 'font.family', 'Maven Pro', 'Todo o texto, em pesos de 400 a 900'],
  ['Movimento', 'duration.base · ease.enter', '600ms · power3.out', 'Entradas de conteúdo'],
]

const CSS_TOKENS = `:root {
  --buni-red: #DD263E;
  --buni-navy: #00375E;
  --buni-signal: #146792;
  --buni-grey: #575756;
  --buni-ink: #0A1A2A;
  --buni-gradient: linear-gradient(135deg, #1C90C8 0%, #843077 38%, #E92F44 68%, #3E4889 100%);
  --radius-md: 16px;
  --radius-lg: 32px;
  --font-family: "Maven Pro", sans-serif;
}`

const CALLOUTS = [
  ['Saldo em degradê', 'O único lugar da tela onde o degradê aparece. Valor sempre em Maven Pro ExtraBold.'],
  ['Uma âncora por tela', 'Só o card de saldo tem o canto reto. Atalhos e demais cards são arredondados.'],
  ['Ponto azul', 'O único ponto da tela: avisa que há uma notificação nova. Aba ativa usa vermelho.'],
  ['Cashback em evidência', 'A promessa da marca vira informação útil, com progresso visível.'],
  ['Texto humano', 'Saudação por nome e rótulos curtos, sem jargão.'],
]

export function ProductChapter() {
  const copy = useCopy()
  return (
    <Chapter
      id="produto" n="09" title="A marca *no produto*" theme="ink"
      intro="Uma marca de banco vive, na prática, dentro do app. Estes são os tokens e componentes que traduzem logo, cor e voz em interface."
    >
      <Block n="9.1" title="Tokens" note="Fonte única de valores para design e código.">
        <Table>
          <TableHeader><TableRow className="border-t-0"><TableHead>Tipo</TableHead><TableHead>Token</TableHead><TableHead>Valor</TableHead><TableHead>Uso</TableHead></TableRow></TableHeader>
          <TableBody>
            {TOKENS.map(([t, k, v, u]) => (
              <TableRow key={k}>
                <TableCell className="label w-24 text-fg-muted">{t}</TableCell>
                <TableCell className="font-mono text-[.8rem]">{k}</TableCell>
                <TableCell className="font-display font-bold">{v.startsWith('#') && <i className="mr-2 inline-block size-3 rounded-full align-middle" style={{ background: v }} />}{v}</TableCell>
                <TableCell className="text-fg-muted">{u}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button className="mt-8" variant="light" onClick={() => copy(CSS_TOKENS, 'Tokens CSS')}><Copy className="size-4" />Copiar como variáveis CSS</Button>
      </Block>

      <Block n="9.2" title="Componentes" note="Construídos com shadcn/ui e estilizados com os tokens acima. Interativos.">
        <Components />
        <Fig>Fig. 9.2 · Todos os componentes são reais: edite o valor do Pix, ligue os seletores, dispare o toast.</Fig>
      </Block>

      <Block n="9.3" title="App em contexto" note="A marca aplicada a uma tela real de início.">
        <div className="grid items-center gap-14 lg:grid-cols-[auto_1fr]">
          <PhoneApp />
          <Reveal stagger={0.1}>
            {CALLOUTS.map(([t, d], i) => (
              <div key={t} className="grid gap-3 border-t border-line py-5 sm:grid-cols-[40px_1fr]">
                <span className="font-display text-sm font-bold text-accent">0{i + 1}</span>
                <div><h4 className="font-display text-lg font-bold tracking-tight">{t}</h4><p className="mt-1 text-fg-muted">{d}</p></div>
              </div>
            ))}
            <div className="border-t border-line" />
          </Reveal>
        </div>
        <Fig>Fig. 9.3 · Saldo e valores são ilustrativos. Toque no olho para ocultar o saldo.</Fig>
      </Block>
    </Chapter>
  )
}
