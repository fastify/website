export async function getMonthlyDownloads(
	packageName: string,
): Promise<number> {
	const cacheKey = `npm-downloads:${packageName}`;
	const raw = sessionStorage.getItem(cacheKey);
	if (raw !== null && !Number.isNaN(Number(raw))) return Number(raw);

	const res = await fetch(
		`https://api.npmjs.org/downloads/point/last-month/${packageName}`,
	);
	if (!res.ok) throw new Error(`npm API returned ${res.status}`);
	const data = await res.json();
	if (typeof data?.downloads !== "number") {
		throw new Error("npm API response missing downloads");
	}
	try {
		sessionStorage.setItem(cacheKey, String(data.downloads));
	} catch {}
	return data.downloads;
}
