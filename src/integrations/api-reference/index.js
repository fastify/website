// API reference for the Fastify ecosystem: adds `/api/` (the package index),
// `/api/decorations/` and `/api/<package>/<export>/`, rendered with the site's
// own layout and CSS variables.
//
// The documented packages come from `dir` (default .cache/api), installed by
// scripts/postinstall.mjs through ./install.js. See ./README.md.
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_DIR, PIN_FILE } from "./install.js";

const CONFIG_ID = "virtual:fastify-api-reference/config";
const AUTO = { tag: "publicAPI", mode: "auto", fallbackTag: "internal" };
const LAYOUT_ID = "virtual:fastify-api-reference/layout";

/**
 * @param {object} [options]
 * @param {string} [options.base='/api']        where the reference lives
 * @param {string} [options.dir='.cache/api']   folder with the installed packages
 * @param {string} [options.fastifySource]      document core from a local fastify checkout (also FASTIFY_SOURCE)
 * @param {{tag?: string, mode?: 'auto'|'include'|'exclude'|'all', fallbackTag?: string}} [options.core]  filter for fastify
 * @param {object} [options.plugins]    same, for the official plugins
 * @param {object} [options.libraries]  same, for the libraries (fast-json-stringify, avvio…)
 * @param {string} options.layout  page layout (props: title, description; default slot)
 * @param {string} [options.title='API Reference']
 * @param {boolean} [options.failOnMissing=false]  fail the build when the public API uses undocumented types
 * @param {object} [options.versions]  one reference per Fastify major, each in its own folder
 * @param {string} [options.versions.root]     public root of the whole site, where versions.json lives
 *   (default: Astro's `base` without the archive folder)
 * @param {string} [options.versions.archive]  label of the frozen major this build is (`v5`); also API_VERSION
 */
export default function fastifyApiReference(options = {}) {
	return {
		name: "fastify-api-reference",
		hooks: {
			"astro:config:setup"({ config, injectRoute, updateConfig, logger }) {
				const root = fileURLToPath(config.root);
				const base =
					`/${(options.base ?? "/api").replace(/^\/+|\/+$/g, "")}`.replace(
						/^\/$/,
						"",
					);
				const fastifySource =
					options.fastifySource ?? process.env.FASTIFY_SOURCE;
				const settings = {
					base,
					dir: path.resolve(root, options.dir ?? DEFAULT_DIR),
					fastifySource: fastifySource
						? path.resolve(root, fastifySource)
						: null,
					// `auto`: only @publicAPI declarations once a package uses the tag,
					// until then every export except @internal ones
					core: { ...AUTO, ...options.core },
					plugins: {
						...AUTO,
						...(process.env.API_PLUGIN_TAG && {
							tag: process.env.API_PLUGIN_TAG,
						}),
						...(process.env.API_PLUGIN_TAG_MODE && {
							mode: process.env.API_PLUGIN_TAG_MODE,
						}),
						...options.plugins,
					},
					libraries: { ...AUTO, ...options.libraries },
					title: options.title ?? "API Reference",
					failOnMissing: options.failOnMissing ?? false,
					versions: versionSettings(options.versions, config, root),
				};
				if (!options.layout)
					throw new Error("api-reference: the `layout` option is required");
				const layout = path.resolve(root, options.layout);

				injectRoute({
					pattern: base || "/",
					entrypoint: new URL("./pages/index.astro", import.meta.url),
				});
				injectRoute({
					pattern: `${base}/decorations`,
					entrypoint: new URL("./pages/decorations.astro", import.meta.url),
				});
				injectRoute({
					pattern: `${base}/[pkg]/[name]`,
					entrypoint: new URL("./pages/entry.astro", import.meta.url),
				});

				updateConfig({
					vite: {
						plugins: [
							{
								name: "fastify-api-reference:virtual",
								resolveId(id) {
									if (id === CONFIG_ID || id === LAYOUT_ID) return `\0${id}`;
								},
								load(id) {
									if (id === `\0${CONFIG_ID}`)
										return `export default ${JSON.stringify(settings)}`;
									if (id === `\0${LAYOUT_ID}`)
										return `export { default } from ${JSON.stringify(layout)}`;
								},
							},
						],
					},
				});
				logger.info(
					`API reference at ${base || "/"} from ${path.relative(root, settings.dir) || "."}`,
				);
			},
		},
	};
}

/**
 * Versions: the latest major lives at the site root, frozen majors in folders
 * (`/v5/`). A frozen build is the one with an api-versions.json next to it.
 */
function versionSettings(options = {}, config, root) {
	const archive = options.archive ?? process.env.API_VERSION ?? null;
	const astroBase = (config.base ?? "/").replace(/\/?$/, "/");
	const siteRoot = (
		options.root ??
		(archive ? astroBase.replace(new RegExp(`${archive}/$`), "") : astroBase)
	).replace(/\/?$/, "/");
	let pinned = null;
	const pinFile = path.join(root, PIN_FILE);
	if (existsSync(pinFile)) {
		try {
			pinned = JSON.parse(readFileSync(pinFile, "utf8")).fastify ?? null;
		} catch {}
	}
	// fastify.dev keeps the docs of every minor: v5.12.x for a frozen 5.12.5
	const docs = pinned
		? `v${pinned.split(".").slice(0, 2).join(".")}.x`
		: "latest";
	return { archive, root: siteRoot, docs };
}
