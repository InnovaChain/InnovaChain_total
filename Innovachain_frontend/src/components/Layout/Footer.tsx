import { twc } from "react-twc";
import { BrandImg } from "../../assets";
import Container from "../Container";
import {
  FacebookImg,
  InstagramImg,
  LinkedInImg,
  XImg,
} from "../../assets/media";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Container className="bg-[#141416] pt-[100px] pb-20">
      <footer>
        <div className="flex justify-between items-center">
          <button onClick={() => navigate("/")}>
            <img className="h-[55px] w-auto" src={BrandImg} />
          </button>
          <FooterList>
            <FooterItem>Privacy Policy</FooterItem>
            <FooterItem>Term & Conditions</FooterItem>
            <FooterItem>About Us</FooterItem>
            <FooterItem>Contact</FooterItem>
          </FooterList>
        </div>
        <hr className="rounded-full h-[1px] border-none bg-[#818181] opacity-50 mt-8 mb-[60px]" />
        <div className="flex justify-between items-center">
          <p className="text-[#999999] font-medium">
            © 2024 All Rights Reserved.
          </p>
          <div className="flex gap-10 items-center">
            <Media icon={InstagramImg} url="/#" />
            <Media icon={LinkedInImg} url="/#" />
            <Media icon={FacebookImg} url="/#" />
            <Media icon={XImg} url="/#" />
          </div>
        </div>
      </footer>
    </Container>
  );
};

const Media = ({ icon, url }: { icon: string; url: string }) => {
  return (
    <a className="w-6 h-6" target="blank" href={url} rel="noopener noreferrer">
      <img className="w-full h-full object-contain" src={icon} />
    </a>
  );
};

const FooterItem = twc.div`
  text-[#B9B9B9] text-base font-medium cursor-pointer
  hover:underline
`;
const FooterList = twc.div`
  flex gap-10 md:gap-[70px]
`;
export default Footer;
