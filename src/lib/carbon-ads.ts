/**
 * Carbon Ads (OpenJS Foundation program) — JSON integration.
 *
 * There is no third-party loader: the browser requests one creative per
 * eligible slot from Carbon's JSON endpoint, validates it, and renders it
 * with DOM APIs. Nothing here may run at build time — the request itself is
 * the impression, so it must only happen for a real page view.
 *
 * This module has no Astro or bundler dependencies so it can be unit-tested
 * with `node --test`; everything browser-specific is injectable.
 */

export const CARBON_ZONES = {
	"top-bar": "CWBI45QW",
	sidebar: "CWBI45QI",
} as const;

export type CarbonFormat = keyof typeof CARBON_ZONES;

const ENDPOINT = "https://srv.carbonads.net/ads/";
const REQUEST_TIMEOUT_MS = 5000;
const VIEW_THRESHOLD = 0.5;
const VIEW_DURATION_MS = 1000;

/**
 * Build the request URL for a format. Anything other than an explicit
 * production build sends `ignore=yes`, so development, previews and staging
 * never count impressions, views or clicks.
 */
export function carbonRequestUrl(
	format: CarbonFormat,
	production: boolean,
): string {
	const url = `${ENDPOINT}${CARBON_ZONES[format]}.json`;
	return production ? url : `${url}?ignore=yes`;
}

// ---------------------------------------------------------------------------
// Response validation
// ---------------------------------------------------------------------------

const HEX_COLOR = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

export function safeColor(value: unknown): string | null {
	if (typeof value !== "string") return null;
	const color = value.trim();
	return HEX_COLOR.test(color) ? color : null;
}

/**
 * Accept absolute HTTP(S) and protocol-relative URLs, upgrading them to
 * HTTPS. The string is otherwise returned untouched (not re-serialized) so
 * tracking parameters are preserved exactly. Site-relative paths are only
 * meaningful behind a first-party proxy, which this integration does not
 * use, so they are rejected along with every other scheme.
 */
