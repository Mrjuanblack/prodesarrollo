import { FC } from "react";

export const StatusBadgeComponent: FC<{ category: string }> = ({
  category = "En proceso",
}) => {
  return (
    <div className="inline-block bg-blue-50 text-primary px-4 py-1  text-[20px] rounded-full font-semibold">
      Categoría: {category}
    </div>
  );
};
