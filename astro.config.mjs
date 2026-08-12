// @ts-check
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import astroInference from "astro-inference";
import pagefind from "astro-pagefind";
import baseConfig from "./astro.base.config.mjs";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
	site: "https://fastify.dev",
	base: baseConfig.base,
	markdown: {
		processor: unified({
			remarkPlugins: [remarkReadingTime],
		}),
	},
	integrations: [
		mdx({
			processor: unified({
				remarkPlugins: [remarkReadingTime],
			}),
		}),
		sitemap(),
		pagefind(),
		astroInference({
			exclude: ["resources/**", "benchmarks/**", "organizations/**"],
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
