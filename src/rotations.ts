import type { PositionKey, RosterPlayer } from './roster'

export type CourtPlayer = {
  playerId: RosterPlayer['id']
  x: number
  y: number
}

export type RotationLineup = {
  onCourt: CourtPlayer[]
  benchedStarterId: RosterPlayer['id'] | undefined
}

export const ROTATION_COUNT = 6

// Fixed court spots P1-P6 (standard volleyball numbering), in the mockup's
// 400x400 court space: the net runs along the top (y=14), so the front row
// (P2/P3/P4) sits at y=76 near the net and the back row (P1/P5/P6) at y=300.
// P1 = back right (server), P2 front right, P3 front middle, P4 front left,
// P5 back left, P6 back middle. These match the "Base Zone" formation.
const COURT_SLOTS = [
  { x: 324, y: 300 }, // P1
  { x: 324, y: 76 }, // P2
  { x: 200, y: 76 }, // P3
  { x: 76, y: 76 }, // P4
  { x: 76, y: 300 }, // P5
  { x: 200, y: 300 }, // P6
]

// Back-row slots: the server plus the two back-row defenders.
const BACK_ROW_SLOT_INDICES = [0, 4, 5] // P1, P5, P6
const P1_SLOT_INDEX = 0 // the serving slot

// Standard 5-1 serve order for rotation 1. Same-position pairs sit three
// slots apart, so every rotation has exactly one middle blocker in the back
// row - the libero swap below depends on that spacing.
const SERVE_ORDER_TEMPLATE: PositionKey[] = [
  'setter',
  'outside',
  'middle-blocker',
  'opposite',
  'outside',
  'middle-blocker',
]

// Slot the six on-court starters into the template, consuming each player
// once so the two outsides (and the two middles) land three slots apart.
function buildServeOrder(courtStarters: RosterPlayer[]): RosterPlayer[] {
  const unassignedStarters = [...courtStarters]

  return SERVE_ORDER_TEMPLATE.map((templatePosition) => {
    const matchIndex = unassignedStarters.findIndex((starter) => starter.position === templatePosition)
    return unassignedStarters.splice(matchIndex, 1)[0]
  })
}

// Builds the six rotation snapshots for a valid 5-1 starting lineup -
// callers must gate on getRosterWarnings(roster) being empty first. Each
// rotation shifts every player one slot in serve order (P2->P1, P1->P6,
// P6->P5, P5->P4, P4->P3, P3->P2), which is the same as rotating the
// serve-order array left by one each time.
//
// With six starters (no libero) every rotation is just that shift. With a
// seventh starter (the libero), the libero swaps in for the back-row middle
// blocker - except when that middle is at P1, because the libero can't
// serve (FIVB rules): there the middle stays in to serve and the libero is
// the starter resting on the bench for that rotation.
export function buildRotations(roster: RosterPlayer[]): RotationLineup[] {
  const starters = roster.filter((rosterPlayer) => rosterPlayer.isStarter)
  const libero = starters.find((rosterPlayer) => rosterPlayer.position === 'libero')
  const serveOrder = buildServeOrder(starters.filter((rosterPlayer) => rosterPlayer.position !== 'libero'))

  return Array.from({ length: ROTATION_COUNT }, (_, rotationOffset) => {
    const lineup = [...serveOrder.slice(rotationOffset), ...serveOrder.slice(0, rotationOffset)]

    const backRowMiddleSlotIndex = BACK_ROW_SLOT_INDICES.find(
      (slotIndex) => lineup[slotIndex].position === 'middle-blocker',
    )

    const liberoSwapSlotIndex =
      libero !== undefined && backRowMiddleSlotIndex !== P1_SLOT_INDEX ? backRowMiddleSlotIndex : undefined

    const onCourt = lineup.map((startingPlayer, slotIndex) => {
      const onCourtPlayer = slotIndex === liberoSwapSlotIndex && libero !== undefined ? libero : startingPlayer

      return {
        playerId: onCourtPlayer.id,
        x: COURT_SLOTS[slotIndex].x,
        y: COURT_SLOTS[slotIndex].y,
      }
    })

    // Without a libero all six starters are on court, so nobody is benched.
    const benchedStarterId =
      libero === undefined
        ? undefined
        : liberoSwapSlotIndex !== undefined
          ? lineup[liberoSwapSlotIndex].id
          : libero.id

    return { onCourt, benchedStarterId }
  })
}
