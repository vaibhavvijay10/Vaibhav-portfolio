import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";

// Route-level code splitting: each page is downloaded only when its route
// is visited. Keeps the initial JS bundle minimal for first paint.
const HomePage = lazy(() => import("./pages/HomePage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const TopicPage = lazy(() => import("./pages/TopicPage"));

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
              <Route path="/topics/:slug">
                {(params) => <TopicPage slug={params.slug} />}
              </Route>
              <Route path="/about" component={AboutPage} />
              <Route path="/services" component={ServicesPage} />
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
