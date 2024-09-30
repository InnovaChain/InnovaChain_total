import { twc } from "react-twc";
import Container from "../../components/Container";
import CollectionGallery from "../../components/CollectionGallery";

const ExploreCreatorplace = () => {
  return (
    <Container>
      <Title>Explore Creatorplace</Title>
      <CollectionGallery className="mt-[60px] mb-[200px]" />
    </Container>
  );
};

const Title = twc.h2`
  GradientText 
  text-[45px] font-semibold text-center font-poppins
`;

export default ExploreCreatorplace;
