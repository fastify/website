import assert from "node:assert/strict";
import { beforeEach, describe, test } from "node:test";
import { JSDOM } from "jsdom";
import {
	type CarbonEnv,
	carbonRequestUrl,
	parseCarbonResponse,
	renderCarbonAd,
	safeColor,
	safeUrl,
	startCarbonAds,
	trackViewability,
} from "../src/lib/carbon-ads.ts";

// --- Fixtures ---------------------------------------------------------------

const topBarAd = () => ({
	company: "Acme",
	description: "Ship faster with Acme.",
	callToAction: "Try it",
	backgroundColor: "#112233",
	textColor: "#ffffff",
	ctaBackgroundColor: "#ffffff",
	ctaTextColor: "#112233",
	image: "https://cdn4.buysellads.net/acme-128.png",
	statlink: "https://srv.carbonads.net/ads/click/x/ABC/ignore/yes",
	statview: "https://srv.carbonads.net/ads/viewable/x/ABC",
	ad_via_link: "http://openjsf.bsa-whitelabel.com/checkout/new/?a=1&b=2",
	statimp: "https://srv.carbonads.net/ads/imp/x/ABC",
	somethingNew: { ignored: true },
});

const sidebarAd = () => ({
	company: "Acme",
	description: "Ship faster with Acme.",
	callToAction: "Learn more",
	backgroundColor: "#112233",
	textColor: "#ffffff",
	largeImage: "https://cdn4.buysellads.net/acme-500.png",
	title: "Acme Cloud",
	statlink: "https://srv.carbonads.net/ads/click/x/DEF",
	statview: "https://srv.carbonads.net/ads/viewable/x/DEF",
	ad_via_link: "https://openjsf.bsa-whitelabel.com/",
});

// --- Fake browser primitives -------------------------------------------------

class FakeClock {
	now = 0;
	private timers = new Map<number, { at: number; fn: () => void }>();
	private nextId = 1;
	setTimeout = (fn: () => void, ms: number) => {
		const id = this.nextId++;
		this.timers.set(id, { at: this.now + ms, fn });
		return id;
	};
	clearTimeout = (id: unknown) => {
		this.timers.delete(id as number);
	};
	advance(ms: number) {
		const end = this.now + ms;
		for (;;) {
			const due = [...this.timers.entries()]
				.filter(([, t]) => t.at <= end)
				.sort((a, b) => a[1].at - b[1].at)[0];
			if (!due) break;
			this.timers.delete(due[0]);
			this.now = due[1].at;
			due[1].fn();
		}
		this.now = end;
	}
	get pending() {
		return this.timers.size;
	}
}

type IOCallback = (entries: IntersectionObserverEntry[]) => void;

function fakeIntersectionObserver() {
	const instances: FakeIO[] = [];
	class FakeIO {
		targets = new Set<Element>();
		disconnected = false;
		callback: IOCallback;
		constructor(callback: IOCallback) {
			this.callback = callback;
			instances.push(this);
		}
		observe(target: Element) {
			this.targets.add(target);
		}
		disconnect() {
			this.disconnected = true;
			this.targets.clear();
		}
		emit(...ratios: number[]) {
			const [target] = this.targets;
			if (!target) return;
			this.callback(
				ratios.map(
					(ratio) =>
						({
							target,
							isIntersecting: ratio > 0,
							intersectionRatio: ratio,
						}) as IntersectionObserverEntry,
				),
			);
		}
	}
	return {
		IO: FakeIO as unknown as typeof IntersectionObserver,
		instances,
		last: () => instances[instances.length - 1],
	};
}

function fakeMediaQuery(initial: boolean) {
	const listeners = new Set<(e: MediaQueryListEvent) => void>();
	const mql = {
		matches: initial,
		addEventListener: (_: string, fn: (e: MediaQueryListEvent) => void) =>
			listeners.add(fn),
		removeEventListener: (_: string, fn: (e: MediaQueryListEvent) => void) =>
			listeners.delete(fn),
		set(matches: boolean) {
			mql.matches = matches;
			for (const fn of [...listeners]) fn({ matches } as MediaQueryListEvent);
		},
		listeners,
	};
	return mql;
}

