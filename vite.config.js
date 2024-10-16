import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue2";
import { glob } from "glob";
import copy from "rollup-plugin-copy";
import path from "path";
import autoprefixer from "autoprefixer";
import postcssRTLCSS from "postcss-rtlcss";

// FleetCart version
const VERSION = "4.5.0";

export default defineConfig(async ({ command, mode }) => {
    return {
        base: "",
        plugins: [
            laravel({
                input: [
                    "resources/sass/install/main.scss",
                    "resources/js/install/main.js",
                    "modules/Admin/Resources/assets/sass/main.scss",
                    "modules/Admin/Resources/assets/js/main.js",
                    "modules/Admin/Resources/assets/js/app.js",
                    "modules/Admin/Resources/assets/sass/dashboard.scss",
                    "modules/Admin/Resources/assets/js/dashboard.js",
                    "modules/Order/Resources/assets/admin/sass/print.scss",
                    "modules/Storefront/Resources/assets/public/sass/app.scss",
                    "modules/Storefront/Resources/assets/public/js/app.js",
                    "modules/Storefront/Resources/assets/public/js/vendors/flatpickr.js",

                    // identify assets through pattern matching
                    ...(await glob([
                        "modules/*/Resources/assets/*/sass/main.scss",
                        "modules/*/Resources/assets/*/js/main.js",
                        "modules/*/Resources/assets/*/js/create.js",
                        "modules/*/Resources/assets/*/js/edit.js",
                        "modules/*/Resources/assets/*/*/sass/main.scss",
                        "modules/*/Resources/assets/*/*/js/create.js",
                        "modules/*/Resources/assets/*/*/js/edit.js",
                        "modules/User/Resources/assets/admin/sass/auth/main.scss",
                        "modules/User/Resources/assets/admin/js/auth/main.js",
                        "modules/Storefront/Resources/assets/public/sass/pages/*/main.scss",
                        "modules/Storefront/Resources/assets/public/js/pages/*/main.js",
                        "modules/Storefront/Resources/assets/public/sass/pages/*/*/main.scss",
                        "modules/Storefront/Resources/assets/public/js/pages/*/*/main.js",
                    ])),
                ],
                refresh: true,
            }),
            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            }),
            copy({
                targets: [
                    {
                        src: [
                            "public/favicon.ico",
                            "node_modules/jquery/dist/jquery.min.js",
                            "node_modules/tinymce",
                            "node_modules/selectize/dist/js/standalone/selectize.min.js",
                            "node_modules/jstree/dist/jstree.min.js",
                            "modules/Admin/Resources/assets/images/*",
                            "modules/Admin/Resources/assets/vendors/css/bootstrap.min.css",
                            "modules/Admin/Resources/assets/vendors/js/bootstrap.min.js",
                            "modules/Storefront/Resources/assets/public/images/*",
                        ],
                        dest: "public/build/assets",
                    },
                    {
                        src: "node_modules/line-awesome/dist/line-awesome/fonts",
                        dest: ["modules/Storefront/Resources/assets/public"],
                    },
                ],
                copyOnce: true,
                hook: command === "build" ? "writeBundle" : "buildStart",
            }),
        ],
        css: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    postcssRTLCSS({
                        ltrPrefix: ".ltr",
                        rtlPrefix: ".rtl",
                        processKeyFrames: true,
                    }),
                ],
            },
        },
        resolve: {
            alias: {
                vue: path.resolve(
                    __dirname,
                    "./node_modules/vue/dist/vue.esm.js"
                ),
                "@modules": path.resolve(__dirname, "./modules"),
                "@admin": path.resolve(
                    __dirname,
                    "./modules/Admin/Resources/assets"
                ),
            },
        },
        build: {
            sourcemap: mode === "development",
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes("node_modules")) {
                            return id
                                .toString()
                                .split("node_modules/")[1]
                                .split("/")[0]
                                .toString();
                        }
                    },
                    entryFileNames: `assets/[name]-[hash]-v${VERSION}.js`,
                    chunkFileNames: `assets/[name]-[hash]-v${VERSION}.js`,
                    assetFileNames: function () {
                        return `assets/[name]-[hash]-v${VERSION}.[ext]`;
                    },
                },
            },
        },
    };
});
