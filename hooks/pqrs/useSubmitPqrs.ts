import apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";
import { SubmitParticipateFormType } from "@/domain/participate";

const BASE_URL = "/pqrs";

const submitPqrs = async (pqrs: SubmitParticipateFormType): Promise<void> => {
  const response = await apiClient.post(BASE_URL, pqrs);
  return response.data;
};

export const useSubmitPqrs = () => {
  return useMutation({
    mutationFn: submitPqrs,
    onError: (error) => {
      console.error(error);
    },
  });
};
