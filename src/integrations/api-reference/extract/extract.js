// Extraction: TypeScript compiler API -> array of plain "doc" objects.
// No dependency besides `typescript` (a peer dependency of the documented project).
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const KIND_PRIORITY = [
	[ts.SyntaxKind.ClassDeclaration, "class"],
	[ts.SyntaxKind.InterfaceDeclaration, "interface"],
	[ts.SyntaxKind.FunctionDeclaration, "function"],
	[ts.SyntaxKind.EnumDeclaration, "enum"],
	[ts.SyntaxKind.TypeAliasDeclaration, "type"],
	[ts.SyntaxKind.VariableDeclaration, "const"],
	[ts.SyntaxKind.ModuleDeclaration, "namespace"],
];

/**
 * Processor that reads one or more TypeScript packages and creates one doc per exported symbol.
 * All packages share a single program, so types referenced across packages resolve once.
 *
 * Single package:  readTypeScript({ entry: 'fastify.d.ts', basePath: '../fastify' })
 * Many packages:   readTypeScript({ packages: [{ basePath: 'node_modules/@fastify/cors' }, ...] })
 *
 * A package entry is { basePath, entry?, name?, tag?, tagMode?, augmentations? }:
 * `entry` defaults to the `types` field of its package.json, `name` to its package name.
 * `tag` / `tagMode` override the filter for that package (see filter-by-tag).
 * With `augmentations` (default true) interfaces added through `declare module '...'`
 * blocks (e.g. a plugin adding `jwt` to FastifyInstance) become docs too.
 *
 * @param {object} opts
 * @param {string} [opts.entry]
 * @param {string} [opts.basePath]
 * @param {object[]} [opts.packages]
 * @param {ts.CompilerOptions} [opts.compilerOptions]
 */
export function readTypeScript({
	entry,
	basePath = process.cwd(),
	packages,
	compilerOptions = {},
} = {}) {
	return {
		name: "read-typescript",
		process(docs, ctx) {
			const list = (packages ?? [{ entry, basePath }])
				.map(resolvePackage)
				.filter((pkg) => {
					if (pkg.entryPath) return true;
					ctx.log.warn(`${pkg.name}: no type definitions found, skipped`);
					return false;
				});
			const program = ts.createProgram(
				list.map((p) => p.entryPath),
				{
					target: ts.ScriptTarget.ES2022,
					module: ts.ModuleKind.NodeNext,
					moduleResolution: ts.ModuleResolutionKind.NodeNext,
					strict: true,
					skipLibCheck: true,
					noEmit: true,
					...compilerOptions,
				},
			);
			const checker = program.getTypeChecker();
			const docBySymbol = ctx.symbolToDoc ?? new Map();
			const found = [];

			for (const pkg of list) {
				const sourceFile = program.getSourceFile(pkg.entryPath);
				const moduleSymbol =
					sourceFile && checker.getSymbolAtLocation(sourceFile);
				if (!moduleSymbol) {
					ctx.log.warn(
						`${pkg.name}: ${path.relative(pkg.root, pkg.entryPath)} is not a module, skipped`,
					);
					continue;
				}
				const own = createOwnership(pkg.root);
				const bySymbol = new Map();
				const make = (symbol, exportName) =>
					symbolToDoc(symbol, exportName, { checker, pkg, own });

				// `export = fastify`: the function/class itself is the main export
				const exportEquals = moduleSymbol.exports?.get(
					ts.InternalSymbolName.ExportEquals,
				);
				if (exportEquals) {
					const symbol = resolveAlias(checker, exportEquals);
					if (symbol.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Class)) {
						const doc = make(symbol, symbol.name);
						if (doc) bySymbol.set(symbol, doc);
					}
				}

				// getExportsOfModule also resolves `export = x` (merged function + namespace, like Fastify)
				for (const exp of checker.getExportsOfModule(moduleSymbol)) {
					let symbol = resolveAlias(checker, exp);
					const exportName =
						exp.escapedName === "default" ? "default" : exp.name;
					// `export const fastify: typeof fastify` -> alias of the already documented function
					if (symbol.flags & ts.SymbolFlags.Variable) {
						const typeSymbol = checker.getTypeOfSymbol(symbol).getSymbol();
						if (typeSymbol && bySymbol.has(typeSymbol)) symbol = typeSymbol;
					}
					if (bySymbol.has(symbol)) {
						bySymbol.get(symbol).aliases.push(exportName);
						continue;
					}
					// Plugins often pair `declare function fastifyCors` (export =) with
					// `export const fastifyCors: FastifyCorsPlugin` in the namespace: same name,
					// same thing. Keep one doc and treat the constant as an alias.
					const sameName = [...bySymbol.values()].find(
						(d) => d.name === symbol.name && d.kind === "function",
					);
					if (sameName && symbol.flags & ts.SymbolFlags.Variable) {
						bySymbol.set(symbol, sameName);
						if (exportName !== sameName.name) sameName.aliases.push(exportName);
						continue;
					}
					const doc = make(symbol, exportName);
					if (doc) bySymbol.set(symbol, doc);
				}

				// "default" is not a useful name when a real one exists
				for (const doc of new Set(bySymbol.values())) {
					if (doc.name === "default" && doc.aliases.length)
						doc.name = doc.aliases.shift();
					doc.aliases = doc.aliases.filter((a) => a !== doc.name);
					doc.id = `${pkg.name}::${doc.name}`;
				}
				for (const [symbol, doc] of bySymbol)
					if (!docBySymbol.has(symbol)) docBySymbol.set(symbol, doc);
				found.push(...new Set(bySymbol.values()));

				if (pkg.augmentations !== false) {
					for (const doc of readAugmentations(program, checker, pkg, own)) {
						doc.id = `${pkg.name}::${doc.augments}#${doc.name}`;
						found.push(doc);
					}
				}
				ctx.log.debug(
					`${pkg.name}: ${new Set(bySymbol.values()).size} exports`,
				);
			}

			ctx.program = program;
			ctx.checker = checker;
			ctx.symbolToDoc = docBySymbol;
			ctx.packages = list;
			return [...docs, ...found];
		},
	};
}

