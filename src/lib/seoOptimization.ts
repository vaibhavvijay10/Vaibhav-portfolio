/**
 * SEO, GEO, and AEO Optimization for Vaibhav Vijay's Portfolio
 * 
 * This file contains all structured data, meta tags, and optimization strategies
 * to improve search engine visibility across Google, Bing, and AI search engines.
 */

// ============================================
// SEO STRUCTURED DATA (JSON-LD)
// ============================================

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Vaibhav Vijay",
  "jobTitle": "Head of Growth & Performance Marketing Leader",
  "url": "https://vaibhavvijay.com",
  "sameAs": [
    "https://linkedin.com/in/vaibhavvijay10",
    "https://twitter.com/vaibhavvijay",
  ],
  "email": "vvvj.14@gmail.com",
  "telephone": "+919982267285",
  "description": "7+ years of experience in growth marketing, performance marketing, and scaling startups",
  "image": "https://vaibhavvijay.com/profile.jpg",
  "knowsAbout": [
    "Growth Strategy",
    "Performance Marketing",
    "Lifecycle Marketing",
    "CRM",
    "Conversion Rate Optimization",
    "Go-to-Market Strategy",
    "Meta Ads",
    "Google Ads",
    "Apple Search Ads",
    "ASO",
    "Analytics",
  ],
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vaibhav Vijay - Growth & Performance Marketing",
  "url": "https://vaibhavvijay.com",
  "logo": "https://vaibhavvijay.com/logo.png",
  "description": "Professional portfolio of Vaibhav Vijay, Head of Growth & Performance Marketing with 7+ years of experience",
  "sameAs": [
    "https://linkedin.com/in/vaibhavvijay10",
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "vvvj.14@gmail.com",
    "telephone": "+919982267285",
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What services does Vaibhav Vijay offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vaibhav offers growth strategy consulting, performance marketing optimization, lifecycle marketing, CRM strategy, conversion rate optimization, and go-to-market strategy for startups and digital brands.",
      },
    },
    {
      "@type": "Question",
      "name": "How many years of experience does Vaibhav have?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vaibhav has 7+ years of experience in growth marketing, performance marketing, and scaling startups from 0-to-1 and beyond.",
      },
    },
    {
      "@type": "Question",
      "name": "What platforms does Vaibhav specialize in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vaibhav specializes in Meta Ads, Google Ads, Apple Search Ads, ASO, CRM platforms like MoEngage and Customer.io, and analytics tools like GA4 and Looker Studio.",
      },
    },
    {
      "@type": "Question",
      "name": "How can I contact Vaibhav?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can contact Vaibhav via email at vvvj.14@gmail.com, phone at +919982267285, WhatsApp, or through LinkedIn at linkedin.com/in/vaibhavvijay10.",
      },
    },
    {
      "@type": "Question",
      "name": "What is Vaibhav's approach to growth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vaibhav uses a data-driven, full-funnel approach to growth that focuses on acquisition, activation, retention, revenue, and customer experience. He believes in building sustainable growth engines backed by analytics.",
      },
    },
  ],
};

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://vaibhavvijay.com",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": "https://vaibhavvijay.com#about",
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Experience",
      "item": "https://vaibhavvijay.com#experience",
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Skills",
      "item": "https://vaibhavvijay.com#skills",
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Blog",
      "item": "https://vaibhavvijay.com#blog",
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Contact",
      "item": "https://vaibhavvijay.com#contact",
    },
  ],
};

// ============================================
// SEO KEYWORDS & METADATA
// ============================================

export const seoKeywords = {
  primary: [
    "Growth Marketing",
    "Performance Marketing",
    "Head of Growth",
    "Growth Strategy",
    "Startup Growth",
    "Digital Marketing",
    "Lifecycle Marketing",
    "CRM Strategy",
    "Conversion Rate Optimization",
    "Go-to-Market Strategy",
  ],
  secondary: [
    "Meta Ads Expert",
    "Google Ads Specialist",
    "Apple Search Ads",
    "ASO Optimization",
    "LTV Optimization",
    "Customer Retention",
    "Funnel Optimization",
    "Growth Hacking",
    "Marketing Analytics",
    "Performance Marketing Agency",
  ],
  longTail: [
    "How to scale startup revenue",
    "Performance marketing for startups",
    "Growth strategy for digital brands",
    "Lifecycle marketing best practices",
    "CRO for e-commerce",
    "Meta ads optimization guide",
    "How to improve LTV CAC ratio",
    "Retention marketing strategies",
    "Go-to-market strategy for SaaS",
    "Growth marketing consultant India",
  ],
};

