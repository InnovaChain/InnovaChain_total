import { useEffect, useState } from "react";
import { twc } from "react-twc";
import { CardContainer } from "../../components/Card";
import { useSelectedAssetStore } from "../../store/useSelectedAssetStore";
import { cn } from "../../utils/cn";

export default function PurchaseStage() {
    // const [selectedAsset, setSelectedAsset] = useState<"Ownership" | "Clothes" | "Cards" | "Stickers">("Ownership");
    const { selectedAsset, setSelectedAsset, resetSelectedAsset } = useSelectedAssetStore();

    const [size, setSize] = useState<"S" | "M" | "L" | "XL" | "XXL" | "XXXL" | undefined>(undefined);

    useEffect(() => {
        if (selectedAsset === "Ownership") {
            setSize(undefined);
        }
    }, [selectedAsset]);

    useEffect(() => {
        return () => {
            resetSelectedAsset();
        };
    }, [resetSelectedAsset]);

    return (
        <CardContainer className="flex-1 p-10 relative">
            <div className="flex flex-col h-full w-full space-y-6">
                <div>
                    <h1 className="text-xl font-semibold">Asset Type</h1>
                    <h2 className="text-md font-medium text-[#0066D4]">Which type of asset is right for you?</h2>

                    <div className="flex flex-col space-y-4 mt-6">
                        <Select
                            onClick={() => setSelectedAsset("Ownership")}
                            className={cn(selectedAsset === "Ownership" ? "border-[#0066D4]" : "border-[#AAAAAA]")}
                        >
                            <p>Ownership</p>
                        </Select>

                        <Select
                            onClick={() => setSelectedAsset("Clothes")}
                            className={cn(selectedAsset === "Clothes" ? "border-[#0066D4]" : "border-[#AAAAAA]")}
                        >
                            <p>Clothes</p>
                        </Select>

                        <Select
                            onClick={() => setSelectedAsset("Cards")}
                            className={cn(selectedAsset === "Cards" ? "border-[#0066D4]" : "border-[#AAAAAA]")}
                        >
                            <p>Cards</p>
                        </Select>

                        <Select
                            onClick={() => setSelectedAsset("Stickers")}
                            className={cn(selectedAsset === "Stickers" ? "border-[#0066D4]" : "border-[#AAAAAA]")}
                        >
                            <p>Stickers</p>
                        </Select>
                    </div>
                </div>

                {selectedAsset === "Clothes" && (
                    <div className="flex flex-col h-[350px]">
                        <h1 className="text-xl font-semibold">Size</h1>
                        <h2 className="text-md font-medium text-[#0066D4]">Which size is right for you?</h2>

                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <Select onClick={() => setSize("S")} className={cn(size === "S" ? "border-[#0066D4]" : "border-[#AAAAAA]")}>
                                <p>S</p>
                            </Select>

                            <Select onClick={() => setSize("M")} className={cn(size === "M" ? "border-[#0066D4]" : "border-[#AAAAAA]")}>
                                <p>M</p>
                            </Select>

                            <Select onClick={() => setSize("L")} className={cn(size === "L" ? "border-[#0066D4]" : "border-[#AAAAAA]")}>
                                <p>L</p>
                            </Select>

                            <Select onClick={() => setSize("XL")} className={cn(size === "XL" ? "border-[#0066D4]" : "border-[#AAAAAA]")}>
                                <p>XL</p>
                            </Select>

                            <Select onClick={() => setSize("XXL")} className={cn(size === "XXL" ? "border-[#0066D4]" : "border-[#AAAAAA]")}>
                                <p>XXL</p>
                            </Select>

                            <Select onClick={() => setSize("XXXL")} className={cn(size === "XXXL" ? "border-[#0066D4]" : "border-[#AAAAAA]")}>
                                <p>XXXL</p>
                            </Select>
                        </div>
                    </div>
                )}

                <div className="flex justify-end absolute bottom-0 left-0 right-0 bg-[#DBDBE0] h-[20%] rounded-b-[30px] items-center p-5 space-y-3 w-full">
                    {selectedAsset !== "Ownership" && (
                        <div className="flex flex-col mr-auto font-medium">
                            <p className="text-lg font-bold">Delivery</p>
                            <p>Sun 10/11/2024-ETA</p>
                            <p className="text-[#0066D4]">Add your Address here</p>
                        </div>
                    )}

                    <div className="flex flex-col ml-auto space-y-2">
                        <div className="ml-auto font-semibold flex space-x-2">
                            <p className="text-[#8C8C8C]">Total: </p>
                            {selectedAsset === "Ownership" ? (
                                <p>1.68 SOL</p>
                            ) : (
                                <p>
                                    ￥
                                    {selectedAsset === "Stickers" ? "3" : selectedAsset === "Cards" ? "7" : selectedAsset === "Clothes" ? "70" : 1.68}
                                </p>
                            )}
                        </div>
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSeWMcZjJNDWtG02tx3VJaSsmaxyvigfHS49ej45DAHpMMK-gg/viewform?usp=sf_link"
                            target="_blank"
                        >
                            <DarkButton className=" h-14">Pay</DarkButton>
                        </a>
                    </div>
                </div>
            </div>
        </CardContainer>
    );
}
const DarkButton = twc.div`
  w-full rounded-[20px] bg-black text-white font-bold text-lg
  flex justify-center items-center hover:cursor-pointer 
`;

const Select = twc.div`
  w-full h-16 rounded-xl bg-white text-black font-bold text-lg p-4
  flex justify-start items-center hover:cursor-pointer border-2 border
`;
