import { News, UpdateNews } from "@/domain/News";
import apiClient from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseUpdateNewsProps {
    id: string;
    news: UpdateNews;
}

const updateNews = async (props: UseUpdateNewsProps): Promise<News> => {
    const response = await apiClient.put(`/news/${props.id}`, props.news);
    return response.data;
}

export const useUpdateNews = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (news: UpdateNews) => updateNews({ id, news }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news-list'] });
            queryClient.invalidateQueries({ queryKey: ['news', id] });
        },
        onError: (error) => {
            console.error(error);
        }
    });
}