export const geoKeywords = {
  india: [
    "Growth Marketing Consultant India",
    "Performance Marketing Expert India",
    "Growth Strategy Consultant India",
    "Digital Marketing Specialist India",
    "Startup Growth Consultant India",
    "Growth Hacking India",
    "Performance Marketing Agency India",
  ],
  cities: [
    "Growth Marketing Consultant Mumbai",
    "Performance Marketing Expert Delhi",
    "Growth Strategy Consultant Bangalore",
    "Digital Marketing Specialist Pune",
  ],
};

export const aeoKeywords = {
  // For AI search engines like ChatGPT, Perplexity, Claude
  conversational: [
    "How do I scale my startup revenue?",
    "What is the best growth strategy for startups?",
    "How to optimize Meta ads for better ROI?",
    "What is lifecycle marketing and why is it important?",
    "How to improve customer retention?",
    "What is the LTV:CAC ratio and why does it matter?",
    "How to build a go-to-market strategy?",
    "What are the best practices for conversion rate optimization?",
    "How to scale from 0 to 1 million ARR?",
    "What is performance marketing and how does it work?",
  ],
};

// ============================================
// META TAGS
// ============================================

export const metaTags = {
  title: "Vaibhav Vijay | Head of Growth & Performance Marketing Leader | 7+ Years Experience",
  description: "Vaibhav Vijay is a Head of Growth & Performance Marketing leader with 7+ years of experience scaling startups and digital brands. Specializing in growth strategy, performance marketing, lifecycle marketing, CRM, and conversion rate optimization.",
  keywords: seoKeywords.primary.join(", "),
  author: "Vaibhav Vijay",
  ogTitle: "Vaibhav Vijay - Growth & Performance Marketing Expert",
  ogDescription: "7+ years of experience helping startups and digital brands scale through data-driven growth strategies and performance marketing.",
  ogImage: "https://vaibhavvijay.com/profile.jpg",
  ogUrl: "https://vaibhavvijay.com",
  twitterCard: "summary_large_image",
  twitterTitle: "Vaibhav Vijay - Growth & Performance Marketing",
  twitterDescription: "Head of Growth with 7+ years scaling startups. Specializing in performance marketing, lifecycle CRM, CRO & data-driven growth.",
  twitterImage: "https://vaibhavvijay.com/profile.jpg",
  twitterCreator: "@vaibhavvijay",
  canonicalUrl: "https://vaibhavvijay.com",
};

// ============================================
// IMPLEMENTATION GUIDE
// ============================================

