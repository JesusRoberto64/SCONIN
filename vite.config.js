import { defineConfig } from "vite";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";


export default defineConfig({
    base: '/',
    root: resolve(__dirname, "scr"),
    build: {
        outDir: "../dist",
    },
    server: {
        host: '0.0.0.0',
        port: 6060,
    },
    plugins: [
        viteStaticCopy({
            targets:[
                {
                    src: "views/**/*",
                    dest: "views"
                },
            ],
        }),
    ],
});