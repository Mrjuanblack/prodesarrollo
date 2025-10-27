// Core
import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Propiedades
import {
  childVariants,
  containerVariants,
  HeroSectionProperties,
} from "./hero-section.properties";

// Components
import { Button, Text } from "@/ui/atoms";

export const HeroSectionComponent: FC<HeroSectionProperties> = ({
  titles,
  buttons,
  imageSrc,
  description,
}) => {
  const titleString = (titles ?? "").toString().trim();

  const lastSpaceIndex = titleString.lastIndexOf(" ");
  const head =
    lastSpaceIndex === -1 ? titleString : titleString.slice(0, lastSpaceIndex);
  const lastWord =
    lastSpaceIndex === -1 ? "" : titleString.slice(lastSpaceIndex + 1);

  return (
    <section className="px-7 py-24 flex justify-center bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000" />
      <div className="absolute top-20 right-20 w-40 h-40 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 hidden md:block" />

      <div className="w-full max-w-6xl flex flex-col gap-12 lg:flex-row relative z-10">
        <div className="flex flex-col justify-center gap-5 lg:flex-1/2">
          <div className="w-full">
            <h1 className="text-6xl font-extrabold leading-tight text-primary inline">
              {head && (
                <span className="inline">
                  {head}
                  {lastWord ? "\u00A0" : ""}
                </span>
              )}

              {lastWord ? (
                <motion.span
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="text-secondary inline-block"
                >
                  {Array.from(lastWord).map((char, index) => (
                    <motion.span
                      key={`${char}-${index}`}
                      className="inline-block"
                      variants={childVariants}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.span>
              ) : null}
            </h1>
          </div>

          <Text text={description} className="text-xl lg:w-[80%]" />

          {buttons && buttons.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {buttons.map((btn) => (
                <Button
                  key={btn.text}
                  text={btn.text}
                  onClick={btn.onClick}
                  className="w-auto text-lg font-semibold"
                />
              ))}
            </div>
          )}
        </div>

        <div className="lg:flex-1/2">
          <motion.div
            className="w-full h-full"
            whileHover={{ y: -5, x: 5, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              width={700}
              height={450}
              src={imageSrc}
              className="object-contain"
              alt={`${titleString} illustration`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
