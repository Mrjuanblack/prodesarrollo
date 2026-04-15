"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import {
  SPLASH_CONFIG,
  markSplashShown,
  shouldShowSplash,
} from "./splash-config";
import LogoAnimation from "./logo-animation";

export default function SplashOverlay() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    if (shouldShowSplash()) {
      markSplashShown();
      setVisible(true);
    }
  }, []);

  const handleAnimationComplete = useCallback(() => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;

    const overlay = overlayRef.current;
    if (!overlay) {
      setVisible(false);
      return;
    }

    const fadeOut = () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        setVisible(false);
        return;
      }

      animate(overlay, {
        opacity: [1, 0],
        duration: SPLASH_CONFIG.fadeOutMs,
        ease: SPLASH_CONFIG.fadeOutEase,
        onComplete: () => setVisible(false),
      });
    };

    window.setTimeout(fadeOut, SPLASH_CONFIG.postAnimationHoldMs);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: SPLASH_CONFIG.backgroundColor,
        zIndex: SPLASH_CONFIG.zIndex,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LogoAnimation onComplete={handleAnimationComplete} />
    </div>
  );
}
