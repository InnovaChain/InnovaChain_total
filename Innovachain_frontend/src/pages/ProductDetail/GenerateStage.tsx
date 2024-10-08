import clsx from "clsx";
import { CardContainer } from "../../components/Card";
import { twc } from "react-twc";
import { useContext, useState } from "react";
import { useConfirmRecreateMutation, useImagineMutation } from "../../hooks/useRecreateMutation";
import { RecreateContext } from ".";
import { getUIdsVIdsAndRecreateId } from "../../utils/getUV";
import { useNavigate, useParams } from "react-router-dom";
import useProductInfoById from "../../hooks/useProductInfo";
import toast from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import useInsertWatermarkMutation from "../../hooks/useInsertWatermarkMutation";

const GenerateStage = ({ imageId, revisedPrompt }: { imageId?: number; revisedPrompt: string }) => {
    const [customizedMakerText, setCustomizedMakerText] = useState<string>("");
    const { mutateAsync: imagineImage, isPending } = useImagineMutation();

    const { mutateAsync: confirmRecreate, isPending: isMinting } = useConfirmRecreateMutation();
    const { mutateAsync: insertWatermark } = useInsertWatermarkMutation();

    const navigate = useNavigate();

    const { imagineResponse, setIsLoading, setImagineResponse, setOptions, isStarted, setIsStarted, upscaleDone } = useContext(RecreateContext);

    const { id } = useParams<{ id: string }>();

    const { data: info } = useProductInfoById({ imageId: parseInt(id!) });

    const { publicKey } = useWallet();

    return (
        <CardContainer className="flex-1">
            <PromptTitle>Revised Prompt</PromptTitle>
            <PromptInputArea disabled className="mb-8" content={revisedPrompt} />
            <PromptTitle>Customized Maker Text</PromptTitle>
            <PromptInputArea
                className="mb-8"
                disabled={isPending || isStarted}
                content={customizedMakerText}
                onChangeText={(value: string) => {
                    setCustomizedMakerText(value);
                }}
            />
            <div className="flex justify-end w-full">
                <AuthenticateAndMintButton
                    disabled={isPending || (isStarted && !upscaleDone) || isMinting}
                    upscaleDone={upscaleDone}
                    isLoading={isPending || isMinting}
                    onClick={async () => {
                        if (!imageId) {
                            return;
                        }

                        if (!isStarted && !upscaleDone) {
                            // generate

                            setIsLoading(true);
                            setIsStarted(true);
                            const res = await imagineImage({ imageId, revisedPrompt });
                            setImagineResponse(res);

                            const options = res.options;

                            const { UCustomIds, VCustomIds, recreateId } = getUIdsVIdsAndRecreateId(options);

                            setOptions({
                                UCustomIds,
                                VCustomIds,
                                recreateId,
                            });

                            setIsLoading(false);
                        } else {
                            if (!imagineResponse || !info) {
                                return;
                            }

                            const res = await confirmRecreate({
                                imageUrl: imagineResponse.proxy_url,
                                walletAddress: publicKey?.toBase58() ?? "",
                                name: info.name,
                                description: customizedMakerText,
                                revisedPrompt: revisedPrompt,
                                sourceImageId: info.id,
                            });

                            await insertWatermark({ watermark: res.watermark })
                                .then(() => console.log("Watermark inserted successfully"))
                                .catch((error: Error) => {
                                    console.error(error);
                                });

                            toast.success("Recreated and uploaded successfully");

                            navigate(-1);
                        }
                    }}
                />
            </div>
        </CardContainer>
    );
};

const PromptTitle = twc.p`
  mb-1 text-base font-semibold leading-[22px] text-[#141414]
`;

const PromptInputArea = ({
    content,
    disabled,
    onChangeText,
    className,
}: {
    content: string;
    disabled?: boolean;
    onChangeText?: (value: string) => void;
    className?: string;
}) => {
    return (
        <textarea
            value={content}
            disabled={disabled}
            className={clsx("bg-[#F6F6F6] rounded-lg p-3", "text-[#8D8D8D] text-sm", "resize-none w-full min-h-[180px]", className)}
            {...(onChangeText && {
                onChange: (e) => {
                    onChangeText(e.target.value);
                },
            })}
        />
    );
};

const AuthenticateAndMintButton = ({
    disabled,
    onClick,
    isLoading,
    upscaleDone,
}: {
    disabled: boolean;
    onClick: () => Promise<unknown>;
    isLoading: boolean;
    upscaleDone: boolean;
}) => {
    return (
        <button
            disabled={disabled}
            className={clsx("bg-[#141414] text-white", "text-base font-medium rounded-full disabled:bg-gray-300", "px-12 py-2 rounded-lg")}
            onClick={onClick}
        >
            {isLoading ? (
                <div className="flex justify-center items-center space-x-2">
                    <p>Making magic</p>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-white border-opacity-70" />
                </div>
            ) : upscaleDone ? (
                "Authenticate & Mint"
            ) : (
                "Generate"
            )}
        </button>
    );
};

export default GenerateStage;
