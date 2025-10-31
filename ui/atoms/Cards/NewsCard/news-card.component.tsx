"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/react";
import { NewsCardProps } from "./news-card.properties";
import noticiaExample from "@/public/noticia-example.svg";
import { Button } from "../..";

export const NewsCardComponent: React.FC<NewsCardProps> = ({ item }) => {
  const router = useRouter();

  const { date, image, title, category } = item;

  return (
    <Card
      shadow="lg"
      isPressable
      className={`relative ${
        image ? "h-[303px]" : "h-[360px]"
      } rounded-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          alt={title}
          quality={80}
          layout="fill"
          priority={true}
          objectFit="contain"
          src={noticiaExample}
          className="scale-200"
        />
      </div>

      <div className="absolute inset-0 bg-black/50 z-1" />

      <CardBody className="px-15 flex flex-row items-center h-full relative z-2 gap-15">
        {image && (
          <div className="h-[200px] w-[194px] flex items-center">
            <Image
              quality={80}
              priority={true}
              alt="img section"
              className="object-cover"
              src={noticiaExample}
            />
          </div>
        )}

        <div>
          <div className="flex flex-col">
            <div
              className={`${
                image ? "self-start" : "self-center"
              } mb-6 rounded-full px-5 py-2 bg-primary shadow-md`}
            >
              <p className="text-white text-[20px] font-semibold">{category}</p>
            </div>

            <h3
              className={`text-white ${
                image ? "text-[20px]" : "text-[25px] text-center"
              } font-extrabold mb-2 leading-snug`}
            >
              {title}
            </h3>
          </div>

          <p
            className={`text-white/90 ${
              image ? "text-[18px]" : "text-[20px] text-center"
            } font-light`}
          >
            {date}
          </p>

          {image && (
            <Button
              text="Leer más"
              variant="solid"
              onClick={() => {
                if (item.href) {
                  router.push(item.href);
                }
              }}
              className="bg-white border-2 border-primary mt-7 text-[20px]"
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
};
