import apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";

const uploadInlineImage = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiClient.post("/news/inline-image", formData, {
    headers: { "Content-Type": undefined },
  });
  return response.data;
};

export const useUploadInlineImage = () =>
  useMutation({ mutationFn: uploadInlineImage });
