// GENERATED FILE - see scripts/generate-5-1-seed-formations.ts. Do not
// hand-edit. Every position here is a mechanical meter conversion of the
// pre-refactor phases.ts pixel data (ROLE_TARGETS / COURT_SLOTS /
// SERVE_SLOTS), rounded to 2 decimals - with one exception: the server's
// serve-phase P1 position was reflected across the endline into the
// service zone (see the generator script for why). No tactical value was
// otherwise adjusted.
import type { FormationTable } from './types'

// 'base' phase positions - the six fixed court positions (numbered 1-6 per
// the standard volleyball rotation order, starting back-right and going
// clockwise) that every rotation and mode shares before serve/receive
// begins. Independent of rotation index or the role occupying the slot.
const ZONE_1_BASE_POSITION = { x: 3, y: 6.92 }
const ZONE_2_BASE_POSITION = { x: 3, y: 1.5 }
const ZONE_3_BASE_POSITION = { x: 0, y: 1.5 }
const ZONE_4_BASE_POSITION = { x: -3, y: 1.5 }
const ZONE_5_BASE_POSITION = { x: -3, y: 6.92 }
const ZONE_6_BASE_POSITION = { x: 0, y: 6.92 }

// Defensive-position phase base positions for rotation 1, keyed by court zone
// (not role) - whichever player occupies a zone defends from that zone's base.
const ZONE_1_DEFENSIVE_BASE = { x: 2.5, y: 5.23 } // zone 1's defensive/ready base behind the attack
const ZONE_2_DEFENSIVE_BASE = { x: -1.5, y: 0.51 } // zone 2's defensive/ready base at the net
const ZONE_3_DEFENSIVE_BASE = { x: 0, y: 0.51 } // zone 3's defensive/ready base at the net
const ZONE_4_DEFENSIVE_BASE = { x: 1.5, y: 0.51 } // zone 4's defensive/ready base at the net
const ZONE_5_DEFENSIVE_BASE = { x: -2.5, y: 5.23 } // zone 5's defensive/ready base behind the attack
const ZONE_6_DEFENSIVE_BASE = { x: 0, y: 7.4 } // zone 6's defensive/ready base behind the attack

// Receive 'set' phase target positions, shared by role across every rotation that carries a libero (rotations 1-5).
const CONVENTIONAL_SETTING_POSITION = { x: 1.69, y: 1 } // setter's net target to run the offense
const LEFT_PIN_ATTACK_APPROACH = { x: -5.2, y: 3 } // outside hitter's wide-left approach for a pin attack
const MIDDLE_QUICK_APPROACH = { x: 0, y: 3 } // middle blocker's approach for a quick-tempo attack
const RIGHT_PIN_ATTACK_APPROACH = { x: 4.4, y: 3 } // opposite's wide-right approach for a pin attack
const PIPE_ATTACK_APPROACH = { x: 0, y: 6 } // back-row outside hitter's approach for a pipe attack
const LIBERO_TRANSITION_BASE = { x: -2.5, y: 5.23 } // libero's defensive/ready base behind the attack
const OPPOSITE_BACKROW_TRANSITION = { x: 4.4, y: 5.23 } // back-row opposite's ready base

const ZONE_5_SERVE_RECEIVE = { x: -3, y: 5.6 } // zone 5's receive-phase target for the serve-receive rotation
const ZONE_6_SERVE_RECEIVE = { x: 0, y: 6.1 } // zone 6's receive-phase target for the serve-receive rotation
const ZONE_1_SERVE_RECEIVE = { x: 3, y: 5.6 } // zone 1's receive-phase target for the serve-receive rotation
const ZONE_1_HIDING_POSITION = { x: 3.5, y: 7 } // zone 1's hidden position for the serve-receive rotation
const ZONE_6_HIDING_POSITION = { x: 1, y: 8 } // zone 1's hidden position for the serve-receive rotation

