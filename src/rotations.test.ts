import { describe, expect, it } from 'vitest'
import { buildRotations, ROTATION_COUNT } from './rotations'
import { defaultRoster } from './roster'

// US rules (NFHS/USAV/NCAA): the libero may serve, but only in one
// designated player's spot in the serve order for the whole set - see
// rotations.ts buildRotations for why "swap for whichever middle blocker is
// back-row" alone isn't enough to guarantee that.
describe('buildRotations libero handling (US rules: libero may serve)', () => {
  const libero = defaultRoster.find((player) => player.position === 'libero')!
  const middleBlockers = defaultRoster.filter((player) => player.position === 'middle-blocker')

  // Serve mode: the libero can only serve in one designated middle's spot, so
  // when the *other* middle rotates to P1 she must serve for herself and the
  // libero sits that single rotation out.
  describe('serve mode', () => {
    const rotations = buildRotations(defaultRoster, '5-1', 'serve')

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

  // Receive mode: our P1 isn't serving, so the serve-spot constraint doesn't
  // bind - the libero swaps in for the back-row middle in every rotation,
  // including the one she has to sit out while that middle serves.
  describe('receive mode', () => {
    const rotations = buildRotations(defaultRoster, '5-1', 'receive')

    it('puts the libero on court in all six rotations', () => {
      const rotationsWithLiberoOnCourt = rotations.filter((rotation) =>
        rotation.onCourt.some((courtPlayer) => courtPlayer.playerId === libero.id),
      )
      expect(rotationsWithLiberoOnCourt).toHaveLength(ROTATION_COUNT)
    })

    it('benches a middle blocker in every rotation and never the libero', () => {
      const benchedIds = rotations.map((rotation) => rotation.benchedStarterId)

      const benchedMiddleBlockerCount = benchedIds.filter((id) =>
        middleBlockers.some((middle) => middle.id === id),
      ).length

      expect(benchedMiddleBlockerCount).toBe(ROTATION_COUNT)
      expect(benchedIds).not.toContain(libero.id)
    })

    it('swaps the libero in for the back-row middle in the rotation she sits out during serve mode', () => {
      const serveRotations = buildRotations(defaultRoster, '5-1', 'serve')
      const sitOutIndex = serveRotations.findIndex((rotation) => rotation.benchedStarterId === libero.id)

      // In serve mode that rotation has the non-designated middle serving for
      // herself at P1. In receive mode she yields that P1 slot to the libero
      // and is the one benched instead.
      const servingMiddleId = serveRotations[sitOutIndex].onCourt[0].playerId
      expect(middleBlockers.some((middle) => middle.id === servingMiddleId)).toBe(true)
      expect(rotations[sitOutIndex].onCourt[0].playerId).toBe(libero.id)
      expect(rotations[sitOutIndex].benchedStarterId).toBe(servingMiddleId)
    })
  })
})
