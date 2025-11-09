"use client";

import Image from "next/image";
import { Button } from "../..";
import { useRouter } from "next/navigation";
import { NewsCardProps } from "./news-card.properties";
import noticiaExample from "@/public/noticia-example.svg";

export const NewsCardComponent: React.FC<NewsCardProps> = ({ item }) => {
  const router = useRouter();

  const { date, image, title, category } = item;

  return (
    <div
      className={`relative ${
        image ? "h-fit md:h-[303px]" : "h-[360px]"
      } rounded-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 shadow-lg`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          alt={title}
          quality={80}
          layout="fill"
          priority={true}
          objectFit="contain"
          src={noticiaExample}
          className="scale-200 md:scale-300 lg:scale-200"
        />
      </div>

      <div className="absolute inset-0 bg-black/50 z-1" />

      <div className="px-7 md:px-10 lg:px-15 flex flex-row items-center justify-center h-full relative z-2 gap-7 md:gap-10 lg:gap-15">
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
              } mb-4 lg:mb-7 rounded-full px-5 py-2 bg-primary shadow-md`}
            >
              <p className="text-white text-[13px] md:text-[15px] lg:text-[20px] font-semibold">
                {category}
              </p>
            </div>

            <h3
              className={`text-white ${
                image
                  ? "text-[13px] md:text-[15px] lg:text-[20px]"
                  : "text-[15px] md:text-[20px] lg:text-[25px] text-center"
              } font-extrabold mb-2 leading-snug`}
            >
              {title}
            </h3>
          </div>

          <p
            className={`text-[12px] md:text-[15px]  lg:text-[20px] text-white/90 ${
              image ? "" : "text-center"
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
              className="bg-white border-2 border-primary mt-4 lg:mt-7"
            />
          )}
        </div>
      </div>
    </div>
  );
};
