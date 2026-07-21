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

// The only colors a player's dot may be. The color picker renders these as
// a row of swatches instead of a free-form color input.
export const COLOR_PALETTE: string[] = [
  '#4e1d4c',
  '#d1b0a7',
  '#f99d1b',
  '#12354e',
  '#437742',
  '#ca92a8',
  '#da525d',
  '#00b49b',
]

// Conventional per-position color, used only to seed each default player's
// own `color` below. Once seeded, a player's color is independent - editing
// one player's color never touches another's, even if they share a position.
const CONVENTIONAL_POSITION_COLORS: Record<PositionKey, string> = {
  setter: '#ca92a8',
  opposite: '#f99d1b',
  outside: '#12354e',
  'middle-blocker': '#437742',
  libero: '#da525d',
}

// 7-player 5-1 roster: setter, opposite, 2 outsides, 2 middle blockers, libero.
// Ids double as the fixed serve-order lineup numbers used in rotations.ts
// (id 1-6 rotate through the court, id 7 is the libero, who never has a
// fixed slot and instead swaps in for whichever middle blocker is back row).
export const defaultRoster: RosterPlayer[] = [
  { id: 1, name: POSITION_FULL_NAMES.setter, position: 'setter', color: CONVENTIONAL_POSITION_COLORS.setter },
  { id: 2, name: POSITION_FULL_NAMES.outside, position: 'outside', color: CONVENTIONAL_POSITION_COLORS.outside },
  {
    id: 3,
    name: POSITION_FULL_NAMES['middle-blocker'],
    position: 'middle-blocker',
    color: CONVENTIONAL_POSITION_COLORS['middle-blocker'],
  },
  { id: 4, name: POSITION_FULL_NAMES.opposite, position: 'opposite', color: CONVENTIONAL_POSITION_COLORS.opposite },
  { id: 5, name: POSITION_FULL_NAMES.outside, position: 'outside', color: CONVENTIONAL_POSITION_COLORS.outside },
  {
    id: 6,
    name: POSITION_FULL_NAMES['middle-blocker'],
    position: 'middle-blocker',
    color: CONVENTIONAL_POSITION_COLORS['middle-blocker'],
  },
  { id: 7, name: POSITION_FULL_NAMES.libero, position: 'libero', color: CONVENTIONAL_POSITION_COLORS.libero },
]

// How many players each position needs for a valid 5-1 rotation: one
// setter, one opposite, one libero, two outsides, two middle blockers. The
// bench/libero swap math in rotations.ts assumes exactly this shape, so a
// roster that falls short of these counts can't be rotated correctly.
const POSITION_REQUIREMENTS: Record<PositionKey, number> = {
  setter: 1,
  opposite: 1,
  outside: 2,
  'middle-blocker': 2,
  libero: 1,
}

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six']

// Whether the roster has enough players at every position to rotate.
export function hasValidRotationRoster(roster: RosterPlayer[]): boolean {
  return (Object.keys(POSITION_REQUIREMENTS) as PositionKey[]).every(
    (position) => roster.filter((rosterPlayer) => rosterPlayer.position === position).length >=
      POSITION_REQUIREMENTS[position],
  )
}

// Human-readable warnings for every position that's short of the players a
// 5-1 rotation needs, e.g. "5-1 rotation requires one Setter." or "5-1
// rotation requires two Middle Blockers."
export function getRosterWarnings(roster: RosterPlayer[]): string[] {
  const warnings: string[] = []

  for (const position of Object.keys(POSITION_REQUIREMENTS) as PositionKey[]) {
    const required = POSITION_REQUIREMENTS[position]
    const currentCount = roster.filter((rosterPlayer) => rosterPlayer.position === position).length

    if (currentCount >= required) {
      continue
    }

    const label = POSITION_FULL_NAMES[position]
    const plural = required > 1 ? 's' : ''
    warnings.push(`5-1 rotation requires ${NUMBER_WORDS[required]} ${label}${plural}.`)
  }

  return warnings
}

// Dropdown options for the position <select>, labeled with the full name.
export const POSITION_OPTIONS: { value: PositionKey; label: string }[] = (
  Object.keys(POSITION_FULL_NAMES) as PositionKey[]
).map((position) => ({ value: position, label: POSITION_FULL_NAMES[position] }))

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
