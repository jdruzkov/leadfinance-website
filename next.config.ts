import type { NextConfig } from "next";

/*
 * GitHub Pages serves static files only, so the site is exported ahead of time.
 *
 * On a project page the site lives under https://<user>.github.io/<repo>/, and
 * every asset and link has to carry that prefix. The deploy workflow sets
 * NEXT_PUBLIC_BASE_PATH accordingly. Moving to a custom domain (leadfinance.eu)
 * means dropping that variable so the prefix goes back to empty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Emits about/index.html rather than about.html, which Pages serves at /about/.
  trailingSlash: true,
  images: {
    // The optimizer needs a server; a static export has none.
    unoptimized: true,
  },
};

export default nextConfig;
