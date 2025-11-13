import React from "react";
import Image from "next/image";

export interface ProjectTypeItem {
  id: number;
  img: string;
  title: string;
}

interface ProjectTypeCardProps {
  item: ProjectTypeItem;
  active?: boolean;
  onClick?: (value: string) => void;
}

export const ProjectTypeCard: React.FC<ProjectTypeCardProps> = ({
  item,
  active = false,
  onClick,
}) => {
  const { img, title } = item;

  return (
    <button
      type="button"
      onClick={() => onClick?.(item.title)}
      className={`w-full flex flex-col items-center rounded-2xl border overflow-hidden
        h-[212px] md:h-[258px] lg:h-[278px] transition-all duration-300 cursor-pointer 
        focus:outline-none focus:ring-2 focus:ring-primary/40 hover:scale-[1.02]
        ${
          active
            ? "bg-secondary/10 border-secondary shadow-md"
            : "bg-white border-gray-200 hover:border-primary/40"
        }
      `}
    >
      <div className="relative w-full h-[144px] md:h-[190px] lg:h-[210px]">
        <Image
          fill
          src={img}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 scale-105 hover:scale-101"
        />
      </div>

      <div
        className={`flex items-center justify-center flex-1 w-full text-primary p-2 ${
          active ? "bg-secondary font-bold" : "bg-default-100 font-semibold"
        }`}
      >
        <p
          className={`
            text-center text-[13px] md:text-[16px] lg:text-[18px] transition-colors duration-200`}
        >
          {title}
        </p>
      </div>
    </button>
  );
};
