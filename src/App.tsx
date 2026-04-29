import { Route, Switch } from "wouter";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import BlogPostPage from "./pages/BlogPostPage";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Analytics />
          <SpeedInsights />
          <Switch>
            <Route path="/blog/:slug">
              {(params) => <BlogPostPage slug={params.slug} />}
            </Route>
            <Route path="/" component={HomePage} />
            <Route>
              <HomePage />
            </Route>
          </Switch>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
