import apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";
import { LoginFormType, LoginResponse } from "@/domain/auth";

const BASE_URL = "/auth/login";

const login = async (login: LoginFormType): Promise<LoginResponse> => {
  const response = await apiClient.post(BASE_URL, login);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
