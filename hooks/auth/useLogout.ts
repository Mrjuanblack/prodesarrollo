import apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";

const BASE_URL = "/logout";

const logout = async (userId: string): Promise<void> => {
  const response = await apiClient.post(BASE_URL, userId);
  return response.data;
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onError: (error) => {
      console.error(error);
    },
  });
};
