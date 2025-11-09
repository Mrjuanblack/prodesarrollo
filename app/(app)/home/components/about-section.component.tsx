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
  classNameDots = "h-full w-[30%] lg:w-[35%]",
}) => {
  return (
    <Section fadeIn={true}>
      <Container
        className={`flex items-center justify-between ${
          reverse ? "flex-col lg:flex-row-reverse" : "flex-col lg:flex-row"
        }`}
      >
        <div className="relative w-full lg:w-[40%] flex justify-center flex-col">
          <div
            className={`absolute top-0 bottom-0 ${
              reverse ? "right-0" : "left-0"
            } ${classNameDots} grid grid-cols-5 opacity-40 gap-5`}
          >
            {Array.from({ length: 45 }).map((_, i) => (
              <div
                key={i}
                className="w-[7px] h-[7px] bg-primary rounded-full"
              ></div>
            ))}
          </div>

          <div className={`py-5 flex ${reverse ? "" : "justify-end"}`}>
            {videoSrc.map((src) => (
              <motion.div
                key={src}
                whileHover={{ scale: 1.02 }}
                className={`relative bg-white rounded-2xl shadow-md overflow-hidden aspect-video z-10 w-[85%]`}
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
        </div>

        <div className="w-full lg:w-[55%]">
          <Title text={title} className="mt-5" />

          <div className="mt-3 text-black text-[12px] md:text-[16px] lg:text-[20px] leading-relaxed text-justify mb-5 md:mb-10">
            {description}
          </div>

          {children && (
            <div className="flex w-full justify-center">{children}</div>
          )}
        </div>
      </Container>
    </Section>
  );
};
