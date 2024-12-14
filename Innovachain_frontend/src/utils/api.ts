import axios, { type AxiosInstance } from "axios";
import { API_URL, MIDJOURNEY_API_URL } from "../constants";
import { SECOND } from "./time";
export interface UploadImageParams {
    file?: File;
    image_url?: string;
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
    user: {
        id: number;
        wallet_address: string;
    };
    watermark: string;
    like_count: number;
    reference_count: number;
    reward: number;
}

export interface ProductInfo {
    id: number;
    user_id: number;
    user: {
        id: number;
        wallet_address: string;
    };
    filename: string;
    prompt: string;
    source_image_id: number | null;
    watermark: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    like_count: number;
    reference_count: number;
    reward: number;
    is_liked_by_user: boolean;
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

export async function uploadImage({ file, image_url, walletAddress, name, description, prompt = "", sourceImageId }: UploadImageParams): Promise<{
    image_id: number;
    watermark: string;
    filename: string;
}> {
    const url = "/upload/";

    const formData = new FormData();

    if ((file === undefined && image_url === undefined) || (file !== undefined && image_url !== undefined)) {
        throw new Error("Either file or image_url must be provided, but not both.");
    }

    if (file) {
        formData.append("file", file, file.name);
    }

    if (image_url) {
        formData.append("image_url", image_url);
    }

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

export async function getImages({ skip = 0, limit = 50 }: { skip: number; limit: number }): Promise<ImageType[]> {
    const url = "/images/";
    const response = await api.get<ImageType[]>(url, {
        params: {
            skip,
            limit,
        },
    });

    return response.data;
}

export async function getImageById(id: number): Promise<Blob> {
    const url = `/images/${id}`;
    const response = await api.get<Blob>(url);
    return response.data;
}

export async function getSourceImageIdList(id: number) {
    const url = `/images/source/${id}`;
    const response = await api.get<{
        source_image_id_list: number[];
    }>(url);
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

export async function likeImage({ imageId, userId }: { imageId: number; userId: number }) {
    const url = `${API_URL}/images/${imageId}/like/increment?user_id=${userId}`;
    const res = await api.post(url);

    return res.data;
}

export async function unlikeImage({ imageId, userId }: { imageId: number; userId: number }) {
    const url = `${API_URL}/images/${imageId}/like/decrement?user_id=${userId}`;

    const res = await api.post(url);

    return res.data;
}

export async function createUser({ wallet_address }: { wallet_address: `0x${string}` }) {
    const url = `${API_URL}/users/`;
    const res = await api.post(url, {
        wallet_address,
    });

    return res.data;
}

export async function getUserStats({ userId }: { userId: number | null }) {
    const url = `${API_URL}/users/${userId}/stats`;
    const res = await api.get(url);
    return res.data;
}

export async function getUserLikeStatusOfImage({ imageId, userId }: { imageId: number; userId: number }) {
    const url = `${API_URL}/images/${imageId}/like/status?user_id=${userId}`;
    const res = await api.get(url);
    return res.data;
}

export async function increaseReference({ imageId }: { imageId: number }) {
    const url = `${API_URL}/images/${imageId}/reference/increment`;
    const res = await api.post(url);
    return res.data;
}

export async function getUserImages({ userId }: { userId: number }) {
    const url = `${API_URL}/users/${userId}`;
    const res = await api.get(url);
    return res.data as {
        id: number;
        wallet_address: string;
        images: number[];
        detailed_images: ImageType[];
    };
}

export async function getTotalImagesCount() {
    const url = `${API_URL}/images/count/`; // closing slash is important
    const res = await api.get(url);
    return res.data as { total_count: number };
}
