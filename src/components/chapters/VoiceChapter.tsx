import { BellRing, CheckCircle2, Inbox, TriangleAlert } from 'lucide-react'
import { Block, Chapter } from '@/components/brand/Chapter'
import { Reveal } from '@/components/brand/Reveal'

const PRINCIPLES = [
  { t: 'Próximo', s: 'Fala como um colega de turma que entende de dinheiro.', yes: '“Vamos abrir sua conta?”', no: '“Prezado cliente, inicie seu cadastro.”' },
  { t: 'Claro', s: 'Se tem taxa, dizemos. Se não tem, dizemos também.', yes: '“Sem taxas. Sem pegadinha.”', no: '“Isenção sujeita a condições.”' },
  { t: 'Confiante', s: 'Afirma sem arrogância. Segurança vem antes do entusiasmo.', yes: '“Sua conta está protegida.”', no: '“A melhor conta do universo!!!”' },
]

const REWRITES = [
  ['Prezado cliente, informamos que não há cobrança de tarifas de manutenção.', 'Sua conta não tem taxas. Nem hoje, nem depois.'],
  ['Aproveite nossa oportunidade imperdível de crédito!', 'Precisa de crédito? Veja o valor, o prazo e a parcela antes de decidir.'],
  ['Solução financeira integrada para o seu perfil.', 'Uma conta pensada para quem estuda.'],
  ['Ocorreu um erro inesperado ao processar a sua requisição.', 'Não conseguimos concluir. Seu dinheiro continua na conta. Tente de novo?'],
  ['Parabéns! Você foi contemplado com benefícios exclusivos.', 'Parte da sua mensalidade voltou para você.'],
  ['Usuário, faça login para acessar o internet banking.', 'Oi! Entre para ver seu saldo.'],
]

const USE = ['você', 'conta', 'mensalidade', 'cashback', 'estudar', 'a gente', 'sem taxas', 'ponto final']
const AVOID = ['cliente', 'usuário', 'solução', 'oportunidade imperdível', 'exclusivo', 'prezado', 'sinergia', 'tarifa de manutenção']

const MICRO = [
  { icon: BellRing, l: 'Push', title: 'Seu cashback chegou', body: 'R$ 48,90 voltaram da mensalidade de outubro.' },
  { icon: CheckCircle2, l: 'Sucesso', title: 'Mensalidade paga', body: 'Obrigado por estudar com a gente. O comprovante está no app.' },
  { icon: TriangleAlert, l: 'Erro', title: 'Não conseguimos concluir', body: 'Seu dinheiro continua na conta. Tente de novo em alguns minutos.' },
  { icon: Inbox, l: 'Vazio', title: 'Nada por aqui ainda', body: 'Quando o primeiro Pix chegar, ele aparece nesta lista.' },
]

export function VoiceChapter() {
  return (
    <Chapter
      id="voz" n="07" title="Como a marca *fala*" theme="red"
      intro="O b.Uni fala como um colega de turma que entende de dinheiro: próximo, direto, otimista. Nunca como gerente de banco."
    >
      <Block n="7.1" title="Princípios" note="Três atitudes. Cada texto deveria passar nas três.">
        <Reveal stagger={0.12} className="grid gap-x-8 gap-y-12 lg:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <article key={p.t} className="grid content-start gap-5 border-t border-white pt-6">
              <h4 className="display-md">{p.t}</h4>
              <p className="text-fg-muted">{p.s}</p>
              <p className="rounded-2xl bg-white p-4 text-sm font-medium text-ink"><span className="label mb-1.5 block text-brand-red">Dizemos</span>{p.yes}</p>
              <p className="border border-white/50 p-4 text-sm text-white/80 line-through decoration-white/40"><span className="label mb-1.5 block no-underline">Evitamos</span>{p.no}</p>
            </article>
          ))}
        </Reveal>
      </Block>

      <Block n="7.2" title="Reescrevendo" note="O mesmo conteúdo, antes e depois de passar pela voz.">
        <div className="grid grid-cols-2 gap-x-6 border-b border-line">
          <span className="label border-t border-line py-3 text-fg-muted">Em vez de</span>
          <span className="label border-t border-line py-3">Dizemos</span>
          {REWRITES.map(([a, b]) => (
            <div key={a} className="contents">
              <p className="border-t border-line py-5 pr-4 text-fg-muted line-through decoration-white/35">{a}</p>
              <p className="border-t border-line py-5 font-display text-lg font-bold leading-snug tracking-tight">{b}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block n="7.3" title="Vocabulário" note="Palavras que entram e palavras que ficam de fora.">
        <div className="grid gap-10 md:grid-cols-2">
          <div><span className="label mb-4 block">Usamos</span><div className="flex flex-wrap gap-2">{USE.map((w) => <span key={w} className="rounded-full bg-white px-4 py-2 font-display text-sm font-bold text-brand-red">{w}</span>)}</div></div>
          <div><span className="label mb-4 block">Evitamos</span><div className="flex flex-wrap gap-2">{AVOID.map((w) => <span key={w} className="rounded-full border border-white/60 px-4 py-2 font-display text-sm font-bold text-white/80 line-through">{w}</span>)}</div></div>
        </div>
      </Block>

      <Block n="7.4" title="Texto no produto" note="Mensagens curtas, com o que aconteceu e o que fazer. Valores são ilustrativos.">
        <Reveal stagger={0.1} className="grid gap-5 sm:grid-cols-2">
          {MICRO.map((m) => (
            <div key={m.l} className="flex gap-4 rounded-2xl bg-white p-5 text-ink">
              <m.icon className="mt-0.5 size-6 shrink-0 text-brand-red" strokeWidth={1.75} />
              <div>
                <span className="label text-ink/50">{m.l}</span>
                <p className="mt-1 font-display text-base font-extrabold tracking-tight text-ink">{m.title}</p>
                <p className="mt-1 text-sm text-ink/70">{m.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </Block>

      <Block n="7.5" title="Regras de escrita" note="Para qualquer pessoa que escreva em nome da marca.">
        <ul className="grid gap-x-8 md:grid-cols-2">
          {[
            'Frases de até 20 palavras. Uma ideia por frase.',
            'Verbos ativos e no presente: “Pague”, “Veja”, “Abra”.',
            'Valores sempre com R$ e vírgula: R$ 1.248,90.',
            '“Você”, nunca “senhor(a)”. “A gente”, com moderação.',
            'Emoji só em contextos leves. Nunca em erros, cobranças ou dinheiro.',
            'Escreva b.Uni com “b” minúsculo e “U” maiúsculo, em qualquer contexto.',
          ].map((r, i) => (
            <li key={r} className="flex gap-4 border-t border-line py-5"><span className="font-display text-sm font-bold">0{i + 1}</span><span>{r}</span></li>
          ))}
        </ul>
      </Block>
    </Chapter>
  )
}
