type PlayerProps = {
  number: number
  x: number
  y: number
}

function Player({ number, x, y }: PlayerProps) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r={20} fill="#2d6cdf" stroke="#ffffff" strokeWidth={2} />
      <text textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize={16} fontWeight="bold">
        {number}
      </text>
    </g>
  )
}

export default Player
