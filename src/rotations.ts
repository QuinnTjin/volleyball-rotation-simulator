import type { PositionKey, RosterPlayer, RotationSystem } from './roster'
import type { Mode } from './formations/types'

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
const SERVING_SLOT_INDEX = 0 // P1

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
// seventh starter (the libero), she swaps in for the back-row middle
// blocker in every rotation *except* one: confirmed with the volleyball SME,
// US rules (NFHS/USAV/NCAA) let the libero serve, but only in one
// designated player's spot in the serve order for the whole set - she can't
// serve on behalf of both middle blockers. Since the two middles sit three
// slots apart, each rotates through P1 once per six-rotation cycle
// (independently of each other), so naively swapping the libero in for
// "whichever middle is back-row" would have her serve for both of them.
// The fix: designate whichever middle reaches P1 first (the lower rotation
// index) as her serve pairing. When the *other* middle rotates to P1, that
// middle serves for herself and the libero sits that single rotation out -
// P1 is the serving zone, so there's no on-court spot to swap her into
// without serving.
//
// That sit-out is a *serve-mode-only* constraint. It exists solely because
// P1 serves, so it only binds when our team is serving. In receive mode our
// P1 player isn't serving (the opponent is), so the libero can - and does -
// swap in for the back-row middle in every rotation, including the one where
// that middle would otherwise be serving. Hence `mode`: the same rotation
// yields a different on-court lineup depending on whether we're serving or
// receiving, and only for that one otherwise-benched rotation.
export function buildRotations(roster: RosterPlayer[], system: RotationSystem, mode: Mode): RotationLineup[] {
  const starters = roster.filter((rosterPlayer) => rosterPlayer.isStarter)
  const libero = starters.find((rosterPlayer) => rosterPlayer.position === 'libero')
  const serveOrder = buildServeOrder(
    starters.filter((rosterPlayer) => rosterPlayer.position !== 'libero'),
    SERVE_ORDER_TEMPLATES[system],
  )

  // The rotation offsets at which a middle blocker's turn lands her on P1 are
  // exactly the serve-order indices of the two middles (lineup[0] ===
  // serveOrder[rotationOffset % ROTATION_COUNT]) - the earlier one is the
  // libero's designated serve pairing.
  const middleBlockerServeRotationOffsets = serveOrder
    .map((player, serveOrderIndex) => ({ player, serveOrderIndex }))
    .filter(({ player }) => player.position === 'middle-blocker')
    .map(({ serveOrderIndex }) => serveOrderIndex)
  const liberoServeRotationOffset = Math.min(...middleBlockerServeRotationOffsets)

  return Array.from({ length: ROTATION_COUNT }, (_, rotationOffset) => {
    const lineup = [...serveOrder.slice(rotationOffset), ...serveOrder.slice(0, rotationOffset)]

    const backRowMiddleSlotIndex = BACK_ROW_SLOT_INDICES.find(
      (slotIndex) => lineup[slotIndex].position === 'middle-blocker',
    )

    const isUndesignatedServeTurn =
      mode === 'serve' &&
      backRowMiddleSlotIndex === SERVING_SLOT_INDEX &&
      rotationOffset !== liberoServeRotationOffset
    const liberoSwapSlotIndex = libero !== undefined && !isUndesignatedServeTurn ? backRowMiddleSlotIndex : undefined

    const onCourt = lineup.map((startingPlayer, slotIndex) => {
      const onCourtPlayer = slotIndex === liberoSwapSlotIndex && libero !== undefined ? libero : startingPlayer

      return {
        playerId: onCourtPlayer.id,
        x: COURT_SLOTS[slotIndex].x,
        y: COURT_SLOTS[slotIndex].y,
      }
    })

    // Without a libero all six starters are on court, so nobody is benched.
    // With a libero, she's benched on the one rotation the other middle
    // blocker serves for herself; every other rotation the swapped-out
    // middle blocker is benched instead.
    const benchedStarterId =
      libero === undefined ? undefined : liberoSwapSlotIndex !== undefined ? lineup[liberoSwapSlotIndex].id : libero.id

    return { onCourt, benchedStarterId }
  })
}
