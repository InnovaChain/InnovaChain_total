import { useQuery } from "@tanstack/react-query";
import { readImageInfo } from "../utils/api";

export default function useProductInfoById({ imageId }: { imageId: number | null | undefined }) {
    return useQuery({
        queryKey: ["getProductInfo", imageId],
        queryFn: async () => {
            if (!imageId) {
                return null;
            }
            const response = await readImageInfo(imageId);
            return response;
        },
        enabled: !!imageId,
    });
}
