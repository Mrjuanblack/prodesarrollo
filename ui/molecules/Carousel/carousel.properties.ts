import { EmblaOptionsType } from "embla-carousel";
import { ReactNode } from "react";

export interface ISlideSizeClasses {
  base: string;
  sm: string;
  md: string;
  lg: string;
  xl?: string;
}

export interface ICarouselProps {
  children: ReactNode;
  options?: EmblaOptionsType;

  showDots?: boolean;
  dotActiveColor?: string;
  dotInactiveColor?: string;

  slideSizeClasses: ISlideSizeClasses;
  gapClass?: string;

  marginTop?: string;
}
