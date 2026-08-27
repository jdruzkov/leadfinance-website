export type Service = {
  slug: string;
  title: string;
  /** Short label used in compact places like nav and cards. */
  short: string;
  /** Meta description, carried over from the existing site. */
  description: string;
  /** Lead paragraph shown at the top of the service page and on the card. */
  summary: string;
  /** Supporting detail paragraph shown on the service page. */
  detail: string;
};

export const services: Service[] = [
  {
    slug: "financial-management-reporting",
    title: "Financial Management & Reporting",
    short: "Management Reporting",
    description:
      "A tailored management reporting system giving clear visibility into revenue, margins, cost efficiency, and cash flow for your growing business.",
    summary:
      "We build a customized management reporting system tailored to your business. Gain clear visibility into revenue, margins, and cost efficiency while enabling active cash flow management. Focused on management insight and performance control.",
    detail:
      "We integrate all entities into one unified financial reporting framework, enabling both subsidiary and group-level reporting regardless of industry, country of operation, or accounting software used.",
  },
  {
    slug: "financial-planning-forecasting-budgeting",
    title: "Financial Planning, Forecasting & Budgeting",
    short: "Planning & Forecasting",
    description:
      "Structured financial planning, forecasting, and budgeting that keeps pace with your growth and supports confident business decisions.",
    summary:
      "Structured financial planning and budgeting tailored to your business strategy and long-term growth. Includes annual budgeting, rolling forecasts, scenario planning, and actual vs budget/forecast analysis to support informed decisions at management and board level.",
    detail:
      "Provides leadership with a clear financial framework, stronger risk management, and the ability to respond early to deviations, changes and other challenges.",
  },
  {
    slug: "cash-flow-management",
    title: "Cash Flow Management",
    short: "Cash Flow",
    description:
      "Stay in control of your runway. Cash flow planning and management that shows how much runway you have and where it is going.",
    summary:
      "Structured cash flow management with ongoing runway monitoring and scenario-based forward planning, enabling early identification of liquidity risks and assessment of funding needs.",
    detail:
      "We implement a systematic approach to cash flow management that connects operational planning with financial forecasting. This includes rolling cash flow models, working capital optimization, timing of payables and receivables, and scenario analysis to assess impact of growth, delays, or downturns on liquidity. The objective is to ensure management always has a clear, forward-looking view of the company's cash position and funding requirements.",
  },
  {
    slug: "financial-metrics-dashboards",
    title: "Financial Metrics Dashboards",
    short: "Dashboards",
    description:
      "Custom financial dashboards that turn raw data into live, easy-to-read insight on the KPIs driving your business performance.",
    summary:
      "Design of customized financial and performance dashboards providing real-time performance visibility combined with trend-based analysis. Structured around the value drivers of SaaS, hybrid, and project-based business models. Enables structured performance monitoring and data-driven decision-making.",
    detail:
      "We build dashboards that translate raw financial data into actionable visual insights, covering KPIs such as revenue growth, gross margin, burn rate, EBITDA, and working capital efficiency. Dashboard architecture is designed for management use, enabling fast decision-making, board-level communication, and investor updates in a single, consistent view.",
  },
  {
    slug: "investor-reporting",
    title: "Investor Reporting",
    short: "Investor Reporting",
    description:
      "Investor and board reporting you can trust. Clear financials, projections, and dashboards built around what your investors need to see.",
    summary:
      "Preparation of investor reports, financial materials, projections, and performance dashboards in a format aligned with investor and board expectations, with full support throughout due diligence processes.",
    detail:
      "We structure financial reporting packages that communicate business performance clearly to external stakeholders, covering historical financials, forward-looking projections, variance analysis, and key operational metrics. Our approach is built around what investors and board members actually need to evaluate performance and make decisions, ensuring your reporting builds credibility and trust at every stage of the company lifecycle.",
  },
  {
    slug: "grants-project-financing",
    title: "Grants & Project Financing",
    short: "Grants & Financing",
    description:
      "Financial structuring for national and EU funding programs. Grant applications secured, structured, and kept compliant through the whole project.",
    summary:
      "Financial structuring and budgeting for national and international funding programs, including EAS and EU schemes, covering application design, co-financing modeling, compliance monitoring, and audit readiness.",
    detail:
      "We support companies in preparing financially sound grant applications and managing funded projects through their full lifecycle. This includes project budget construction, eligible cost categorization, co-financing structure, cash flow planning aligned to grant disbursements, and preparation for financial audits. Our work ensures that funding applications are credible, compliant, and optimized for approval, and that project execution meets all financial reporting requirements.",
  },
  {
    slug: "procurement-tender-financial-advisory",
    title: "Procurement & Tender Financial Advisory",
    short: "Tender Advisory",
    description:
      "Financial advisory for tenders and procurement. Build a stronger, more competitive bid backed by sound financial modeling and structure.",
    summary:
      "Advisory support for financial structuring and documentation in public and private tender processes, including pricing strategy, cost modeling, financial eligibility review, and bid preparation.",
    detail:
      "We assist companies in constructing competitive and compliant financial submissions for tenders, ensuring that pricing is grounded in accurate cost modeling and clearly justified within the bid documentation. Our support covers financial eligibility verification, fee structure design, subcontracting cost allocation, and review of financial terms and conditions within tender specifications. The goal is to maximize the financial competitiveness of your bid while minimizing risk of disqualification on financial grounds.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