export const seoImplementationGuide = `
# SEO, GEO, and AEO Implementation Guide for Vaibhav Vijay's Portfolio

## 1. ON-PAGE SEO OPTIMIZATION

### Title Tags & Meta Descriptions
- Primary: "Vaibhav Vijay | Head of Growth & Performance Marketing | 7+ Years"
- Meta: "Growth marketing expert with 7+ years scaling startups. Performance marketing, lifecycle CRM, CRO specialist."

### Header Structure (H1, H2, H3)
- H1: "Vaibhav Vijay - Head of Growth & Performance Marketing Leader"
- H2s: About, Experience, Skills, Blog, Contact
- H3s: Specific achievements, case studies, service offerings

### Internal Linking Strategy
- Link to blog posts from experience section
- Link to relevant skills from experience descriptions
- Create topic clusters around growth marketing themes
- Use descriptive anchor text with keywords

### Image Optimization
- Add alt text to all images: "Vaibhav Vijay Growth Marketing Expert"
- Compress images for faster loading
- Use descriptive filenames: "vaibhav-growth-marketing-expert.jpg"

## 2. TECHNICAL SEO

### Site Speed
- Optimize images and lazy load
- Minify CSS/JS
- Enable GZIP compression
- Target: <3s load time

### Mobile Optimization
- Responsive design (✓ Already implemented)
- Mobile-first indexing ready
- Touch-friendly buttons and navigation

### XML Sitemap
- Include all pages: Home, About, Experience, Skills, Blog, Contact
- Update regularly when adding blog posts

### Robots.txt
- Allow all crawlers
- Point to sitemap.xml

### Structured Data (JSON-LD)
- Person schema ✓
- Organization schema ✓
- FAQ schema ✓
- Breadcrumb schema ✓

## 3. GEO OPTIMIZATION (India-Focused)

### Local SEO
- Add location metadata: "India"
- Create Google Business Profile
- Add local schema markup
- Target city-specific keywords

### Content Localization
- Mention India in key sections
- Use INR for pricing/revenue examples
- Reference Indian startups and brands

### Local Citations
- List on Indian business directories
- Get backlinks from Indian business sites
- Participate in Indian startup communities

## 4. AEO OPTIMIZATION (AI Search Engines)

### FAQ Section Implementation
- Add 5-10 FAQs covering common questions
- Use conversational language
- Structure with clear Q&A format
- Include schema markup

### Content for AI Engines
- Write in natural, conversational tone
- Answer "how-to" and "what-is" questions
- Provide specific, actionable advice
- Include statistics and data points

### Voice Search Optimization
- Use natural language and long-tail keywords
- Answer questions directly
- Include featured snippets

## 5. CONTENT STRATEGY

### Blog Post Topics (SEO-Optimized)
1. "The Complete Guide to Growth Marketing for Startups"
2. "Performance Marketing: Meta Ads, Google Ads, and Apple Search Ads"
3. "How to Improve Your LTV:CAC Ratio"
4. "Lifecycle Marketing: The Ultimate Guide to Customer Retention"
5. "Go-to-Market Strategy: From 0-to-1"
6. "Conversion Rate Optimization: A/B Testing Best Practices"
7. "Growth Hacking Strategies for Digital Brands"
8. "Analytics for Growth: GA4, Attribution, and LTV"

### Blog Post Structure
- Title: Include primary keyword
- Meta description: 155-160 characters with keyword
- H1: Main topic
- H2s: Subtopics with related keywords
- Internal links: 3-5 to relevant pages
- External links: 2-3 to authoritative sources
- Images: 1-2 with optimized alt text
- Length: 1500-2500 words for better ranking

## 6. LINK BUILDING STRATEGY

### Internal Links
- Blog to experience section
- Experience to skills
- Skills to contact

### External Links (Backlinks)
- Guest posts on growth marketing blogs
- Mention in startup publications
- LinkedIn articles (already doing)
- Industry directory listings

### Anchor Text Strategy
- Use keyword-rich anchor text
- Vary anchor text naturally
- Include branded mentions

## 7. MONITORING & ANALYTICS

### Tools to Use
- Google Search Console: Track rankings, clicks, impressions
- Google Analytics 4: User behavior, traffic sources
- SEMrush/Ahrefs: Keyword tracking, competitor analysis
- Lighthouse: Page speed and performance

### KPIs to Track
- Organic traffic
- Keyword rankings (target top 10)
- Click-through rate (CTR)
- Bounce rate
- Average session duration
- Conversion rate (contact form submissions)

### Monthly Review
- Check ranking progress
- Analyze top-performing content
- Identify new keyword opportunities
- Update underperforming pages

## 8. QUICK WINS (Implement First)

1. ✓ Add FAQ section with schema markup
2. ✓ Optimize meta tags and descriptions
3. ✓ Add internal links between sections
4. ✓ Create Google Business Profile
5. ✓ Add structured data (JSON-LD)
6. ✓ Optimize images with alt text
7. ✓ Create XML sitemap
8. ✓ Write 3-5 SEO-optimized blog posts
9. ✓ Build backlinks through guest posts
10. ✓ Set up Google Search Console

## 9. TIMELINE

- Week 1: Implement quick wins (FAQ, meta tags, structured data)
- Week 2-3: Write first 3 blog posts
- Week 4: Build initial backlinks
- Month 2: Analyze results, optimize underperforming pages
- Month 3: Create more content, expand keyword targeting
- Month 6: Review rankings, scale what's working

## 10. EXPECTED RESULTS

- Month 1: Indexed in Google, initial impressions
- Month 2-3: First keyword rankings (long-tail)
- Month 3-6: Main keyword rankings (top 20-30)
- Month 6+: Top 10 rankings for primary keywords
- Year 1: Organic traffic growth 200-300%
`;

export default {
  personSchema,
  organizationSchema,
  faqSchema,
  breadcrumbSchema,
  seoKeywords,
  geoKeywords,
  aeoKeywords,
  metaTags,
  seoImplementationGuide,
};
