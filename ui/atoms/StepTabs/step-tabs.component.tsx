import { FC, useState } from "react";
import { StepTabsProps } from "./step-tabs.properties";

export const StepTabsComponent: FC<StepTabsProps> = ({
  tabs,
  defaultActive,
  active,
  disabledIds,
  onChange,
}) => {
  const [internalActive, setInternalActive] = useState(
    defaultActive || tabs[0].id
  );
  const currentActive = active ?? internalActive;

  const handleClick = (id: string) => {
    if (disabledIds?.includes(id)) return;
    if (active === undefined) setInternalActive(id);
    onChange?.(id);
  };

  return (
    <div className="w-full border-b border-[#cdd7f6]/60 flex justify-between gap-3">
      {tabs.map((tab, index) => {
        const isActive = tab.id === currentActive;
        const isDisabled = disabledIds?.includes(tab.id) ?? false;
        const Icon = tab.icon;

        const stateColor = isDisabled
          ? "text-gray-300"
          : isActive
          ? "text-primary font-semibold"
          : "text-gray-400";

        return (
          <button
            key={tab.id}
            type="button"
            disabled={isDisabled}
            onClick={() => handleClick(tab.id)}
            aria-current={isActive ? "step" : undefined}
            className={`relative flex flex-col items-center justify-center w-full lg:py-2 text-[13px] sm:text-[14px] md:text-[18px] lg:text-[20px] transition-colors ${stateColor} ${
              isDisabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <Icon
              className={`w-5 h-5 lg:w-7 lg:h-7 mb-1 ${
                isDisabled
                  ? "text-gray-300"
                  : isActive
                  ? "text-primary"
                  : "text-gray-400"
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
