import {
  ContentBlock,
  ContentSlideProps,
} from "./content-slide-card.properties";
import React from "react";
import Image from "next/image";
import { IconTitle } from "@/ui/molecules";

const ContentBlockCard: React.FC<{ item: ContentBlock }> = ({ item }) => {
  const iconColor = "text-white";
  const titleColor = "text-white";
  const iconBgColor = "bg-secondary";

  return (
    <div className="flex flex-col h-full bg-primary/70 rounded-xl p-8">
      <div className="flex items-start mb-3">
        <IconTitle
          Icon={item.icon}
          title={item.title}
          iconColor={iconColor}
          titleColor={titleColor}
          iconBgColor={iconBgColor}
          highlightFirstLetter={false}
        />
      </div>

      <p className="text-white text-sm leading-relaxed">{item.description}</p>
    </div>
  );
};

export const ContentSlideCardComponent: React.FC<ContentSlideProps> = ({
  img,
  items,
}) => {
  return (
    <div className="relative w-full h-[580px] overflow-hidden ">
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
        <div className="m-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full h-auto">
            {items.map((item) => (
              <ContentBlockCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
