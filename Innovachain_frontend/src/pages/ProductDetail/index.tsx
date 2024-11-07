import { useNavigate, useParams } from "react-router-dom";
import { BackImg } from "../../assets";
import Container from "../../components/Container";
import { twc } from "react-twc";
import GenerationGallery from "./GenerationGallery";
import GenerationMainStage from "./GenerationMainStage";
import GenerationPromptStage from "./GenerationPromptStage";
import OriginalStage from "./OriginalStage";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import useProductInfoById from "../../hooks/useProductInfo";
import GenerateStage from "./GenerateStage";
import { ImagineResponse } from "../../utils/api";
// import mockImagineResponse from "./mockImagine.json";
import { getUIdsVIdsAndRecreateId } from "../../utils/getUV";
import PurchaseStage from "./PurchaseState";

export const RecreateContext = createContext<{
    isStarted: boolean;
    setIsStarted: Dispatch<SetStateAction<boolean>>;

    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;

    imagineResponse?: ImagineResponse | null;
    setImagineResponse: Dispatch<SetStateAction<ImagineResponse | null>>;

    options?: {
        UCustomIds: string[];
        VCustomIds: string[];
        recreateId: string;
    };

    setOptions: Dispatch<
        SetStateAction<{
            UCustomIds: string[];
            VCustomIds: string[];
            recreateId: string;
        }>
    >;

    upscaleDone: boolean;
    setUpscaleDone: Dispatch<SetStateAction<boolean>>;
}>({
    isLoading: false,
    setIsLoading: () => {},

    isStarted: false,
    setIsStarted: () => {},

    imagineResponse: null,
    setImagineResponse: () => {},

    options: {
        UCustomIds: [],
        VCustomIds: [],
        recreateId: "",
    },
    setOptions: () => {},

    upscaleDone: false,
    setUpscaleDone: () => {},
});

const ProductDetail = () => {
    const [stage, setStage] = useState<"Original" | "GenerationPrompt" | "Generate" | "Purchase" | "PurchaseTshirt" | "Pay">("Original");
    const [isShowTshirt, setIsShowTshirt] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();

    const { data: info } = useProductInfoById({ imageId: parseInt(id!) });

    const [revisedPrompt, setRevisedPrompt] = useState<string>("");

    const [isStarted, setIsStarted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [imagineResponse, setImagineResponse] = useState<ImagineResponse | null>(null);

    const [upscaleDone, setUpscaleDone] = useState<boolean>(false);

    const [options, setOptions] = useState<{
        UCustomIds: string[];
        VCustomIds: string[];
        recreateId: string;
    }>({
        UCustomIds: [],
        VCustomIds: [],
        recreateId: "",
    });

    useEffect(() => {
        if (info) {
            setRevisedPrompt(info.prompt);
        }
    }, [info]);

    useEffect(() => {
        if (imagineResponse && imagineResponse.options.length <= 8) {
            const { UCustomIds, VCustomIds, recreateId } = getUIdsVIdsAndRecreateId(imagineResponse.options);

            setOptions({
                UCustomIds,
                VCustomIds,
                recreateId,
            });
        }
    }, [imagineResponse]);

    return (
        <Container>
            <BackAndTitle
                reset={() => {
                    setStage("Original");

                    setImagineResponse(null);
                    setOptions({
                        UCustomIds: [],
                        VCustomIds: [],
                        recreateId: "",
                    });
                    setUpscaleDone(false);
                }}
            />
            <ProductBodyContainer>
                <RecreateContext.Provider
                    value={{
                        isStarted,
                        setIsStarted,

                        isLoading,
                        setIsLoading,

                        imagineResponse,
                        setImagineResponse,

                        options,
                        setOptions,

                        upscaleDone,
                        setUpscaleDone,
                    }}
                >
                    {stage !== "Purchase" && <GenerationGallery id={info?.id} />}

                    <GenerationMainStage isShowTshirt={isShowTshirt} creator={info?.user.wallet_address} name={info?.name} />

                    {stage === "Original" && (
                        <OriginalStage
                            onClickPurchase={() => setStage("Purchase")}
                            onClickRecreated={() => setStage("GenerationPrompt")}
                            info={info}
                        />
                    )}
                    {stage === "Purchase" && <PurchaseStage setIsShowTshirt={setIsShowTshirt} onClickPay={() => setStage("Pay")} />}

                    {stage === "GenerationPrompt" && (
                        <GenerationPromptStage
                            onClickGenerate={() => setStage("Generate")}
                            originalPrompt={info?.prompt}
                            setRevisedPrompt={setRevisedPrompt}
                        />
                    )}
                    {stage === "Generate" && <GenerateStage imageId={info?.id} revisedPrompt={revisedPrompt} />}
                </RecreateContext.Provider>
            </ProductBodyContainer>
        </Container>
    );
};

const ProductBodyContainer = twc.div`
  flex gap-6 mb-[100px]
`;

const BackAndTitle = ({ reset }: { reset: () => void }) => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center gap-8 mt-[150px] mb-[60px]">
            <button
                onClick={() => {
                    reset();
                    navigate(-1);
                }}
            >
                <img className="w-9 h-9" src={BackImg} />
            </button>
            <h2 className="text-white font-semibold font-poppins text-[30px]">Product Detail</h2>
        </div>
    );
};

export default ProductDetail;
