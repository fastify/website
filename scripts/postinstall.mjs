import { buildPluginList } from "./build-plugin-list.mjs";
import { downloadBenchmarks } from "./download-benchmarks.mjs";
import { fetchContributors } from "./fetch-contributors.mjs";
import { fetchDocs } from "./fetch-docs.mjs";
import { fetchPluginDownloads } from "./fetch-plugin-downloads.mjs";
import { installApiPackages } from "./install-api-packages.mjs";

const tasks = [
	downloadBenchmarks(),
	fetchContributors(),
	fetchDocs()
		.then(() => buildPluginList())
		.then(() => Promise.all([fetchPluginDownloads(), installApiPackages()])),
];

await Promise.all(tasks).catch((err) => {
	console.error(err);
	process.exit(1);
});
