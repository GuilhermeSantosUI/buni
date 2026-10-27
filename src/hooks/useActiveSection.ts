import { useEffect, useState } from 'react'
import { ScrollTrigger } from '@/lib/gsap'

export type Tone = 'light' | 'dark'

/**
 * Tracks which section covers the middle of the viewport.
 * ScrollTrigger recomputes positions on refresh/resize, so it stays correct
 * under smooth scrolling and when animations change section heights.
 */
export function useActiveSection(ids: string[]) {
  const [state, setState] = useState<{ id: string; tone: Tone; label: string; bg: string }>({ id: ids[0], tone: 'dark', label: '', bg: '#dd263e' })

  useEffect(() => {
    const triggers = ids.flatMap((id) => {
      const el = document.getElementById(id)
      if (!el) return []
      const activate = () => setState({ id, tone: el.dataset.tone === 'dark' ? 'dark' : 'light', label: el.dataset.chapter ?? '', bg: getComputedStyle(el).backgroundColor })
      return [ScrollTrigger.create({ trigger: el, start: 'top 50%', end: 'bottom 50%', onEnter: activate, onEnterBack: activate })]
    })
    // sections mount after the first paint: make sure positions are fresh
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600)
    return () => { window.clearTimeout(t); triggers.forEach((s) => s.kill()) }
  }, [ids])

  return state
}
