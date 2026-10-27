import { useEffect, useState } from 'react'
import { Intro } from '@/components/brand/Intro'
import { TopBar } from '@/components/brand/TopBar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { prefersReducedMotion } from '@/lib/gsap'
import { startLenis } from '@/lib/lenis'
import { Cover } from '@/components/chapters/Cover'
import { Platform } from '@/components/chapters/Platform'
import { Audience } from '@/components/chapters/Audience'
import { LogoChapter } from '@/components/chapters/LogoChapter'
import { ColorChapter } from '@/components/chapters/ColorChapter'
import { TypographyChapter } from '@/components/chapters/TypographyChapter'
import { VisualLanguageChapter } from '@/components/chapters/VisualLanguageChapter'
import { VoiceChapter } from '@/components/chapters/VoiceChapter'
import { ImageryChapter } from '@/components/chapters/ImageryChapter'
import { ProductChapter } from '@/components/chapters/ProductChapter'
import { MotionChapter } from '@/components/chapters/MotionChapter'
import { ApplicationsChapter } from '@/components/chapters/ApplicationsChapter'
import { ResourcesChapter } from '@/components/chapters/ResourcesChapter'

export default function App() {
  const skip = prefersReducedMotion()
  const [showIntro, setShowIntro] = useState(!skip)
  const [ready, setReady] = useState(skip)

  useEffect(() => { if (!skip) startLenis() }, [skip])

  return (
    <TooltipProvider delayDuration={80}>
      {showIntro && <Intro onReveal={() => setReady(true)} onDone={() => setShowIntro(false)} />}
      <TopBar />
      <main>
        <Cover ready={ready} />
        <Platform />
        <Audience />
        <LogoChapter />
        <ColorChapter />
        <TypographyChapter />
        <VisualLanguageChapter />
        <VoiceChapter />
        <ImageryChapter />
        <ProductChapter />
        <MotionChapter />
        <ApplicationsChapter />
        <ResourcesChapter />
      </main>
      <Toaster />
    </TooltipProvider>
  )
}
