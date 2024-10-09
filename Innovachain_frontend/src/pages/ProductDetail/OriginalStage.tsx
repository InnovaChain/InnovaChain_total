import clsx from "clsx";
import { twc } from "react-twc";
import { HeartImg, UserImg } from "../../assets/gallery";
import { Avatar2Img, AvatarImg } from "../../assets/product-detail";
import { CardContainer } from "../../components/Card";
import useProductInfoById from "../../hooks/useProductInfo";
import { ProductInfo } from "../../utils/api";
import toShortAddress from "../../utils/toShortAddress";

const OriginalStage = ({ onClickRecreated, info }: { onClickRecreated?: () => void; info?: ProductInfo | null }) => {
    const { data: previous } = useProductInfoById({ imageId: info?.source_image_id });

    return (
        <CardContainer className="flex-1">
            {/* Choice Card */}
            <div className="flex justify-between items-end">
                <h3 className="text-[#292B39] text-[50px] font-semibold font-poppins leading-[35px]">{info?.name}</h3>
                <div className="flex gap-1">
                    <button className={clsx("bg-[#0066D4] px-2 py-1 rounded-full text-white font-medium")}>Verified</button>
                </div>
            </div>
            <p className="text-[#888888B2] text-xl mt-10 mb-20">{info?.description}</p>
            {info?.source_image_id && (
                <div className="flex gap-2">
                    <img className="w-[65px] h-[65px] rounded-full" src={Avatar2Img} />
                    <div>
                        <p className="text-lg text-[#8d8d8d]">Former creator</p>
                        <p className="text-2xl font-semibold">
                            {previous?.user.wallet_address === "" ? "Anonymous creator" : toShortAddress(previous?.user.wallet_address)}
                        </p>
                    </div>
                </div>
            )}

            <div className="flex gap-2 mt-4">
                <img className="w-[65px] h-[65px] rounded-full" src={AvatarImg} />
                <div>
                    <p className="text-lg text-[#8d8d8d]">Current creator</p>
                    <p className="text-2xl font-semibold">
                        {info?.user.wallet_address === "" ? "Anonymous creator" : toShortAddress(info?.user.wallet_address)}
                    </p>
                </div>
            </div>
            <div className="flex justify-end gap-4 my-6">
                <p className="text-[#8E8E8E] text-xl font-medium leading-[20px]">20</p>
                <img className="w-[20px] h-[20px]" src={UserImg} />
                <p className="text-[#8E8E8E] text-xl font-medium leading-[20px]">20</p>
                <img className="w-[20px] h-[20px]" src={HeartImg} />
            </div>
            <div className="flex gap-2 justify-end">
                <p className="text-[#8c8c8c]">Created at</p>
                <p className="text-black">Jun 17, 2023 at 05:08</p>
            </div>
            <div className="mt-5 flex flex-col gap-2">
                <DarkButton>Purchase</DarkButton>
                <DarkButton className="w-full h-20 rounded-[20px] bg-black text-white font-bold  text-lg" onClick={onClickRecreated}>
                    Recreate
                </DarkButton>
            </div>
        </CardContainer>
    );
};
const DarkButton = twc.div`
  w-full h-20 rounded-[20px] bg-black text-white font-bold  text-lg
  flex justify-center items-center hover:cursor-pointer 
`;

export default OriginalStage;
