export function normalizeUrl(raw: string): { url: string | null; empty: boolean } {
  const t = raw.trim();
  if (!t) return { url: null, empty: true };
  if (/\s/.test(t)) return { url: null, empty: false };
  const full = /^https?:\/\//i.test(t) ? t : /^[a-z][a-z0-9+.-]*:\/\//i.test(t) ? "" : `https://${t}`;
  if (!full) return { url: null, empty: false };
  try {
    const u = new URL(full);
    const ok = u.hostname === "localhost" || /^[^.]+(\.[^.]+)+$/.test(u.hostname);
    return { url: ok ? full : null, empty: false };
  } catch { return { url: null, empty: false }; }
}
const lum = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
// QR codes need dark modules on a light background and strong contrast to scan reliably.
export const contrastOk = (fg: string, bg: string) => {
  const a = lum(fg), b = lum(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) >= 4 && a < b;
};
export const isHex = (v: string) => /^#[0-9a-f]{6}$/i.test(v);
export const suggestName = (url: string) => {
  try { return "qrim-" + new URL(url).hostname.replace(/^www\./, "").replace(/[^\w-]/g, "-"); } catch { return "qrim"; }
};
