// Core
import React, { JSX } from "react";
import { Button, PressEvent } from "@heroui/react";

// Properties
import { ButtonProperties } from "./button.properties";

export const ButtonComponent = (properties: ButtonProperties): JSX.Element => {
  const {
    text,
    type,
    color,
    variant,
    isLoading,
    isDisabled,
    className,
    endContent,
    onClick,
  } = properties;

  const handlePress = (e?: PressEvent) => {
    onClick?.(e);
  };

  return (
    <Button
      size="lg"
      radius="lg"
      onPress={handlePress}
      isLoading={isLoading}
      type={type ?? "button"}
      endContent={endContent}
      isDisabled={isDisabled}
      color={color ?? "primary"}
      variant={variant ?? "solid"}
      className={`w-full px-6 py-3 ${className}`}
    >
      {text}
    </Button>
  );
};
