import apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";
import { SubmitPqrsFormType } from "@/domain/pqrs";

const BASE_URL = "/pqrs";

export interface SubmitPqrsPayload {
  values: SubmitPqrsFormType;
  files: File[];
}

const submitPqrs = async ({
  values,
  files,
}: SubmitPqrsPayload): Promise<void> => {
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

export const useSubmitPqrs = () => {
  return useMutation({
    mutationFn: submitPqrs,
  });
};
