import { useRef, useState } from 'react'
import { ArrowLeftRight, Bell, ChevronRight, Eye, EyeOff, GraduationCap, Home, QrCode, Receipt, ShieldCheck, UserRound, Wallet, Check, type LucideIcon } from 'lucide-react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { Logo } from '@/components/brand/Logo'
import { cn } from '@/lib/utils'

const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function CashbackRing({ value = 0.62, size = 76 }: { value?: number; size?: number }) {
  const ring = useRef<SVGCircleElement>(null)
  const r = 15.9155
  useGSAP(() => {
    if (prefersReducedMotion() || !ring.current) return
    gsap.from(ring.current, { strokeDashoffset: 100, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: ring.current, start: 'top 90%' } })
  }, { scope: ring })
  return (
    <svg viewBox="0 0 36 36" width={size} height={size} className="-rotate-90">
      <circle cx="18" cy="18" r={r} fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="3.4" />
      <circle ref={ring} cx="18" cy="18" r={r} fill="none" stroke="#DD263E" strokeWidth="3.4" strokeLinecap="round" pathLength={100} strokeDasharray="100" strokeDashoffset={100 - value * 100} />
    </svg>
  )
}

const ACTIONS: [LucideIcon, string][] = [[QrCode, 'Pix'], [Receipt, 'Pagar'], [GraduationCap, 'Mensalidade'], [ShieldCheck, 'Seguros']]

const TX = [
  { icon: GraduationCap, title: 'Mensalidade', date: 'Hoje', value: -890, tag: 'Cashback' },
  { icon: ArrowLeftRight, title: 'Pix recebido', date: 'Ontem', value: 1450 },
]

const TABS: [LucideIcon, string][] = [[Home, 'Início'], [Wallet, 'Conta'], [ArrowLeftRight, 'Pix'], [UserRound, 'Perfil']]

/**
 * App home screen. One system of radii (frame 48 · hero card 28 · cards 24 · controls full),
 * one stroke (1.75), one accent dot (notifications), and the gradient only on the balance card.
 */
