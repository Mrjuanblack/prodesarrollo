import apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";
import { SubmitParticipateFormType } from "@/domain/participate";

const BASE_URL = "/participate";

const submitParticipate = async (
  participate: SubmitParticipateFormType
): Promise<void> => {
  const response = await apiClient.post(BASE_URL, participate);
  return response.data;
};

export const useSubmitParticipate = () => {
  return useMutation({
    mutationFn: submitParticipate,
  });
};
