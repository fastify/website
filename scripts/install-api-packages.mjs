// Installs the packages documented at /api/ (fastify, the official plugins and
// the Fastify libraries) into .cache/api. The plugin list is the "Core" section
// of the Ecosystem guide, which fetch-docs downloads first.
//
// Skipped when SKIP_API_REFERENCE is set.

import { readFile } from "node:fs/promises";
import pino from "pino";
import {
	defaultPackages,
	installPackages,
} from "../src/integrations/api-reference/install.js";

const log = pino({
	level: process.env.LOG_LEVEL || "debug",
	msgPrefix: "[install-api-packages] ",
	transport: {
		target: "pino-pretty",
		options: { colorize: true },
	},
});

export async function installApiPackages() {
	if (process.env.SKIP_API_REFERENCE) {
		log.info("Skipping the API reference (SKIP_API_REFERENCE set)");
		return;
	}
	const ecosystem = await readFile(
		new URL("../src/content/docs/latest/Guides/Ecosystem.md", import.meta.url),
		"utf8",
	);
	await installPackages({
		packages: await defaultPackages({ ecosystem }),
		logger: log,
	});
}
