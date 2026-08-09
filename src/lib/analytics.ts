/**
 * Google Analytics 4 configuration.
 *
 * To activate GA4 tracking:
 *   1. Create a GA4 property at https://analytics.google.com
 *   2. Get the Measurement ID (format: G-XXXXXXXXXX)
 *   3. Paste it into GA_MEASUREMENT_ID below
 *   4. Commit + push. Tracking starts within minutes.
 *
 * When GA_MEASUREMENT_ID is empty (the default), no gtag script loads and
 * nothing tracks — safe to ship with the placeholder value.
 *
 * The ID is public (visible in page source and network requests to any
 * visitor) so committing it to git is safe. It's not a secret.
 */

// Paste your GA4 Measurement ID here to activate tracking.
// Format must start with "G-". Example: "G-8A1B2C3D4E"
export const GA_MEASUREMENT_ID = "G-QCS95HX7JM";

/** True if a valid-looking Measurement ID is configured. */
export function isGAEnabled(): boolean {
  return (
    typeof GA_MEASUREMENT_ID === "string" &&
    GA_MEASUREMENT_ID.startsWith("G-") &&
    GA_MEASUREMENT_ID.length >= 10
  );
}

/**
 * Send a page_view event to GA4 (used on SPA route changes).
 * A no-op if GA is not enabled or gtag hasn't loaded yet.
 */
export function trackPageView(url: string, title?: string): void {
  if (!isGAEnabled()) return;
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;

  gtag("event", "page_view", {
    page_location: url,
    page_title: title ?? document.title,
    page_path: new URL(url, window.location.origin).pathname,
    send_to: GA_MEASUREMENT_ID,
  });
}

/**
 * Send a custom event to GA4. Use for conversions like "email_clicked",
 * "whatsapp_clicked", "resume_downloaded", "article_read", etc.
 *
 * Example:
 *   trackEvent("email_clicked", { location: "hero" })
 *   trackEvent("resume_downloaded", { source: "footer" })
 */
export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean> = {}
): void {
  if (!isGAEnabled()) return;
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;

  gtag("event", name, params);
}
