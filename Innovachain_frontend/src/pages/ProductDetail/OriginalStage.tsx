import clsx from "clsx";
import { HeartIcon } from "lucide-react";
import { useContext } from "react";
import { twc } from "react-twc";
import { UserImg } from "../../assets/gallery";
import { Avatar2Img, AvatarImg } from "../../assets/product-detail";
import { CardContainer } from "../../components/Card";
import Progress from "../../components/Progress";
import { UserContext } from "../../context/UserProvider";
import { useLikeMutation, useUnlikeMutation } from "../../hooks/useLikeOrUnlikeMutation";
import useProductInfoById from "../../hooks/useProductInfo";
import { useUserLikeStatusOfImage } from "../../hooks/useUserStats";
import { ProductInfo } from "../../utils/api";
import { cn } from "../../utils/cn";
import toShortAddress from "../../utils/toShortAddress";

const OriginalStage = ({
    onClickPurchase,
    onClickRecreated,
    info,
}: {
    onClickPurchase?: () => void;
    onClickRecreated?: () => void;
    info?: ProductInfo | null;
}) => {
    const { userId } = useContext(UserContext);
    const { data: previous } = useProductInfoById({ imageId: info?.source_image_id });
    const { data: likeStatus, refetch } = useUserLikeStatusOfImage({ imageId: info?.id, userId: userId });

    const { mutateAsync: like } = useLikeMutation(info?.id);
    const { mutateAsync: unlike } = useUnlikeMutation(info?.id);

    return (
        <CardContainer className="flex-1 relative space-y-4">
            {/* Choice Card */}
            <div className="flex justify-between items-end">
                <h3 className="text-[#292B39] text-[50px] font-semibold font-poppins leading-[35px]">{info?.name}</h3>
                <div className="flex gap-1">
                    <button className={clsx("bg-[#0066D4] px-2 py-1 rounded-full text-white font-medium")}>Verified</button>
                </div>
            </div>
            <p className="text-[#888888B2] text-xl">{info?.description}</p>
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

            <Progress />

            <div className="flex justify-end gap-4 my-6">
                <p className="text-[#8E8E8E] text-xl font-medium leading-[20px]">{info?.like_count}</p>
                {/* <img className="w-[20px] h-[20px] stroke-red-600" src={HeartImg} /> */}

                <HeartIcon
                    size={20}
                    className={cn(likeStatus?.status ? "fill-red-500 stroke-none" : "fill-none stroke-[#8E8E8E]", "hover:cursor-pointer")}
                    onClick={async () => {
                        if (info === undefined || info === null) return;

                        if (likeStatus?.status) {
                            await unlike(info.id).finally(() => refetch());
                        } else {
                            await like(info.id).finally(() => refetch());
                        }
                    }}
                />
                <p className="text-[#8E8E8E] text-xl font-medium leading-[20px]">{info?.reference_count}</p>
                <img className="w-[20px] h-[20px]" src={UserImg} />
            </div>
            <div className="flex gap-2 justify-end">
                <p className="text-[#c99e9e]">Created at</p>
                <p className="text-black">Jun 17, 2023 at 05:08</p>
            </div>

            <div className="mt-auto flex flex-col gap-2 pt-5">
                <DarkButton className="w-full h-20 rounded-[20px] bg-black text-white font-bold  text-lg" onClick={onClickPurchase}>
                    Purchase
                </DarkButton>
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
