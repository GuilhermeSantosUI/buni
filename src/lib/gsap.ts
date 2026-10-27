import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Draws every `.draw` SVG path inside `root` like a pen stroke. */
export function drawPaths(
  root: Element,
  { trigger, delay = 0, duration = 2.2 }: { trigger?: Element; delay?: number; duration?: number } = {},
) {
  root.querySelectorAll<SVGPathElement>('.draw').forEach((path, i) => {
    const len = path.getTotalLength()
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
    gsap.to(path, {
      strokeDashoffset: 0,
      duration,
      delay: delay + i * 0.25,
      ease: 'power2.inOut',
      scrollTrigger: trigger ? { trigger, start: 'top 75%' } : undefined,
    })
  })
}
