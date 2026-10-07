// Markdown for JSDoc comments and package descriptions. The source is the type
// definitions of the documented packages, but raw HTML is still escaped and
// only http(s), relative and anchor links are kept.
import { Marked } from "marked";

const escapeHtml = (s) =>
	String(s).replace(
		/[&<>"']/g,
		(c) =>
			({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
				c
			],
	);
const safeHref = (href) => (/^(https?:|\/|#|\.)/i.test(href) ? href : null);

const marked = new Marked({
	gfm: true,
	renderer: {
		html({ text }) {
			return escapeHtml(text);
		},
		link({ href, title, tokens }) {
			const text = this.parser.parseInline(tokens);
			const url = safeHref(href);
			if (!url) return text;
			const external = /^https?:/i.test(url);
			return `<a href="${escapeHtml(url)}"${title ? ` title="${escapeHtml(title)}"` : ""}${external ? ' rel="noopener noreferrer"' : ""}>${text}</a>`;
		},
		image({ text }) {
			return escapeHtml(text);
		},
	},
});

/**
 * @param {string|undefined} text
 * @param {Map<string, string>} links  name -> URL, used for `{@link Name}`
 */
export function renderDoc(text, links = new Map(), { inline = false } = {}) {
	if (!text) return "";
	const withLinks = text.replace(
		/\{@link(?:code|plain)?\s+([^}\s|]+)(?:[\s|]+([^}]*))?\}/g,
		(_, target, label) => {
			const shown = label?.trim() || target;
			if (/^https?:/.test(target)) return `[${shown}](${target})`;
			const href = links.get(target.split(".")[0]);
			return href ? `[\`${shown}\`](${href})` : `\`${shown}\``;
		},
	);
	return inline ? marked.parseInline(withLinks) : marked.parse(withLinks);
}
