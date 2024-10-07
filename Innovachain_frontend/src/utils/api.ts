import axios, { type AxiosInstance } from "axios";
import { SECOND } from "./time";
import { API_URL, MIDJOURNEY_API_URL } from "../constants";
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

export interface ProductInfo {
    id: number;
    user_id: number;
    filename: string;
    prompt: string;
    source_image_id: string | null;
    watermark: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface ImagineResponse {
    id: string;
    flags: number;
    content: string;
    hash: string;
    progress: string;
    uri: string;
    proxy_url: string;
    options: [
        {
            type: 2;
            style: 2;
            label: "U1";
            custom: string;
        },
        {
            type: 2;
            style: 2;
            label: "U2";
            custom: string;
        },
        {
            type: 2;
            style: 2;
            label: "U3";
            custom: string;
        },
        {
            type: 2;
            style: 2;
            label: "U4";
            custom: string;
        },
        {
            type: 2;
            style: 2;
            label: "🔄";
            custom: string;
        },
        {
            type: 2;
            style: 2;
            label: "V1";
            custom: string;
        },
        {
            type: 2;
            style: 2;
            label: "V2";
            custom: string;
        },
        {
            type: 2;
            style: 2;
            label: "V3";
            custom: string;
        },
        {
            type: 2;
            style: 2;
            label: "V4";
            custom: string;
        },
    ];
    width: number;
    height: number;
}

export const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 300 * SECOND,
});

export async function uploadImage({ file, walletAddress, name, description, prompt = "", sourceImageId }: UploadImageParams): Promise<{
    image_id: number;
    watermark: string;
    filename: string;
}> {
    const url = "/upload/";

    const formData = new FormData();

    console.log("file", file, file.name);
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
            "Remote-Address": "216.24.57.4:443",
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

export async function readImageInfo(imageId: number) {
    const url = `/images/info/${imageId}`;
    const response = await api.get(url);
    return response.data as ProductInfo;
}

export async function describeImage({ imageId }: { imageId: number }): Promise<unknown> {
    const response = await api.post(`${MIDJOURNEY_API_URL}/describe`, {
        imageId,
        imageUrl: `${API_URL}/images/${imageId}`,
    });

    return response.data;
}

export async function imagineImage({ imageId, revisedPrompt }: { imageId: number; revisedPrompt: string }): Promise<ImagineResponse> {
    const response = await api.post(`${MIDJOURNEY_API_URL}/imagine`, {
        prompt: `${API_URL}/images/${imageId}, ${revisedPrompt}`,
    });

    return response.data;
}

export async function varyImage({
    index,
    msgId,
    hash,
    content,
    flags,
}: {
    index: 1 | 2 | 3 | 4;
    msgId: string;
    hash: string;
    content?: string;
    flags: number;
}): Promise<ImagineResponse> {
    const response = await api.post(`${MIDJOURNEY_API_URL}/variation`, {
        index,
        msgId,
        hash,
        content,
        flags,
    });

    return response.data;
}

export async function upscaleImage({
    index,
    msgId,
    hash,
    content,
    flags,
}: {
    index: 1 | 2 | 3 | 4;
    msgId: string;
    hash: string;
    content?: string;
    flags: number;
}): Promise<ImagineResponse> {
    const response = await api.post(`${MIDJOURNEY_API_URL}/upscale`, {
        index,
        msgId,
        hash,
        content,
        flags,
    });

    return response.data;
}

export async function rerollImage({
    msgId,
    hash,
    content,
    flags,
}: {
    msgId: string;
    hash: string;
    content?: string;
    flags: number;
}): Promise<ImagineResponse> {
    const response = await api.post(`${MIDJOURNEY_API_URL}/reroll`, {
        msgId,
        hash,
        content,
        flags,
    });

    return response.data;
}
