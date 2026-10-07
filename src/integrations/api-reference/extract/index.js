export { readJsDoc, readTypeScript } from "./extract.js";
export { createLogger, Pipeline } from "./pipeline.js";
export {
	checkReferences,
	computePaths,
	filterByTag,
	serializeDoc,
	stripInternalMembers,
} from "./processors.js";

import { readTypeScript } from "./extract.js";
import { Pipeline } from "./pipeline.js";
import {
	checkReferences,
	computePaths,
	filterByTag,
	stripInternalMembers,
} from "./processors.js";

/**
 * Extraction: read the entry point, keep tagged symbols, strip internal members,
 * link docs together and check references. Rendering is up to the caller
 * (fastify-api-reference renders the docs with Astro).
 */
export function createExtractionPipeline({
	entry,
	basePath,
	packages,
	compilerOptions,
	tag = "publicAPI",
	tagMode = "include",
	pathPattern,
	failOnMissing,
	reportMissing,
} = {}) {
	return new Pipeline()
		.use(readTypeScript({ entry, basePath, packages, compilerOptions }))
		.use(filterByTag({ tag, mode: tagMode }))
		.use(stripInternalMembers())
		.use(computePaths(pathPattern ? { pattern: pathPattern } : {}))
		.use(checkReferences({ failOnMissing, report: reportMissing }));
}
