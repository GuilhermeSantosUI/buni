import { useEffect } from 'react'
import { startLenis } from '@/lib/lenis'
import { prefersReducedMotion } from '@/lib/gsap'
import { Header } from './Header'
import { Hero } from './sections/Hero'
import { Marquee } from './sections/Marquee'
import { ZeroFees } from './sections/ZeroFees'
import { Products } from './sections/Products'
import { CashbackScroll } from './sections/CashbackScroll'
import { Care } from './sections/Care'
import { Audiences } from './sections/Audiences'
import { Start } from './sections/Start'
import { Faq } from './sections/Faq'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'

export default function LandingApp() {
  useEffect(() => { if (!prefersReducedMotion()) startLenis() }, [])
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <ZeroFees />
        <Products />
        <CashbackScroll />
        <Care />
        <Audiences />
        <Start />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
