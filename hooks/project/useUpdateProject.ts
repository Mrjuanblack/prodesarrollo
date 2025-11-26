import { Project, UpdateProject } from "@/domain/Projects";
import apiClient from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseUpdateProjectProps {
    id: string;
    project: UpdateProject;
}

const updateProject = async (props: UseUpdateProjectProps): Promise<Project> => {
    const response = await apiClient.put(`/project/${props.id}`, props.project);
    return response.data;
}

export const useUpdateProject = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['project', id] });
        },
        onError: (error) => {
            console.error(error);
        }
    });
}