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
    <Section fadeIn={true}>
      <Container
        className={`flex flex-col md:flex-row items-center justify-between ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="md:w-1/2 space-y-4">
          <Title text={title} className="text-md md:text-lg leading-none" />

          <p className="text-black leading-relaxed">{description}</p>

          {children && <div className="mt-10">{children}</div>}
        </div>

        <div className="relative md:w-1/2 flex justify-center items-center">
          <div className="absolute right-0 top-0 w-full h-full flex justify-end items-end pointer-events-none">
            <div className="grid grid-cols-6 gap-3 opacity-40 translate-x-8 translate-y-8">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-primary rounded-full"></div>
              ))}
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-[90%] md:w-[400px]"
          >
            <video
              muted
              loop
              playsInline
              src={videoSrc}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button className="bg-white text-primary rounded-full p-4 shadow-md">
                ▶
              </button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
