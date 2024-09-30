import { twc } from "react-twc";
import Container from "../../components/Container";
import { Image0Img, Image1Img } from "../../assets";
import { ArrowLeftImg, ArrowRightImg } from "../../assets/controller";
import clsx from "clsx";

const HeroSection = () => {
  return (
    <Container className="grid grid-cols-2 !pr-0 py-[100px] mb-[150px]">
      <div>
        <Title>Discover And Create ART</Title>
        <Description>
          Protect your copyright, legally make recreation, gain income through
          distribution, expand your ip.
        </Description>
        <HeroDataSection>
          <HeroItem title="Artworks" value="430K+" />
          <HeroItem title="Creators" value="159K+" />
          <HeroItem title="Collections" value="87K+" />
        </HeroDataSection>
      </div>
      <div className="relative">
        <img
          className="absolute left-0 top-0 w-[350px] h-[350px]"
          src={Image0Img}
          alt="bg-left-light"
        />
        <img
          className="absolute right-0 top-[200px] w-[250px] h-[250px]"
          src={Image1Img}
          alt="bg-left-light"
        />
        <ImageController />
      </div>
    </Container>
  );
};

const ImageController = () => {
  return (
    <div
      className={clsx(
        "absolute left-[90px] top-[420px] p-5 rounded-2xl",
        "bg-[#FCFCFD] flex items-center gap-8",
      )}
    >
      <img className="h-9 w-9" src={ArrowLeftImg} alt="arrow-left" />
      <div className="h-[30px] w-[2px] bg-[#E6E8EC] rounded-full border-none" />
      <img className="h-9 w-9" src={ArrowRightImg} alt="arrow-right" />
    </div>
  );
};
const HeroItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-4xl font-semibold text-white">{value}</p>
      <p className="text-xs font-normal text-[#D7D7D7]">{title}</p>
    </div>
  );
};
const HeroDataSection = twc.div`
  grid grid-cols-3
`;

const Description = twc.p`
  text-lg font-semibold leading-7 text-[#D7D7D7] mb-[45px]
`;

const Title = twc.h1`
  GradientText font-poppins
  text-[75px] font-semibold
  tracking-[-0.3px] leading-[120%]
  pb-4
`;

export default HeroSection;
