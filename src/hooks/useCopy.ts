import { toast } from 'sonner'

/** Copies text and confirms with a toast. `label` replaces the value in the message. */
export function useCopy() {
  return async (value: string, label = value) => {
    try { await navigator.clipboard.writeText(value) } catch { /* clipboard unavailable */ }
    toast(`${label} copiado`)
  }
}
