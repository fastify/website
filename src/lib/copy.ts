export const COPY_REVERT_MS = 1600;
export const COPY_BTN_SELECTOR = "[data-copy-btn]";

export async function copyText(text: string): Promise<boolean> {
	// Async Clipboard API is gated behind a secure context (HTTPS or
	// localhost); fall back to execCommand when unavailable.
	try {
		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(text);
			return true;
		}
	} catch (_) {
		// Permission denied or API blocked — fall through.
	}
	try {
		const ta = document.createElement("textarea");
		ta.value = text;
		ta.setAttribute("readonly", "");
		ta.style.position = "absolute";
		ta.style.left = "-9999px";
		document.body.appendChild(ta);
		ta.select();
		const ok = document.execCommand("copy");
		document.body.removeChild(ta);
		return ok;
	} catch (_) {
		return false;
	}
}

export function resolveCopyText(btn: HTMLElement): string {
	const literal = btn.getAttribute("data-copy-text");
	if (literal != null && literal !== "") return literal;

	const targetSel = btn.getAttribute("data-copy-target");
	const root = btn.closest<HTMLElement>("[data-copy-root]");
	if (targetSel && root) {
		const el = root.querySelector<HTMLElement>(targetSel);
		if (el) return el.textContent ?? "";
	}

	if (root) {
		const code =
			root.querySelector<HTMLElement>("pre code") ??
			root.querySelector<HTMLElement>("pre") ??
			root.querySelector<HTMLElement>("code");
		if (code) return code.textContent ?? "";
	}
	const pre = btn.closest<HTMLElement>("pre");
	if (pre) {
		return pre.querySelector("code")?.textContent ?? pre.textContent ?? "";
	}
	return "";
}

export function flashCopyState(btn: HTMLElement): void {
	// icon-swap: idle/done spans; label-swap: a single label whose text
	// is swapped. Driven by whichever elements are present in the DOM.
	const idle = btn.querySelector<HTMLElement>("[data-copy-idle]");
	const done = btn.querySelector<HTMLElement>("[data-copy-done]");
	if (idle && done) {
		idle.classList.add("hidden");
		done.classList.remove("hidden");
		setTimeout(() => {
			idle.classList.remove("hidden");
			done.classList.add("hidden");
		}, COPY_REVERT_MS);
		return;
	}
	const label = btn.querySelector<HTMLElement>("[data-copy-label]");
	if (label) {
		const original = label.textContent ?? "";
		label.textContent = "Copied";
		setTimeout(() => {
			label.textContent = original;
		}, COPY_REVERT_MS);
	}
}

export function wireCopyButton(btn: HTMLElement): void {
	btn.addEventListener("click", async () => {
		const text = resolveCopyText(btn);
		if (!text) return;
		const ok = await copyText(text);
		if (!ok) return;
		flashCopyState(btn);
	});
}