//Rotation specific court positions
const ROTATION_5_MIDDLE_PASS_POSITION = { x: CONVENTIONAL_SETTING_POSITION.x + 0.5, y: CONVENTIONAL_SETTING_POSITION.y + 0.5 } // middle-blocker 2's receive-phase target for the serve-receive rotation
const ROTATION_6_OPPOSITE_PASS_POSITION = { x: -1, y: 8 }
const ROTATION_6_MIDDLE_PASS_POSITION = { x: -4, y: 1 }


// Receive 'attack' phase net-contact positions, shared by role across every rotation that carries a libero (rotations 1-5).
const LEFT_PIN_ATTACK_CONTACT = { x: -3.39, y: 0.63 } // front-row outside hitter's contact point at the net for a pin attack
const MIDDLE_QUICK_ATTACK_CONTACT = { x: 0, y: 0.63 } // middle blocker's contact point at the net for a quick-tempo attack
const RIGHT_PIN_ATTACK_CONTACT = { x: 3.39, y: 0.63 } // front-row opposite's contact point at the net for a pin attack
const PIPE_ATTACK_CONTACT = { x: 0, y: 3.3 } // back-row outside hitter's contact point for a pipe attack
const LIBERO_ATTACK_BASE = { x: -2.5, y: 4.26 } // libero's coverage position in the zone 1/zone 5 column during a teammate's attack
const OPPOSITE_BACKROW_ATTACK_CONTACT = { x: 4.4, y: 3.3 } // back-row opposite's contact point for a D-ball attack

// Serve-phase positions, keyed by court zone. The three front-row zones
// (2/3/4) stack tight to center-net during the serve - staggered just off
// the middle - then release to their matching ZONE_N_DEFENSIVE_BASE once the
// ball is away. This clustered shape is shared by every serving rotation.
// The back-row serve-coverage spots (zones 1/5/6) are shared by rotations
// 2-6 only; rotation 1's back row keeps its unique reflected-server layout.
const ZONE_2_SERVE_STACK = { x: 0.70, y: 1.89 } // front-right stack -> ZONE_2_DEFENSIVE_BASE
const ZONE_3_SERVE_STACK = { x: 0, y: 0.58 } // front-middle stack, pressed to the net -> ZONE_3_DEFENSIVE_BASE
const ZONE_4_SERVE_STACK = { x: -0.70, y: 1.5 } // front-left stack -> ZONE_4_DEFENSIVE_BASE
const BACKROW_SERVE_LEFT_STACK = {x: -0.5, y: 6.44} // back-left serve-coverage spot -> ZONE_5_DEFENSIVE_BASE
const BACKROW_SERVE_RIGHT_STACK = {x: 0.5, y: 6.44} // back-right serve-coverage spot -> ZONE_1_DEFENSIVE_BASE
const ZONE_1_SERVICE_LINE_POSITION = { x: 3.34, y: 9.6 } // server's spot in the back-right service zone
const ZONE_5_SERVICE_LINE_POSITION = { x: -2.76, y: 9.6 } // back-left serve-coverage spot
const ZONE_6_SERVICE_LINE_POSITION = { x: 0, y: 9.6 } // back-middle serve-coverage spot


