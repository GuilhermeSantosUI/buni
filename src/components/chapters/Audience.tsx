import { JourneyFlow } from '@/components/brand/JourneyFlow'
import { Block, Chapter } from '@/components/brand/Chapter'
import { Reveal } from '@/components/brand/Reveal'

const PERSONAS = [
  {
    tag: 'A', range: '18–28', name: 'Estudante de graduação', bg: 'bg-brand-red',
    who: 'Primeira conta própria, renda irregular (bolsa, estágio, mesada) e uma mensalidade que pesa.',
    needs: 'Conta sem tarifa, controle simples do dinheiro e algum retorno sobre o maior gasto do mês.',
    pain: 'Tarifas inesperadas, linguagem difícil, nenhum histórico para acessar crédito.',
    entry: 'Conta digital sem taxas, cashback na mensalidade, educação financeira.',
    voice: 'Direta, leve, sem sermão.',
  },
  {
    tag: 'B', range: '25–60', name: 'Profissional da Educação', bg: 'bg-brand-navy',
    who: 'Professores, coordenação e equipe administrativa de escolas e faculdades.',
    needs: 'Crédito com condições transparentes, salário em conta sem custo e atendimento que resolve.',
    pain: 'Juros altos, burocracia, ofertas confusas e desconfiança com banco digital.',
    entry: 'Empréstimo pessoal e consignado, segurança em primeiro lugar, atendimento humanizado.',
    voice: 'Respeitosa, clara, objetiva.',
  },
  {
    tag: 'C', range: 'B2B', name: 'Instituição de ensino', bg: 'bg-brand-blue',
    who: 'Faculdades e redes de ensino que querem uma relação financeira mais simples com seus alunos.',
    needs: 'Parceiro que facilite o pagamento da mensalidade e fortaleça o vínculo com a comunidade acadêmica.',
    pain: 'Inadimplência, comunicação fria e pouca ferramenta de relacionamento.',
    entry: 'Parcerias em torno da mensalidade e da jornada financeira do aluno.',
    voice: 'Institucional sem ser engessada.',
  },
]

const ROWS: [string, keyof (typeof PERSONAS)[number]][] = [
  ['Quem é', 'who'], ['Precisa de', 'needs'], ['Dor principal', 'pain'], ['Como o b.Uni entra', 'entry'], ['Tom de voz', 'voice'],
]

const JOURNEY = [
  ['Matrícula', 'Abre a primeira conta', 'Conta sem taxas'],
  ['Mensalidade', 'Precisa pagar em dia', 'Cashback na mensalidade'],
  ['Dia a dia', 'Organiza o que sobra', 'Educação financeira'],
  ['Estágio', 'Recebe o primeiro pagamento', 'Atendimento humanizado'],
  ['Formatura', 'Planeja o próximo passo', 'Empréstimo pessoal'],
  ['Carreira', 'Cresce e cuida do que construiu', 'Segurança e consignado'],
]

const FLOW = JOURNEY.map(([moment, need, offer]) => ({
  label: moment,
  detail: <><b className="font-bold">{need}.</b> <span className="text-fg-muted">O b.Uni entra com</span> <b className="font-bold text-accent">{offer.toLowerCase()}</b>.</>,
}))

export function Audience() {
  return (
    <Chapter
      id="publico" n="02" title="Para *quem* a marca existe" theme="navy"
      intro="O b.Uni fala com a comunidade que faz a Educação acontecer. Três perfis orientam o tom, a oferta e os canais."
    >
      <Block n="2.1" title="Perfis" note="Hipóteses de trabalho para validar com pesquisa e dados de base.">
        <Reveal stagger={0.15} className="grid gap-x-8 gap-y-16 lg:grid-cols-3">
          {PERSONAS.map((p) => (
            <article key={p.tag} className="grid content-start">
              <div className={`shape-b relative mb-8 flex aspect-[5/4] flex-col justify-between p-6 [--shape-r:3rem] ${p.bg}`}>
                <span className="label">Perfil {p.tag}</span>
                <div>
                  <p className="font-display text-6xl font-extrabold tracking-[-0.05em]">{p.range}</p>
                  <h4 className="mt-1 font-display text-xl font-bold tracking-tight">{p.name}</h4>
                </div>
              </div>
              {ROWS.map(([label, key]) => (
                <div key={label} className="grid gap-1.5 border-t border-line py-4">
                  <span className="label text-fg-muted">{label}</span>
                  <p className="text-[.95rem]">{p[key]}</p>
                </div>
              ))}
            </article>
          ))}
        </Reveal>
      </Block>

      <Block n="2.2" title="Jornada acadêmica" note="O b.Uni acompanha a vida inteira do estudante, e não apenas o momento da venda.">
        <JourneyFlow steps={FLOW} start={3} />
      </Block>
    </Chapter>
  )
}
