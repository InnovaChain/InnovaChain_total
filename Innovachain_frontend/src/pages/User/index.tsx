import { useWallet } from "@solana/wallet-adapter-react";
import { useContext } from "react";
import Blockies from "react-blockies";
import { GalleryCard } from "../../components/CollectionGallery/GalleryCards";
import { Separator } from "../../components/ui/separator";
import { UserContext } from "../../context/UserProvider";
import useUserCreations from "../../hooks/useUserCreations";
import { useUserStats } from "../../hooks/useUserStats";

export default function User() {
    const { publicKey } = useWallet();

    const { userId } = useContext(UserContext);

    const { data: userCreations } = useUserCreations();

    const { data: userStats } = useUserStats({ userId });

    return (
        <div className="text-white min-h-screen p-4 w-full mt-10 space-y-10 px-20 flex flex-col items-start justify-start">
            <div className="w-full flex items-center space-x-16">
                <Blockies seed={publicKey?.toBase58() ?? ""} size={40} scale={3} className="rounded-full" />

                <div className="flex flex-col w-full space-y-2">
                    <div className="flex w-full justify-start items-center">
                        <div className="w-full">
                            <h1 className="text-2xl font-bold">Address</h1>
                            <p className="text-gray-400">{publicKey?.toBase58() ?? ""}</p>
                        </div>

                        <div className="w-full">
                            <h1 className="text-2xl font-bold">Total rewards</h1>
                            <p className="text-gray-400">{userStats?.total_rewards}</p>
                        </div>
                    </div>

                    <Separator className="w-full bg-white" />

                    <div className="flex space-x-10 text-center">
                        <div>
                            <p className="text-2xl font-bold">{userStats?.total_likes}</p>
                            <p className="text-sm text-gray-400">Likes</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{userStats?.total_references}</p>
                            <p className="text-sm text-gray-400">Cites</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">12K</p>
                            <p className="text-sm text-gray-400">Followers</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">587</p>
                            <p className="text-sm text-gray-400">Followings</p>
                        </div>
                    </div>
                </div>
            </div>

            {userCreations?.detailed_images.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center text-gray-500 pt-40">No collection found</div>
            ) : (
                <div className="w-full">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {userCreations?.detailed_images
                            .filter((image) => image.user_id === userId)
                            .map((image) => (
                                <GalleryCard
                                    creator={
                                        image.user.wallet_address && image.user.wallet_address !== "" ? image.user.wallet_address : "Anonymous user"
                                    }
                                    key={image.id}
                                    image={image}
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
