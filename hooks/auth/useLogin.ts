import { User } from "@/domain/user";
import apiClient from "../api-client";
import { LoginFormType } from "@/domain/auth";
import { useMutation } from "@tanstack/react-query";

const BASE_URL = "/login";

const login = async (
  login: LoginFormType
): Promise<{ user: User; token: string }> => {
  const response = await apiClient.post(BASE_URL, login);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onError: (error) => {
      console.error(error);
    },
  });
};
