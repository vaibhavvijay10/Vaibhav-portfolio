import { useEffect } from "react";
import { useLocation } from "wouter";
import { GA_MEASUREMENT_ID, isGAEnabled, trackPageView } from "@/lib/analytics";

/**
 * Loads the GA4 gtag script once and tracks pageviews on every SPA route
 * change. Renders nothing.
 *
 * Safe to always mount: if GA_MEASUREMENT_ID is empty (the shipped default),
 * this component is a total no-op — no script loads, no dataLayer, nothing
 * touches the DOM.
 */
export default function GoogleAnalytics() {
  const [location] = useLocation();

  // Inject gtag script + initialize once on first mount
  useEffect(() => {
    if (!isGAEnabled()) return;
    if (document.getElementById("ga-gtag-script")) return;

    // 1. Load gtag.js asynchronously
    const script = document.createElement("script");
    script.id = "ga-gtag-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // 2. Initialize dataLayer + gtag wrapper
    const w = window as unknown as {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    w.dataLayer = w.dataLayer ?? [];
    // Using `arguments` here matches Google's official gtag.js snippet exactly.
    // eslint-disable-next-line prefer-rest-params
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
    w.gtag("js", new Date());
    // send_page_view: false because we handle SPA pageviews below via wouter's
    // location changes. If we left it true, GA would double-count the first view.
    w.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

    // Fire the initial pageview manually
    trackPageView(window.location.href, document.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track on every subsequent route change
  useEffect(() => {
    if (!isGAEnabled()) return;
    if (!document.getElementById("ga-gtag-script")) return;
    // Small delay so document.title has been updated by the destination page's
    // useEffect (BlogPostPage, AboutPage, etc. set title on mount)
    const t = window.setTimeout(() => {
      trackPageView(window.location.href, document.title);
    }, 100);
    return () => window.clearTimeout(t);
  }, [location]);

  return null;
}
