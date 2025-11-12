import {
  ContentBlock,
  ContentSlideProps,
} from "./content-slide-card.properties";
import React from "react";
import Image from "next/image";
import { IconTitle } from "@/ui/molecules";

const ContentBlockCard: React.FC<{ item: ContentBlock; className: string }> = ({
  item,
  className,
}) => {
  const iconColor = "text-white";
  const iconBgColor = "bg-secondary";
  const classNameTitle = "text-white text-[12px] md:text-[16px] lg:text-[20px]";

  return (
    <div
      className={`flex flex-col h-full bg-primary md:bg-primary/60 rounded-b-2xl md:rounded-2xl p-4 md:p-6 lg:p-8 ${className}`}
    >
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

      <p className="text-white text-[12px] md:text-[16px] lg:text-[20px] leading-relaxed">
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
    <div className={`relative w-full h-[317px] lg:h-[580px] overflow-hidden`}>
      <div className="absolute inset-0 z-0 h-[230px] md:h-full">
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
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 md:p-10 lg:px-15 md:gap-7">
          {items.map((item, index) => (
            <ContentBlockCard
              item={item}
              key={item.id}
              className={`${index == 1 ? "hidden md:flex" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
