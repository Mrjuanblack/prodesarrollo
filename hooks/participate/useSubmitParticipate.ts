import apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";
import { SubmitParticipate } from "@/domain/participate";

const BASE_URL = "/participate";

const submitParticipate = async (
  participate: SubmitParticipate
): Promise<void> => {
  const response = await apiClient.post(BASE_URL, participate);
  return response.data;
};

export const useSubmitParticipate = () => {
  return useMutation({
    mutationFn: submitParticipate,
    onError: (error) => {
      console.error(error);
    },
  });
};
