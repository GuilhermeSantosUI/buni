import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CashbackRing } from '@/components/product/PhoneApp'
import { cn } from '@/lib/utils'

function Cell({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('grid content-between gap-8 bg-bg p-6', className)}>
      <span className="label text-fg-muted">{label}</span>
      <div>{children}</div>
    </div>
  )
}

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 text-sm">
      {label}
      <button
        type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
        className={cn('relative h-7 w-12 rounded-full transition-colors duration-200', checked ? 'bg-brand-red' : 'bg-white/25')}
      >
        <i className={cn('absolute left-1 top-1 size-5 rounded-full bg-white transition-transform duration-200', checked && 'translate-x-5')} />
      </button>
    </label>
  )
}

export function Components() {
  const [on, setOn] = useState(true)
  const [val, setVal] = useState('120,00')
  const invalid = Number(val.replace(',', '.')) > 1000
  return (
    <div className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
      <Cell label="Botões">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Abrir conta</Button>
          <Button variant="light">Ver extrato</Button>
          <Button variant="outline">Saiba mais</Button>
          <Button variant="ghost">Cancelar</Button>
          <Button disabled>Indisponível</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="sm">Pequeno</Button><Button size="lg">Grande</Button>
        </div>
      </Cell>

      <Cell label="Campo de texto">
        <label className="grid gap-1 text-sm">
          <span className="label text-fg-muted">Valor do Pix</span>
          <div className="flex items-center gap-2"><span className="font-display text-lg font-bold">R$</span>
            <Input value={val} onChange={(e) => setVal(e.target.value)} aria-invalid={invalid} className={cn('font-display text-lg font-bold', invalid && 'border-brand-pink')} />
          </div>
          <span className={cn('text-xs', invalid ? 'text-brand-pink' : 'text-fg-muted')}>{invalid ? 'Esse valor passa do seu limite diário. Tente um valor menor.' : 'Limite diário: R$ 1.000,00'}</span>
        </label>
      </Cell>

      <Cell label="Status">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-white text-brand-navy"><i className="size-1.5 rounded-full bg-brand-blue" />Aprovado</Badge>
          <Badge variant="outline"><i className="size-1.5 rounded-full bg-current" />Pendente</Badge>
          <Badge><i className="size-1.5 rounded-full bg-white" />Recusado</Badge>
          <Badge variant="soft"><i className="size-1.5 rounded-full bg-brand-pink" />Cashback</Badge>
        </div>
      </Cell>

      <Cell label="Seletor">
        <div className="grid gap-4"><Switch checked={on} onChange={setOn} label="Avisar quando o cashback chegar" /><Switch checked={!on} onChange={(v) => setOn(!v)} label="Ocultar saldo ao abrir o app" /></div>
      </Cell>

      <Cell label="Progresso">
        <div className="flex items-center gap-5 text-white">
          <div className="relative"><CashbackRing size={84} value={0.62} /><span className="absolute inset-0 grid place-items-center font-display text-sm font-extrabold">62%</span></div>
          <div><p className="font-display text-lg font-extrabold tracking-tight">Meta de cashback</p><p className="text-sm text-fg-muted">R$ 48,90 de R$ 78,00</p></div>
        </div>
      </Cell>

      <Cell label="Feedback">
        <div className="grid gap-3">
          <Button variant="light" onClick={() => toast('Mensalidade paga. Obrigado por estudar com a gente.')}>Disparar toast</Button>
          <p className="text-xs text-fg-muted">Toasts são arredondados (elemento secundário) e usam Maven Pro Bold.</p>
        </div>
      </Cell>
    </div>
  )
}
