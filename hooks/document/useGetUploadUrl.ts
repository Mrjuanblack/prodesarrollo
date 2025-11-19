import { CreateProjectDocumentRequest, CreateProjectDocumentResponse } from "@/domain/ProjectDocument";
import apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";

const getUploadUrl = async (projectId: string, request: CreateProjectDocumentRequest): Promise<CreateProjectDocumentResponse> => {
    const response = await apiClient.post(`/project/${projectId}/document/get-url`, request);
    return response.data;
}

export const useGetUploadUrl = (projectId: string) => {
    return useMutation({
        mutationFn: (request: CreateProjectDocumentRequest) => getUploadUrl(projectId, request),
        onError: (error) => {
            console.error(error);
        }
    });
}