import { buildPluginList } from "./build-plugin-list.mjs";
import { downloadBenchmarks } from "./download-benchmarks.mjs";
import { fetchContributors } from "./fetch-contributors.mjs";
import { fetchDocs } from "./fetch-docs.mjs";
import { fetchPluginDownloads } from "./fetch-plugin-downloads.mjs";

const tasks = [
	downloadBenchmarks(),
	fetchContributors(),
	fetchDocs()
		.then(() => buildPluginList())
		.then(() => fetchPluginDownloads()),
];

await Promise.all(tasks).catch((err) => {
	console.error(err);
	process.exit(1);
});
