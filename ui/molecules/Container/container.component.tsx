import { FC } from "react";
import { ContainerProps } from "./container.properties";

export const ContainerComponent: FC<ContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`max-w-[1500px] mx-auto w-full ${className}`}>
      {children}
    </div>
  );
};
