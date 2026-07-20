import { useState } from 'react'
import { defaultRoster, getPositionLabel } from '../roster'

function PlayersPanel() {
  const [openPlayerId, setOpenPlayerId] = useState<number | null>(null)

  function togglePlayer(playerId: number) {
    setOpenPlayerId(playerId === openPlayerId ? null : playerId)
  }

  return (
    <div className="players-panel">
      <h2>Players</h2>

      {defaultRoster.map((player) => {
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
              <span className="accordion-label">{getPositionLabel(player, defaultRoster)}</span>
            </button>

            {isOpen && (
              <div className="accordion-body">
                <p>Name: {player.name}</p>
                <p>Position: {player.position}</p>
                <p>Color: {player.color}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default PlayersPanel
