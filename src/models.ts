export interface User {
  id: string
  email: string
  displayName: string
  createdAt: string // ISO 8601
}

export interface Team {
  id: string
  ownerId: User['id']
  name: string
  createdAt: string
}

// Stand-ins for the login + team-picker UI that doesn't exist yet. Every
// seeded RosterPlayer in roster.ts belongs to this team.
export const defaultUser: User = {
  id: 'user-1',
  email: 'coach@example.com',
  displayName: 'Coach',
  createdAt: '2026-07-24T00:00:00.000Z',
}

export const defaultTeam: Team = {
  id: 'team-1',
  ownerId: defaultUser.id,
  name: 'My Team',
  createdAt: '2026-07-24T00:00:00.000Z',
}
