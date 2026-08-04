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
// rotation positions. It's centered on (x, y) via the -23px margins (half of
// its 46px size).
function PlayerDot({ x, y, color, short, name, selected = false, onClick }: PlayerDotProps) {
  const ring = selected
    ? '0 0 0 3px #4b53c4, 0 2px 6px rgba(0,0,0,0.18)'
    : '0 0 0 2.5px #fff, 0 2px 6px rgba(0,0,0,0.12)'

  return (
    <div
      onClick={onClick}
      className="absolute z-10 flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-full text-xs font-bold text-white"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        margin: '-23px 0 0 -23px',
        background: color,
        boxShadow: ring,
        transition: 'left .55s cubic-bezier(.4,0,.2,1), top .55s cubic-bezier(.4,0,.2,1)',
      }}
    >
      {short}
      <span className="absolute left-1/2 top-[48px] -translate-x-1/2 whitespace-nowrap text-[11px] font-normal text-ash">
        {name}
      </span>
    </div>
  )
}

export default PlayerDot
