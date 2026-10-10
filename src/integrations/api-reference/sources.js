// Source links. A declaration lives in a file of the npm package, but the link
// has to point to the file in the GitHub repository, at the released tag:
//
// - hand-written types (`types/index.d.ts`, `index.d.ts`) are in the repo as is;
// - types generated into a build folder (`dist/`, `build/`, `out/`) are not:
//   the link goes to the TypeScript source they were compiled from, found
//   through the declaration map (`.d.ts.map`) when the package ships one, or
//   through a copy of the source downloaded at install time.
//
// `resolveSources()` runs at install time (it needs the network) and writes
// `sources.json` next to the installed packages; `sourceLocation()` runs at build
// time and only reads files.
import { execFile } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const BUILD_DIR = /^(dist|build|out)\//;
const DECLARATION = /\.d\.(ts|mts|cts)$/;
const SOURCES_FILE = "sources.json";

export const isBuildOutput = (file) => BUILD_DIR.test(file);

/** Escapes a string for use inside a regular expression. */
export const escapeRegExp = (text) =>
	text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** True for a GitHub URL, checking the host rather than a substring. */
export function isGitHubUrl(url) {
	try {
		const { protocol, hostname } = new URL(url);
		return (
			(protocol === "https:" || protocol === "http:") &&
			(hostname === "github.com" || hostname === "www.github.com")
		);
	} catch {
		return false;
	}
}

const REPO_SEGMENT = /^[\w.-]+$/;

/** `https://github.com/fastify/fastify-cors` -> `fastify/fastify-cors`, or null */
export function githubRepo(url) {
	if (!isGitHubUrl(url)) return null;
	const [owner, repo] = new URL(url).pathname.split("/").filter(Boolean);
	return owner && repo && REPO_SEGMENT.test(owner) && REPO_SEGMENT.test(repo)
		? `${owner}/${repo}`
		: null;
}

