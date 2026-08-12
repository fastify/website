// @ts-nocheck
/**
 * Parse the Ecosystem guide from fastify/fastify (landed locally by
 * `scripts/fetch-docs.mjs` into `src/content/docs/latest/Guides/Ecosystem.md`)
 * and emit `src/data/plugins.json` for the ecosystem page.
 *
 * Uses `markdown-it` to walk the AST, splitting the document at the
 * `#### [Core](#core)` and `#### [Community](#community)` headings and pulling
 * each plugin's `[name](url)` plus the trailing description out of the list
 * items.
 */

import { existsSync } from "node:fs";
import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import MarkdownIt from "markdown-it";
import pino from "pino";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "src/content/docs/latest/Guides/Ecosystem.md");
const OUTPUT = path.join(ROOT, "src/data/plugins.json");

const log = pino({
	level: process.env.LOG_LEVEL || "debug",
	msgPrefix: "[build-plugin-list] ",
	transport: {
		target: "pino-pretty",
		options: { colorize: true },
	},
});

const md = new MarkdownIt({ typographer: false });
md.disable("emphasis");

async function skipIfGenerated() {
	if (!existsSync(SOURCE) && existsSync(OUTPUT)) {
		try {
			if ((await stat(OUTPUT)).isFile()) return true;
		} catch {}
	}
	return false;
}

function headingAnchor(tokens, index) {
	const inline = tokens[index + 1];
	if (inline?.type !== "inline" || !inline.children) return null;
	const link = inline.children.find(
		(child) =>
			child.type === "link_open" && child.attrGet("href")?.startsWith("#"),
	);
	return link ? link.attrGet("href").slice(1) : null;
}

function collectSections(tokens) {
	const sections = {};
	let currentSection = null;

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];

		if (token.type === "heading_open") {
			const anchor = headingAnchor(tokens, i);
			if (anchor) {
				currentSection = anchor;
				sections[currentSection] = sections[currentSection] ?? [];
			}
			while (i < tokens.length && tokens[i].type !== "heading_close") i++;
			continue;
		}

		if (currentSection && token.type === "list_item_open") {
			const paragraphOpen = tokens[i + 1];
			const inline = tokens[i + 2];
			if (
				paragraphOpen?.type === "paragraph_open" &&
				inline?.type === "inline"
			) {
				sections[currentSection].push(inline);
			}
		}
	}

	return sections;
}

function joinText(children) {
	return children.map((child) => child.content ?? "").join("");
}

function renderDescription(children) {
	let openHref = null;
	return children
		.map((child) => {
			switch (child.type) {
				case "text":
					return child.content;
				case "code_inline":
					return `\`${child.content}\``;
				case "softbreak":
					return " ";
				case "link_open":
					openHref = child.attrGet("href");
					return "[";
				case "link_close": {
					const href = openHref ?? "";
					openHref = null;
					return `](${href})`;
				}
				default:
					return "";
			}
		})
		.join("");
}

function parseEntry(inline) {
	const children = inline.children ?? [];
	const linkOpenIndex = children.findIndex(
		(child) => child.type === "link_open",
	);
	if (linkOpenIndex === -1) {
		throw new Error(
			`Invalid plugin entry: no link found in "${inline.content}". Expected a markdown list item starting with "[\\\`name\\\`](url)".`,
		);
	}

	const url = children[linkOpenIndex].attrGet("href");
	const linkCloseIndex = children.findIndex(
		(child, index) => index > linkOpenIndex && child.type === "link_close",
	);
	const name = joinText(children.slice(linkOpenIndex + 1, linkCloseIndex));
	const description = renderDescription(children.slice(linkCloseIndex + 1))
		.trim()
		.replace(/ {2,}/g, " ");
	const capped = description
		? description.charAt(0).toUpperCase() + description.slice(1)
		: "";

	return { name, url, description: capped };
}

function parseEntries(inlineTokens) {
	return inlineTokens.map(parseEntry);
}

function withOfficialFlag(entries) {
	return entries.map((entry) => ({ ...entry, official: true }));
}

export async function buildPluginList() {
	if (await skipIfGenerated()) {
		log.info(
			`Source missing and ${path.relative(ROOT, OUTPUT)} already exists — skipping.`,
		);
		return;
	}
	if (!existsSync(SOURCE)) {
		throw new Error(
			`Source file not found: ${path.relative(ROOT, SOURCE)}. Run \`pnpm run fetch:docs\` first.`,
		);
	}

	const content = await readFile(SOURCE, "utf8");
	const tokens = md.parse(content, {});
	const sections = collectSections(tokens);
	if (!sections.core) {
		throw new Error("Could not locate `#### [Core](#core)` heading");
	}
	if (!sections.community) {
		throw new Error("Could not locate `#### [Community](#community)` heading");
	}

	// Core plugins come first so the "official" entries surface at the top of the rendered list.
	// Everything below the Community heading (e.g. Community Tools) is included too so the
	// ecosystem page count matches the upstream script's behaviour.
	const communityPlugins = Object.entries(sections)
		.filter(([anchor]) => anchor !== "core")
		.flatMap(([, entries]) => parseEntries(entries));

	const plugins = [
		...withOfficialFlag(parseEntries(sections.core)),
		...communityPlugins,
	];

	await writeFile(OUTPUT, `${JSON.stringify({ plugins }, null, 2)}\n`);
	log.info(`Wrote ${plugins.length} plugins to ${path.relative(ROOT, OUTPUT)}`);
}
