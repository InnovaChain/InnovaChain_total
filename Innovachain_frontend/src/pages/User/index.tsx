import { useWallet } from "@solana/wallet-adapter-react";
import { useContext } from "react";
import Blockies from "react-blockies";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { UserContext } from "../../context/UserProvider";
import { useUserStats } from "../../hooks/useUserStats";

interface ArtworkProps {
    title: string;
    likes: number;
    views: number;
    imageUrl: string;
}

const ArtworkCard = ({ title, likes, views, imageUrl }: ArtworkProps) => (
    <Card className="w-full">
        <CardContent className="p-0">
            <img src={imageUrl} alt={title} width={200} height={200} className="w-full h-40 object-cover rounded-t-lg" />
            <div className="p-4">
                <h3 className="font-semibold text-sm">{title}</h3>
                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>❤️ {likes}</span>
                        <span>👁️ {views}</span>
                    </div>
                    <Button variant="outline" size="sm">
                        Detail
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default function User() {
    const { publicKey } = useWallet();

    const { userId } = useContext(UserContext);

    const artworks = [
        { title: "With father", likes: 118, views: 78, imageUrl: "/placeholder.svg?height=200&width=200" },
        { title: "Green Holiday", likes: 118, views: 78, imageUrl: "/placeholder.svg?height=200&width=200" },
        { title: "Green", likes: 118, views: 78, imageUrl: "/placeholder.svg?height=200&width=200" },
        { title: "On the way", likes: 118, views: 78, imageUrl: "/placeholder.svg?height=200&width=200" },
        { title: "Water Painting", likes: 118, views: 78, imageUrl: "/placeholder.svg?height=200&width=200" },
        { title: "Glowing Sea", likes: 118, views: 78, imageUrl: "/placeholder.svg?height=200&width=200" },
    ];

    const { data: userStats } = useUserStats({ userId });

    return (
        <div className="text-white min-h-screen p-4 w-full px-20 flex flex-col items-start justify-center">
            <div className="w-full flex-col flex justify-between items-center space-x-20">
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
            </div>

            <div className="w-full mt-20">
                <h2 className="text-xl font-semibold">Collection</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {artworks.map((artwork, index) => (
                        <ArtworkCard key={index} {...artwork} />
                    ))}
                </div>
            </div>
        </div>
    );
}