/** `git+https://github.com/fastify/fastify-cors.git` -> `https://github.com/fastify/fastify-cors` */
export function repoUrl(manifest) {
	const raw =
		typeof manifest.repository === "string"
			? manifest.repository
			: manifest.repository?.url;
	if (!raw) return manifest.homepage ?? null;
	const url = raw
		.replace(/^git\+/, "")
		.replace(/\.git$/, "")
		.replace(/^git:\/\//, "https://")
		.replace(/^github:/, "https://github.com/");
	return /^https?:/.test(url) ? url : `https://github.com/${url}`;
}

// ---------------------------------------------------------------------------
// install time

/**
 * For every installed package: the git tag of the installed version, the
 * package's folder inside its repository (monorepos) and, for types generated
 * into a build folder without a declaration map, a copy of the matching source.
 * Failures only cost links, never the install.
 */
export async function resolveSources({ dir, names, logger = console }) {
	const result = {};
	const cacheDir = path.join(dir, "sources");
	await pool(names, 8, async (name) => {
		try {
			const root = path.join(dir, "node_modules", name);
			const manifest = JSON.parse(
				readFileSync(path.join(root, "package.json"), "utf8"),
			);
			const repo = repoUrl(manifest);
			const gh = githubRepo(repo);
			if (!gh) return;
			const ref = await findTag(gh, name, manifest.version);
			const repoDir = await findPackageDir(gh, ref, name, manifest);
			const entry = { ref, dir: repoDir, files: {} };
			for (const file of generatedDeclarations(root)) {
				if (existsSync(path.join(root, `${file}.map`))) continue;
				const shipped = sourceCandidates(file).find((c) =>
					existsSync(path.join(root, c)),
				);
				if (shipped) {
					entry.files[file] = shipped;
					continue;
				}
				for (const candidate of sourceCandidates(file)) {
					const text = await raw(gh, ref, joinPath(repoDir, candidate));
					if (text == null) continue;
					const target = path.join(cacheDir, name, candidate);
					await mkdir(path.dirname(target), { recursive: true });
					await writeFile(target, text);
					entry.files[file] = candidate;
					break;
				}
			}
			result[name] = entry;
		} catch (err) {
			logger.warn(`source links for ${name}: ${err.message}`);
		}
	});
	await writeFile(
		path.join(dir, SOURCES_FILE),
		`${JSON.stringify(result, null, 2)}\n`,
	);
	const generated = Object.values(result).filter(
		(e) => Object.keys(e.files).length,
	).length;
	logger.info(
		`source links resolved for ${Object.keys(result).length} packages (${generated} with generated types)`,
	);
	return result;
}

/** `.d.ts` files in the package's build folders, relative to the package root. */
function generatedDeclarations(root) {
	const out = [];
	const walk = (rel, depth) => {
		if (depth > 4 || out.length > 200) return;
		for (const d of readdirSync(path.join(root, rel), {
			withFileTypes: true,
		})) {
			const next = `${rel}/${d.name}`;
			if (d.isDirectory() && d.name !== "node_modules") walk(next, depth + 1);
			else if (DECLARATION.test(d.name)) out.push(next);
		}
	};
	for (const top of ["dist", "build", "out"]) {
		if (existsSync(path.join(root, top))) walk(top, 0);
	}
	return out;
}

/** `dist/cjs/core.d.cts` -> `src/core.ts`, `core.ts`, `src/core.mts`, … */
export function sourceCandidates(file) {
	const base = file
		.replace(BUILD_DIR, "")
		.replace(/^(cjs|esm|mjs|commonjs|types|src)\//, "")
		.replace(DECLARATION, "");
	return ["src/", "", "lib/"].flatMap((prefix) =>
		[".ts", ".mts", ".cts", ".tsx"].map((ext) => `${prefix}${base}${ext}`),
	);
}

const run = promisify(execFile);
const tagCache = new Map();

async function findTag(gh, name, version) {
	if (!version) return "HEAD";
	if (!tagCache.has(gh)) {
		tagCache.set(
			gh,
			run("git", ["ls-remote", "--tags", `https://github.com/${gh}`], {
				timeout: 30000,
				maxBuffer: 32 << 20,
			})
				.then(
					({ stdout }) =>
						new Set(
							stdout
								.split("\n")
								.map((l) => l.split("refs/tags/")[1]?.replace(/\^\{\}$/, ""))
								.filter(Boolean),
						),
				)
				.catch(() => new Set()),
		);
	}
	const tags = await tagCache.get(gh);
	const short = name.replace(/^@[^/]+\//, "");
	const wanted = [
		`v${version}`,
		version,
		`${name}@${version}`,
		`${short}@${version}`,
		`${short}-v${version}`,
		`${short}@v${version}`,
	];
	return wanted.find((t) => tags.has(t)) ?? "HEAD";
}

/** Folder of the package inside its repository: '' unless it is a monorepo. */
async function findPackageDir(gh, ref, name, manifest) {
	if (manifest.repository?.directory) return manifest.repository.directory;
	const nameAt = async (dir) => {
		const text = await raw(gh, ref, joinPath(dir, "package.json"));
		if (text == null) return null;
		try {
			return JSON.parse(text).name ?? "";
		} catch {
			return "";
		}
	};
	// no package.json at the root (unreachable, or not a Node repo): keep the paths as they are
	const rootName = await nameAt("");
	if (rootName == null || rootName === name) return "";
	const short = name.replace(/^@[^/]+\//, "");
	for (const dir of [
		`packages/${short}`,
		`packages/fastify-${short}`,
		`packages/${name.replace(/^@/, "").replace("/", "-")}`,
	]) {
		if ((await nameAt(dir)) === name) return dir;
	}
	return "";
}

/** Each path segment URL-encoded, so a name cannot change the request target. */
const encodePath = (value) =>
	value.split("/").map(encodeURIComponent).join("/");

async function raw(gh, ref, file) {
	const tag = ref === "HEAD" ? "HEAD" : `refs/tags/${encodePath(ref)}`;
	const res = await fetch(
		`https://raw.githubusercontent.com/${gh}/${tag}/${encodePath(file)}`,
	).catch(() => null);
	return res?.ok ? res.text() : null;
}

async function pool(items, size, fn) {
	const queue = [...items];
	await Promise.all(
		Array.from({ length: size }, async () => {
			while (queue.length) await fn(queue.shift());
		}),
	);
}

const joinPath = (dir, file) => (dir ? `${dir}/${file}` : file);

// ---------------------------------------------------------------------------
// build time

const loaded = new Map();

/** sources.json written by resolveSources, or {} */
export function readSources(dir) {
	if (!loaded.has(dir)) {
		try {
			loaded.set(
				dir,
				JSON.parse(readFileSync(path.join(dir, SOURCES_FILE), "utf8")),
			);
		} catch {
			loaded.set(dir, {});
		}
	}
	return loaded.get(dir);
}

/**
 * Where a doc's declaration lives in the repository.
 * @returns {{ file: string, line: number | null, ref: string | null, dir: string } | null}
 *   null when a generated declaration cannot be traced back to its source
 */
export function sourceLocation({ dir, name, root }, doc) {
	const info = readSources(dir)[name] ?? {};
	const base = { ref: info.ref ?? null, dir: info.dir ?? "" };
	if (!isBuildOutput(doc.file))
		return { ...base, file: doc.file, line: doc.line };

	// 1. declaration map shipped with the package
	const mapped = fromDeclarationMap(root, doc.file, doc.line);
	if (mapped) return { ...base, ...mapped };

	// 2. source shipped in the package, or downloaded at install time
	const file = info.files?.[doc.file];
	if (!file) return null;
	const text =
		readText(path.join(root, file)) ??
		readText(path.join(dir, "sources", name, file));
	return { ...base, file, line: text ? declarationLine(text, doc) : null };
}

function readText(file) {
	try {
		return readFileSync(file, "utf8");
	} catch {
		return null;
	}
}

/** Line of `interface Name`, `function Name`… in a source file. */
export function declarationLine(text, doc) {
	const lines = text.split("\n");
	const name = escapeRegExp(doc.name);
	const patterns = [
		new RegExp(
			`\\b(interface|type|class|function|const|let|var|enum|namespace)\\s+${name}\\b`,
		),
		new RegExp(`\\b${name}\\s*[:=(<]`),
		new RegExp(`\\b${name}\\b`),
	];
	if (doc.augments) patterns.unshift(/declare\s+module\s+['"]fastify['"]/);
	for (const re of patterns) {
		const i = lines.findIndex(
			(l) => re.test(l) && !/^\s*(\/\/|\*|import\b)/.test(l),
		);
		if (i >= 0) return i + 1;
	}
	return null;
}

/** Maps a line of a generated `.d.ts` to its source through `file.d.ts.map`. */
function fromDeclarationMap(root, file, line) {
	const text = readText(path.join(root, `${file}.map`));
	if (!text) return null;
	let map;
	try {
		map = JSON.parse(text);
	} catch {
		return null;
	}
	const target = mapLine(map.mappings ?? "", line - 1);
	if (!target) return null;
	const source = map.sources?.[target.source];
	if (!source) return null;
	// sources are relative to the map (plus sourceRoot); make them relative to the package
	const resolved = path.posix.normalize(
		path.posix.join(path.posix.dirname(file), map.sourceRoot ?? "", source),
	);
	if (resolved.startsWith("..")) return null;
	return { file: resolved, line: target.line + 1 };
}

const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/** First mapped segment on generated line `wanted` (0-based) -> { source, line } (0-based). */
export function mapLine(mappings, wanted) {
	let source = 0;
	let srcLine = 0;
	const lines = mappings.split(";");
	for (let l = 0; l < lines.length && l <= wanted; l++) {
		for (const segment of lines[l].split(",")) {
			if (!segment) continue;
			const values = decodeVLQ(segment);
			if (values.length >= 4) {
				source += values[1];
				srcLine += values[2];
				if (l === wanted) return { source, line: srcLine };
			}
		}
	}
	return null;
}

function decodeVLQ(segment) {
	const values = [];
	let value = 0;
	let shift = 0;
	for (const char of segment) {
		const digit = B64.indexOf(char);
		value += (digit & 31) << shift;
		if (digit & 32) {
			shift += 5;
		} else {
			values.push(value & 1 ? -(value >>> 1) : value >>> 1);
			value = 0;
			shift = 0;
		}
	}
	return values;
}
