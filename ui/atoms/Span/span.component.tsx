// Core
import React, { JSX } from "react";

// Properties
import { SpanProperties } from "./span.properties";

export const SpanComponent = (properties: SpanProperties): JSX.Element => {
  const { text, className } = properties;

  return <p className={`${className}`}>{text}</p>;
};
