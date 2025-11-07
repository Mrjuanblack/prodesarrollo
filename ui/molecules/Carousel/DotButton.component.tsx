import React, {
  useState,
  useEffect,
  useCallback,
  ComponentPropsWithRef,
} from "react";
import { EmblaCarouselType } from "embla-carousel";

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const onInitOrReInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const timeout = setTimeout(() => onInitOrReInit(emblaApi), 0);

    emblaApi.on("init", onInitOrReInit);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onInitOrReInit);

    return () => {
      clearTimeout(timeout);
      emblaApi.off("init", onInitOrReInit);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onInitOrReInit);
    };
  }, [emblaApi, onInitOrReInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type DotButtonProps = ComponentPropsWithRef<"button">;

export const DotButton: React.FC<DotButtonProps> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};
