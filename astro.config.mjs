// @ts-check
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, svgoOptimizer } from "astro/config";
import astroInference from "astro-inference";
import pagefind from "astro-pagefind";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
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
	experimental: {
		svgOptimizer: svgoOptimizer({ multipass: true }),
	},
	markdown: {
		shikiConfig: {
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
			defaultColor: "dark",
		},
		processor: markdownProcessor(),
	},
	integrations: [
		mdx({
			shikiConfig: {
				themes: {
					light: "github-light",
					dark: "github-dark",
				},
				defaultColor: "dark",
			},
			processor: markdownProcessor(),
		}),
		sitemap(),
		pagefind(),
		astroInference({
			exclude: ["resources/**", "benchmarks/**", "organizations/**"],
		}),
	],
	vite: {
		plugins: [
			tailwindcss(),
			ViteImageOptimizer({
				includePublic: true,
				svg: { multipass: true },
			}),
		],
	},
});
