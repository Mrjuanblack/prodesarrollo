import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import { CarouselProps, PaginationProps } from "./carousel.properties";

const useConditionalResponsiveSlides = (propSlidesPerView: number): number => {
  const initialSlides = Math.max(1, propSlidesPerView);

  const breakpoints = useMemo(
    () => [
      { slides: Math.min(initialSlides, 2), media: "(min-width: 768px)" },
      { slides: Math.min(initialSlides, 6), media: "(min-width: 1024px)" },
    ],
    [initialSlides]
  );

  const calculateSlides = (currentBreakpoints: typeof breakpoints): number => {
    if (typeof window === "undefined") return 1;

    if (window.matchMedia(currentBreakpoints[1].media).matches) {
      return currentBreakpoints[1].slides;
    }

    if (window.matchMedia(currentBreakpoints[0].media).matches) {
      return currentBreakpoints[0].slides;
    }

    return 1;
  };

  const [responsiveSlides, setResponsiveSlides] = useState(() =>
    calculateSlides(breakpoints)
  );

  useEffect(() => {
    if (initialSlides === 1) return;

    const getSlides = () => {
      setResponsiveSlides(calculateSlides(breakpoints));
    };

    const handlers = breakpoints.map((bp) => {
      const mediaQuery = window.matchMedia(bp.media);
      mediaQuery.addEventListener("change", getSlides);
      return () => mediaQuery.removeEventListener("change", getSlides);
    });

    return () => handlers.forEach((remove) => remove());
  }, [breakpoints, initialSlides]);

  return responsiveSlides;
};

const PaginationDots: React.FC<PaginationProps> = ({
  currentIndex,
  totalSlides,
  isInside,
}) => {
  const safeTotalSlides = Math.max(0, totalSlides);

  return (
    <div
      className={`flex justify-center gap-2 ${
        isInside ? "absolute bottom-4 w-full z-10" : "mt-8"
      }`}
    >
      {Array.from({ length: safeTotalSlides }).map((_, index) => (
        <div
          key={index}
          className={`w-3.5 h-3.5 lg:w-[17px] lg:h-[17px] rounded-full cursor-pointer transition-all duration-300 ${
            index === currentIndex
              ? "bg-secondary scale-110"
              : "bg-gray-300 opacity-70"
          } ${isInside ? "bg-opacity-80" : ""}`}
        />
      ))}
    </div>
  );
};

export const CarouselComponent: React.FC<CarouselProps> = ({
  children,
  slidesPerView = 3,
  hasDots = true,
  paginationPosition = "bottom",
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentSlidesPerView = useConditionalResponsiveSlides(slidesPerView);

  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  const totalSlides = Math.ceil(totalItems / currentSlidesPerView);

  const adjustedStartIndex =
    totalSlides > 0 ? Math.min(startIndex, totalSlides - 1) : 0;

  const handleNext = () => {
    setDirection(1);
    setStartIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setDirection(-1);
    setStartIndex(
      (prev) => (adjustedStartIndex - 1 + totalSlides) % totalSlides
    );
  };

  const isInside = paginationPosition === "inside";

  const maxSlides = Math.min(Math.max(slidesPerView, 1), 6);
  const gridClasses = `md:grid-cols-2 lg:grid-cols-${maxSlides}`;

  const currentContents = childrenArray.slice(
    adjustedStartIndex * currentSlidesPerView,
    (adjustedStartIndex + 1) * currentSlidesPerView
  );

  const offset = 60;
  const exitX = direction * offset;
  const initialX = -direction * offset;

  const buttonClass =
    "h-[60px] w-[60px] lg:h-[77px] lg:w-[77px] flex absolute top-1/2 -translate-y-1/2 z-30 backdrop-blur-sm shadow-md rounded-full transition-all duration-300";

  return (
    <section className="relative w-full px-4 md:px-6 lg:px-12">
      <div className="relative flex items-center justify-center z-10">
        <Button
          isIconOnly
          radius="full"
          variant="shadow"
          onPress={handlePrev}
          aria-label="Anterior"
          className={`${buttonClass} left-0 -ml-9 bg-white/70 border border-gray-200 hover:bg-white`}
          isDisabled={adjustedStartIndex === 0}
        >
          <ChevronLeft size={35} className="text-gray-600" />
        </Button>

        <div className="relative w-full z-10 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={adjustedStartIndex}
              exit={{ opacity: 0, x: exitX }}
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: initialX }}
              transition={{
                duration: 0.45,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className={`grid grid-cols-1 ${gridClasses} gap-8 w-full absolute`}
            >
              {currentContents}
            </motion.div>
          </AnimatePresence>

          <div
            className={`grid grid-cols-1 ${gridClasses} gap-8 w-full invisible`}
          >
            {currentContents}
          </div>
        </div>

        <Button
          isIconOnly
          radius="full"
          variant="shadow"
          onPress={handleNext}
          aria-label="Siguiente"
          className={`${buttonClass} right-0 -mr-9 bg-secondary/80 border border-secondary-400 hover:bg-secondary-300`}
          isDisabled={
            adjustedStartIndex === totalSlides - 1 ||
            totalItems <= currentSlidesPerView
          }
        >
          <ChevronRight size={35} className="text-primary" />
        </Button>

        {isInside && hasDots && (
          <PaginationDots
            isInside={true}
            currentIndex={adjustedStartIndex}
            totalSlides={totalSlides}
          />
        )}
      </div>

      {!isInside && hasDots && (
        <PaginationDots
          currentIndex={adjustedStartIndex}
          totalSlides={totalSlides}
          isInside={false}
        />
      )}
    </section>
  );
};
