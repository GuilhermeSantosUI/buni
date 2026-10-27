import { Band } from '../Band'
import { SplitReveal } from '@/components/brand/SplitReveal'
import { Reveal } from '@/components/brand/Reveal'
import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/button'
import { scrollToId } from '@/lib/lenis'
import { STORES } from '../config'

export function FinalCta() {
  return (
    <Band id="final" theme="red" className="overflow-hidden pt-28 md:pt-40">
      <div className="container-x grid gap-10">
        <SplitReveal as="h2" text="Único como você." className="display-xl" />
        <Reveal className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <p className="lead max-w-[40ch] !text-white">Abra a sua conta no b.Uni e comece sem tarifa de manutenção.</p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" variant="light" onClick={() => scrollToId('baixe')}>Abrir minha conta</Button>
            {STORES.map((s) => <Button key={s.label} asChild size="lg" variant="outline"><a href={s.href}>{s.label}</a></Button>)}
          </div>
        </Reveal>
      </div>
      <div className="container-x mt-20 translate-y-[16%]"><Logo className="w-full" color="#fff" dot="#fff" /></div>
    </Band>
  )
}
