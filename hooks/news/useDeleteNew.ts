import apiClient from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteNew = async (newId: string): Promise<void> => {
  const response = await apiClient.delete(`/news/${newId}`);

  return response.data;
};

export const useDeleteNew = (newId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteNew(newId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news-list"] });
    },
  });
};
