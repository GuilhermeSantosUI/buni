export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export function rgbToHex([r, g, b]: number[]) {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase()
}

export function mix(a: string, b: string, t: number) {
  const A = hexToRgb(a), B = hexToRgb(b)
  return rgbToHex(A.map((v, i) => v + (B[i] - v) * t))
}

export function cmyk(hex: string) {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255)
  const k = 1 - Math.max(r, g, b)
  if (k === 1) return [0, 0, 0, 100]
  return [(1 - r - k) / (1 - k), (1 - g - k) / (1 - k), (1 - b - k) / (1 - k), k].map((v) => Math.round(v * 100))
}

const lin = (v: number) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
export function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
export function contrast(a: string, b: string) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}
