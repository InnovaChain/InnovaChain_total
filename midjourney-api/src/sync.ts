// make post request to backend url

const backendUrl = <string>process.env.BACKEND_API_URL;

const updatePrompt = async (imageId: number, prompt: string) => {
    const url = `${backendUrl}/images/${imageId}/prompt`;

    const formData = new FormData();
    formData.append("prompt", prompt);
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const body = await response.json();

        return body;
    } catch (e) {
        console.error(e);
        return { message: e };
    }
};
