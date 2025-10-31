import { FC, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionProps } from "./section.properties";

export const SectionComponent: FC<SectionProps> = ({
  children,
  className,
  fadeIn = false,
  hasPadding = true,
}) => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (fadeIn) {
    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`bg-white w-full flex justify-center ${className} ${
          hasPadding ? "py-20" : "py-0"
        }`}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <section
      className={`bg-white w-full flex justify-center ${className} ${
        hasPadding ? "py-20" : "py-0"
      }`}
    >
      {children}
    </section>
  );
};
