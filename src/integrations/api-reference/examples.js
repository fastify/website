// JavaScript versions of TypeScript examples, computed at build time so the
// language switch only has to show one of them.
import * as nodeModule from "node:module";
import ts from "typescript";
import { escapeRegExp } from "./sources.js";

/**
 * @param {string} code  TypeScript source
 * @returns {{ ts: string, esm: string, cjs: string }}
 */
export function exampleVariants(code) {
	const source = code.replace(/\s+$/, "");
	const imports = importedNames(source);
	const esm = dropTypeOnlyImports(
		stripTypes(annotate(source, imports)),
		source,
		imports,
	);
	return { ts: source, esm, cjs: toCommonJS(esm) };
}

/**
 * An @example is either bare TypeScript or Markdown with fenced blocks. TS/JS
 * fences become switchable code; prose and fences in other languages stay Markdown.
 * @returns {{ code?: string, text?: string }[]}
 */
export function splitExample(text) {
	if (!text.includes("```")) return [{ code: text }];
	const parts = [];
	const fence = /```([\w-]*)[^\n]*\n([\s\S]*?)```/g;
	let last = 0;
	for (const m of text.matchAll(fence)) {
		const before = text.slice(last, m.index).trim();
		if (before) parts.push({ text: before });
		const lang = m[1].toLowerCase();
		if (["", "ts", "typescript", "js", "javascript", "mjs"].includes(lang))
			parts.push({ code: m[2] });
		else parts.push({ text: m[0] });
		last = (m.index ?? 0) + m[0].length;
	}
	const after = text.slice(last).trim();
	if (after) parts.push({ text: after });
	return parts;
}

/**
 * What the language switch would change on a page with these import lines and
 * @example tags: `language` (TS vs JS) and `format` (import vs require).
 */
export function switchEffect(imports, exampleTexts) {
	const variants = [
		...(imports ? [imports] : []),
		...exampleTexts.flatMap((text) =>
			splitExample(text)
				.filter((p) => p.code !== undefined)
				.map((p) => exampleVariants(p.code)),
		),
	];
	return {
		language: variants.some((v) => v.ts !== v.esm || v.ts !== v.cjs),
		format: variants.some((v) => v.esm !== v.cjs),
	};
}

