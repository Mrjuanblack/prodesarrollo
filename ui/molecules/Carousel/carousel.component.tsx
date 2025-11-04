import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import { CarouselProps, PaginationProps } from "./carousel.properties";

const useConditionalResponsiveSlides = (propSlidesPerView: number): number => {
  const breakpoints = useMemo(
    () => [
      { slides: 2, media: "(min-width: 768px)" },
      { slides: 3, media: "(min-width: 1024px)" },
    ],
    []
  );

  const [responsiveSlides, setResponsiveSlides] = useState(1);

  useEffect(() => {
    if (propSlidesPerView !== 3) {
      return;
    }

    const getSlides = () => {
      let currentSlides = 1;

      if (window.matchMedia(breakpoints[0].media).matches) {
        currentSlides = breakpoints[0].slides;
      }

      if (window.matchMedia(breakpoints[1].media).matches) {
        currentSlides = breakpoints[1].slides;
      }

      setResponsiveSlides(currentSlides);
    };

    getSlides();

    const handlers = breakpoints.map((bp) => {
      const mediaQuery = window.matchMedia(bp.media);
      mediaQuery.addListener(getSlides);
      return () => mediaQuery.removeListener(getSlides);
    });

    return () => handlers.forEach((remove) => remove());
  }, [breakpoints, propSlidesPerView]);

  if (propSlidesPerView !== 3) {
    return propSlidesPerView;
  }

  return responsiveSlides;
};

const PaginationDots: React.FC<PaginationProps> = ({
  currentIndex,
  totalSlides,
  isInside,
}) => {
  return (
    <div
      className={`flex justify-center gap-2 ${
        isInside ? "absolute bottom-4 w-full z-10" : "mt-8"
      }`}
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
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

  const totalItems = children.length;
  const totalSlides = Math.ceil(totalItems / currentSlidesPerView);

  const handleNext = () => {
    setDirection(1);
    setStartIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setDirection(-1);
    setStartIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const isInside = paginationPosition === "inside";

  const colClassMap: Record<number, string> = {
    1: "md:grid-cols-1 lg:grid-cols-1",
    2: "md:grid-cols-2 lg:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
    5: "md:grid-cols-2 lg:grid-cols-5",
    6: "md:grid-cols-2 lg:grid-cols-6",
  };

  const maxSlides = Math.min(Math.max(slidesPerView, 1), 6);
  const gridClasses = colClassMap[maxSlides] || "md:grid-cols-2 lg:grid-cols-3";

  const currentContents = children.slice(
    startIndex * currentSlidesPerView,
    (startIndex + 1) * currentSlidesPerView
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
          isDisabled={startIndex === 0}
        >
          <ChevronLeft size={35} className="text-gray-600" />
        </Button>

        <div className="relative w-full z-10 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={startIndex}
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
          isDisabled={startIndex === totalSlides - 1}
        >
          <ChevronRight size={35} className="text-primary" />
        </Button>

        {isInside && hasDots && (
          <PaginationDots
            isInside={true}
            currentIndex={startIndex}
            totalSlides={totalSlides}
          />
        )}
      </div>
      {!isInside && hasDots && (
        <PaginationDots
          currentIndex={startIndex}
          totalSlides={totalSlides}
          isInside={false}
        />
      )}
    </section>
  );
};
