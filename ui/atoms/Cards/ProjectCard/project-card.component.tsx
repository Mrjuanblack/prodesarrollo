import Image from "next/image";
import { ProjectCardProps } from "./project-card.properties";

export const ProjectCardComponent: React.FC<ProjectCardProps> = ({ item }) => {
  const { title, date, imageUrl, imageAlt } = item;

  return (
    <div
      onClick={() => {}}
      className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105 cursor-pointer"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 leading-tight mb-2">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mb-4">{date}</p>

        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
