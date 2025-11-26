import { useQuery } from "@tanstack/react-query";
import apiClient from "../api-client";
import { News } from "@/domain/News";

const fetchNews = async (id: string): Promise<News> => {
    const response = await apiClient.get(`/news/${id}`);
    return response.data;
}

export const useNews = (id: string) => {
    return useQuery({
        queryKey: ['news', id],
        queryFn: () => fetchNews(id),
    });
}

export default useNews;

