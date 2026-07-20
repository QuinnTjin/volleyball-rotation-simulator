import { useState } from 'react'
import Player from './Player'
import { rotations } from '../rotations'
import { defaultRoster, getPositionLabel } from '../roster'

// 9m x 9m half-court, scaled at 40px per meter
const COURT_SIZE = 360
const ATTACK_LINE = 120 // 3m from the net, scaled

// Small side canvas just big enough for one Player dot + name label.
const BENCH_SIZE = 100
const BENCH_DOT_X = BENCH_SIZE / 2
const BENCH_DOT_Y = 40

function Court() {
  const [rotationIndex, setRotationIndex] = useState(0)
  const currentRotation = rotations[rotationIndex]
  const benchedRosterPlayer = defaultRoster.find((player) => player.id === currentRotation.benchedPlayerId)

  return (
    <div>
      <div className="court-layout">
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

          {currentRotation.onCourt.map((courtPlayer) => {
            const rosterPlayer = defaultRoster.find((player) => player.id === courtPlayer.playerId)!

            return (
              <Player
                key={courtPlayer.playerId}
                name={rosterPlayer.name}
                label={getPositionLabel(rosterPlayer, defaultRoster)}
                color={rosterPlayer.color}
                x={courtPlayer.x}
                y={courtPlayer.y}
              />
            )
          })}
        </svg>

        <div className="bench">
          <h2 className="bench-title">Bench</h2>
          <svg width={BENCH_SIZE} height={BENCH_SIZE} viewBox={`0 0 ${BENCH_SIZE} ${BENCH_SIZE}`}>
            {benchedRosterPlayer && (
              <Player
                name={benchedRosterPlayer.name}
                label={getPositionLabel(benchedRosterPlayer, defaultRoster)}
                color={benchedRosterPlayer.color}
                x={BENCH_DOT_X}
                y={BENCH_DOT_Y}
              />
            )}
          </svg>
        </div>
      </div>

      <div className="rotation-buttons">
        <button
          onClick={() => setRotationIndex((rotationIndex - 1 + rotations.length) % rotations.length)}
        >
          ←
        </button>

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

        <button
          onClick={() => setRotationIndex((rotationIndex + 1) % rotations.length)}
        >
          →
        </button>
      </div>
    </div>
  )
}

export default Court
