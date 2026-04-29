import apiClient from "../api-client";
import { useQuery } from "@tanstack/react-query";
import { HomeCarouselSlide } from "@/domain/HomeCarouselSlide";

const fetchSlides = async (): Promise<HomeCarouselSlide[]> => {
  const response = await apiClient.get("/home-carousel");
  // The API returns Date strings; coerce them so consumers can format dates.
  return response.data.map((slide: HomeCarouselSlide) => ({
    ...slide,
    createdAt: new Date(slide.createdAt),
    updatedAt: new Date(slide.updatedAt),
  }));
};

export const HOME_CAROUSEL_KEY = ["home-carousel"] as const;

export const useHomeCarousel = () =>
  useQuery({
    queryKey: HOME_CAROUSEL_KEY,
    queryFn: fetchSlides,
  });
