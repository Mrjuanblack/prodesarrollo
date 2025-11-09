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
  classNameTitle = "text-primary text-[15px] md:text-[20px] lg:text-[25px]",
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {Icon && (
        <div
          className={`flex items-center justify-center w-[18px] h-[18px] lg:w-[25px] lg:h-[25px] rounded-full shrink-0 mr-2 lg:mr-4 ${iconBgColor}`}
        >
          <Icon
            strokeWidth="1.5"
            className={`w-4 h-4 lg:w-7 lg:h-7 ${iconColor} -mr-2 -mb-2 lg:-mr-4 lg:-mb-3`}
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
