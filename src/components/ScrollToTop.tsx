import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Resets scroll position to the top whenever the route path changes.
 *
 * Exception: if the URL contains a hash anchor (e.g. /#blog), the hash
 * navigation should land on the section, so we leave scrolling alone and
 * let the HomePage's hash-anchor effect handle it.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}
