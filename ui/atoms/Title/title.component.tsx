// Core
import { JSX } from "react";

// Properties
import { TitleProperties } from "./title.properties";

export const TitleComponent = (properties: TitleProperties): JSX.Element => {
  const {
    className = "",
    text = "text-[15px] md:text-[20px] lg:text-[25px]",
    highlightFirstLetter = true,
  } = properties;

  const firstLetter = text.charAt(0);
  const remainingText = text.slice(1);

  return (
    <h1 className={`font-bold text-primary ${className}`}>
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
