declare global {
  interface Window {
    __PORTFOLIO_API_URL__?: string;
  }
}

/**
 * Base URL of the Express API.
 * For a deployed site, set window.__PORTFOLIO_API_URL__ in index.html before the app starts.
 */
export const API_URL =
  (typeof window !== "undefined" && window.__PORTFOLIO_API_URL__) ||
  "http://localhost:3000/api";
