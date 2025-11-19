import { ConfirmUploadProjectDocument, MakeProjectDocumentPublicRequest, ProjectDocument } from "@/domain/ProjectDocument";
import apiClient from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postConfirmUpload = async (projectId: string, request: ConfirmUploadProjectDocument): Promise<ProjectDocument> => {
    const response = await apiClient.post(`/project/${projectId}/document/confirm-upload`, request);
    return response.data;
}

export const useConfirmUpload = (projectId: string) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (request: ConfirmUploadProjectDocument) => postConfirmUpload(projectId, request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });
        },
        onError: (error) => {
            console.error(error);
        }
    });
}