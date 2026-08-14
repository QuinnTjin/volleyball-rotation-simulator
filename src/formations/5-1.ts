// GENERATED FILE - see scripts/generate-5-1-seed-formations.ts. Do not
// hand-edit. Every position here is a mechanical meter conversion of the
// pre-refactor phases.ts pixel data (ROLE_TARGETS / COURT_SLOTS /
// SERVE_SLOTS), rounded to 2 decimals - with one exception: the server's
// serve-phase P1 position was reflected across the endline into the
// service zone (see the generator script for why). No tactical value was
// otherwise adjusted.
import type { FormationTable } from './types'

export const FORMATIONS_5_1: FormationTable = {
  receive: {
    // Rotation 1: P1 setter, P2 outside, P3 middle-blocker, P4 opposite, P5 outside, P6 libero
    0: {
      'base': [
        { x: 3, y: 6.92 }, // P1 setter
        { x: 3, y: 1.5 }, // P2 outside
        { x: 0, y: 1.5 }, // P3 middle-blocker
        { x: -3, y: 1.5 }, // P4 opposite
        { x: -3, y: 6.92 }, // P5 outside
        { x: 0, y: 6.92 }, // P6 libero
      ],
      'pass': [
        { x: 3.63, y: 6.31 }, // P1 setter
        { x: 2.66, y: 5.59 }, // P2 outside
        { x: 0, y: 1.48 }, // P3 middle-blocker
        { x: -3.63, y: 2.44 }, // P4 opposite
        { x: -2.66, y: 5.59 }, // P5 outside
        { x: 0, y: 6.07 }, // P6 libero
      ],
      'set': [
        { x: 1.69, y: 0.63 }, // P1 setter
        { x: -3.39, y: 0.75 }, // P2 outside
        { x: 0, y: 0.75 }, // P3 middle-blocker
        { x: 3.39, y: 0.75 }, // P4 opposite
        { x: -1.94, y: 5.23 }, // P5 outside
        { x: 0, y: 5.23 }, // P6 libero
      ],
      'attack': [
        { x: 1.21, y: 1.96 }, // P1 setter
        { x: -3.39, y: 0.63 }, // P2 outside
        { x: 0, y: 0.63 }, // P3 middle-blocker
        { x: 3.39, y: 0.63 }, // P4 opposite
        { x: -1.94, y: 3.77 }, // P5 outside
        { x: 0, y: 4.26 }, // P6 libero
      ],
      'defensive-position': [
        { x: 0.73, y: 7.65 }, // P1 setter
        { x: -3.02, y: 0.51 }, // P2 outside
        { x: 0, y: 0.51 }, // P3 middle-blocker
        { x: 3.02, y: 0.51 }, // P4 opposite
        { x: -2.9, y: 7.4 }, // P5 outside
        { x: 0, y: 5.23 }, // P6 libero
      ],
    },
    // Rotation 2: P1 outside, P2 middle-blocker, P3 opposite, P4 outside, P5 libero, P6 setter
    1: {
      'base': [
        { x: 3, y: 6.92 }, // P1 outside
        { x: 3, y: 1.5 }, // P2 middle-blocker
        { x: 0, y: 1.5 }, // P3 opposite
        { x: -3, y: 1.5 }, // P4 outside
        { x: -3, y: 6.92 }, // P5 libero
        { x: 0, y: 6.92 }, // P6 setter
      ],
      'pass': [
        { x: -2.66, y: 5.59 }, // P1 outside
        { x: 0, y: 1.48 }, // P2 middle-blocker
        { x: -3.63, y: 2.44 }, // P3 opposite
        { x: 2.66, y: 5.59 }, // P4 outside
        { x: 0, y: 6.07 }, // P5 libero
        { x: 3.63, y: 6.31 }, // P6 setter
      ],
      'set': [
        { x: -1.94, y: 5.23 }, // P1 outside
        { x: 0, y: 0.75 }, // P2 middle-blocker
        { x: 3.39, y: 0.75 }, // P3 opposite
        { x: -3.39, y: 0.75 }, // P4 outside
        { x: 0, y: 5.23 }, // P5 libero
        { x: 1.69, y: 0.63 }, // P6 setter
      ],
      'attack': [
        { x: -1.94, y: 3.77 }, // P1 outside
        { x: 0, y: 0.63 }, // P2 middle-blocker
        { x: 3.39, y: 0.63 }, // P3 opposite
        { x: -3.39, y: 0.63 }, // P4 outside
        { x: 0, y: 4.26 }, // P5 libero
        { x: 1.21, y: 1.96 }, // P6 setter
      ],
      'defensive-position': [
        { x: -2.9, y: 7.4 }, // P1 outside
        { x: 0, y: 0.51 }, // P2 middle-blocker
        { x: 3.02, y: 0.51 }, // P3 opposite
        { x: -3.02, y: 0.51 }, // P4 outside
        { x: 0, y: 5.23 }, // P5 libero
        { x: 0.73, y: 7.65 }, // P6 setter
      ],
    },
    // Rotation 3: P1 libero, P2 opposite, P3 outside, P4 middle-blocker, P5 setter, P6 outside
    2: {
      'base': [
        { x: 3, y: 6.92 }, // P1 libero
        { x: 3, y: 1.5 }, // P2 opposite
        { x: 0, y: 1.5 }, // P3 outside
        { x: -3, y: 1.5 }, // P4 middle-blocker
        { x: -3, y: 6.92 }, // P5 setter
        { x: 0, y: 6.92 }, // P6 outside
      ],
      'pass': [
        { x: 0, y: 6.07 }, // P1 libero
        { x: -3.63, y: 2.44 }, // P2 opposite
        { x: 2.66, y: 5.59 }, // P3 outside
        { x: 0, y: 1.48 }, // P4 middle-blocker
        { x: 3.63, y: 6.31 }, // P5 setter
        { x: -2.66, y: 5.59 }, // P6 outside
      ],
      'set': [
        { x: 0, y: 5.23 }, // P1 libero
        { x: 3.39, y: 0.75 }, // P2 opposite
        { x: -3.39, y: 0.75 }, // P3 outside
        { x: 0, y: 0.75 }, // P4 middle-blocker
        { x: 1.69, y: 0.63 }, // P5 setter
        { x: -1.94, y: 5.23 }, // P6 outside
      ],
      'attack': [
        { x: 0, y: 4.26 }, // P1 libero
        { x: 3.39, y: 0.63 }, // P2 opposite
        { x: -3.39, y: 0.63 }, // P3 outside
        { x: 0, y: 0.63 }, // P4 middle-blocker
        { x: 1.21, y: 1.96 }, // P5 setter
        { x: -1.94, y: 3.77 }, // P6 outside
      ],
      'defensive-position': [
        { x: 0, y: 5.23 }, // P1 libero
        { x: 3.02, y: 0.51 }, // P2 opposite
        { x: -3.02, y: 0.51 }, // P3 outside
        { x: 0, y: 0.51 }, // P4 middle-blocker
        { x: 0.73, y: 7.65 }, // P5 setter
        { x: -2.9, y: 7.4 }, // P6 outside
      ],
    },
    // Rotation 4: P1 opposite, P2 outside, P3 middle-blocker, P4 setter, P5 outside, P6 libero
    3: {
      'base': [
        { x: 3, y: 6.92 }, // P1 opposite
        { x: 3, y: 1.5 }, // P2 outside
        { x: 0, y: 1.5 }, // P3 middle-blocker
        { x: -3, y: 1.5 }, // P4 setter
        { x: -3, y: 6.92 }, // P5 outside
        { x: 0, y: 6.92 }, // P6 libero
      ],
      'pass': [
        { x: 3.51, y: 6.92 }, // P1 opposite
        { x: 2.66, y: 5.59 }, // P2 outside
        { x: 0, y: 1.48 }, // P3 middle-blocker
        { x: 3.63, y: 6.31 }, // P4 setter
        { x: -2.66, y: 5.59 }, // P5 outside
        { x: 0, y: 6.07 }, // P6 libero
      ],
      'set': [
        { x: 2.66, y: 5.23 }, // P1 opposite
        { x: -3.39, y: 0.75 }, // P2 outside
        { x: 0, y: 0.75 }, // P3 middle-blocker
        { x: 1.69, y: 0.63 }, // P4 setter
        { x: -1.94, y: 5.23 }, // P5 outside
        { x: 0, y: 5.23 }, // P6 libero
      ],
      'attack': [
        { x: 1.94, y: 3.77 }, // P1 opposite
        { x: -3.39, y: 0.63 }, // P2 outside
        { x: 0, y: 0.63 }, // P3 middle-blocker
        { x: 1.21, y: 1.96 }, // P4 setter
        { x: -1.94, y: 3.77 }, // P5 outside
        { x: 0, y: 4.26 }, // P6 libero
      ],
      'defensive-position': [
        { x: 2.9, y: 7.4 }, // P1 opposite
        { x: -3.02, y: 0.51 }, // P2 outside
        { x: 0, y: 0.51 }, // P3 middle-blocker
        { x: 1.69, y: 0.63 }, // P4 setter
        { x: -2.9, y: 7.4 }, // P5 outside
        { x: 0, y: 5.23 }, // P6 libero
      ],
    },
    // Rotation 5: P1 outside, P2 middle-blocker, P3 setter, P4 outside, P5 libero, P6 opposite
    4: {
      'base': [
        { x: 3, y: 6.92 }, // P1 outside
        { x: 3, y: 1.5 }, // P2 middle-blocker
        { x: 0, y: 1.5 }, // P3 setter
        { x: -3, y: 1.5 }, // P4 outside
        { x: -3, y: 6.92 }, // P5 libero
        { x: 0, y: 6.92 }, // P6 opposite
      ],
      'pass': [
        { x: -2.66, y: 5.59 }, // P1 outside
        { x: 0, y: 1.48 }, // P2 middle-blocker
        { x: 3.63, y: 6.31 }, // P3 setter
        { x: 2.66, y: 5.59 }, // P4 outside
        { x: 0, y: 6.07 }, // P5 libero
        { x: 3.51, y: 6.92 }, // P6 opposite
      ],
      'set': [
        { x: -1.94, y: 5.23 }, // P1 outside
        { x: 0, y: 0.75 }, // P2 middle-blocker
        { x: 1.69, y: 0.63 }, // P3 setter
        { x: -3.39, y: 0.75 }, // P4 outside
        { x: 0, y: 5.23 }, // P5 libero
        { x: 2.66, y: 5.23 }, // P6 opposite
      ],
      'attack': [
        { x: -1.94, y: 3.77 }, // P1 outside
        { x: 0, y: 0.63 }, // P2 middle-blocker
        { x: 1.21, y: 1.96 }, // P3 setter
        { x: -3.39, y: 0.63 }, // P4 outside
        { x: 0, y: 4.26 }, // P5 libero
        { x: 1.94, y: 3.77 }, // P6 opposite
      ],
      'defensive-position': [
        { x: -2.9, y: 7.4 }, // P1 outside
        { x: 0, y: 0.51 }, // P2 middle-blocker
        { x: 1.69, y: 0.63 }, // P3 setter
        { x: -3.02, y: 0.51 }, // P4 outside
        { x: 0, y: 5.23 }, // P5 libero
        { x: 2.9, y: 7.4 }, // P6 opposite
      ],
    },
    // Rotation 6: P1 middle-blocker, P2 setter, P3 outside, P4 middle-blocker, P5 opposite, P6 outside
    5: {
      'base': [
        { x: 3, y: 6.92 }, // P1 middle-blocker
        { x: 3, y: 1.5 }, // P2 setter
        { x: 0, y: 1.5 }, // P3 outside
        { x: -3, y: 1.5 }, // P4 middle-blocker
        { x: -3, y: 6.92 }, // P5 opposite
        { x: 0, y: 6.92 }, // P6 outside
      ],
      'pass': [
        { x: 0, y: 8.01 }, // P1 middle-blocker
        { x: 3.63, y: 6.31 }, // P2 setter
        { x: 2.66, y: 5.59 }, // P3 outside
        { x: 0, y: 1.48 }, // P4 middle-blocker
        { x: 3.51, y: 6.92 }, // P5 opposite
        { x: -2.66, y: 5.59 }, // P6 outside
      ],
      'set': [
        { x: 0, y: 5.23 }, // P1 middle-blocker
        { x: 1.69, y: 0.63 }, // P2 setter
        { x: -3.39, y: 0.75 }, // P3 outside
        { x: 0, y: 0.75 }, // P4 middle-blocker
        { x: 2.66, y: 5.23 }, // P5 opposite
        { x: -1.94, y: 5.23 }, // P6 outside
      ],
      'attack': [
        { x: 0, y: 4.26 }, // P1 middle-blocker
        { x: 1.21, y: 1.96 }, // P2 setter
        { x: -3.39, y: 0.63 }, // P3 outside
        { x: 0, y: 0.63 }, // P4 middle-blocker
        { x: 1.94, y: 3.77 }, // P5 opposite
        { x: -1.94, y: 3.77 }, // P6 outside
      ],
      'defensive-position': [
        { x: 0, y: 5.23 }, // P1 middle-blocker
        { x: 1.69, y: 0.63 }, // P2 setter
        { x: -3.02, y: 0.51 }, // P3 outside
        { x: 0, y: 0.51 }, // P4 middle-blocker
        { x: 2.9, y: 7.4 }, // P5 opposite
        { x: -2.9, y: 7.4 }, // P6 outside
      ],
    },
  },
  serve: {
    // Rotation 1: P1 setter, P2 outside, P3 middle-blocker, P4 opposite, P5 outside, P6 libero
    0: {
      'base': [
        { x: 3, y: 6.92 }, // P1 setter
        { x: 3, y: 1.5 }, // P2 outside
        { x: 0, y: 1.5 }, // P3 middle-blocker
        { x: -3, y: 1.5 }, // P4 opposite
        { x: -3, y: 6.92 }, // P5 outside
        { x: 0, y: 6.92 }, // P6 libero
      ],
      'serve': [
        { x: 3.34, y: 9.58 }, // P1 setter
        { x: 3, y: 1.89 }, // P2 outside
        { x: 0, y: 1.89 }, // P3 middle-blocker
        { x: -3, y: 1.89 }, // P4 opposite
        { x: -2.76, y: 6.15 }, // P5 outside
        { x: 0, y: 6.44 }, // P6 libero
      ],
      'defensive-position': [
        { x: 0.73, y: 7.65 }, // P1 setter
        { x: -3.02, y: 0.51 }, // P2 outside
        { x: 0, y: 0.51 }, // P3 middle-blocker
        { x: 3.02, y: 0.51 }, // P4 opposite
        { x: -2.9, y: 7.4 }, // P5 outside
        { x: 0, y: 5.23 }, // P6 libero
      ],
    },
    // Rotation 2: P1 outside, P2 middle-blocker, P3 opposite, P4 outside, P5 libero, P6 setter
    1: {
      'base': [
        { x: 3, y: 6.92 }, // P1 outside
        { x: 3, y: 1.5 }, // P2 middle-blocker
        { x: 0, y: 1.5 }, // P3 opposite
        { x: -3, y: 1.5 }, // P4 outside
        { x: -3, y: 6.92 }, // P5 libero
        { x: 0, y: 6.92 }, // P6 setter
      ],
      'serve': [
        { x: 3.34, y: 9.58 }, // P1 outside
        { x: 3, y: 1.89 }, // P2 middle-blocker
        { x: 0, y: 1.89 }, // P3 opposite
        { x: -3, y: 1.89 }, // P4 outside
        { x: -2.76, y: 6.15 }, // P5 libero
        { x: 0, y: 6.44 }, // P6 setter
      ],
      'defensive-position': [
        { x: -2.9, y: 7.4 }, // P1 outside
        { x: 0, y: 0.51 }, // P2 middle-blocker
        { x: 3.02, y: 0.51 }, // P3 opposite
        { x: -3.02, y: 0.51 }, // P4 outside
        { x: 0, y: 5.23 }, // P5 libero
        { x: 0.73, y: 7.65 }, // P6 setter
      ],
    },
    // Rotation 3: P1 libero, P2 opposite, P3 outside, P4 middle-blocker, P5 setter, P6 outside
    2: {
      'base': [
        { x: 3, y: 6.92 }, // P1 libero
        { x: 3, y: 1.5 }, // P2 opposite
        { x: 0, y: 1.5 }, // P3 outside
        { x: -3, y: 1.5 }, // P4 middle-blocker
        { x: -3, y: 6.92 }, // P5 setter
        { x: 0, y: 6.92 }, // P6 outside
      ],
      'serve': [
        { x: 3.34, y: 9.58 }, // P1 libero
        { x: 3, y: 1.89 }, // P2 opposite
        { x: 0, y: 1.89 }, // P3 outside
        { x: -3, y: 1.89 }, // P4 middle-blocker
        { x: -2.76, y: 6.15 }, // P5 setter
        { x: 0, y: 6.44 }, // P6 outside
      ],
      'defensive-position': [
        { x: 0, y: 5.23 }, // P1 libero
        { x: 3.02, y: 0.51 }, // P2 opposite
        { x: -3.02, y: 0.51 }, // P3 outside
        { x: 0, y: 0.51 }, // P4 middle-blocker
        { x: 0.73, y: 7.65 }, // P5 setter
        { x: -2.9, y: 7.4 }, // P6 outside
      ],
    },
    // Rotation 4: P1 opposite, P2 outside, P3 middle-blocker, P4 setter, P5 outside, P6 libero
    3: {
      'base': [
        { x: 3, y: 6.92 }, // P1 opposite
        { x: 3, y: 1.5 }, // P2 outside
        { x: 0, y: 1.5 }, // P3 middle-blocker
        { x: -3, y: 1.5 }, // P4 setter
        { x: -3, y: 6.92 }, // P5 outside
        { x: 0, y: 6.92 }, // P6 libero
      ],
      'serve': [
        { x: 3.34, y: 9.58 }, // P1 opposite
        { x: 3, y: 1.89 }, // P2 outside
        { x: 0, y: 1.89 }, // P3 middle-blocker
        { x: -3, y: 1.89 }, // P4 setter
        { x: -2.76, y: 6.15 }, // P5 outside
        { x: 0, y: 6.44 }, // P6 libero
      ],
      'defensive-position': [
        { x: 2.9, y: 7.4 }, // P1 opposite
        { x: -3.02, y: 0.51 }, // P2 outside
        { x: 0, y: 0.51 }, // P3 middle-blocker
        { x: 1.69, y: 0.63 }, // P4 setter
        { x: -2.9, y: 7.4 }, // P5 outside
        { x: 0, y: 5.23 }, // P6 libero
      ],
    },
    // Rotation 5: P1 outside, P2 middle-blocker, P3 setter, P4 outside, P5 libero, P6 opposite
    4: {
      'base': [
        { x: 3, y: 6.92 }, // P1 outside
        { x: 3, y: 1.5 }, // P2 middle-blocker
        { x: 0, y: 1.5 }, // P3 setter
        { x: -3, y: 1.5 }, // P4 outside
        { x: -3, y: 6.92 }, // P5 libero
        { x: 0, y: 6.92 }, // P6 opposite
      ],
      'serve': [
        { x: 3.34, y: 9.58 }, // P1 outside
        { x: 3, y: 1.89 }, // P2 middle-blocker
        { x: 0, y: 1.89 }, // P3 setter
        { x: -3, y: 1.89 }, // P4 outside
        { x: -2.76, y: 6.15 }, // P5 libero
        { x: 0, y: 6.44 }, // P6 opposite
      ],
      'defensive-position': [
        { x: -2.9, y: 7.4 }, // P1 outside
        { x: 0, y: 0.51 }, // P2 middle-blocker
        { x: 1.69, y: 0.63 }, // P3 setter
        { x: -3.02, y: 0.51 }, // P4 outside
        { x: 0, y: 5.23 }, // P5 libero
        { x: 2.9, y: 7.4 }, // P6 opposite
      ],
    },
    // Rotation 6: P1 middle-blocker, P2 setter, P3 outside, P4 middle-blocker, P5 opposite, P6 outside
    5: {
      'base': [
        { x: 3, y: 6.92 }, // P1 middle-blocker
        { x: 3, y: 1.5 }, // P2 setter
        { x: 0, y: 1.5 }, // P3 outside
        { x: -3, y: 1.5 }, // P4 middle-blocker
        { x: -3, y: 6.92 }, // P5 opposite
        { x: 0, y: 6.92 }, // P6 outside
      ],
      'serve': [
        { x: 3.34, y: 9.58 }, // P1 middle-blocker
        { x: 3, y: 1.89 }, // P2 setter
        { x: 0, y: 1.89 }, // P3 outside
        { x: -3, y: 1.89 }, // P4 middle-blocker
        { x: -2.76, y: 6.15 }, // P5 opposite
        { x: 0, y: 6.44 }, // P6 outside
      ],
      'defensive-position': [
        { x: 0, y: 5.23 }, // P1 middle-blocker
        { x: 1.69, y: 0.63 }, // P2 setter
        { x: -3.02, y: 0.51 }, // P3 outside
        { x: 0, y: 0.51 }, // P4 middle-blocker
        { x: 2.9, y: 7.4 }, // P5 opposite
        { x: -2.9, y: 7.4 }, // P6 outside
      ],
    },
  },
}
