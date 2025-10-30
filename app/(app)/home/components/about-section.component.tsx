import { FC } from "react";
import { Title } from "@/ui/atoms";
import { motion } from "framer-motion";
import { Container, Section } from "@/ui/molecules";

interface AboutSectionProps {
  title: string;
  videoSrc: string;
  reverse?: boolean;
  description: React.ReactNode;
  children?: React.ReactNode;
}

export const AboutSection: FC<AboutSectionProps> = ({
  title,
  children,
  videoSrc,
  description,
  reverse = false,
}) => {
  return (
    <Section fadeIn={true} className="mt-15">
      <Container
        className={`flex flex-col md:flex-row items-center justify-between ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="md:w-3/7 space-y-8 ">
          <Title text={title} className="text-md md:text-[25px] leading-none" />

          <div className="text-black text-[20px] leading-relaxed text-justify">
            {description}
          </div>

          {children && (
            <div className="mt-8 flex w-full justify-center">{children}</div>
          )}
        </div>

        <div className="relative md:w-3/7 flex justify-center items-center mt-10 lg:mt-0">
          <div
            className={`absolute ${
              reverse ? "left-0" : "right-0"
            } w-[136px] h-[370px] grid grid-cols-5 gap-3 opacity-40`}
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="w-[7px] h-[7px] bg-primary rounded-full"
              ></div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-md overflow-hidden w-[475px] h-[291px] aspect-video z-10"
          >
            <iframe
              width="100%"
              height="100%"
              src={videoSrc}
              title="Ven a Colombia, El País de la Belleza ✨"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
