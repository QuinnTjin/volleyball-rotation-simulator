import { useState } from 'react'
import clsx from 'clsx'
import Player from './Player'
import { buildRotations, ROTATION_COUNT } from '../rotations'
import { getPositionLabel, getRosterWarnings } from '../roster'
import type { RosterPlayer } from '../roster'
import '../styles/court.scss'

// 9m x 9m half-court, scaled at 40px per meter
const COURT_SIZE = 360
const ATTACK_LINE = 120 // 3m from the net, scaled

// Narrow side canvas: one column of Player dots, one row per bench player.
const BENCH_WIDTH = 100
const BENCH_ROW_HEIGHT = 84
const BENCH_DOT_X = BENCH_WIDTH / 2
const BENCH_DOT_Y = 40

type RotationSystem = {
  id: string
  label: string
}

// Only 5-1 is implemented today; adding a system here is scaffolding only -
// buildRotations still always runs 5-1 logic until that's wired up.
const ROTATION_SYSTEMS: RotationSystem[] = [{ id: '5-1', label: '5-1 Rotation' }]

type CourtProps = {
  roster: RosterPlayer[]
}

function Court({ roster }: CourtProps) {
  const [rotationSystemId, setRotationSystemId] = useState(ROTATION_SYSTEMS[0].id)
  const [rotationIndex, setRotationIndex] = useState(0)
  const rosterWarnings = getRosterWarnings(roster)
  const rotationsDisabled = rosterWarnings.length > 0
  const disabledReason = rosterWarnings.join(' ')

  // While the starting lineup is invalid (mid-edit), the court stays empty:
  // buildRotations assumes a legal 5-1 lineup, so it only runs once the
  // warnings clear.
  const currentRotation = rotationsDisabled ? undefined : buildRotations(roster)[rotationIndex]
  const benchedStarter = roster.find((player) => player.id === currentRotation?.benchedStarterId)

  // The bench holds every non-starter, plus (in 7-starter lineups) the one
  // starter sitting out this rotation - drawn first, with a ring marking
  // them as a starter rather than a regular bench player.
  const nonStarters = roster.filter((player) => !player.isStarter)
  const benchPlayers = benchedStarter !== undefined ? [benchedStarter, ...nonStarters] : nonStarters
  const benchHeight = Math.max(BENCH_ROW_HEIGHT, benchPlayers.length * BENCH_ROW_HEIGHT)

  return (
    <div>
      <select
        className="text-sm text-text mb-2 font-inherit border-none bg-transparent p-0 cursor-pointer appearance-none"
        value={rotationSystemId}
        onChange={(event) => setRotationSystemId(event.target.value)}
      >
        {ROTATION_SYSTEMS.map((rotationSystem) => (
          <option key={rotationSystem.id} value={rotationSystem.id}>
            {rotationSystem.label}
          </option>
        ))}
      </select>
      <div className="flex items-start gap-4">
        <svg
          className="court"
          width={COURT_SIZE}
          height={COURT_SIZE}
          viewBox={`0 0 ${COURT_SIZE} ${COURT_SIZE}`}
        >
          <line className="net-line" x1={0} y1={0} x2={COURT_SIZE} y2={0} />
          <line className="attack-line" x1={0} y1={ATTACK_LINE} x2={COURT_SIZE} y2={ATTACK_LINE} />

          {currentRotation?.onCourt.map((courtPlayer) => {
            const rosterPlayer = roster.find((player) => player.id === courtPlayer.playerId)!

            return (
              <Player
                key={courtPlayer.playerId}
                name={rosterPlayer.name}
                label={getPositionLabel(rosterPlayer, roster)}
                color={rosterPlayer.color}
                x={courtPlayer.x}
                y={courtPlayer.y}
              />
            )
          })}
        </svg>

        <div className="flex flex-col items-center border border-border rounded-lg p-2">
          <h2 className="text-sm text-text">Bench</h2>
          <svg width={BENCH_WIDTH} height={benchHeight} viewBox={`0 0 ${BENCH_WIDTH} ${benchHeight}`}>
            {benchPlayers.map((benchPlayer, benchIndex) => (
              <Player
                key={benchPlayer.id}
                name={benchPlayer.name}
                label={getPositionLabel(benchPlayer, roster)}
                color={benchPlayer.color}
                x={BENCH_DOT_X}
                y={BENCH_DOT_Y + benchIndex * BENCH_ROW_HEIGHT}
                isBenchedStarter={benchPlayer.id === benchedStarter?.id}
              />
            ))}
          </svg>
        </div>
      </div>

      <h2 className="text-sm text-text mb-2">
        Rotation {rotationIndex + 1} of {ROTATION_COUNT}
      </h2>
      <div className="flex gap-2">
        <button
          className="disabled:cursor-not-allowed disabled:opacity-50"
          disabled={rotationsDisabled}
          title={rotationsDisabled ? disabledReason : undefined}
          onClick={() => setRotationIndex((rotationIndex - 1 + ROTATION_COUNT) % ROTATION_COUNT)}
        >
          ←
        </button>

        {Array.from({ length: ROTATION_COUNT }, (_, rotationOption) => (
          <button
            key={rotationOption}
            className={clsx(
              'px-2 py-1 border rounded disabled:cursor-not-allowed disabled:opacity-50',
              rotationOption === rotationIndex
                ? 'bg-accent-bg border-accent-border'
                : 'border-border',
            )}
            disabled={rotationsDisabled}
            title={rotationsDisabled ? disabledReason : undefined}
            onClick={() => setRotationIndex(rotationOption)}
          >
            {rotationOption + 1}
          </button>
        ))}

        <button
          className="disabled:cursor-not-allowed disabled:opacity-50"
          disabled={rotationsDisabled}
          title={rotationsDisabled ? disabledReason : undefined}
          onClick={() => setRotationIndex((rotationIndex + 1) % ROTATION_COUNT)}
        >
          →
        </button>
      </div>

      {rotationsDisabled && (
        <div className="mt-3 px-3 py-2 border rounded-md text-[13px] text-left border-[#da525d] bg-[#da525d]/10 text-[#da525d] [&_p+p]:mt-1">
          {rosterWarnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default Court
