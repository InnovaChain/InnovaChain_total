export async function urlToFile({ url, filename }: { url: string; filename: string }) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: "image/png" });
}

export async function convertUrlToFile({ url, filename }: { url: string; filename: string }) {
    const response = await fetch(url);
    const blob = await response.blob();

    // Convert Blob into a File object
    const file = new File([blob], filename, { type: blob.type });

    const a = document.createElement("a");

    // Create a download link for the file
    const dataUrl = URL.createObjectURL(file);
    a.href = dataUrl;
    a.download = filename;

    // Append the link to the document body (required for Firefox)
    document.body.appendChild(a);

    // Trigger the download by simulating a click event
    a.click();

    // Remove the link element
    document.body.removeChild(a);

    // Revoke the object URL to release memory
    URL.revokeObjectURL(dataUrl);

    return file;
}
