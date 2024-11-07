import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { createStorage, http, WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LogoImg } from "../assets";
import React from "react";
import { WAGMI_STORAGE_KEY } from "../constants";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Your WalletConnect Cloud project ID
const projectId = "60777a9de1bd0caa055c217923b7498e";

// 2. Create wagmiConfig
const metadata = {
    name: "ArtCycle",
    description: "",
    url: "", // origin must match your domain & subdomain
    icons: [LogoImg],
};

const isMainnet = import.meta.env.VITE_INNOVA_CHAIN_ENV !== "devnet";
export const chain = isMainnet ? mainnet : sepolia;
const chains = [chain] as const;
const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    transports: isMainnet
        ? {
              [mainnet.id]: http(import.meta.env.VITE_ETHEREUM_MAINNET_RPC_URL),
          }
        : {
              [sepolia.id]: http(import.meta.env.VITE_ETHEREUM_TESTNET_RPC_URL),
          },
    storage: createStorage({
        key: WAGMI_STORAGE_KEY,
        storage: localStorage,
    }),
});

// 3. Create modal
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
    themeMode: "light",
    themeVariables: {
        "--w3m-border-radius-master": "2px",
    },
});

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    );
}
