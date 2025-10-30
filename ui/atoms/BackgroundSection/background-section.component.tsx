import { FC } from "react";
import { BackgroundSectionProps } from "./background-section.properties";

export const BackgroundSectionComponent: FC<BackgroundSectionProps> = ({
  background,
}) => {
  return <section className={`w-full h-[400px] ${background}`}></section>;
};
