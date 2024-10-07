import { useMutation } from "@tanstack/react-query";
import { varyImage } from "../utils/api";
import { useContext } from "react";
import { RecreateContext } from "../pages/ProductDetail";
import { getUIdsVIdsAndRecreateId } from "../utils/getUV";

export function useVariationMutation({ VCustomIds }: { VCustomIds: string[] }) {
    const { setIsLoading, setImagineResponse, setOptions } = useContext(RecreateContext);

    return useMutation({
        mutationKey: ["variation", ...VCustomIds],
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

            const recreateResponse = await varyImage({
                index,
                msgId,
                hash,
                content,
                flags,
            });

            setImagineResponse(recreateResponse);
            const options = getUIdsVIdsAndRecreateId(recreateResponse.options);
            setOptions(options);
            setIsLoading(false);

            return recreateResponse;
        },
    });
}
