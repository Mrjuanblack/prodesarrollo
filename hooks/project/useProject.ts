import apiClient from "../api-client";
import { Project } from "@/domain/Projects";
import { useQuery } from "@tanstack/react-query";

const fetchProject = async (id: string): Promise<Project> => {
  const response = await apiClient.get(`/project/${id}`);
  return response.data;
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProject(id),
  });
};

export default useProject;
