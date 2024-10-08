import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [
            react(),
            env.VITE_DISABLED_POLYFILLS === "true"
                ? []
                : nodePolyfills({
                      globals: {
                          Buffer: true,
                      },
                  }),
        ],
        optimizeDeps: {
            exclude: ["js-big-decimal"],
        },
    };
});
