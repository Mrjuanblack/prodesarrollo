import { FC } from "react";
import { Title } from "@/ui/atoms";
import { IconTitleProps } from "./icon-title.properties";

export const IconTitleComponent: FC<IconTitleProps> = ({
  Icon,
  title,
  highlightFirstLetter,
  className = "",
  iconColor = "text-primary",
  titleColor = "text-primary",
  iconBgColor = "bg-secondary-200",
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div
        className={`flex items-center justify-center w-4 h-4 rounded-full shrink-0 mr-3 ${iconBgColor}`}
      >
        <Icon strokeWidth="1" className={`w-4 h-4 ${iconColor} -mr-2 -mb-1`} />
      </div>

      <Title
        text={title}
        highlightFirstLetter={highlightFirstLetter}
        className={`text-md md:text-lg leading-none ${titleColor}`}
      />
    </div>
  );
};
