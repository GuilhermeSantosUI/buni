import { Logo } from '@/components/brand/Logo'
import { cn } from '@/lib/utils'

interface LockupProps {
  className?: string
  color?: string
  dot?: string
  /** Hide the signature for small sizes. */
  signature?: boolean
}

/** Logo + "Único como você". The signature scales with the logo via container units. */
export function Lockup({ className, color = 'currentColor', dot, signature = true }: LockupProps) {
  return (
    <div className={cn('@container w-full', className)} style={{ color: color === 'currentColor' ? undefined : color }}>
      <Logo className="block w-full" color={color} dot={dot} />
      {signature && (
        <p className="mt-[3.2cqw] text-right font-body text-[8.4cqw] font-medium leading-none tracking-[-0.01em]" style={{ paddingRight: '0.4cqw' }}>
          Único como você
        </p>
      )}
    </div>
  )
}
