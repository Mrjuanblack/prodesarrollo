import apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";
import { SubmitParticipateFormType } from "@/domain/participate";

const BASE_URL = "/participate";

export interface SubmitParticipatePayload {
  values: SubmitParticipateFormType;
  files: File[];
}

const submitParticipate = async ({
  values,
  files,
}: SubmitParticipatePayload): Promise<void> => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  files.forEach((file) => formData.append("files", file));

  const response = await apiClient.post(BASE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const useSubmitParticipate = () => {
  return useMutation({
    mutationFn: submitParticipate,
  });
};
