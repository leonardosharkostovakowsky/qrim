"use client";
import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { Copy, Download, RotateCcw, Instagram } from "lucide-react";
import { dictionaries, langNames, type Lang } from "@/lib/i18n";
import { contrastOk, isHex, normalizeUrl, suggestName } from "@/lib/qr";

type Ecc = "L" | "M" | "Q" | "H";
const DEFAULTS = { fg: "#173D30", bg: "#FFFFFF", size: 1024, ecc: "M" as Ecc, margin: 4 };
const IG = "https://www.instagram.com/iaamramadhan/";

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const id = label.replace(/\s/g, "");
  return (
    <div>
      <label className="label" htmlFor={id}>{label}</label>
      <div className="flex items-center gap-3">
        <input type="color" aria-label={label} value={isHex(value) ? value : "#000000"} onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="h-9 w-9 shrink-0 cursor-pointer border border-charcoal/30 bg-transparent p-0.5" />
        <input id={id} className="field font-mono uppercase" value={value} maxLength={7} spellCheck={false}
          onChange={(e) => onChange(e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value)} />
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [input, setInput] = useState("");
  const [fg, setFg] = useState(DEFAULTS.fg);
  const [bg, setBg] = useState(DEFAULTS.bg);
  const [size, setSize] = useState(DEFAULTS.size);
  const [ecc, setEcc] = useState<Ecc>(DEFAULTS.ecc);
  const [margin, setMargin] = useState(DEFAULTS.margin);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState("");
  const [toast, setToast] = useState("");
  const t = dictionaries[lang];

  useEffect(() => {
    try { const s = localStorage.getItem("qrim-lang") as Lang | null; if (s && s in dictionaries) setLang(s); } catch {}
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const { url, empty } = useMemo(() => normalizeUrl(input), [input]);
  const colorsValid = isHex(fg) && isHex(bg);
  const lowContrast = colorsValid && !contrastOk(fg, bg);
  const opts = useMemo(() => ({
    errorCorrectionLevel: ecc, margin, color: { dark: colorsValid ? fg : DEFAULTS.fg, light: colorsValid ? bg : DEFAULTS.bg },
  }), [ecc, margin, fg, bg, colorsValid]);

  useEffect(() => {
    if (!url) { setPreview(""); return; }
    let live = true;
    QRCode.toDataURL(url, { ...opts, width: 640 }).then((d) => live && setPreview(d)).catch(() => live && setPreview(""));
    return () => { live = false; };
  }, [url, opts]);

  const notify = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2200); };
  const save = (href: string, ext: string) => {
    const a = document.createElement("a");
    a.href = href; a.download = `${(name.trim() || suggestName(url!)).replace(/[\\/:*?"<>|]/g, "-")}.${ext}`;
    document.body.appendChild(a); a.click(); a.remove(); notify(t.downloaded);
  };
  const dlPng = async () => url && save(await QRCode.toDataURL(url, { ...opts, width: size }), "png");
  const dlSvg = async () => {
    if (!url) return;
    const svg = await QRCode.toString(url, { ...opts, type: "svg", width: size });
    const blob = new Blob([svg], { type: "image/svg+xml" }); const href = URL.createObjectURL(blob);
    save(href, "svg"); setTimeout(() => URL.revokeObjectURL(href), 1000);
  };
  const copy = async () => { if (url) { try { await navigator.clipboard.writeText(url); notify(t.copied); } catch {} } };
  const reset = () => { setInput(""); setFg(DEFAULTS.fg); setBg(DEFAULTS.bg); setSize(DEFAULTS.size); setEcc(DEFAULTS.ecc); setMargin(DEFAULTS.margin); setName(""); };
  const pick = (l: Lang) => { setLang(l); try { localStorage.setItem("qrim-lang", l); } catch {} };
  const btn = "inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed";

  return (
    <>
      <header className="border-b border-charcoal/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#top" aria-label="QRIM"><img src="/qrim-logo.png" alt="QRIM" className="h-7 w-auto" /></a>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#generator" className="hidden hover:text-forest sm:inline">{t.generator}</a>
            <a href="#about" className="hidden hover:text-forest sm:inline">{t.about}</a>
            <select aria-label={t.language} value={lang} onChange={(e) => pick(e.target.value as Lang)}
              className="cursor-pointer border-b border-charcoal/30 bg-transparent py-1 text-sm">
              {(Object.keys(langNames) as Lang[]).map((l) => <option key={l} value={l}>{langNames[l]}</option>)}
            </select>
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-6">
        <section className="py-16 md:py-24">
          <h1 className="max-w-3xl font-serif text-5xl font-medium leading-[1.05] text-forest md:text-7xl">{t.title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/75">{t.lead}</p>
        </section>

        <section id="generator" className="grid gap-12 border-t border-charcoal/15 py-12 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div className="space-y-8">
            <div>
              <label className="label" htmlFor="url">{t.url}</label>
              <input id="url" type="text" inputMode="url" autoComplete="off" spellCheck={false} value={input}
                onChange={(e) => setInput(e.target.value)} placeholder={t.placeholder} aria-invalid={!empty && !url}
                className="field font-serif text-2xl" />
              <p role="status" className={`mt-2 min-h-5 text-sm ${!empty && !url ? "text-red-800" : "text-olive"}`}>
                {!empty && !url ? t.invalid : ""}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <ColorField label={t.fg} value={fg} onChange={setFg} />
              <ColorField label={t.bg} value={bg} onChange={setBg} />
            </div>
            {lowContrast && <p role="alert" className="border-l-2 border-champagne pl-3 text-sm text-charcoal/80">{t.contrast}</p>}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="label" htmlFor="size">{t.size}</label>
                <select id="size" className="field" value={size} onChange={(e) => setSize(+e.target.value)}>
                  {[512, 1024, 2048, 4096].map((s) => <option key={s} value={s}>{s} × {s}</option>)}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="margin">{t.margin}: {margin}</label>
                <input id="margin" type="range" min={4} max={10} value={margin} onChange={(e) => setMargin(+e.target.value)} className="w-full accent-forest" />
              </div>
            </div>
            <fieldset>
              <legend className="label">{t.ecc}</legend>
              <div className="flex border border-charcoal/30">
                {(["L", "M", "Q", "H"] as Ecc[]).map((l) => (
                  <label key={l} className={`flex-1 cursor-pointer py-2 text-center text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-forest ${ecc === l ? "bg-forest text-ivory" : "hover:bg-forest/10"}`}>
                    <input type="radio" name="ecc" className="sr-only" checked={ecc === l} onChange={() => setEcc(l)} />{l}
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label className="label" htmlFor="fname">{t.filename}</label>
              <input id="fname" className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder={url ? suggestName(url) : "qrim"} />
            </div>
            <button onClick={reset} className="inline-flex items-center gap-2 text-sm text-olive hover:text-forest">
              <RotateCcw size={14} aria-hidden /> {t.reset}
            </button>
          </div>

          <div className="md:border-l md:border-charcoal/15 md:pl-16">
            <p className="label">{t.preview}{url ? ` · ${size} × ${size}` : ""}</p>
            <div className="flex aspect-square w-full items-center justify-center border border-charcoal/15" style={{ background: preview && colorsValid ? bg : "transparent" }}>
              {preview ? <img src={preview} alt={`QR Code: ${url}`} className="h-full w-full" /> :
                <p className="max-w-[16rem] text-center text-sm text-olive">{t.empty}</p>}
            </div>
            {url && <p className="mt-3 break-all text-xs text-olive">{url}</p>}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button onClick={dlPng} disabled={!url} className={`${btn} bg-forest text-ivory hover:bg-forest/90`}><Download size={16} aria-hidden />{t.png}</button>
              <button onClick={dlSvg} disabled={!url} className={`${btn} border border-forest text-forest hover:bg-forest/10`}><Download size={16} aria-hidden />{t.svg}</button>
            </div>
            <button onClick={copy} disabled={!url} className="mt-4 inline-flex items-center gap-2 text-sm text-olive hover:text-forest disabled:opacity-30"><Copy size={14} aria-hidden />{t.copy}</button>
            <p className="mt-8 text-xs leading-relaxed text-olive">{t.privacy}</p>
          </div>
        </section>

        <section id="about" className="grid gap-6 border-t border-charcoal/15 py-16 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <h2 className="font-serif text-3xl text-forest">{t.aboutTitle}</h2>
          <p className="max-w-md leading-relaxed text-charcoal/80">{t.aboutText}</p>
        </section>
      </main>

      <footer className="border-t border-charcoal/15">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div>
            <img src="/qrim-logo.png" alt="QRIM" className="h-6 w-auto" />
            <p className="mt-4 font-serif text-lg italic text-charcoal/80">{t.tagline}</p>
            <p className="mt-1 text-sm text-olive">{t.footerDesc}</p>
          </div>
          <div className="space-y-2 text-sm text-charcoal/80">
            <p>{t.creator}</p>
            <a href={IG} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-forest"><Instagram size={14} aria-hidden />Instagram: @iaamramadhan</a>
            <p className="pt-3 text-xs text-olive">{t.ai}</p>
          </div>
        </div>
      </footer>

      <div aria-live="polite" className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2">
        {toast && <p className="bg-charcoal px-4 py-2 text-sm text-ivory">{toast}</p>}
      </div>
    </>
  );
}
