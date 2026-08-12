// @ts-check
/**
 * Collect raw activity for the Fastify organization.
 *
 * Pagination is driven by hand rather than by Octokit's `paginate` helpers for
 * three reasons: the pull request document carries two `pageInfo` blocks (the
 * search and the nested reviews) which a single-cursor paginator cannot drive;
 * the per-page `incomplete_results` / `issueCount` assertions below need the
 * response envelopes that the paginators flatten away; and the 1,000-result cap
 * check needs the first page's total before deciding whether to split the range.
 */
import {
	ORGANIZATION,
	REVIEW_CONCURRENCY,
	SEARCH_PAGE_SIZE,
	SEARCH_RESULT_CAP,
} from "./config.mjs";
import { splitDateRange, toDateKey } from "./dates.mjs";
import { ISSUE_SEARCH, MORE_REVIEWS, PULL_REQUEST_SEARCH } from "./queries.mjs";

/** @typedef {{ request: (route: string, params?: Record<string, unknown>) => Promise<any> }} RestClient */
/** @typedef {{ graphql: (query: string, variables: Record<string, unknown>) => Promise<any> }} GraphqlClient */

/**
 * @param {RestClient} client
 * @param {string} organization
 * @param {string} fromDate
 * @param {string} toDate
 * @returns {Promise<any[]>}
 */
export async function fetchCommitRange(client, organization, fromDate, toDate) {
	const getPage = (/** @type {number} */ page) =>
		client.request("GET /search/commits", {
			q: `org:${organization} author-date:${fromDate}..${toDate}`,
			sort: "author-date",
			order: "asc",
			per_page: SEARCH_PAGE_SIZE,
			page,
		});
	const { data: first } = await getPage(1);
	if (
		!Number.isInteger(first.total_count) ||
		first.total_count < 0 ||
		typeof first.incomplete_results !== "boolean" ||
		!Array.isArray(first.items)
	) {
		throw new Error("GitHub commit search response is invalid");
	}
	if (first.incomplete_results) {
		throw new Error(
			`GitHub returned incomplete commit results for ${fromDate}..${toDate}`,
		);
	}
	if (first.total_count > SEARCH_RESULT_CAP) {
		const split = splitDateRange(fromDate, toDate);
		if (!split) {
			throw new Error(`Commit search exceeds 1,000 results on ${fromDate}`);
		}
		const [left, right] = await Promise.all(
			split.map(([from, to]) =>
				fetchCommitRange(client, organization, from, to),
			),
		);
		return [...left, ...right];
	}

	const items = [...(first.items ?? [])];
	const pages = Math.ceil(first.total_count / SEARCH_PAGE_SIZE);
	for (let page = 2; page <= pages; page++) {
		const { data: result } = await getPage(page);
		if (
			typeof result.incomplete_results !== "boolean" ||
			!Array.isArray(result.items)
		) {
			throw new Error(`GitHub commit search page ${page} is invalid`);
		}
		if (result.incomplete_results) {
			throw new Error(
				`GitHub returned incomplete commit results on page ${page}`,
			);
		}
		items.push(...(result.items ?? []));
	}
	if (items.length !== first.total_count) {
		throw new Error(
			`GitHub commit search returned ${items.length} of ${first.total_count} results`,
		);
	}
	return items;
}

/**
 * @param {GraphqlClient} client
 * @param {{ organization: string; kind: "pr" | "issue"; qualifier: "updated" | "created"; fromDate: string; toDate: string; document: string }} options
 * @returns {Promise<any[]>}
 */
