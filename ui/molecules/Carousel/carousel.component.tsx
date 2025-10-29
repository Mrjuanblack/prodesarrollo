import React from "react";
import { Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CarouselProps, PaginationProps } from "./carousel.properties";

const PaginationDots: React.FC<PaginationProps> = ({
  currentIndex,
  totalSlides,
  isInside,
}) => {
  const dots = Array.from({ length: totalSlides }, (_, index) => (
    <div
      key={index}
      className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
        index === currentIndex ? "bg-blue-500" : "bg-gray-300"
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
    "hidden lg:flex absolute z-20 backdrop-blur-sm shadow-md rounded-full transition-all duration-300";

  return (
    <section>
      <div className="relative flex items-center justify-center">
        <Button
          isIconOnly
          radius="full"
          variant="shadow"
          onPress={onPrev}
          aria-label="Anterior"
          className={`${buttonClass} left-0 bg-white/70 border border-gray-200 hover:bg-white -ml-5`}
        >
          <ChevronLeft size={24} className="text-gray-600" />
        </Button>

        <div
          className={`grid grid-cols-1 md:grid-cols-${slidesPerView} gap-8 w-full`}
        >
          {children}
        </div>

        <Button
          isIconOnly
          radius="full"
          variant="shadow"
          aria-label="Siguiente"
          className={`${buttonClass} right-0 bg-blue-500/80 border border-blue-600 hover:bg-blue-600 -mr-5`}
          onPress={onNext}
        >
          <ChevronRight size={24} className="text-white" />
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
