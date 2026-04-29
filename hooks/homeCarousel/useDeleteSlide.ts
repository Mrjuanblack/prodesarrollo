import apiClient from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HOME_CAROUSEL_KEY } from "./useHomeCarousel";

const deleteSlide = async (id: string): Promise<void> => {
  await apiClient.delete(`/home-carousel/${id}`);
};

export const useDeleteSlide = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSlide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HOME_CAROUSEL_KEY });
    },
  });
};
