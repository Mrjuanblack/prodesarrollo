import { PaginationResponse } from "@/domain/Pagination";
import { Project, ProjectType } from "@/domain/Projects";
import apiClient from "../api-client";
import { useQuery } from "@tanstack/react-query";

interface UseProjectsProps {
    page: number;
    size: number;
    year?: number;
    type?: ProjectType;
}

const fetchProjects = async (props: UseProjectsProps): Promise<PaginationResponse<Project>> => {
    const response = await apiClient.get('/project', {
        params: {
            page: props.page,
            size: props.size,
            year: props.year,
            type: props.type,
        },
    });
    return response.data;
}

export const useProjects = (props: UseProjectsProps) => {
    return useQuery({
        queryKey: ['projects', props.page, props.size],
        queryFn: () => fetchProjects(props),
        placeholderData: (previousData) => previousData,
    });
}