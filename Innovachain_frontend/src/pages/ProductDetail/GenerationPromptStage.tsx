import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { twc } from "react-twc";
import { CardContainer } from "../../components/Card";

const GenerationPromptStage = ({
    onClickGenerate,
    originalPrompt,
    setRevisedPrompt,
}: {
    onClickGenerate: () => void;
    originalPrompt?: string;
    setRevisedPrompt: Dispatch<SetStateAction<string>>;
}) => {
    const [selectedRecreationModal, setSelectedRecreationModal] = useState("Use as promopt");
    const [selectedModel, setSelectedModel] = useState("Midjourney");

    const [localRevisedPrompt, setLocalRevisedPrompt] = useState(originalPrompt ?? "");

    useEffect(() => {
        setRevisedPrompt(localRevisedPrompt);
    }, [localRevisedPrompt, setRevisedPrompt]);

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
            <PromptInputArea className="mb-3" disabled content={originalPrompt ?? ""} />
            <PromptTitle>Revised Prompt</PromptTitle>
            <PromptInputArea
                className="mb-8"
                content={localRevisedPrompt ?? ""}
                onChangeText={(value: string) => {
                    setLocalRevisedPrompt(value);
                }}
            />
            <div className="flex justify-end">
                <GenerateButton onClickGenerate={onClickGenerate} />
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

const PromptInputArea = ({
    content,
    disabled,
    onChangeText,
    className,
}: {
    content: string;
    disabled?: boolean;
    onChangeText?: (value: string) => void;
    className?: string;
}) => {
    return (
        <textarea
            disabled={disabled}
            className={clsx("bg-[#F6F6F6] rounded-lg p-3", "text-[#8D8D8D] text-sm", "resize-none w-full min-h-[180px]", className)}
            value={content}
            {...(onChangeText && {
                onChange: (e) => {
                    onChangeText(e.target.value);
                },
            })}
        />
    );
};

const GenerateButton = ({ onClickGenerate }: { onClickGenerate: () => void }) => {
    return (
        <button className={clsx("bg-[#141414] text-white", "text-base font-medium rounded-full", "px-12 py-2 rounded-lg")} onClick={onClickGenerate}>
            Generate
        </button>
    );
};
export default GenerationPromptStage;
