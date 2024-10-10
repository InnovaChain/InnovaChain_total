import { useQuery } from "@tanstack/react-query";
import { getSourceImageIdList } from "../utils/api";

export default function useSourceImageIdList({ imageId }: { imageId: number | null | undefined }) {
    return useQuery({
        queryKey: ["getSourceImageIdList", imageId],
        queryFn: async () => {
            if (!imageId) {
                return null;
            }
            const response = await getSourceImageIdList(imageId);
            return response;
        },
        enabled: !!imageId,
    });
}
