import type { RotationSystem } from '../roster'
import type { CourtPoint } from '../court-geometry'

// Serve and receive have overlapping phase labels ("Defense", "Set", ...)
// that are physically different formations, so each mode gets its own
// phase-key type instead of one shared union. A single flat union would
// force every mode's formation table to define entries for the *other*
// mode's phases too (Record<PhaseKey, ...> demands every member of
// PhaseKey, regardless of which mode's table it's nested under) - keeping
// them separate is what makes "a serve-mode phase can never resolve to a
// receive-mode entry" a compile-time fact rather than a runtime hope.
export type ReceivePhaseKey = 'base' | 'pass' | 'set' | 'attack' | 'defensive-position'
export type ServePhaseKey = 'base' | 'serve' | 'defensive-position'

export type Mode = 'receive' | 'serve'

export type RotationIndex = 0 | 1 | 2 | 3 | 4 | 5
export type SlotIndex = 0 | 1 | 2 | 3 | 4 | 5

// Exactly six points - a missing or extra slot is a compile error, not a
// runtime undefined.
export type Formation = readonly [CourtPoint, CourtPoint, CourtPoint, CourtPoint, CourtPoint, CourtPoint]

// Record (not an index signature, no optional keys) over every phase key for
// one mode, in one rotation - tsc rejects the table if any phase is missing.
type PhaseFormations<PhaseKeyType extends string> = Record<PhaseKeyType, Formation>

// Record over all six rotations - tsc rejects the table if any rotation is
// missing.
type RotationFormations<PhaseKeyType extends string> = Record<RotationIndex, PhaseFormations<PhaseKeyType>>

// One system's complete formation data: every rotation, both modes, every
// phase that mode has, all six slots. This is the exhaustive shape the seed
// generator (scripts/) must produce and phases.ts looks up into - nothing
// about it is system-specific, which is what lets src/formations/5-1.ts and
// future sibling files (4-2.ts, 6-2.ts, ...) share it without a rewrite.
export type FormationTable = {
  receive: RotationFormations<ReceivePhaseKey>
  serve: RotationFormations<ServePhaseKey>
}

// The public lookup key. A discriminated union on `mode` so a caller can
// only ever pair 'receive' with a ReceivePhaseKey and 'serve' with a
// ServePhaseKey - the same guarantee the table type gives, enforced at call
// sites too. `system` is carried through even though only '5-1' has data
// today: it's part of the public API shape now so that adding real 4-2/6-2
// data later, or a future `variant` field (see phases.ts), never has to
// change this type's callers.
export type PositionContext =
  | { system: RotationSystem; mode: 'receive'; rotationIndex: RotationIndex; phaseKey: ReceivePhaseKey; slotIndex: SlotIndex }
  | { system: RotationSystem; mode: 'serve'; rotationIndex: RotationIndex; phaseKey: ServePhaseKey; slotIndex: SlotIndex }
