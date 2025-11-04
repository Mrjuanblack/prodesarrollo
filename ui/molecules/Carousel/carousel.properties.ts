export interface PaginationProps {
  currentIndex: number;
  totalSlides: number;
  isInside: boolean;
}

export interface CarouselProps {
  children: React.ReactNode[];
  slidesPerView?: number;
  hasDots?: boolean;
  paginationPosition?: "inside" | "bottom";
}
