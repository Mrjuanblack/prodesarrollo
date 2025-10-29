import { ReactNode } from "react";

export interface CarouselProps {
  children: ReactNode;

  paginationPosition?: "bottom" | "inside";

  currentIndex: number;
  slidesPerView?: number;
  totalSlides: number;

  onPrev: () => void;
  onNext: () => void;
}

export interface PaginationProps {
  currentIndex: number;
  totalSlides: number;
  isInside: boolean;
}
