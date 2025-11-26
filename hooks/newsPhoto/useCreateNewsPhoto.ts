import { NewsPhoto } from "@/domain/NewsPhoto";
import apiClient from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createNewsPhoto = async (newsId: string, file: File): Promise<NewsPhoto> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post(`/news/${newsId}/photo`, formData, {
        headers: {
            'Content-Type': undefined, // Let axios set the Content-Type with boundary automatically
        },
    });
    return response.data;
}

export const useCreateNewsPhoto = (newsId: string) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (file: File) => createNewsPhoto(newsId, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news', newsId] });
        },
        onError: (error) => {
            console.error(error);
        }
    });
}

