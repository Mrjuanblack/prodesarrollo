import { FC, useState } from "react";
import { StepTabsProps } from "./step-tabs.properties";

export const StepTabsComponent: FC<StepTabsProps> = ({
  tabs,
  defaultActive,
  onChange,
}) => {
  const [active, setActive] = useState(defaultActive || tabs[0].id);

  const handleClick = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <div className="w-full border-b border-[#cdd7f6]/60 flex justify-between gap-3">
      {tabs.map((tab, index) => {
        const isActive = tab.id === active;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            className={`relative cursor-pointer flex flex-col items-center justify-center w-full lg:py-2 text-[13px] sm:text-[14px] md:text-[18px] lg:text-[20px] transition-colors ${
              isActive ? "text-primary font-semibold" : "text-gray-400"
            }`}
          >
            <Icon
              className={`w-5 h-5 lg:w-7 lg:h-7 mb-1 ${
                isActive ? "text-primary" : "text-gray-400"
              }`}
            />

            <span>
              {index + 1}.{" "}
              <span
                className={`leading-relaxed ${
                  isActive ? "font-semibold" : "italic"
                }`}
              >
                {tab.label}
              </span>
            </span>

            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-secondary rounded-full"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};
