# QRIM — Simple by design. Precise by nature.
Client-side QR Code generator. Next.js (App Router), TypeScript, Tailwind CSS, `qrcode`, Lucide React.

## Run
```
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
No environment variables, backend, database, or analytics.

## How it works
- `lib/qr.ts` normalizes input (adds `https://` when no scheme is typed; path, query and fragment are never altered) and checks colour contrast.
- `components/App.tsx` renders the preview with `qrcode.toDataURL`; PNG export re-renders at the chosen size, SVG export uses `qrcode.toString({type:"svg"})`. Everything runs in the browser.
- `lib/i18n.ts` holds the EN / 简体中文 / Русский dictionaries; the choice is saved in `localStorage`.
- Logo: `public/qrim-logo.png` and `app/icon.png` are derived from the supplied wordmark (transparent, forest green).

## Deploy to Vercel
Push to GitHub, go to vercel.com/new, import the repo, Deploy (Next.js is auto-detected). Later updates: `git push`.
