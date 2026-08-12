export async function getRepoStars(
	owner: string,
	repo: string,
): Promise<number> {
	const cacheKey = `github-stars:${owner}/${repo}`;
	const raw = sessionStorage.getItem(cacheKey);
	if (raw !== null && !Number.isNaN(Number(raw))) return Number(raw);

	const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
	if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
	const data = await res.json();
	if (typeof data?.stargazers_count !== "number") {
		throw new Error("GitHub API response missing stargazers_count");
	}
	try {
		sessionStorage.setItem(cacheKey, String(data.stargazers_count));
	} catch {}
	return data.stargazers_count;
}