export async function fetchGraphqlSearchRange(client, options) {
	const { organization, kind, qualifier, fromDate, toDate, document } = options;
	const searchQuery = `org:${organization} is:${kind} ${qualifier}:${fromDate}..${toDate}`;
	const firstData = await client.graphql(document, {
		searchQuery,
		cursor: null,
	});
	const first = firstData?.search;
	if (
		!first ||
		!Number.isInteger(first.issueCount) ||
		first.issueCount < 0 ||
		!Array.isArray(first.nodes) ||
		!first.pageInfo ||
		typeof first.pageInfo.hasNextPage !== "boolean"
	) {
		throw new Error("GitHub GraphQL search response is invalid");
	}
	if (first.issueCount > SEARCH_RESULT_CAP) {
		const split = splitDateRange(fromDate, toDate);
		if (!split) {
			throw new Error(`${kind} search exceeds 1,000 results on ${fromDate}`);
		}
		const [left, right] = await Promise.all(
			split.map(([from, to]) =>
				fetchGraphqlSearchRange(client, {
					...options,
					fromDate: from,
					toDate: to,
				}),
			),
		);
		return [...left, ...right];
	}

	const nodes = [...(first.nodes ?? [])].filter(Boolean);
	let pageInfo = first.pageInfo;
	while (pageInfo?.hasNextPage) {
		const data = await client.graphql(document, {
			searchQuery,
			cursor: pageInfo.endCursor,
		});
		if (
			!data?.search?.pageInfo ||
			typeof data.search.pageInfo.hasNextPage !== "boolean" ||
			!Array.isArray(data.search.nodes)
		) {
			throw new Error("GitHub GraphQL search page is invalid");
		}
		nodes.push(...(data.search.nodes ?? []).filter(Boolean));
		pageInfo = data.search.pageInfo;
	}
	if (nodes.some((node) => typeof node.id !== "string" || !node.id)) {
		throw new Error("GitHub GraphQL search returned a result without an ID");
	}
	const uniqueNodes = [
		...new Map(nodes.map((node) => [node.id, node])).values(),
	];
	if (uniqueNodes.length < first.issueCount) {
		throw new Error(
			`GitHub GraphQL search returned ${uniqueNodes.length} of ${first.issueCount} results`,
		);
	}
	return uniqueNodes;
}

/**
 * @param {GraphqlClient} client
 * @param {any} pullRequest
 */
export async function fetchAdditionalReviews(client, pullRequest) {
	if (
		!pullRequest.reviews ||
		!Number.isInteger(pullRequest.reviews.totalCount) ||
		!Array.isArray(pullRequest.reviews.nodes) ||
		!pullRequest.reviews.pageInfo
	) {
		throw new Error(`Reviews are invalid for pull request ${pullRequest.id}`);
	}
	const reviews = [...(pullRequest.reviews?.nodes ?? [])].filter(Boolean);
	let pageInfo = pullRequest.reviews?.pageInfo;
	while (pageInfo?.hasNextPage) {
		const data = await client.graphql(MORE_REVIEWS, {
			id: pullRequest.id,
			cursor: pageInfo.endCursor,
		});
		const page = data?.node?.reviews;
		if (
			!page?.pageInfo ||
			typeof page.pageInfo.hasNextPage !== "boolean" ||
			!Array.isArray(page.nodes) ||
			page.totalCount !== pullRequest.reviews.totalCount
		) {
			throw new Error(
				`Review page is missing for pull request ${pullRequest.id}`,
			);
		}
		reviews.push(...(page.nodes ?? []).filter(Boolean));
		pageInfo = page.pageInfo;
	}
	if (reviews.length !== pullRequest.reviews.totalCount) {
		throw new Error(
			`GitHub returned ${reviews.length} of ${pullRequest.reviews.totalCount} reviews for pull request ${pullRequest.id}`,
		);
	}
	return { ...pullRequest, reviews: { nodes: reviews } };
}

/** @param {any[]} items @param {number} concurrency @param {(item: any) => Promise<any>} mapper */
async function mapWithConcurrency(items, concurrency, mapper) {
	const output = new Array(items.length);
	let nextIndex = 0;
	async function worker() {
		while (nextIndex < items.length) {
			const index = nextIndex++;
			output[index] = await mapper(items[index]);
		}
	}
	await Promise.all(
		Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
	);
	return output;
}

/**
 * @param {RestClient & GraphqlClient} client
 * @param {{ from: string; to: string }} period
 * @param {string} [organization]
 */
export async function collectGitHubActivity(
	client,
	period,
	organization = ORGANIZATION,
) {
	const fromDate = toDateKey(period.from);
	const toDate = toDateKey(period.to);
	const [commits, pullRequests, issues] = await Promise.all([
		fetchCommitRange(client, organization, fromDate, toDate),
		fetchGraphqlSearchRange(client, {
			organization,
			kind: "pr",
			qualifier: "updated",
			fromDate,
			toDate,
			document: PULL_REQUEST_SEARCH,
		}),
		fetchGraphqlSearchRange(client, {
			organization,
			kind: "issue",
			qualifier: "created",
			fromDate,
			toDate,
			document: ISSUE_SEARCH,
		}),
	]);

	const pullRequestsWithReviews = await mapWithConcurrency(
		pullRequests,
		REVIEW_CONCURRENCY,
		(pullRequest) => fetchAdditionalReviews(client, pullRequest),
	);
	return { commits, pullRequests: pullRequestsWithReviews, issues };
}
