import React from "react";
import { Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CarouselProps, PaginationProps } from "./carousel.properties";

const PaginationDots: React.FC<PaginationProps> = ({
  currentIndex,
  totalSlides,
  isInside,
}) => {
  const dots = Array.from({ length: totalSlides }, (_, index) => (
    <div
      key={index}
      className={`w-[17px] h-[17px] rounded-full cursor-pointer transition-all duration-300 ${
        index === currentIndex
          ? "bg-secondary scale-110"
          : "bg-gray-300 opacity-70"
      } ${isInside ? "bg-opacity-80" : ""}`}
    />
  ));

  return (
    <div
      className={`flex justify-center gap-2 ${
        isInside ? "absolute bottom-4 w-full z-10" : "mt-8"
      }`}
    >
      {dots}
    </div>
  );
};

export const CarouselComponent: React.FC<CarouselProps> = ({
  children,
  totalSlides,
  slidesPerView = 3,
  currentIndex,
  paginationPosition = "bottom",
  onPrev,
  onNext,
}) => {
  const isInside = paginationPosition === "inside";

  const buttonClass =
    "h-[77px] w-[77px] flex absolute top-1/2 -translate-y-1/2 z-30 backdrop-blur-sm shadow-md rounded-full transition-all duration-300";

  return (
    <section className="relative w-full">
      <div className="relative flex items-center justify-center">
        <Button
          isIconOnly
          radius="full"
          variant="shadow"
          onPress={onPrev}
          aria-label="Anterior"
          className={`${buttonClass} left-0 -ml-9 bg-white/70 border border-gray-200 hover:bg-white`}
        >
          <ChevronLeft size={35} className="text-gray-600" />
        </Button>

        <div className="relative w-full z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{
                duration: 0.45,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${slidesPerView} gap-8 w-full`}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        <Button
          isIconOnly
          radius="full"
          variant="shadow"
          onPress={onNext}
          aria-label="Siguiente"
          className={`${buttonClass} right-0 -mr-9 bg-secondary/80 border border-secondary-400 hover:bg-secondary-300`}
        >
          <ChevronRight size={35} className="text-primary" />
        </Button>

        {isInside && (
          <PaginationDots
            currentIndex={currentIndex}
            totalSlides={totalSlides}
            isInside={true}
          />
        )}
      </div>

      {!isInside && (
        <PaginationDots
          currentIndex={currentIndex}
          totalSlides={totalSlides}
          isInside={false}
        />
      )}
    </section>
  );
};
