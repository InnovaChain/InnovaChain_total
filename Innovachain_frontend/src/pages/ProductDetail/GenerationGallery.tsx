import styled from "styled-components";
// import { Example2Img, Example3Img, ExampleImg } from "../../assets/product-detail";
import { API_URL } from "../../constants";
import useSourceImageIdList from "../../hooks/useSourceImageIdList";

const GenerationGallery = ({ id }: { id: number | null | undefined }) => {
    // const galleryExampleImages = [ExampleImg, Example2Img, Example3Img];
    const { data: sourceImageIdList, isPending } = useSourceImageIdList({ imageId: id });

    return (
        <div>
            {/* Generation Gallery */}
            <GenerationButton>Generation</GenerationButton>
            <GalleryContainer className="py-5 px-8 flex flex-col gap-8 h-full justify-center items-center">
                {/* {galleryExampleImages.map((image, index) => (
                    <img src={image} key={index} className="w-[170px] h-[170px] rounded-[30px]" />
                ))} */}
                {isPending ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-white border-opacity-70" />
                ) : sourceImageIdList ? (
                    <div className="flex flex-col justify-center items-center space-y-4">
                        {sourceImageIdList.source_image_id_list.map((sourceId, index) => (
                            <a key={index} href={`/product/${sourceId}`}>
                                <img src={`${API_URL}/images/${sourceId}`} className="w-[170px] h-[170px] rounded-[30px]" />
                            </a>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col space-y-2">
                        <p className="text-gray-400 text-lg text-center">This is first of its kind.</p>
                        <p className="text-gray-400 text-lg text-center">Get creative!</p>
                    </div>
                )}
            </GalleryContainer>
        </div>
    );
};

const GalleryContainer = styled.div`
    box-shadow: 17.56px 17.56px 61.06px 0px rgba(0, 0, 0, 0.12);
    border: 2px solid transparent;
    background-image: linear-gradient(#010101, #010101), radial-gradient(271.52% 39.96% at 50% 54.48%, #ffffff 0%, #090909 100%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
`;

const GenerationButton = styled.button`
    font-size: 24px;
    border-radius: 9999px;
    padding: 0px 50px;
    color: #ffffff;
    box-shadow: 17.56px 17.56px 61.06px 0px rgba(0, 0, 0, 0.12);
    border: 2px solid transparent;
    background-image: linear-gradient(#010101, #010101), radial-gradient(circle at center, rgba(255, 255, 255, 0.76), #4c4c4c 81%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
`;

export default GenerationGallery;
