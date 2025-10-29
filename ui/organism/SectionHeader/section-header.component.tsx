"use client";

import { FC } from "react";
import { Text } from "@/ui/atoms";
import { IconTitle } from "@/ui/molecules";
import { SectionHeaderProps } from "./section-header.properties";

export const SectionHeaderComponent: FC<SectionHeaderProps> = ({
  title,
  icon: Icon,
  description,
}) => {
  const descriptionColor = "text-gray-500";

  return (
    <div className="flex items-center flex-col mb-15">
      <IconTitle Icon={Icon} title={title} />

      {description && (
        <Text
          text={description}
          className={`text-sm md:text-md mt-2 max-w-3xl text-center ${descriptionColor}`}
        />
      )}
    </div>
  );
};
