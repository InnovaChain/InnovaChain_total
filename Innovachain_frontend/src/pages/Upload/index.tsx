import { useWallet } from "@solana/wallet-adapter-react";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { twc } from "react-twc";
import { ArrowDownImg, UploadImg } from "../../assets/upload";
import { CardContainer } from "../../components/Card";
import Container from "../../components/Container";
import useUploadMutation from "../../hooks/useUploadMutation";

import useInsertWatermarkMutation from "../../hooks/useInsertWatermarkMutation";

const Upload = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [, setRoyalty] = useState("");
    const [size, setSize] = useState("");
    const [tags, setTags] = useState("");
    const [copyrightPrice, setCopyrightPrice] = useState("");
    // const [copyrightOwner, setCopyrightOwner] = useState("");

    const [sourceImage, setSourceImage] = useState<File | null>(null);

    const { publicKey, connected } = useWallet();

    const { mutateAsync: uploadImage, isPending } = useUploadMutation();

    const { mutateAsync: insertWatermark } = useInsertWatermarkMutation();

    async function onClickUpload() {
        if (!name) {
            toast.error("Please enter a name");
            return;
        }
        if (!description) {
            toast.error("Please enter a description");
            return;
        }
        if (!sourceImage) {
            toast.error("Please upload a source image");
            return;
        }
        if (!connected || !publicKey) {
            toast.error("Please connect your wallet");
            return;
        }
        try {
            const res = await uploadImage({
                name,
                description,
                file: sourceImage,
                walletAddress: publicKey.toBase58(),
            });

            await insertWatermark({ watermark: res.uploadResponse.watermark })
                .then(() => console.log("Watermark inserted successfully"))
                .catch((error: Error) => {
                    console.error(error);
                });
            toast.success("Uploaded and generated watermark successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload, image should be larger than 256x256");
        }
    }
    return (
        <Container>
            <div className="flex justify-center items-center mt-[100px] pb-[80px]">
                <Title>Upload Your Artwork</Title>
            </div>
            <div className="flex gap-8">
                <CardContainer className="w-[60%]">
                    <CardTitle>Name</CardTitle>
                    <CardInput className="mt-5" placeholder="ArtWork Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <CardTitle className="mt-8">Description</CardTitle>
                    <CardInput
                        className="mt-5"
                        placeholder="Enter Your Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex gap-8 mt-8">
                        <div>
                            <CardTitle>Royalty</CardTitle>
                            <CardSelector
                                className="mt-5 min-w-[200px]"
                                placeholder="Royalty"
                                options={["xx1", "xx2", "xx3"]}
                                onChange={(value) => setRoyalty(value)}
                            />
                        </div>
                        <div>
                            <CardTitle>Size</CardTitle>
                            <CardInput className="mt-5" placeholder="Ex - 100x100" value={size} onChange={(e) => setSize(e.target.value)} />
                        </div>
                    </div>
                    <CardTitle className="mt-8">Tags</CardTitle>
                    <CardInput className="mt-5" placeholder="Beautiful Castle, Monkeys ETC" value={tags} onChange={(e) => setTags(e.target.value)} />
                    <div className="flex gap-8 mt-8">
                        <div className="flex-1">
                            <CardTitle>Copyright Price</CardTitle>
                            <SelectorInputGroup
                                className="mt-5"
                                selectorOptions={["SOL", "JitoSOL", "JUP", "USDC"]}
                                selectorPlaceholder="SOL"
                                inputPlaceholder="0.001 SOL"
                                selectorValue={copyrightPrice}
                                selectorOnChange={(value) => setCopyrightPrice(value)}
                                inputValue={copyrightPrice}
                                inputOnChange={(e) => setCopyrightPrice(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <CardTitle>Copyright Owner</CardTitle>
                            <CardInput
                                className="mt-5"
                                placeholder="Your Address"
                                disabled
                                value={publicKey?.toBase58() ?? ""}
                                // onChange={(e) => setCopyrightOwner(e.target.value)}
                            />
                        </div>
                    </div>
                </CardContainer>
                <div className="flex flex-col flex-1 gap-8">
                    <Uploader
                        className="h-[30%]"
                        file={sourceImage}
                        onFileUpload={(file: File) => {
                            setSourceImage(file);
                        }}
                    >
                        PNG, GIF, WEBP.
                    </Uploader>
                    <Uploader
                        className="h-[30%]"
                        file={null}
                        onFileUpload={(file) => {
                            console.log(file);
                        }}
                    >
                        Upload NFT
                    </Uploader>
                    <CardContainer className="flex-1 flex flex-col gap-10">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <CardTitle>Put On Sale</CardTitle>
                                <CardDescription>People Will Bids On Your Copyright</CardDescription>
                            </div>
                            <Switcher />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <CardTitle>Direct Sale</CardTitle>
                                <CardDescription>No Bids - Only Direct Salling</CardDescription>
                            </div>
                            <Switcher />
                        </div>
                    </CardContainer>
                </div>
            </div>
            <div>
                <UploadButton onClickUpload={onClickUpload} isPending={isPending} />
            </div>
        </Container>
    );
};

const UploadButton = ({ onClickUpload, isPending }: { onClickUpload: () => void; isPending: boolean }) => {
    return (
        <button
            disabled={isPending}
            className={clsx("w-full py-3 font-semibold rounded-xl bg-white mt-8 disabled:bg-gray-300")}
            onClick={onClickUpload}
        >
            {isPending ? (
                <div className="flex justify-center items-center space-x-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-black border-opacity-70" />
                    <p>Uploading...</p>
                </div>
            ) : (
                "Verify & Upload"
            )}
        </button>
    );
};

const Uploader = ({
    children,
    className,
    file,
    onFileUpload,
}: {
    children: string;
    className?: string;
    file: File | null;
    onFileUpload: (file: File) => void;
}) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                onFileUpload(acceptedFiles[0]);
            }
        },
        [onFileUpload]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <CardContainer
            {...getRootProps()}
            className={clsx(
                "grid place-items-center place-content-center cursor-pointer",
                isDragActive && "border-2 border-dashed border-gray-400",
                className
            )}
        >
            <input {...getInputProps()} />
            <img className="w-[50px] h-[50px]" src={UploadImg} alt="Upload" />
            <CardDescription className="mt-3">
                {isDragActive && "Drop the file here"}
                {file && file?.name}
                {!isDragActive && !file && children}
            </CardDescription>
        </CardContainer>
    );
};

