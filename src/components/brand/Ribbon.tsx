import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/**
 * "O laço": the logo's constant-width stroke closed into a loop around a person.
 * Rendered as two layers around the subject: the upper half goes BEHIND it, the lower half IN FRONT.
 * Text runs along the band and flows continuously (seamless loop).
 */
export interface RibbonGeometry { cx: number; cy: number; rx: number; ry: number; rot: number; width: number }

/** Reference loop for a 4:5-ish portrait card placed at left 11.4% / width 46% of a 560x640 stage. */
export const LOOP: RibbonGeometry = { cx: 193, cy: 205, rx: 205, ry: 250, rot: -18, width: 46 }
export const LOOP_VIEW = '0 0 560 640'

interface RibbonProps extends RibbonGeometry {
  /** Same viewBox for both layers; the layers are sized by the parent. */
  viewBox: string
  className?: string
  /** Which half to draw. */
  part: 'back' | 'front'
  /** Shared id so both layers animate together. */
  sync: string
  fontSize?: number
}

const perimeter = (a: number, b: number) => Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)))

function Phrase({ fs }: { fs: number }) {
  return (
    <>
      <tspan fontWeight={800}>ÚNICO COMO VOCÊ.</tspan>
      <tspan fontWeight={500} fillOpacity={0.7} dx={fs * 1.2}> b.Uni </tspan>
      <tspan dx={fs * 1.4}>{' '}</tspan>
    </>
  )
}

export function RibbonLayer({ cx, cy, rx, ry, rot, width, viewBox, className, part, sync, fontSize = Math.round(width * 0.4) }: RibbonProps) {
  const uid = useId().replace(/:/g, '')
  const probe = useRef<SVGTextElement>(null)
  const [unit, setUnit] = useState(0)
  const per = perimeter(rx, ry)
  // counter-clockwise path: text reads upright along the lower (front) half
  const d = `M${cx + rx} ${cy}A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}A${rx} ${ry} 0 1 0 ${cx + rx} ${cy}`
  const pad = width + 6
  const clip = part === 'back'
    ? { x: cx - rx - pad, y: cy - ry - pad, w: (rx + pad) * 2, h: ry + pad }
    : { x: cx - rx - pad, y: cy, w: (rx + pad) * 2, h: ry + pad }

  useLayoutEffect(() => { if (probe.current) setUnit(probe.current.getComputedTextLength()) }, [fontSize])

  // one shared tween per ribbon id keeps both halves perfectly aligned
  useEffect(() => {
    if (!unit || prefersReducedMotion()) return
    const els = document.querySelectorAll(`[data-tp="${sync}"]`)
    const tw = gsap.to(els, { attr: { startOffset: -unit }, duration: unit / 38, ease: 'none', repeat: -1 })
    return () => { tw.kill() }
  }, [unit, sync])

  const reps = unit ? Math.ceil(per / unit) + 2 : 0
  return (
    <svg viewBox={viewBox} preserveAspectRatio="xMinYMin meet" className={cn('pointer-events-none overflow-visible', className)} aria-hidden>
      <defs>
        <linearGradient id={`${uid}g`} gradientUnits="userSpaceOnUse" x1={cx - rx} y1={cy} x2={cx + rx} y2={cy}>
          <stop offset="0" stopColor="#DD263E" /><stop offset=".55" stopColor="#843077" /><stop offset="1" stopColor="#3E4889" />
        </linearGradient>
        <clipPath id={`${uid}c`}><rect x={clip.x} y={clip.y} width={clip.w} height={clip.h} /></clipPath>
        <path id={`${uid}p`} d={d} />
      </defs>
      <g transform={`rotate(${rot} ${cx} ${cy})`} clipPath={`url(#${uid}c)`}>
        <use href={`#${uid}p`} fill="none" stroke={`url(#${uid}g)`} strokeWidth={width} data-band={sync} />
        <text fill="#fff" fontFamily="Maven Pro Variable, sans-serif" fontSize={fontSize} letterSpacing={fontSize * 0.14} dominantBaseline="central" data-text={sync}>
          <textPath href={`#${uid}p`} startOffset={0} data-tp={sync}>{Array.from({ length: reps }, (_, i) => <Phrase key={i} fs={fontSize} />)}</textPath>
        </text>
      </g>
      <text ref={probe} fontFamily="Maven Pro Variable, sans-serif" fontSize={fontSize} letterSpacing={fontSize * 0.14} visibility="hidden"><Phrase fs={fontSize} /></text>
    </svg>
  )
}

/** Intro animation for the ribbon: the band draws itself, then the text fades in. */
export function useRibbonEntrance(sync: string, geo: Pick<RibbonGeometry, 'rx' | 'ry'>, delay = 0) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const bands = document.querySelectorAll<SVGElement>(`[data-band="${sync}"]`)
    const texts = document.querySelectorAll(`[data-text="${sync}"]`)
    const len = perimeter(geo.rx, geo.ry)
    gsap.set(bands, { strokeDasharray: len, strokeDashoffset: len })
    gsap.set(texts, { opacity: 0 })
    const tl = gsap.timeline({ delay })
    tl.to(bands, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' })
      .to(texts, { opacity: 1, duration: 0.8 }, '-=0.4')
      .set(bands, { strokeDasharray: 'none' })
    return () => { tl.kill() }
  }, [sync, geo.rx, geo.ry, delay])
}
