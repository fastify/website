// @ts-check
/**
 * Turn raw GitHub activity into a weighted contributor ranking.
 */
import { ORGANIZATION, WEIGHTS } from "./config.mjs";
import { createPeriod, isInPeriod } from "./dates.mjs";

/**
 * @param {{ login?: string; __typename?: string } | null | undefined} actor
 */
export function isHumanActor(actor) {
	if (!actor?.login) return false;
	if (actor.__typename === "Bot" || actor.__typename === "Organization") {
		return false;
	}
	return !actor.login.toLowerCase().endsWith("[bot]");
}

/**
 * @param {{ commits?: any[]; pullRequests?: any[]; issues?: any[] }} activity
 * @param {{ from: string; to: string }} period
 * @param {number} [limit]
 */
export function aggregateContributors(
	activity,
	period,
	limit = Number.POSITIVE_INFINITY,
) {
	/** @type {Map<string, any>} */
	const people = new Map();
	const seenCommits = new Set();
	const seenPullRequests = new Set();
	const seenIssues = new Set();
	const seenReviews = new Set();

	/** @param {any} actor */
	function getPerson(actor) {
		if (!isHumanActor(actor)) return null;
		const key = actor.login.toLowerCase();
		let person = people.get(key);
		if (!person) {
			person = {
				login: actor.login,
				activity: {
					commits: 0,
					pullRequestsOpened: 0,
					pullRequestsMerged: 0,
					reviews: 0,
					issuesOpened: 0,
				},
			};
			people.set(key, person);
		}
		return person;
	}

	for (const commit of activity.commits ?? []) {
		if (commit.repository?.private === true) continue;
		const repository =
			commit.repository?.full_name ?? commit.repository?.nameWithOwner;
		const key = `${repository ?? "unknown"}:${commit.sha}`;
		if (
			seenCommits.has(key) ||
			!isInPeriod(commit.commit?.author?.date, period)
		) {
			continue;
		}
		seenCommits.add(key);
		const person = getPerson(commit.author);
		if (person) person.activity.commits++;
	}

	for (const pullRequest of activity.pullRequests ?? []) {
		if (pullRequest.repository?.isPrivate === true) continue;
		if (!seenPullRequests.has(pullRequest.id)) {
			seenPullRequests.add(pullRequest.id);
			const person = getPerson(pullRequest.author);
			if (person && isInPeriod(pullRequest.createdAt, period)) {
				person.activity.pullRequestsOpened++;
			}
			if (person && isInPeriod(pullRequest.mergedAt, period)) {
				person.activity.pullRequestsMerged++;
			}
		}
		for (const review of pullRequest.reviews?.nodes ?? []) {
			if (
				seenReviews.has(review.id) ||
				!isInPeriod(review.submittedAt, period)
			) {
				continue;
			}
			seenReviews.add(review.id);
			const person = getPerson(review.author);
			if (person) person.activity.reviews++;
		}
	}

	for (const issue of activity.issues ?? []) {
		if (issue.repository?.isPrivate === true) continue;
		if (seenIssues.has(issue.id) || !isInPeriod(issue.createdAt, period)) {
			continue;
		}
		seenIssues.add(issue.id);
		const person = getPerson(issue.author);
		if (person) person.activity.issuesOpened++;
	}

	return [...people.values()]
		.map((person) => ({
			...person,
			score: Object.entries(WEIGHTS).reduce(
				(total, [key, weight]) => total + person.activity[key] * weight,
				0,
			),
		}))
		.filter((person) => person.score > 0)
		.sort(
			(a, b) =>
				b.score - a.score ||
				a.login.localeCompare(b.login, "en", { sensitivity: "base" }),
		)
		.slice(0, limit)
		.map((person, index) => ({ rank: index + 1, ...person }));
}

/**
 * @param {{ commits?: any[]; pullRequests?: any[]; issues?: any[] }} activity
 * @param {Date} [now]
 */
export function buildContributorsData(activity, now = new Date()) {
	const period = createPeriod(now);
	const contributors = aggregateContributors(
		activity,
		period,
		Number.POSITIVE_INFINITY,
	).map(({ rank, login, avatarUrl, profileUrl }) => ({
		rank,
		login,
		avatarUrl,
		profileUrl,
	}));
	return {
		organization: ORGANIZATION,
		generatedAt: now.toISOString(),
		period,
		methodology: { weights: WEIGHTS },
		// Keep the complete ranking so the page can select the top community
		// contributors without active maintainers consuming those positions.
		contributors,
	};
}
