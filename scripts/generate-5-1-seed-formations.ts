// THROWAWAY SCRIPT - one-off conversion of the pre-refactor phases.ts pixel
// data (ROLE_TARGETS / COURT_SLOTS / SERVE_SLOTS) into the meter-based
// formation table at src/formations/5-1.ts. Not part of the app and not
// meant to be run again: phases.ts's coordinate literals are deleted in the
// same change that adds the generated seed file, so this script's imports
// go stale immediately after. Kept for provenance, not reuse.
//
// Run with: npx tsx scripts/generate-5-1-seed-formations.ts
import { writeFileSync } from 'node:fs'
import { PHASES, SERVE_PHASES, getPhasePosition } from '../src/phases'
import type { PhaseKey } from '../src/phases'
import { buildRotations, ROTATION_COUNT } from '../src/rotations'
import { defaultRoster } from '../src/roster'
import type { PositionKey } from '../src/roster'
import { legacyMockupPixelsToMeters } from '../src/court-geometry'

const SERVER_SLOT_INDEX = 0
const COURT_LENGTH_M = 9

const rotations = buildRotations(defaultRoster, '5-1')

function roleAt(rotationIndex: number, slotIndex: number): PositionKey {
  const playerId = rotations[rotationIndex].onCourt[slotIndex].playerId
  const player = defaultRoster.find((rosterPlayer) => rosterPlayer.id === playerId)!
  return player.position
}

function roundTo2(value: number): number {
  return Math.round(value * 100) / 100
}

function pointFor(phaseKey: PhaseKey, rotationIndex: number, slotIndex: number) {
  const role = roleAt(rotationIndex, slotIndex)
  const pixelPoint = getPhasePosition(phaseKey, slotIndex, role)
  let meterPoint = legacyMockupPixelsToMeters(pixelPoint)

  // The server's serve-phase position was placed on-court by the original
  // logic (~8.42m, inside the 0-9m court range) rather than in the service
  // zone. Reflecting it across the endline (y=9) preserves the designer's
  // apparent "close to the line" distance while moving it to the legally
  // correct side of it. This is the one point this script adjusts - every
  // other position is an unmodified mechanical conversion.
  if (phaseKey === 'serve' && slotIndex === SERVER_SLOT_INDEX) {
    meterPoint = { x: meterPoint.x, y: 2 * COURT_LENGTH_M - meterPoint.y }
  }

  return { x: roundTo2(meterPoint.x), y: roundTo2(meterPoint.y), role }
}

function formatFormation(phaseKey: PhaseKey, rotationIndex: number): string {
  const lines = Array.from({ length: ROTATION_COUNT }, (_, slotIndex) => {
    const { x, y, role } = pointFor(phaseKey, rotationIndex, slotIndex)
    return `        { x: ${x}, y: ${y} }, // P${slotIndex + 1} ${role}`
  })
  return `[\n${lines.join('\n')}\n      ]`
}

function formatRotationBlock(phaseKeys: readonly PhaseKey[], rotationIndex: number): string {
  const roleSummary = Array.from(
    { length: ROTATION_COUNT },
    (_, slotIndex) => `P${slotIndex + 1} ${roleAt(rotationIndex, slotIndex)}`,
  ).join(', ')
  const phaseLines = phaseKeys
    .map((phaseKey) => `      '${phaseKey}': ${formatFormation(phaseKey, rotationIndex)},`)
    .join('\n')
  return `    // Rotation ${rotationIndex + 1}: ${roleSummary}\n    ${rotationIndex}: {\n${phaseLines}\n    },`
}

function formatMode(phaseKeys: readonly PhaseKey[]): string {
  const blocks = Array.from({ length: ROTATION_COUNT }, (_, rotationIndex) =>
    formatRotationBlock(phaseKeys, rotationIndex),
  ).join('\n')
  return `{\n${blocks}\n  }`
}

const receivePhaseKeys = PHASES.map((phase) => phase.key)
const servePhaseKeys = SERVE_PHASES.map((phase) => phase.key)

const output = `// GENERATED FILE - see scripts/generate-5-1-seed-formations.ts. Do not
// hand-edit. Every position here is a mechanical meter conversion of the
// pre-refactor phases.ts pixel data (ROLE_TARGETS / COURT_SLOTS /
// SERVE_SLOTS), rounded to 2 decimals - with one exception: the server's
// serve-phase P1 position was reflected across the endline into the
// service zone (see the generator script for why). No tactical value was
// otherwise adjusted.
import type { FormationTable } from './types'

export const FORMATIONS_5_1: FormationTable = {
  receive: ${formatMode(receivePhaseKeys)},
  serve: ${formatMode(servePhaseKeys)},
}
`

writeFileSync(new URL('../src/formations/5-1.ts', import.meta.url), output)
console.log('Wrote src/formations/5-1.ts')
