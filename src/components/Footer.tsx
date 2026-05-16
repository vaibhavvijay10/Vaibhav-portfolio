import { Linkedin, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappLink = `https://wa.me/919982267285?text=Hi%20Vaibhav%2C%20I%20would%20like%20to%20discuss%20a%20growth%20opportunity.`;

  return (
    <footer className="relative bg-foreground text-white py-12 overflow-hidden">
      {/* SVG background graphic */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <pattern id="footerDots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="white" fillOpacity="0.04" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footerDots)" />
          <circle cx="0" cy="0" r="300" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.05" />
          <circle cx="100%" cy="100%" r="250" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.10" />
          <circle cx="100%" cy="100%" r="160" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.08" />
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="1" strokeOpacity="0.03" />
        </svg>
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Vaibhav Vijay</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Head of Growth &amp; Performance Marketing Leader
            </p>
          </div>

          {/* Pages */}
          <div className="space-y-4">
            <h4 className="font-semibold">Pages</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-accent transition-colors text-sm">About</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors text-sm">Services</a></li>
              <li><a href="/#blog" className="hover:text-accent transition-colors text-sm">Articles</a></li>
              <li><a href="/#contact" className="hover:text-accent transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Topics */}
          <div className="space-y-4">
            <h4 className="font-semibold">Topics</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/topics/ai-and-aeo" className="hover:text-accent transition-colors text-sm">AI &amp; AEO</a></li>
              <li><a href="/topics/performance-marketing" className="hover:text-accent transition-colors text-sm">Performance Marketing</a></li>
              <li><a href="/topics/retention-and-lifecycle" className="hover:text-accent transition-colors text-sm">Retention &amp; CRM</a></li>
              <li><a href="/topics/automation-and-operations" className="hover:text-accent transition-colors text-sm">Automation</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex gap-3">
              <a href="mailto:vvvj.14@gmail.com" aria-label="Email Vaibhav Vijay" className="p-3 bg-accent/20 rounded-lg hover:bg-accent transition-colors" title="Email">
                <Mail size={18} aria-hidden="true" />
              </a>
              <a href="https://linkedin.com/in/vaibhavvijay10" target="_blank" rel="noopener noreferrer" aria-label="Vaibhav Vijay on LinkedIn (opens in new tab)" className="p-3 bg-accent/20 rounded-lg hover:bg-accent transition-colors" title="LinkedIn">
                <Linkedin size={18} aria-hidden="true" />
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="Message Vaibhav Vijay on WhatsApp (opens in new tab)" className="p-3 bg-accent/20 rounded-lg hover:bg-accent transition-colors" title="WhatsApp">
                <MessageCircle size={18} aria-hidden="true" />
              </a>
            </div>
            <a
              href="/Resume-VaibhavVijay.pdf"
              download
              className="inline-block mt-2 text-sm text-accent hover:text-accent/80 underline underline-offset-4 transition-colors"
            >
              Download Resume →
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>© {currentYear} Vaibhav Vijay. All rights reserved.</p>
            <p>Crafted for growth-driven professionals</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
