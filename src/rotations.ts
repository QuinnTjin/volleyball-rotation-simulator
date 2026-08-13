import type { PositionKey, RosterPlayer, RotationSystem } from './roster'

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
export const COURT_SLOTS = [
  { x: 324, y: 300 }, // P1
  { x: 324, y: 76 }, // P2
  { x: 200, y: 76 }, // P3
  { x: 76, y: 76 }, // P4
  { x: 76, y: 300 }, // P5
  { x: 200, y: 300 }, // P6
]

// Back-row slots: the server plus the two back-row defenders. Exported so
// phases.ts can classify a slot as front/back row without duplicating this
// list - overlap only cares about P-slot order, but phase target positions
// (Receive onward) key off front/back row instead.
export const BACK_ROW_SLOT_INDICES = [0, 4, 5] // P1, P5, P6
const P1_SLOT_INDEX = 0 // the serving slot

// Serve order templates for rotation 1, one per system. Same-position pairs
// always sit three slots apart (opposite each other in the rotation), so
// every rotation has exactly one of each pair in the back row - the libero
// swap below depends on that spacing. Confirmed with the volleyball SME:
// this spacing invariant isn't 5-1-specific, it's just how a 6-slot lineup
// with 3 position-pairs works. 4-2 and 6-2 share a template - both run two
// setters with no dedicated Opposite, the second setter taking the slot a
// 5-1's Opposite would occupy; they differ only in which row sets (front vs
// back), which is a tactical fact this app doesn't need to encode here.
const SERVE_ORDER_TEMPLATES: Record<RotationSystem, PositionKey[]> = {
  '5-1': ['setter', 'outside', 'middle-blocker', 'opposite', 'outside', 'middle-blocker'],
  '4-2': ['setter', 'outside', 'middle-blocker', 'setter', 'outside', 'middle-blocker'],
  '6-2': ['setter', 'outside', 'middle-blocker', 'setter', 'outside', 'middle-blocker'],
}

// Slot the six on-court starters into the template, consuming each player
// once so the two outsides (and the two middles, and the two setters in
// 4-2/6-2) land three slots apart.
function buildServeOrder(courtStarters: RosterPlayer[], template: PositionKey[]): RosterPlayer[] {
  const unassignedStarters = [...courtStarters]

  return template.map((templatePosition) => {
    const matchIndex = unassignedStarters.findIndex((starter) => starter.position === templatePosition)
    return unassignedStarters.splice(matchIndex, 1)[0]
  })
}

// Builds the six rotation snapshots for a valid starting lineup in the
// given system - callers must gate on getRosterWarnings(roster, system)
// being empty first. Each rotation shifts every player one slot in serve
// order (P2->P1, P1->P6, P6->P5, P5->P4, P4->P3, P3->P2), which is the same
// as rotating the serve-order array left by one each time.
//
// With six starters (no libero) every rotation is just that shift. With a
// seventh starter (the libero), the libero swaps in for the back-row middle
// blocker - except when that middle is at P1, because the libero can't
// serve (FIVB rules): there the middle stays in to serve and the libero is
// the starter resting on the bench for that rotation. Confirmed with the
// volleyball SME that this rule is unaffected by which system is running:
// the back-row setter and back-row middle blocker are always different
// players in 4-2/6-2 too (both pairs sit three slots apart), so the swap
// can never collide with a setter's slot.
export function buildRotations(roster: RosterPlayer[], system: RotationSystem): RotationLineup[] {
  const starters = roster.filter((rosterPlayer) => rosterPlayer.isStarter)
  const libero = starters.find((rosterPlayer) => rosterPlayer.position === 'libero')
  const serveOrder = buildServeOrder(
    starters.filter((rosterPlayer) => rosterPlayer.position !== 'libero'),
    SERVE_ORDER_TEMPLATES[system],
  )

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
