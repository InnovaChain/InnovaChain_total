import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { Web3ModalProvider } from "./context/Web3ProviderContext.tsx";
import { SolanaContext } from "./context/SolanaContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {/* <Web3ModalProvider> */}
        <SolanaContext>
            <App />
        </SolanaContext>
        {/* </Web3ModalProvider> */}
    </StrictMode>
);
