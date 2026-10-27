import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useActiveSection } from '@/hooks/useActiveSection'
import { scrollToId } from '@/lib/lenis'
import { cn } from '@/lib/utils'
import { NAV } from './config'

const IDS = ['topo', 'sem-taxas', 'produtos', 'cashback', 'cuidado', 'para-quem', 'baixe', 'duvidas', 'final']

export function Header() {
  const { tone, bg } = useActiveSection(IDS)
  const [open, setOpen] = useState(false)
  const dark = tone === 'dark' && !open
  const go = (id: string) => { setOpen(false); window.setTimeout(() => scrollToId(id), 220) }

  return (
    <header style={{ backgroundColor: open ? 'transparent' : bg }} className={cn('fixed inset-x-0 top-0 z-[60] border-b border-current/10 transition-colors duration-500', dark ? 'text-white' : 'text-ink')}>
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <a href="#topo" onClick={(e) => { e.preventDefault(); scrollToId('topo') }} aria-label="b.Uni, voltar ao topo">
          <Logo className="h-6 w-auto" color={dark ? '#fff' : '#DD263E'} dot={dark ? '#fff' : '#146792'} />
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Seções">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={(e) => { e.preventDefault(); scrollToId(n.id) }} className="text-sm font-medium opacity-80 transition-opacity hover:opacity-100">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button size="sm" variant={dark ? 'light' : 'default'} onClick={() => scrollToId('baixe')}>Abrir conta</Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><button className="grid size-9 cursor-pointer place-items-center lg:hidden" aria-label="Abrir menu"><Menu className="size-5" /></button></DialogTrigger>
            <DialogContent className="theme-ink bg-bg text-fg">
              <DialogTitle className="sr-only">Menu</DialogTitle>
              <DialogDescription className="sr-only">Navegue pelas seções da página.</DialogDescription>
              <div className="container-x flex h-full flex-col pb-10 pt-4">
                <div className="flex h-12 items-center justify-between">
                  <Logo className="h-6 w-auto" color="#fff" dot="#fff" />
                  <DialogClose className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium">Fechar <X className="size-4" /></DialogClose>
                </div>
                <nav className="mt-auto grid">
                  {NAV.map((n, i) => (
                    <button key={n.id} onClick={() => go(n.id)} style={{ animationDelay: `${i * 50}ms` }} className="animate-in cursor-pointer border-t border-line py-4 text-left font-display text-4xl font-extrabold tracking-tight fade-in-0 slide-in-from-bottom-3 fill-mode-both duration-500">{n.label}</button>
                  ))}
                  <Button size="lg" className="mt-8" onClick={() => go('baixe')}>Abrir minha conta</Button>
                </nav>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