const flush = () => new Promise((resolve) => setImmediate(resolve));

// --- Validation ---------------------------------------------------------------

describe("carbonRequestUrl", () => {
	test("uses ignore=yes unless explicitly production", () => {
		assert.equal(
			carbonRequestUrl("top-bar", false),
			"https://srv.carbonads.net/ads/CWBI45QW.json?ignore=yes",
		);
		assert.equal(
			carbonRequestUrl("sidebar", false),
			"https://srv.carbonads.net/ads/CWBI45QI.json?ignore=yes",
		);
		assert.equal(
			carbonRequestUrl("top-bar", true),
			"https://srv.carbonads.net/ads/CWBI45QW.json",
		);
	});
});

describe("safeUrl", () => {
	test("accepts https and upgrades http and protocol-relative", () => {
		assert.equal(safeUrl("https://a.test/x?y=1"), "https://a.test/x?y=1");
		assert.equal(safeUrl("http://a.test/x?y=1"), "https://a.test/x?y=1");
		assert.equal(safeUrl("//a.test/x"), "https://a.test/x");
	});
	test("preserves the string exactly", () => {
		const raw = "https://srv.carbonads.net/ads/click/x/AB%2fC/ignore/yes";
		assert.equal(safeUrl(raw), raw);
	});
	test("rejects other schemes and junk", () => {
		for (const bad of [
			"javascript:alert(1)",
			"JaVaScRiPt:alert(1)",
			"data:text/html,x",
			"/relative/path",
			"relative",
			"https://",
			"",
			null,
			42,
		]) {
			assert.equal(safeUrl(bad), null, String(bad));
		}
	});
});

describe("safeColor", () => {
	test("accepts 3, 4, 6 and 8 digit hex", () => {
		for (const ok of ["#fff", "#ffff", "#FF57E9", "#ff57e980"]) {
			assert.equal(safeColor(ok), ok);
		}
	});
	test("rejects anything else", () => {
		for (const bad of [
			"fff",
			"#ff",
			"#fffff",
			"red",
			"#fff;background:url(x)",
			"rgb(0,0,0)",
			undefined,
		]) {
			assert.equal(safeColor(bad), null, String(bad));
		}
	});
});

