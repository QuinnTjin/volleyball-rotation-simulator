import { defineConfig } from 'vitest/config'

// Separate from vite.config.ts: the app config wires the dev proxy and
// Tailwind plugin, neither of which the test run needs.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
