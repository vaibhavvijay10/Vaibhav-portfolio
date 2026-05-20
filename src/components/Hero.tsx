import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white">

      {/* === SVG BACKGROUND GRAPHIC === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="heroGrad1" cx="80%" cy="20%" r="50%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heroGrad2" cx="10%" cy="80%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Background gradient blobs */}
          <rect width="100%" height="100%" fill="url(#heroGrad1)" />
          <rect width="100%" height="100%" fill="url(#heroGrad2)" />
          {/* Decorative circles */}
          <circle cx="92%" cy="8%" r="180" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.12" />
          <circle cx="92%" cy="8%" r="120" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.10" />
          <circle cx="92%" cy="8%" r="60" fill="#0891b2" fillOpacity="0.06" />
          <circle cx="5%" cy="90%" r="140" fill="none" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.10" />
          <circle cx="5%" cy="90%" r="80" fill="#06b6d4" fillOpacity="0.05" />
          {/* Diagonal accent lines */}
          <line x1="0" y1="100%" x2="30%" y2="0" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.06" />
          <line x1="5%" y1="100%" x2="35%" y2="0" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.04" />
          <line x1="70%" y1="100%" x2="100%" y2="30%" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.06" />
          {/* Small dots grid pattern */}
          <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#0891b2" fillOpacity="0.10" />
          </pattern>
          <rect x="60%" y="0" width="40%" height="50%" fill="url(#dots)" />
          <rect x="0" y="60%" width="25%" height="40%" fill="url(#dots)" />
        </svg>
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center py-8 sm:py-16 min-h-screen">

        {/* Tagline */}
        <div className="mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm font-semibold text-accent tracking-widest uppercase">
            Product Manager &middot; Head of Growth &middot; GTM Strategy
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-3 sm:mb-4">
          Vaibhav Vijay
        </h1>

        {/* Subtitle — shorter on mobile */}
        <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-5 sm:mb-6">
          <span className="hidden sm:inline">
            7+ years building consumer and platform products at the intersection of product, growth, and GTM. Led 0-to-1 launches, scaled brands from $0 to $3.5M, and ship AI-led product experiences across lifecycle, paid, and analytics.
          </span>
          <span className="sm:hidden">
            7+ years at the intersection of product, growth &amp; AI. 0-to-1 launches, $0 to $3.5M scaled, AI-led product experiences.
          </span>
        </p>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-8 py-4 sm:py-6 w-full max-w-xs sm:max-w-2xl mb-5 sm:mb-8">
          <div>
            <div className="text-2xl sm:text-4xl font-bold text-accent">7+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Years Exp.</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-bold text-accent">₹20Cr+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Revenue Scaled</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-bold text-accent">4</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Companies</div>
          </div>
        </div>

        {/* CTA Buttons — Equal width, Download CV first on mobile */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 justify-center w-full max-w-sm sm:max-w-none">
          <Button
            onClick={onContactClick}
            className="flex-1 sm:flex-none bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg h-12 sm:h-auto"
          >
            Get in Touch
            <ArrowRight size={15} className="hidden sm:inline" />
          </Button>
          <a
            href="/Resume-VaibhavVijay.pdf"
            download
            className="flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-semibold rounded-lg border-2 border-accent text-accent hover:bg-accent/10 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 h-12 sm:h-auto"
          >
            Download CV
            <ArrowRight size={15} className="hidden sm:inline" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
