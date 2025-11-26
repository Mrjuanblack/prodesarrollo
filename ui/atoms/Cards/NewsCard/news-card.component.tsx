"use client";

import Image from "next/image";
import { Button } from "../..";
import { useRouter } from "next/navigation";
import { NewsCardProps } from "./news-card.properties";
import noticiaExample from "@/public/noticia-example.svg";
import { getProdOrDevSuffix } from "@/utils/utils";
import { getNewsCategoryLabel } from "@/domain/News";

export const NewsCardComponent: React.FC<NewsCardProps> = ({ item, showImage = false }) => {
  const router = useRouter();

  const hasImage = showImage  && item.photos.length > 0;
  const image = item.photos[0]?.url;
  const imageUrl = `https://storage.googleapis.com/${
    process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET_NAME
  }/${getProdOrDevSuffix()}/${image}`

  return (
    <div
      className={`relative ${
        hasImage ? "h-fit md:h-[303px]" : "h-[360px]"
      } rounded-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 shadow-lg`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          alt={item.title}
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
        {hasImage && (
          <div className="h-[200px] w-[194px] relative overflow-hidden rounded-lg">
            <Image
              quality={80}
              priority={true}
              alt="img section"
              fill
              className="object-cover"
              src={imageUrl}
            />
          </div>
        )}

        <div>
          <div className="flex flex-col justify-center items-center">
            <div
              className={`${
                hasImage ? "self-start" : "self-center"
              } mb-4 lg:mb-7 rounded-full px-5 py-2 bg-primary shadow-md`}
            >
              <p className="text-white text-[13px] md:text-[15px] lg:text-[20px] font-semibold">
                {getNewsCategoryLabel(item.category)}
              </p>
            </div>

            <h3
              className={`text-white ${
                hasImage
                  ? "text-[13px] md:text-[15px] lg:text-[20px]"
                  : "text-[15px] md:text-[20px] lg:text-[25px] text-center"
              } font-extrabold mb-2 leading-snug`}
            >
              {item.title}
            </h3>
          </div>

          <p
            className={`text-[12px] md:text-[15px]  lg:text-[20px] text-white/90 ${
              hasImage ? "" : "text-center"
            } font-light`}
          >
            {item.createdAt.toLocaleDateString()}
          </p>

          {hasImage && (
            <Button
              text="Leer más"
              variant="solid"
              onClick={() => {
                router.push(`/news/${item.id}`);
              }}
              className="bg-white border-2 border-primary mt-4 lg:mt-7"
            />
          )}
        </div>
      </div>
    </div>
  );
};
