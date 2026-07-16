import Player from './Player'

// 9m x 9m half-court, scaled at 40px per meter
const COURT_SIZE = 360
const ATTACK_LINE = 120 // 3m from the net, scaled

function Court() {
  return (
    <svg
      width={COURT_SIZE}
      height={COURT_SIZE}
      viewBox={`0 0 ${COURT_SIZE} ${COURT_SIZE}`}
      style={{ background: '#c9a15a', border: '4px solid white' }}
    >
      <line x1={0} y1={0} x2={COURT_SIZE} y2={0} stroke="white" strokeWidth={4} />
      <line
        x1={0}
        y1={ATTACK_LINE}
        x2={COURT_SIZE}
        y2={ATTACK_LINE}
        stroke="white"
        strokeWidth={2}
        strokeDasharray="6 4"
      />

      {/* front row: 4, 3, 2 (left to right) */}
      <Player number={4} x={60} y={60} />
      <Player number={3} x={180} y={60} />
      <Player number={2} x={300} y={60} />

      {/* back row: 5, 6, 1 (left to right) */}
      <Player number={5} x={60} y={300} />
      <Player number={6} x={180} y={300} />
      <Player number={1} x={300} y={300} />
    </svg>
  )
}

export default Court
