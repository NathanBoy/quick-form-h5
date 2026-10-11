/**
 * A tiny localStorage-backed mock backend.
 *
 * It lets the whole publish flow run end-to-end with no server at all,
 * which is the default behaviour of the project (`config.mock === 'local'`).
 *
 * Data is persisted in `localStorage` under a single key, so refreshes
 * and re-opens keep working within the same browser.
 */

const STORAGE_KEY = 'quick_form_h5_notices'

function readAll () {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || []
  } catch (e) {
    return []
  }
}

function writeAll (list) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

function find (id) {
  return readAll().find(item => item.id === id)
}

/**
 * Create a notice. Resolves `{ id }`.
 */
export function publishAdd (data) {
  return new Promise(resolve => {
    const id = 'notice_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8)
    const record = Object.assign({}, data, { id })
    const list = readAll()
    list.unshift(record)
    writeAll(list)
    resolve({ id })
  })
}

/**
 * "Upload" an image by reading it as a data URL and storing it on the notice.
 * Resolves `{ url }`.
 */
export function imageUpload (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const id = file.name
      const list = readAll()
      // Keep the latest upload per file name so a re-upload just works.
      const record = list.find(item => item.__uploadName === id) || { __uploadName: id }
      record.__imgData = reader.result
      writeAll(list)
      resolve({ url: reader.result })
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Update a notice's description / image. Resolves the updated record.
 */
export function publishUpdate (payload) {
  return new Promise(resolve => {
    const list = readAll()
    const target = list.find(item => item.id === payload.id)
    if (target) {
      Object.assign(target, payload)
      writeAll(list)
      resolve(target)
    } else {
      resolve(payload)
    }
  })
}

/**
 * Fetch a single notice by id. Resolves the record or `null`.
 */
export function publishGet (id) {
  return Promise.resolve(find(id) || null)
}
