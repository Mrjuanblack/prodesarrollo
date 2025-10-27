import { FC, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionProps } from "./section.properties";

export const SectionComponent: FC<SectionProps> = ({
  children,
  className,
  fadeIn = false,
}) => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (fadeIn) {
    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`py-18 flex justify-center px-7 md:py-24 ${className}`}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <section className={`py-18 flex justify-center px-7 md:py-24 ${className}`}>
      {children}
    </section>
  );
};
