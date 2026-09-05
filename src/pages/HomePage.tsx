import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const heroRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const blogRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    home: heroRef,
    about: aboutRef,
    experience: experienceRef,
    skills: skillsRef,
    projects: projectsRef,
    blog: blogRef,
    contact: contactRef,
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const ref = refs[section];
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactClick = () => handleNavigate("contact");

  // Scroll to hash on initial load (e.g., navigating to /#about from a blog post)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && refs[hash]?.current) {
      setTimeout(() => {
        refs[hash].current?.scrollIntoView({ behavior: "smooth" });
        setActiveSection(hash);
      }, 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "home", ref: heroRef },
        { id: "about", ref: aboutRef },
        { id: "experience", ref: experienceRef },
        { id: "skills", ref: skillsRef },
        { id: "projects", ref: projectsRef },
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
    <div className="flex">
      <Navigation onNavigate={handleNavigate} activeSection={activeSection} />

      <main className="flex-1 md:ml-20">
        <div ref={heroRef} id="home">
          <Hero onContactClick={handleContactClick} />
        </div>

        <div ref={aboutRef} id="about">
          <About />
        </div>

        <div ref={experienceRef} id="experience">
          <Experience />
        </div>

        <div ref={skillsRef} id="skills">
          <Skills />
        </div>

        <div ref={projectsRef} id="projects">
          <Projects />
        </div>

        <div ref={blogRef} id="blog">
          <Blog />
        </div>

        <div ref={contactRef} id="contact">
          <Contact />
        </div>

        <Footer />
      </main>
    </div>
  );
}
