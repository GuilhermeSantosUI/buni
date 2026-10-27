import { Band, Heading } from '../Band'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const FAQ = [
  ['O que é o b.Uni?', 'A primeira conta digital da Educação, feita para estudantes, profissionais e instituições de ensino. Conta, crédito e seguros no mesmo app.'],
  ['A conta tem tarifa de manutenção?', 'Não. A conta digital b.Uni não tem tarifa de manutenção.'],
  ['Como funciona o cashback na mensalidade?', 'Quando você paga a mensalidade da faculdade pelo b.Uni, parte do valor volta para você. As regras e as instituições participantes ficam disponíveis no app.'],
  ['Quais produtos já estão disponíveis?', 'Conta digital, crédito consignado (sujeito a análise) e seguros. Crédito pessoal e o cartão de débito e crédito chegam em breve.'],
  ['Todo crédito passa por análise?', 'Sim. Toda concessão de crédito é sujeita a análise, e você vê as condições antes de decidir.'],
  ['Como falo com alguém?', 'Pelo atendimento no app, com gente de verdade. Respondemos no seu ritmo.'],
  ['E a segurança da minha conta?', 'Segurança é a primeira prioridade, antes de qualquer novidade. Nunca compartilhe senhas ou códigos recebidos, nem com a gente.'],
]

export function Faq() {
  return (
    <Band id="duvidas" theme="white" className="py-28 md:py-40">
      <div className="container-x grid gap-x-16 gap-y-12 lg:grid-cols-[.8fr_1.2fr]">
        <Heading eyebrow="Dúvidas" title="Perguntas *frequentes.*" lead="Respostas curtas, sem juridiquês." className="!mb-0" />
        <Accordion type="single" collapsible defaultValue="item-0">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`item-${i}`}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Band>
  )
}
