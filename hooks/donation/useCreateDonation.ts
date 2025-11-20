import apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";
import { SubmitParticipate } from "@/domain/participate";

const BASE_URL = "/donations";

const createDonation = async (donation: SubmitParticipate): Promise<void> => {
  const response = await apiClient.post(BASE_URL, donation);
  return response.data;
};

export const useCreateDonation = () => {
  return useMutation({
    mutationFn: createDonation,
    onError: (error) => {
      console.error(error);
    },
  });
};
