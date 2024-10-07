import { useNavigate, useParams } from "react-router-dom";
import { BackImg } from "../../assets";
import Container from "../../components/Container";
import { twc } from "react-twc";
import GenerationGallery from "./GenerationGallery";
import GenerationMainStage from "./GenerationMainStage";
import GenerationPromptStage from "./GenerationPromptStage";
import OriginalStage from "./OriginalStage";
import { useState } from "react";
import useProductInfoById from "../../hooks/useProductInfo";

const ProductDetail = () => {
    const [stage, setStage] = useState<"Original" | "GenerationPrompt">("Original");
    const { id } = useParams<{ id: string }>();

    const { data: info } = useProductInfoById({ imageId: parseInt(id!) });

    if (!info) return null;

    return (
        <Container>
            <BackAndTitle />
            <ProductBodyContainer>
                <GenerationGallery />
                <GenerationMainStage name={info.name} />
                {stage === "Original" && <OriginalStage onClickRecreated={() => setStage("GenerationPrompt")} info={info} />}
                {stage === "GenerationPrompt" && <GenerationPromptStage originalPrompt={info.prompt} />}
            </ProductBodyContainer>
        </Container>
    );
};

const ProductBodyContainer = twc.div`
  flex gap-6 mb-[100px]
`;

const BackAndTitle = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center gap-8 mt-[150px] mb-[60px]">
            <button onClick={() => navigate(-1)}>
                <img className="w-9 h-9" src={BackImg} />
            </button>
            <h2 className="text-white font-semibold font-poppins text-[30px]">Product Detail</h2>
        </div>
    );
};

export default ProductDetail;
