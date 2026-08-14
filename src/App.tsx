import { useEffect, useState } from 'react'
import clsx from 'clsx'
import AppHeader from './components/AppHeader'
import RosterPanel from './components/RosterPanel'
import type { RosterRow } from './components/RosterPanel'
import Court from './components/Court'
import type { CourtDot } from './components/Court'
import ControlsPanel from './components/ControlsPanel'
import type { CourtView } from './components/ControlsPanel'
import RemoveConfirmModal from './components/RemoveConfirmModal'
import { buildRotations } from './rotations'
import { PHASES, SERVE_PHASES, getPhasePosition } from './phases'
import type { RotationIndex, SlotIndex } from './formations/types'
import {
  createBenchPlayer,
  defaultRoster,
  getPositionLabel,
  getRosterWarnings,
  MAX_ROSTER_SIZE,
} from './roster'
import type { RosterPlayer, RotationSystem } from './roster'

type Mode = 'receive' | 'serve'

function App() {
  const [roster, setRoster] = useState<RosterPlayer[]>(defaultRoster)
  const [system, setSystem] = useState<RotationSystem>('5-1')
  // Saving stays disabled until the saved roster has been fetched, so a PUT
  // can never overwrite the file on disk with the built-in default roster.
  const [isRosterLoaded, setIsRosterLoaded] = useState(false)

  // UI state lifted here because the header, court, and controls panel all
  // read or change it.
  const [rotationIndex, setRotationIndex] = useState(0)
  const [mode, setMode] = useState<Mode>('receive')
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null)
  const [view, setView] = useState<CourtView>({ grid: true, numbers: true })
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null)

  // Receive and Serve mode have different-length phase lists (5 vs 3), so
  // switching modes resets to phase 0 rather than risk an out-of-range index.
  function selectMode(nextMode: Mode) {
    setMode(nextMode)
    setPhaseIndex(0)
  }

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
  const warnings = getRosterWarnings(roster, system)
  const isLineupInvalid = warnings.length > 0
  const currentRotation = isLineupInvalid ? undefined : buildRotations(roster, system)[rotationIndex]

  const phases = mode === 'receive' ? PHASES : SERVE_PHASES
  // rotationIndex/slotIndex are plain numbers at runtime (state + array
  // index), but both are always 0-5 by construction (ROTATION_COUNT and
  // onCourt are both fixed at 6) - these casts just tell the type system
  // what's already true, so getPhasePosition's context object stays fully
  // typed instead of widening to `number`.
  const currentRotationIndex = rotationIndex as RotationIndex

  const dots: CourtDot[] =
    currentRotation?.onCourt.map((courtPlayer, slotIndex) => {
      const player = roster.find((rosterPlayer) => rosterPlayer.id === courtPlayer.playerId)!
      const currentSlotIndex = slotIndex as SlotIndex
      const { x, y } =
        mode === 'receive'
          ? getPhasePosition({
              system,
              mode: 'receive',
              rotationIndex: currentRotationIndex,
              phaseKey: PHASES[phaseIndex].key,
              slotIndex: currentSlotIndex,
            })
          : getPhasePosition({
              system,
              mode: 'serve',
              rotationIndex: currentRotationIndex,
              phaseKey: SERVE_PHASES[phaseIndex].key,
              slotIndex: currentSlotIndex,
            })
      return {
        id: player.id,
        x,
        y,
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
      <AppHeader systemLabel={system} onSelectSystem={setSystem} warning={warnings[0]} />

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

        <div className="flex w-60 flex-none flex-col gap-3">
          {/* Receive/Serve mode toggle - relocated here (was in AppHeader)
              so it sits directly above the panel whose phase list it drives. */}
          <div className="flex w-full rounded-lg bg-chip p-[3px] text-[12.5px] font-semibold">
            <div
              onClick={() => selectMode('receive')}
              className={clsx(
                'flex-1 cursor-pointer rounded-md px-3.5 py-1.5 text-center',
                mode === 'receive' ? 'bg-card text-ink shadow-[0_1px_2px_rgba(0,0,0,0.08)]' : 'text-muted',
              )}
            >
              Receive
            </div>
            <div
              onClick={() => selectMode('serve')}
              className={clsx(
                'flex-1 cursor-pointer rounded-md px-3.5 py-1.5 text-center',
                mode === 'serve' ? 'bg-card text-ink shadow-[0_1px_2px_rgba(0,0,0,0.08)]' : 'text-muted',
              )}
            >
              Serve
            </div>
          </div>

          <ControlsPanel
            rotationIndex={rotationIndex}
            onSelectRotation={setRotationIndex}
            phases={phases}
            phaseIndex={phaseIndex}
            onSelectPhase={setPhaseIndex}
            disabled={isLineupInvalid}
            view={view}
            onToggleView={(key) => setView((current) => ({ ...current, [key]: !current[key] }))}
          />
        </div>
      </div>

      {playerToRemove && (
        <RemoveConfirmModal
          playerName={playerToRemove.name}
          systemLabel={system}
          onCancel={() => setConfirmRemoveId(null)}
          onConfirm={confirmRemovePlayer}
        />
      )}
    </div>
  )
}

export default App
