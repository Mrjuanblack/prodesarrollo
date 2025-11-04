import { MakeProjectDocumentPublicRequest, MakeProjectDocumentPublicResponse } from "@/domain/ProjectDocument";
import apiClient from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postMakePublic = async (projectId: string, request: MakeProjectDocumentPublicRequest): Promise<MakeProjectDocumentPublicResponse> => {
    const response = await apiClient.post(`/project/${projectId}/document/make-public`, request);
    return response.data;
}

export const useMakePublic = (projectId: string) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (request: MakeProjectDocumentPublicRequest) => postMakePublic(projectId, request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });
        },
        onError: (error) => {
            console.error(error);
        }
    });
}