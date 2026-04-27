import { useState } from "react";
import {
  Home,
  User,
  Briefcase,
  Code2,
  Newspaper,
  Mail,
  Menu,
  X,
} from "lucide-react";

interface NavigationProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "blog", label: "Blog", icon: Newspaper },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Navigation({
  onNavigate,
  activeSection,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <nav className="hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-20 md:bg-foreground md:flex md:flex-col md:items-center md:justify-start md:py-8 md:gap-8 md:z-40 md:border-r md:border-border">
        {/* Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="w-12 h-12 rounded-lg bg-accent text-white font-bold text-lg hover:bg-accent/90 transition-colors duration-200 flex items-center justify-center"
        >
          VV
        </button>

        {/* Navigation Icons */}
        <div className="flex flex-col gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-accent text-white"
                    : "text-muted-foreground hover:bg-secondary/50"
                }`}
                title={item.label}
              >
                <Icon size={20} />
              </button>
            );
          })}
        </div>

        {/* Bottom Divider */}
        <div className="flex-1" />
        <div className="w-8 h-0.5 bg-border rounded-full" />
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden fixed inset-0 top-0 bg-foreground text-white z-40 flex flex-col items-center justify-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className="flex items-center gap-4 text-xl font-semibold hover:text-accent transition-colors"
              >
                <Icon size={24} />
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </>
  );
}
