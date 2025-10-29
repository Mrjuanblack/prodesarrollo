import { FC } from "react";
import { Text, Title } from "@/ui/atoms";
import { SectionHeaderProps } from "./section-header.properties";

export const SectionHeaderComponent: FC<SectionHeaderProps> = ({
  title,
  icon: Icon,
  description,
}) => {
  const iconBgColor = "bg-secondary-200";
  const iconColor = "text-primary";
  const titleColor = "text-primary";
  const descriptionColor = "text-gray-500";

  return (
    <div className="flex items-center flex-col">
      <div className="flex items-center">
        <div
          className={`flex items-center justify-center w-4 h-4 rounded-full shrink-0 mr-3 ${iconBgColor}`}
        >
          <Icon
            strokeWidth="1"
            className={`w-4 h-4 ${iconColor} -mr-2 -mb-1`}
          />
        </div>

        <Title
          text={title}
          className={`text-md md:text-lg leading-none ${titleColor}`}
        />
      </div>

      {description && (
        <Text
          text={description}
          className={`text-sm md:text-md mt-2 ${descriptionColor}`}
        />
      )}
    </div>
  );
};
