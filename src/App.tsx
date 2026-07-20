import { useState } from 'react'
import Court from './components/Court'
import PlayersPanel from './components/PlayersPanel'
import { defaultRoster } from './roster'
import type { RosterPlayer } from './roster'
import './App.css'

function App() {
  const [roster, setRoster] = useState<RosterPlayer[]>(defaultRoster)

  function updatePlayer(playerId: number, changes: Partial<Pick<RosterPlayer, 'name' | 'position' | 'color'>>) {
    setRoster((currentRoster) =>
      currentRoster.map((player) => (player.id === playerId ? { ...player, ...changes } : player)),
    )
    console.log(changes);

  }

  return (
    <div className="app">
      <h1>Volleyball Rotation Simulator</h1>
      <div className="main-layout">
        <PlayersPanel roster={roster} onUpdatePlayer={updatePlayer} />
        <Court roster={roster} />
      </div>
    </div>
  )
}

export default App
