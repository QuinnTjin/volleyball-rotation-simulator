import { useState } from 'react'
import { COLOR_PALETTE, getPositionLabel, POSITION_OPTIONS } from '../roster'
import type { PositionKey, RosterPlayer } from '../roster'

type PlayersPanelProps = {
  roster: RosterPlayer[]
  onUpdatePlayer: (playerId: number, changes: Partial<Pick<RosterPlayer, 'name' | 'position' | 'color'>>) => void
}

function PlayersPanel({ roster, onUpdatePlayer }: PlayersPanelProps) {
  const [openPlayerId, setOpenPlayerId] = useState<number | null>(null)

  function togglePlayer(playerId: number) {
    setOpenPlayerId(playerId === openPlayerId ? null : playerId)
  }

  return (
    <div className="players-panel">
      <h2>Players</h2>

      {roster.map((player) => {
        const isOpen = player.id === openPlayerId

        return (
          <div key={player.id} className="accordion-item">
            <button
              type="button"
              className="accordion-header"
              aria-expanded={isOpen}
              onClick={() => togglePlayer(player.id)}
            >
              <span className="accordion-swatch" style={{ backgroundColor: player.color }} />
              <span className="accordion-name">{player.name}</span>
              <span className="accordion-label">{getPositionLabel(player, roster)}</span>
            </button>

            {isOpen && (
              <div className="accordion-body">
                <label className="accordion-field">
                  Name
                  <input
                    type="text"
                    value={player.name}
                    onChange={(event) => onUpdatePlayer(player.id, { name: event.target.value })}
                  />
                </label>

                <label className="accordion-field">
                  Position
                  <select
                    value={player.position}
                    onChange={(event) =>
                      onUpdatePlayer(player.id, { position: event.target.value as PositionKey })
                    }
                  >
                    {POSITION_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="accordion-field">
                  <span>Color</span>
                  <div className="color-palette">
                    {COLOR_PALETTE.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={color === player.color ? 'color-swatch-button selected' : 'color-swatch-button'}
                        style={{ backgroundColor: color }}
                        aria-label={`Set color ${color}`}
                        aria-pressed={color === player.color}
                        onClick={() => onUpdatePlayer(player.id, { color })}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default PlayersPanel
