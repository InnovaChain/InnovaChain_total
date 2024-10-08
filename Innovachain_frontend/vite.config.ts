import { defineConfig, loadEnv } from "vite";
// import reactSWC from "@vitejs/plugin-react-swc";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [
            // reactSWC(),
            react(),
            env.VITE_DISABLED_POLYFILLS === "true"
                ? []
                : nodePolyfills({
                      globals: {
                          Buffer: true,
                      },
                  }),
        ],
    };
});
