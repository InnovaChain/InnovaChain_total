import { useQuery } from "@tanstack/react-query";
import { getTotalImagesCount } from "../utils/api";

export default function useTotalImagesCount() {
    return useQuery({
        queryKey: ["totalImagesCount"],
        queryFn: async () => {
            const res = await getTotalImagesCount();
            return res.total_count;
        },
    });
}
