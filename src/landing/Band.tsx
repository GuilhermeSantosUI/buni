import type { ReactNode } from 'react'
import { SplitReveal } from '@/components/brand/SplitReveal'
import { Reveal } from '@/components/brand/Reveal'
import type { Theme } from '@/components/brand/Chapter'
import { isDark } from '@/components/brand/Chapter'
import { cn } from '@/lib/utils'

export function Band({ id, theme = 'paper', className, children }: { id: string; theme?: Theme; className?: string; children: ReactNode }) {
  return (
    <section id={id} data-tone={isDark(theme) ? 'dark' : 'light'} className={cn('relative bg-bg text-fg', `theme-${theme}`, className)}>
      {children}
    </section>
  )
}

/** Section opener: small label, display title, optional lead. */
export function Heading({ eyebrow, title, lead, className }: { eyebrow: string; title: string; lead?: ReactNode; className?: string }) {
  return (
    <header className={cn('mb-16 grid max-w-[920px] gap-6 md:mb-24', className)}>
      <p className="label flex items-center gap-3"><i className="h-px w-8 bg-current opacity-50" />{eyebrow}</p>
      <SplitReveal as="h2" text={title} className="display-lg" />
      {lead && <Reveal><p className="lead max-w-[56ch]">{lead}</p></Reveal>}
    </header>
  )
}
