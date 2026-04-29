import apiClient from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HomeCarouselSlide, SlideCards } from "@/domain/HomeCarouselSlide";
import { HOME_CAROUSEL_KEY } from "./useHomeCarousel";

interface CreateSlideInput {
  file: File;
  cards: SlideCards;
}

const createSlide = async (
  input: CreateSlideInput
): Promise<HomeCarouselSlide> => {
  const formData = new FormData();
  formData.append("file", input.file);
  formData.append("cards", JSON.stringify(input.cards));

  const response = await apiClient.post("/home-carousel", formData, {
    headers: { "Content-Type": undefined },
  });
  return response.data;
};

export const useCreateSlide = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSlide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HOME_CAROUSEL_KEY });
    },
  });
};
