import { useQuery } from "@tanstack/react-query";
import { getUserLikeStatusOfImage, getUserStats } from "../utils/api";

export function useUserStats({ userId }: { userId: number | null }) {
    return useQuery({
        queryKey: ["userStats", userId],
        queryFn: async () => {
            if (!userId) {
                return {
                    total_likes: 0,
                    total_references: 0,
                    total_rewards: 0,
                    user_id: 0,
                };
            }
            const response = await getUserStats({ userId });
            return response as {
                total_likes: number;
                total_references: number;
                total_rewards: number;
                user_id: number;
            };
        },
    });
}

export function useUserLikeStatusOfImage({ imageId, userId }: { imageId: number | undefined; userId: number | null }) {
    return useQuery({
        queryKey: ["userLikeStatusOfImage", imageId, userId],
        queryFn: async () => {
            if (!userId || !imageId) {
                return;
            }

            const response = await getUserLikeStatusOfImage({ imageId, userId });
            return response as {
                status: boolean;
            };
        },
    });
}
