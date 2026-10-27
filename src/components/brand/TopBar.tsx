import { useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { CHAPTERS } from '@/data/chapters'
import { useActiveSection } from '@/hooks/useActiveSection'
import { Logo } from '@/components/brand/Logo'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { gsap, useGSAP } from '@/lib/gsap'
import { scrollToId } from '@/lib/lenis'
import { cn } from '@/lib/utils'

const IDS = ['capa', ...CHAPTERS.map((c) => c.id)]

export function TopBar() {
  const { id, tone, label, bg } = useActiveSection(IDS)
  const [open, setOpen] = useState(false)
  const bar = useRef<HTMLDivElement>(null)
  const dark = tone === 'dark' && !open

  useGSAP(() => {
    gsap.to(bar.current, { scaleX: 1, ease: 'none', scrollTrigger: { scrub: 0.3, start: 0, end: 'max' } })
  })

  const go = (target: string) => {
    setOpen(false)
    setTimeout(() => scrollToId(target), 250)
  }

  return (
    <>
      <header style={{ backgroundColor: open ? 'transparent' : bg }} className={cn('fixed inset-x-0 top-0 z-[60] transition-colors duration-500', dark ? 'text-white' : 'text-ink')}>
        <div className="container-x flex h-16 items-center justify-between">
          <a href="#capa" onClick={(e) => { e.preventDefault(); scrollToId('capa') }} aria-label="Voltar ao topo">
            <Logo className="h-6 w-auto" color={dark ? '#fff' : '#DD263E'} dot={dark ? '#fff' : '#146792'} />
          </a>
          <p className="label hidden md:block">{label}</p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="label inline-flex cursor-pointer items-center gap-2.5" aria-label="Abrir índice">
                Índice <Menu className="size-4" />
              </button>
            </DialogTrigger>
            <DialogContent className="theme-ink bg-bg text-fg">
              <DialogTitle className="sr-only">Índice</DialogTitle>
              <DialogDescription className="sr-only">Navegue entre os capítulos do livro de marca.</DialogDescription>
              <div className="container-x flex h-full flex-col pb-10 pt-4">
                <div className="flex h-12 items-center justify-between">
                  <Logo className="h-6 w-auto text-white" dot="currentColor" />
                  <DialogClose className="label inline-flex cursor-pointer items-center gap-2.5">Fechar <X className="size-4" /></DialogClose>
                </div>
                <nav className="mt-auto grid gap-x-10 md:grid-cols-2">
                  {CHAPTERS.map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => go(c.id)}
                      style={{ animationDelay: `${i * 40}ms` }}
                      className="group flex animate-in cursor-pointer items-baseline gap-5 border-t border-line py-3.5 text-left fade-in-0 slide-in-from-bottom-3 fill-mode-both duration-500"
                    >
                      <span className="label w-6 text-fg-muted">{c.n}</span>
                      <span className="font-display text-[clamp(1.5rem,3vw,2.6rem)] font-extrabold tracking-tight transition-transform duration-300 group-hover:translate-x-2 group-hover:text-brand-pink">{c.title}</span>
                      <span className="hidden flex-1 text-right text-sm text-fg-muted lg:block">{c.hint}</span>
                      <ArrowUpRight className="size-4 self-center opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  ))}
                </nav>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="h-px bg-current/15"><div ref={bar} className="h-full origin-left scale-x-0 bg-brand-red" /></div>
      </header>
      <span className="sr-only">{id}</span>
    </>
  )
}
