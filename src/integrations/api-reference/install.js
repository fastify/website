// Install the packages the API reference documents: `fastify` plus the official
// `@fastify/*` plugins. They go into their own folder (default `.cache/api`)
// with a package.json listing them; the integration reads that list back.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { resolveSources } from "./sources.js";

export const DEFAULT_DIR = ".cache/api";

/**
 * Where install messages go: anything with info / warn / error, such as a pino
 * logger (fastify.dev's scripts pass theirs). The default prints to the console.
 */
export const defaultLogger = {
	info: (m) => console.log(`[fastify-api-reference] ${m}`),
	warn: (m) => console.warn(`[fastify-api-reference] ${m}`),
	error: (m) => console.error(`[fastify-api-reference] ${m}`),
};

/**
 * Libraries maintained by the Fastify team that are not plugins: the building
 * blocks of core (router, serializer, injection, boot) and standalone utilities.
 * find-my-way lives in delvedor/find-my-way but is Fastify's router.
 */
export const LIBRARIES = [
	"avvio",
	"env-schema",
	"fast-content-type-parse",
	"fast-json-stringify",
	"fast-uri",
	"fastify-plugin",
	"find-my-way",
	"fluent-json-schema",
	"json-schema-ref-resolver",
	"light-my-request",
	"process-warning",
	"safe-regex2",
	"secure-json-parse",
	"@fastify/accept-negotiator",
	"@fastify/ajv-compiler",
	"@fastify/busboy",
	"@fastify/csrf",
	"@fastify/deepmerge",
	"@fastify/error",
	"@fastify/fast-json-stringify-compiler",
	"@fastify/forwarded",
	"@fastify/merge-json-schemas",
	"@fastify/proxy-addr",
	"@fastify/send",
];

/** Official plugins published under @fastify/ that the Ecosystem guide does not list yet. */
export const EXTRA_PLUGINS = [
	"@fastify/htmx",
	"@fastify/opensearch",
	"@fastify/react",
	"@fastify/restartable",
	"@fastify/type-provider-zod",
	"@fastify/valkey-glide",
	"@fastify/vue",
];

/** Tooling without an API to document. */
export const EXCLUDED = ["@fastify/pre-commit"];

/**
 * Everything the reference documents, with its category:
 * core (`fastify`), plugin (Ecosystem "Core" list + EXTRA_PLUGINS) and library.
 * @returns {Promise<{ name: string, category: 'core' | 'plugin' | 'library' }[]>}
 */
export async function defaultPackages({ ref, ecosystem } = {}) {
	const libraries = new Set(LIBRARIES);
	const plugins = [
		...new Set([
			...(await officialPlugins({ ref, ecosystem })),
			...EXTRA_PLUGINS,
		]),
	]
		.filter((n) => !EXCLUDED.includes(n) && !libraries.has(n))
		.sort();
	return [
		{ name: "fastify", category: "core" },
		...plugins.map((name) => ({ name, category: "plugin" })),
		...LIBRARIES.map((name) => ({ name, category: "library" })),
	];
}

/**
 * Names of the official plugins, from the "Core" section of
 * docs/Guides/Ecosystem.md in fastify/fastify (the list fastify.dev shows).
 * Pass `ecosystem` (the file content) to skip the download.
 */
