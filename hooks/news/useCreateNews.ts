import apiClient from "../api-client";
import { CreateNews, News } from "@/domain/News";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createNews = async (news: CreateNews): Promise<News> => {
  const response = await apiClient.post("/news", news);
  return response.data;
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news-list"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

