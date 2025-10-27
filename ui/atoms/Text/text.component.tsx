// Core
import React, { JSX } from "react";

// Properties
import { TextProperties } from "./text.properties";

export const TextComponent = (properties: TextProperties): JSX.Element => {
  const { text, className } = properties;

  return <p className={`text-medium text-gray-600 ${className}`}>{text}</p>;
};
