import { useMutation, useQueryClient } from "@tanstack/react-query";
import { increaseReference } from "../utils/api";

export default function useIncreaseReferenceMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["increaseReference"],
        mutationFn: async ({ imageId }: { imageId: number }) => {
            const res = await increaseReference({ imageId });
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getProductInfo", "userStats"],
            });
        },
    });
}
