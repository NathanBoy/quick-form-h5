/**
 * API layer.
 *
 * Every page talks to these functions instead of calling HTTP directly,
 * so the UI is fully decoupled from the transport. The target is chosen
 * by `config.mock`:
 *
 *   'local'   served by the in-browser localStorage mock (`./mock.js`)
 *   'server'  served by the local Express mock server (`server/`)
 *   'remote'  served by your own backend through axios
 *
 * Expected backend endpoints (shared by 'server' and 'remote'):
 *   POST  {baseURL}/notices            -> { id }              create a notice
 *   POST  {baseURL}/notices/upload     -> { url }             upload an image (FormData)
 *   PUT   {baseURL}/notices/:id        -> record              update desc / image
 *   GET   {baseURL}/notices/:id        -> record              fetch a notice
 */

import axios from 'axios'
import config from '@/config'
import * as localMock from './mock'

function http () {
  return axios.create({ baseURL: config.baseURL })
}

function viaHttp (fn) {
  // 'server' and 'remote' both speak the same HTTP contract.
  return fn()
}

/** Create a notice. Resolves `{ id }`. */
export function publishAdd (data) {
  if (config.mock === 'local') return localMock.publishAdd(data)
  return viaHttp(() => http().post('/notices', data).then(res => res.data))
}

/** Upload an image. Resolves `{ url }`. */
export function imageUpload (file) {
  if (config.mock === 'local') return localMock.imageUpload(file)
  const formData = new FormData()
  formData.append('file', file, file.name)
  return viaHttp(() => http().post('/notices/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data))
}

/** Update a notice's description / image. Resolves the updated record. */
export function publishUpdate (payload) {
  if (config.mock === 'local') return localMock.publishUpdate(payload)
  return viaHttp(() => http().put(`/notices/${payload.id}`, payload).then(res => res.data))
}

/** Fetch a single notice by id. Resolves the record. */
export function publishGet (id) {
  if (config.mock === 'local') return localMock.publishGet(id)
  return viaHttp(() => http().get(`/notices/${id}`).then(res => res.data))
}
