import { News } from "@/domain/News";
import apiClient from "../api-client";
import { useQuery } from "@tanstack/react-query";

const fetchNew = async (id: string): Promise<News> => {
  const response = await apiClient.get(`/news/${id}`);
  return response.data;
};

export const useNew = (id: string) => {
  return useQuery({
    queryKey: ["new", id],
    queryFn: () => fetchNew(id),
  });
};

export default useNew;
