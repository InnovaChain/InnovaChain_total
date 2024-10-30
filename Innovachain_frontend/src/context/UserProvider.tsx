import { useWallet } from "@solana/wallet-adapter-react";
import { createContext, ReactNode, useEffect, useState } from "react";
import useCreateUserMutation from "../hooks/useCreateUserMutation";

export const UserContext = createContext<{
    userId: number | null;
}>({
    userId: null,
});

export default function UserProvider({ children }: { children: ReactNode }) {
    const { connected, publicKey } = useWallet();

    const { mutateAsync: createUser } = useCreateUserMutation();

    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const createUserUponConnection = async (wallet_address: string) => {
            const user = await createUser(wallet_address);
            setUserId(user.user_id);
        };

        if (connected && publicKey !== null) {
            createUserUponConnection(publicKey.toBase58());
        }
    }, [connected, createUser, publicKey]);

    return <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>;
}
