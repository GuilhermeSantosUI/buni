import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { Logo, WIPE } from '@/components/brand/Logo'
import { EASE } from '@/lib/motion'
import { scrollToId } from '@/lib/lenis'

export function Cover({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!ready || !root.current || prefersReducedMotion()) return
    const tl = gsap.timeline({ defaults: { ease: EASE.settle } })
    tl.from('[data-part=b]', { yPercent: 40, opacity: 0, duration: 1.2 }, 0)
      .from('[data-part=dot]', { scale: 0, duration: 0.9 }, 0.25)
      .from('[data-wipe]', { attr: { x: WIPE.from }, duration: 1.4, ease: EASE.move }, 0.2)
      .from('[data-part=idot]', { y: -420, duration: 1, ease: 'bounce.out' }, 0.9)
      .from('[data-cv]', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.9)

    // the logo drifts slower than the page: depth without noise
    gsap.to('[data-hero]', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
  }, { scope: root, dependencies: [ready] })

  return (
    <section ref={root} id="capa" data-tone="dark" data-chapter="" className="theme-red relative flex min-h-[100svh] flex-col overflow-hidden bg-bg text-fg">
      <div className="container-x flex flex-1 flex-col justify-between pb-8 pt-28">
        <div className="grid grid-cols-12 gap-6">
          <p data-cv className="label col-span-6 md:col-span-3">Livro de marca</p>
          <p data-cv className="label col-span-6 md:col-span-3">Versão 1.0 · 2026</p>
          <p data-cv className="label hidden md:col-span-6 md:block md:text-right">Conta digital da Educação</p>
        </div>

        <div data-hero className="my-auto py-12">
          <Logo bleed className="mx-auto w-full max-w-[1180px]" color="#fff" dot="#fff" />
        </div>

        <div className="grid grid-cols-12 items-end gap-6">
          <p data-cv className="display-md col-span-12 md:col-span-7">Único <span className="font-normal">como você.</span></p>
          <p data-cv className="col-span-8 max-w-[38ch] text-base text-fg-muted md:col-span-4">
            O guia de como o b.Uni se apresenta, fala e se comporta, do logo ao último botão do app.
          </p>
          <button data-cv onClick={() => scrollToId('plataforma')} className="col-span-4 ml-auto grid size-14 cursor-pointer place-items-center rounded-full border border-white/60 transition hover:bg-white hover:text-brand-red md:col-span-1" aria-label="Começar">
            <ArrowDown className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
