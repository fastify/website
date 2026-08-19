// @ts-check
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import astroInference from "astro-inference";
import pagefind from "astro-pagefind";
import baseConfig from "./astro.base.config.mjs";
import { rehypeCodeCopy } from "./src/lib/rehype-code-copy.mjs";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

const markdownProcessor = () =>
	unified({
		remarkPlugins: [remarkReadingTime],
		rehypePlugins: [rehypeCodeCopy],
	});

// https://astro.build/config
export default defineConfig({
	site: "https://fastify.dev",
	base: baseConfig.base,
	outDir: "./build",
	markdown: {
		processor: markdownProcessor(),
	},
	integrations: [
		mdx({
			processor: markdownProcessor(),
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
