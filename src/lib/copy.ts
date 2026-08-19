const COPY_REVERT_MS = 1600;
const COPY_BTN_SELECTOR = "[data-copy-btn]";
const resetTimers = new WeakMap<HTMLButtonElement, number>();

let initialized = false;
let announcer: HTMLElement | null = null;

function resolveCopyText(button: HTMLButtonElement): string {
	const literal = button.getAttribute("data-copy-text");
	if (literal !== null) return literal;

	const root = button.closest<HTMLElement>("[data-copy-root]");
	const targetSelector = button.getAttribute("data-copy-target");
	if (root && targetSelector) {
		return root.querySelector<HTMLElement>(targetSelector)?.textContent ?? "";
	}

	const code =
		root?.querySelector<HTMLElement>("pre code") ??
		root?.querySelector<HTMLElement>("pre") ??
		root?.querySelector<HTMLElement>("code");
	return code?.textContent ?? "";
}

function getAnnouncer(): HTMLElement {
	if (announcer) return announcer;

	announcer = document.createElement("span");
	announcer.className = "sr-only";
	announcer.setAttribute("aria-live", "polite");
	announcer.setAttribute("aria-atomic", "true");
	document.body.appendChild(announcer);
	return announcer;
}

function announce(message: string): void {
	const region = getAnnouncer();
	region.textContent = "";
	window.requestAnimationFrame(() => {
		region.textContent = message;
	});
}

function showCopied(button: HTMLButtonElement): void {
	const idle = button.querySelector<HTMLElement>("[data-copy-idle]");
	const done = button.querySelector<HTMLElement>("[data-copy-done]");
	const label = button.querySelector<HTMLElement>("[data-copy-label-text]");
	const copyLabel = button.dataset.copyLabel ?? "Copy";
	const copiedLabel = button.dataset.copiedLabel ?? "Copied";

	const currentTimer = resetTimers.get(button);
	if (currentTimer !== undefined) window.clearTimeout(currentTimer);

	idle?.classList.add("hidden");
	done?.classList.remove("hidden");
	if (label) label.textContent = copiedLabel;
	announce(copiedLabel);

	const timer = window.setTimeout(() => {
		idle?.classList.remove("hidden");
		done?.classList.add("hidden");
		if (label) label.textContent = copyLabel;
		resetTimers.delete(button);
	}, COPY_REVERT_MS);
	resetTimers.set(button, timer);
}

async function handleCopyClick(event: MouseEvent): Promise<void> {
	if (!(event.target instanceof Element)) return;
	const button = event.target.closest<HTMLButtonElement>(COPY_BTN_SELECTOR);
	if (!button) return;

	const text = resolveCopyText(button);
	if (!text) return;

	try {
		await navigator.clipboard.writeText(text);
		showCopied(button);
	} catch (_) {
		// Clipboard access can be denied by the browser or user.
	}
}

export function initCopyButtons(): void {
	if (initialized) return;
	initialized = true;
	getAnnouncer();
	document.addEventListener("click", handleCopyClick);
}
