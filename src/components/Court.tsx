import { useState } from 'react'
import Player from './Player'
import { rotations } from '../rotations'

// 9m x 9m half-court, scaled at 40px per meter
const COURT_SIZE = 360
const ATTACK_LINE = 120 // 3m from the net, scaled

function Court() {
  const [rotationIndex, setRotationIndex] = useState(0)

  return (
    <div>
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

        {rotations[rotationIndex].map((player) => (
          <Player key={player.number} number={player.number} x={player.x} y={player.y} />
        ))}
      </svg>

      <div className="rotation-buttons">
        {rotations.map((_, rotationOption) => (
          <button
            key={rotationOption}
            className={rotationOption === rotationIndex ? 'active' : ''}
            onClick={() => {setRotationIndex(rotationOption);
              console.log('clicked rotationOption:', rotationOption);}
            }
          >
            R{rotationOption + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Court
