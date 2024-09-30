/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INNOVA_CHAIN_ENV: "devnet" | "staging" | "production";
  readonly VITE_DISABLED_POLYFILLS: "true" | "false";
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
