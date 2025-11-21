import apiClient from "../api-client";
import { CreateUserFormType } from "@/domain/user";
import { useMutation } from "@tanstack/react-query";

const BASE_URL = "/users";

const createUser = async (user: CreateUserFormType): Promise<void> => {
  const response = await apiClient.post(BASE_URL, user);
  return response.data;
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onError: (error) => {
      console.error(error);
    },
  });
};
