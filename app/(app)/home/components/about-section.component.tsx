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
  classNameDots = "w-[136px] h-[370px]",
  classNameVideo = "w-[475px] h-[291px]",
}) => {
  return (
    <Section fadeIn={true}>
      <Container
        className={`flex flex-col md:flex-row items-center justify-between ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="md:w-[60%] space-y-8">
          <Title text={title} className="text-md md:text-[25px] leading-none" />

          <div className="text-black text-[20px] leading-relaxed text-justify">
            {description}
          </div>

          {children && (
            <div className="mt-8 flex w-full justify-center">{children}</div>
          )}
        </div>

        <div className="relative md:w-[35%] flex justify-center flex-col gap-5 items-center mt-10 lg:mt-0">
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
              className={`relative bg-white rounded-2xl shadow-md overflow-hidden aspect-video z-10 ${classNameVideo}`}
            >
              <iframe
                width="100%"
                height="100%"
                src={src}
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
