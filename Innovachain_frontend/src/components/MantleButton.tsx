import { ConnectKitButton } from "connectkit";
import toShortAddress from "../utils/toShortAddress";

export default function MantleButton() {
    return (
        <ConnectKitButton.Custom>
            {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
                return (
                    <button
                        onClick={show}
                        style={{
                            height: "56px",
                            borderRadius: "15px",
                            padding: "0 20px",
                            backgroundColor: "#512da8",
                            color: "white",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        {isConnected ? toShortAddress(address) : "Connect"}
                    </button>
                );
            }}
        </ConnectKitButton.Custom>
    );
}
