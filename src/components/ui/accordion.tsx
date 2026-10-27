import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const Accordion = AccordionPrimitive.Root

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn('border-t border-line last:border-b', className)} {...props} />
}
function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn('group flex flex-1 cursor-pointer items-center justify-between gap-6 py-6 text-left font-display text-lg font-bold tracking-tight outline-none', className)}
        {...props}
      >
        {children}
        <Plus className="size-5 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-45" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" {...props}>
      <div className={cn('max-w-[60ch] pb-6 text-fg-muted', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
