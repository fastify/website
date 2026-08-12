import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const docs = defineCollection({
	loader: glob({
		pattern: "**/*.{md,mdx}",
		base: "./src/content/docs",
		// Preserve the original file paths (case + dots) as IDs so version folders
		// like `v5.x` and upstream filenames like `Reference/Errors` map 1:1 to URLs
		// and match the links rewritten by scripts/fetch-docs.mjs.
		generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/i, ""),
	}),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		section: z.string().default("Guides"),
		order: z.number().default(500),
		version: z.string().optional(),
	}),
});

export const collections = { docs };
