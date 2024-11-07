import clsx from "clsx";
import { HeartIcon } from "lucide-react";
import { twc } from "react-twc";
import { UserImg } from "../../assets/gallery";
import { Avatar2Img, AvatarImg } from "../../assets/product-detail";
import { CardContainer } from "../../components/Card";
import useProductInfoById from "../../hooks/useProductInfo";
import { ProductInfo } from "../../utils/api";
import { cn } from "../../utils/cn";
import toShortAddress from "../../utils/toShortAddress";
import { useLikeMutation, useUnlikeMutation } from "../../hooks/useLikeOrUnlikeMutation";
import { useUserLikeStatusOfImage } from "../../hooks/useUserStats";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import MultiProgress from "react-multi-progress";

const OriginalStage = ({ onClickRecreated, info }: { onClickRecreated?: () => void; info?: ProductInfo | null }) => {
    const { userId } = useContext(UserContext);
    const { data: previous } = useProductInfoById({ imageId: info?.source_image_id });
    const { data: likeStatus, refetch } = useUserLikeStatusOfImage({ imageId: info?.id, userId: userId });

    const { mutateAsync: like } = useLikeMutation(info?.id);
    const { mutateAsync: unlike } = useUnlikeMutation(info?.id);

    return (
        <CardContainer className="flex-1 relative">
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

            <div className="mt-5 flex flex-col gap-2 absolute bottom-10 left-10 right-10">
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

const Progress = () => {
    return (
        <div className="w-full flex flex-col space-y-3 my-6">
            <MultiProgress
                transitionTime={1.2}
                elements={[
                    {
                        value: 60,
                        color: "#5FDFE9",
                    },
                    {
                        value: 40,
                        color: "#748BCF",
                    },
                ]}
                height={15}
                backgroundColor="white"
                className="w-full"
            />

            <div className="text-[#8D8D8D] grid grid-cols-2 gap-3">
                <span className="flex items-center space-x-3">
                    <span className="rounded-full size-4 bg-[#5FDFE9]" />
                    <p>Image</p>
                    <p>60%</p>
                </span>

                <span className="flex items-center space-x-3">
                    <span className="rounded-full size-4 bg-[#748BCF]" />
                    <p>Model</p>
                    <p>40%</p>
                </span>

                <span className="flex items-center space-x-3">
                    <span className="rounded-full size-4 bg-[#8C8C8C]" />
                    <p>Goods</p>
                    <p>0%</p>
                </span>
            </div>
        </div>
    );
};

export default OriginalStage;
