import { Mail, Linkedin, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "./ContactForm";

export default function Contact() {
  const phoneNumber = "+919982267285";
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=Hi%20Vaibhav%2C%20I%20would%20like%20to%20discuss%20a%20growth%20opportunity.`;

  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "#f8fafb" }}>

      {/* === SVG BACKGROUND GRAPHIC === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="contactGrad" cx="100%" cy="100%" r="60%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#contactGrad)" />
          {/* Concentric rings bottom-right */}
          <circle cx="100%" cy="100%" r="350" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.08" />
          <circle cx="100%" cy="100%" r="260" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.07" />
          <circle cx="100%" cy="100%" r="170" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.06" />
          {/* Diagonal lines top-left */}
          <line x1="0" y1="0" x2="25%" y2="100%" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.05" />
          <line x1="5%" y1="0" x2="30%" y2="100%" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.04" />
          {/* Dot grid top-center */}
          <pattern id="contactDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#0891b2" fillOpacity="0.09" />
          </pattern>
          <rect x="30%" y="0" width="40%" height="30%" fill="url(#contactDots)" />
        </svg>
      </div>

      <div className="relative z-10 container max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="accent-line mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Let's Connect</h2>
          <p className="text-lg text-muted-foreground">Open to opportunities, collaborations, and conversations about growth</p>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Get in Touch</h3>
            <div className="space-y-3">
              <a href="mailto:vvvj.14@gmail.com" className="flex items-start gap-4 p-4 rounded-xl bg-white hover:bg-accent/5 border border-border/50 transition-colors duration-200 group shadow-sm">
                <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Email</h4>
                  <p className="text-muted-foreground text-sm">vvvj.14@gmail.com</p>
                </div>
              </a>

              <a href={`tel:${phoneNumber}`} className="flex items-start gap-4 p-4 rounded-xl bg-white hover:bg-accent/5 border border-border/50 transition-colors duration-200 group shadow-sm">
                <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Phone</h4>
                  <p className="text-muted-foreground text-sm">{phoneNumber}</p>
                </div>
              </a>

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-xl bg-white hover:bg-accent/5 border border-border/50 transition-colors duration-200 group shadow-sm">
                <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">WhatsApp</h4>
                  <p className="text-muted-foreground text-sm">{phoneNumber}</p>
                </div>
              </a>

              <a href="https://linkedin.com/in/vaibhavvijay10" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-xl bg-white hover:bg-accent/5 border border-border/50 transition-colors duration-200 group shadow-sm">
                <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors flex-shrink-0">
                  <Linkedin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">LinkedIn</h4>
                  <p className="text-muted-foreground text-sm">linkedin.com/in/vaibhavvijay10</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-border/50 shadow-sm">
                <div className="p-3 bg-accent/10 rounded-lg flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Location</h4>
                  <p className="text-muted-foreground text-sm">India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Work Together */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Why Work Together?</h3>
            <div className="space-y-4">
              {[
                { title: "7+ Years of Expertise", desc: "Proven experience scaling startups and driving growth across acquisition, retention, and revenue" },
                { title: "Data-Driven Approach", desc: "Every decision backed by analytics and measurable results" },
                { title: "Hands-On Execution", desc: "Not just strategy—I roll up my sleeves and execute across all channels" },
                { title: "Full-Funnel Expertise", desc: "From 0-to-1 launches to scaling established brands across all growth levers" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-border/50 shadow-sm">
                  <span className="text-accent font-bold text-lg mt-0.5">✓</span>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mb-12">
          <ContactForm />
        </div>

        {/* CTA Banner */}
        <div className="relative bg-foreground text-white rounded-2xl p-8 text-center space-y-4 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <circle cx="0" cy="50%" r="200" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.06" />
              <circle cx="100%" cy="50%" r="200" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.06" />
              <pattern id="ctaDots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" fillOpacity="0.04" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#ctaDots)" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold relative z-10">Ready to Scale?</h3>
          <p className="text-lg opacity-90 relative z-10">Let's discuss how I can help drive growth for your business</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 font-semibold rounded-lg">
              <a href="mailto:vvvj.14@gmail.com">Email Me</a>
            </Button>
            <Button className="bg-white text-foreground hover:bg-gray-100 px-8 py-3 font-semibold rounded-lg">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">WhatsApp Me</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
