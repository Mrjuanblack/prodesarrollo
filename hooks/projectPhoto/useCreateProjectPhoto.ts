import { ProjectPhoto } from "@/domain/ProjectPhoto";
import apiClient from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createProjectPhoto = async (projectId: string, file: File): Promise<ProjectPhoto> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post(`/project/${projectId}/photo`, formData, {
        headers: {
            'Content-Type': undefined, // Let axios set the Content-Type with boundary automatically
        },
    });
    return response.data;
}

export const useCreateProjectPhoto = (projectId: string) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (file: File) => createProjectPhoto(projectId, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });
        },
        onError: (error) => {
            console.error(error);
        }
    });
}

