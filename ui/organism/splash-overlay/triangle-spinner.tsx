"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { SPLASH_CONFIG } from "./splash-config";

const TRIANGLE_PATH =
  "M102.4,164.09l190.91,0.75l-95.35,169.34l-1.63-1.31l-94.47-167.78L102.4,164.09z M152.88,174.38h-34.07l55.14,98.04l19.75-35.95l-31.05-56.17C160.56,177.53,156.33,174.85,152.88,174.38z M276.65,174.38H170.77l14.54,26.39l76.41,0.11L276.65,174.38z M191.36,211.63c-0.11,0.58,0.07,0.94,0.27,1.45c0.52,1.29,6.62,12.59,7.33,12.77c0.79,0.19,0.99-0.67,1.31-1.14c2.58-3.76,4.17-8.47,7.02-12.11l-0.5-0.97H191.36z M255.57,211.63h-36.52l-39.86,70.46l17.15,31.66l1.63,1.31L255.57,211.63z";

// Centroid of the outer triangle (avg of 3 vertices), used as rotation pivot.
const PIVOT_X = 197.9;
const PIVOT_Y = 221.0;

export default function TriangleSpinner() {
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      animate(groupRef.current, {
        opacity: [0, 1],
        duration: SPLASH_CONFIG.spinnerFadeInMs,
        ease: "outQuad",
      });
      return;
    }

    const fadeIn = animate(groupRef.current, {
      opacity: [0, 1],
      duration: SPLASH_CONFIG.spinnerFadeInMs,
      ease: "outQuad",
    });

    const rotation = animate(groupRef.current, {
      rotate: [0, 360],
      duration: SPLASH_CONFIG.spinnerRotationMs,
      ease: "linear",
      loop: true,
    });

    return () => {
      fadeIn.pause();
      rotation.pause();
    };
  }, []);

  const size = SPLASH_CONFIG.spinnerSize;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`${PIVOT_X - 110} ${PIVOT_Y - 110} 220 220`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", overflow: "visible" }}
    >
      <g
        ref={groupRef}
        style={{
          opacity: 0,
          transformOrigin: `${PIVOT_X}px ${PIVOT_Y}px`,
          transformBox: "view-box",
        }}
      >
        <path d={TRIANGLE_PATH} fill={SPLASH_CONFIG.spinnerColor} />
      </g>
    </svg>
  );
}
