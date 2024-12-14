import { useNavigate } from "react-router-dom";
import { twc } from "react-twc";
import { BrandImg, SearchImg } from "../../assets";
import Container from "../Container";
import { UserIcon } from "lucide-react";
import { useAccount } from "wagmi";
import { cn } from "../../utils/cn";
import MantleButton from "../MantleButton";

const Header = () => {
    const navigate = useNavigate();
    const { isConnected } = useAccount();

    return (
        <Container>
            <header className="flex justify-between mt-[46px]">
                <div className="flex items-center gap-12">
                    <button onClick={() => navigate("/")}>
                        <img className="h-[53px] w-auto" src={BrandImg} />
                    </button>
                    <NavList>
                        <NavItem>Creatorspace</NavItem>
                        <NavItem>Market</NavItem>
                        <NavItem onClick={() => navigate("/upload")}>Upload</NavItem>
                        <NavItem>About Us</NavItem>
                    </NavList>
                </div>
                <div className="flex items-center gap-10">
                    <SearchInput />
                    {/* <w3m-button balance="hide" /> */}
                    {!isConnected ? (
                        <MantleButton />
                    ) : (
                        <div className="flex justify-center items-center space-x-2">
                            {/* <WalletMultiButton style={{ height: "56px", borderRadius: "15px" }} /> */}
                            <MantleButton />

                            <button
                                onClick={() => navigate("/user")}
                                className={cn(
                                    "size-[56px] p-3 font-semibold rounded-[15px] bg-[#512da8] hover:bg-[#1a202e] disabled:bg-gray-300 text-white justify-center items-center flex"
                                )}
                            >
                                <UserIcon />
                            </button>
                        </div>
                    )}
                </div>
            </header>
        </Container>
    );
};

const SearchInput = () => {
    return (
        <div className="hidden lg:flex items-center bg-[#EDEDED] rounded-[15px] px-5 py-4 gap-3 min-w-[300px] flex-1">
            <img className="w-5 h-5" src={SearchImg} />
            <input
                type="text"
                className="flex-1 outline-none bg-transparent placeholder:text-[#C2C3CB] text-black text-opacity-60 font-medium"
                placeholder="Search Art Work / Creator"
            />
        </div>
    );
};

const NavItem = twc.button`
  text-white font-medium
  hover:underline
`;

const NavList = twc.div`
  hidden xl:flex gap-10
`;

export default Header;
