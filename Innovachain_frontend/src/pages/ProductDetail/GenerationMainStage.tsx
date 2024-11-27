import clsx from "clsx";
import { ReactElement, useContext } from "react";
import { useParams } from "react-router-dom";
import { RecreateContext } from ".";
import { HeartImg } from "../../assets/gallery";
import { AvatarImg } from "../../assets/product-detail";
import { CardContainer } from "../../components/Card";
import { API_URL } from "../../constants";
import { useUpscaleMutation } from "../../hooks/useUpscaleMutation";
import { useVariationMutation } from "../../hooks/useVariationMutation";
import toShortAddress from "../../utils/toShortAddress";
// import useSWR from "swr";
// import { readImageInfo } from "../../utils/api";
import Watermark from "@uiw/react-watermark";
import { useSelectedAssetStore } from "../../store/useSelectedAssetStore";

const GenerationMainStage = ({ creator, name }: { creator?: string; name?: string }) => {
    const { id } = useParams();
    // const { data: imageInfo } = useSWR(`readImageInfo__${id}`, () => id ? readImageInfo(Number(id)): undefined);
    const { isLoading, imagineResponse, upscaleDone, options } = useContext(RecreateContext);

    const { selectedAsset, setSelectedAsset, resetSelectedAsset } = useSelectedAssetStore();

    const isRecreated = imagineResponse?.uri !== undefined;

    const { mutateAsync: mutateAsyncVariation } = useVariationMutation({ VCustomIds: options?.VCustomIds ?? [] });
    const { mutateAsync: mutateAsyncUpscale } = useUpscaleMutation({ UCustomIds: options?.UCustomIds ?? [] });
    // const { mutateAsync: mutateAsyncReroll } = useRerollMutation({ rerollId: options?.recreateId ?? "" });

    return (
        <CardContainer className="flex-1">
            {/* Choice Card */}

            <div className="flex justify-between items-end">
                <h3 className="text-[#292B39] text-[50px] font-semibold font-poppins leading-[35px]">{name ?? ""}</h3>
                <div className="flex gap-1">
                    <p className="text-[#8E8E8E] text-xl font-medium leading-[20px]">20</p>
                    <img className="w-[20px] h-[20px]" src={HeartImg} />
                </div>
            </div>

            {/* <img className="w-full h-auto rounded-[20px] mt-10" src={`${API_URL}/images/${id}`} /> */}
            <div className="relative w-full h-auto mt-10">
                <Watermark
                    content={["ArtCycle", "Solana Radar"]}
                    gapY={220}
                    gapX={120}
                    width={80}
                    height={1}
                    fontSize={24}
                    fontColor="#ffffff30"
                    fontFamily="Impact, fantasy"
                    fontStyle="oblique"
                >
                    {selectedAsset === "Clothes" ? (
                        <div className="relative">
                            <img className="w-full h-auto rounded-[20px] aspect-square" src="/tshirt.jpg" alt="tshirt" />
                            <img
                                className="w-[40%] h-auto aspect-square absolute top-[10%] left-[50%] transform translate-x-[-56%] -translate-y-[-50%]"
                                src={isRecreated ? imagineResponse.uri : `${API_URL}/images/${id}`}
                                alt="image"
                            />
                        </div>
                    ) : selectedAsset === "Cards" ? (
                        <div className="relative">
                            <img className="w-full h-auto rounded-[20px]" src="/card.png" alt="card" />
                            <img
                                className="w-[60%] h-auto rounded-[10px] aspect-square absolute top-[-1%] left-[50%] transform translate-x-[-50%] -translate-y-[-23%] shadow-xl border-[5px] border-white rotate-[-0.2deg]"
                                src={isRecreated ? imagineResponse.uri : `${API_URL}/images/${id}`}
                                alt="image"
                            />
                        </div>
                    ) : selectedAsset === "Stickers" ? (
                        <div className="relative">
                            <img className="w-full h-auto rounded-[20px]" src="/sticker.png" alt="sticker" />
                            <img
                                className="w-[37%] h-auto aspect-square absolute top-[-1%] left-[50%] transform translate-x-[-40%] -translate-y-[-68%] shadow-md rotate-[13deg]"
                                src={isRecreated ? imagineResponse.uri : `${API_URL}/images/${id}`}
                                alt="image"
                            />
                        </div>
                    ) : (
                        <img
                            className="w-full h-auto rounded-[20px] aspect-square"
                            src={isRecreated ? imagineResponse.uri : `${API_URL}/images/${id}`}
                            alt="image"
                        />
                    )}

                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-[20px]">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-white border-opacity-70"></div>
                        </div>
                    )}
                </Watermark>
            </div>
            {!isRecreated ? (
                <div className="mt-5 flex justify-between items-end">
                    <div className="flex gap-4 items-center">
                        <img className="w-auto h-full rounded-full" src={AvatarImg} />
                        <div className="flex flex-col gap-3 h-full">
                            <p className="text-[#8D8D8D] text-lg">Current creator</p>
                            <p className="text-black text-[24px] font-medium font-poppins leading-[20px]">
                                {toShortAddress(creator) ?? "Anonymous creator"}
                            </p>
                        </div>
                    </div>
                    <FollowButton />
                </div>
            ) : (
                <div className="mt-5 flex justify-between items-center space-x-10">
                    {!upscaleDone ? (
                        <>
                            <div className="flex flex-col w-full space-y-2">
                                <div className="flex w-full justify-between space-x-4">
                                    {options?.UCustomIds.map((id, index) => (
                                        <OptionButton
                                            key={index}
                                            value={id}
                                            text={`U${index + 1}`}
                                            disabled={isLoading}
                                            onClick={async () => {
                                                await mutateAsyncUpscale({
                                                    index: (index + 1) as 1 | 2 | 3 | 4,
                                                    msgId: imagineResponse.id,
                                                    hash: imagineResponse.hash,
                                                    content: imagineResponse.content,
                                                    flags: imagineResponse.flags,
                                                });
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="flex w-full justify-between space-x-4">
                                    {options?.VCustomIds.map((id, index) => (
                                        <OptionButton
                                            key={index}
                                            value={id}
                                            text={`V${index + 1}`}
                                            disabled={isLoading}
                                            onClick={async () => {
                                                await mutateAsyncVariation({
                                                    index: (index + 1) as 1 | 2 | 3 | 4,
                                                    msgId: imagineResponse.id,
                                                    hash: imagineResponse.hash,
                                                    content: imagineResponse.content,
                                                    flags: imagineResponse.flags,
                                                });
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            {/* <OptionButton
                                className={clsx("bg-[#141414]", "aspect-square h-16 w-16 rounded-full flex justify-center items-center")}
                                value={options!.recreateId}
                                disabled={isLoading}
                                onClick={async () => {
                                    await mutateAsyncReroll({
                                        msgId: imagineResponse.id,
                                        hash: imagineResponse.hash,
                                        content: imagineResponse.content,
                                        flags: imagineResponse.flags,
                                    });
                                }}
                                text={
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-white h-4 w-4">
                                        <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
                                    </svg>
                                }
                            /> */}
                        </>
                    ) : (
                        <p>You are done! Go ahead publish and mint it!</p>
                    )}
                </div>
            )}
        </CardContainer>
    );
};

const FollowButton = () => {
    return <button className={clsx("bg-[#141414] text-white", "text-base font-medium px-5 py-1 rounded-full")}>Follow</button>;
};

const OptionButton = ({
    className,
    disabled,
    value,
    text,
    onClick,
}: {
    className?: string;
    disabled?: boolean;
    value: string;
    text: string | ReactElement;
    onClick: () => Promise<void>;
}) => {
    return (
        <button
            disabled={disabled}
            className={clsx("bg-[#141414] text-white", "text-base font-medium px-5 py-1 rounded-full w-full disabled:bg-gray-300", className)}
            onClick={() => {
                console.log("customId: ", value);
                onClick();
            }}
        >
            {text}
        </button>
    );
};

export default GenerationMainStage;
