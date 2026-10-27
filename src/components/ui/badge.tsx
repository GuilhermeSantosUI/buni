import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva('label inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1.5', {
  variants: {
    variant: {
      default: 'bg-brand-red text-white',
      secondary: 'bg-brand-navy text-white',
      outline: 'border border-current',
      soft: 'bg-fg/8 text-fg',
    },
  },
  defaultVariants: { variant: 'default' },
})

function Badge({ className, variant, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge }
