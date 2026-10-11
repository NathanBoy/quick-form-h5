import { describe, it, expect } from 'vitest'
import Device from './device'

describe('Device detection', () => {
  it('always returns a boolean for desktop detection', () => {
    expect(typeof Device.isPC()).toBe('boolean')
  })

  it('does not flag the default test UA as iOS or Android', () => {
    expect(Device.isIos()).toBe(false)
    expect(Device.isAndroid()).toBe(false)
  })
})
