import { useMutation } from "@tanstack/react-query";
import { describeImage, uploadImage, UploadImageParams } from "../utils/api";

export default function useUploadMutation() {
    return useMutation({
        mutationKey: ["recreate"],
        mutationFn: async ({ file, walletAddress, name, description, prompt = "", sourceImageId }: UploadImageParams) => {
            const uploadResponse = await uploadImage({
                file,
                walletAddress,
                name,
                description,
                prompt,
                sourceImageId,
            });

            const describeResponse = await describeImage({
                imageId: uploadResponse.image_id,
            });

            return describeResponse;
        },
    });
}
