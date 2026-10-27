/** Motion tokens — documented in the Movimento chapter. */
export const EASE = {
  enter: 'power3.out',
  move: 'power3.inOut',
  exit: 'power2.in',
  settle: 'expo.out',
} as const

export const DUR = { fast: 0.2, base: 0.6, slow: 0.9, scene: 1.4 } as const
