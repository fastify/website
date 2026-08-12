import { toString as toMarkdownString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export function remarkReadingTime() {
	return (tree, { data }) => {
		const text = toMarkdownString(tree);
		const { text: minutesRead } = getReadingTime(text);
		data.astro.frontmatter.minutesRead = minutesRead;
	};
}
