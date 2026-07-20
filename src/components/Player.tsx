type PlayerProps = {
  name: string
  label: string
  color: string
  x: number
  y: number
}

function Player({ name, label, color, x, y }: PlayerProps) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r={20} fill={color} stroke="#ffffff" strokeWidth={2} />
      <text textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize={14} fontWeight="bold">
        {label}
      </text>
      <text y={34} textAnchor="middle" fontSize={12} fill="#1b1b1b">
        {name}
      </text>
    </g>
  )
}

export default Player
