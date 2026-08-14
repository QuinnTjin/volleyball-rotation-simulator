// Court coordinate space, named regions, and the meters<->pixels projection.
// This is the only module in the repo that knows the mapping between real-
// world court measurements (meters) and SVG/CSS pixels; every other module
// that needs a position works in meters via CourtPoint.
//
// Origin is the center of the net line. x runs along the net, -4.5 (left
// sideline) to +4.5 (right sideline). y runs away from the net into this
// team's half: 0 at the net, 3 at the attack line, 9 at the endline. Points
// beyond the court boundary are legal and expected - see Region below.
export type CourtPoint = { x: number; y: number }

// A point in the outer <div>'s absolute-position pixel space, i.e. what
// PlayerDot's `left`/`top` and the court SVG's viewBox both use.
export type PixelPoint = { x: number; y: number }

export type Region = 'court' | 'service-zone' | 'free-zone'

const COURT_HALF_WIDTH_M = 4.5
const COURT_LENGTH_M = 9 // net to endline
export const ATTACK_LINE_DISTANCE_M = 3 // net to attack line
const SERVICE_ZONE_DEPTH_M = 3 // endline to the back of the drawn service zone

// Same scale the mockup's 400x400 court box implied (372px boundary = 9m),
// preserved so dot sizing (PlayerDot) and existing visual proportions don't
// shift - only the canvas around the court grows, not the court itself.
const SCALE_PX_PER_METER = 372 / 9

// Where meters (0, 0) - the center of the net line - lands in pixel space.
// Chosen to leave the most room behind the endline (server's service zone
// and the free zone beyond it), less room on the sides, and just enough
// above the net for the net line to read clearly - see Court.tsx.
const NET_CENTER_X_PX = 250
const NET_Y_PX = 40

export const CANVAS_WIDTH_PX = 500
export const CANVAS_HEIGHT_PX = 580

export function metersToPixels(point: CourtPoint): PixelPoint {
  return {
    x: NET_CENTER_X_PX + point.x * SCALE_PX_PER_METER,
    y: NET_Y_PX + point.y * SCALE_PX_PER_METER,
  }
}

export function pixelsToMeters(point: PixelPoint): CourtPoint {
  return {
    x: (point.x - NET_CENTER_X_PX) / SCALE_PX_PER_METER,
    y: (point.y - NET_Y_PX) / SCALE_PX_PER_METER,
  }
}

// Named regions every stored point must fall into exactly one of. Court and
// service-zone share the same left/right bounds and sit on disjoint,
// touching y-ranges, so this partition is exhaustive and non-overlapping by
// construction - anything not in either is free-zone.
export function regionOf(point: CourtPoint): Region {
  const withinCourtWidth = Math.abs(point.x) <= COURT_HALF_WIDTH_M

  if (withinCourtWidth && point.y >= 0 && point.y <= COURT_LENGTH_M) {
    return 'court'
  }

  if (withinCourtWidth && point.y > COURT_LENGTH_M && point.y <= COURT_LENGTH_M + SERVICE_ZONE_DEPTH_M) {
    return 'service-zone'
  }

  return 'free-zone'
}

// COURT_SLOTS (rotations.ts) predates this module and is expressed in the
// original 400x400 mockup's pixel space: net center at (200, 14), same
// 372px/9m scale as SCALE_PX_PER_METER above (only the *origin* moved when
// the canvas grew to fit the free zone, not the scale). rotations.ts is
// off-limits to edit beyond its Deliverable 0 libero fix, so Base Zone is
// converted from that legacy space on the fly (see phases.ts) rather than
// baked in; the one-off seed-data generator script converts the same way.
const LEGACY_MOCKUP_NET_CENTER_X_PX = 200
const LEGACY_MOCKUP_NET_Y_PX = 14

export function legacyMockupPixelsToMeters(point: PixelPoint): CourtPoint {
  return {
    x: (point.x - LEGACY_MOCKUP_NET_CENTER_X_PX) / SCALE_PX_PER_METER,
    y: (point.y - LEGACY_MOCKUP_NET_Y_PX) / SCALE_PX_PER_METER,
  }
}

// Landmarks used by Court.tsx to draw court chrome (boundary, net, attack
// line, zone grid) and by tests to pin known positions.
export const COURT_LANDMARKS = {
  netLeft: { x: -COURT_HALF_WIDTH_M, y: 0 },
  netRight: { x: COURT_HALF_WIDTH_M, y: 0 },
  attackLineLeft: { x: -COURT_HALF_WIDTH_M, y: ATTACK_LINE_DISTANCE_M },
  attackLineRight: { x: COURT_HALF_WIDTH_M, y: ATTACK_LINE_DISTANCE_M },
  endlineLeft: { x: -COURT_HALF_WIDTH_M, y: COURT_LENGTH_M },
  endlineRight: { x: COURT_HALF_WIDTH_M, y: COURT_LENGTH_M },
  serviceZoneLeft: { x: -COURT_HALF_WIDTH_M, y: COURT_LENGTH_M + SERVICE_ZONE_DEPTH_M },
  serviceZoneRight: { x: COURT_HALF_WIDTH_M, y: COURT_LENGTH_M + SERVICE_ZONE_DEPTH_M },
} as const
