"use client";

import { useEffect, useRef } from "react";
import { createTimeline, stagger } from "animejs";
import { SPLASH_CONFIG } from "./splash-config";

const LOGO_URL = "/pro-desarrollo-logo.svg";

const VIEWBOX_W = 1043.93;
const VIEWBOX_H = 486.42;
const ASPECT = VIEWBOX_W / VIEWBOX_H;

const TRIANGLE_VB_CENTER_X = 197.9;
const TRIANGLE_VB_CENTER_Y = 249.0;

const TRIANGLE_BOX_VB_W = 205;
const TRIANGLE_BOX_VB_H = 180;

const TRI_WIDTH_PCT = (TRIANGLE_BOX_VB_W / VIEWBOX_W) * 100;
const TRI_HEIGHT_PCT = (TRIANGLE_BOX_VB_H / VIEWBOX_H) * 100;

// Centroid of the triangle expressed as % within the standalone SVG viewBox
// (95,160,205,180). Centroid ≈ (197.89, 221.04) → (50.2%, 33.9%).
const CENTROID_IN_SVG_X_PCT = 50.2;
const CENTROID_IN_SVG_Y_PCT = 33.9;

// Centroid position, in container %, where we want the triangle's visual
// balance point during each phase.
const INITIAL_CENTROID_X_PCT = 50;
const INITIAL_CENTROID_Y_PCT = 50;
const FINAL_CENTROID_X_PCT = 18.96; // (197.9 / 1043.93) * 100
const FINAL_CENTROID_Y_PCT = 45.44; // (221.04 / 486.42) * 100

// Wrapper offsets derived from centroid targets so the centroid lands there.
const CENTER_LEFT_PCT =
  INITIAL_CENTROID_X_PCT - (CENTROID_IN_SVG_X_PCT / 100) * TRI_WIDTH_PCT;
const CENTER_TOP_PCT =
  INITIAL_CENTROID_Y_PCT - (CENTROID_IN_SVG_Y_PCT / 100) * TRI_HEIGHT_PCT;

const FINAL_LEFT_PCT =
  FINAL_CENTROID_X_PCT - (CENTROID_IN_SVG_X_PCT / 100) * TRI_WIDTH_PCT;
const FINAL_TOP_PCT =
  FINAL_CENTROID_Y_PCT - (CENTROID_IN_SVG_Y_PCT / 100) * TRI_HEIGHT_PCT;

const TRIANGLE_PATH =
  "M102.4,164.09l190.91,0.75l-95.35,169.34l-1.63-1.31l-94.47-167.78L102.4,164.09z M152.88,174.38h-34.07l55.14,98.04l19.75-35.95l-31.05-56.17C160.56,177.53,156.33,174.85,152.88,174.38z M276.65,174.38H170.77l14.54,26.39l76.41,0.11L276.65,174.38z M191.36,211.63c-0.11,0.58,0.07,0.94,0.27,1.45c0.52,1.29,6.62,12.59,7.33,12.77c0.79,0.19,0.99-0.67,1.31-1.14c2.58-3.76,4.17-8.47,7.02-12.11l-0.5-0.97H191.36z M255.57,211.63h-36.52l-39.86,70.46l17.15,31.66l1.63,1.31L255.57,211.63z";

export type LogoAnimationProps = {
  onComplete?: () => void;
};