describe("parseCarbonResponse", () => {
	test("parses a valid Top Bar ad and ignores unknown fields", () => {
		const ad = parseCarbonResponse("top-bar", { ads: [topBarAd(), {}] });
		assert.ok(ad && ad.format === "top-bar");
		assert.equal(ad.description, "Ship faster with Acme.");
		assert.equal(
			ad.adViaLink,
			"https://openjsf.bsa-whitelabel.com/checkout/new/?a=1&b=2",
		);
		assert.equal(ad.statlink, topBarAd().statlink);
		assert.equal("somethingNew" in ad, false);
	});

	test("parses a valid Sidebar ad", () => {
		const ad = parseCarbonResponse("sidebar", { ads: [sidebarAd()] });
		assert.ok(ad && ad.format === "sidebar");
		assert.equal(ad.title, "Acme Cloud");
		assert.equal(ad.largeImage, sidebarAd().largeImage);
	});

	test("no-fill and malformed shapes return null", () => {
		for (const json of [
			null,
			undefined,
			"string",
			{},
			{ ads: null },
			{ ads: [] },
			{ ads: [null] },
			{ ads: [{}] },
			{ ads: "nope" },
		]) {
			assert.equal(parseCarbonResponse("top-bar", json), null);
		}
	});

	const topBarRequired = [
		"company",
		"description",
		"callToAction",
		"backgroundColor",
		"textColor",
		"ctaBackgroundColor",
		"ctaTextColor",
		"image",
		"statlink",
		"statview",
		"ad_via_link",
	];
	for (const field of topBarRequired) {
		test(`Top Bar without ${field} is rejected`, () => {
			const raw: Record<string, unknown> = topBarAd();
			delete raw[field];
			assert.equal(parseCarbonResponse("top-bar", { ads: [raw] }), null);
			raw[field] = "   ";
			assert.equal(parseCarbonResponse("top-bar", { ads: [raw] }), null);
		});
	}

	test("Sidebar requires largeImage, not image", () => {
		const raw: Record<string, unknown> = sidebarAd();
		delete raw.largeImage;
		raw.image = "https://cdn4.buysellads.net/x.png";
		assert.equal(parseCarbonResponse("sidebar", { ads: [raw] }), null);
	});

	test("unsafe URLs and colours are rejected", () => {
		assert.equal(
			parseCarbonResponse("top-bar", {
				ads: [{ ...topBarAd(), statlink: "javascript:alert(1)" }],
			}),
			null,
		);
		assert.equal(
			parseCarbonResponse("top-bar", {
				ads: [{ ...topBarAd(), backgroundColor: "red;x:url(y)" }],
			}),
			null,
		);
	});

	test("missing or invalid dark colours fall back to light", () => {
		const ad = parseCarbonResponse("top-bar", {
			ads: [{ ...topBarAd(), textColorDark: "nope" }],
		});
		assert.ok(ad && ad.format === "top-bar");
		assert.equal(ad.colors.backgroundDark, "#112233");
		assert.equal(ad.colors.textDark, "#ffffff");
		assert.equal(ad.cta.backgroundDark, "#ffffff");
	});

	test("optional Sidebar title may be absent", () => {
		const raw: Record<string, unknown> = sidebarAd();
		delete raw.title;
		const ad = parseCarbonResponse("sidebar", { ads: [raw] });
		assert.ok(ad && ad.format === "sidebar");
		assert.equal(ad.title, null);
	});
});

// --- Rendering ----------------------------------------------------------------

describe("renderCarbonAd", () => {
	const { document } = new JSDOM("<!doctype html><body></body>").window;

	test("Top Bar renders full copy, image, CTA and a separate label", () => {
		const ad = parseCarbonResponse("top-bar", {
			ads: [
				{
					...topBarAd(),
					backgroundColorDark: "#000000",
					description: "<img src=x onerror=alert(1)> very long copy",
				},
			],
		});
		assert.ok(ad && ad.format === "top-bar");
		const unit = renderCarbonAd(document, ad);
		const links = unit.querySelectorAll("a");
		assert.equal(links.length, 2);
		const [main, label] = links;
		assert.equal(main.getAttribute("href"), ad.statlink);
		assert.equal(main.target, "_blank");
		assert.equal(main.rel, "sponsored noopener");
		assert.equal(label.textContent, "Ad");
		assert.equal(label.getAttribute("href"), ad.adViaLink);
		assert.equal(label.rel, "noopener");
		assert.equal(main.contains(label), false);

		const img = unit.querySelector("img");
		assert.equal(img?.getAttribute("src"), ad.image);
		assert.equal(img?.alt, "Acme");
		assert.equal(img?.width, 40);

		const desc = unit.querySelector(".carbon-top-bar__description");
		assert.equal(
			desc?.textContent,
			"<img src=x onerror=alert(1)> very long copy",
		);
		assert.equal(unit.querySelectorAll("img").length, 1);
		assert.equal(
			unit.querySelector(".carbon-top-bar__cta")?.textContent,
			"Try it",
		);
		assert.equal(
			unit.style.getPropertyValue("--carbon-bg"),
			"light-dark(#112233, #000000)",
		);
		assert.equal(unit.style.getPropertyValue("--carbon-fg"), "#ffffff");
	});

	test("Sidebar renders title when present and nothing when absent", () => {
		const withTitle = parseCarbonResponse("sidebar", { ads: [sidebarAd()] });
		assert.ok(withTitle && withTitle.format === "sidebar");
		const unit = renderCarbonAd(document, withTitle);
		assert.equal(
			unit.querySelector(".carbon-sidebar__title")?.textContent,
			"Acme Cloud",
		);
		assert.equal(
			unit.querySelector("img")?.getAttribute("src"),
			withTitle.largeImage,
		);

		const raw: Record<string, unknown> = sidebarAd();
		delete raw.title;
		const noTitle = parseCarbonResponse("sidebar", { ads: [raw] });
		assert.ok(noTitle);
		const bare = renderCarbonAd(document, noTitle);
		assert.equal(bare.querySelector(".carbon-sidebar__title"), null);
	});
});

