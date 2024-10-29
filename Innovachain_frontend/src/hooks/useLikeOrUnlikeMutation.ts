import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { likeImage, unlikeImage } from "../utils/api";

export function useLikeMutation(imageId: number | undefined) {
    const { userId } = useContext(UserContext);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["like"],
        mutationFn: async (imageId: number) => {
            if (userId === null || !imageId) {
                throw new Error("User not logged in or imageId is null");
            }
            const res = await likeImage({ imageId: imageId, userId: userId });

            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getProductInfo", imageId],
            });
        },
    });
}

export function useUnlikeMutation(imageId: number | undefined) {
    const { userId } = useContext(UserContext);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["unlike"],
        mutationFn: async (imageId: number) => {
            if (userId === null || !imageId) {
                throw new Error("User not logged in or imageId is null");
            }
            const res = await unlikeImage({ imageId: imageId, userId: userId });

            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getProductInfo", imageId],
            });
        },
    });
}
