import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { Web3ModalProvider } from "./context/Web3ProviderContext.tsx";
import { Web3Provider } from "./context/Web3Provider.tsx";
// import { Buffer } from "buffer";
// globalThis.Buffer = Buffer;

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {/* <Web3ModalProvider> */}
        {/* <SolanaContext> */}
        <Web3Provider>
            <App />
        </Web3Provider>
        {/* </SolanaContext> */}
        {/* </Web3ModalProvider> */}
    </StrictMode>
);
