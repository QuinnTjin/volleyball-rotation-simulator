export type PlayerPosition = {
  number: number
  x: number
  y: number
}

// Fixed court spots P1-P6 (standard volleyball numbering).
// P1 = back right (server), going P2 front right, P3 front middle,
// P4 front left, P5 back left, P6 back middle.
const SLOTS = [
  { x: 300, y: 300 }, // P1
  { x: 300, y: 60 },  // P2
  { x: 180, y: 60 },  // P3
  { x: 60, y: 60 },   // P4
  { x: 60, y: 300 },  // P5
  { x: 180, y: 300 }, // P6
]

// Rotation 1: player n starts at position Pn.
const BASE_LINEUP = [1, 2, 3, 4, 5, 6]

// Each rotation shifts every player one slot in serve order
// (P2->P1, P1->P6, P6->P5, P5->P4, P4->P3, P3->P2), which is the
// same as rotating the lineup array left by one each time.
export const rotations: PlayerPosition[][] = Array.from({ length: 6 }, (_, rotationOffset) => {
  const lineup = [...BASE_LINEUP.slice(rotationOffset), ...BASE_LINEUP.slice(0, rotationOffset)]
  return SLOTS.map((slot, slotIndex) => ({ number: lineup[slotIndex], x: slot.x, y: slot.y }))
})
