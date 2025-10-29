import Image from "next/image";
import { Card, CardBody } from "@heroui/react";
import { NewsCardProps } from "./news-card.properties";

export const NewsCardComponent: React.FC<NewsCardProps> = ({ item }) => {
  const { date, image, title, category } = item;

  return (
    <Card
      shadow="lg"
      isPressable
      className="relative h-80 rounded-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="absolute inset-0 z-0  h-[360px]">
        <Image
          src={image}
          alt={title}
          quality={80}
          layout="fill"
          priority={true}
          objectFit="cover"
        />
      </div>

      <div className="absolute inset-0 bg-black/50 z-1" />

      <CardBody className="p-8 flex flex-col justify-center h-full relative z-2">
        <div className="self-center mb-6 rounded-full px-5 py-2 bg-primary shadow-md">
          <p className="text-white text-base font-semibold">{category}</p>
        </div>

        <h3 className="text-white text-2xl font-extrabold mb-2 leading-snug text-center">
          {title}
        </h3>

        <p className="text-white/90 text-sm font-light text-center">{date}</p>
      </CardBody>
    </Card>
  );
};
