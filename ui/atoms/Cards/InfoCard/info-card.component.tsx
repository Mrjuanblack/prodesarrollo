import React from "react";
import { Cog } from "lucide-react";
import { InfoCardProps } from "./info-card.properties";
import { Text, Title } from "../..";

export const InfoCardComponent: React.FC<InfoCardProps> = ({ item }) => {
  const { title, description } = item;

  return (
    <div className="flex flex-col items-center text-center bg-white border border-secondary rounded-2xl p-6 pt-0 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-primary mb-5 rounded-full bg-white border border-secondary h-[124px] w-[124px] flex items-center justify-center shadow-lg -mt-17">
        <Cog size={60} />
      </div>

      <Title text={title} className="mb-8 text-[20px]" />

      <Text
        text={description}
        className="text-black text-[18px] leading-relaxed"
      />
    </div>
  );
};
