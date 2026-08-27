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
│  ├─ services/[slug]/        one statically generated page per service
│  └─ api/contact/route.ts    lead-capture endpoint
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
- **Lead delivery** — `src/app/api/contact/route.ts` validates submissions and
  logs them server-side, but does not yet deliver them. Wire it to an email
  provider (Resend, Postmark) or a CRM before relying on the form.
- **Brand assets** — the header uses a typographic wordmark. The old site still
  hotlinks the Astra demo logo from `websitedemos.net`, so a real logo and
  favicon are still needed.
- **About section** — needs founder bio, credentials, and client references.
- **Legal** — privacy policy and imprint / company registry details.

## Deploying

The site is fully static apart from `/api/contact`. It deploys to Vercel with no
configuration; any Node host works via `npm run build && npm run start`.
