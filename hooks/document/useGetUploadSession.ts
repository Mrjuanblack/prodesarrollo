import { CreateProjectDocumentRequest, CreateProjectDocumentResponse } from "@/domain/ProjectDocument";
import apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";

const getUploadSession = async (projectId: string, request: CreateProjectDocumentRequest): Promise<CreateProjectDocumentResponse> => {
    const response = await apiClient.post(`/project/${projectId}/document/get-upload-session`, request);
    return response.data;
}

export const useGetUploadSession = (projectId: string) => {
    return useMutation({
        mutationFn: (request: CreateProjectDocumentRequest) => getUploadSession(projectId, request),
        onError: (error) => {
            console.error(error);
        }
    });
}