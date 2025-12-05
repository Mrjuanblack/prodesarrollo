import apiClient from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteProject = async (projectId: string): Promise<void> => {
  const response = await apiClient.delete(`/project/${projectId}`);

  return response.data;
};

export const useDeleteProject = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
