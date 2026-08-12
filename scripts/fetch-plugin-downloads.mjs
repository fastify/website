// @ts-nocheck
/**
 * Reads `src/data/plugins.json` (kept in upstream order by
 * `scripts/build-plugin-list.mjs` for the /ecosystem/ page) and emits a
 * downloads-sorted view at `src/data/plugins-by-downloads.json`. The home
 * page reads the new file and uses `slice(0, 6)` to surface the top
 * 6 most-downloaded plugins, so the featured plugins stay fresh at
 * build time without any runtime fetch.
 *
 * Runs after `scripts/build-plugin-list.mjs` in the postinstall /
 * prebuild pipeline. Plugins the npm API cannot resolve default to 0
 * downloads so the build never aborts.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout } from "node:timers/promises";
import pino from "pino";

const ROOT = path.resolve(import.meta.dirname, "..");
const INPUT = path.join(ROOT, "src/data/plugins.json");
const OUTPUT = path.join(ROOT, "src/data/plugins-by-downloads.json");
const NPM_API = "https://api.npmjs.org/downloads/point/last-month";
const REQUEST_DELAY_MS = 350;
const MAX_RETRIES = 4;
const TIMEOUT_MS = 10_000;

const log = pino({
	level: process.env.LOG_LEVEL || "info",
	msgPrefix: "[fetch-plugin-downloads] ",
	transport: {
		target: "pino-pretty",
		options: { colorize: true },
	},
});

async function fetchDownloads(packageName) {
	const url = `${NPM_API}/${encodeURIComponent(packageName)}`;
	for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
		try {
			const res = await fetch(url, {
				headers: { "User-Agent": "fastify-website-build" },
				signal: AbortSignal.timeout(TIMEOUT_MS),
			});
			if (res.status === 429) {
				const wait = Math.max(Number(res.headers.get("retry-after") || 1), 2);
				log.warn({ package: packageName, wait }, "rate limited, backing off");
				await setTimeout(wait * 1000);
				continue;
			}
			if (res.status === 404) return 0;
			if (!res.ok) throw new Error(`npm API ${res.status}`);
			const data = await res.json();
			return typeof data.downloads === "number" ? data.downloads : 0;
		} catch (err) {
			if (attempt === MAX_RETRIES) {
				log.warn(
					{ package: packageName, err: err.message },
					"giving up, defaulting to 0",
				);
				return 0;
			}
			const backoff = attempt * 1500;
			log.warn(
				{ package: packageName, attempt, backoff },
				"retrying after error",
			);
			await setTimeout(backoff);
		}
	}
	return 0;
}

export async function fetchPluginDownloads() {
	const raw = await readFile(INPUT, "utf8");
	const { plugins } = JSON.parse(raw);
	if (!Array.isArray(plugins) || plugins.length === 0) {
		throw new Error(`No plugins found in ${path.relative(ROOT, INPUT)}`);
	}

	log.info(`Fetching npm downloads for ${plugins.length} plugins...`);
	const enriched = [];
	for (let i = 0; i < plugins.length; i++) {
		const plugin = plugins[i];
		const downloads = await fetchDownloads(plugin.name);
		enriched.push({ ...plugin, downloads });
		log.info(`${i + 1}/${plugins.length} plugins processed`);
		if (i < plugins.length - 1) {
			await setTimeout(REQUEST_DELAY_MS);
		}
	}

	enriched.sort((a, b) => b.downloads - a.downloads);

	await writeFile(
		OUTPUT,
		`${JSON.stringify({ plugins: enriched }, null, 2)}\n`,
	);
	const top = enriched.slice(0, 6).map((p) => p.name);
	log.info(
		{ output: path.relative(ROOT, OUTPUT) },
		"Wrote downloads-sorted view",
	);
	log.info({ top }, "Top 6 by downloads");
}
