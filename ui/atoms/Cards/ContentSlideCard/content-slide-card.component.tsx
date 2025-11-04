import {
  ContentBlock,
  ContentSlideProps,
} from "./content-slide-card.properties";
import React from "react";
import Image from "next/image";
import { IconTitle } from "@/ui/molecules";

const ContentBlockCard: React.FC<{ item: ContentBlock }> = ({ item }) => {
  const iconColor = "text-white";
  const iconBgColor = "bg-secondary";
  const classNameTitle = "text-md md:text-[20px] text-white";

  return (
    <div className="flex flex-col h-full bg-primary/60 rounded-2xl p-8">
      <div className="flex items-start mb-3">
        <IconTitle
          Icon={item.icon}
          title={item.title}
          iconColor={iconColor}
          iconBgColor={iconBgColor}
          highlightFirstLetter={false}
          classNameTitle={classNameTitle}
        />
      </div>

      <p className="text-white text-[14px] lg:text-[20px] leading-relaxed">
        {item.description}
      </p>
    </div>
  );
};

export const ContentSlideCardComponent: React.FC<ContentSlideProps> = ({
  img,
  items,
}) => {
  return (
    <div className="relative w-full h-[580px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={img}
          layout="fill"
          quality={80}
          objectFit="cover"
          alt="Fondo de la iniciativa"
          className="will-change-transform"
        />
      </div>

      <div className="absolute inset-0 z-2 flex flex-col justify-end">
        <div className="gap-7 p-7 md:p-20 grid grid-cols-1 md:grid-cols-2 md:gap-12 w-full h-auto">
          {items.map((item) => (
            <ContentBlockCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
