import { describe, expect, it } from 'vitest'
import { buildRotations, ROTATION_COUNT } from './rotations'
import { defaultRoster } from './roster'

// US rules (NFHS/USAV/NCAA): the libero may serve, but only in one
// designated player's spot in the serve order for the whole set - see
// rotations.ts buildRotations for why "swap for whichever middle blocker is
// back-row" alone isn't enough to guarantee that.
describe('buildRotations libero handling (US rules: libero may serve)', () => {
  const rotations = buildRotations(defaultRoster, '5-1')
  const libero = defaultRoster.find((player) => player.position === 'libero')!
  const middleBlockers = defaultRoster.filter((player) => player.position === 'middle-blocker')

  it('has exactly six rotations', () => {
    expect(rotations).toHaveLength(ROTATION_COUNT)
  })

  it('puts the libero on court in five of the six rotations', () => {
    const rotationsWithLiberoOnCourt = rotations.filter((rotation) =>
      rotation.onCourt.some((courtPlayer) => courtPlayer.playerId === libero.id),
    )
    expect(rotationsWithLiberoOnCourt).toHaveLength(5)
  })

  it('benches a middle blocker in five rotations and the libero herself in the sixth', () => {
    const benchedIds = rotations.map((rotation) => rotation.benchedStarterId)
    expect(benchedIds.every((id) => id !== undefined)).toBe(true)

    const benchedMiddleBlockerCount = benchedIds.filter((id) =>
      middleBlockers.some((middle) => middle.id === id),
    ).length
    const benchedLiberoCount = benchedIds.filter((id) => id === libero.id).length

    expect(benchedMiddleBlockerCount).toBe(5)
    expect(benchedLiberoCount).toBe(1)
  })

  it('places the libero in the P1 (serving) slot in exactly one rotation', () => {
    const rotationsWithLiberoAtP1 = rotations.filter((rotation) => rotation.onCourt[0].playerId === libero.id)
    expect(rotationsWithLiberoAtP1).toHaveLength(1)
  })

  it('has the non-designated middle blocker serve for herself in the rotation the libero sits out', () => {
    const rotationWhereLiberoSitsOut = rotations.find((rotation) => rotation.benchedStarterId === libero.id)!
    const serverId = rotationWhereLiberoSitsOut.onCourt[0].playerId
    expect(middleBlockers.some((middle) => middle.id === serverId)).toBe(true)
  })
})
