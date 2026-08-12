// @ts-check
/**
 * GitHub client for the contributor leaderboard.
 *
 * The `octokit` meta-package already bundles the plugins this script needs:
 * `retry` for transient failures, `throttling` for primary and secondary rate
 * limits (including GraphQL `RATE_LIMITED` errors) plus request pacing for the
 * heavily-limited search endpoints, and the REST/GraphQL pagination helpers.
 */
import { Octokit } from "octokit";
import {
	API_VERSION,
	log,
	MAX_RETRIES,
	MAX_RETRY_WAIT_MS,
	REQUEST_TIMEOUT_MS,
	USER_AGENT,
} from "./config.mjs";

/**
 * @param {{
 *   token: string;
 *   fetchImpl?: typeof fetch;
 *   timeoutMs?: number;
 *   maxRetries?: number;
 *   logger?: Pick<typeof log, "warn">;
 * }} options
 */
export function createGitHubClient({
	token,
	fetchImpl = fetch,
	timeoutMs = REQUEST_TIMEOUT_MS,
	maxRetries = MAX_RETRIES,
	logger = log,
}) {
	/**
	 * `@octokit/request` is fetch-based and has no `timeout` option, so the
	 * deadline is applied here. Building the signal per call means a retry gets a
	 * fresh timeout instead of inheriting an already-aborted one.
	 * @param {Parameters<typeof fetch>[0]} url
	 * @param {RequestInit} [init]
	 */
	const fetchWithTimeout = (url, init = {}) => {
		const timeout = AbortSignal.timeout(timeoutMs);
		return fetchImpl(url, {
			...init,
			// Octokit does not send the REST API version header; pin it so a future
			// default change on GitHub's side cannot silently alter the responses.
			headers: { ...init.headers, "x-github-api-version": API_VERSION },
			signal: init.signal ? AbortSignal.any([init.signal, timeout]) : timeout,
		});
	};

	/**
	 * Waiting out a rate limit is fine; waiting longer than `MAX_RETRY_WAIT_MS`
	 * would stall a `pnpm install`, so give up instead of hanging the build.
	 * @param {"primary" | "secondary"} kind
	 */
	const onLimit =
		(kind) =>
		/**
		 * @param {number} retryAfter seconds
		 * @param {{ method?: string; url?: string }} options
		 * @param {unknown} _octokit
		 * @param {number} retryCount
		 */
		(retryAfter, options, _octokit, retryCount) => {
			const target = `${options.method} ${options.url}`;
			if (retryAfter * 1_000 > MAX_RETRY_WAIT_MS) {
				logger.warn(
					`GitHub ${kind} rate limit will not reset for ${retryAfter} seconds; abandoning ${target}`,
				);
				return false;
			}
			if (retryCount >= maxRetries) {
				logger.warn(`Exhausted rate limit retries for ${target}`);
				return false;
			}
			logger.warn(
				`GitHub ${kind} rate limit hit; retrying ${target} in ${retryAfter} seconds`,
			);
			return true;
		};

	return new Octokit({
		auth: token,
		userAgent: USER_AGENT,
		request: { fetch: fetchWithTimeout },
		retry: { retries: maxRetries },
		throttle: {
			onRateLimit: onLimit("primary"),
			onSecondaryRateLimit: onLimit("secondary"),
		},
	});
}
