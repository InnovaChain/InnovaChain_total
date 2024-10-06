// make post request to backend url

import axios from "axios";

const backendUrl = <string>process.env.BACKEND_API_URL;

const api = axios.create({
    baseURL: backendUrl,
});

export default async function updatePrompt(imageId: number, prompt: string) {
    const url = `${backendUrl}/images/${imageId}/prompt`;

    const formData = new FormData();
    formData.append("prompt", prompt);

    const response = await api.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    console.log({ responseFromBackend: response.data });

    const data = await response.data;

    return data;
}
