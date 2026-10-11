/**
 * Native share helper.
 *
 * Uses the Web Share API when available and falls back gracefully on
 * platforms that do not support it (where the UI simply shows its own
 * "how to share" tip instead). No third-party / vendor SDK involved.
 */

function fallbackShare () {
  // On browsers without `navigator.share`, the caller can fall back to
  // prompting the user to share the current URL manually.
  return Promise.resolve(false)
}

export default class Share {
  /**
   * Kept for backward compatibility. Historically this wired up a
   * proprietary share SDK; it is now a no-op by design.
   */
  static init () {}

  /**
   * Share the given content through the native share sheet.
   *
   * @param {{title?: string, text?: string, url?: string}} config
   * @returns {Promise<boolean>} whether the native sheet was used
   */
  static share (config = {}) {
    const payload = {
      title: config.title || document.title,
      text: config.text || '',
      url: config.url || window.location.href
    }

    if (navigator.share) {
      return navigator.share(payload).then(() => true).catch(() => false)
    }
    return fallbackShare()
  }
}
