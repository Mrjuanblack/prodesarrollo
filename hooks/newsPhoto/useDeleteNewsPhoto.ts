import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api-client";

const deleteNewsPhoto = async (newsId: string, photoId: string): Promise<void> => {
    const response = await apiClient.delete(`/news/${newsId}/photo/${photoId}`);
    return response.data;
}

export const useDeleteNewsPhoto = (newsId: string) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (photoId: string) => deleteNewsPhoto(newsId, photoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news', newsId] });
        },
        onError: (error) => {
            console.error(error);
        }
    });
}

