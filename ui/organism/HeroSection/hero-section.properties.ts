import { StaticImageData } from "next/image";
import { Variants, Transition } from "framer-motion";
export interface HeroButtonProps {
  text: string;
  onClick?: () => void;
}

export interface HeroSectionProperties {
  titles: string;
  description: string;
  buttons?: HeroButtonProps[];
  imageSrc: string | StaticImageData;
}

const springTransition: Transition = {
  type: "spring",
  damping: 12,
  stiffness: 100,
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

export const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: springTransition,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};
