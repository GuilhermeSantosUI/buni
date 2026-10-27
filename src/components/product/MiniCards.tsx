import { useEffect, useState } from 'react'
import { Check, Send, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** Small product surfaces, shared by landing sections. White cards, ink text. */
export const miniCard = 'grid gap-4 rounded-[2rem] bg-white p-5 text-ink shadow-[0_18px_40px_-22px_rgba(10,26,42,.35)] ring-1 ring-ink/5'
const cap = 'label text-ink/55'

const SETTINGS: [string, boolean][] = [['Cartão para compras online', true], ['Aviso de acesso em novo aparelho', true], ['Compras internacionais', false]]

export function SecurityCard() {
  const [on, setOn] = useState(SETTINGS.map(([, v]) => v))
  return (
    <div className={miniCard}>
      <div className="flex items-center gap-3"><ShieldCheck className="size-8 shrink-0 text-brand-red" strokeWidth={1.75} /><div><p className="font-display text-lg font-extrabold tracking-tight">Sua conta está protegida</p><p className="text-xs text-ink/60">Você escolhe o que fica ligado</p></div></div>
      {SETTINGS.map(([t], k) => (
        <button key={t} role="switch" aria-checked={on[k]} onClick={() => setOn((s) => s.map((v, j) => (j === k ? !v : v)))} className="flex cursor-pointer items-center justify-between border-t border-ink/10 pt-4 text-left text-sm">
          {t}
          <span className={cn('relative h-6 w-10 shrink-0 rounded-full transition-colors duration-200', on[k] ? 'bg-brand-red' : 'bg-ink/20')}><i className={cn('absolute left-1 top-1 size-4 rounded-full bg-white transition-transform duration-200', on[k] && 'translate-x-4')} /></span>
        </button>
      ))}
    </div>
  )
}

export function SupportCard() {
  const [typing, setTyping] = useState(true)
  useEffect(() => { const t = window.setTimeout(() => setTyping(false), 1600); return () => window.clearTimeout(t) }, [])
  return (
    <div className={cn(miniCard, 'gap-3')}>
      <span className={cap}>Atendimento · agora</span>
      <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-3 text-sm text-white">Oi! Paguei a mensalidade duas vezes.</p>
      {typing ? (
        <p className="flex w-16 items-center justify-center gap-1 rounded-2xl rounded-bl-md bg-ink/8 py-4" aria-label="Atendente digitando">
          {[0, 1, 2].map((d) => <i key={d} className="size-1.5 rounded-full bg-ink/50" style={{ animation: 'halo 1.2s ease-in-out infinite', animationDelay: `${d * 160}ms` }} />)}
        </p>
      ) : (
        <p className="max-w-[88%] animate-in rounded-2xl rounded-bl-md bg-ink/8 px-4 py-3 text-sm fade-in-0 slide-in-from-bottom-1 duration-300">Oi, Ana! Já estou olhando aqui. Em instantes te digo como vamos resolver.</p>
      )}
      <div className="flex items-center justify-between rounded-full border border-ink/15 py-2 pl-4 pr-2 text-sm text-ink/45">Escreva aqui<span className="grid size-8 place-items-center rounded-full bg-brand-red text-white"><Send className="size-4" /></span></div>
    </div>
  )
}

export function LearnCard() {
  return (
    <div className={miniCard}>
      <span className={cap}>Aula · 3 minutos</span>
      <p className="font-display text-xl font-extrabold leading-tight tracking-tight">Como organizar a bolsa e o estágio no mesmo mês</p>
      <div>
        <div className="relative h-px bg-ink/20"><div className="absolute inset-y-0 left-0 h-[3px] w-2/5 -translate-y-px rounded-full bg-brand-red" /><i className="absolute left-[40%] top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue ring-4 ring-white" /></div>
        <p className="mt-3 text-xs text-ink/60">2 de 5 aulas da trilha “Primeira conta”</p>
      </div>
      <Button size="sm" className="w-fit">Continuar</Button>
    </div>
  )
}

export function FreeCard() {
  return (
    <div className={miniCard}>
      <span className={cap}>Tarifa de manutenção</span>
      <p className="font-display text-5xl font-extrabold leading-none tracking-[-0.05em]">R$ 0<span className="text-brand-blue">,00</span></p>
      <div className="grid gap-2 border-t border-ink/10 pt-4 text-sm">
        {['Conta digital', 'Tudo no mesmo app'].map((t) => <p key={t} className="flex items-center gap-2"><Check className="size-4 text-brand-red" strokeWidth={2.5} />{t}</p>)}
      </div>
    </div>
  )
}