export function safeUrl(value: unknown): string | null {
	if (typeof value !== "string") return null;
	const raw = value.trim();
	let url: string;
	if (raw.startsWith("//")) url = `https:${raw}`;
	else if (/^https:\/\//i.test(raw)) url = raw;
	else if (/^http:\/\//i.test(raw)) url = `https://${raw.slice(7)}`;
	else return null;
	try {
		const parsed = new URL(url);
		if (parsed.protocol !== "https:" || !parsed.hostname) return null;
	} catch {
		return null;
	}
	return url;
}

function text(value: unknown): string | null {
	if (typeof value !== "string") return null;
	const trimmed = value.trim();
	return trimmed ? trimmed : null;
}

interface CarbonColors {
	background: string;
	text: string;
	backgroundDark: string;
	textDark: string;
}

interface CarbonAdBase {
	company: string;
	description: string;
	callToAction: string;
	statlink: string;
	statview: string;
	adViaLink: string;
	colors: CarbonColors;
}

export interface CarbonTopBarAd extends CarbonAdBase {
	format: "top-bar";
	image: string;
	cta: {
		background: string;
		text: string;
		backgroundDark: string;
		textDark: string;
	};
}

export interface CarbonSidebarAd extends CarbonAdBase {
	format: "sidebar";
	largeImage: string;
	title: string | null;
}

export type CarbonAd = CarbonTopBarAd | CarbonSidebarAd;

/**
 * Validate a raw JSON response and return the first ad, or `null` for
 * no-fill or any missing/invalid required field. Unknown fields are ignored.
 */
export function parseCarbonResponse(
	format: CarbonFormat,
	json: unknown,
): CarbonAd | null {
	if (!json || typeof json !== "object") return null;
	const ads = (json as { ads?: unknown }).ads;
	if (!Array.isArray(ads)) return null;
	const raw: unknown = ads[0];
	if (!raw || typeof raw !== "object") return null;
	const ad = raw as Record<string, unknown>;

	const company = text(ad.company);
	const description = text(ad.description);
	const callToAction = text(ad.callToAction);
	const statlink = safeUrl(ad.statlink);
	const statview = safeUrl(ad.statview);
	const adViaLink = safeUrl(ad.ad_via_link);
	const background = safeColor(ad.backgroundColor);
	const textColor = safeColor(ad.textColor);
	if (
		!company ||
		!description ||
		!callToAction ||
		!statlink ||
		!statview ||
		!adViaLink ||
		!background ||
		!textColor
	) {
		return null;
	}

	const base: CarbonAdBase = {
		company,
		description,
		callToAction,
		statlink,
		statview,
		adViaLink,
		colors: {
			background,
			text: textColor,
			// Missing or invalid dark values fall back to the light ones.
			backgroundDark: safeColor(ad.backgroundColorDark) ?? background,
			textDark: safeColor(ad.textColorDark) ?? textColor,
		},
	};

	if (format === "top-bar") {
		const image = safeUrl(ad.image);
		const ctaBackground = safeColor(ad.ctaBackgroundColor);
		const ctaText = safeColor(ad.ctaTextColor);
		if (!image || !ctaBackground || !ctaText) return null;
		return {
			...base,
			format,
			image,
			cta: {
				background: ctaBackground,
				text: ctaText,
				backgroundDark: safeColor(ad.ctaBackgroundColorDark) ?? ctaBackground,
				textDark: safeColor(ad.ctaTextColorDark) ?? ctaText,
			},
		};
	}

	const largeImage = safeUrl(ad.largeImage);
	if (!largeImage) return null;
	return { ...base, format, largeImage, title: text(ad.title) };
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

/** Values are validated hex colours, so interpolating them into CSS is safe. */
function lightDark(light: string, dark: string): string {
	return light === dark ? light : `light-dark(${light}, ${dark})`;
}

function el<K extends keyof HTMLElementTagNameMap>(
	doc: Document,
	tag: K,
	className: string,
	content?: string,
): HTMLElementTagNameMap[K] {
	const node = doc.createElement(tag);
	node.className = className;
	if (content !== undefined) node.textContent = content;
	return node;
}

function adLinks(
	doc: Document,
	ad: CarbonAd,
	prefix: string,
): { main: HTMLAnchorElement; label: HTMLAnchorElement } {
	const main = el(doc, "a", `${prefix}__link`);
	main.href = ad.statlink;
	main.target = "_blank";
	main.rel = "sponsored noopener";

	const label = el(doc, "a", `${prefix}__label`, "Ad");
	label.href = ad.adViaLink;
	label.target = "_blank";
	label.rel = "noopener";
	return { main, label };
}

function applyColors(unit: HTMLElement, colors: CarbonColors): void {
	unit.style.setProperty(
		"--carbon-bg",
		lightDark(colors.background, colors.backgroundDark),
	);
	unit.style.setProperty(
		"--carbon-fg",
		lightDark(colors.text, colors.textDark),
	);
}

/**
 * Build the DOM for a validated ad. Advertiser text only ever goes through
 * `textContent`; URLs and colours have been validated by the parser.
 */
export function renderCarbonAd(doc: Document, ad: CarbonAd): HTMLElement {
	if (ad.format === "top-bar") {
		const unit = el(doc, "div", "carbon-top-bar");
		applyColors(unit, ad.colors);
		unit.style.setProperty(
			"--carbon-cta-bg",
			lightDark(ad.cta.background, ad.cta.backgroundDark),
		);
		unit.style.setProperty(
			"--carbon-cta-fg",
			lightDark(ad.cta.text, ad.cta.textDark),
		);

		const inner = el(doc, "div", "carbon-top-bar__inner");
		const { main, label } = adLinks(doc, ad, "carbon-top-bar");
		const img = el(doc, "img", "carbon-top-bar__image");
		img.src = ad.image;
		img.alt = ad.company;
		img.width = 40;
		img.height = 40;
		main.append(
			img,
			el(doc, "span", "carbon-top-bar__description", ad.description),
			el(doc, "span", "carbon-top-bar__cta", ad.callToAction),
		);
		inner.append(main, label);
		unit.append(inner);
		return unit;
	}

	const unit = el(doc, "div", "carbon-sidebar");
	applyColors(unit, ad.colors);
	const { main, label } = adLinks(doc, ad, "carbon-sidebar");
	const media = el(doc, "span", "carbon-sidebar__media");
	const img = el(doc, "img", "carbon-sidebar__image");
	img.src = ad.largeImage;
	img.alt = ad.company;
	img.width = 176;
	img.height = 176;
	media.append(img);

	const body = el(doc, "span", "carbon-sidebar__body");
	if (ad.title) body.append(el(doc, "span", "carbon-sidebar__title", ad.title));
	body.append(
		el(doc, "span", "carbon-sidebar__description", ad.description),
		el(doc, "span", "carbon-sidebar__cta", ad.callToAction),
	);
	main.append(media, body);
	unit.append(main, label);
	return unit;
}

// ---------------------------------------------------------------------------
// Viewability
// ---------------------------------------------------------------------------

export interface ViewabilityEnv {
	IntersectionObserver: typeof IntersectionObserver;
	setTimeout: (fn: () => void, ms: number) => unknown;
	clearTimeout: (id: unknown) => void;
	document: Pick<
		Document,
		"visibilityState" | "addEventListener" | "removeEventListener"
	>;
}

/**
 * Call `onView` once, after at least half of `target` has been continuously
 * visible for one second while the document is visible. Dropping below the
 * threshold (or hiding the tab) resets the clock. Returns a disposer.
 */
export function trackViewability(
	target: Element,
	onView: () => void,
	env: ViewabilityEnv,
): () => void {
	let inView = false;
	let done = false;
	let timer: unknown;

	const stopTimer = () => {
		if (timer !== undefined) env.clearTimeout(timer);
		timer = undefined;
	};

	const update = () => {
		if (done) return;
		if (inView && env.document.visibilityState === "visible") {
			if (timer !== undefined) return;
			timer = env.setTimeout(() => {
				timer = undefined;
				dispose();
				onView();
			}, VIEW_DURATION_MS);
		} else {
			stopTimer();
		}
	};

	const observer = new env.IntersectionObserver(
		(entries) => {
			// Several transitions can be batched; only the latest one matters.
			const latest = entries.filter((e) => e.target === target).at(-1);
			if (!latest) return;
			inView =
				latest.isIntersecting && latest.intersectionRatio >= VIEW_THRESHOLD;
			update();
		},
		{ threshold: VIEW_THRESHOLD },
	);

	function dispose() {
		if (done) return;
		done = true;
		stopTimer();
		observer.disconnect();
		env.document.removeEventListener("visibilitychange", update);
	}

	observer.observe(target);
	env.document.addEventListener("visibilitychange", update);
	return dispose;
}

// ---------------------------------------------------------------------------
// Slot lifecycle
// ---------------------------------------------------------------------------

export interface CarbonEnv extends ViewabilityEnv {
	document: Document;
	window: Pick<Window, "addEventListener" | "matchMedia">;
	fetch: typeof fetch;
	beacon: (url: string) => void;
	production: boolean;
	timeoutMs?: number;
}

const SLOT_SELECTOR = "[data-carbon-slot]";

function isFormat(value: string | undefined): value is CarbonFormat {
	return value === "top-bar" || value === "sidebar";
}

/**
 * Discover every ad slot in the document and load each eligible one exactly
 * once for this document view. Slots start `hidden`, so with JavaScript
 * disabled (or on no-fill/failure) they take up no space.
 *
 * A slot with `data-carbon-media` is only requested once that media query
 * matches; it is never re-requested on later resizes. In-flight requests are
 * aborted on `pagehide`. A page restored from the back/forward cache is the
 * same document view: rendered creatives stay, an unfinished view timer
 * resumes, and nothing is re-requested.
 *
 * Returns a teardown function (used by tests; the browser relies on
 * `pagehide`).
 */
export function startCarbonAds(env: CarbonEnv): () => void {
	const controllers = new Set<AbortController>();
	const disposers = new Set<() => void>();
	const mediaCleanups = new Set<() => void>();
	let torn = false;

	const collapse = (slot: HTMLElement) => {
		slot.hidden = true;
		slot.removeAttribute("data-carbon-state");
		slot.replaceChildren();
	};

	const load = async (slot: HTMLElement, format: CarbonFormat) => {
		if (torn) return;
		const controller = new AbortController();
		controllers.add(controller);
		const timeout = env.setTimeout(
			() => controller.abort(),
			env.timeoutMs ?? REQUEST_TIMEOUT_MS,
		);
		slot.hidden = false;
		slot.dataset.carbonState = "loading";

		let ad: CarbonAd | null = null;
		try {
			const res = await env.fetch(carbonRequestUrl(format, env.production), {
				cache: "no-store",
				credentials: "omit",
				signal: controller.signal,
			});
			if (res.ok) ad = parseCarbonResponse(format, await res.json());
		} catch {
			// Network failure, blocked request, timeout or malformed JSON.
		} finally {
			env.clearTimeout(timeout);
			controllers.delete(controller);
		}

		if (!ad || torn || controller.signal.aborted || !slot.isConnected) {
			collapse(slot);
			return;
		}

		const unit = renderCarbonAd(env.document, ad);
		slot.replaceChildren(unit);
		slot.dataset.carbonState = "filled";
		const statview = ad.statview;
		const dispose = trackViewability(unit, () => env.beacon(statview), env);
		disposers.add(dispose);
	};

	for (const slot of env.document.querySelectorAll<HTMLElement>(
		SLOT_SELECTOR,
	)) {
		const format = slot.dataset.carbonSlot;
		if (!isFormat(format) || slot.dataset.carbonInit === "true") continue;
		slot.dataset.carbonInit = "true";

		const media = slot.dataset.carbonMedia;
		if (!media) {
			void load(slot, format);
			continue;
		}
		const mql = env.window.matchMedia(media);
		if (mql.matches) {
			void load(slot, format);
			continue;
		}
		const onChange = (event: MediaQueryListEvent) => {
			if (!event.matches) return;
			cleanup();
			void load(slot, format);
		};
		const cleanup = () => {
			mql.removeEventListener("change", onChange);
			mediaCleanups.delete(cleanup);
		};
		mql.addEventListener("change", onChange);
		mediaCleanups.add(cleanup);
	}

	const teardown = (full: boolean) => {
		for (const controller of controllers) controller.abort();
		if (!full) return;
		torn = true;
		for (const dispose of disposers) dispose();
		for (const cleanup of mediaCleanups) cleanup();
		disposers.clear();
	};

	env.window.addEventListener("pagehide", (event: PageTransitionEvent) => {
		// A persisted page may come back from the bfcache as the same view,
		// so keep its rendered creative and viewability tracking alive.
		teardown(!event.persisted);
	});

	return () => teardown(true);
}

let started = false;

/** Browser entry point. Safe to call repeatedly and on pages without slots. */
export function initCarbonAds(options: { production: boolean }): void {
	if (started || typeof window === "undefined") return;
	started = true;
	if (!document.querySelector(SLOT_SELECTOR)) return;
	startCarbonAds({
		document,
		window,
		fetch: window.fetch.bind(window),
		IntersectionObserver: window.IntersectionObserver,
		setTimeout: (fn, ms) => window.setTimeout(fn, ms),
		clearTimeout: (id) => window.clearTimeout(id as number),
		beacon: (url) => {
			new Image().src = url;
		},
		production: options.production,
	});
}
