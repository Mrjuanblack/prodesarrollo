import { FC } from "react";
import { Chip } from "@heroui/react";
import { ChipProps } from "./chip.properties";

export const ChipComponent: FC<ChipProps> = ({
  category = "Estado: En proceso",
  icono,
  isActive = false,
}) => {
  const estadoColor = isActive
    ? "bg-primary text-white"
    : "bg-primary/10 text-primary";

  return (
    <Chip
      variant="flat"
      startContent={icono}
      className={`${estadoColor} font-semibold px-3 py-2 rounded-full mb-3 w-fit text-[15px] md:text-[18px] lg:text-[20px]`}
    >
      {category}
    </Chip>
  );
};
