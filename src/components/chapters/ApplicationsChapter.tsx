import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { Block, Chapter, Fig } from '@/components/brand/Chapter'
import { Logo } from '@/components/brand/Logo'
import { Reveal } from '@/components/brand/Reveal'
import { cn } from '@/lib/utils'

function CardTilt() {
  const wrap = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLImageElement>(null)
  const { contextSafe } = useGSAP({ scope: wrap })
  const move = contextSafe((e: React.PointerEvent) => {
    const r = wrap.current!.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    gsap.to(card.current, { rotateY: x * 24, rotateX: -y * 16, rotateZ: x * 3, duration: 0.6, ease: 'power3.out' })
  })
  const leave = contextSafe(() => gsap.to(card.current, { rotateY: 0, rotateX: 0, rotateZ: 0, duration: 1, ease: 'expo.out' }))
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
      <div ref={wrap} onPointerMove={move} onPointerLeave={leave} className="grid min-h-[560px] cursor-crosshair place-items-center bg-ink [perspective:1000px]">
        <img ref={card} src="/assets/card.png" alt="Cartão b.Uni Visa Internacional" className="h-[480px] w-auto drop-shadow-[0_40px_50px_rgba(0,0,0,.5)] [transform-style:preserve-3d]" />
      </div>
      <div>
        {[
          ['Fundo', 'Degradê completo da marca, em ângulo de 135°.'],
          ['Logo', 'Branco, no topo esquerdo, na área de proteção mínima de 1 x.'],
          ['Chip e aproximação', 'Posição padrão da bandeira. Nada sobre o chip.'],
          ['Bandeira', 'Visa Internacional, rodapé direito, em prata sobre o degradê.'],
          ['Formato', 'Vertical, com cantos arredondados padrão ISO.'],
        ].map(([t, d]) => (
          <div key={t} className="grid gap-1 border-t border-line py-4 sm:grid-cols-[150px_1fr]"><span className="label pt-1 text-fg-muted">{t}</span><p>{d}</p></div>
        ))}
        <div className="border-t border-line" />
      </div>
    </div>
  )
}

function Social() {
  return (
    <Reveal stagger={0.1} className="grid items-start gap-6 md:grid-cols-[repeat(3,minmax(0,1fr))]">
      <figure className="grid gap-3">
        <div className="theme-red @container relative flex aspect-square flex-col justify-between bg-bg p-[7%] text-fg">
          <Logo className="w-[28%]" color="#fff" dot="#fff" />
          <p className="font-display text-[11cqw] font-extrabold leading-[.95] tracking-[-0.045em]">Cashback na mensalidade.</p>
        </div>
        <figcaption className="label text-fg-muted">Feed 1:1 · oferta</figcaption>
      </figure>
      <figure className="grid gap-3">
        <div className="@container relative flex aspect-square flex-col justify-between overflow-hidden bg-ink p-[7%] text-white">
          <img src="/assets/campanha.png" alt="" className="absolute inset-0 size-full object-cover" style={{ objectPosition: '50% 10%' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <Logo className="relative w-[28%]" color="#fff" dot="#fff" />
          <p className="relative font-display text-[8.5cqw] font-normal leading-[.98] tracking-[-0.04em]">A primeira conta digital da <b className="font-extrabold">Educação.</b></p>
        </div>
        <figcaption className="label text-fg-muted">Feed 1:1 · institucional</figcaption>
      </figure>
      <figure className="grid gap-3">
        <div className="theme-navy @container relative flex aspect-square flex-col justify-between bg-bg p-[7%] text-fg">
          <Logo className="w-[28%]" color="#fff" dot="#ff8b9a" />
          <div><p className="font-display text-[30cqw] font-extrabold leading-[.85] tracking-[-0.06em]">R$ 0<span className="text-brand-pink">.</span></p><p className="mt-3 font-body text-[6cqw] font-normal">de tarifa de manutenção.</p></div>
        </div>
        <figcaption className="label text-fg-muted">Feed 1:1 · dado de produto</figcaption>
      </figure>
    </Reveal>
  )
}

export function ApplicationsChapter() {
  return (
    <Chapter
      id="aplicacoes" n="11" title="A marca *em campo*" theme="ink"
      intro="Do cartão no bolso ao feed. As regras dos capítulos anteriores combinadas em peças reais."
    >
      <Block n="11.1" title="Cartão" note="Mova o cursor sobre o cartão."><CardTilt /></Block>
      <Block n="11.2" title="Redes sociais" note="Três gabaritos para o feed: oferta, institucional e dado.">
        <Social />
        <Fig>Fig. 11.2 · Margem de 7%, logo a 28% da largura, uma ideia por peça. “R$ 0” ilustra o conceito “sem taxas”.</Fig>
      </Block>
      <Block n="11.3" title="Campanha e web" note="Composições em formato largo.">
        <div className="grid gap-8">
          <figure><img src="/assets/campanha.png" alt="Campanha: Chegou b.Uni" className="w-full" /><figcaption className="label mt-3 text-fg-muted">Campanha 16:9 · vídeo e vitrine</figcaption></figure>
          <figure><img src="/assets/banner.png" alt="Banner: A conta digital que é a sua cara" className={cn('w-full')} /><figcaption className="label mt-3 text-fg-muted">Banner web · fundo branco, grafismo em curva e título em Maven Pro</figcaption></figure>
        </div>
      </Block>
    </Chapter>
  )
}