// --- Viewability ----------------------------------------------------------------

describe("trackViewability", () => {
	let clock: FakeClock;
	let io: ReturnType<typeof fakeIntersectionObserver>;
	let doc: {
		visibilityState: DocumentVisibilityState;
		listeners: Set<() => void>;
		addEventListener: (t: string, fn: () => void) => void;
		removeEventListener: (t: string, fn: () => void) => void;
		setVisibility: (v: DocumentVisibilityState) => void;
	};
	let views: number;
	let dispose: () => void;
	const target = {} as Element;

	beforeEach(() => {
		clock = new FakeClock();
		io = fakeIntersectionObserver();
		const listeners = new Set<() => void>();
		doc = {
			visibilityState: "visible",
			listeners,
			addEventListener: (_, fn) => listeners.add(fn),
			removeEventListener: (_, fn) => listeners.delete(fn),
			setVisibility(v) {
				doc.visibilityState = v;
				for (const fn of [...listeners]) fn();
			},
		};
		views = 0;
		dispose = trackViewability(
			target,
			() => {
				views++;
			},
			{
				IntersectionObserver: io.IO,
				setTimeout: clock.setTimeout,
				clearTimeout: clock.clearTimeout,
				document: doc as unknown as Document,
			},
		);
	});

	test("49% visible for more than a second: no beacon", () => {
		io.last().emit(0.49);
		clock.advance(5000);
		assert.equal(views, 0);
	});

	test("50% visible for 999ms: no beacon", () => {
		io.last().emit(0.5);
		clock.advance(999);
		assert.equal(views, 0);
	});

	test("50% visible for 1000ms: exactly one beacon, then disconnects", () => {
		io.last().emit(0.5);
		clock.advance(1000);
		assert.equal(views, 1);
		assert.equal(io.last().disconnected, true);
		io.last().emit(1);
		clock.advance(5000);
		assert.equal(views, 1);
	});

	test("dropping below threshold resets; re-entry needs a full second", () => {
		io.last().emit(0.6);
		clock.advance(800);
		io.last().emit(0.3);
		clock.advance(500);
		io.last().emit(0.7);
		clock.advance(999);
		assert.equal(views, 0);
		clock.advance(1);
		assert.equal(views, 1);
	});

	test("only the latest entry of a batch counts", () => {
		io.last().emit(0.9, 0.1);
		clock.advance(2000);
		assert.equal(views, 0);
		io.last().emit(0.1, 0.9);
		clock.advance(1000);
		assert.equal(views, 1);
	});

	test("disposing before completion prevents the beacon", () => {
		io.last().emit(1);
		clock.advance(500);
		dispose();
		clock.advance(5000);
		assert.equal(views, 0);
		assert.equal(clock.pending, 0);
		assert.equal(doc.listeners.size, 0);
	});

	test("a hidden document accrues no view time", () => {
		io.last().emit(1);
		clock.advance(600);
		doc.setVisibility("hidden");
		clock.advance(5000);
		assert.equal(views, 0);
		doc.setVisibility("visible");
		clock.advance(999);
		assert.equal(views, 0);
		clock.advance(1);
		assert.equal(views, 1);
	});

	test("an element that never intersects (hidden sidebar) never counts", () => {
		io.last().emit(0);
		clock.advance(10_000);
		assert.equal(views, 0);
	});
});

