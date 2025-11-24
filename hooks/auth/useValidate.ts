import apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";

const BASE_URL = "/validate";

interface ValidateUserData {
  token: string;
  userId: string;
}

const validateUser = async (data: ValidateUserData): Promise<void> => {
  const response = await apiClient.post(BASE_URL, data);
  return response.data;
};

export const useValidateUser = () => {
  return useMutation({
    mutationFn: validateUser,
    onError: (error) => {
      console.error(error);
    },
  });
};
