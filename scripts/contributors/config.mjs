// @ts-check
/**
 * Shared configuration for the contributor activity leaderboard.
 */
import path from "node:path";
import pino from "pino";

export const ORGANIZATION = "fastify";
export const WINDOW_DAYS = 30;
export const WEIGHTS = Object.freeze({
	commits: 1,
	pullRequestsOpened: 3,
	pullRequestsMerged: 2,
	reviews: 2,
	issuesOpened: 1,
});

export const ROOT = path.resolve(import.meta.dirname, "../..");
export const OUTPUT = path.join(ROOT, "src/data/contributors.json");

export const SEARCH_PAGE_SIZE = 100;
export const SEARCH_RESULT_CAP = 1_000;
export const REQUEST_TIMEOUT_MS = 15_000;
export const MAX_RETRIES = 4;
export const MAX_RETRY_WAIT_MS = 60_000;
export const REVIEW_CONCURRENCY = 5;
export const API_VERSION = "2026-03-10";
export const USER_AGENT = "fastify-website-contributors";

export const log = pino({
	level: process.env.LOG_LEVEL || "info",
	msgPrefix: "[fetch-contributors] ",
	transport: {
		target: "pino-pretty",
		options: { colorize: true },
	},
});
