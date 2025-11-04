import { FC } from "react";
import { Title } from "@/ui/atoms";
import { IconTitleProps } from "./icon-title.properties";

export const IconTitleComponent: FC<IconTitleProps> = ({
  Icon,
  title,
  highlightFirstLetter,
  className = "",
  iconColor = "text-primary",
  iconBgColor = "bg-secondary-200",
  classNameTitle = "text-md text-primary md:text-[25px]",
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {Icon && (
        <div
          className={`flex items-center justify-center w-[25px] h-[25px] rounded-full shrink-0 mr-4 ${iconBgColor}`}
        >
          <Icon
            strokeWidth="1.5"
            className={`w-7 h-7 ${iconColor} -mr-4 -mb-3`}
          />
        </div>
      )}

      {title && (
        <Title
          text={title}
          highlightFirstLetter={highlightFirstLetter}
          className={`leading-none ${classNameTitle}`}
        />
      )}
    </div>
  );
};
