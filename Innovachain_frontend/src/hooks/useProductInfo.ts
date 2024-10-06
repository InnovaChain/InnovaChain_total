import { useQuery } from "@tanstack/react-query";
import { readImageInfo } from "../utils/api";

export default function useProductInfoById({ imageId }: { imageId: number }) {
    return useQuery({
        queryKey: ["getProductInfo", imageId],
        queryFn: async () => {
            const response = await readImageInfo(imageId);
            return response;
        },
    });
}
