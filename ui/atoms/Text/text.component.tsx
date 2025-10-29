// Core
import { JSX } from "react";

// Properties
import { TextProperties } from "./text.properties";

export const TextComponent = (properties: TextProperties): JSX.Element => {
  const { text, className } = properties;

  return (
    <p className={`text-medium font-normal text-black ${className}`}>{text}</p>
  );
};
