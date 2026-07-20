import type { RosterPlayer } from './roster'

export type CourtPlayer = {
  playerId: number
  x: number
  y: number
}

export type RotationLineup = {
  onCourt: CourtPlayer[]
  benchedPlayerId: number | undefined
}

// Fixed court spots P1-P6 (standard volleyball numbering).
// P1 = back right (server), going P2 front right, P3 front middle,
// P4 front left, P5 back left, P6 back middle.
const COURT_SLOTS = [
  { x: 300, y: 300 }, // P1
  { x: 300, y: 60 }, // P2
  { x: 180, y: 60 }, // P3
  { x: 60, y: 60 }, // P4
  { x: 60, y: 300 }, // P5
  { x: 180, y: 300 }, // P6
]

// Back-row slots: the server plus the two back-row hitters.
const BACK_ROW_SLOT_INDICES = [0, 4, 5] // P1, P5, P6

// Rotation 1: roster id n starts at court slot Pn.
const BASE_LINEUP = [1, 2, 3, 4, 5, 6]

// Each rotation shifts every player one slot in serve order
// (P2->P1, P1->P6, P6->P5, P5->P4, P4->P3, P3->P2), which is the
// same as rotating the lineup array left by one each time.
export function buildRotations(roster: RosterPlayer[]): RotationLineup[] {
  const middleBlockerIds = roster
    .filter((rosterPlayer) => rosterPlayer.position === 'middle-blocker')
    .map((rosterPlayer) => rosterPlayer.id)
  const liberoId = roster.find((rosterPlayer) => rosterPlayer.position === 'libero')?.id

  return Array.from({ length: 6 }, (_, rotationOffset) => {
    const lineup = [...BASE_LINEUP.slice(rotationOffset), ...BASE_LINEUP.slice(0, rotationOffset)]

    // The two middle blockers are always 3 slots apart, so exactly one of
    // them is in the back row each rotation - that's the one the libero
    // swaps in for.
    const benchedSlotIndex = BACK_ROW_SLOT_INDICES.find((slotIndex) => middleBlockerIds.includes(lineup[slotIndex]))

    const onCourt = lineup.map((lineupPlayerId, slotIndex) => ({
      playerId: slotIndex === benchedSlotIndex && liberoId !== undefined ? liberoId : lineupPlayerId,
      x: COURT_SLOTS[slotIndex].x,
      y: COURT_SLOTS[slotIndex].y,
    }))

    const benchedPlayerId = benchedSlotIndex !== undefined ? lineup[benchedSlotIndex] : undefined

    return { onCourt, benchedPlayerId }
  })
}