/** Fills in entry point and package name from package.json when they are not given. */
function resolvePackage(input) {
	const root = path.resolve(input.basePath ?? process.cwd());
	let manifest = {};
	try {
		manifest = JSON.parse(
			fs.readFileSync(path.join(root, "package.json"), "utf8"),
		);
	} catch {}
	const entry = input.entry ?? typesEntry(manifest);
	const entryPath = entry ? path.resolve(root, entry) : null;
	return {
		...input,
		root,
		name: input.name ?? manifest.name ?? path.basename(root),
		version: input.version ?? manifest.version,
		entryPath: entryPath && fs.existsSync(entryPath) ? entryPath : null,
	};
}

function typesEntry(manifest) {
	if (manifest.types || manifest.typings)
		return manifest.types || manifest.typings;
	const find = (node) => {
		if (!node || typeof node !== "object") return null;
		if (typeof node.types === "string") return node.types;
		for (const value of Object.values(node)) {
			const hit = find(value);
			if (hit) return hit;
		}
		return null;
	};
	const dot =
		typeof manifest.exports === "object"
			? (manifest.exports["."] ?? manifest.exports)
			: null;
	return find(dot);
}

/** A file belongs to a package when it lives in its folder but not in a nested node_modules. */
function createOwnership(root) {
	const prefix = root + path.sep;
	const nested = path.join(root, "node_modules") + path.sep;
	return (fileName) => {
		const file = path.resolve(fileName);
		return file.startsWith(prefix) && !file.startsWith(nested);
	};
}

function resolveAlias(checker, symbol) {
	while (symbol.flags & ts.SymbolFlags.Alias)
		symbol = checker.getAliasedSymbol(symbol);
	return symbol;
}

function symbolToDoc(symbol, name, { checker, pkg, own }) {
	const all = symbol.declarations ?? [];
	// Interfaces can be merged across packages (module augmentation): keep this package's
	// declarations, or the original ones for a re-exported third-party type.
	const mine = all.filter(
		(d) => own(d.getSourceFile().fileName) && !isInAugmentation(d),
	);
	const decls = mine.length ? mine : all.filter((d) => !isInAugmentation(d));
	if (!decls.length) return null;

	const found = KIND_PRIORITY.find(([k]) => decls.some((d) => d.kind === k));
	if (!found) return null;
	const [syntaxKind, kind] = found;
	const main = decls.filter((d) => d.kind === syntaxKind);
	const doc = baseDoc(main, name, kind, { pkg, own });
	doc.symbol = symbol;
	if (kind === "interface" || kind === "class") {
		doc.members = extractMembers(
			main.flatMap((d) => [...d.members]),
			checker,
		);
	}
	for (const d of main) collectRefs(d, checker, doc.refs);
	doc.refs.delete(symbol);
	return doc;
}