export default function LogoAnimation({ onComplete }: LogoAnimationProps) {
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const trianglePositionerRef = useRef<HTMLDivElement>(null);
  const triangleInnerRef = useRef<SVGSVGElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const logoContainer = logoContainerRef.current;
    const positioner = trianglePositionerRef.current;
    const inner = triangleInnerRef.current;
    if (!logoContainer || !positioner || !inner) return;

    let cancelled = false;

    (async () => {
      const res = await fetch(LOGO_URL);
      const text = await res.text();
      if (cancelled || !logoContainer) return;

      logoContainer.innerHTML = text;
      const svg = logoContainer.querySelector("svg");
      if (!svg) return;

      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      svg.style.display = "block";
      svg.style.overflow = "visible";

      const groups = svg.querySelectorAll(":scope > g");
      // groups[0] = tagline, groups[1] = "PRO DESARROLLO" title, groups[2] = triangle
      const taglineGroup = groups[0] as SVGGElement | undefined;
      const textGroup = groups[1] as SVGGElement | undefined;
      const triangleGroupInLogo = groups[2] as SVGGElement | undefined;

      if (!textGroup || !taglineGroup || !triangleGroupInLogo) return;

      triangleGroupInLogo.style.opacity = "0";

      const letters = Array.from(
        textGroup.querySelectorAll("path, rect, polygon, polyline")
      ) as SVGGraphicsElement[];


      textGroup.style.opacity = "0";
      taglineGroup.style.opacity = "0";
      letters.forEach((el) => {
        el.style.opacity = "0";
      });

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        positioner.style.left = `${FINAL_LEFT_PCT}%`;
        positioner.style.top = `${FINAL_TOP_PCT}%`;
        inner.style.opacity = "1";
        textGroup.style.opacity = "1";
        taglineGroup.style.opacity = "1";
        letters.forEach((el) => (el.style.opacity = "1"));
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }
        return;
      }

      const tl = createTimeline({
        defaults: { ease: "outQuart" },
        onComplete: () => {
          if (!completedRef.current) {
            completedRef.current = true;
            onComplete?.();
          }
        },
      });

      tl.add(
        inner,
        {
          opacity: [0, 1],
          duration: 400,
          ease: "outQuad",
        },
        0
      );

      tl.add(
        inner,
        {
          rotate: [180, 0],
          scale: [0.4, 1],
          duration: SPLASH_CONFIG.triangleSpinMs,
          ease: "outExpo",
        },
        0
      );

      // Use explicit absolute timeline positions to sync text clip reveal
      // with the triangle slide.
      const slideStartTime = SPLASH_CONFIG.triangleSpinMs;
      const slideEndTime = slideStartTime + SPLASH_CONFIG.triangleSlideMs;

      tl.add(
        positioner,
        {
          left: [`${CENTER_LEFT_PCT}%`, `${FINAL_LEFT_PCT}%`],
          top: [`${CENTER_TOP_PCT}%`, `${FINAL_TOP_PCT}%`],
          duration: SPLASH_CONFIG.triangleSlideMs,
          ease: "inOutQuart",
        },
        slideStartTime
      );

      // Text animations start only after the triangle finishes sliding.
      tl.add(
        textGroup,
        { opacity: [0, 1], duration: 1 },
        slideEndTime
      );

      // Stagger the letters of PRO DESARROLLO fading in one by one.
      tl.add(
        letters,
        {
          opacity: [0, 1],
          duration: SPLASH_CONFIG.letterRevealMs,
          delay: stagger(SPLASH_CONFIG.letterStaggerMs),
          ease: "outQuart",
        },
        slideEndTime
      );

      // Tagline fades in + slides up from below, after the letters begin.
      const taglineStart =
        slideEndTime +
        letters.length * SPLASH_CONFIG.letterStaggerMs +
        SPLASH_CONFIG.letterRevealMs * 0.4;
      tl.add(
        taglineGroup,
        {
          opacity: [0, 1],
          translateY: [16, 0],
          duration: SPLASH_CONFIG.taglineFadeMs,
          ease: "outQuart",
        },
        taglineStart
      );
    })();

    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: `${SPLASH_CONFIG.logoMaxWidthPx}px`,
        aspectRatio: `${ASPECT}`,
      }}
    >
      <div
        ref={logoContainerRef}
        style={{
          position: "absolute",
          inset: 0,
        }}
      />
      <div
        ref={trianglePositionerRef}
        style={{
          position: "absolute",
          left: `${CENTER_LEFT_PCT}%`,
          top: `${CENTER_TOP_PCT}%`,
          width: `${TRI_WIDTH_PCT}%`,
          height: `${TRI_HEIGHT_PCT}%`,
          pointerEvents: "none",
        }}
      >
        <svg
          ref={triangleInnerRef}
          viewBox="95 160 205 180"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            opacity: 0,
            transformOrigin: `${CENTROID_IN_SVG_X_PCT}% ${CENTROID_IN_SVG_Y_PCT}%`,
            willChange: "transform, opacity",
          }}
        >
          <path d={TRIANGLE_PATH} fill="#01327E" />
        </svg>
      </div>
    </div>
  );
}