export const FORMATIONS_5_1: FormationTable = {
  receive: {
    // Rotation 1: P1 setter, P2 outside 1, P3 middle-blocker 1, P4 opposite, P5 outside 2, P6 libero
    0: {
      'base': [
        ZONE_1_BASE_POSITION, // P1 setter
        ZONE_2_BASE_POSITION, // P2 outside 1
        ZONE_3_BASE_POSITION, // P3 middle-blocker 1
        ZONE_4_BASE_POSITION, // P4 opposite
        ZONE_5_BASE_POSITION, // P5 outside 2
        ZONE_6_BASE_POSITION, // P6 libero
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
        CONVENTIONAL_SETTING_POSITION, // P1 setter
        LEFT_PIN_ATTACK_CONTACT, // P2 outside 1
        MIDDLE_QUICK_ATTACK_CONTACT, // P3 middle-blocker 1
        RIGHT_PIN_ATTACK_CONTACT, // P4 opposite
        PIPE_ATTACK_CONTACT, // P5 outside 2
        LIBERO_ATTACK_BASE, // P6 libero
      ],
      'defensive-position': [
        ZONE_1_DEFENSIVE_BASE, // P1 setter
        ZONE_2_DEFENSIVE_BASE, // P2 outside 1
        ZONE_3_DEFENSIVE_BASE, // P3 middle-blocker 1
        ZONE_4_DEFENSIVE_BASE, // P4 opposite
        ZONE_5_DEFENSIVE_BASE, // P5 outside 2
        ZONE_6_DEFENSIVE_BASE, // P6 libero
      ],
    },
    // Rotation 2: P1 outside 1, P2 middle-blocker 1, P3 opposite, P4 outside 2, P5 libero, P6 setter
    1: {
      'base': [
        ZONE_1_BASE_POSITION, // P1 outside 1
        ZONE_2_BASE_POSITION, // P2 middle-blocker 1
        ZONE_3_BASE_POSITION, // P3 opposite
        ZONE_4_BASE_POSITION, // P4 outside 2
        ZONE_5_BASE_POSITION, // P5 libero
        ZONE_6_BASE_POSITION, // P6 setter
      ],
      'pass': [
        ZONE_1_SERVE_RECEIVE, // P1 outside 1
        { x: 2.5, y: 1.48 }, // P2 middle-blocker 1
        { x: 1.5, y: 1 }, // P3 opposite
        ZONE_5_SERVE_RECEIVE, // P4 outside 2
        ZONE_6_SERVE_RECEIVE, // P5 libero
        { x: 1, y: 2 }, // P6 setter
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
        PIPE_ATTACK_CONTACT, // P1 outside 1
        MIDDLE_QUICK_ATTACK_CONTACT, // P2 middle-blocker 1
        RIGHT_PIN_ATTACK_CONTACT, // P3 opposite
        LEFT_PIN_ATTACK_CONTACT, // P4 outside 2
        LIBERO_ATTACK_BASE, // P5 libero
        CONVENTIONAL_SETTING_POSITION, // P6 setter
      ],
      'defensive-position': [
        ZONE_5_DEFENSIVE_BASE, // P1 outside 1
        ZONE_3_DEFENSIVE_BASE, // P2 middle-blocker 1
        ZONE_4_DEFENSIVE_BASE, // P3 opposite
        ZONE_2_DEFENSIVE_BASE, // P4 outside 2
        ZONE_6_DEFENSIVE_BASE, // P5 libero
        ZONE_1_DEFENSIVE_BASE, // P6 setter
      ],
    },
    // Rotation 3: P1 libero, P2 opposite, P3 outside 2, P4 middle-blocker 2, P5 setter, P6 outside 1
    2: {
      'base': [
        ZONE_1_BASE_POSITION, // P1 libero
        ZONE_2_BASE_POSITION, // P2 opposite
        ZONE_3_BASE_POSITION, // P3 outside 2
        ZONE_4_BASE_POSITION, // P4 middle-blocker 2
        ZONE_5_BASE_POSITION, // P5 setter
        ZONE_6_BASE_POSITION, // P6 outside 1
      ],
      'pass': [
        ZONE_1_DEFENSIVE_BASE, // P1 libero
        { x: 3.63, y: 0.5 }, // P2 opposite
        ZONE_5_DEFENSIVE_BASE, // P3 outside 2
        { x: -3.5, y: 0.5 }, // P4 middle-blocker 2
        { x: -2, y: 1.5 }, // P5 setter
        ZONE_6_DEFENSIVE_BASE, // P6 outside 1
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
        LIBERO_ATTACK_BASE, // P1 libero
        RIGHT_PIN_ATTACK_CONTACT, // P2 opposite
        LEFT_PIN_ATTACK_CONTACT, // P3 outside 2
        MIDDLE_QUICK_ATTACK_CONTACT, // P4 middle-blocker 2
        CONVENTIONAL_SETTING_POSITION, // P5 setter
        PIPE_ATTACK_CONTACT, // P6 outside 1
      ],
      'defensive-position': [
        ZONE_6_DEFENSIVE_BASE, // P1 libero
        ZONE_4_DEFENSIVE_BASE, // P2 opposite
        ZONE_2_DEFENSIVE_BASE, // P3 outside 2
        ZONE_3_DEFENSIVE_BASE, // P4 middle-blocker 2
        ZONE_1_DEFENSIVE_BASE, // P5 setter
        ZONE_5_DEFENSIVE_BASE, // P6 outside 1
      ],
    },
    // Rotation 4: P1 opposite, P2 outside 2, P3 middle-blocker 2, P4 setter, P5 outside 1, P6 libero
    3: {
      'base': [
        ZONE_1_BASE_POSITION, // P1 opposite
        ZONE_2_BASE_POSITION, // P2 outside 2
        ZONE_3_BASE_POSITION, // P3 middle-blocker 2
        ZONE_4_BASE_POSITION, // P4 setter
        ZONE_5_BASE_POSITION, // P5 outside 1
        ZONE_6_BASE_POSITION, // P6 libero
      ],
      'pass': [
        ZONE_1_HIDING_POSITION, // P1 opposite
        ZONE_5_SERVE_RECEIVE, // P2 outside 2
        { x: -3, y: 1 }, // P3 middle-blocker 2
        { x: -3.63, y: 0.5 }, // P4 setter
        ZONE_6_SERVE_RECEIVE, // P5 outside 1
        ZONE_1_SERVE_RECEIVE, // P6 libero
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
        OPPOSITE_BACKROW_ATTACK_CONTACT, // P1 opposite
        LEFT_PIN_ATTACK_CONTACT, // P2 outside 2
        MIDDLE_QUICK_ATTACK_CONTACT, // P3 middle-blocker 2
        CONVENTIONAL_SETTING_POSITION, // P4 setter
        PIPE_ATTACK_CONTACT, // P5 outside 1
        LIBERO_ATTACK_BASE, // P6 libero
      ],
      'defensive-position': [
        ZONE_1_DEFENSIVE_BASE, // P1 opposite
        ZONE_2_DEFENSIVE_BASE, // P2 outside 2
        ZONE_3_DEFENSIVE_BASE, // P3 middle-blocker 2
        ZONE_4_DEFENSIVE_BASE, // P4 setter
        ZONE_5_DEFENSIVE_BASE, // P5 outside 1
        ZONE_6_DEFENSIVE_BASE, // P6 libero
      ],
    },
    // Rotation 5: P1 outside 2, P2 middle-blocker 2, P3 setter, P4 outside 1, P5 libero, P6 opposite
    4: {
      'base': [
        ZONE_1_BASE_POSITION, // P1 outside 2
        ZONE_2_BASE_POSITION, // P2 middle-blocker 2
        ZONE_3_BASE_POSITION, // P3 setter
        ZONE_4_BASE_POSITION, // P4 outside 1
        ZONE_5_BASE_POSITION, // P5 libero
        ZONE_6_BASE_POSITION, // P6 opposite
      ],
      'pass': [
        ZONE_1_SERVE_RECEIVE, // P1 outside 2
        ROTATION_5_MIDDLE_PASS_POSITION, // P2 middle-blocker 2
        CONVENTIONAL_SETTING_POSITION, // P3 setter
        ZONE_5_SERVE_RECEIVE, // P4 outside 1
        ZONE_6_SERVE_RECEIVE, // P5 libero
        ZONE_6_HIDING_POSITION, // P6 opposite
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
        PIPE_ATTACK_CONTACT, // P1 outside 2
        MIDDLE_QUICK_ATTACK_CONTACT, // P2 middle-blocker 2
        CONVENTIONAL_SETTING_POSITION, // P3 setter
        LEFT_PIN_ATTACK_CONTACT, // P4 outside 1
        LIBERO_ATTACK_BASE, // P5 libero
        OPPOSITE_BACKROW_ATTACK_CONTACT, // P6 opposite
      ],
      'defensive-position': [
        ZONE_5_DEFENSIVE_BASE, // P1 outside 2
        ZONE_3_DEFENSIVE_BASE, // P2 middle-blocker 2
        ZONE_4_DEFENSIVE_BASE, // P3 setter
        ZONE_2_DEFENSIVE_BASE, // P4 outside 1
        ZONE_6_DEFENSIVE_BASE, // P5 libero
        ZONE_1_DEFENSIVE_BASE, // P6 opposite
      ],
    },
    // Rotation 6: P1 libero, P2 setter, P3 outside 1, P4 middle-blocker 1, P5 opposite, P6 outside 2
    5: {
      'base': [
        ZONE_1_BASE_POSITION, // P1 libero
        ZONE_2_BASE_POSITION, // P2 setter
        ZONE_3_BASE_POSITION, // P3 outside 1
        ZONE_4_BASE_POSITION, // P4 middle-blocker 1
        ZONE_5_BASE_POSITION, // P5 opposite
        ZONE_6_BASE_POSITION, // P6 outside 2
      ],
      'pass': [
        ZONE_1_SERVE_RECEIVE, // P1 libero
        CONVENTIONAL_SETTING_POSITION, // P2 setter
        ZONE_5_SERVE_RECEIVE, // P3 outside 1
        ROTATION_6_MIDDLE_PASS_POSITION, // P4 middle-blocker 1
        ROTATION_6_OPPOSITE_PASS_POSITION, // P5 opposite
        ZONE_6_SERVE_RECEIVE, // P6 outside 2
      ],
      'set': [
        LIBERO_TRANSITION_BASE, // P1 libero
        CONVENTIONAL_SETTING_POSITION, // P2 setter
        LEFT_PIN_ATTACK_APPROACH, // P3 outside 1
        MIDDLE_QUICK_APPROACH, // P4 middle-blocker 1
        OPPOSITE_BACKROW_TRANSITION, // P5 opposite
        PIPE_ATTACK_APPROACH, // P6 outside 2
      ],
      'attack': [
        LIBERO_ATTACK_BASE, // P1 libero
        CONVENTIONAL_SETTING_POSITION, // P2 setter
        LEFT_PIN_ATTACK_CONTACT, // P3 outside 1
        MIDDLE_QUICK_ATTACK_CONTACT, // P4 middle-blocker 1
        OPPOSITE_BACKROW_ATTACK_CONTACT, // P5 opposite
        PIPE_ATTACK_CONTACT, // P6 outside 2
      ],
      'defensive-position': [
        ZONE_5_DEFENSIVE_BASE, // P1 libero
        ZONE_4_DEFENSIVE_BASE, // P2 setter
        ZONE_2_DEFENSIVE_BASE, // P3 outside 1
        ZONE_3_DEFENSIVE_BASE, // P4 middle-blocker 1
        ZONE_1_DEFENSIVE_BASE, // P5 opposite
        ZONE_6_DEFENSIVE_BASE, // P6 outside 2
      ],
    },
  },
  serve: {
    // Rotation 1: P1 setter, P2 outside 1, P3 middle-blocker 1, P4 opposite, P5 outside 2, P6 libero
    0: {
      'base': [
        ZONE_1_BASE_POSITION, // P1 setter
        ZONE_2_BASE_POSITION, // P2 outside 1
        ZONE_3_BASE_POSITION, // P3 middle-blocker 1
        ZONE_4_BASE_POSITION, // P4 opposite
        ZONE_5_BASE_POSITION, // P5 outside 2
        ZONE_6_BASE_POSITION, // P6 libero
      ],
      'serve': [
        ZONE_1_SERVICE_LINE_POSITION, // P1 setter (server - reflected into the service zone)
        ZONE_2_SERVE_STACK, // P2 outside 1
        ZONE_3_SERVE_STACK, // P3 middle-blocker 1
        ZONE_4_SERVE_STACK, // P4 opposite
        BACKROW_SERVE_LEFT_STACK, // P5 outside 2
        BACKROW_SERVE_RIGHT_STACK, // P6 libero
      ],
      'defensive-position': [
        ZONE_1_DEFENSIVE_BASE, // P1 setter
        ZONE_2_DEFENSIVE_BASE, // P2 outside 1
        ZONE_3_DEFENSIVE_BASE, // P3 middle-blocker 1
        ZONE_4_DEFENSIVE_BASE, // P4 opposite
        ZONE_6_DEFENSIVE_BASE, // P5 outside 2
        ZONE_5_DEFENSIVE_BASE, // P6 libero
      ],
    },
    // Rotation 2: P1 outside 1, P2 middle-blocker 1, P3 opposite, P4 outside 2, P5 libero, P6 setter
    1: {
      'base': [
        ZONE_1_BASE_POSITION, // P1 outside 1
        ZONE_2_BASE_POSITION, // P2 middle-blocker 1
        ZONE_3_BASE_POSITION, // P3 opposite
        ZONE_4_BASE_POSITION, // P4 outside 2
        ZONE_5_BASE_POSITION, // P5 libero
        ZONE_6_BASE_POSITION, // P6 setter
      ],
      'serve': [
        ZONE_6_SERVICE_LINE_POSITION, // P1 outside 1
        ZONE_2_SERVE_STACK, // P2 middle-blocker 1
        ZONE_3_SERVE_STACK, // P3 opposite
        ZONE_4_SERVE_STACK, // P4 outside 2
        ZONE_5_DEFENSIVE_BASE, // P5 libero
        ZONE_1_DEFENSIVE_BASE, // P6 setter
      ],
      'defensive-position': [
        ZONE_6_DEFENSIVE_BASE, // P1 outside 1
        ZONE_3_DEFENSIVE_BASE, // P2 middle-blocker 1
        ZONE_4_DEFENSIVE_BASE, // P3 opposite
        ZONE_2_DEFENSIVE_BASE, // P4 outside 2
        ZONE_5_DEFENSIVE_BASE, // P5 libero
        ZONE_1_DEFENSIVE_BASE, // P6 setter
      ],
    },
    // Rotation 3: P1 libero, P2 opposite, P3 outside 2, P4 middle-blocker 2, P5 setter, P6 outside 1
    2: {
      'base': [
        ZONE_1_BASE_POSITION, // P1 libero
        ZONE_2_BASE_POSITION, // P2 opposite
        ZONE_3_BASE_POSITION, // P3 outside 2
        ZONE_4_BASE_POSITION, // P4 middle-blocker 2
        ZONE_5_BASE_POSITION, // P5 setter
        ZONE_6_BASE_POSITION, // P6 outside 1
      ],
      'serve': [
        ZONE_5_SERVICE_LINE_POSITION, // P1 libero
        ZONE_2_SERVE_STACK, // P2 opposite
        ZONE_3_SERVE_STACK, // P3 outside 2
        ZONE_4_SERVE_STACK, // P4 middle-blocker 2
        BACKROW_SERVE_LEFT_STACK, // P5 setter
        BACKROW_SERVE_RIGHT_STACK, // P6 outside 1
      ],
      'defensive-position': [
        ZONE_5_DEFENSIVE_BASE, // P1 libero
        ZONE_4_DEFENSIVE_BASE, // P2 opposite
        ZONE_2_DEFENSIVE_BASE, // P3 outside 2
        ZONE_3_DEFENSIVE_BASE, // P4 middle-blocker 2
        ZONE_1_DEFENSIVE_BASE, // P5 setter
        ZONE_6_DEFENSIVE_BASE, // P6 outside 1
      ],
    },
    // Rotation 4: P1 opposite, P2 outside 2, P3 middle-blocker 2, P4 setter, P5 outside 1, P6 libero
    3: {
      'base': [
        ZONE_1_BASE_POSITION, // P1 opposite
        ZONE_2_BASE_POSITION, // P2 outside 2
        ZONE_3_BASE_POSITION, // P3 middle-blocker 2
        ZONE_4_BASE_POSITION, // P4 setter
        ZONE_5_BASE_POSITION, // P5 outside 1
        ZONE_6_BASE_POSITION, // P6 libero
      ],
      'serve': [
        ZONE_1_SERVICE_LINE_POSITION, // P1 opposite
        ZONE_2_SERVE_STACK, // P2 outside 2
        ZONE_3_SERVE_STACK, // P3 middle-blocker 2
        ZONE_4_SERVE_STACK, // P4 setter
        BACKROW_SERVE_LEFT_STACK, // P5 outside 1
        BACKROW_SERVE_RIGHT_STACK, // P6 libero
      ],
      'defensive-position': [
        ZONE_1_DEFENSIVE_BASE, // P1 opposite
        ZONE_2_DEFENSIVE_BASE, // P2 outside 2
        ZONE_3_DEFENSIVE_BASE, // P3 middle-blocker 2
        ZONE_4_DEFENSIVE_BASE, // P4 setter
        ZONE_6_DEFENSIVE_BASE, // P5 outside 1
        ZONE_5_DEFENSIVE_BASE, // P6 libero
      ],
    },
    // Rotation 5: P1 outside 2, P2 middle-blocker 2, P3 setter, P4 outside 1, P5 libero, P6 opposite
    4: {
      'base': [
        ZONE_1_BASE_POSITION, // P1 outside 2
        ZONE_2_BASE_POSITION, // P2 middle-blocker 2
        ZONE_3_BASE_POSITION, // P3 setter
        ZONE_4_BASE_POSITION, // P4 outside 1
        ZONE_5_BASE_POSITION, // P5 libero
        ZONE_6_BASE_POSITION, // P6 opposite
      ],
      'serve': [
        ZONE_6_SERVICE_LINE_POSITION, // P1 outside 2
        ZONE_2_SERVE_STACK, // P2 middle-blocker 2
        ZONE_3_SERVE_STACK, // P3 setter
        ZONE_4_SERVE_STACK, // P4 outside 1
        ZONE_5_DEFENSIVE_BASE, // P5 libero
        ZONE_1_DEFENSIVE_BASE, // P6 opposite
      ],
      'defensive-position': [
        ZONE_6_DEFENSIVE_BASE, // P1 outside 2
        ZONE_3_DEFENSIVE_BASE, // P2 middle-blocker 2
        ZONE_4_DEFENSIVE_BASE, // P3 setter
        ZONE_2_DEFENSIVE_BASE, // P4 outside 1
        ZONE_5_DEFENSIVE_BASE, // P5 libero
        ZONE_1_DEFENSIVE_BASE, // P6 opposite
      ],
    },
    // Rotation 6: P1 middle-blocker 1, P2 setter, P3 outside 1, P4 middle-blocker 2, P5 opposite, P6 outside 2
    5: {
      'base': [
        ZONE_1_BASE_POSITION, // P1 middle-blocker 1
        ZONE_2_BASE_POSITION, // P2 setter
        ZONE_3_BASE_POSITION, // P3 outside 1
        ZONE_4_BASE_POSITION, // P4 middle-blocker 2
        ZONE_5_BASE_POSITION, // P5 opposite
        ZONE_6_BASE_POSITION, // P6 outside 2
      ],
      'serve': [
        ZONE_5_SERVICE_LINE_POSITION, // P1 middle-blocker 1
        ZONE_2_SERVE_STACK, // P2 setter
        ZONE_3_SERVE_STACK, // P3 outside 1
        ZONE_4_SERVE_STACK, // P4 middle-blocker 2
        BACKROW_SERVE_LEFT_STACK, // P5 opposite
        BACKROW_SERVE_RIGHT_STACK, // P6 outside 2
      ],
      'defensive-position': [
        ZONE_5_DEFENSIVE_BASE, // P1 middle-blocker 1
        ZONE_4_DEFENSIVE_BASE, // P2 setter
        ZONE_2_DEFENSIVE_BASE, // P3 outside 1
        ZONE_3_DEFENSIVE_BASE, // P4 middle-blocker 2
        ZONE_1_DEFENSIVE_BASE, // P5 opposite
        ZONE_6_DEFENSIVE_BASE, // P6 outside 2
      ],
    },
  },
}
