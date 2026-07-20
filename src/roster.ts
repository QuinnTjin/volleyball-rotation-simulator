export type PositionKey = 'setter' | 'opposite' | 'outside' | 'middle-blocker' | 'libero'

export type RosterPlayer = {
  id: number
  name: string
  position: PositionKey
  color: string
}

const POSITION_ABBREVIATIONS: Record<PositionKey, string> = {
  setter: 'S',
  opposite: 'OPP',
  outside: 'OH',
  'middle-blocker': 'MB',
  libero: 'L',
}

const POSITION_FULL_NAMES: Record<PositionKey, string> = {
  setter: 'Setter',
  opposite: 'Opposite',
  outside: 'Outside Hitter',
  'middle-blocker': 'Middle Blocker',
  libero: 'Libero',
}

const POSITION_COLORS: Record<PositionKey, string> = {
  setter: '#e63946',
  opposite: '#f4a261',
  outside: '#457b9d',
  'middle-blocker': '#2a9d8f',
  libero: '#ffb703',
}

// 7-player 5-1 roster: setter, opposite, 2 outsides, 2 middle blockers, libero.
// Ids double as the fixed serve-order lineup numbers used in rotations.ts
// (id 1-6 rotate through the court, id 7 is the libero, who never has a
// fixed slot and instead swaps in for whichever middle blocker is back row).
export const defaultRoster: RosterPlayer[] = [
  { id: 1, name: POSITION_FULL_NAMES.setter, position: 'setter', color: POSITION_COLORS.setter },
  { id: 2, name: POSITION_FULL_NAMES.outside, position: 'outside', color: POSITION_COLORS.outside },
  {
    id: 3,
    name: POSITION_FULL_NAMES['middle-blocker'],
    position: 'middle-blocker',
    color: POSITION_COLORS['middle-blocker'],
  },
  { id: 4, name: POSITION_FULL_NAMES.opposite, position: 'opposite', color: POSITION_COLORS.opposite },
  { id: 5, name: POSITION_FULL_NAMES.outside, position: 'outside', color: POSITION_COLORS.outside },
  {
    id: 6,
    name: POSITION_FULL_NAMES['middle-blocker'],
    position: 'middle-blocker',
    color: POSITION_COLORS['middle-blocker'],
  },
  { id: 7, name: POSITION_FULL_NAMES.libero, position: 'libero', color: POSITION_COLORS.libero },
]

// Positions with two roster slots (outside, middle-blocker) get a 1/2
// suffix based on roster order; single-slot positions (S, OPP, L) don't.
export function getPositionLabel(player: RosterPlayer, roster: RosterPlayer[]): string {
  const sharedPositionPlayers = roster.filter((rosterPlayer) => rosterPlayer.position === player.position)
  const abbreviation = POSITION_ABBREVIATIONS[player.position]

  if (sharedPositionPlayers.length <= 1) {
    return abbreviation
  }

  const numeral = sharedPositionPlayers.findIndex((rosterPlayer) => rosterPlayer.id === player.id) + 1
  return `${abbreviation}${numeral}`
}
