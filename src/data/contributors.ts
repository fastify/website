import contributorsData from "~/data/contributors.json" with { type: "json" };
import { COLLABORATORS, LEADS } from "~/data/site";

const CONTRIBUTOR_LIMIT = 10;

export type ContributorActivity = {
	commits: number;
	pullRequestsOpened: number;
	pullRequestsMerged: number;
	reviews: number;
	issuesOpened: number;
};

export type Contributor = {
	rank: number;
	login: string;
	avatarUrl: string;
	profileUrl: string;
};

export type ContributorsData = {
	organization: "fastify";
	generatedAt: string;
	period: {
		from: string;
		to: string;
		days: 30;
	};
	methodology: {
		weights: ContributorActivity;
	};
	contributors: Contributor[];
};

export const CONTRIBUTORS_DATA = contributorsData as ContributorsData;

const maintainerLogins = new Set(
	[...LEADS, ...COLLABORATORS].map(({ login }) => login.toLowerCase()),
);

function rankContributors(contributors: Contributor[]): Contributor[] {
	return contributors.slice(0, CONTRIBUTOR_LIMIT).map((contributor, index) => ({
		...contributor,
		rank: index + 1,
	}));
}

export const ACTIVE_MAINTAINERS = rankContributors(
	CONTRIBUTORS_DATA.contributors.filter((contributor) =>
		maintainerLogins.has(contributor.login.toLowerCase()),
	),
);

export const COMMUNITY_CONTRIBUTORS = rankContributors(
	CONTRIBUTORS_DATA.contributors.filter(
		(contributor) => !maintainerLogins.has(contributor.login.toLowerCase()),
	),
);
