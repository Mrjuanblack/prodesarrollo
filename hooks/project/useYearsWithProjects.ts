import { useQuery } from "@tanstack/react-query";
import apiClient from "../api-client";

const fetchYearsWithProjects = async (): Promise<number[]> => {
    const response = await apiClient.get('/project/years');
    return response.data;
}

export const useYearsWithProjects = () => {
    return useQuery({
        queryKey: ['years-with-projects'],
        queryFn: fetchYearsWithProjects,
    });
}