function baseDoc(main, name, kind, { pkg, own }) {
	const first = main[0];
	const sf = first.getSourceFile();
	const { line } = sf.getLineAndCharacterOfPosition(first.getStart());
	const jsdocs = main.map(readJsDoc);
	return {
		id: name,
		name,
		package: pkg.name,
		version: pkg.version ?? null,
		aliases: [],
		kind,
		augments: null,
		file: path.relative(pkg.root, sf.fileName).split(path.sep).join("/"),
		line: line + 1,
		external: !own(sf.fileName),
		description: [
			...new Set(jsdocs.map((j) => j.description).filter(Boolean)),
		].join("\n\n"),
		tags: jsdocs.flatMap((j) => j.tags),
		filter:
			pkg.tag || pkg.tagMode || pkg.fallbackTag
				? { tag: pkg.tag, mode: pkg.tagMode, fallbackTag: pkg.fallbackTag }
				: undefined,
		// every overload / merged declaration keeps its own code and comment
		signatures: main.map((d, i) => ({
			code: declarationCode(d, kind),
			...jsdocs[i],
		})),
		members: [],
		refs: new Set(),
		symbol: null,
	};
}

/** Is the node inside a `declare module 'x' { ... }` block? */
function isInAugmentation(node) {
	for (let n = node.parent; n; n = n.parent) {
		if (
			ts.isModuleDeclaration(n) &&
			ts.isStringLiteral(n.name) &&
			n.parent &&
			ts.isSourceFile(n.parent) &&
			ts.isExternalModule(n.parent)
		)
			return true;
	}
	return false;
}

/**
 * Interfaces declared inside `declare module 'fastify' { ... }` in this package's files:
 * the members a plugin adds to FastifyInstance, FastifyRequest, FastifyReply...
 */
function readAugmentations(program, checker, pkg, own) {
	const byKey = new Map();
	for (const sf of program.getSourceFiles()) {
		if (!own(sf.fileName) || !ts.isExternalModule(sf)) continue;
		for (const stmt of sf.statements) {
			if (
				!ts.isModuleDeclaration(stmt) ||
				!ts.isStringLiteral(stmt.name) ||
				!stmt.body ||
				!ts.isModuleBlock(stmt.body)
			)
				continue;
			const target = stmt.name.text;
			for (const node of stmt.body.statements) {
				if (!ts.isInterfaceDeclaration(node)) continue;
				const key = `${target}#${node.name.text}`;
				if (!byKey.has(key)) byKey.set(key, { target, nodes: [] });
				byKey.get(key).nodes.push(node);
			}
		}
	}
	const docs = [];
	for (const { target, nodes } of byKey.values()) {
		const doc = baseDoc(nodes, nodes[0].name.text, "interface", { pkg, own });
		doc.augments = target;
		doc.members = extractMembers(
			nodes.flatMap((d) => [...d.members]),
			checker,
		);
		for (const n of nodes) collectRefs(n, checker, doc.refs);
		if (doc.members.length) docs.push(doc);
	}
	return docs;
}

function extractMembers(nodes, checker) {
	const byName = new Map();
	for (const m of nodes) {
		if (hasModifier(m, ts.SyntaxKind.PrivateKeyword)) continue;
		const name = memberName(m);
		if (name == null) continue;
		const jsdoc = readJsDoc(m);
		const code = dedent(
			stripModifiers(m.getText()).replace(/;$/, ""),
			column(m),
		);
		let member = byName.get(name);
		if (!member) {
			member = {
				name,
				kind: memberKind(m),
				optional: !!m.questionToken,
				// can be called: a method, or a property whose type has call signatures
				// (`verifyBearerAuth?: verifyBearerAuth` where the alias is a function type)
				callable: isCallable(m, checker),
				description: "",
				tags: [],
				signatures: [],
			};
			byName.set(name, member);
		}
		member.signatures.push({ code, ...jsdoc });
		member.description ||= jsdoc.description;
		member.tags.push(...jsdoc.tags);
	}
	return [...byName.values()];
}

