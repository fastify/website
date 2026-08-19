// Shared clipboard helper. Returned to true when text was successfully
// written to the user's clipboard, false otherwise. Callers use the return
// value to decide whether to flash the "copied" feedback state.
export const COPY_REVERT_MS = 1600;
export const COPY_BTN_SELECTOR = "[data-copy-btn]";

export async function copyText(text: string): Promise<boolean> {
	// Modern path: async Clipboard API. Gated behind a secure context (HTTPS
	// or localhost), so we may need to fall back below.
	try {
		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(text);
			return true;
		}
	} catch (_) {
		// Permission denied or API blocked — fall through to the legacy path.
	}

	// Legacy fallback: temporary off-screen textarea + execCommand("copy").
	// Used on plain-HTTP origins and older browsers where the async Clipboard
	// API is unavailable or requires a permission prompt we can't satisfy.
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

// Resolve what text a copy button should write to the clipboard.
//
// Priority:
//   1. `data-copy-text` on the button (a literal string passed at render).
//   2. `data-copy-target` selector resolved against the nearest
//      [data-copy-root] ancestor (lets the host pick a sub-element, e.g.
//      CodeTabs selects the hidden raw text of the active tab).
//   3. The first <pre><code> / <pre> / <code> inside the root, or —
//      defensively — inside the closest <pre> ancestor.
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

// Flash the "copied" feedback on a button. The visual is driven by which
// optional DOM hooks are present in the button:
//   - icon-swap variant:  [data-copy-idle] + [data-copy-done] spans
//   - label-swap variant:  a single [data-copy-label] whose textContent
//     is replaced for `COPY_REVERT_MS`, then reverted.
export function flashCopyState(btn: HTMLElement): void {
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

// Attach the click → copy behavior to a single button. Static markup
// (CopyButton.astro) wires all existing buttons via querySelectorAll;
// DocsShell.astro wires each button it dynamically injects.
export function wireCopyButton(btn: HTMLElement): void {
	btn.addEventListener("click", async () => {
		const text = resolveCopyText(btn);
		if (!text) return;
		const ok = await copyText(text);
		if (!ok) return;
		flashCopyState(btn);
	});
}
