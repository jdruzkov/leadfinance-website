# leadfinance-website

Marketing site for **LeadFinance OÜ** — an Estonian financial management practice
(management reporting, forecasting, cash flow, investor reporting, grants and
tender advisory).

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
```

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx              root layout, fonts, metadata
│  ├─ page.tsx                landing page (hero, services, approach, about, contact)
│  ├─ globals.css             Tailwind v4 theme tokens
│  ├─ not-found.tsx           404
│  ├─ robots.ts               robots.txt
│  ├─ sitemap.ts              sitemap.xml
│  ├─ about/                  founder About page
│  └─ services/[slug]/        one statically generated page per service
├─ components/                Header, Footer, Hero, Section, ServicesGrid, ContactForm, …
├─ content/
│  ├─ site.ts                 site name, URL, nav, contact address
│  └─ services.ts             the seven services (single source of truth)
└─ lib/clsx.ts
```

### Editing content

Nearly all copy lives in [`src/content`](src/content). Adding an entry to
`services.ts` automatically creates its card on the landing page, its footer
link, and a statically generated page at `/services/<slug>` — no routing changes
needed.

## Design system

Tokens were carried over from the existing `leadfinance.eu` WordPress build
(Astra global palette) and are defined in `src/app/globals.css`:

| Token | Value | Use |
| --- | --- | --- |
| `teal-600` | `#1a6c7a` | primary / links / buttons |
| `navy-800` | `#153243` | headings, hero background |
| `navy-900` | `#000f2b` | footer |
| `ink` | `#3a3a3a` | body text |
| `teal-50` | `#f3f9fb` | tinted section background |

Headings use **Montserrat**, body copy uses **Inter**, both self-hosted via
`next/font`. Content max-width is 1200px.

## Before launch

A few things are deliberately left as placeholders:

- **Contact address** — `src/content/site.ts` uses `info@leadfinance.eu`; confirm
  the real address. The current WordPress site publishes no public contact details.
- **Lead delivery** — GitHub Pages cannot run a server, so the contact form
  validates in the browser and hands the enquiry to the visitor's mail client
  via `mailto:`. Swap `src/components/ContactForm.tsx` for a real endpoint
  (Resend, Postmark, Formspree) if the site moves to a host that runs Node.
- **Brand assets** — the header uses a typographic wordmark. The old site still
  hotlinks the Astra demo logo from `websitedemos.net`, so a real logo and
  favicon are still needed.
- **Client references** — the About page carries the founder bio and
  credentials; testimonials and named client references are still missing.
- **Legal** — privacy policy and imprint / company registry details.

## Deploying

The site is a fully static export (`output: "export"`), so `npm run build`
writes a self-contained `out/` directory.

### GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`,
and enables Pages itself on the first run. If that step is refused, set it by
hand in the **repository** settings (not the account ones) at
`https://github.com/<user>/leadfinance-website/settings/pages` ->
**Build and deployment** -> Source -> **GitHub Actions**.

The site is then served at `https://<user>.github.io/leadfinance-website/`.

A project page lives under a sub-path, so the build sets `NEXT_PUBLIC_BASE_PATH`
to the repository name and every asset and link picks up that prefix. To test
exactly what Pages will serve:

```bash
NEXT_PUBLIC_BASE_PATH=/leadfinance-website npm run build
mkdir -p _serve && cp -r out _serve/leadfinance-website
cd _serve && python -m http.server 4321
# open http://127.0.0.1:4321/leadfinance-website/
```

### Custom domain

For `leadfinance.eu` the site sits at the root: drop the `NEXT_PUBLIC_BASE_PATH`
env block from the workflow, add `public/CNAME` containing the domain, and point
DNS at GitHub Pages. Keep `public/.nojekyll` either way — without it Pages
strips the `_next` directory and every asset 404s.

### Anywhere else

Any static host serves `out/` directly.
