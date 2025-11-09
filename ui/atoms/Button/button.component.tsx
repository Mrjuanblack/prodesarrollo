// Core
import { JSX } from "react";
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
      radius="full"
      onPress={handlePress}
      isLoading={isLoading}
      type={type ?? "button"}
      endContent={endContent}
      isDisabled={isDisabled}
      color={color ?? "primary"}
      variant={variant ?? "solid"}
      className={`w-full px-4 py-2 lg:px-6 lg:py-3 pointer text-primary text-[15px] md:text-[18px] lg:text-[20px] ${className}`}
    >
      {text}
    </Button>
  );
};
