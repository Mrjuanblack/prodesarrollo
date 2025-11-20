import apiClient from "../api-client";
import { SendRequest } from "@/domain/contact";
import { useMutation } from "@tanstack/react-query";

const BASE_URL = "/contact";

const sendRequest = async (request: SendRequest): Promise<void> => {
  const response = await apiClient.post(BASE_URL, request);
  return response.data;
};

export const useSendRequest = () => {
  return useMutation({
    mutationFn: sendRequest,
    onError: (error) => {
      console.error(error);
    },
  });
};