const Switcher = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <label className="flex items-center cursor-pointer">
            <div className="relative">
                <input type="checkbox" className="sr-only" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                <div className={clsx("block w-14 h-8 rounded-full duration-200", isChecked ? "bg-[#000]" : "bg-[#E7E4E4]")}></div>
                <div
                    className={clsx(
                        "absolute left-1 top-1 bg-white w-6 h-6 rounded-full",
                        "transition-transform duration-200 ease-in-out",
                        isChecked && "transform translate-x-6"
                    )}
                ></div>
            </div>
        </label>
    );
};

const CardDescription = twc.p`
  text-[#777E90]
`;

const CardInput = ({
    placeholder,
    className,
    roundedPosition,
    value,
    disabled,
    onChange,
}: {
    placeholder: string;
    className?: string;
    roundedPosition?: "left" | "right";
    value: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <div
            className={clsx(
                "flex justify-between items-center",
                "px-6 py-5 bg-[#EFEFEF]",
                roundedPosition === "left" && "rounded-l-xl",
                roundedPosition === "right" && "rounded-r-xl",
                !roundedPosition && "rounded-xl",
                className
            )}
        >
            <input
                disabled={disabled}
                value={value}
                // onChange={onChange}
                className={clsx("flex-1 bg-transparent outline-none", "placeholder:text-[#9596A6] text-black text-opacity-60 ")}
                placeholder={placeholder}
                {...(onChange && {
                    onChange: onChange,
                })}
            />
        </div>
    );
};

const CardTitle = twc.p`
  text-xl font-medium font-poppins
`;

const Title = twc.h1`
text-white text-[45px] font-semibold
  text-center
`;

const CardSelector = ({
    options,
    placeholder,
    className,
    roundedPosition,
    onChange,
}: {
    options: string[];
    placeholder: string;
    className?: string;
    roundedPosition?: "left" | "right";
    onChange: (value: string) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        onChange(selectedOption);
    }, [selectedOption]);

    return (
        <div className={clsx("relative", className)}>
            <div
                className={clsx(
                    "flex justify-between items-center px-6 py-5",
                    "bg-[#EFEFEF] cursor-pointer",
                    roundedPosition === "left" && "rounded-l-xl",
                    roundedPosition === "right" && "rounded-r-xl",
                    !roundedPosition && "rounded-xl"
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`${selectedOption ? "text-black text-opacity-60" : "text-[#9596A6]"}`}>{selectedOption || placeholder}</span>
                <img className={clsx("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} src={ArrowDownImg} />
            </div>
            {isOpen && (
                <ul className={clsx("border border-gray-300 border-opacity-60", "absolute z-10 w-full mt-1", "bg-white rounded-md shadow-lg")}>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className={clsx("px-6 py-2 hover:bg-gray-100 cursor-pointer", "text-black text-opacity-60")}
                            onClick={() => {
                                setSelectedOption(option);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const SelectorInputGroup = ({
    selectorOptions,
    selectorPlaceholder,
    inputPlaceholder,
    className,
    selectorOnChange,
    inputValue,
    inputOnChange,
}: {
    selectorOptions: string[];
    selectorPlaceholder: string;
    inputPlaceholder: string;
    className?: string;
    selectorValue: string;
    selectorOnChange: (value: string) => void;
    inputValue: string;
    inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <div className={clsx("flex", className)}>
            <div className="flex-1 border-r border-[#DADADA]">
                <CardSelector roundedPosition="left" options={selectorOptions} placeholder={selectorPlaceholder} onChange={selectorOnChange} />
            </div>
            <div className="flex-1">
                <CardInput roundedPosition="right" placeholder={inputPlaceholder} value={inputValue} onChange={inputOnChange} />
            </div>
        </div>
    );
};

export default Upload;
