export const site = {
  name: "LeadFinance OÜ",
  shortName: "LeadFinance",
  url: "https://leadfinance.eu",
  tagline: "Financial clarity for growing companies",
  description:
    "LeadFinance OÜ builds management reporting, forecasting, and cash flow systems that give founders and boards a clear, forward-looking view of the business.",
  // TODO: replace with the real public contact address before launch.
  email: "info@leadfinance.eu",
  locale: "en",
  country: "Estonia",
} as const;

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

/**
 * Single source for the About copy.
 *
 * `summary` is the short practice-level version shown in the landing-page
 * section, which links through to the full page. `body` is the founder's
 * own text, used verbatim on /about.
 */
export const about = {
  title: "About",
  description:
    "Lolita, founder of LeadFinance — a finance leader with more than twelve years of experience across auditing, business controlling, and financial planning and analysis.",

  founder: {
    name: "Lolita",
    role: "Founder, LeadFinance",
    alt: "Lolita, founder of LeadFinance",
    // The image itself is imported in the About page so the bundler emits it
    // under /_next, which is the only path that picks up basePath on export.
  },

  summary: [
    "LeadFinance OÜ is an Estonian financial management practice working with growing companies across Estonia and the wider EU. We act as the finance function that scaling businesses need but do not yet have in-house.",
    "Our work spans SaaS, hybrid, and project-based business models — from building the first real management reporting system, through budgeting and cash flow planning, to investor reporting and grant compliance.",
  ],

  body: [
    "I am Lolita, founder of LeadFinance and a finance leader with more than twelve years of experience across auditing, business controlling, and financial planning and analysis. Today I serve as Head of Finance, leading the finance function for fast-growing technology companies. I founded LeadFinance to help founders and management teams see the full picture, where finance and business strategy meet.",
    "I have worked closely with fast-growing, innovation-led companies across a range of industries, such as deep tech and manufacturing, and in markets including the Nordics, the DACH region, and the UK. In the tech sector, my experience spans different business models, including SaaS, hybrid, and on-premise software and hardware. Many have been venture-backed and accountable to international boards. Across these engagements I have partnered with banks, venture capital funds, and international investors to deliver the reporting, analysis, and financial discipline that leadership can rely on.",
    "My expertise covers consolidated management and statutory reporting under local and international standards, budgeting and rolling forecasts, cash flow and runway planning, and investor reporting. I also help companies secure the financing they need to grow, and prepare the financial models, projections, and materials behind capital raising and M&A.",
    "My approach combines strong financial skills with practical business sense. I interpret figures, translate them into plain language for business and sales teams, and turn financial data into decisions leadership can act on. The result is a clear, professional financial overview of your whole company, always ready when it matters most.",
    "I hold a master's degree from Tallinn University of Technology (Corporate Finance) and a bachelor's degree from the University of Tartu (Economics, Finance and Accounting), both awarded cum laude. My education also includes business studies at Mannheim Business School in Germany, one of Europe's leading business schools.",
  ],

  facts: [
    { k: "Experience", v: "12+ years in finance leadership" },
    { k: "Markets", v: "Nordics, DACH & the UK" },
    { k: "Sectors", v: "Deep tech, manufacturing & SaaS" },
    { k: "Education", v: "TalTech & Tartu, both cum laude" },
  ],
} as const;
