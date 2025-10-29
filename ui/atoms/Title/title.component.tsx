// Core
import React, { JSX } from "react";

// Properties
import { TitleProperties } from "./title.properties";

export const TitleComponent = (properties: TitleProperties): JSX.Element => {
  const { className = "", text, highlightFirstLetter = true } = properties;

  const firstLetter = text.charAt(0);
  const remainingText = text.slice(1);

  return (
    <h1 className={`font-bold text-2xl md:text-3xl text-primary ${className}`}>
      {highlightFirstLetter ? (
        <>
          <span className="text-secondary">{firstLetter}</span>
          {remainingText}
        </>
      ) : (
        text
      )}
    </h1>
  );
};
