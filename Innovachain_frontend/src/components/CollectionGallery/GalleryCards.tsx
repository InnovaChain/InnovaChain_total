import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { HeartImg, UserImg } from "../../assets/gallery";
import { API_URL } from "../../constants";
import useTotalImagesCount from "../../hooks/useTotalImagesCount";
import { getImages, ImageType } from "../../utils/api";
import toShortAddress from "../../utils/toShortAddress";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { cn } from "../../utils/cn";

const GalleryCards = () => {
    const { data: count, isFetched } = useTotalImagesCount();
    const [pagination, setPagination] = useState<{ page: number; pageSize: number }>({ page: 0, pageSize: 40 });

    const skip = useMemo(() => pagination.page * pagination.pageSize, [pagination]);

    const { data } = useSWR<ImageType[]>([`getImages`, skip, pagination.pageSize], () => getImages({ skip, limit: pagination.pageSize }));

    console.log(data);
    if (!data) return null;
    return (
        <div className="flex flex-col space-y-10 justify-center items-center">
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-10 pt-10" id="gallery">
                {data.map((image) => (
                    <GalleryCard
                        creator={image.user.wallet_address && image.user.wallet_address !== "" ? image.user.wallet_address : "Anonymous user"}
                        key={image.id}
                        image={image}
                    />
                ))}
            </div>

            {isFetched && count && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem className={cn(pagination.page === 0 ? "cursor-not-allowed text-gray-500" : "cursor-pointer")}>
                            <PaginationPrevious
                                {...(pagination.page >= 0 && {
                                    href: "#gallery",
                                })}
                                onClick={() => {
                                    if (pagination.page === 0) return;
                                    setPagination({ ...pagination, page: pagination.page - 1 });
                                }}
                            />
                        </PaginationItem>

                        {Array.from({ length: Math.ceil(count / pagination.pageSize) }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#gallery"
                                    isActive={i === pagination.page}
                                    onClick={() => setPagination({ ...pagination, page: i })}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem
                            className={cn(
                                pagination.page === Math.ceil(count / pagination.pageSize) - 1 ? "cursor-not-allowed text-gray-500" : "cursor-pointer"
                            )}
                        >
                            <PaginationNext
                                {...(pagination.page <= Math.ceil(count / pagination.pageSize) - 1 && {
                                    href: "#gallery",
                                })}
                                onClick={() => {
                                    if (pagination.page === Math.ceil(count / pagination.pageSize) - 1) return;
                                    setPagination({ ...pagination, page: pagination.page + 1 });
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export const GalleryCard = ({ creator, image }: { creator: string; image: ImageType }) => {
    const { name, id, like_count, reference_count, reward } = image;
    const navigate = useNavigate();

    return (
        <div className="p-3 bg-white rounded-xl font-poppins flex flex-col gap-4">
            <img className="w-full h-auto rounded-xl" src={`${API_URL}/images/${id}`} />
            <div className="flex justify-between items-center">
                <p className="text-[#141414] text-xl font-semibold">{name}</p>
                {/* <p className="text-[#94A3B8] text-xs font-normal">{dayjs(created_at).format("YYYY-MM-DD HH:mm")}</p> */}
                <p className="text-[#141414] text-sm font-normal">Reward: {reward}</p>
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
