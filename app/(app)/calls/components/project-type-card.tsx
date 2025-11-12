import React from "react";
import Image from "next/image";
import { getProjectTypeLabel, ProjectType } from "@/domain/Projects";
import noticiaExample from "@/public/noticia-example.svg";

interface ProjectTypeCardProps {
  type: ProjectType;
  active?: boolean;
  onClick?: (value: ProjectType) => void;
}

const getProjectTypeImagePath = (type: ProjectType): string => {
  switch(type) {
    case ProjectType.INTERVENTORY:
      return noticiaExample;
    case ProjectType.CIVIL_WORKS:
      return noticiaExample;
    case ProjectType.SUPPLY_PROCESSES:
      return noticiaExample;
    case ProjectType.SERVICE_DELIVERY_PROCESSES:
      return noticiaExample;
    case ProjectType.CONSULTING_PROCESSES:
      return noticiaExample;
  }
}

export const ProjectTypeCard: React.FC<ProjectTypeCardProps> = ({
  type,
  active = false,
  onClick,
}) => {
  const img = getProjectTypeImagePath(type);
  const title = getProjectTypeLabel(type);

  return (
    <button
      type="button"
      onClick={() => onClick?.(type)}
      className={`w-full flex flex-col items-center rounded-2xl border overflow-hidden
        h-[212px] md:h-[258px] lg:h-[278px] transition-all duration-300 cursor-pointer 
        focus:outline-none focus:ring-2 focus:ring-primary/40 hover:scale-[1.03]
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
            text-center text-[14px] md:text-[16px] lg:text-[18px] transition-colors duration-200`}
        >
          {title}
        </p>
      </div>
    </button>
  );
};
