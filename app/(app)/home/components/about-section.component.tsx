import { FC } from "react";
import { Title } from "@/ui/atoms";
import { motion } from "framer-motion";
import { Container, Section } from "@/ui/molecules";

interface AboutSectionProps {
  title: string;
  videoSrc: string[];
  reverse?: boolean;
  classNameDots?: string;
  classNameVideo?: string;
  children?: React.ReactNode;
  description: React.ReactNode;
}

export const AboutSection: FC<AboutSectionProps> = ({
  title,
  children,
  videoSrc,
  description,
  reverse = false,
  classNameDots = "w-[45%] h-[120%] lg:w-[136px] lg:h-[370px]",
}) => {
  return (
    <Section fadeIn={true}>
      <Container
        className={`flex flex-col lg:flex-row items-center justify-between ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="w-full lg:w-[65%] space-y-8">
          <Title
            text={title}
            className="text-[15px] xl:text-[25px] leading-none"
          />

          <div className="text-black text-[15px] xl:text-[25px] leading-relaxed text-justify mb-8 ">
            {description}
          </div>

          {children && (
            <div className="flex w-full justify-center mb-10">{children}</div>
          )}
        </div>

        <div className="relative w-full lg:w-[30%] flex justify-center flex-col gap-5 items-end mt-10 lg:mt-0">
          <div
            className={`absolute ${
              reverse ? "left-0" : "right-0"
            } ${classNameDots} grid grid-cols-5 gap-3 opacity-40`}
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="w-[7px] h-[7px] bg-primary rounded-full"
              ></div>
            ))}
          </div>

          {videoSrc.map((src) => (
            <motion.div
              key={src}
              whileHover={{ scale: 1.02 }}
              className={`relative bg-white rounded-2xl shadow-md overflow-hidden aspect-video z-10 w-full`}
            >
              <iframe
                src={src}
                width="100%"
                height="100%"
                title="Ven a Colombia, El País de la Belleza ✨"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
