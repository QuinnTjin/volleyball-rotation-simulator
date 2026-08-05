type PlayerDotProps = {
  x: number
  y: number
  color: string
  short: string
  name: string
  selected?: boolean
  onClick?: () => void
}

// A player on the court. Unlike the old SVG dot, this is an absolutely
// positioned <div> so a CSS left/top transition slides it smoothly between
// rotation positions. It's centered on (x, y) via the -18.5px margins (half
// of its 37px size) — 2.5 real 36cm shoulder-widths side by side, at the
// court's 41.33px/m scale (372px drawn = 9m).
function PlayerDot({ x, y, color, short, name, selected = false, onClick }: PlayerDotProps) {
  const ring = selected
    ? '0 0 0 3px #4b53c4, 0 2px 6px rgba(0,0,0,0.18)'
    : '0 0 0 2.5px #fff, 0 2px 6px rgba(0,0,0,0.12)'

  return (
    <div
      onClick={onClick}
      className="absolute z-10 flex h-[37px] w-[37px] cursor-pointer items-center justify-center rounded-full text-[11px] font-bold text-white"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        margin: '-18.5px 0 0 -18.5px',
        background: color,
        boxShadow: ring,
        transition: 'left .55s cubic-bezier(.4,0,.2,1), top .55s cubic-bezier(.4,0,.2,1)',
      }}
    >
      {short}
      <span className="absolute left-1/2 top-[39px] -translate-x-1/2 whitespace-nowrap text-[11px] font-normal text-ash">
        {name}
      </span>
    </div>
  )
}

export default PlayerDot
