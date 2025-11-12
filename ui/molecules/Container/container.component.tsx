import { FC } from "react";
import { ContainerProps } from "./container.properties";

export const ContainerComponent: FC<ContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`w-full mx-auto px-6 lg:px-8 lg:max-w-[1500px] ${className}`}
    >
      {children}
    </div>
  );
};
