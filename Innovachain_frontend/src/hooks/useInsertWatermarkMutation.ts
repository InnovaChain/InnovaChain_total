import { AnchorProvider, Program, web3 } from "@coral-xyz/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";

const PROGRAM_ID = new PublicKey("5SutcEVK2AZzpo7JG82kefScv9W6UjGLLaqRoC1feSXZ");

export default function useInsertWatermarkMutation() {
    const { connection } = useConnection();
    const { publicKey, signAllTransactions, signTransaction } = useWallet();

    // if (!publicKey || !signAllTransactions || !signTransaction) {
    //     throw new Error("Wallet not connected");
    // }

    let provider: AnchorProvider | undefined;

    if (publicKey && signAllTransactions && signTransaction) {
        provider = new AnchorProvider(
            connection,
            {
                publicKey,
                signAllTransactions,
                signTransaction,
            },
            {
                preflightCommitment: "processed",
            }
        );
    }

    return useMutation({
        mutationKey: ["insertWatermark"],
        mutationFn: async ({ watermark }: { watermark: string }) => {
            const idl = await Program.fetchIdl(PROGRAM_ID, provider);

            if (!idl) {
                throw new Error("Error fetching IDL");
            }

            const program = new Program(idl, PROGRAM_ID, provider);

            const [watermarkAccountPDA] = PublicKey.findProgramAddressSync(
                [Buffer.from("watermark_account"), publicKey!.toBuffer()],
                program.programId
            );

            console.log("Watermark account PDA", watermarkAccountPDA);

            await program.methods
                .insert(watermark)
                .accounts({
                    systemProgram: web3.SystemProgram.programId,
                    watermarkAccount: watermarkAccountPDA,
                    user: publicKey!,
                })
                .rpc();
        },
    });
}
