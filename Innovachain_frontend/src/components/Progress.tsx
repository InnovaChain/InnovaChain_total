import MultiProgress from "react-multi-progress";

export default function Progress() {
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
}
