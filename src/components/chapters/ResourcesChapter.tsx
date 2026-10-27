import { Download } from 'lucide-react'
import { Block, Chapter } from '@/components/brand/Chapter'
import { Logo } from '@/components/brand/Logo'
import { Reveal } from '@/components/brand/Reveal'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const FILES: [string, string, string, string][] = [
  ['Logo principal', 'SVG', '/assets/logo.svg', 'Fundos claros'],
  ['Logo negativo', 'SVG', '/assets/logo-white.svg', 'Fundos coloridos e escuros'],
  ['Logo monocromático', 'SVG', '/assets/logo-mono.svg', 'Impressão em uma cor'],
  ['Símbolo reduzido', 'SVG', '/assets/mark.svg', 'Avatares e ícones'],
  ['Símbolo reduzido negativo', 'SVG', '/assets/mark-white.svg', 'Ícones sobre cor'],
  ['Logo com assinatura', 'PNG', '/assets/logo-full.png', 'Referência original'],
  ['Cartão', 'PNG', '/assets/card.png', 'Mockup de referência'],
]

const FAQ = [
  ['Posso usar o logo sobre fotografias?', 'Sim, na versão branca, sobre áreas calmas e sem detalhes. Se a foto for muito clara ou movimentada, use o logo sobre um bloco de cor da marca.'],
  ['Qual cor de texto devo usar sobre o degradê?', 'Sempre branco, em Maven Pro Bold ou ExtraBold, a partir de 20 px. Nunca use texto corrido sobre o degradê.'],
  ['Posso criar novas versões do logo ou mudar o ponto azul?', 'Não. O ponto azul só muda de cor nas versões negativas e monocromáticas. Qualquer outra alteração deve ser aprovada pelo time de marca.'],
  ['Como escrevo o nome em textos?', 'b.Uni, com “b” minúsculo, “U” maiúsculo e ponto entre eles. Em qualquer contexto, inclusive início de frase.'],
  ['Posso usar outra fonte se a Maven Pro não estiver disponível?', 'Em e-mails e documentos de escritório, use Arial. Em qualquer peça de marca, instale a Maven Pro, que é gratuita.'],
  ['Quando posso usar um emoji ou um tom mais brincalhão?', 'Em contextos leves (conteúdo educativo, datas, conquistas). Nunca em cobranças, erros ou qualquer mensagem sobre dinheiro em risco.'],
]

export function ResourcesChapter() {
  return (
    <>
      <Chapter
        id="recursos" n="12" title="*Recursos* e dúvidas" theme="paper"
        intro="Arquivos prontos para uso e respostas para as dúvidas mais comuns de quem produz peças da marca."
      >
        <Block n="12.1" title="Arquivos" note="Logos em vetor, geradas a partir da geometria oficial do símbolo.">
          <Table>
            <TableHeader><TableRow className="border-t-0"><TableHead>Arquivo</TableHead><TableHead>Formato</TableHead><TableHead>Uso</TableHead><TableHead className="text-right"> </TableHead></TableRow></TableHeader>
            <TableBody>
              {FILES.map(([n, f, href, u]) => (
                <TableRow key={n}>
                  <TableCell className="font-display font-bold">{n}</TableCell>
                  <TableCell className="label">{f}</TableCell>
                  <TableCell className="text-fg-muted">{u}</TableCell>
                  <TableCell className="text-right"><Button asChild size="sm" variant="outline"><a href={href} download><Download className="size-3.5" />Baixar</a></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="label mt-6 max-w-[70ch] text-fg-muted normal-case tracking-normal">Os SVGs foram reconstruídos a partir do PNG de referência (precisão geométrica de 99%). Para produção em grande formato, substitua pelos arquivos vetoriais originais da marca.</p>
        </Block>

        <Block n="12.2" title="Perguntas frequentes" note="Se a sua dúvida não estiver aqui, pergunte ao time de marca.">
          <Reveal>
            <Accordion type="single" collapsible defaultValue="item-0">
              {FAQ.map(([q, a], i) => (
                <AccordionItem key={q} value={`item-${i}`}>
                  <AccordionTrigger>{q}</AccordionTrigger>
                  <AccordionContent>{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </Block>
      </Chapter>

      <footer data-tone="dark" className="theme-red relative overflow-hidden bg-bg pt-24 text-fg">
        <div className="container-x grid grid-cols-12 gap-6">
          <p className="display-md col-span-12 md:col-span-7">Único <span className="font-normal">como você.</span></p>
          <p className="label col-span-6 md:col-span-3 md:col-start-9">Livro de marca<br />Versão 1.0 · 2026</p>
          <p className="label col-span-6 md:col-span-2 md:text-right">b.Uni<br />Conta digital da Educação<br /><a href="/landing.html" className="mt-2 inline-block underline underline-offset-4">Ver a landing page</a></p>
        </div>
        <div className="container-x mt-16 translate-y-[18%]">
          <Logo className="w-full" color="#fff" dot="#fff" style={{ opacity: 0.95 }} />
        </div>
      </footer>
    </>
  )
}
