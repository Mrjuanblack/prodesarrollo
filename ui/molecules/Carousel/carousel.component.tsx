import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./PrevNextButtons.component";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ICarouselProps } from "./carousel.properties";
import { DotButton, useDotButton } from "./DotButton.component";

const RESPONSIVE_OPTIONS: EmblaOptionsType = {
  slidesToScroll: 1,
  align: "start",
  breakpoints: {
    "(min-width: 768px)": {
      slidesToScroll: 1,
    },
    "(min-width: 1024px)": {
      slidesToScroll: 1,
    },
  },
};

export const CarouselComponent: React.FC<ICarouselProps> = (props) => {
  const {
    children,
    showDots = true,
    slideSizeClasses,
    gapClass = "px-[5px]",
    options = RESPONSIVE_OPTIONS,
    dotActiveColor = "bg-secondary",
    dotInactiveColor = "bg-gray-300",
  } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const slideClasses = ` bg-transparent flex-shrink-0 min-w-0 py-[15px] ${gapClass} 
    ${slideSizeClasses?.base} ${slideSizeClasses?.sm} ${slideSizeClasses?.md} ${slideSizeClasses?.lg}
  `;

  const marginCompensation = gapClass
    .replace(/px\[(.*?)\]/, "mx-[$1]")
    .replace("px", "-mx");

  return (
    <section className="relative">
      <div className="overflow-hidden " ref={emblaRef}>
        <div className={`flex items-stretch h-full ${marginCompensation}`}>
          {React.Children.map(children, (child, index) => (
            <div className={slideClasses} key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <PrevButton
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        className="cursor-pointer absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 z-10 p-3 bg-white/70 hover:bg-white rounded-full shadow-lg disabled:opacity-30 transition"
      />

      <NextButton
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        className="cursor-pointer absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 z-10 p-3 bg-secondary-200 hover:bg-secondary-300 rounded-full shadow-lg disabled:opacity-30 transition"
      />

      {showDots && scrollSnaps.length > 1 && (
        <div className="flex justify-center mt-6 space-x-3">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-3 h-3 rounded-full transition-colors 
                                 ${
                                   index === selectedIndex
                                     ? dotActiveColor
                                     : dotInactiveColor
                                 }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
