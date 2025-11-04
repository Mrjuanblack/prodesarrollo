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
      className={`
        flex flex-col items-center rounded-2xl border overflow-hidden
        h-[278px] w-[150px] md:w-[248px] transition-all duration-300 cursor-pointer 
        focus:outline-none focus:ring-2 focus:ring-primary/40 hover:scale-[1.03]
        ${
          active
            ? "bg-secondary/10 border-secondary shadow-md"
            : "bg-white border-gray-200 hover:border-primary/40"
        }
      `}
    >
      <div className="relative w-full h-[189px]">
        <Image
          fill
          src={img}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 scale-105 hover:scale-110"
        />
      </div>

      <div
        className={`flex items-center justify-center flex-1 w-full text-primary ${
          active ? "bg-secondary font-bold" : "bg-default-100 font-semibold"
        }`}
      >
        <p
          className={`
            text-center text-[18px] transition-colors duration-200`}
        >
          {title}
        </p>
      </div>
    </button>
  );
};
