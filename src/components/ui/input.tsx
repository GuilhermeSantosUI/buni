import * as React from 'react'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-12 w-full min-w-0 border-0 border-b border-input bg-transparent px-0 text-base outline-none transition-colors placeholder:text-fg-muted focus-visible:border-brand-red disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
