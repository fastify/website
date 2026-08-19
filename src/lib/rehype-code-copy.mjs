function hasClass(node, className) {
	const classes = node.properties?.className;
	return Array.isArray(classes) && classes.includes(className);
}

function countLines(node) {
	let highlightedLines = 0;
	let text = "";

	const walk = (current) => {
		if (current.type === "text") {
			text += current.value;
			return;
		}
		if (current.type !== "element") return;
		if (hasClass(current, "line")) highlightedLines += 1;
		for (const child of current.children) walk(child);
	};

	walk(node);
	if (highlightedLines > 0) return highlightedLines;
	return text.replace(/\n$/, "").split("\n").length;
}

function wrapCodeBlocks(parent) {
	for (let index = 0; index < parent.children.length; index += 1) {
		const child = parent.children[index];
		if (child.type !== "element") continue;

		if (child.tagName === "pre") {
			const lineCount = countLines(child);
			parent.children[index] = {
				type: "element",
				tagName: "div",
				properties: {
					className: ["docs-pre-wrap"],
					dataCopyRoot: "",
					dataCodeLines: lineCount <= 1 ? "single" : "multiple",
				},
				children: [child],
			};
			continue;
		}

		wrapCodeBlocks(child);
	}
}

export function rehypeCodeCopy() {
	return wrapCodeBlocks;
}
