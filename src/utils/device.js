/**
 * Lightweight device detection utilities.
 *
 * Replaces the former dependency on a proprietary browser-detection
 * library with a few simple, dependency-free helpers.
 */
export default class Device {
  /** True on desktop browsers (no touch primary). */
  static isPC () {
    return !('ontouchstart' in window) && !navigator.maxTouchPoints
  }

  /** True on iOS (iPhone / iPad / iPod). */
  static isIos () {
    return /iP(hone|ad|od)/i.test(navigator.userAgent)
  }

  /** True on Android. */
  static isAndroid () {
    return /Android/i.test(navigator.userAgent)
  }
}
