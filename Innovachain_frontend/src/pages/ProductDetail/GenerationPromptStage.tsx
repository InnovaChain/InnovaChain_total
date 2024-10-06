import clsx from "clsx";
import { CardContainer } from "../../components/Card";
import { twc } from "react-twc";
import { useState } from "react";

const GenerationPromptStage = ({ originalPrompt }: { originalPrompt: string }) => {
    const [selectedRecreationModal, setSelectedRecreationModal] = useState("Use as promopt");
    const [selectedModel, setSelectedModel] = useState("Midjourney");
    return (
        <CardContainer className="flex-1">
            <TabSelector
                className="mb-2"
                tabTitle="Recreation model"
                options={["Use as promopt", "Recreate by myself"]}
                selected={selectedRecreationModal}
                onClickTab={(option) => setSelectedRecreationModal(option)}
            />
            <TabSelector
                className="mb-4"
                tabTitle="Model"
                options={["Midjourney", "Stable Diffusion", "DELL3"]}
                selected={selectedModel}
                onClickTab={(option) => setSelectedModel(option)}
            />
            <PromptTitle>Prompt</PromptTitle>
            <PromptInputArea className="mb-3 h-fit min-h-fit" disabled content={originalPrompt} />
            <PromptTitle>Revised Prompt</PromptTitle>
            <PromptInputArea
                className="mb-8"
                content={`A young woman with long hair, tied in a ponytail, holds the sword, wearing Japanese from the Edo period. She has a side profile view and is depicted as a character for the game 'Genshin Impact'. The background of her portrait should be simple to highlight her against a gray backdrop. Her expression appears confident or serious, reflecting anime-style features typical of characters found within this genre.`}
            />
            <div className="flex justify-end">
                <GenerateButton />
            </div>
        </CardContainer>
    );
};

const TabSelector = ({
    tabTitle,
    options,
    className,
    selected,
    onClickTab,
}: {
    tabTitle: string;
    options: string[];
    className?: string;
    selected: string;
    onClickTab: (option: string) => void;
}) => {
    return (
        <div className={clsx("flex justify-between items-center", "text-[#979797] text-sm font-medium", className)}>
            <p>{tabTitle}</p>
            <div className="flex text-sm bg-[#F4F4F5] p-1 rounded-lg">
                {options.map((option) => (
                    <button
                        className={clsx(
                            "text-center px-2 py-1 rounded-[6px]",
                            "flex justify-between items-center",
                            "duration-200",
                            selected === option && "bg-white text-[#979797]"
                        )}
                        onClick={() => onClickTab(option)}
                        key={option}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

const PromptTitle = twc.p`
  mb-1 text-base font-semibold leading-[22px] text-[#141414]
`;

const PromptInputArea = ({ content, disabled, className }: { content: string; disabled?: boolean; className?: string }) => {
    return (
        <textarea
            disabled={disabled}
            className={clsx("bg-[#F6F6F6] rounded-lg p-3", "text-[#8D8D8D] text-sm", "resize-none w-full min-h-[180px]", className)}
        >
            {content}
        </textarea>
    );
};

const GenerateButton = () => {
    return <button className={clsx("bg-[#141414] text-white", "text-base font-medium rounded-full", "px-12 py-2 rounded-lg")}>Generate</button>;
};
export default GenerationPromptStage;
