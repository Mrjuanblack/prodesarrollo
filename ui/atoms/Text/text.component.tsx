// Core
import { JSX } from "react";

// Properties
import { TextProperties } from "./text.properties";

export const TextComponent = (properties: TextProperties): JSX.Element => {
  const { text, className = "text-[13px] md:text-[15px] lg:text-[20px]" } =
    properties;

  return <p className={`font-normal text-black ${className}`}>{text}</p>;
};
