import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api-client";

const deleteProjectPhoto = async (projectId: string, photoId: string): Promise<void> => {
    const response = await apiClient.delete(`/project/${projectId}/photo/${photoId}`);
    return response.data;
}

export const useDeleteProjectPhoto = (projectId: string) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (photoId: string) => deleteProjectPhoto(projectId, photoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });
        },
        onError: (error) => {
            console.error(error);
        }
    });
}

