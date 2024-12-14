// src/hooks/useInsertWatermark/useInsertMantleWatermarkMutation.ts
import { useMutation } from "@tanstack/react-query";
import { useWriteContract } from "wagmi";
import mantleWatermarkABI from "./ArtCycleContract.json"; // You'll need to create this

export default function useInsertMantleWatermarkMutation() {
    const { writeContractAsync } = useWriteContract();

    return useMutation({
        mutationKey: ["insertMantleWatermark"],
        mutationFn: async ({ watermark }: { watermark: string }) => {
            if (!writeContractAsync) {
                throw new Error("Contract write not ready");
            }

            const tx = await writeContractAsync({
                abi: mantleWatermarkABI,
                address: "0xf9277eFbf823732B6aFe2f7af229E35AEe8f5847",
                functionName: "insert",
                args: [watermark],
            });

            return tx;
        },
    });
}
