import apiClient from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HomeCarouselSlide, SlideCards } from "@/domain/HomeCarouselSlide";
import { HOME_CAROUSEL_KEY } from "./useHomeCarousel";

interface UpdateSlideInput {
  id: string;
  file?: File;
  cards: SlideCards;
}

const updateSlide = async (
  input: UpdateSlideInput
): Promise<HomeCarouselSlide> => {
  const formData = new FormData();
  if (input.file) formData.append("file", input.file);
  formData.append("cards", JSON.stringify(input.cards));

  const response = await apiClient.put(
    `/home-carousel/${input.id}`,
    formData,
    { headers: { "Content-Type": undefined } }
  );
  return response.data;
};

export const useUpdateSlide = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSlide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HOME_CAROUSEL_KEY });
    },
  });
};
