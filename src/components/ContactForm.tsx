import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        toast.error("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      // Create mailto link with form data
      const mailtoLink = `mailto:vvvj.14@gmail.com?subject=${encodeURIComponent(
        `[Contact Form] ${formData.subject} - From: ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      // Open default email client
      window.location.href = mailtoLink;

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      toast.success("Opening your email client to send the message...");
    } catch (error) {
      toast.error("Failed to process form. Please try again.");
      console.error("Form error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 border border-border shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="w-6 h-6 text-accent" />
        <h3 className="text-2xl font-bold text-foreground">Send Me a Message</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
            Your Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g., Growth Strategy Consultation"
            className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project, goals, or inquiry..."
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent hover:bg-accent/90 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Mail size={20} />
              Send Message
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Your message will be sent to vvvj.14@gmail.com
        </p>
      </form>
    </div>
  );
}
