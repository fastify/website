// @ts-check
/**
 * Orchestrates the contributor snapshot refresh.
 *
 * Authenticated installs regenerate `src/data/contributors.json`. Installs
 * without a GitHub token keep a previously generated snapshot so local builds
 * stay frictionless.
 */
import path from "node:path";
import { buildContributorsData } from "./aggregate.mjs";
import { collectGitHubActivity } from "./collect.mjs";
import { log, ORGANIZATION, OUTPUT, ROOT } from "./config.mjs";
import { createPeriod } from "./dates.mjs";
import { createGitHubClient } from "./github.mjs";
import { readSnapshot, writeSnapshot } from "./snapshot.mjs";

/**
 * @param {{
 *   token?: string;
 *   now?: Date;
 *   output?: string;
 * }} [options]
 */
export async function runGenerator(options = {}) {
	const token = options.token ?? "";
	const output = options.output ?? OUTPUT;
	if (!token) {
		try {
			const snapshot = await readSnapshot(output);
			log.warn(
				"GH_TOKEN is not set; keeping the existing generated contributor snapshot",
			);
			return { refreshed: false, data: snapshot };
		} catch (error) {
			if (
				!error ||
				typeof error !== "object" ||
				!("code" in error) ||
				error.code !== "ENOENT"
			) {
				throw error;
			}
		}

		const data = buildContributorsData({}, options.now ?? new Date());
		await writeSnapshot(data, output);
		log.warn(
			"GH_TOKEN is not set; created an empty contributor snapshot for local builds",
		);
		return { refreshed: false, data };
	}

	const now = options.now ?? new Date();
	const period = createPeriod(now);
	const client = createGitHubClient({ token });
	log.info(
		`Collecting ${ORGANIZATION} activity from ${period.from} through ${period.to}`,
	);
	const activity = await collectGitHubActivity(client, period, ORGANIZATION);
	const data = buildContributorsData(activity, now);
	await writeSnapshot(data, output);
	log.info(
		`Wrote ${data.contributors.length} contributors to ${path.relative(ROOT, output)}`,
	);
	return { refreshed: true, data };
}
