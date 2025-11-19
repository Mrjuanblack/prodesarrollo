import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api-client";

const deleteDocument = async (projectId: string, documentId: string): Promise<void> => {
    const response = await apiClient.delete(`/project/${projectId}/document/${documentId}`);
    return response.data;
}

export const useDeleteDocument = (projectId: string) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (documentId: string) => deleteDocument(projectId, documentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });
        },
        onError: (error) => {
            console.error(error);
        }
    });
}