const IMPORT =
	/^import\s+(type\s+)?(?:(\w+)\s*,?\s*)?(?:\{([^}]*)\})?\s*from\s*(['"])([^'"]+)\4;?\s*$/;

/** Local name -> { module, exported name } of every import in the example. */
function importedNames(code) {
	const names = new Map();
	for (const line of code.split("\n")) {
		const m = line.match(IMPORT);
		if (!m) continue;
		const [, , def, list, , from] = m;
		if (def) names.set(def, { from, name: "default" });
		for (const spec of (list ?? "").split(",")) {
			const [name, local = name] = spec
				.replace(/^\s*type\s+/, "")
				.trim()
				.split(/\s+as\s+/);
			if (name) names.set(local.trim(), { from, name: name.trim() });
		}
	}
	return names;
}

/**
 * `const x: Type = …` keeps its type in JavaScript as a JSDoc `@type` comment,
 * with imported names written as `import('module').Name`.
 */
function annotate(code, imports) {
	return code
		.split("\n")
		.flatMap((line) => {
			const m = line.match(
				/^(\s*)(?:export\s+)?(?:const|let|var)\s+[\w$]+\s*:\s*(.+?)\s*=(?!>)/,
			);
			if (!m || /[{}]/.test(m[2])) return [line];
			const type = m[2].replace(/\b[A-Za-z_$][\w$]*\b/g, (id) => {
				const imp = imports.get(id);
				if (!imp) return id;
				return imp.name === "default"
					? `import('${imp.from}').default`
					: `import('${imp.from}').${imp.name}`;
			});
			return [`${m[1]}/** @type {${type}} */`, line];
		})
		.join("\n");
}

/** Removes imported names the TypeScript used only as types. */
function dropTypeOnlyImports(js, ts, imports) {
	const body = (code) =>
		code
			.split("\n")
			.filter((l) => !IMPORT.test(l))
			.join("\n")
			.replace(/import\((['"])[^'"]+\1\)\.[\w$]+/g, "");
	const tsBody = body(ts);
	const jsBody = body(js);
	const used = (text, name) =>
		new RegExp(`(^|[^\\w$.])${escapeRegExp(name)}(?![\\w$])`).test(text);
	const typeOnly = new Set(
		[...imports.keys()].filter((n) => used(tsBody, n) && !used(jsBody, n)),
	);
	if (typeOnly.size === 0) return js;
	return js
		.split("\n")
		.flatMap((line) => {
			const m = line.match(IMPORT);
			if (!m) return [line];
			const [, , def, list, q, from] = m;
			const keep = (list ?? "")
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean)
				.filter(
					(spec) =>
						!typeOnly.has(
							spec
								.split(/\s+as\s+/)
								.pop()
								.trim(),
						),
				);
			const head = def && !typeOnly.has(def) ? def : null;
			if (!head && keep.length === 0) return [];
			const parts = [head, keep.length ? `{ ${keep.join(", ")} }` : null]
				.filter(Boolean)
				.join(", ");
			return [`import ${parts} from ${q}${from}${q}`];
		})
		.join("\n")
		.replace(/^\n+/, "");
}

/** Removes the types, keeping the layout of the original code. */
function stripTypes(code) {
	let out = null;
	// Node's own type stripping replaces types with spaces, so lines stay where they were
	if (typeof nodeModule.stripTypeScriptTypes === "function") {
		// silence the one-time ExperimentalWarning in the build log
		const emitWarning = process.emitWarning;
		process.emitWarning = () => {};
		try {
			out = nodeModule.stripTypeScriptTypes(code, { mode: "strip" });
		} catch {
		} finally {
			process.emitWarning = emitWarning;
		}
	}
	if (out != null) return tidy(code, out);
	// enums, namespaces or an older Node: let the compiler do it
	return ts
		.transpileModule(code, {
			compilerOptions: {
				target: ts.ScriptTarget.ESNext,
				module: ts.ModuleKind.ESNext,
				removeComments: false,
			},
		})
		.outputText.replace(/\n?export \{\};?\s*$/, "")
		.replace(/\s+$/, "");
}

/** Cleans up what whitespace-based stripping leaves behind. */
function tidy(original, stripped) {
	const before = original.split("\n");
	const lines = [];
	stripped.split("\n").forEach((line, i) => {
		let l = line.replace(/\s+$/, "");
		// `import X, { type Y } from` -> `import X from`; `import { type Y } from` -> gone
		l = l.replace(/,\s*\{\s*\}(\s*from)/, "$1");
		if (/^\s*import\s*\{\s*\}\s*from\s*['"][^'"]+['"];?$/.test(l)) l = "";
		// `const x    = 1` (a removed annotation) -> `const x = 1`
		l = l.replace(/(\S) {2,}(?=\S)/g, "$1 ");
		// `(a )` / `(a , b)` where a parameter type was removed
		if (!/\S +[),]/.test(before[i] ?? ""))
			l = l.replace(/(\S) +(?=[),])/g, "$1");
		// a line that only held types (`import type …`, `type A = …`) disappears
		if (l.trim() === "" && before[i]?.trim() !== "") return;
		lines.push(l);
	});
	return lines
		.join("\n")
		.replace(/\n{3,}/g, "\n\n")
		.replace(/^\n+/, "");
}

// [pattern, CommonJS lines for the match]
const CJS_RULES = [
	[
		/^import\s+(\w+)\s*,\s*\{([^}]*)\}\s*from\s*(['"][^'"]+['"]);?$/,
		(m) => [
			`const ${m[1]} = require(${m[3]})`,
			`const { ${namedRequire(m[2])} } = require(${m[3]})`,
		],
	],
	[
		/^import\s+\*\s+as\s+(\w+)\s+from\s*(['"][^'"]+['"]);?$/,
		(m) => [`const ${m[1]} = require(${m[2]})`],
	],
	[
		/^import\s+(\w+)\s+from\s*(['"][^'"]+['"]);?$/,
		(m) => [`const ${m[1]} = require(${m[2]})`],
	],
	[
		/^import\s*\{([^}]*)\}\s*from\s*(['"][^'"]+['"]);?$/,
		(m) => [`const { ${namedRequire(m[1])} } = require(${m[2]})`],
	],
	[/^import\s*(['"][^'"]+['"]);?$/, (m) => [`require(${m[1]})`]],
	[/^export\s+default\s+(.*)$/, (m) => [`module.exports = ${m[1]}`]],
	// CommonJS has no top-level await
	[/^await\s+(.*)$/, (m) => [m[1]]],
];

/** `a as b, c` -> `a: b, c` */
const namedRequire = (list) =>
	list
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean)
		.map((s) => s.replace(/\s+as\s+/, ": "))
		.join(", ");

/** ES module imports and default export to CommonJS, line by line. */
function toCommonJS(code) {
	return code
		.split("\n")
		.flatMap((line) => {
			for (const [pattern, convert] of CJS_RULES) {
				const m = line.match(pattern);
				if (m) return convert(m);
			}
			return [line];
		})
		.join("\n");
}
