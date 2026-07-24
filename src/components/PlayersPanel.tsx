import { useState } from 'react'
import clsx from 'clsx'
import { COLOR_PALETTE, getPositionLabel, POSITION_OPTIONS } from '../roster'
import type { PositionKey, RosterPlayer } from '../roster'

type PlayersPanelProps = {
  roster: RosterPlayer[]
  onUpdatePlayer: (
    playerId: RosterPlayer['id'],
    changes: Partial<Pick<RosterPlayer, 'name' | 'position' | 'color'>>,
  ) => void
}

function PlayersPanel({ roster, onUpdatePlayer }: PlayersPanelProps) {
  const [openPlayerId, setOpenPlayerId] = useState<RosterPlayer['id'] | null>(null)

  function togglePlayer(playerId: RosterPlayer['id']) {
    setOpenPlayerId(playerId === openPlayerId ? null : playerId)
  }

  return (
    <div className="w-60 text-left">
      <h2>Players</h2>

      {roster.map((player) => {
        const isOpen = player.id === openPlayerId

        return (
          <div key={player.id} className="border border-border rounded-md mb-2 overflow-hidden">
            <button
              type="button"
              className="flex items-center gap-2 w-full px-3 py-2 bg-transparent border-none cursor-pointer text-left font-inherit text-inherit hover:bg-code-bg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              aria-expanded={isOpen}
              onClick={() => togglePlayer(player.id)}
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: player.color }}
              />
              <span className="flex-1">{player.name}</span>
              <span className="text-xs text-text">{getPositionLabel(player, roster)}</span>
            </button>

            {isOpen && (
              <div className="px-3 pt-2 pb-3 border-t border-border">
                <label className="flex flex-col gap-1 text-[13px] mb-2">
                  Name
                  <input
                    type="text"
                    className="font-inherit px-1.5 py-1 border border-border rounded text-text-h bg-bg"
                    value={player.name}
                    onChange={(event) => onUpdatePlayer(player.id, { name: event.target.value })}
                  />
                </label>

                <label className="flex flex-col gap-1 text-[13px] mb-2">
                  Position
                  <select
                    className="font-inherit px-1.5 py-1 border border-border rounded text-text-h bg-bg"
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

                <div className="flex flex-col gap-1 text-[13px] mb-2">
                  <span>Color</span>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_PALETTE.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={clsx(
                          'w-[22px] h-[22px] rounded-full border-2 p-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
                          color === player.color ? 'border-text-h' : 'border-transparent',
                        )}
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
