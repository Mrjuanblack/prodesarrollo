import Image from "next/image";
import { ProjectCardProps } from "./project-card.properties";

export const ProjectCardComponent: React.FC<ProjectCardProps> = ({ item }) => {
  const { title, date, imageUrl, imageAlt } = item;

  return (
    <div className="flex flex-col justify-between p-6 lg:p-8 bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-103 cursor-pointer h-full">
      <div>
        <h3 className="text-[15px] lg:text-[18px] font-semibold text-black leading-tight mb-2">
          {title}
        </h3>

        <p className="text-[13px] lg:text-[15px] text-gray-500 mb-4">{date}</p>
      </div>

      <div className="relative w-full h-[230px] rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};
