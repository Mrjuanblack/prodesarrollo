import apiClient from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HOME_CAROUSEL_KEY } from "./useHomeCarousel";

interface ReorderInput {
  orders: { id: string; displayOrder: number }[];
}

const reorderSlides = async (input: ReorderInput): Promise<void> => {
  await apiClient.patch("/home-carousel/reorder", input);
};

export const useReorderSlides = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reorderSlides,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HOME_CAROUSEL_KEY });
    },
  });
};
