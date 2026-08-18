// @ts-check
/**
 * Validation and atomic persistence for the contributor snapshot.
 */
import { readFile, rename, unlink, writeFile } from "node:fs/promises";
import { differenceInMilliseconds, isValid, parseISO } from "date-fns";
import { millisecondsInDay } from "date-fns/constants";
import { ORGANIZATION, OUTPUT, WEIGHTS, WINDOW_DAYS } from "./config.mjs";

/**
 * `parseISO` only accepts strings, so guard the type before parsing.
 * @param {unknown} value
 */
function isIsoInstant(value) {
	return typeof value === "string" && isValid(parseISO(value));
}

/** @param {unknown} data */
export function validateContributorsData(data) {
	if (!data || typeof data !== "object")
		throw new Error("Snapshot must be an object");
	const snapshot = /** @type {any} */ (data);
	if (snapshot.organization !== ORGANIZATION) {
		throw new Error(`Snapshot organization must be ${ORGANIZATION}`);
	}
	if (!isIsoInstant(snapshot.generatedAt)) {
		throw new Error("Snapshot generatedAt must be an ISO date");
	}
	if (
		snapshot.period?.days !== WINDOW_DAYS ||
		!isIsoInstant(snapshot.period?.from) ||
		!isIsoInstant(snapshot.period?.to)
	) {
		throw new Error("Snapshot period is invalid");
	}
	if (
		differenceInMilliseconds(
			parseISO(snapshot.period.to),
			parseISO(snapshot.period.from),
		) !==
		WINDOW_DAYS * millisecondsInDay
	) {
		throw new Error("Snapshot period must span exactly 30 days");
	}
	for (const [field, weight] of Object.entries(WEIGHTS)) {
		if (snapshot.methodology?.weights?.[field] !== weight) {
			throw new Error(`Snapshot methodology weight ${field} is invalid`);
		}
	}
	if (!Array.isArray(snapshot.contributors)) {
		throw new Error("Snapshot contributors must be an array");
	}
	const logins = new Set();
	for (const [index, contributor] of snapshot.contributors.entries()) {
		if (
			contributor.rank !== index + 1 ||
			typeof contributor.login !== "string" ||
			!contributor.login
		) {
			throw new Error(`Snapshot contributor at rank ${index + 1} is invalid`);
		}
		const key = contributor.login.toLowerCase();
		if (logins.has(key))
			throw new Error(`Duplicate contributor ${contributor.login}`);
		logins.add(key);
	}
	return snapshot;
}

/** @param {string} output */
export async function readSnapshot(output = OUTPUT) {
	const raw = await readFile(output, "utf8");
	return validateContributorsData(JSON.parse(raw));
}

/** @param {unknown} data @param {string} output */
export async function writeSnapshot(data, output = OUTPUT) {
	validateContributorsData(data);
	const temporary = `${output}.${process.pid}.tmp`;
	try {
		await writeFile(temporary, `${JSON.stringify(data, null, 2)}\n`);
		await rename(temporary, output);
	} catch (error) {
		await unlink(temporary).catch(() => {});
		throw error;
	}
}
