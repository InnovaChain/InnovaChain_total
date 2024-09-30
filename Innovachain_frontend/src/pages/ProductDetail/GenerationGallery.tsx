import styled from "styled-components";
import {
  Example2Img,
  Example3Img,
  ExampleImg,
} from "../../assets/product-detail";

const GenerationGallery = () => {
  const galleryExampleImages = [ExampleImg, Example2Img, Example3Img];
  return (
    <div>
      {/* Generation Gallery */}
      <GenerationButton>Generation</GenerationButton>
      <GalleryContainer className="py-5 px-8 flex flex-col gap-8">
        {galleryExampleImages.map((image, index) => (
          <img
            src={image}
            key={index}
            className="w-[170px] h-[170px] rounded-[30px]"
          />
        ))}
      </GalleryContainer>
    </div>
  );
};

const GalleryContainer = styled.div`
  box-shadow: 17.56px 17.56px 61.06px 0px rgba(0, 0, 0, 0.12);
  border: 2px solid transparent;
  background-image: linear-gradient(#010101, #010101),
    radial-gradient(271.52% 39.96% at 50% 54.48%, #ffffff 0%, #090909 100%);
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
  background-image: linear-gradient(#010101, #010101),
    radial-gradient(circle at center, rgba(255, 255, 255, 0.76), #4c4c4c 81%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
`;

export default GenerationGallery;
