import type { RotationSystem } from './roster'
import { COURT_SLOTS } from './rotations'
import { legacyMockupPixelsToMeters, metersToPixels } from './court-geometry'
import type { PixelPoint } from './court-geometry'
import { FORMATIONS_5_1 } from './formations/5-1'
import type { FormationTable, PositionContext, ReceivePhaseKey, ServePhaseKey } from './formations/types'

// Display-only shape for the phase sidebar (ControlsPanel) - it only ever
// reads `key` (as a React key + to report an index back) and `label`, so it
// doesn't need to know which mode's phase-key type it's holding.
export type Phase = { key: string; label: string }

// Receive-mode phase list, collapsed from the mockup's original 9-entry
// sidebar down to 5 for the MVP. Base depicts the legal pre-serve alignment
// (an overlap/P-slot constraint); every phase after that depicts
// role-driven movement once the ball is live and overlap no longer applies.
export const PHASES: { key: ReceivePhaseKey; label: string }[] = [
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
export const SERVE_PHASES: { key: ServePhaseKey; label: string }[] = [
  { key: 'base', label: 'Base' },
  { key: 'serve', label: 'Serve' },
  { key: 'defensive-position', label: 'Defensive Position' },
]

// Only 5-1 has real formation data (see src/formations/) - 4-2 and 6-2
// reuse it for now. This isn't a placeholder: the position logic this table
// was generated from never varied by system either, so reusing 5-1's table
// reproduces exactly what those systems already rendered before this
// refactor. Dropping in a real src/formations/4-2.ts later is just adding a
// case here, no restructuring - see the Deliverable 7 discussion.
const FORMATION_TABLES: Record<RotationSystem, FormationTable> = {
  '5-1': FORMATIONS_5_1,
  '4-2': FORMATIONS_5_1,
  '6-2': FORMATIONS_5_1,
}

// Looks up where a given on-court slot should render for the selected
// phase and converts it to pixels - the only place in this module (or any
// caller) that needs to know a pixel exists. Base Zone is computed
// (COURT_SLOTS[slotIndex], correct by construction) rather than looked up
// in the table for every rotation/mode, since it's identical everywhere;
// COURT_SLOTS predates the meter coordinate space, so it's converted
// through the same legacy-origin conversion the seed data was generated
// with (see court-geometry.ts). Every other phase is a straight table
// lookup - no coordinate literal lives in this file.
export function getPhasePosition(context: PositionContext): PixelPoint {
  if (context.phaseKey === 'base') {
    return metersToPixels(legacyMockupPixelsToMeters(COURT_SLOTS[context.slotIndex]))
  }

  const table = FORMATION_TABLES[context.system]
  const meters =
    context.mode === 'receive'
      ? table.receive[context.rotationIndex][context.phaseKey][context.slotIndex]
      : table.serve[context.rotationIndex][context.phaseKey][context.slotIndex]

  return metersToPixels(meters)
}
