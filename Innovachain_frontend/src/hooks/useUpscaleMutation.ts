import { useMutation } from "@tanstack/react-query";
import { upscaleImage } from "../utils/api";
import { useContext } from "react";
import { RecreateContext } from "../pages/ProductDetail";

export function useUpscaleMutation({ UCustomIds }: { UCustomIds: string[] }) {
    const { setIsLoading, setImagineResponse, setUpscaleDone } = useContext(RecreateContext);

    return useMutation({
        mutationKey: ["upscale", ...UCustomIds],
        mutationFn: async ({
            index,
            msgId,
            hash,
            content,
            flags,
        }: {
            index: 1 | 2 | 3 | 4;
            msgId: string;
            hash: string;
            content?: string;
            flags: number;
        }) => {
            setIsLoading(true);

            const upscaleResponse = await upscaleImage({
                index,
                msgId,
                hash,
                content,
                flags,
            });

            setImagineResponse(upscaleResponse);

            setUpscaleDone(true);

            setIsLoading(false);

            return upscaleResponse;
        },
    });
}
