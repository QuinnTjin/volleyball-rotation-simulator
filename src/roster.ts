import type { Team } from './models'
import { defaultTeam } from './models'

export type PositionKey = 'setter' | 'opposite' | 'outside' | 'middle-blocker' | 'libero'

export type RotationSystem = '5-1' | '4-2' | '6-2'

export type RosterPlayer = {
  id: string
  teamId: Team['id']
  isStarter: boolean
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
// All seven default to starters: the six non-liberos form the serve order
// (rotations.ts derives their slots from position, so no per-player slot is
// stored here) and the libero swaps in for the back-row middle blocker. id is
// a globally-unique player identity - see models.ts for why it exists.
export const defaultRoster: RosterPlayer[] = [
  {
    id: 'player-1',
    teamId: defaultTeam.id,
    isStarter: true,
    name: POSITION_FULL_NAMES.setter,
    position: 'setter',
    color: CONVENTIONAL_POSITION_COLORS.setter,
  },
  {
    id: 'player-2',
    teamId: defaultTeam.id,
    isStarter: true,
    name: POSITION_FULL_NAMES.outside,
    position: 'outside',
    color: CONVENTIONAL_POSITION_COLORS.outside,
  },
  {
    id: 'player-3',
    teamId: defaultTeam.id,
    isStarter: true,
    name: POSITION_FULL_NAMES['middle-blocker'],
    position: 'middle-blocker',
    color: CONVENTIONAL_POSITION_COLORS['middle-blocker'],
  },
  {
    id: 'player-4',
    teamId: defaultTeam.id,
    isStarter: true,
    name: POSITION_FULL_NAMES.opposite,
    position: 'opposite',
    color: CONVENTIONAL_POSITION_COLORS.opposite,
  },
  {
    id: 'player-5',
    teamId: defaultTeam.id,
    isStarter: true,
    name: POSITION_FULL_NAMES.outside,
    position: 'outside',
    color: CONVENTIONAL_POSITION_COLORS.outside,
  },
  {
    id: 'player-6',
    teamId: defaultTeam.id,
    isStarter: true,
    name: POSITION_FULL_NAMES['middle-blocker'],
    position: 'middle-blocker',
    color: CONVENTIONAL_POSITION_COLORS['middle-blocker'],
  },
  {
    id: 'player-7',
    teamId: defaultTeam.id,
    isStarter: true,
    name: POSITION_FULL_NAMES.libero,
    position: 'libero',
    color: CONVENTIONAL_POSITION_COLORS.libero,
  },
]

// Exact position counts for the six on-court starters of each system.
// Exact, not minimums - six starters with three outsides and one middle
// isn't a small 5-1, it's a different system this app doesn't model. The
// libero is excluded because they're an optional seventh starter, never
// one of the six in the serve order.
//
// 4-2 and 6-2 both run two setters (placed opposite each other in the
// rotation, taking the slot a 5-1's dedicated Opposite would occupy) and no
// dedicated Opposite - see rotations.ts SERVE_ORDER_TEMPLATES.
const STARTER_POSITION_REQUIREMENTS: Record<RotationSystem, Record<Exclude<PositionKey, 'libero'>, number>> = {
  '5-1': { setter: 1, opposite: 1, outside: 2, 'middle-blocker': 2 },
  '4-2': { setter: 2, opposite: 0, outside: 2, 'middle-blocker': 2 },
  '6-2': { setter: 2, opposite: 0, outside: 2, 'middle-blocker': 2 },
}

export const MAX_ROSTER_SIZE = 12

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six']

// Human-readable warnings for every way the starters differ from a legal
// lineup for the given system, e.g. "A 5-1 lineup needs two starting
// Middle Blockers." An empty result means the starting lineup is valid and
// the court can render.
export function getRosterWarnings(roster: RosterPlayer[], system: RotationSystem): string[] {
  const starters = roster.filter((rosterPlayer) => rosterPlayer.isStarter)
  const warnings: string[] = []
  const requirements = STARTER_POSITION_REQUIREMENTS[system]

  for (const position of Object.keys(requirements) as Exclude<PositionKey, 'libero'>[]) {
    const required = requirements[position]
    const starterCount = starters.filter((rosterPlayer) => rosterPlayer.position === position).length

    if (starterCount === required) {
      continue
    }

    const label = POSITION_FULL_NAMES[position]
    const plural = required !== 1 ? 's' : ''
    warnings.push(
      starterCount < required
        ? `A ${system} lineup needs ${NUMBER_WORDS[required]} starting ${label}${plural}.`
        : `A ${system} lineup can only have ${NUMBER_WORDS[required]} starting ${label}${plural}.`,
    )
  }

  const liberoStarterCount = starters.filter((rosterPlayer) => rosterPlayer.position === 'libero').length
  if (liberoStarterCount > 1) {
    warnings.push('A lineup can only have one starting Libero.')
  }

  return warnings
}

// A fresh bench player for the "Add Player" button. Name, position, and
// color are just editable defaults; crypto.randomUUID keeps the id unique
// no matter how many players are added.
export function createBenchPlayer(roster: RosterPlayer[]): RosterPlayer {
  return {
    id: crypto.randomUUID(),
    teamId: defaultTeam.id,
    isStarter: false,
    name: `Player ${roster.length + 1}`,
    position: 'outside',
    color: COLOR_PALETTE[roster.length % COLOR_PALETTE.length],
  }
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
