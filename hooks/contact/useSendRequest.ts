import apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";
import { SendRequestFormType } from "@/domain/contact";

const BASE_URL = "/contact";

const sendRequest = async (request: SendRequestFormType): Promise<void> => {
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
