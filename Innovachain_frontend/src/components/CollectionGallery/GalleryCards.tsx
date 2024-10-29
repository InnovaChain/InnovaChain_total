import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { HeartImg, UserImg } from "../../assets/gallery";
import { API_URL } from "../../constants";
import { getImages, ImageType } from "../../utils/api";
import toShortAddress from "../../utils/toShortAddress";

const GalleryCards = () => {
    const { data } = useSWR<ImageType[]>("getImages", getImages);
    console.log(data);
    if (!data) return null;
    return (
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-10">
            {data.map((image) => (
                <GalleryCard
                    creator={image.user.wallet_address && image.user.wallet_address !== "" ? image.user.wallet_address : "Anonymous user"}
                    key={image.id}
                    image={image}
                />
            ))}
        </div>
    );
};

const GalleryCard = ({ creator, image }: { creator: string; image: ImageType }) => {
    const { name, created_at, id, like_count, reference_count } = image;
    const navigate = useNavigate();

    return (
        <div className="p-3 bg-white rounded-xl font-poppins flex flex-col gap-4">
            <img className="w-full h-auto rounded-xl" src={`${API_URL}/images/${id}`} />
            <div className="flex justify-between items-center">
                <p className="text-[#141414] text-xl font-semibold">{name}</p>
                <p className="text-[#94A3B8] text-xs font-normal">{dayjs(created_at).format("YYYY-MM-DD HH:mm")}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <p className="text-[#94A3B8] text-sm">{creator === "Anonymous user" ? "Anonymous user" : toShortAddress(creator)}</p>
                    <div className="flex gap-9 text-base font-medium text-[#8e8e8e]">
                        <div className="flex gap-2 items-center">
                            <p>{like_count}</p>
                            <img src={HeartImg} />
                        </div>
                        <div className="flex gap-2 items-center">
                            <p>{reference_count}</p>
                            <img src={UserImg} />
                        </div>
                    </div>
                </div>
                <DetailButton onClick={() => navigate(`/product/${id}`)} />
            </div>
        </div>
    );
};

const DetailButton = ({ onClick }: { onClick?: () => void }) => {
    return (
        <button onClick={onClick} className="py-2 px-4 bg-[#141414] rounded-xl text-white text-sm font-semibold">
            Detail
        </button>
    );
};

export default GalleryCards;
