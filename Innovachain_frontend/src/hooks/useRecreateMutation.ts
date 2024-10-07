import { useMutation } from "@tanstack/react-query";
import { imagineImage, uploadImage } from "../utils/api";
import { convertUrlToFile } from "../utils/urlToFile";

export function useImagineMutation() {
    return useMutation({
        mutationKey: ["recreate"],
        mutationFn: async ({ imageId, revisedPrompt }: { imageId: number; revisedPrompt: string }) => {
            const recreateResponse = await imagineImage({
                imageId,
                revisedPrompt,
            });
            return recreateResponse;
        },
    });
}

export function useConfirmRecreateMutation() {
    return useMutation({
        mutationKey: ["confirmRecreate"],
        mutationFn: async ({
            imageUrl,
            walletAddress,
            name,
            description,
            revisedPrompt,
            sourceImageId,
        }: {
            imageUrl: string;
            walletAddress: string;
            name: string;
            description: string;
            revisedPrompt: string;
            sourceImageId: number;
        }) => {
            const file = await convertUrlToFile({ url: imageUrl, filename: name });

            console.log("file", file);

            const uploadResponse = await uploadImage({
                file,
                walletAddress,
                name,
                description,
                prompt: revisedPrompt,
                sourceImageId,
            });

            return uploadResponse;
        },
    });
}
