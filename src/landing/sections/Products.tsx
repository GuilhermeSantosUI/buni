import { type ReactNode } from 'react'
import { Band, Heading } from '../Band'
import { Reveal } from '@/components/brand/Reveal'
import { CashbackRing } from '@/components/product/PhoneApp'
import { FreeCard } from '@/components/product/MiniCards'
import { cn } from '@/lib/utils'

type Status = 'Disponível' | 'Em breve'

function Tile({ className, status, title, text, note, children, tone = 'light' }: { className?: string; status: Status; title: string; text: string; note?: string; children?: ReactNode; tone?: 'light' | 'navy' | 'gradient' }) {
  const dark = tone !== 'light'
  return (
    <article className={cn(
      'relative flex flex-col justify-between gap-8 overflow-hidden p-7 md:p-8',
      tone === 'light' && 'bg-white ring-1 ring-ink/8',
      tone === 'navy' && 'theme-navy bg-bg text-fg',
      tone === 'gradient' && 'theme-ink bg-brand-gradient text-white',
      status === 'Em breve' && 'bg-transparent ring-1 ring-dashed ring-ink/25',
      className,
    )}>
      <div className="grid gap-3">
        <span className={cn('label w-fit rounded-full px-2.5 py-1.5', status === 'Disponível' ? (dark ? 'bg-white text-ink' : 'bg-ink text-white') : 'border border-current')}>{status}</span>
        <h3 className="font-display text-[clamp(1.5rem,2.2vw,2.1rem)] font-extrabold leading-[1.05] tracking-[-0.03em]" style={dark ? { color: '#fff' } : undefined}>{title}</h3>
        <p className={cn('max-w-[34ch] text-[.95rem]', dark ? 'text-white/80' : 'text-fg-muted')}>{text}</p>
        {note && <p className={cn('text-xs', dark ? 'text-white/65' : 'text-fg-muted')}>{note}</p>}
      </div>
      {children}
    </article>
  )
}

export function Products() {
  return (
    <Band id="produtos" theme="paper" className="py-28 md:py-40">
      <div className="container-x">
        <Heading
          eyebrow="Tudo no mesmo app"
          title="Tudo no *mesmo app.*"
          lead="Conta, crédito, cartão e seguros. O que está disponível hoje e o que chega em breve, dito com clareza."
        />
        <Reveal stagger={0.08} className="grid gap-4 md:grid-cols-12">
          <Tile tone="gradient" status="Disponível" title="Conta digital sem taxas" text="Abra, use e acompanhe tudo no app, sem tarifa de manutenção." className="shape-b min-h-[420px] md:col-span-7 md:row-span-2 [--shape-r:3rem]">
            <div className="max-w-[300px] self-end"><FreeCard /></div>
          </Tile>
          <Tile tone="navy" status="Disponível" title="Cashback na mensalidade" text="Quando você paga a mensalidade da faculdade, uma parte volta para você." className="rounded-[2rem] md:col-span-5">
            <div className="flex items-center gap-4 text-white"><div className="relative"><CashbackRing size={72} /><span className="absolute inset-0 grid place-items-center font-display text-xs font-extrabold">62%</span></div><p className="text-xs text-white/70">Exemplo ilustrativo de meta do mês.</p></div>
          </Tile>
          <Tile status="Disponível" title="Crédito consignado" text="Para facilitar sua vida." note="Sujeito a análise de crédito." className="rounded-[2rem] md:col-span-5" />
          <Tile status="Disponível" title="Seguros" text="Proteção para o que importa, no mesmo lugar em que você cuida da sua conta." className="rounded-[2rem] md:col-span-4" />
          <Tile status="Em breve" title="Crédito pessoal" text="Estamos preparando. Quando chegar, você vê o total antes de decidir." note="Sujeito a análise de crédito." className="rounded-[2rem] md:col-span-4" />
          <Tile status="Em breve" title="Cartão de débito e crédito" text="O cartão b.Uni, com a identidade que você já conhece." className="rounded-[2rem] md:col-span-4">
            <img src="/assets/card.png" alt="" className="mx-auto h-40 w-auto opacity-90 saturate-[.85]" />
          </Tile>
        </Reveal>
        <p className="label mt-8 max-w-[64ch] text-fg-muted normal-case tracking-normal">Produtos “em breve” estão em desenvolvimento e podem mudar. Crédito sujeito a análise.</p>
      </div>
    </Band>
  )
}
