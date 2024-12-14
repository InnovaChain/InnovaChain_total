import { WagmiProvider, createConfig, http } from "wagmi";
import { mantleSepoliaTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactElement } from "react";
import UserProvider from "./UserProvider";

const config = createConfig(
    getDefaultConfig({
        // Your dApps chains
        chains: [mantleSepoliaTestnet],
        transports: {
            // RPC URL for each chain
            [mantleSepoliaTestnet.id]: http(`https://rpc.sepolia.mantle.xyz`),
        },

        // Required API Keys
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,

        // Required App Info
        appName: "Your App Name",

        // Optional App Info
        appDescription: "Your App Description",
        appUrl: "https://family.co", // your app's url
        appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactElement }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider>
                    <UserProvider>{children}</UserProvider>
                </ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
