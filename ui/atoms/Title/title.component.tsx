// Core
import React, { JSX } from "react";

// Properties
import { TitleProperties } from "./title.properties";

export const TitleComponent = (properties: TitleProperties): JSX.Element => {
  const { className, text } = properties;

  return <h1 className={`font-bold ${className}`}>{text}</h1>;
};
