import { useMutation } from "@tanstack/react-query";
import { createUser } from "../utils/api";

export default function useCreateUserMutation() {
    return useMutation({
        mutationKey: ["createUser"],
        mutationFn: async (walletAddress: `0x${string}`) => {
            const res = await createUser({ wallet_address: walletAddress });
            return res;
        },
    });
}