export async function officialPlugins({ ref = "main", ecosystem } = {}) {
	const text = ecosystem ?? (await downloadEcosystem(ref));
	const start = text.search(/^####\s+\[Core\]/m);
	const end = text.search(/^####\s+\[Community\]/m);
	if (start < 0)
		throw new Error(
			'fastify-api-reference: "Core" section not found in Ecosystem.md',
		);
	const core = text.slice(start, end > start ? end : undefined);
	const names = [...core.matchAll(/^- \[`(@fastify\/[\w.-]+)`\]/gm)].map(
		(m) => m[1],
	);
	return [...new Set(names)].sort();
}

async function downloadEcosystem(ref) {
	const kind = /^v\d/.test(ref) ? "tags" : "heads";
	const res = await fetch(
		`https://codeload.github.com/fastify/fastify/tar.gz/refs/${kind}/${ref}`,
	);
	if (!res.ok)
		throw new Error(
			`fastify-api-reference: cannot download fastify@${ref} (${res.status})`,
		);
	const tmp = await mkdtemp(path.join(os.tmpdir(), "fastify-api-"));
	try {
		const tarPath = path.join(tmp, "fastify.tar.gz");
		await writeFile(tarPath, Buffer.from(await res.arrayBuffer()));
		const top = execFileSync("tar", ["-tzf", tarPath], {
			encoding: "utf8",
			maxBuffer: 64 * 1024 * 1024,
		})
			.split("\n")[0]
			.split("/")[0];
		return execFileSync(
			"tar",
			["-xzOf", tarPath, `${top}/docs/Guides/Ecosystem.md`],
			{ encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
		);
	} finally {
		await rm(tmp, { recursive: true, force: true });
	}
}

/**
 * Installs the packages from npm into `dir`. Skips the install when every package
 * is already there, unless `force` is set.
 * @param {object} options
 * @param {{ name: string, category?: string }[]} [options.packages]  from defaultPackages()
 * @param {string[]} [options.names]  plain names; `fastify` is core, the rest plugins
 * @returns {Promise<string[]>} the installed package names
 */
export async function installPackages({
	dir = DEFAULT_DIR,
	packages,
	names,
	version = "latest",
	versions = {},
	force = false,
	logger = defaultLogger,
} = {}) {
	const entries =
		packages ??
		(names ?? []).map((name) => ({
			name,
			category: name === "fastify" ? "core" : "plugin",
		}));
	const unique = [...new Map(entries.map((e) => [e.name, e])).values()];
	const list = unique.map((e) => e.name);
	const categories = Object.fromEntries(
		unique.map((e) => [e.name, e.category ?? "plugin"]),
	);
	// exact versions from a frozen release (`versions`), `version` (latest) for the rest
	const specs = Object.fromEntries(
		list.map((n) => [n, versions[n] ?? version]),
	);
	const manifest = path.join(dir, "package.json");

	if (
		!force &&
		existsSync(manifest) &&
		existsSync(path.join(dir, "node_modules"))
	) {
		const current = JSON.parse(await readFile(manifest, "utf8"));
		const same =
			list.length === Object.keys(current.dependencies ?? {}).length &&
			list.every(
				(n) =>
					current.dependencies?.[n] === specs[n] &&
					existsSync(path.join(dir, "node_modules", n)),
			);
		if (same) {
			logger.info(`${list.length} packages already installed in ${dir}`);
			if (!existsSync(path.join(dir, "sources.json")))
				await resolveSources({ dir, names: list, logger });
			return list;
		}
	}
	await mkdir(dir, { recursive: true });
	await writeManifest(manifest, specs, categories);
	logger.info(`installing ${list.length} packages into ${dir}…`);
	const started = Date.now();
	try {
		// npm's own output only matters when it fails
		execFileSync(
			"npm",
			[
				"install",
				"--ignore-scripts",
				"--legacy-peer-deps",
				"--no-audit",
				"--no-fund",
				"--omit=dev",
				"--no-package-lock",
			],
			{
				cwd: dir,
				stdio: ["ignore", "pipe", "pipe"],
				maxBuffer: 64 * 1024 * 1024,
			},
		);
	} catch (err) {
		logger.error(
			`npm install failed in ${dir}\n${err.stderr?.toString() ?? err.message}`,
		);
		throw err;
	}
	logger.info(
		`installed ${list.length} packages in ${Math.round((Date.now() - started) / 1000)}s`,
	);
	await resolveSources({ dir, names: list, logger });
	return list;
}

async function writeManifest(file, dependencies, categories) {
	const body = {
		name: "fastify-api-sources",
		private: true,
		dependencies,
		fastifyApiReference: { categories },
	};
	await writeFile(file, `${JSON.stringify(body, null, 2)}\n`);
}

/** Packages listed in `dir/package.json`, with their category. */
export async function installedPackages(dir = DEFAULT_DIR) {
	const manifest = path.join(dir, "package.json");
	if (!existsSync(manifest)) return [];
	const json = JSON.parse(await readFile(manifest, "utf8"));
	const categories = json.fastifyApiReference?.categories ?? {};
	return Object.keys(json.dependencies ?? {}).map((name) => ({
		name,
		category: categories[name] ?? (name === "fastify" ? "core" : "plugin"),
	}));
}

/** File that freezes a release of the reference: every package at an exact version. */
export const PIN_FILE = "api-versions.json";

/**
 * Writes the exact versions installed in `dir` to `file`, so a later install
 * (for example from a git tag, months later) gets the same packages.
 */
export async function freezeVersions({
	dir = DEFAULT_DIR,
	file = PIN_FILE,
} = {}) {
	const installed = await installedPackages(dir);
	if (!installed.length)
		throw new Error(
			`fastify-api-reference: nothing installed in ${dir}, run fastify-api-install first`,
		);
	const packages = [];
	for (const { name, category } of installed) {
		const manifest = path.join(dir, "node_modules", name, "package.json");
		if (!existsSync(manifest)) continue;
		const { version } = JSON.parse(await readFile(manifest, "utf8"));
		packages.push({ name, category, version });
	}
	const fastify = packages.find((p) => p.name === "fastify")?.version ?? null;
	await writeFile(
		file,
		`${JSON.stringify({ fastify, frozenAt: new Date().toISOString().slice(0, 10), packages }, null, 2)}\n`,
	);
	return { file, fastify, count: packages.length };
}

/** The frozen release in `file`, or null when the reference follows the latest versions. */
export async function readPinned(file = PIN_FILE) {
	if (!existsSync(file)) return null;
	const json = JSON.parse(await readFile(file, "utf8"));
	return {
		fastify: json.fastify ?? null,
		packages: json.packages.map(({ name, category }) => ({ name, category })),
		versions: Object.fromEntries(json.packages.map((p) => [p.name, p.version])),
	};
}
