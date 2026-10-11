import { describe, it, expect, beforeEach } from 'vitest'
import { publishAdd, imageUpload, publishUpdate, publishGet } from './mock'

beforeEach(() => {
  window.localStorage.clear()
})

describe('localStorage mock backend', () => {
  it('creates and fetches a notice', async () => {
    const { id } = await publishAdd({ name: '张三' })
    expect(id).toBeTruthy()
    const record = await publishGet(id)
    expect(record.name).toBe('张三')
  })

  it('updates a notice', async () => {
    const { id } = await publishAdd({ name: '张三' })
    await publishUpdate({ id, desc: '已找到，平安' })
    const record = await publishGet(id)
    expect(record.desc).toBe('已找到，平安')
  })

  it('returns null for an unknown id', async () => {
    expect(await publishGet('does-not-exist')).toBe(null)
  })

  it('reads an uploaded file back as a data URL', async () => {
    const file = new File(['abc'], 'a.jpg', { type: 'image/jpeg' })
    const { url } = await imageUpload(file)
    expect(url).toMatch(/^data:image\/jpeg;base64,/)
  })
})
