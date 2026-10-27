import type { ReactNode } from 'react'
import { SplitReveal } from '@/components/brand/SplitReveal'
import { Reveal } from '@/components/brand/Reveal'
import { cn } from '@/lib/utils'

export type Theme = 'paper' | 'white' | 'navy' | 'ink' | 'red'
const DARK: Theme[] = ['navy', 'ink', 'red']
export const isDark = (t: Theme) => DARK.includes(t)

interface ChapterProps {
  id: string
  n: string
  title: string
  intro?: ReactNode
  theme?: Theme
  children: ReactNode
}

export function Chapter({ id, n, title, intro, theme = 'paper', children }: ChapterProps) {
  return (
    <section
      id={id}
      data-tone={isDark(theme) ? 'dark' : 'light'}
      data-chapter={`${n} ${title.replace(/\*/g, '')}`}
      className={cn('relative bg-bg py-28 text-fg md:py-40', `theme-${theme}`)}
    >
      <div className="container-x">
        <header className="mb-24 grid grid-cols-12 gap-x-6 gap-y-10 md:mb-36">
          <div className="col-span-12 flex items-center gap-4 border-t border-line pt-5 md:col-span-3">
            <span className="label">Capítulo</span>
            <span className="font-display text-sm font-bold">{n}</span>
          </div>
          <SplitReveal as="h2" text={title} className="display-lg col-span-12 md:col-span-9" />
          {intro && (
            <Reveal className="col-span-12 md:col-span-6 md:col-start-4">
              <p className="lead">{intro}</p>
            </Reveal>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}

interface BlockProps {
  n: string
  title: string
  note?: ReactNode
  children: ReactNode
  className?: string
}

/** Sub-section: numbered caption on the left, content on a 9-col canvas. */
export function Block({ n, title, note, children, className }: BlockProps) {
  return (
    <div className={cn('mb-24 grid grid-cols-12 gap-x-6 gap-y-8 last:mb-0 md:mb-36', className)}>
      <div className="col-span-12 border-t border-line pt-5 md:col-span-3">
        <div className="flex items-baseline gap-3 md:sticky md:top-28">
          <span className="font-display text-sm font-bold text-accent">{n}</span>
          <div className="grid gap-3">
            <h3 className="font-display text-lg font-bold tracking-tight">{title}</h3>
            {note && <p className="max-w-[24ch] text-sm text-fg-muted">{note}</p>}
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-9">{children}</div>
    </div>
  )
}

export function Fig({ children }: { children: ReactNode }) {
  return <p className="label mt-4 text-fg-muted">{children}</p>
}
