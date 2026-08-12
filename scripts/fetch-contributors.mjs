// @ts-check
/**
 * Build a rolling 30-day activity leaderboard for public fastify/* repositories.
 *
 * The implementation lives in `scripts/contributors/`; this file is the CLI
 * entry point wired into the `postinstall` script.
 */
import { runGenerator } from "./contributors/run.mjs";

export function fetchContributors() {
	return runGenerator({
		token: process.env.GH_TOKEN || process.env.GITHUB_TOKEN,
	});
}
