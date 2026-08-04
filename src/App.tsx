import { useEffect, useState } from 'react'
import Court from './components/Court'
import PlayersPanel from './components/PlayersPanel'
import { createBenchPlayer, defaultRoster, MAX_ROSTER_SIZE } from './roster'
import type { RosterPlayer } from './roster'

function App() {
  const [roster, setRoster] = useState<RosterPlayer[]>(defaultRoster)
  // Saving stays disabled until the saved roster has been fetched, so a PUT
  // can never overwrite the file on disk with the built-in default roster.
  const [isRosterLoaded, setIsRosterLoaded] = useState(false)

  useEffect(() => {
    let isCancelled = false

    async function loadSavedRoster() {
      try {
        const response = await fetch('/api/roster')
        if (!response.ok) {
          throw new Error(`GET /api/roster returned ${response.status}`)
        }
        // null means the server has nothing saved yet - keep the default.
        const savedRoster: RosterPlayer[] | null = await response.json()
        if (isCancelled) {
          return
        }
        if (savedRoster !== null) {
          setRoster(savedRoster)
        }
        setIsRosterLoaded(true)
      } catch (error) {
        console.warn('Roster API unavailable - using the default roster, saving disabled.', error)
      }
    }

    loadSavedRoster()
    return () => {
      isCancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isRosterLoaded) {
      return
    }

    // Debounced auto-save: typing in the name field updates roster on every
    // keystroke, and the cleanup cancels the previous pending save, so the
    // server sees one PUT per pause instead of one per character.
    const saveTimeoutId = setTimeout(() => {
      fetch('/api/roster', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roster),
      }).catch((error) => console.warn('Failed to save roster.', error))
    }, 500)

    return () => clearTimeout(saveTimeoutId)
  }, [roster, isRosterLoaded])

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
