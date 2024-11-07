import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { getUserImages } from "../utils/api";

export default function useUserCreations() {
    const { userId } = useContext(UserContext);
    return useQuery({
        queryKey: ["getUserCreations"],
        queryFn: async () => {
            if (!userId) return [];
            return getUserImages({ userId });
        },
        enabled: !!userId,
        initialData: [],
    });
}
