type PlayerProps = {
  name: string
  label: string
  color: string
  x: number
  y: number
  isBenchedStarter?: boolean
}

// All static presentation lives in styles/court.scss under .player; only
// the per-player dot color stays inline because it comes from roster data.
function Player({ name, label, color, x, y, isBenchedStarter = false }: PlayerProps) {
  return (
    <g className="player" transform={`translate(${x}, ${y})`}>
      {/* Dashed ring: this dot is a starter who's off the court this rotation. */}
      {isBenchedStarter && <circle className="benched-ring" r={27} />}
      <circle className="dot" r={20} fill={color} />
      <text className="dot-label">{label}</text>
      <text className="dot-name" y={34}>
        {name}
      </text>
    </g>
  )
}

export default Player
