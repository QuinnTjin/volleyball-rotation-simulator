import type { PositionKey } from './roster'
import { BACK_ROW_SLOT_INDICES, COURT_SLOTS } from './rotations'

export type PhaseKey = 'base' | 'serve' | 'pass' | 'set' | 'attack' | 'defensive-position'

export type Phase = { key: PhaseKey; label: string }

// Receive-mode phase list, collapsed from the mockup's original 9-entry
// sidebar down to 5 for the MVP. Base depicts the legal pre-serve alignment
// (an overlap/P-slot constraint); every phase after that depicts
// role-driven movement once the ball is live and overlap no longer applies
// - see ROLE_TARGETS below.
export const PHASES: Phase[] = [
  { key: 'base', label: 'Base' },
  { key: 'pass', label: 'Pass' },
  { key: 'set', label: 'Set' },
  { key: 'attack', label: 'Attack' },
  { key: 'defensive-position', label: 'Defensive Position' },
]

// Serve-mode phase list: the serving team's Base alignment, the moment of
// serve contact, then their transition into defensive readiness. Reuses
// Base and Defensive Position from the receive-mode list above - both are
// legitimately mode-agnostic (Base is the same pre-serve legal alignment
// for either team; Defensive Position is a role+row dig-ready stance that
// doesn't depend on how the team ended up needing to defend).
export const SERVE_PHASES: Phase[] = [
  { key: 'base', label: 'Base' },
  { key: 'serve', label: 'Serve' },
  { key: 'defensive-position', label: 'Defensive Position' },
]

type Point = { x: number; y: number }
type Row = 'front' | 'back'

// Serve-readiness points, P1-P6 (standard numbering), same 400x400 court
// space as COURT_SLOTS. Zone-slot keyed rather than role+row keyed, unlike
// every phase in ROLE_TARGETS below: per the volleyball SME, overlap is
// still a live legal constraint at the exact moment of serve contact (the
// freeze-frame this phase depicts), so - same as Base - a player's legal
// spot depends on their zone relative to their neighbors' zones, not on
// their role. P1 sits behind/outside the endline since the server is off
// the court proper at contact; index 0 is always whoever is legally
// serving that rotation (rotations.ts already guarantees this - see
// P1_SLOT_INDEX).
const SERVE_SLOTS: Point[] = [
  { x: 338, y: 362 }, // P1 (server)
  { x: 324, y: 92 }, // P2
  { x: 200, y: 92 }, // P3
  { x: 76, y: 92 }, // P4
  { x: 86, y: 268 }, // P5
  { x: 200, y: 280 }, // P6
]

// A role's target position, split by which row that role is playing this
// rotation. Setter is included even though her release point barely moves
// between rows (both values are equal in every phase but Defense, where a
// front-row setter blocks and a back-row setter digs) - splitting it keeps
// the lookup uniform instead of special-casing one role.
type RoleTargets = {
  setter: Record<Row, Point>
  outside: Record<Row, Point>
  'middle-blocker': Record<Row, Point>
  opposite: Record<Row, Point>
  libero: Point
}

const rowInvariant = (point: Point): Record<Row, Point> => ({ front: point, back: point })

// Role + row target positions for every phase after the serve is
// contacted, per the volleyball SME: overlap no longer applies mid-rally,
// so these key off what a role actually does (pass/attack/block/dig), not
// off which of the 6 zone slots that player happened to rotate into.
//
// Pass, Attack, and Defensive Position each collapse two of the mockup's
// original phases into one; where the two sources disagreed on where a role
// should stand, the values below keep whichever source was picked as
// canonical rather than averaging the two (see phases.ts history/PR notes
// for the per-merge rationale).
const ROLE_TARGETS: Record<Exclude<PhaseKey, 'base' | 'serve'>, RoleTargets> = {
  // Kept the old "receive" coordinates - the old "pass" coordinates mirrored
  // outside/opposite left-right rather than just offsetting them, and
  // receive/pass are the same physical moment in a real serve-receive.
  pass: {
    setter: rowInvariant({ x: 350, y: 275 }),
    outside: { front: { x: 310, y: 245 }, back: { x: 90, y: 245 } },
    'middle-blocker': { front: { x: 200, y: 75 }, back: { x: 200, y: 345 } },
    opposite: { front: { x: 50, y: 115 }, back: { x: 345, y: 300 } },
    libero: { x: 200, y: 265 },
  },
  set: {
    setter: rowInvariant({ x: 270, y: 40 }),
    outside: { front: { x: 60, y: 45 }, back: { x: 120, y: 230 } },
    'middle-blocker': { front: { x: 200, y: 45 }, back: { x: 200, y: 230 } },
    opposite: { front: { x: 340, y: 45 }, back: { x: 310, y: 230 } },
    libero: { x: 200, y: 230 },
  },
  // Kept the old "attack-coverage" coordinates - the tighter, net-adjacent
  // stance reads sensibly for hitters and non-hitters alike as a single
  // freeze-frame, unlike "attack-transition"'s wide approach positions.
  attack: {
    setter: rowInvariant({ x: 250, y: 95 }),
    outside: { front: { x: 60, y: 40 }, back: { x: 120, y: 170 } },
    'middle-blocker': { front: { x: 200, y: 40 }, back: { x: 200, y: 190 } },
    opposite: { front: { x: 340, y: 40 }, back: { x: 280, y: 170 } },
    libero: { x: 200, y: 190 },
  },
  // Kept the old "defense" coordinates - the settled dig/ready stance is a
  // more useful steady-state reference than "defense-transition"'s
  // in-between positions.
  'defensive-position': {
    setter: { front: { x: 270, y: 40 }, back: { x: 230, y: 330 } },
    outside: { front: { x: 75, y: 35 }, back: { x: 80, y: 320 } },
    'middle-blocker': { front: { x: 200, y: 35 }, back: { x: 200, y: 230 } },
    opposite: { front: { x: 325, y: 35 }, back: { x: 320, y: 320 } },
    libero: { x: 200, y: 230 },
  },
}

// Looks up where a given on-court player should render for the selected
// phase. Base and Serve are zone-slot keyed (COURT_SLOTS/SERVE_SLOTS, same
// P-slot shape as rotations.ts) since overlap is still a live legal
// constraint before/at the moment of serve; every later phase is role+row
// keyed (ROLE_TARGETS) since overlap no longer constrains position once
// the ball is live.
export function getPhasePosition(phaseKey: PhaseKey, slotIndex: number, role: PositionKey): Point {
  if (phaseKey === 'base') {
    return COURT_SLOTS[slotIndex]
  }
  if (phaseKey === 'serve') {
    return SERVE_SLOTS[slotIndex]
  }

  const row: Row = BACK_ROW_SLOT_INDICES.includes(slotIndex) ? 'back' : 'front'
  const targets = ROLE_TARGETS[phaseKey]

  return role === 'libero' ? targets.libero : targets[role][row]
}
