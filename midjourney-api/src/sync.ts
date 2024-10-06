// make post request to backend url

const backendUrl = process.env.BACKEND_API_URL;

const updatePrompt = async (imageId: number, prompt: string) => {
    const response = await fetch(`${backendUrl}/images/${imageId}/prompt`, {
        method: "POST",
        body: JSON.stringify({ image_id: imageId, prompt }),
        headers: { "Content-Type": "application/json" },
    });

    const body = await response.json();

    return body;
};
