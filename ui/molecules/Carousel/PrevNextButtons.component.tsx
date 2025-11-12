import React, {
  useState,
  useEffect,
  useCallback,
  ComponentPropsWithRef,
} from "react";
import { EmblaCarouselType } from "embla-carousel";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const timeout = setTimeout(() => onSelect(emblaApi), 0);

    emblaApi.on("init", onSelect).on("reInit", onSelect).on("select", onSelect);

    return () => {
      clearTimeout(timeout);
      emblaApi
        .off("init", onSelect)
        .off("reInit", onSelect)
        .off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PrevButtonProps = ComponentPropsWithRef<"button">;

export const PrevButton: React.FC<PrevButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  return (
    <button className={className} type="button" {...restProps}>
      <svg
        fill="none"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </button>
  );
};

export const NextButton: React.FC<PrevButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  return (
    <button className={className} type="button" {...restProps}>
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
      {children}
    </button>
  );
};