function isCallable(m, checker) {
	if (
		ts.isMethodSignature(m) ||
		ts.isMethodDeclaration(m) ||
		ts.isCallSignatureDeclaration(m)
	)
		return true;
	if (!checker || !(ts.isPropertySignature(m) || ts.isPropertyDeclaration(m)))
		return false;
	try {
		const type = checker.getNonNullableType(checker.getTypeAtLocation(m));
		const parts = type.isUnion() ? type.types : [type];
		return parts.some((t) => t.getCallSignatures().length > 0);
	} catch {
		return false;
	}
}

function memberName(m) {
	if (ts.isCallSignatureDeclaration(m)) return "(call)";
	if (ts.isConstructSignatureDeclaration(m) || ts.isConstructorDeclaration(m))
		return "constructor";
	if (ts.isIndexSignatureDeclaration(m)) return "[index]";
	return m.name ? m.name.getText() : null;
}

function memberKind(m) {
	if (ts.isMethodSignature(m) || ts.isMethodDeclaration(m)) return "method";
	if (ts.isCallSignatureDeclaration(m)) return "call";
	if (ts.isConstructSignatureDeclaration(m) || ts.isConstructorDeclaration(m))
		return "constructor";
	if (ts.isIndexSignatureDeclaration(m)) return "index";
	if (ts.isGetAccessor(m) || ts.isSetAccessor(m)) return "accessor";
	// a property with a function type (e.g. `get: RouteShorthandMethod`) stays a "property"
	return "property";
}

function declarationCode(node, kind) {
	const sf = node.getSourceFile();
	let text;
	if ((kind === "interface" || kind === "class") && node.members) {
		// header only: `interface X<T> extends Y`
		text = sf.text
			.slice(node.getStart(), node.members.pos)
			.replace(/\{\s*$/, "");
	} else if (kind === "const") {
		const list = node.parent;
		const keyword =
			list.flags & ts.NodeFlags.Const
				? "const"
				: list.flags & ts.NodeFlags.Let
					? "let"
					: "var";
		text = `${keyword} ${node.getText()}`;
	} else if (kind === "namespace") {
		// the whole block when it is short enough to read, the header otherwise
		const full = node.getText();
		text =
			full.split("\n").length <= 60 ? full : `namespace ${node.name.getText()}`;
	} else {
		text = node.getText();
	}
	return dedent(stripModifiers(text).trim(), column(node));
}

function stripModifiers(text) {
	return text.replace(/^(export\s+|declare\s+|default\s+)+/, "");
}

function hasModifier(node, kind) {
	return (
		ts.canHaveModifiers(node) &&
		(ts.getModifiers(node) ?? []).some((m) => m.kind === kind)
	);
}

/** Reads the JSDoc block closest to the node: description + tags (custom tags included). */
export function readJsDoc(node) {
	const blocks = ts.getJSDocCommentsAndTags(node).filter(ts.isJSDoc);
	const block = blocks.at(-1);
	if (!block) return { description: "", tags: [] };
	return {
		description: (ts.getTextOfJSDocComment(block.comment) ?? "").trim(),
		tags: (block.tags ?? []).map((tag) => ({
			name: tag.tagName.text,
			param: ts.isJSDocParameterTag(tag) ? tag.name.getText() : undefined,
			text: (ts.getTextOfJSDocComment(tag.comment) ?? "").trim(),
		})),
	};
}

/** Collects the symbols referenced by the declaration's types (for links and checks). */
function collectRefs(node, checker, refs) {
	const visit = (n) => {
		let target;
		if (ts.isTypeReferenceNode(n)) target = n.typeName;
		else if (ts.isExpressionWithTypeArguments(n)) target = n.expression;
		else if (ts.isTypeQueryNode(n)) target = n.exprName;
		if (target) {
			if (ts.isQualifiedName(target)) target = target.right;
			else if (ts.isPropertyAccessExpression(target)) target = target.name;
			const sym = checker.getSymbolAtLocation(target);
			if (sym) refs.add(resolveAlias(checker, sym));
		}
		ts.forEachChild(n, visit);
	};
	visit(node);
}

function column(node) {
	const sf = node.getSourceFile();
	return sf.getLineAndCharacterOfPosition(node.getStart()).character;
}

/** Lines after the first lose the indentation the declaration had in the file. */
function dedent(text, col) {
	const [firstLine, ...rest] = text.split("\n");
	const strip = (l) => l.slice(Math.min(col, l.match(/^\s*/)[0].length));
	return [firstLine, ...rest.map(strip)].join("\n");
}
