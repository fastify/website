// @ts-check
/**
 * Date helpers for the contributor leaderboard.
 *
 * Everything here runs in UTC. GitHub search qualifiers are UTC-based, and
 * `validateContributorsData` asserts the reporting window spans exactly
 * `WINDOW_DAYS * 24h`, so leaving date-fns on its default local-time behaviour
 * would shift the search keys with the build machine's time zone and break the
 * span assertion whenever the window crosses a DST boundary. Wrapping values in
 * `UTCDate` keeps both stable: UTC has no DST, so every day is exactly 24h.
 */
import { UTCDate, utc } from "@date-fns/utc";
import {
	addDays,
	differenceInCalendarDays,
	format,
	isValid,
	isWithinInterval,
	parseISO,
	subDays,
} from "date-fns";
import { WINDOW_DAYS } from "./config.mjs";

/**
 * Format an instant as the `yyyy-MM-dd` key GitHub search qualifiers expect.
 * @param {Date | string} value
 */
export function toDateKey(value) {
	return format(new UTCDate(value), "yyyy-MM-dd");
}

/** @param {Date} now */
export function createPeriod(now = new Date()) {
	const to = new UTCDate(now);
	const from = subDays(to, WINDOW_DAYS);
	return { from: from.toISOString(), to: to.toISOString(), days: WINDOW_DAYS };
}

/** @param {string | null | undefined} value @param {{ from: string; to: string }} period */
export function isInPeriod(value, period) {
	if (!value) return false;
	const instant = parseISO(value);
	const start = parseISO(period.from);
	const end = parseISO(period.to);
	if (!isValid(instant) || !isValid(start) || !isValid(end)) return false;
	// Inclusive on both bounds, matching `isWithinInterval`.
	return isWithinInterval(instant, { start, end });
}

/**
 * Halve a `yyyy-MM-dd` range so a search that exceeds GitHub's 1,000-result cap
 * can be retried as two smaller ranges.
 * @param {string} fromDate @param {string} toDate
 */
export function splitDateRange(fromDate, toDate) {
	const start = parseISO(fromDate, { in: utc });
	const end = parseISO(toDate, { in: utc });
	if (!isValid(start) || !isValid(end) || start >= end) {
		return null;
	}
	const midpoint = addDays(
		start,
		Math.floor(differenceInCalendarDays(end, start) / 2),
	);
	return [
		[fromDate, toDateKey(midpoint)],
		[toDateKey(addDays(midpoint, 1)), toDate],
	];
}
