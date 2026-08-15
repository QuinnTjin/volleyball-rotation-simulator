// GENERATED FILE - see scripts/generate-5-1-seed-formations.ts. Do not
// hand-edit. Every position here is a mechanical meter conversion of the
// pre-refactor phases.ts pixel data (ROLE_TARGETS / COURT_SLOTS /
// SERVE_SLOTS), rounded to 2 decimals - with one exception: the server's
// serve-phase P1 position was reflected across the endline into the
// service zone (see the generator script for why). No tactical value was
// otherwise adjusted.
import type { FormationTable } from './types'

// Receive 'set' phase target positions, shared by role across every rotation that carries a libero (rotations 1-5).
const CONVENTIONAL_SETTING_POSITION = { x: 1.69, y: 0.63 } // setter's net target to run the offense
const LEFT_PIN_ATTACK_APPROACH = { x: -5.2, y: 3 } // outside hitter's wide-left approach for a pin attack
const MIDDLE_QUICK_APPROACH = { x: 0, y: 3 } // middle blocker's approach for a quick-tempo attack
const RIGHT_PIN_ATTACK_APPROACH = { x: 4.4, y: 3 } // opposite's wide-right approach for a pin attack
const PIPE_ATTACK_APPROACH = { x: 0, y: 6 } // back-row outside hitter's approach for a pipe attack
const LIBERO_TRANSITION_BASE = { x: -2.5, y: 5.23 } // libero's defensive/ready base behind the attack
const OPPOSITE_BACKROW_TRANSITION = { x: 4.4, y: 5.23 } // back-row opposite's ready base (no back-row attack lane modeled)

const ZONE_5_SERVE_RECEIVE = { x: -3, y: 5.6 } // zone 5's receive-phase target for the serve-receive rotation
const ZONE_6_SERVE_RECEIVE = { x: 0, y: 6.1 } // zone 6's receive-phase target for the serve-receive rotation
const ZONE_1_SERVE_RECEIVE = { x: 3, y: 5.6 } // zone 1's receive-phase target for the serve-receive rotation

