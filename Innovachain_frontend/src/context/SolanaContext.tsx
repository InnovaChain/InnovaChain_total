/* eslint-disable @typescript-eslint/no-unused-vars */
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { ReactNode, useMemo, useState } from "react";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletConnectWalletAdapter } from "@walletconnect/solana-adapter";
import UserProvider from "./UserProvider";

type Networks = WalletAdapterNetwork.Devnet | WalletAdapterNetwork.Mainnet;

export const SolanaContext = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient();

    const [currentNetwork] = useState<Networks>(WalletAdapterNetwork.Devnet);
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(currentNetwork), [currentNetwork]);

    const wallets = useMemo(
        () => [
            new WalletConnectWalletAdapter({
                network: currentNetwork,
                options: {
                    projectId: "bd4997ce3ede37c95770ba10a3804dad",
                },
            }),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentNetwork]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {/* <div style={{ display: "flex", gap: "15px", margin: "20px", alignItems: "center", flexDirection: "column" }}>
                        Current Network: {currentNetwork.toLocaleUpperCase()}
                        <button onClick={() => setCurrentNetwork(toggleNetwork)}>Change Network to {toggleNetwork(currentNetwork)}</button>
                    </div> */}
                    <QueryClientProvider client={queryClient}>
                        <UserProvider>{children}</UserProvider>
                    </QueryClientProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
