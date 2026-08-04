import { useEffect, useState } from 'react'
import AppHeader from './components/AppHeader'
import RosterPanel from './components/RosterPanel'
import type { RosterRow } from './components/RosterPanel'
import Court from './components/Court'
import type { CourtDot } from './components/Court'
import ControlsPanel from './components/ControlsPanel'
import type { CourtView } from './components/ControlsPanel'
import RemoveConfirmModal from './components/RemoveConfirmModal'
import { buildRotations } from './rotations'
import {
  createBenchPlayer,
  defaultRoster,
  getPositionLabel,
  getRosterWarnings,
  MAX_ROSTER_SIZE,
} from './roster'
import type { RosterPlayer } from './roster'

const SYSTEM_LABEL = '5-1'

function App() {
  const [roster, setRoster] = useState<RosterPlayer[]>(defaultRoster)
  // Saving stays disabled until the saved roster has been fetched, so a PUT
  // can never overwrite the file on disk with the built-in default roster.
  const [isRosterLoaded, setIsRosterLoaded] = useState(false)

  // UI state lifted here because the header, court, and controls panel all
  // read or change it.
  const [rotationIndex, setRotationIndex] = useState(0)
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null)
  const [view, setView] = useState<CourtView>({ grid: true, numbers: true })
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null)

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
    playerId: string,
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

  function confirmRemovePlayer() {
    setRoster((currentRoster) => currentRoster.filter((player) => player.id !== confirmRemoveId))
    setSelectedPlayerId(null)
    setConfirmRemoveId(null)
  }

  function toggleSelectPlayer(playerId: string) {
    setSelectedPlayerId((current) => (current === playerId ? null : playerId))
  }

  // --- Derive the current rotation once and feed both the court and the
  // roster panel from it, so they never disagree about who's where. ---
  const warnings = getRosterWarnings(roster)
  const isLineupInvalid = warnings.length > 0
  const currentRotation = isLineupInvalid ? undefined : buildRotations(roster)[rotationIndex]

  const dots: CourtDot[] =
    currentRotation?.onCourt.map((courtPlayer) => {
      const player = roster.find((rosterPlayer) => rosterPlayer.id === courtPlayer.playerId)!
      return {
        id: player.id,
        x: courtPlayer.x,
        y: courtPlayer.y,
        color: player.color,
        short: getPositionLabel(player, roster),
        name: player.name,
        selected: player.id === selectedPlayerId,
      }
    }) ?? []

  let onCourtRows: RosterRow[]
  let offCourtRows: RosterRow[]
  if (currentRotation) {
    const onCourtIds = new Set(currentRotation.onCourt.map((courtPlayer) => courtPlayer.playerId))
    // onCourt is in slot order P1..P6, i.e. zones 1..6 - the index is the zone.
    onCourtRows = currentRotation.onCourt.map((courtPlayer, slotIndex) => ({
      player: roster.find((rosterPlayer) => rosterPlayer.id === courtPlayer.playerId)!,
      chip: `Z${slotIndex + 1}`,
    }))
    offCourtRows = roster
      .filter((player) => !onCourtIds.has(player.id))
      .map((player) => ({
        player,
        chip: player.id === currentRotation.benchedStarterId ? 'L sub' : '—',
      }))
  } else {
    // Mid-edit the lineup is illegal, so fall back to the raw starter flag.
    onCourtRows = roster.filter((player) => player.isStarter).map((player) => ({ player, chip: '—' }))
    offCourtRows = roster.filter((player) => !player.isStarter).map((player) => ({ player, chip: '—' }))
  }

  const playerToRemove = roster.find((player) => player.id === confirmRemoveId)

  return (
    <div className="min-h-screen pb-7">
      <AppHeader systemLabel={SYSTEM_LABEL} warning={warnings[0]} />

      <div className="flex items-start justify-center gap-5 px-7 pt-5">
        <RosterPanel
          roster={roster}
          onCourtRows={onCourtRows}
          offCourtRows={offCourtRows}
          selectedPlayerId={selectedPlayerId}
          onSelectPlayer={toggleSelectPlayer}
          onUpdatePlayer={updatePlayer}
          onRequestRemove={setConfirmRemoveId}
          onAddPlayer={addPlayer}
          canAddPlayer={roster.length < MAX_ROSTER_SIZE}
        />

        <Court
          dots={dots}
          rotationNumber={rotationIndex + 1}
          gridVisible={view.grid}
          numbersVisible={view.numbers}
          invalid={isLineupInvalid}
          warning={warnings.join(' ')}
          onSelectDot={toggleSelectPlayer}
        />

        <ControlsPanel
          rotationIndex={rotationIndex}
          onSelectRotation={setRotationIndex}
          disabled={isLineupInvalid}
          view={view}
          onToggleView={(key) => setView((current) => ({ ...current, [key]: !current[key] }))}
        />
      </div>

      {playerToRemove && (
        <RemoveConfirmModal
          playerName={playerToRemove.name}
          systemLabel={SYSTEM_LABEL}
          onCancel={() => setConfirmRemoveId(null)}
          onConfirm={confirmRemovePlayer}
        />
      )}
    </div>
  )
}

export default App
