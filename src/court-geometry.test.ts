import { describe, expect, it } from 'vitest'
import { CANVAS_HEIGHT_PX, CANVAS_WIDTH_PX, metersToPixels, pixelsToMeters, regionOf } from './court-geometry'

// Canonical zone-center reference points (textbook 9m x 9m court: front row
// 0-3m deep, back row 3-9m deep, three 3m-wide columns at x = -3, 0, 3).
// These pin the projection math itself and are independent of the mockup's
// actual Base Zone data (COURT_SLOTS), which is tested where it's consumed.
const CANONICAL_ZONE_CENTERS_M = {
  p2: { x: 3, y: 1.5 }, // front right
  p3: { x: 0, y: 1.5 }, // front middle
  p4: { x: -3, y: 1.5 }, // front left
  p1: { x: 3, y: 6 }, // back right
  p6: { x: 0, y: 6 }, // back middle
  p5: { x: -3, y: 6 }, // back left
}

describe('metersToPixels / pixelsToMeters', () => {
  it('places the net line landmarks at the expected pixels', () => {
    expect(metersToPixels({ x: 0, y: 0 })).toEqual({ x: 250, y: 40 })
    expect(metersToPixels({ x: -4.5, y: 0 })).toEqual({ x: 64, y: 40 })
    expect(metersToPixels({ x: 4.5, y: 0 })).toEqual({ x: 436, y: 40 })
  })

  it('places the attack line at the expected pixels', () => {
    expect(metersToPixels({ x: 0, y: 3 })).toEqual({ x: 250, y: 164 })
  })

  it('places both sidelines at the expected pixels', () => {
    expect(metersToPixels({ x: -4.5, y: 4.5 })).toEqual({ x: 64, y: 226 })
    expect(metersToPixels({ x: 4.5, y: 4.5 })).toEqual({ x: 436, y: 226 })
  })

  it('places the endline at the expected pixels', () => {
    expect(metersToPixels({ x: 0, y: 9 })).toEqual({ x: 250, y: 412 })
  })

  it('places each of the six P-slot centers at the expected pixels', () => {
    expect(metersToPixels(CANONICAL_ZONE_CENTERS_M.p1)).toEqual({ x: 374, y: 288 })
    expect(metersToPixels(CANONICAL_ZONE_CENTERS_M.p2)).toEqual({ x: 374, y: 102 })
    expect(metersToPixels(CANONICAL_ZONE_CENTERS_M.p3)).toEqual({ x: 250, y: 102 })
    expect(metersToPixels(CANONICAL_ZONE_CENTERS_M.p4)).toEqual({ x: 126, y: 102 })
    expect(metersToPixels(CANONICAL_ZONE_CENTERS_M.p5)).toEqual({ x: 126, y: 288 })
    expect(metersToPixels(CANONICAL_ZONE_CENTERS_M.p6)).toEqual({ x: 250, y: 288 })
  })

  it('places a point inside the service zone at the expected pixels', () => {
    expect(metersToPixels({ x: 3, y: 10.5 })).toEqual({ x: 374, y: 474 })
  })

  it('round-trips pixels back to the original meters for every landmark', () => {
    const landmarks = [
      { x: 0, y: 0 },
      { x: -4.5, y: 0 },
      { x: 4.5, y: 0 },
      { x: 0, y: 3 },
      { x: 0, y: 9 },
      { x: 3, y: 10.5 },
      ...Object.values(CANONICAL_ZONE_CENTERS_M),
    ]

    for (const meters of landmarks) {
      const roundTripped = pixelsToMeters(metersToPixels(meters))
      expect(roundTripped.x).toBeCloseTo(meters.x, 10)
      expect(roundTripped.y).toBeCloseTo(meters.y, 10)
    }
  })

  it('leaves the most canvas room behind the endline', () => {
    const { y: endlineY } = metersToPixels({ x: 0, y: 9 })
    const { y: netY } = metersToPixels({ x: 0, y: 0 })
    const { x: leftSidelineX } = metersToPixels({ x: -4.5, y: 0 })
    const { x: rightSidelineX } = metersToPixels({ x: 4.5, y: 0 })

    const marginBehindEndline = CANVAS_HEIGHT_PX - endlineY
    const marginAboveNet = netY
    const marginLeftOfCourt = leftSidelineX
    const marginRightOfCourt = CANVAS_WIDTH_PX - rightSidelineX

    expect(marginBehindEndline).toBeGreaterThan(marginAboveNet)
    expect(marginBehindEndline).toBeGreaterThan(marginLeftOfCourt)
    expect(marginBehindEndline).toBeGreaterThan(marginRightOfCourt)
  })
})

describe('regionOf', () => {
  it('classifies a point on the court as court', () => {
    expect(regionOf({ x: 0, y: 4.5 })).toBe('court')
  })

  it('classifies a point in the service zone as service-zone', () => {
    expect(regionOf({ x: 3, y: 10.5 })).toBe('service-zone')
  })

  it('classifies a point beyond the sidelines as free-zone', () => {
    expect(regionOf({ x: 6, y: 4.5 })).toBe('free-zone')
  })

  it('classifies a point beyond the service zone as free-zone', () => {
    expect(regionOf({ x: 0, y: 13 })).toBe('free-zone')
  })

  it('treats the court/service-zone boundary as exclusive to court, inclusive to service-zone', () => {
    expect(regionOf({ x: 0, y: 9 })).toBe('court')
    expect(regionOf({ x: 0, y: 9.01 })).toBe('service-zone')
  })
})
