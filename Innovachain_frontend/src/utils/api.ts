import axios, { type AxiosInstance } from "axios";
import { SECOND } from "./time";
import { API_URL } from "../constants";
export interface UploadImageParams {
  file: File;
  walletAddress: string;
  name: string;
  description: string;
  prompt?: string;
  sourceImageId?: number;
}

export interface ImageType {
  created_at: string;
  description: string;
  filename: string;
  id: number;
  image_path: string;
  name: string;
  prompt: string;
  source_image_id: number;
  updated_at: string;
  user_id: number;
  watermark: string;
}

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10 * SECOND,
});

export async function uploadImage({
  file,
  walletAddress,
  name,
  description,
  prompt = "",
  sourceImageId,
}: UploadImageParams): Promise<string> {
  const url = "/upload/";

  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("wallet_address", walletAddress);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("prompt", prompt);

  if (sourceImageId !== undefined) {
    formData.append("source_image_id", sourceImageId.toString());
  }

  const response = await api.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function getImages(): Promise<ImageType[]> {
  const url = "/images/";
  const response = await api.get<ImageType[]>(url);
  return response.data;
}

export async function getImageById(id: number): Promise<Blob> {
  const url = `/images/${id}`;
  const response = await api.get<Blob>(url);
  return response.data;
}

export async function readImageInfo(imageId: number): Promise<any> {
  const url = `/images/info/${imageId}`;
  const response = await api.get(url);
  return response.data;
}
