import { useState } from 'react'
import Court from './components/Court'
import PlayersPanel from './components/PlayersPanel'
import { createBenchPlayer, defaultRoster, MAX_ROSTER_SIZE } from './roster'
import type { RosterPlayer } from './roster'

function App() {
  const [roster, setRoster] = useState<RosterPlayer[]>(defaultRoster)

  function updatePlayer(
    playerId: RosterPlayer['id'],
    changes: Partial<Pick<RosterPlayer, 'name' | 'position' | 'color' | 'isStarter'>>,
  ) {
    setRoster((currentRoster) =>
      currentRoster.map((player) => (player.id === playerId ? { ...player, ...changes } : player)),
    )
  }

  function addPlayer() {
    setRoster((currentRoster) =>
      currentRoster.length >= MAX_ROSTER_SIZE ? currentRoster : [...currentRoster, createBenchPlayer(currentRoster)],
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1>Volleyball Rotation Simulator</h1>
      <div className="flex items-start gap-8">
        <PlayersPanel roster={roster} onUpdatePlayer={updatePlayer} onAddPlayer={addPlayer} />
        <Court roster={roster} />
      </div>
    </div>
  )
}

export default App
