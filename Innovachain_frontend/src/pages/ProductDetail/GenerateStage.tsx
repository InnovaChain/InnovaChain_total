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

const GenerateStage = ({ imageId, revisedPrompt }: { imageId?: number; revisedPrompt: string }) => {
    const [customizedMakerText, setCustomizedMakerText] = useState<string>("");
    const { mutateAsync: imagineImage, isPending } = useImagineMutation();
    // const { mutateAsync: upload } = useUploadMutation();
    const { mutateAsync: confirmRecreate } = useConfirmRecreateMutation();

    const navigate = useNavigate();

    const { imagineResponse, setIsLoading, setImagineResponse, setOptions, isStarted, setIsStarted, upscaleDone } = useContext(RecreateContext);

    const { id } = useParams<{ id: string }>();

    const { data: info } = useProductInfoById({ imageId: parseInt(id!) });

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
                    disabled={isPending || (isStarted && !upscaleDone)}
                    upscaleDone={upscaleDone}
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
                            // authenticate and mint
                            // const file = await urlToFile({ url: imagineResponse.content, filename: info!.name });
                            // await upload({
                            //     file,
                            //     walletAddress: "",
                            //     name: info.name,
                            //     description: customizedMakerText,
                            //     prompt: revisedPrompt,
                            //     sourceImageId: info.id,
                            // });

                            await confirmRecreate({
                                imageUrl: imagineResponse.proxy_url,
                                walletAddress: "",
                                name: info.name,
                                description: customizedMakerText,
                                revisedPrompt: revisedPrompt,
                                sourceImageId: info.id,
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
    upscaleDone,
}: {
    disabled: boolean;
    onClick: () => Promise<unknown>;
    upscaleDone: boolean;
}) => {
    return (
        <button
            disabled={disabled}
            className={clsx("bg-[#141414] text-white", "text-base font-medium rounded-full disabled:bg-gray-300", "px-12 py-2 rounded-lg")}
            onClick={onClick}
        >
            {upscaleDone ? "Authenticate & Mint" : "Generate"}
        </button>
    );
};

export default GenerateStage;
