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
          className={`text-md md:text-[20px] mt-4 max-w-6xl text-center ${descriptionColor}`}
        />
      )}
    </div>
  );
};
