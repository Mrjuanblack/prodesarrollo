import apiClient from "../api-client";
import { CreateProject, Project } from "@/domain/Projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createProject = async (project: CreateProject): Promise<Project> => {
  const response = await apiClient.post("/project", project);
  return response.data;
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
