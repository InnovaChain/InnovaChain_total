import { useMutation } from "@tanstack/react-query";
import { rerollImage } from "../utils/api";

export function useRerollMutation({ rerollId }: { rerollId: string }) {
    return useMutation({
        mutationKey: ["reroll", rerollId],
        mutationFn: async ({ msgId, hash, content, flags }: { msgId: string; hash: string; content?: string; flags: number }) => {
            const rerollResponse = await rerollImage({
                msgId,
                hash,
                content,
                flags,
            });
            return rerollResponse;
        },
    });
}
