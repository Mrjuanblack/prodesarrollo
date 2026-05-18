export const SPLASH_CONFIG = {
  alwaysShow: false,
  revisitThresholdMs: 3 * 24 * 60 * 60 * 1000,
  storageKey: "prodesarrollo:lastSplashShown",
  // Animation timeline (spin + slide + letters + tagline) ends around ~2940ms.
  // Hold + fadeOut bring the total on-screen time to ~6000ms.
  postAnimationHoldMs: 2460,
  fadeOutMs: 600,
  fadeOutEase: "inOutQuad",
  backgroundColor: "#FAF4F1",
  // Above GlobalLoader (z-9999) so the splash always covers it during the
  // initial auth-validate flash.
  zIndex: 10000,
  logoMaxWidthPx: 860,
  triangleSpinMs: 1100,
  triangleSlideMs: 700,
  letterRevealMs: 550,
  letterStaggerMs: 35,
  taglineFadeMs: 500,
} as const;

export function shouldShowSplash(now: number = Date.now()): boolean {
  if (SPLASH_CONFIG.alwaysShow) return true;
  if (typeof window === "undefined") return false;

  try {
    const raw = window.localStorage.getItem(SPLASH_CONFIG.storageKey);
    if (!raw) return true;
    const last = Number.parseInt(raw, 10);
    if (!Number.isFinite(last)) return true;
    return now - last >= SPLASH_CONFIG.revisitThresholdMs;
  } catch {
    return true;
  }
}

export function markSplashShown(now: number = Date.now()): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SPLASH_CONFIG.storageKey, String(now));
  } catch {
    // storage unavailable (private mode, quota) — silently skip
  }
}