// --- Slot lifecycle ----------------------------------------------------------

describe("startCarbonAds", () => {
	function setup(
		html: string,
		{
			wide = true,
			respond = (url: string): unknown =>
				url.includes("CWBI45QW")
					? { ads: [topBarAd()] }
					: { ads: [sidebarAd()] },
		}: { wide?: boolean; respond?: (url: string) => unknown } = {},
	) {
		const dom = new JSDOM(`<!doctype html><body>${html}</body>`, {
			pretendToBeVisual: true,
		});
		const { document } = dom.window;
		const clock = new FakeClock();
		const io = fakeIntersectionObserver();
		const mql = fakeMediaQuery(wide);
		const requests: string[] = [];
		const beacons: string[] = [];
		const pageListeners: ((e: PageTransitionEvent) => void)[] = [];
		const env: CarbonEnv = {
			document,
			window: {
				matchMedia: () => mql as unknown as MediaQueryList,
				addEventListener: ((_: string, fn: (e: PageTransitionEvent) => void) =>
					pageListeners.push(fn)) as Window["addEventListener"],
			},
			fetch: (async (input: string, init?: RequestInit) => {
				requests.push(input);
				assert.equal(init?.cache, "no-store");
				const body = respond(input);
				if (body instanceof Error) throw body;
				if (body === "500") return { ok: false, json: async () => ({}) };
				if (body === "malformed")
					return {
						ok: true,
						json: async () => {
							throw new SyntaxError("bad json");
						},
					};
				return { ok: true, json: async () => body };
			}) as unknown as typeof fetch,
			IntersectionObserver: io.IO,
			setTimeout: clock.setTimeout,
			clearTimeout: clock.clearTimeout,
			beacon: (url) => beacons.push(url),
			production: false,
		};
		const pagehide = (persisted: boolean) => {
			for (const fn of pageListeners) fn({ persisted } as PageTransitionEvent);
		};
		return { document, env, clock, io, mql, requests, beacons, pagehide };
	}

	const TOP = `<aside data-carbon-slot="top-bar" hidden></aside>`;
	const SIDE = `<div data-carbon-slot="sidebar" data-carbon-media="(min-width: 80rem)" hidden></div>`;

	test("no slots: no requests (homepage, 404, redirect)", async () => {
		const t = setup("<main>hello</main>");
		startCarbonAds(t.env);
		await flush();
		assert.equal(t.requests.length, 0);
	});

	test("wide docs with TOC: only the Sidebar is requested", async () => {
		const t = setup(TOP + SIDE);
		startCarbonAds(t.env);
		await flush();
		assert.deepEqual(t.requests, [
			"https://srv.carbonads.net/ads/CWBI45QI.json?ignore=yes",
		]);
		const [top, side] =
			t.document.querySelectorAll<HTMLElement>("[data-carbon-slot]");
		assert.equal(top.hidden, true);
		assert.equal(top.childElementCount, 0);
		assert.equal(side.hidden, false);
		assert.equal(side.dataset.carbonState, "filled");
		assert.ok(side.querySelector(".carbon-sidebar"));
	});

	test("narrow docs: only the Top Bar; resizing never adds a second ad", async () => {
		const t = setup(TOP + SIDE, { wide: false });
		startCarbonAds(t.env);
		await flush();
		assert.deepEqual(t.requests, [
			"https://srv.carbonads.net/ads/CWBI45QW.json?ignore=yes",
		]);
		const side = t.document.querySelector<HTMLElement>(
			'[data-carbon-slot="sidebar"]',
		);
		assert.equal(side?.hidden, true);

		t.mql.set(true);
		t.mql.set(false);
		t.mql.set(true);
		await flush();
		assert.equal(t.requests.length, 1);
		assert.equal(side?.hidden, true);
		assert.equal(t.mql.listeners.size, 0);
	});

	test("page with only a Top Bar slot requests it", async () => {
		const t = setup(TOP);
		startCarbonAds(t.env);
		await flush();
		assert.deepEqual(t.requests, [
			"https://srv.carbonads.net/ads/CWBI45QW.json?ignore=yes",
		]);
	});

	test("repeated initialisation does not add requests", async () => {
		const t = setup(TOP + SIDE);
		startCarbonAds(t.env);
		startCarbonAds(t.env);
		await flush();
		assert.equal(t.requests.length, 1);
	});

	for (const [name, body] of [
		["no-fill", { ads: [{}] }],
		["empty array", { ads: [] }],
		["HTTP error", "500"],
		["malformed JSON", "malformed"],
		["blocked request", new TypeError("Failed to fetch")],
	] as const) {
		test(`${name} collapses the slot`, async () => {
			const t = setup(TOP, { respond: () => body });
			startCarbonAds(t.env);
			const slot = t.document.querySelector<HTMLElement>("[data-carbon-slot]");
			assert.equal(slot?.dataset.carbonState, "loading");
			await flush();
			assert.equal(slot?.hidden, true);
			assert.equal(slot?.childElementCount, 0);
			assert.equal(slot?.dataset.carbonState, undefined);
			assert.equal(t.requests.length, 1, "no retries");
		});
	}

	test("teardown while pending does not render", async () => {
		const t = setup(TOP);
		const teardown = startCarbonAds(t.env);
		teardown();
		await flush();
		const slot = t.document.querySelector<HTMLElement>("[data-carbon-slot]");
		assert.equal(slot?.hidden, true);
		assert.equal(slot?.childElementCount, 0);
	});

	test("a detached slot is not rendered into", async () => {
		const t = setup(TOP);
		startCarbonAds(t.env);
		t.document.querySelector("[data-carbon-slot]")?.remove();
		await flush();
		assert.equal(t.io.instances.length, 0);
	});

	test("timeout aborts and collapses", async () => {
		const t = setup(TOP);
		t.env.fetch = ((_: string, init?: RequestInit) =>
			new Promise((_resolve, reject) => {
				init?.signal?.addEventListener("abort", () =>
					reject(new DOMException("aborted", "AbortError")),
				);
			})) as unknown as typeof fetch;
		startCarbonAds(t.env);
		t.clock.advance(5000);
		await flush();
		const slot = t.document.querySelector<HTMLElement>("[data-carbon-slot]");
		assert.equal(slot?.hidden, true);
	});

	test("viewability fires statview once per unit", async () => {
		const t = setup(TOP);
		startCarbonAds(t.env);
		await flush();
		const unit = t.document.querySelector(".carbon-top-bar");
		const observer = t.io.last() as unknown as {
			targets: Set<Element>;
			emit: (r: number) => void;
		};
		assert.ok(unit && observer.targets.has(unit), "observes the creative");
		observer.emit(1);
		t.clock.advance(1000);
		observer.emit(1);
		t.clock.advance(1000);
		assert.deepEqual(t.beacons, [topBarAd().statview]);
	});

	test("bfcache pagehide keeps the creative and its view tracking", async () => {
		const t = setup(TOP);
		startCarbonAds(t.env);
		await flush();
		const observer = t.io.last() as unknown as { emit: (r: number) => void };
		t.pagehide(true);
		assert.ok(t.document.querySelector(".carbon-top-bar"));
		observer.emit(1);
		t.clock.advance(1000);
		assert.equal(t.beacons.length, 1);
		assert.equal(t.requests.length, 1);
	});

	test("unloading pagehide stops view tracking", async () => {
		const t = setup(TOP);
		startCarbonAds(t.env);
		await flush();
		const observer = t.io.last() as unknown as { emit: (r: number) => void };
		observer.emit(1);
		t.clock.advance(500);
		t.pagehide(false);
		t.clock.advance(5000);
		assert.equal(t.beacons.length, 0);
	});
});
