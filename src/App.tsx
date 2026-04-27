import { useRef, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const heroRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const blogRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      home: heroRef,
      about: aboutRef,
      experience: experienceRef,
      skills: skillsRef,
      blog: blogRef,
      contact: contactRef,
    };

    const ref = refs[section];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = () => {
    handleNavigate("contact");
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "home", ref: heroRef },
        { id: "about", ref: aboutRef },
        { id: "experience", ref: experienceRef },
        { id: "skills", ref: skillsRef },
        { id: "blog", ref: blogRef },
        { id: "contact", ref: contactRef },
      ];

      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex">
            {/* Sidebar Navigation */}
            <Navigation
              onNavigate={handleNavigate}
              activeSection={activeSection}
            />

            {/* Main Content */}
            <main className="flex-1 md:ml-20">
              <div ref={heroRef}>
                <Hero onContactClick={handleContactClick} />
              </div>

              <div ref={aboutRef}>
                <About />
              </div>

              <div ref={experienceRef}>
                <Experience />
              </div>

              <div ref={skillsRef}>
                <Skills />
              </div>

              <div ref={blogRef}>
                <Blog />
              </div>

              <div ref={contactRef}>
                <Contact />
              </div>

              <Footer />
            </main>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
