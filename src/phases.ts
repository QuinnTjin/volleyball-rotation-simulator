import type { PositionKey } from './roster'
import { BACK_ROW_SLOT_INDICES, COURT_SLOTS } from './rotations'

export type PhaseKey =
  | 'base-zone'
  | 'start-position'
  | 'receive'
  | 'pass'
  | 'attack-transition'
  | 'set'
  | 'attack-coverage'
  | 'defense-transition'
  | 'defense'

export type Phase = { key: PhaseKey; label: string }

// Order matches the mockup's sidebar list. Base Zone and Start Position
// depict the legal pre-serve alignment (an overlap/P-slot constraint);
// every phase after that depicts role-driven movement once the ball is
// live and overlap no longer applies - see ROLE_TARGETS below.
export const PHASES: Phase[] = [
  { key: 'base-zone', label: 'Base Zone' },
  { key: 'start-position', label: 'Start Position' },
  { key: 'receive', label: 'Receive' },
  { key: 'pass', label: 'Pass' },
  { key: 'attack-transition', label: 'Attack Transition' },
  { key: 'set', label: 'Set' },
  { key: 'attack-coverage', label: 'Attack / Coverage' },
  { key: 'defense-transition', label: 'Defense Transition' },
  { key: 'defense', label: 'Defense' },
]

type Point = { x: number; y: number }
type Row = 'front' | 'back'

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
const ROLE_TARGETS: Record<Exclude<PhaseKey, 'base-zone' | 'start-position'>, RoleTargets> = {
  receive: {
    setter: rowInvariant({ x: 350, y: 275 }),
    outside: { front: { x: 310, y: 245 }, back: { x: 90, y: 245 } },
    'middle-blocker': { front: { x: 200, y: 75 }, back: { x: 200, y: 345 } },
    opposite: { front: { x: 50, y: 115 }, back: { x: 345, y: 300 } },
    libero: { x: 200, y: 265 },
  },
  pass: {
    setter: rowInvariant({ x: 272, y: 50 }),
    outside: { front: { x: 90, y: 245 }, back: { x: 310, y: 245 } },
    'middle-blocker': { front: { x: 200, y: 105 }, back: { x: 200, y: 345 } },
    opposite: { front: { x: 350, y: 105 }, back: { x: 350, y: 280 } },
    libero: { x: 200, y: 265 },
  },
  'attack-transition': {
    setter: rowInvariant({ x: 270, y: 45 }),
    outside: { front: { x: 15, y: 160 }, back: { x: 310, y: 250 } },
    'middle-blocker': { front: { x: 215, y: 90 }, back: { x: 200, y: 260 } },
    opposite: { front: { x: 350, y: 90 }, back: { x: 300, y: 260 } },
    libero: { x: 130, y: 220 },
  },
  set: {
    setter: rowInvariant({ x: 270, y: 40 }),
    outside: { front: { x: 60, y: 45 }, back: { x: 120, y: 230 } },
    'middle-blocker': { front: { x: 200, y: 45 }, back: { x: 200, y: 230 } },
    opposite: { front: { x: 340, y: 45 }, back: { x: 310, y: 230 } },
    libero: { x: 200, y: 230 },
  },
  'attack-coverage': {
    setter: rowInvariant({ x: 250, y: 95 }),
    outside: { front: { x: 60, y: 40 }, back: { x: 120, y: 170 } },
    'middle-blocker': { front: { x: 200, y: 40 }, back: { x: 200, y: 190 } },
    opposite: { front: { x: 340, y: 40 }, back: { x: 280, y: 170 } },
    libero: { x: 200, y: 190 },
  },
  'defense-transition': {
    setter: rowInvariant({ x: 260, y: 60 }),
    outside: { front: { x: 70, y: 60 }, back: { x: 90, y: 300 } },
    'middle-blocker': { front: { x: 200, y: 60 }, back: { x: 200, y: 320 } },
    opposite: { front: { x: 330, y: 60 }, back: { x: 310, y: 300 } },
    libero: { x: 200, y: 320 },
  },
  defense: {
    setter: { front: { x: 270, y: 40 }, back: { x: 230, y: 330 } },
    outside: { front: { x: 75, y: 35 }, back: { x: 80, y: 320 } },
    'middle-blocker': { front: { x: 200, y: 35 }, back: { x: 200, y: 230 } },
    opposite: { front: { x: 325, y: 35 }, back: { x: 320, y: 320 } },
    libero: { x: 200, y: 230 },
  },
}

// Looks up where a given on-court player should render for the selected
// phase. Base Zone/Start Position are zone-slot keyed (COURT_SLOTS, same
// as rotations.ts); every later phase is role+row keyed (ROLE_TARGETS)
// since overlap no longer constrains position once the ball is live.
export function getPhasePosition(phaseKey: PhaseKey, slotIndex: number, role: PositionKey): Point {
  if (phaseKey === 'base-zone' || phaseKey === 'start-position') {
    return COURT_SLOTS[slotIndex]
  }

  const row: Row = BACK_ROW_SLOT_INDICES.includes(slotIndex) ? 'back' : 'front'
  const targets = ROLE_TARGETS[phaseKey]

  return role === 'libero' ? targets.libero : targets[role][row]
}
