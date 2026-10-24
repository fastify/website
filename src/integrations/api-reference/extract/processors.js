// Built-in processors. Each one is a factory returning { name, runAfter, runBefore, process }.

const hasTag = (entity, tag) =>
	entity.tags.some((t) => t.name === tag) ||
	(entity.signatures ?? []).some((s) => s.tags.some((t) => t.name === tag));

/**
 * Keeps only the docs carrying the tag (e.g. @publicAPI).
 *  - `include`: keep tagged declarations
 *  - `exclude`: drop tagged declarations (e.g. `@internal`, like Angular does today)
 *  - `all`:     keep everything
 *  - `auto`:    `include` for packages that use the tag at least once, otherwise drop
 *               `fallbackTag` (default `internal`). Lets a project adopt the tag package by package.
 * Packages can override `tag`, `mode` and `fallbackTag` through doc.filter (set by read-typescript).
 */
export function filterByTag({
	tag = "publicAPI",
	mode = "include",
	fallbackTag = "internal",
} = {}) {
	return {
		name: "filter-by-tag",
		runAfter: ["read-typescript"],
		process(docs, ctx) {
			const settings = (d) => ({
				tag: d.filter?.tag ?? tag,
				mode: d.filter?.mode ?? mode,
				fallbackTag: d.filter?.fallbackTag ?? fallbackTag,
			});
			// packages that already use their tag somewhere
			const tagged = new Set(
				docs
					.filter((d) => {
						const s = settings(d);
						return (
							hasTag(d, s.tag) ||
							d.members.some((m) => m.tags.some((t) => t.name === s.tag))
						);
					})
					.map((d) => d.package),
			);
			ctx.taggedPackages = tagged;

			const keep = (d) => {
				const s = settings(d);
				if (s.mode === "all") return true;
				if (s.mode === "include") return hasTag(d, s.tag);
				if (s.mode === "exclude") return !hasTag(d, s.tag);
				// auto
				return tagged.has(d.package)
					? hasTag(d, s.tag)
					: !hasTag(d, s.fallbackTag);
			};
			const kept = docs.filter(keep);
			ctx.log.info(
				`filter-by-tag: kept ${kept.length} of ${docs.length} exports`,
			);
			ctx.allDocs = docs;
			return kept;
		},
	};
}

/** Drops members tagged @internal or @private from the remaining docs. */
export function stripInternalMembers({ tags = ["internal", "private"] } = {}) {
	return {
		name: "strip-internal-members",
		runAfter: ["filter-by-tag"],
		process(docs) {
			for (const d of docs)
				d.members = d.members.filter(
					(m) => !m.tags.some((t) => tags.includes(t.name)),
				);
		},
	};
}

/** Assigns every doc its output path (and builds the id / name indexes). */
export function computePaths({
	pattern = (doc) =>
		`api/${doc.package ? `${doc.package}/` : ""}${doc.name}.html`,
} = {}) {
	return {
		name: "compute-paths",
		runAfter: ["filter-by-tag", "strip-internal-members"],
		process(docs, ctx) {
			ctx.byName = new Map();
			ctx.byId = new Map();
			for (const d of docs) {
				ctx.byId.set(d.id, d);
				d.outputPath = pattern(d);
				ctx.byName.set(d.name, d);
				for (const a of d.aliases) if (!ctx.byName.has(a)) ctx.byName.set(a, d);
			}
		},
	};
}

/**
 * Makes sure the public API does not expose types left out of the docs:
 * if FastifyReply uses SendArgs and SendArgs is not tagged, it is reported.
 * Also links docs to each other (`uses` / `usedBy`, as doc ids).
 */
export function checkReferences({
	failOnMissing = false,
	report = "list",
} = {}) {
	return {
		name: "check-references",
		runAfter: ["compute-paths"],
		process(docs, ctx) {
			const kept = new Set(docs);
			const missing = new Map(); // type name -> Set(names of the docs using it)
			for (const d of docs) {
				d.uses = [];
				d.missingRefs = [];
			}
			for (const d of docs) {
				for (const sym of d.refs) {
					const target = ctx.symbolToDoc?.get(sym);
					if (!target || target === d) continue;
					if (kept.has(target)) {
						d.uses.push(target.id);
						target.usedBy ??= [];
						target.usedBy.push(d.id);
					} else if (!target.external) {
						const label =
							target.package && target.package !== d.package
								? `${target.package} ${target.name}`
								: target.name;
						d.missingRefs.push(label);
						if (!missing.has(label)) missing.set(label, new Set());
						missing
							.get(label)
							.add(
								d.package && d.package !== target.package
									? `${d.package} ${d.name}`
									: d.name,
							);
					}
				}
			}
			for (const d of docs) {
				d.uses = [...new Set(d.uses)].sort();
				d.usedBy = [...new Set(d.usedBy ?? [])].sort();
				d.missingRefs = [...new Set(d.missingRefs)].sort();
			}
			for (const [name, users] of report === "list"
				? [...missing].sort()
				: []) {
				const list = [...users];
				const shown =
					list.slice(0, 3).join(", ") +
					(list.length > 3 ? ` and ${list.length - 3} more` : "");
				ctx.log.warn(`${name} is used by ${shown} but is not documented`);
			}
			if (missing.size)
				ctx.log.warn(
					`${missing.size} types used by the public API are not documented`,
				);
			ctx.missingReferences = missing;
			if (failOnMissing && missing.size)
				throw new Error(`${missing.size} referenced types are not documented`);
		},
	};
}

/** Plain JSON view of a doc: no TypeScript symbols, ready for Astro, VitePress, etc. */
export function serializeDoc({ symbol, refs, filter, ...doc }) {
	return JSON.parse(JSON.stringify(doc));
}
