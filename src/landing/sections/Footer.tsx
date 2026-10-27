import { Logo } from '@/components/brand/Logo'
import { LEGAL_LINE } from '../config'

export function Footer() {
  return (
    <footer className="theme-ink bg-bg py-14 text-fg">
      <div className="container-x grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="grid content-start gap-4">
          <Logo className="h-7 w-auto self-start" color="#fff" dot="#fff" />
          <p className="max-w-[34ch] text-sm text-fg-muted">A primeira conta digital da Educação. Único como você.</p>
        </div>
        <nav className="grid content-start gap-2 text-sm" aria-label="Rodapé">
          <span className="label mb-2 text-fg-muted">Explore</span>
          {[['Produtos', '#produtos'], ['Cashback', '#cashback'], ['Para quem', '#para-quem'], ['Dúvidas', '#duvidas']].map(([l, h]) => <a key={l} href={h} className="opacity-80 hover:opacity-100">{l}</a>)}
        </nav>
        <nav className="grid content-start gap-2 text-sm" aria-label="Marca">
          <span className="label mb-2 text-fg-muted">Marca</span>
          <a href="/" className="opacity-80 hover:opacity-100">Livro de marca</a>
        </nav>
      </div>
      <div className="container-x mt-12 grid gap-2 border-t border-line pt-6 text-xs text-fg-muted">
        <p>Produtos “em breve” estão em desenvolvimento e podem mudar. Crédito sujeito a análise. Telas e valores ilustrativos.</p>
        <p>{LEGAL_LINE}</p>
      </div>
    </footer>
  )
}
