import clsx from "clsx";
import { HeartImg } from "../../assets/gallery";
import { AvatarImg } from "../../assets/product-detail";
import { CardContainer } from "../../components/Card";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constants";
// import useSWR from "swr";
// import { readImageInfo } from "../../utils/api";

const GenerationMainStage = () => {
  const { id } = useParams();
  // const { data: imageInfo } = useSWR(`readImageInfo__${id}`, () => id ? readImageInfo(Number(id)): undefined);

  return (
    <CardContainer className="flex-1">
      {/* Choice Card */}
      <div className="flex justify-between items-end">
        <h3 className="text-[#292B39] text-[50px] font-semibold font-poppins leading-[35px]">
          Azuki
        </h3>
        <div className="flex gap-1">
          <p className="text-[#8E8E8E] text-xl font-medium leading-[20px]">
            20
          </p>
          <img className="w-[20px] h-[20px]" src={HeartImg} />
        </div>
      </div>

      <img className="w-full h-auto rounded-[20px] mt-10" src={`${API_URL}/images/${id}`} />
      <div className="mt-5 flex justify-between items-end">
        <div className="flex gap-4 items-center">
          <img className="w-auto h-full rounded-full" src={AvatarImg} />
          <div className="flex flex-col gap-3 h-full">
            <p className="text-[#8D8D8D] text-lg">Current creator</p>
            <p className="text-black text-[24px] font-medium font-poppins leading-[20px]">
              Videz
            </p>
          </div>
        </div>
        <FollowButton />
      </div>
    </CardContainer>
  );
};

const FollowButton = () => {
  return (
    <button
      className={clsx(
        "bg-[#141414] text-white",
        "text-base font-medium px-5 py-1 rounded-full",
      )}
    >
      Follow
    </button>
  );
};

export default GenerationMainStage;
