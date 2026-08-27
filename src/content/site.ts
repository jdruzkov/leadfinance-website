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
