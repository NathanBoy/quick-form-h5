/**
 * Runtime configuration.
 *
 * The API layer (`src/services/api.js`) reads this to decide where
 * requests go. Three modes are supported:
 *
 *   'local'   in-browser localStorage mock (default) — `npm run dev`
 *             alone is enough, no server needed.
 *
 *   'server'  a local mock HTTP server — run `npm run mock` first,
 *             requests hit `baseURL` (Express, see `server/`).
 *
 *   'remote'  your own backend — point `baseURL` at it and implement
 *             the endpoints described in `src/services/api.js`.
 */
export default {
  // 'local' | 'server' | 'remote'
  mock: 'local',

  // Base URL of the backend, used when `mock` is 'server' or 'remote'.
  baseURL: 'http://localhost:8081'
}
