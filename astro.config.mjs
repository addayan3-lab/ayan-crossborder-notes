import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://amz.hao1234.top",
  integrations: [sitemap()]
});