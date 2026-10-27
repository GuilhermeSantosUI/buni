import { useRef } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { Block, Chapter, Fig } from '@/components/brand/Chapter'
import { Reveal } from '@/components/brand/Reveal'

function Anatomy() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion()) return
    const st = { trigger: ref.current, start: 'top 70%' }
    gsap.from('[data-img]', { clipPath: 'inset(0 0 100% 0)', duration: 1.4, ease: 'power3.inOut', scrollTrigger: st })
    gsap.from('[data-guide]', { scaleY: 0, transformOrigin: '50% 0', duration: 1, stagger: 0.15, delay: 1, ease: 'power3.out', scrollTrigger: st })
    gsap.from('[data-gl]', { opacity: 0, y: 8, stagger: 0.15, delay: 1.5, scrollTrigger: st })
  }, { scope: ref })
  return (
    <div ref={ref}>
      <div className="relative aspect-video overflow-hidden">
        <img data-img src="/assets/campanha.png" alt="Campanha: Chegou b.Uni. A primeira conta digital da Educação." className="size-full object-cover" />
        <i data-guide className="absolute inset-y-0 left-[33.3%] w-px bg-white/60" />
        <i data-guide className="absolute inset-y-0 left-[66.6%] w-px bg-white/60" />
        <i data-guide className="absolute inset-y-0 left-1/2 w-px bg-white" />
        {[['Texto', 'left-[3%]'], ['Pessoa', 'left-[41%]'], ['Logo', 'left-[72%]']].map(([l, p]) => (
          <span key={l} data-gl className={`label absolute top-4 rounded-full bg-ink px-2.5 py-1.5 text-white ${p}`}>{l}</span>
        ))}
      </div>
      <Fig>Fig. 8.1 · Composição em terços: texto à esquerda, pessoa no centro, logo à direita. A divisão azul/vermelho passa exatamente atrás do rosto.</Fig>
    </div>
  )
}

function Crops() {
  const frames = [
    { l: '16:9 · campanha', cls: 'aspect-video', pos: '50% 20%' },
    { l: '4:5 · feed', cls: 'aspect-[4/5]', pos: '50% 12%' },
    { l: '1:1 · perfil', cls: 'aspect-square', pos: '50% 8%' },
  ]
  return (
    <Reveal stagger={0.1} className="grid items-end gap-6 sm:grid-cols-[1.78fr_.8fr_1fr]">
      {frames.map((f) => (
        <figure key={f.l} className="grid gap-3">
          <img src="/assets/campanha.png" alt="" className={`w-full object-cover ${f.cls}`} style={{ objectPosition: f.pos, ...(f.cls.includes('4/5') ? { objectFit: 'cover' } : {}) }} />
          <figcaption className="label text-fg-muted">{f.l}</figcaption>
        </figure>
      ))}
    </Reveal>
  )
}

const RULES = [
  ['Gente real', 'Estudantes de verdade, de estilos, corpos e origens diferentes. Nada de banco de imagem genérico.'],
  ['Sorriso e olhar', 'Olhando para a câmera, expressão espontânea. A marca é próxima antes de ser séria.'],
  ['Celular na mão', 'O app é o banco. Ele aparece naturalmente, sem pose de produto.'],
  ['Cores calmas', 'Roupas e cenário neutros deixam o vermelho e o azul da marca falarem.'],
  ['Luz natural', 'Luz suave, sem sombras duras. Nada de filtro pesado.'],
  ['Espaço para texto', 'Sempre deixe um terço da imagem livre para título e logo.'],
]

export function ImageryChapter() {
  return (
    <Chapter
      id="imagem" n="08" title="O que a marca *vê*" theme="paper"
      intro="Gente real, olhando para a câmera, sorrindo de verdade. O fundo se divide em azul e vermelho; a pessoa fica no centro da tensão entre os dois."
    >
      <Block n="8.1" title="Composição" note="O formato de campanha b.Uni."><Anatomy /></Block>
      <Block n="8.2" title="Recortes" note="Um mesmo retrato adaptado a cada formato sem perder o rosto."><Crops /></Block>
      <Block n="8.3" title="Princípios" note="Seis critérios para aprovar ou recusar uma foto.">
        <Reveal stagger={0.06} className="grid gap-x-8 md:grid-cols-2">
          {RULES.map(([t, d], i) => (
            <div key={t} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[40px_1fr]">
              <span className="font-display text-sm font-bold text-accent">0{i + 1}</span>
              <div><h4 className="font-display text-lg font-bold tracking-tight">{t}</h4><p className="mt-1 text-fg-muted">{d}</p></div>
            </div>
          ))}
        </Reveal>
      </Block>
    </Chapter>
  )
}