export const FORMATIONS_5_1: FormationTable = {
  receive: {
    // Rotation 1: P1 setter, P2 outside 1, P3 middle-blocker 1, P4 opposite, P5 outside 2, P6 libero
    0: {
      'base': [
        { x: 3, y: 6.92 }, // P1 setter
        { x: 3, y: 1.5 }, // P2 outside 1
        { x: 0, y: 1.5 }, // P3 middle-blocker 1
        { x: -3, y: 1.5 }, // P4 opposite
        { x: -3, y: 6.92 }, // P5 outside 2
        { x: 0, y: 6.92 }, // P6 libero
      ],
      'pass': [
        { x: 3.63, y: 6.31 }, // P1 setter
        ZONE_1_SERVE_RECEIVE, // P2 outside 1
        { x: -3, y: 1.48 }, // P3 middle-blocker 1
        { x: -3.63, y: 2.44 }, // P4 opposite
        ZONE_5_SERVE_RECEIVE, // P5 outside 2
        ZONE_6_SERVE_RECEIVE, // P6 libero
      ],
      'set': [
        CONVENTIONAL_SETTING_POSITION, // P1 setter
        LEFT_PIN_ATTACK_APPROACH, // P2 outside 1
        MIDDLE_QUICK_APPROACH, // P3 middle-blocker 1
        RIGHT_PIN_ATTACK_APPROACH, // P4 opposite
        PIPE_ATTACK_APPROACH, // P5 outside 2
        LIBERO_TRANSITION_BASE, // P6 libero
      ],
      'attack': [
        { x: 1.69, y: 0.63 }, // P1 setter
        { x: -3.39, y: 0.63 }, // P2 outside 1
        { x: 0, y: 0.63 }, // P3 middle-blocker 1
        { x: 3.39, y: 0.63 }, // P4 opposite
        { x: 0, y: 3.3 }, // P5 outside 2
        { x: -2.5, y: 4.26 }, // P6 libero
      ],
      'defensive-position': [
        { x: 2.5, y: 5.23 }, // P1 setter
        { x: -1.5, y: 0.51 }, // P2 outside 1
        { x: 0, y: 0.51 }, // P3 middle-blocker 1
        { x: 1.5, y: 0.51 }, // P4 opposite
        { x: 0, y: 7.4 }, // P5 outside 2
        { x: -2.5, y: 5.23 }, // P6 libero
      ],
    },
    // Rotation 2: P1 outside 1, P2 middle-blocker 1, P3 opposite, P4 outside 2, P5 libero, P6 setter
    1: {
      'base': [
        { x: 3, y: 6.92 }, // P1 outside 1
        { x: 3, y: 1.5 }, // P2 middle-blocker 1
        { x: 0, y: 1.5 }, // P3 opposite
        { x: -3, y: 1.5 }, // P4 outside 2
        { x: -3, y: 6.92 }, // P5 libero
        { x: 0, y: 6.92 }, // P6 setter
      ],
      'pass': [
        ZONE_1_SERVE_RECEIVE, // P1 outside 1
        { x: 0, y: 1.48 }, // P2 middle-blocker 1
        { x: -3.63, y: 2.44 }, // P3 opposite
        ZONE_5_SERVE_RECEIVE, // P4 outside 2
        ZONE_6_SERVE_RECEIVE, // P5 libero
        { x: 3.63, y: 6.31 }, // P6 setter
      ],
      'set': [
        PIPE_ATTACK_APPROACH, // P1 outside 1
        MIDDLE_QUICK_APPROACH, // P2 middle-blocker 1
        RIGHT_PIN_ATTACK_APPROACH, // P3 opposite
        LEFT_PIN_ATTACK_APPROACH, // P4 outside 2
        LIBERO_TRANSITION_BASE, // P5 libero
        CONVENTIONAL_SETTING_POSITION, // P6 setter
      ],
      'attack': [
        { x: -1.94, y: 3.77 }, // P1 outside 1
        { x: 0, y: 0.63 }, // P2 middle-blocker 1
        { x: 3.39, y: 0.63 }, // P3 opposite
        { x: -3.39, y: 0.63 }, // P4 outside 2
        { x: 0, y: 4.26 }, // P5 libero
        { x: 1.21, y: 1.96 }, // P6 setter
      ],
      'defensive-position': [
        { x: -2.9, y: 7.4 }, // P1 outside 1
        { x: 0, y: 0.51 }, // P2 middle-blocker 1
        { x: 3.02, y: 0.51 }, // P3 opposite
        { x: -3.02, y: 0.51 }, // P4 outside 2
        { x: 0, y: 5.23 }, // P5 libero
        { x: 0.73, y: 7.65 }, // P6 setter
      ],
    },
    // Rotation 3: P1 libero, P2 opposite, P3 outside 2, P4 middle-blocker 2, P5 setter, P6 outside 1
    2: {
      'base': [
        { x: 3, y: 6.92 }, // P1 libero
        { x: 3, y: 1.5 }, // P2 opposite
        { x: 0, y: 1.5 }, // P3 outside 2
        { x: -3, y: 1.5 }, // P4 middle-blocker 2
        { x: -3, y: 6.92 }, // P5 setter
        { x: 0, y: 6.92 }, // P6 outside 1
      ],
      'pass': [
        { x: 0, y: 6.07 }, // P1 libero
        { x: -3.63, y: 2.44 }, // P2 opposite
        { x: 2.66, y: 5.59 }, // P3 outside 2
        { x: 0, y: 1.48 }, // P4 middle-blocker 2
        { x: 3.63, y: 6.31 }, // P5 setter
        { x: -2.66, y: 5.59 }, // P6 outside 1
      ],
      'set': [
        LIBERO_TRANSITION_BASE, // P1 libero
        RIGHT_PIN_ATTACK_APPROACH, // P2 opposite
        LEFT_PIN_ATTACK_APPROACH, // P3 outside 2
        MIDDLE_QUICK_APPROACH, // P4 middle-blocker 2
        CONVENTIONAL_SETTING_POSITION, // P5 setter
        PIPE_ATTACK_APPROACH, // P6 outside 1
      ],
      'attack': [
        { x: 0, y: 4.26 }, // P1 libero
        { x: 3.39, y: 0.63 }, // P2 opposite
        { x: -3.39, y: 0.63 }, // P3 outside 2
        { x: 0, y: 0.63 }, // P4 middle-blocker 2
        { x: 1.21, y: 1.96 }, // P5 setter
        { x: -1.94, y: 3.77 }, // P6 outside 1
      ],
      'defensive-position': [
        { x: 0, y: 5.23 }, // P1 libero
        { x: 3.02, y: 0.51 }, // P2 opposite
        { x: -3.02, y: 0.51 }, // P3 outside 2
        { x: 0, y: 0.51 }, // P4 middle-blocker 2
        { x: 0.73, y: 7.65 }, // P5 setter
        { x: -2.9, y: 7.4 }, // P6 outside 1
      ],
    },
    // Rotation 4: P1 opposite, P2 outside 2, P3 middle-blocker 2, P4 setter, P5 outside 1, P6 libero
    3: {
      'base': [
        { x: 3, y: 6.92 }, // P1 opposite
        { x: 3, y: 1.5 }, // P2 outside 2
        { x: 0, y: 1.5 }, // P3 middle-blocker 2
        { x: -3, y: 1.5 }, // P4 setter
        { x: -3, y: 6.92 }, // P5 outside 1
        { x: 0, y: 6.92 }, // P6 libero
      ],
      'pass': [
        { x: 3.51, y: 6.92 }, // P1 opposite
        { x: 2.66, y: 5.59 }, // P2 outside 2
        { x: 0, y: 1.48 }, // P3 middle-blocker 2
        { x: 3.63, y: 6.31 }, // P4 setter
        { x: -2.66, y: 5.59 }, // P5 outside 1
        { x: 0, y: 6.07 }, // P6 libero
      ],
      'set': [
        OPPOSITE_BACKROW_TRANSITION, // P1 opposite
        LEFT_PIN_ATTACK_APPROACH, // P2 outside 2
        MIDDLE_QUICK_APPROACH, // P3 middle-blocker 2
        CONVENTIONAL_SETTING_POSITION, // P4 setter
        PIPE_ATTACK_APPROACH, // P5 outside 1
        LIBERO_TRANSITION_BASE, // P6 libero
      ],
      'attack': [
        { x: 1.94, y: 3.77 }, // P1 opposite
        { x: -3.39, y: 0.63 }, // P2 outside 2
        { x: 0, y: 0.63 }, // P3 middle-blocker 2
        { x: 1.21, y: 1.96 }, // P4 setter
        { x: -1.94, y: 3.77 }, // P5 outside 1
        { x: 0, y: 4.26 }, // P6 libero
      ],
      'defensive-position': [
        { x: 2.9, y: 7.4 }, // P1 opposite
        { x: -3.02, y: 0.51 }, // P2 outside 2
        { x: 0, y: 0.51 }, // P3 middle-blocker 2
        { x: 1.69, y: 0.63 }, // P4 setter
        { x: -2.9, y: 7.4 }, // P5 outside 1
        { x: 0, y: 5.23 }, // P6 libero
      ],
    },
    // Rotation 5: P1 outside 2, P2 middle-blocker 2, P3 setter, P4 outside 1, P5 libero, P6 opposite
    4: {
      'base': [
        { x: 3, y: 6.92 }, // P1 outside 2
        { x: 3, y: 1.5 }, // P2 middle-blocker 2
        { x: 0, y: 1.5 }, // P3 setter
        { x: -3, y: 1.5 }, // P4 outside 1
        { x: -3, y: 6.92 }, // P5 libero
        { x: 0, y: 6.92 }, // P6 opposite
      ],
      'pass': [
        { x: -2.66, y: 5.59 }, // P1 outside 2
        { x: 0, y: 1.48 }, // P2 middle-blocker 2
        { x: 3.63, y: 6.31 }, // P3 setter
        { x: 2.66, y: 5.59 }, // P4 outside 1
        { x: 0, y: 6.07 }, // P5 libero
        { x: 3.51, y: 6.92 }, // P6 opposite
      ],
      'set': [
        PIPE_ATTACK_APPROACH, // P1 outside 2
        MIDDLE_QUICK_APPROACH, // P2 middle-blocker 2
        CONVENTIONAL_SETTING_POSITION, // P3 setter
        LEFT_PIN_ATTACK_APPROACH, // P4 outside 1
        LIBERO_TRANSITION_BASE, // P5 libero
        OPPOSITE_BACKROW_TRANSITION, // P6 opposite
      ],
      'attack': [
        { x: -1.94, y: 3.77 }, // P1 outside 2
        { x: 0, y: 0.63 }, // P2 middle-blocker 2
        { x: 1.21, y: 1.96 }, // P3 setter
        { x: -3.39, y: 0.63 }, // P4 outside 1
        { x: 0, y: 4.26 }, // P5 libero
        { x: 1.94, y: 3.77 }, // P6 opposite
      ],
      'defensive-position': [
        { x: -2.9, y: 7.4 }, // P1 outside 2
        { x: 0, y: 0.51 }, // P2 middle-blocker 2
        { x: 1.69, y: 0.63 }, // P3 setter
        { x: -3.02, y: 0.51 }, // P4 outside 1
        { x: 0, y: 5.23 }, // P5 libero
        { x: 2.9, y: 7.4 }, // P6 opposite
      ],
    },
    // Rotation 6: P1 middle-blocker 1, P2 setter, P3 outside 1, P4 middle-blocker 2, P5 opposite, P6 outside 2
    5: {
      'base': [
        { x: 3, y: 6.92 }, // P1 middle-blocker 1
        { x: 3, y: 1.5 }, // P2 setter
        { x: 0, y: 1.5 }, // P3 outside 1
        { x: -3, y: 1.5 }, // P4 middle-blocker 2
        { x: -3, y: 6.92 }, // P5 opposite
        { x: 0, y: 6.92 }, // P6 outside 2
      ],
      'pass': [
        { x: 0, y: 8.01 }, // P1 middle-blocker 1
        { x: 3.63, y: 6.31 }, // P2 setter
        { x: 2.66, y: 5.59 }, // P3 outside 1
        { x: 0, y: 1.48 }, // P4 middle-blocker 2
        { x: 3.51, y: 6.92 }, // P5 opposite
        { x: -2.66, y: 5.59 }, // P6 outside 2
      ],
      'set': [
        { x: 0, y: 5.23 }, // P1 middle-blocker 1
        { x: 1.69, y: 0.63 }, // P2 setter
        { x: -3.39, y: 0.75 }, // P3 outside 1
        { x: 0, y: 0.75 }, // P4 middle-blocker 2
        { x: 2.66, y: 5.23 }, // P5 opposite
        { x: -1.94, y: 5.23 }, // P6 outside 2
      ],
      'attack': [
        { x: 0, y: 4.26 }, // P1 middle-blocker 1
        { x: 1.21, y: 1.96 }, // P2 setter
        { x: -3.39, y: 0.63 }, // P3 outside 1
        { x: 0, y: 0.63 }, // P4 middle-blocker 2
        { x: 1.94, y: 3.77 }, // P5 opposite
        { x: -1.94, y: 3.77 }, // P6 outside 2
      ],
      'defensive-position': [
        { x: 0, y: 5.23 }, // P1 middle-blocker 1
        { x: 1.69, y: 0.63 }, // P2 setter
        { x: -3.02, y: 0.51 }, // P3 outside 1
        { x: 0, y: 0.51 }, // P4 middle-blocker 2
        { x: 2.9, y: 7.4 }, // P5 opposite
        { x: -2.9, y: 7.4 }, // P6 outside 2
      ],
    },
  },
  serve: {
    // Rotation 1: P1 setter, P2 outside 1, P3 middle-blocker 1, P4 opposite, P5 outside 2, P6 libero
    0: {
      'base': [
        { x: 3, y: 6.92 }, // P1 setter
        { x: 3, y: 1.5 }, // P2 outside 1
        { x: 0, y: 1.5 }, // P3 middle-blocker 1
        { x: -3, y: 1.5 }, // P4 opposite
        { x: -3, y: 6.92 }, // P5 outside 2
        { x: 0, y: 6.92 }, // P6 libero
      ],
      'serve': [
        { x: 2, y: 9.58 }, // P1 setter
        { x: 0.70, y: 1.89 }, // P2 outside 1
        { x: 0, y: 0.58 }, // P3 middle-blocker 1
        { x: -0.70, y: 1.5 }, // P4 opposite
        { x: -1, y: 6.44 }, // P5 outside 2
        { x: 0, y: 5.15 }, // P6 libero
      ],
      'defensive-position': [
        { x: 2.5, y: 5.23 }, // P1 setter
        { x: -1.5, y: 0.51 }, // P2 outside 1
        { x: 0, y: 0.51 }, // P3 middle-blocker 1
        { x: 1.5, y: 0.51 }, // P4 opposite
        { x: 0, y: 7.4 }, // P5 outside 2
        { x: -2.5, y: 5.23 }, // P6 libero
      ],
    },
    // Rotation 2: P1 outside 1, P2 middle-blocker 1, P3 opposite, P4 outside 2, P5 libero, P6 setter
    1: {
      'base': [
        { x: 3, y: 6.92 }, // P1 outside 1
        { x: 3, y: 1.5 }, // P2 middle-blocker 1
        { x: 0, y: 1.5 }, // P3 opposite
        { x: -3, y: 1.5 }, // P4 outside 2
        { x: -3, y: 6.92 }, // P5 libero
        { x: 0, y: 6.92 }, // P6 setter
      ],
      'serve': [
        { x: 3.34, y: 9.58 }, // P1 outside 1
        { x: 3, y: 1.89 }, // P2 middle-blocker 1
        { x: 0, y: 1.89 }, // P3 opposite
        { x: -3, y: 1.89 }, // P4 outside 2
        { x: -2.76, y: 6.15 }, // P5 libero
        { x: 0, y: 6.44 }, // P6 setter
      ],
      'defensive-position': [
        { x: -2.9, y: 7.4 }, // P1 outside 1
        { x: 0, y: 0.51 }, // P2 middle-blocker 1
        { x: 3.02, y: 0.51 }, // P3 opposite
        { x: -3.02, y: 0.51 }, // P4 outside 2
        { x: 0, y: 5.23 }, // P5 libero
        { x: 0.73, y: 7.65 }, // P6 setter
      ],
    },
    // Rotation 3: P1 libero, P2 opposite, P3 outside 2, P4 middle-blocker 2, P5 setter, P6 outside 1
    2: {
      'base': [
        { x: 3, y: 6.92 }, // P1 libero
        { x: 3, y: 1.5 }, // P2 opposite
        { x: 0, y: 1.5 }, // P3 outside 2
        { x: -3, y: 1.5 }, // P4 middle-blocker 2
        { x: -3, y: 6.92 }, // P5 setter
        { x: 0, y: 6.92 }, // P6 outside 1
      ],
      'serve': [
        { x: 3.34, y: 9.58 }, // P1 libero
        { x: 3, y: 1.89 }, // P2 opposite
        { x: 0, y: 1.89 }, // P3 outside 2
        { x: -3, y: 1.89 }, // P4 middle-blocker 2
        { x: -2.76, y: 6.15 }, // P5 setter
        { x: 0, y: 6.44 }, // P6 outside 1
      ],
      'defensive-position': [
        { x: 0, y: 5.23 }, // P1 libero
        { x: 3.02, y: 0.51 }, // P2 opposite
        { x: -3.02, y: 0.51 }, // P3 outside 2
        { x: 0, y: 0.51 }, // P4 middle-blocker 2
        { x: 0.73, y: 7.65 }, // P5 setter
        { x: -2.9, y: 7.4 }, // P6 outside 1
      ],
    },
    // Rotation 4: P1 opposite, P2 outside 2, P3 middle-blocker 2, P4 setter, P5 outside 1, P6 libero
    3: {
      'base': [
        { x: 3, y: 6.92 }, // P1 opposite
        { x: 3, y: 1.5 }, // P2 outside 2
        { x: 0, y: 1.5 }, // P3 middle-blocker 2
        { x: -3, y: 1.5 }, // P4 setter
        { x: -3, y: 6.92 }, // P5 outside 1
        { x: 0, y: 6.92 }, // P6 libero
      ],
      'serve': [
        { x: 3.34, y: 9.58 }, // P1 opposite
        { x: 3, y: 1.89 }, // P2 outside 2
        { x: 0, y: 1.89 }, // P3 middle-blocker 2
        { x: -3, y: 1.89 }, // P4 setter
        { x: -2.76, y: 6.15 }, // P5 outside 1
        { x: 0, y: 6.44 }, // P6 libero
      ],
      'defensive-position': [
        { x: 2.9, y: 7.4 }, // P1 opposite
        { x: -3.02, y: 0.51 }, // P2 outside 2
        { x: 0, y: 0.51 }, // P3 middle-blocker 2
        { x: 1.69, y: 0.63 }, // P4 setter
        { x: -2.9, y: 7.4 }, // P5 outside 1
        { x: 0, y: 5.23 }, // P6 libero
      ],
    },
    // Rotation 5: P1 outside 2, P2 middle-blocker 2, P3 setter, P4 outside 1, P5 libero, P6 opposite
    4: {
      'base': [
        { x: 3, y: 6.92 }, // P1 outside 2
        { x: 3, y: 1.5 }, // P2 middle-blocker 2
        { x: 0, y: 1.5 }, // P3 setter
        { x: -3, y: 1.5 }, // P4 outside 1
        { x: -3, y: 6.92 }, // P5 libero
        { x: 0, y: 6.92 }, // P6 opposite
      ],
      'serve': [
        { x: 3.34, y: 9.58 }, // P1 outside 2
        { x: 3, y: 1.89 }, // P2 middle-blocker 2
        { x: 0, y: 1.89 }, // P3 setter
        { x: -3, y: 1.89 }, // P4 outside 1
        { x: -2.76, y: 6.15 }, // P5 libero
        { x: 0, y: 6.44 }, // P6 opposite
      ],
      'defensive-position': [
        { x: -2.9, y: 7.4 }, // P1 outside 2
        { x: 0, y: 0.51 }, // P2 middle-blocker 2
        { x: 1.69, y: 0.63 }, // P3 setter
        { x: -3.02, y: 0.51 }, // P4 outside 1
        { x: 0, y: 5.23 }, // P5 libero
        { x: 2.9, y: 7.4 }, // P6 opposite
      ],
    },
    // Rotation 6: P1 middle-blocker 1, P2 setter, P3 outside 1, P4 middle-blocker 2, P5 opposite, P6 outside 2
    5: {
      'base': [
        { x: 3, y: 6.92 }, // P1 middle-blocker 1
        { x: 3, y: 1.5 }, // P2 setter
        { x: 0, y: 1.5 }, // P3 outside 1
        { x: -3, y: 1.5 }, // P4 middle-blocker 2
        { x: -3, y: 6.92 }, // P5 opposite
        { x: 0, y: 6.92 }, // P6 outside 2
      ],
      'serve': [
        { x: 3.34, y: 9.58 }, // P1 middle-blocker 1
        { x: 3, y: 1.89 }, // P2 setter
        { x: 0, y: 1.89 }, // P3 outside 1
        { x: -3, y: 1.89 }, // P4 middle-blocker 2
        { x: -2.76, y: 6.15 }, // P5 opposite
        { x: 0, y: 6.44 }, // P6 outside 2
      ],
      'defensive-position': [
        { x: 0, y: 5.23 }, // P1 middle-blocker 1
        { x: 1.69, y: 0.63 }, // P2 setter
        { x: -3.02, y: 0.51 }, // P3 outside 1
        { x: 0, y: 0.51 }, // P4 middle-blocker 2
        { x: 2.9, y: 7.4 }, // P5 opposite
        { x: -2.9, y: 7.4 }, // P6 outside 2
      ],
    },
  },
}
