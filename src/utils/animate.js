/**
 * Route enter / leave animations.
 *
 * Animations can be customised freely, see the original docs of AniX:
 * https://a-jie.github.io/AniX/
 *
 * Note: iOS gets the real transitions; other platforms fall back to a
 * plain cut for maximum compatibility (old Android WebViews animate
 * poorly).
 */

import { AniX } from 'anix'
import Device from './device'

export default class Animate {
  // Slide up ----------------------------------------------------------
  static pullUp = {
    enter (el, done) {
      AniX.fromTo(el, .75,
        AniX.get({ x: 0, y: 1000, z: 1, normal: { opacity: 1 } }),
        AniX.get({ x: 0, y: 0, z: 0, normal: { opacity: 1, onComplete: done } }))
    },

    leave (el, done) {
      AniX.to(el, .75, AniX.get({ x: 0, y: -1000, normal: { opacity: 0, onComplete: done } }))
    }
  }

  // Scale -------------------------------------------------------------
  static scale = {
    enter (el, done) {
      AniX.fromTo(el, .5,
        AniX.get({ scale: 0.3, z: 1, normal: { opacity: 0 } }),
        AniX.get({ scale: 1, z: 0, normal: { opacity: 1, onComplete: done } }))
    },

    leave (el, done) {
      AniX.to(el, .5, AniX.get({ scale: 0.3, normal: { opacity: 0, onComplete: done } }))
    }
  }

  // Rotate ------------------------------------------------------------
  static rotate = {
    enter (el, done) {
      AniX.fromTo(el, .5,
        AniX.get({ scale: 0.3, y: 500, rotate: 90, z: 1, normal: { opacity: 0 } }),
        AniX.get({ scale: 1, y: 0, rotate: 0, z: 0, normal: { opacity: 1, onComplete: done } }))
    },

    leave (el, done) {
      AniX.to(el, .5, AniX.get({ scale: 0.3, y: -500, rotate: -90, normal: { opacity: 0, onComplete: done } }))
    }
  }

  // Custom — tweak freely --------------------------------------------
  static custom = {
    enter (el, done) {
      AniX.fromTo(el, .5,
        AniX.get({ scale: 0.3, y: 500, z: 1, normal: { opacity: 0 } }),
        AniX.get({ scale: 1, y: 0, z: 0, normal: { opacity: 1, onComplete: done } }))
    },

    leave (el, done) {
      AniX.to(el, .5, AniX.get({ scale: 0.3, y: -500, normal: { opacity: 0, onComplete: done } }))
    }
  }

  // No animation -------------------------------------------------------
  static none = {
    enter (el, done) { done() },
    leave (el, done) { done() }
  }

  /**
   * Pick an animation set. iOS uses the requested one, everything else
   * falls back to a plain cut for compatibility.
   */
  static adapter (animate) {
    if (Device.isIos()) {
      return typeof animate === 'string' ? this[animate] : animate
    }
    return this.none
  }
}
