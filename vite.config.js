import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// export default defineConfig({ plugins: [react()] });

export default defineConfig({
    base: "/casio-site/",
    plugins: [react()],
});