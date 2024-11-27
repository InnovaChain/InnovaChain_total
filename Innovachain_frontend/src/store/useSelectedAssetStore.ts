import { create } from "zustand";

type State = {
    selectedAsset: "Ownership" | "Clothes" | "Cards" | "Stickers";
};

type Action = {
    setSelectedAsset: (assetType: "Ownership" | "Clothes" | "Cards" | "Stickers") => void;
    resetSelectedAsset: () => void;
};

export const useSelectedAssetStore = create<State & Action>((set) => ({
    selectedAsset: "Ownership",
    setSelectedAsset: (assetType) => set({ selectedAsset: assetType }),
    resetSelectedAsset: () => set({ selectedAsset: "Ownership" }),
}));
