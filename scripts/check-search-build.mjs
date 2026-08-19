import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUILD_DIR = path.join(ROOT, "build");
const PAGEFIND_DIR = path.join(BUILD_DIR, "pagefind");

async function assertFile(file) {
	assert(
		(await stat(file)).isFile(),
		`${path.relative(ROOT, file)} is missing`,
	);
}

await assertFile(path.join(PAGEFIND_DIR, "pagefind.js"));

const entryFile = path.join(PAGEFIND_DIR, "pagefind-entry.json");
await assertFile(entryFile);

const entry = JSON.parse(await readFile(entryFile, "utf8"));
const pageCount = Object.values(entry.languages ?? {}).reduce(
	(total, language) => total + (language.page_count ?? 0),
	0,
);
assert(pageCount > 0, "Pagefind index contains no pages");

const assetsDir = path.join(BUILD_DIR, "_astro");
const assetFiles = await readdir(assetsDir);
const bundles = await Promise.all(
	assetFiles
		.filter((file) => file.endsWith(".js"))
		.map(async (file) => ({
			file,
			content: await readFile(path.join(assetsDir, file), "utf8"),
		})),
);
const searchBundles = bundles.filter(({ content }) =>
	content.includes("pagefind/pagefind.js"),
);

assert(searchBundles.length > 0, "Built search bundle was not found");
assert(
	searchBundles.every(
		({ content }) => !content.includes("//pagefind/pagefind.js"),
	),
	"Built search bundle contains a protocol-relative Pagefind URL",
);

console.log(`Verified documentation search index (${pageCount} pages)`);
