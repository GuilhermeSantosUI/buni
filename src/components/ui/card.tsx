import * as React from 'react'
import { cn } from '@/lib/utils'

/** Surface using the b-corner. Use sparingly; most layout is hairline-based. */
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card" className={cn('shape-b bg-card text-card-foreground [--shape-r:1.5rem]', className)} {...props} />
}

export { Card }
