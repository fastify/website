export type GoodFirstIssue = {
	url: string;
	title: string;
	comments: number;
	state: string;
	project: { name: string; url: string };
	labels: string[];
};

export async function getGoodFirstIssues(
	org: string,
): Promise<GoodFirstIssue[]> {
	const cacheKey = `fastify-good-first-issues:${org}`;
	const cached = sessionStorage.getItem(cacheKey);
	if (cached) {
		try {
			const parsed = JSON.parse(cached);
			if (Array.isArray(parsed)) return parsed;
		} catch {
			sessionStorage.removeItem(cacheKey);
		}
	}

	const res = await fetch(
		`https://goodfirstissue.fastify.io/api/find-issues?org=${org}`,
	);
	if (!res.ok) throw new Error(`GFI API returned ${res.status}`);
	const data = await res.json();
	const results = Array.isArray(data?.results) ? data.results : [];
	try {
		sessionStorage.setItem(cacheKey, JSON.stringify(results));
	} catch {}
	return results;
}
