import apiClient from "../api-client";
import { CreateUser, User } from "@/domain/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "/user";

const createUser = async (user: CreateUser): Promise<User> => {
  const response = await apiClient.post(BASE_URL, user);
  return response.data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
