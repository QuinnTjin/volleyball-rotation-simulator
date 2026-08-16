import { CANVAS_HEIGHT_PX, CANVAS_WIDTH_PX } from '../court-geometry'

type PlayerDotProps = {
  x: number
  y: number
  color: string
  short: string
  name: string
  selected?: boolean
  onClick?: () => void
}

// A player on the court. Positioned as a percentage of the court canvas rather
// than in fixed pixels, so it tracks the court as it scales fluidly: x/y come
// out of getPhasePosition in the canvas's own pixel space, so dividing by the
// canvas dimensions gives the same fraction at any rendered size. The wrapper
// is centered on (x, y) with a translate, and a CSS left/top transition slides
// it smoothly between rotation positions.
//
// Visual size and tap size are deliberately independent. The coloured dot is a
// fixed fraction of the court (7.4% wide = 37px on the 500px desktop court,
// preserving the mockup's proportion), so it shrinks with the court. The
// transparent <button> over it holds a 44px minimum hit area, so the tap
// target stays usable even when the dot shrinks on a phone.
function PlayerDot({ x, y, color, short, name, selected = false, onClick }: PlayerDotProps) {
  const ring = selected
    ? '0 0 0 3px #4b53c4, 0 2px 6px rgba(0,0,0,0.18)'
    : '0 0 0 2.5px #fff, 0 2px 6px rgba(0,0,0,0.12)'

  return (
    <div
      className="absolute z-10 aspect-square w-[7.4%]"
      style={{
        left: `${(x / CANVAS_WIDTH_PX) * 100}%`,
        top: `${(y / CANVAS_HEIGHT_PX) * 100}%`,
        transform: 'translate(-50%, -50%)',
        transition: 'left .55s cubic-bezier(.4,0,.2,1), top .55s cubic-bezier(.4,0,.2,1)',
      }}
    >
      <div
        className="flex h-full w-full items-center justify-center rounded-full text-[9px] font-bold text-white sm:text-[11px]"
        style={{ background: color, boxShadow: ring }}
      >
        {short}
      </div>

      {/* Name label, anchored to the dot's bottom edge (top-full) so it stays
          just under the dot at every size - mt-[2px] reproduces the old 39px
          gap on the 37px desktop dot. max-width + truncate stop long names
          from colliding on a small court; lg removes the cap so the desktop
          rendering is unchanged from before. */}
      <span className="absolute left-1/2 top-full mt-[2px] max-w-[64px] -translate-x-1/2 truncate text-[9px] font-normal text-ash sm:max-w-[88px] sm:text-[11px] lg:max-w-none">
        {name}
      </span>

      {/* Transparent 44px tap target, centered on the dot and independent of
          its visual size. It has no text content, so it needs an accessible
          name via aria-label. */}
      <button
        type="button"
        onClick={onClick}
        aria-label={name}
        className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
      />
    </div>
  )
}

export default PlayerDot
