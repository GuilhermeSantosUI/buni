import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/** Pill with the square top-left corner of the "b". */
const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-display text-sm font-bold tracking-tight outline-none transition-[background,color,transform] duration-200 focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[.98] disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default: 'rounded-tl-none bg-brand-red text-white hover:bg-[#c41f35]',
        secondary: 'rounded-tl-none bg-brand-navy text-white hover:bg-[#002a49]',
        outline: 'border border-current bg-transparent hover:bg-fg/5',
        ghost: 'bg-transparent hover:bg-fg/10',
        light: 'rounded-tl-none bg-white text-brand-navy hover:bg-white/90',
      },
      size: { default: 'h-11 px-6', sm: 'h-9 px-4 text-xs', lg: 'h-14 px-8 text-base' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

function Button({
  className, variant, size, asChild = false, ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button }
