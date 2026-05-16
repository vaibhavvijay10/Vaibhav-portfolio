import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";

// Route-level code splitting: HomePage and BlogPostPage are downloaded only
// when the user actually visits that route. Cuts the initial JS bundle that
// every first-paint depends on.
const HomePage = lazy(() => import("./pages/HomePage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Analytics />
          <SpeedInsights />
          <Suspense fallback={null}>
            <Switch>
              <Route path="/blog/:slug">
                {(params) => <BlogPostPage slug={params.slug} />}
              </Route>
              <Route path="/" component={HomePage} />
              <Route>
                <HomePage />
              </Route>
            </Switch>
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
