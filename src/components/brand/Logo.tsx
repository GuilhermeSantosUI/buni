import { useId, type SVGProps } from 'react'

/**
 * b.Uni logo rebuilt as vector from the construction geometry:
 * circles and quarter-annuli on a single stroke width (x = 161).
 * Every part is addressable via [data-part] so GSAP can compose it.
 */
interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'color'> {
  /** Main fill. Defaults to brand red. */
  color?: string
  /** Fill of the dot over the "i". Defaults to brand blue; pass 'currentColor' for mono. */
  dot?: string
  /** `mark` renders only the "b·" reduced symbol. */
  mark?: boolean
  /** Let animated parts travel outside the viewBox without being cut. */
  bleed?: boolean
}

export const LOGO_BOX = { x: 157, y: 192, w: 1535, h: 550 }
/** Feathered reveal: animate the [data-wipe] rect's `x` from WIPE.from to 157. */
export const WIPE = { feather: 260, get width() { return LOGO_BOX.w + this.feather }, get from() { return LOGO_BOX.x - (LOGO_BOX.w + this.feather) } }

export function Logo({ color = '#DD263E', dot = '#146792', mark = false, bleed = false, style, ...props }: LogoProps) {
  const uid = useId().replace(/:/g, '')
  const viewBox = mark ? '157 262 541 482' : `${LOGO_BOX.x} ${LOGO_BOX.y} ${LOGO_BOX.w} ${LOGO_BOX.h}`
  return (
    <svg viewBox={viewBox} role="img" aria-label="b.Uni" style={bleed ? { overflow: 'visible', ...style } : style} {...props}>
      <defs>
        <mask id={`${uid}-m`} maskUnits="userSpaceOnUse" x="0" y="0" width="2000" height="1000">
          <rect width="2000" height="1000" fill="#fff" />
          <circle cx="629" cy="522" r="90" fill="#000" />
        </mask>
        <linearGradient id={`${uid}-wg`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" />
          <stop offset={1 - WIPE.feather / WIPE.width} stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id={`${uid}-c`} maskUnits="userSpaceOnUse" x="-3000" y="-1000" width="8000" height="3000">
          <rect data-wipe x={LOGO_BOX.x} y="-1000" width={WIPE.width} height="3000" fill={`url(#${uid}-wg)`} />
        </mask>
      </defs>
      <path
        data-part="b"
        fill={color}
        fillRule="evenodd"
        d="M157 270H288V351.7A198 198 0 1 1 157 538Z M287 538a68 68 0 1 0 136 0a68 68 0 1 0-136 0Z"
      />
      <circle data-part="dot" cx="629" cy="522" r="68" fill={color} />
      {!mark && (
        <>
          <g mask={`url(#${uid}-c)`}>
            <g data-part="uni" mask={`url(#${uid}-m)`} fill={color}>
              <path d="M645 279A234 234 0 0 1 879 513L645 513Z" />
              <path d="M718 506.5A234 234 0 0 0 1186 506.5L1025 506.5A73 73 0 0 1 879 506.5Z" />
              <path d="M718 500H879V515H718Z M1025 500H1186V515H1025Z" />
              <path d="M1025 513A234 234 0 0 1 1493 513L1332 513A73 73 0 0 0 1186 513Z" />
              <path d="M1332 500H1495V740H1332Z" />
              <path d="M1456 348H1617V512H1456Z" />
              <path d="M1691 737A234 234 0 0 1 1457 503L1617 503A74 74 0 0 0 1691 577Z" />
            </g>
          </g>
          <circle data-part="idot" cx="1540" cy="260" r="68" fill={dot} />
        </>
      )}
    </svg>
  )
}