export function PhoneApp() {
  const [hidden, setHidden] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const amount = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion() || !amount.current) return
    const o = { v: 0 }
    gsap.to(o, { v: 1248.9, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 80%' }, onUpdate: () => { if (amount.current) amount.current.textContent = fmt(o.v) } })
    gsap.from('[data-ph]', { y: 22, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 80%' } })
  }, { scope: root })

  return (
    <div ref={root} className="w-[320px] rounded-[48px] bg-[#0b0f14] p-[10px] shadow-[0_50px_80px_-30px_rgba(0,0,0,.6)]">
      <div className="relative h-[640px] overflow-hidden rounded-[39px] bg-paper text-ink">
        {/* status bar */}
        <div className="absolute inset-x-0 top-0 z-10 flex h-11 items-center justify-between px-7 text-[12px] font-bold">
          <span>9:41</span>
          <span className="absolute left-1/2 top-2 h-[22px] w-24 -translate-x-1/2 rounded-full bg-[#0b0f14]" />
          <span className="flex items-end gap-[3px]" aria-hidden>
            {[5, 8, 11].map((h) => <i key={h} className="w-[3px] rounded-sm bg-ink" style={{ height: h }} />)}
            <i className="ml-1.5 h-[11px] w-[22px] rounded-[4px] border-[1.5px] border-ink p-px"><b className="block h-full w-4/5 rounded-[2px] bg-ink" /></i>
          </span>
        </div>

        <div className="flex h-full flex-col">
          <header data-ph className="flex items-center justify-between px-5 pb-3 pt-[44px]">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-brand-navy p-2.5"><Logo mark color="#fff" dot="#fff" className="w-full" /></span>
              <div><p className="text-[12px] leading-none text-ink/60">Olá,</p><p className="mt-1 font-display text-[19px] font-extrabold leading-none tracking-tight">Ana.</p></div>
            </div>
            <button aria-label="Notificações, 1 nova" className="relative grid size-10 cursor-pointer place-items-center rounded-full bg-white ring-1 ring-ink/8">
              <Bell className="size-[18px]" strokeWidth={1.75} />
              <i className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-brand-blue ring-2 ring-white" />
            </button>
          </header>

          <div className="grid min-h-0 flex-1 content-start gap-2.5 overflow-hidden px-5">
            <section data-ph className="shape-b bg-brand-gradient px-4 py-3.5 text-white [--shape-r:1.5rem]">
              <div className="flex items-center justify-between">
                <span className="label text-white/85">Saldo disponível</span>
                <button onClick={() => setHidden((h) => !h)} aria-label={hidden ? 'Mostrar saldo' : 'Ocultar saldo'} className="grid size-7 cursor-pointer place-items-center rounded-full bg-white/15">
                  {hidden ? <EyeOff className="size-4" strokeWidth={1.75} /> : <Eye className="size-4" strokeWidth={1.75} />}
                </button>
              </div>
              <p className="mt-1.5 font-display text-[30px] font-extrabold leading-none tracking-[-0.04em]">R$ {hidden ? <span>••••••</span> : <span ref={amount}>1.248,90</span>}</p>
              <div className="mt-3 flex items-center justify-between text-[12px] font-medium">
                <span className="flex items-center gap-1.5 text-white/90"><Check className="size-3.5" strokeWidth={2.5} />Conta sem taxas</span>
                <span className="flex items-center gap-0.5 text-white/90">Extrato<ChevronRight className="size-4" strokeWidth={1.75} /></span>
              </div>
            </section>

            <section data-ph className="grid grid-cols-4">
              {ACTIONS.map(([Icon, label]) => (
                <button key={label} className="grid cursor-pointer justify-items-center gap-1.5">
                  <span className="grid size-12 place-items-center rounded-full bg-white ring-1 ring-ink/8"><Icon className="size-[22px]" strokeWidth={1.75} /></span>
                  <span className="text-[11.5px] font-medium">{label}</span>
                </button>
              ))}
            </section>

            <section data-ph className="flex items-center gap-3.5 rounded-3xl bg-white p-3 ring-1 ring-ink/6">
              <div className="relative shrink-0 text-ink"><CashbackRing size={48} /><span className="absolute inset-0 grid place-items-center font-display text-[12px] font-extrabold">62%</span></div>
              <div className="min-w-0 flex-1">
                <p className="label text-brand-red">Cashback</p>
                <p className="mt-1 font-display text-[14px] font-extrabold leading-tight tracking-tight">R$ 48,90 voltaram da mensalidade</p>
              </div>
              <ChevronRight className="size-5 shrink-0 text-ink/35" strokeWidth={1.75} />
            </section>

            <section data-ph>
              <div className="mb-1 flex items-center justify-between"><p className="font-display text-[14px] font-extrabold tracking-tight">Movimentações</p><span className="text-[12px] font-medium text-brand-red">Ver tudo</span></div>
              {TX.map((t) => (
                <div key={t.title} className="flex items-center gap-3 border-t border-ink/8 py-2">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink/6"><t.icon className="size-[17px]" strokeWidth={1.75} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium">{t.title}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 whitespace-nowrap text-[11px] text-ink/55">{t.date}{t.tag && <span className="rounded-full bg-brand-red/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-red">{t.tag}</span>}</p>
                  </div>
                  <p className={cn('shrink-0 font-display text-[13px] font-extrabold tracking-tight', t.value > 0 && 'text-brand-blue')}>{t.value > 0 ? '+ ' : '− '}R$ {fmt(Math.abs(t.value))}</p>
                </div>
              ))}
            </section>
          </div>

          <nav data-ph className="grid grid-cols-4 shrink-0 border-t border-ink/8 bg-white px-2 pb-5 pt-2">
            {TABS.map(([Icon, label], i) => (
              <span key={label} className={cn('grid justify-items-center gap-1 text-[10.5px] font-medium', i === 0 ? 'text-brand-red' : 'text-ink/45')}>
                <Icon className="size-[22px]" strokeWidth={1.75} />{label}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
