import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

let instance: Lenis | null = null

export function startLenis() {
  if (instance) return instance
  instance = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95 })
  instance.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => instance?.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  return instance
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) instance.scrollTo(el, { offset: 0, duration: 1.4 })
  else el.scrollIntoView()
}
