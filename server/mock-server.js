/**
 * A tiny local mock server for quick-form-h5.
 *
 * Implements the HTTP contract described in `src/services/api.js` so the
 * app can run against a real HTTP layer during development, without
 * needing your own backend.
 *
 * Usage:
 *   npm run mock
 *   → serves on http://localhost:8081
 *
 * Then set `src/config.js` `mock: 'server'` (or 'remote') to use it.
 *
 * Data is held in memory, so it resets whenever the server restarts —
 * that is fine for a mock.
 */

const express = require('express')
const multer = require('multer')

const PORT = 8081
const app = express()

// Allow the dev server (or any origin) to call this from the browser.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.use(express.json())

// In-memory store.
const notices = []
let nextId = 1

const upload = multer({ storage: multer.memoryStorage() })

// Create a notice.            -> { id }
app.post('/notices', (req, res) => {
  const record = Object.assign({}, req.body, { id: 'notice_' + (nextId++) })
  notices.unshift(record)
  res.json({ id: record.id })
})

// Upload an image (FormData "file"). -> { url }
// For simplicity the mock returns the image as a base64 data URL.
app.post('/notices/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'no file provided' })
  const url = 'data:' + req.file.mimetype + ';base64,' + req.file.buffer.toString('base64')
  res.json({ url })
})

// Update a notice's desc / image.     -> record
app.put('/notices/:id', (req, res) => {
  const target = notices.find(n => n.id === req.params.id)
  if (target) Object.assign(target, req.body)
  res.json(target || req.body)
})

// Fetch a single notice.              -> record | null
app.get('/notices/:id', (req, res) => {
  res.json(notices.find(n => n.id === req.params.id) || null)
})

app.listen(PORT, () => {
  console.log('quick-form-h5 mock server running at http://localhost:' + PORT)
})
