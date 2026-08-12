/**
 * Prefix a root-absolute path (starting with `/`) with the configured base
 * path so internal links work when the site is served from a subpath
 * (e.g. GitHub Pages project sites). External URLs and fragments pass through.
 */
export function withBase(path: string): string {
	if (typeof path !== "string" || !path.startsWith("/")) return path;
	return `${import.meta.env.BASE_URL}${path}`;
}

/**
 * Strip the leading version segment from a doc id, so the remaining path
 * can be re-rooted under a different version (e.g. pointing the current
 * page at `/docs/latest/...` or building the upstream edit path).
 *
 *   "v5.9.x/Reference/Errors" → "Reference/Errors"
 *   "latest"                  → ""
 */
export function afterVersion(docId: string): string {
	return docId.replace(/^[^/]+(\/|$)/, "");
}
