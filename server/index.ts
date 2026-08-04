import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { POSITION_OPTIONS } from '../src/roster'
import type { RosterPlayer } from '../src/roster'

const PORT = 3001

// Resolve the data file relative to this file, not the process working
// directory, so the server finds it no matter where npm was launched from.
const serverDirectory = path.dirname(fileURLToPath(import.meta.url))
const rosterFilePath = path.join(serverDirectory, 'data', 'roster.json')

const validPositions = new Set<string>(POSITION_OPTIONS.map((option) => option.value))

// Shape check only. Volleyball legality (one setter, two middles, ...) stays
// the client's concern via getRosterWarnings - the server happily stores a
// mid-edit roster that is temporarily illegal.
function isRosterPayload(body: unknown): body is RosterPlayer[] {
  if (!Array.isArray(body)) {
    return false
  }

  return body.every((entry) => {
    if (typeof entry !== 'object' || entry === null) {
      return false
    }

    const candidate = entry as Record<string, unknown>
    return (
      typeof candidate.id === 'string' &&
      typeof candidate.teamId === 'string' &&
      typeof candidate.name === 'string' &&
      typeof candidate.color === 'string' &&
      typeof candidate.isStarter === 'boolean' &&
      typeof candidate.position === 'string' &&
      validPositions.has(candidate.position)
    )
  })
}

const app = express()
app.use(express.json())

// Responds with the saved roster, or null when nothing has been saved yet -
// the client treats null as "keep the built-in default roster".
app.get('/api/roster', async (_request, response) => {
  try {
    const savedRosterJson = await readFile(rosterFilePath, 'utf8')
    response.type('json').send(savedRosterJson)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error
    }
    response.json(null)
  }
})

app.put('/api/roster', async (request, response) => {
  if (!isRosterPayload(request.body)) {
    response.status(400).json({ error: 'Expected an array of roster players.' })
    return
  }

  await mkdir(path.dirname(rosterFilePath), { recursive: true })
  await writeFile(rosterFilePath, JSON.stringify(request.body, null, 2))
  response.json({ savedPlayers: request.body.length })
})

app.listen(PORT, () => {
  console.log(`Roster API listening on http://localhost:${PORT}`)
})
