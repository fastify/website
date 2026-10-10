// Dgeni-style pipeline: processors ordered through runAfter / runBefore.
// A processor is { name, runAfter?: string[], runBefore?: string[], process(docs, ctx) }.
// process() may return a new docs array (or undefined to keep the current one).

export class Pipeline {
	#processors = new Map();

	use(processor) {
		if (!processor?.name || typeof processor.process !== "function") {
			throw new TypeError(
				'A processor needs a "name" and a "process(docs, ctx)" function',
			);
		}
		this.#processors.set(processor.name, processor);
		return this;
	}

	remove(name) {
		this.#processors.delete(name);
		return this;
	}

	has(name) {
		return this.#processors.has(name);
	}

	/** Execution order: topological sort, stable with respect to registration order. */
	order() {
		const procs = [...this.#processors.values()];
		const edges = new Map(procs.map((p) => [p.name, new Set()])); // name -> names that must run first
		for (const p of procs) {
			for (const dep of p.runAfter ?? [])
				if (edges.has(dep)) edges.get(p.name).add(dep);
			for (const next of p.runBefore ?? [])
				if (edges.has(next)) edges.get(next).add(p.name);
		}
		const sorted = [];
		const state = new Map(); // undefined | 'visiting' | 'done'
		const visit = (name, trail) => {
			if (state.get(name) === "done") return;
			if (state.get(name) === "visiting") {
				throw new Error(
					`Circular dependency between processors: ${[...trail, name].join(" -> ")}`,
				);
			}
			state.set(name, "visiting");
			for (const dep of edges.get(name)) visit(dep, [...trail, name]);
			state.set(name, "done");
			sorted.push(this.#processors.get(name));
		};
		for (const p of procs) visit(p.name, []);
		return sorted;
	}

	async run(ctx = {}) {
		ctx.log ??= createLogger();
		let docs = [];
		for (const p of this.order()) {
			ctx.log.debug(`processor: ${p.name}`);
			const result = await p.process(docs, ctx);
			if (Array.isArray(result)) docs = result;
		}
		ctx.docs = docs;
		return docs;
	}
}

export function createLogger({ level = "info" } = {}) {
	const levels = ["debug", "info", "warn", "error"];
	const min = levels.indexOf(level);
	const log = {};
	for (const [i, l] of levels.entries()) {
		log[l] =
			i >= min
				? (...args) =>
						console[l === "debug" ? "log" : l](`[extract:${l}]`, ...args)
				: () => {};
	}
	return log;
}
