/**
 * Answer pages: short, data-backed answers to one question each.
 * Rendered by src/pages/AnswersPage.tsx and src/pages/AnswerPage.tsx, and
 * prerendered (with Article + FAQPage JSON-LD) by scripts/prerender-blog.mjs.
 * Keep this a plain JSON array: the prerender script parses it with JSON.parse.
 * Every number here must come from a real project or resume line.
 */
export interface AnswerTable {
  caption: string;
  columns: string[];
  rows: string[][];
}

export interface AnswerSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: AnswerTable;
}

export interface Answer {
  slug: string;
  question: string;
  shortAnswer: string;
  description: string;
  isoDate: string;
  tags: string[];
  sections: AnswerSection[];
  faqs: { q: string; a: string }[];
  related: { href: string; label: string }[];
}

export const answers: Answer[] = [
  {
    "slug": "cost-to-automate-invoice-follow-ups-india",
    "question": "What does it cost to automate invoice follow-ups for an Indian SMB?",
    "shortAnswer": "About ₹470 a month. That is the running cost of the invoice tracker I built for Ekatra: one small server for the WhatsApp agent, with the web app, database, storage, schedules and email on free tiers.",
    "description": "About ₹470 a month. A real cost breakdown of an invoice follow-up system for an Indian B2B company: WhatsApp intake, OCR, dashboard and automated reminders.",
    "isoDate": "2026-10-17",
    "tags": ["AI Automation", "Accounts Receivable", "Cost"],
    "sections": [
      {
        "heading": "Where does the ₹470 go?",
        "table": {
          "caption": "Monthly running cost of the Ekatra invoice tracker",
          "columns": ["Part", "Runs on", "Monthly cost"],
          "rows": [
            ["Web dashboard", "Cloudflare Pages", "₹0, free tier"],
            ["Database", "Cloudflare D1", "₹0, free tier"],
            ["Invoice PDF storage", "Cloudflare R2", "₹0, free tier"],
            ["WhatsApp listener", "Hetzner CX23 server, Helsinki", "about ₹470"],
            ["Reminder emails", "Gmail API", "₹0"],
            ["Daily schedules", "cron-job.org", "₹0"],
            ["Total", "", "about ₹470"]
          ]
        }
      },
      {
        "heading": "What does it do for that money?",
        "bullets": [
          "Reads every invoice PDF dropped in the sales WhatsApp group",
          "Checks the amount against the amount-in-words line before saving it",
          "Shows a live dashboard with ageing buckets and top debtors",
          "Sends client reminders at 08:00, a CEO digest at 11:00 and owner overdue lists at 13:00 IST",
          "Emails the owner if the WhatsApp agent stops responding"
        ]
      },
      {
        "heading": "How long did it take to build?",
        "paragraphs": [
          "About two days, using Claude as a pair programmer, against an estimated three to four weekends by hand. It replaced a Google Sheet in April 2026 and has run unattended since."
        ]
      },
      {
        "heading": "What are the hidden costs?",
        "paragraphs": [
          "Free tiers are only free if you read the limits. An Oracle Cloud \"always free\" setup billed us 1.38 SGD because of a misconfiguration. A flat-rate server avoids surprise bills."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Does it message clients on WhatsApp?",
        "a": "No. It only reads the team's WhatsApp group. Reminders go out by email through the Gmail API, which keeps the WhatsApp number safe from spam flags."
      },
      {
        "q": "What happens when WhatsApp breaks the integration?",
        "a": "It happened in July 2026. The messaging layer was swapped and the rest of the system kept running. A watchdog emails the owner if the agent goes quiet."
      }
    ],
    "related": [
      { "href": "/blog/whatsapp-invoice-automation-india", "label": "The full build story: WhatsApp invoice automation" },
      { "href": "/answers/verify-ocr-invoice-amounts", "label": "How to stop OCR misreading invoice amounts" }
    ]
  },
  {
    "slug": "verify-ocr-invoice-amounts",
    "question": "How do you stop OCR from misreading invoice amounts?",
    "shortAnswer": "Read the amount twice: once from the figures and once from the amount-in-words line that Indian invoices carry, and accept the invoice only when both agree. Mismatches go to a person, and their correction is locked so the next scan can't overwrite it.",
    "description": "Cross-check OCR figures against the invoice's amount in words, flag mismatches, and lock human corrections. How the Ekatra invoice tracker keeps amounts right.",
    "isoDate": "2026-10-17",
    "tags": ["AI Automation", "OCR", "Data Quality"],
    "sections": [
      {
        "heading": "Which checks catch which errors?",
        "table": {
          "caption": "Checks used by the Ekatra invoice tracker",
          "columns": ["Check", "What it catches"],
          "rows": [
            ["Figures against amount in words", "A misread digit or a dropped zero"],
            ["Invoice number pattern, EK-YY-YY-NN", "Wrong files and duplicates"],
            ["Lock on manual edits", "A re-scan overwriting a human correction"],
            ["Audit trail", "Who changed which number, and when"]
          ]
        }
      },
      {
        "heading": "Why do amounts get misread?",
        "paragraphs": [
          "Scanned PDFs, unusual fonts and the Indian lakh format, such as 1,84,000, all confuse OCR. A single wrong digit becomes a wrong reminder to a client, which costs more trust than a late one."
        ]
      },
      {
        "heading": "Why use the amount in words?",
        "paragraphs": [
          "Most Indian GST invoices print the total in words as well as figures. The two are written differently, so OCR rarely gets both wrong in the same way. When they agree, the number is almost certainly right."
        ]
      }
    ],
    "faqs": [
      {
        "q": "What should the team do if a number looks wrong?",
        "a": "Report it instead of silently editing it. The edit is logged and protected, and the report shows where the extraction needs work."
      }
    ],
    "related": [
      { "href": "/answers/cost-to-automate-invoice-follow-ups-india", "label": "What the whole invoice system costs to run" }
    ]
  },
  {
    "slug": "apple-search-ads-app-store-rank-180-to-1",
    "question": "How did Apple Search Ads and ASO take an app from #180 to #1?",
    "shortAnswer": "By running App Store Optimization and Apple Search Ads as one system: paid keyword and creative tests decided what went into the organic listing. In about 90 days the app moved from #180 to #1 in its category, with organic installs up 80 to 120% and blended CAC down 15 to 25%.",
    "description": "From #180 to #1 in about 90 days. How ASO and Apple Search Ads worked together, with the before and after numbers: organic installs, blended CAC and CPA.",
    "isoDate": "2026-10-17",
    "tags": ["Apple Search Ads", "ASO", "Mobile Growth"],
    "sections": [
      {
        "heading": "What changed?",
        "table": {
          "caption": "Before and after, about 90 days",
          "columns": ["Metric", "Before", "After"],
          "rows": [
            ["App Store category rank", "#180", "#1"],
            ["Organic installs", "Baseline", "+80 to 120%"],
            ["Blended CAC", "Baseline", "−15 to 25%"],
            ["Apple Search Ads CPA", "—", "Under $4"]
          ]
        }
      },
      {
        "heading": "Why run ASO and Apple Search Ads together?",
        "paragraphs": [
          "The organic listing changes slowly, so guessing is expensive. Search Ads shows within days which keywords and creatives convert, and only the winners go into the listing."
        ]
      },
      {
        "heading": "What did the system look like?",
        "bullets": [
          "Keywords grouped by intent and judged on the quality of users they brought, not install volume",
          "Screenshot and creative variations tested on paid traffic before changing the listing",
          "Bids cut on keywords whose installs did not turn into depositing users",
          "Blended CAC reviewed by cohort, so cheap installs that churned didn't look like wins"
        ]
      }
    ],
    "faqs": [
      {
        "q": "How long does ASO take to show results?",
        "a": "Paid keyword data arrives within days. Organic rank follows over weeks; here the move from #180 to #1 took about 90 days."
      }
    ],
    "related": [
      { "href": "/blog/apple-search-ads-the-hidden-channel", "label": "Apple Search Ads: the hidden channel" },
      { "href": "/topics/performance-marketing", "label": "More on performance marketing" }
    ]
  },
  {
    "slug": "raise-ltv-70-to-350-deposit-tiers",
    "question": "How do you raise customer LTV from $70 to $350?",
    "shortAnswer": "Segment customers by deposit tier, give each tier its own journey and triggers, and price bonuses by cohort instead of handing them out evenly. On a real-money gaming platform this took LTV from $70 to $350 and cut payback from five months to three.",
    "description": "LTV from $70 to $350 and payback from 5 to 3 months. How deposit-tier segmentation, behavioural triggers and bonus discipline worked, with the numbers.",
    "isoDate": "2026-10-17",
    "tags": ["Retention", "LTV", "CRM"],
    "sections": [
      {
        "heading": "What moved?",
        "table": {
          "caption": "Results on a real-money gaming platform, 2021 to 2025",
          "columns": ["Metric", "Before", "After"],
          "rows": [
            ["Customer LTV", "$70", "$350"],
            ["Payback period", "5 months", "3 months"],
            ["Repeat deposits", "Baseline", "+15 to 25%"],
            ["Churn", "Baseline", "−8 to 12%"],
            ["Cash bonus cost", "—", "10 to 18% of GGR"]
          ]
        }
      },
      {
        "heading": "What is a deposit tier?",
        "paragraphs": [
          "A band of customers grouped by how much and how often they pay. Each band gets its own offers, contact frequency and service level, so a high-value customer and a first-time payer never get the same message."
        ]
      },
      {
        "heading": "Which triggers mattered most?",
        "bullets": [
          "Separate journeys for VIP and regular customers",
          "Behavioural triggers on deposit patterns and inactivity",
          "Promotions planned around festivals and cricket season"
        ]
      },
      {
        "heading": "Why does bonus discipline raise LTV?",
        "paragraphs": [
          "Blanket bonuses attract bonus hunters and burn margin. Wagering rules, game weighting, max bet limits and cohort pricing held bonus cost at 10 to 18% of GGR, so retention money went to customers who stay."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Does this work outside gaming?",
        "a": "Yes. Any business with repeat purchases can tier customers by value and frequency. The same idea, pricing tiers for corporate gifting, turned one-off buyers into repeat enterprise accounts at Ekatra."
      }
    ],
    "related": [
      { "href": "/blog/structured-generosity-igaming-ltv", "label": "Structured generosity: the biggest LTV lesson" },
      { "href": "/blog/reactivation-cheaper-than-acquisition", "label": "Why reactivation beats acquisition" }
    ]
  },
  {
    "slug": "improve-signup-to-first-deposit-conversion",
    "question": "How do you lift sign-up to first deposit conversion in an Indian app?",
    "shortAnswer": "Fix the two places people drop: identity checks and the first payment. Clearer KYC guidance, offer and landing page tests and social proof took registration-to-deposit from 5% to 6%, and smarter routing across UPI, IMPS and cards raised deposit acceptance by 5 to 8 points.",
    "description": "Registration-to-deposit from 5% to 6% and deposit acceptance up 5 to 8 points. The KYC, offer and payment routing changes behind it in an Indian real-money app.",
    "isoDate": "2026-10-17",
    "tags": ["Conversion", "Payments", "India"],
    "sections": [
      {
        "heading": "Which changes moved which number?",
        "table": {
          "caption": "Results in an Indian real-money app",
          "columns": ["Change", "Result"],
          "rows": [
            ["KYC guidance, offer and landing page tests, social proof", "Registration to deposit 5% → 6%, about +20%"],
            ["Payment gateway routing across UPI, IMPS and cards", "Deposit acceptance +5 to 8 points"],
            ["Same routing work", "First deposit conversion +8 to 12%"]
          ]
        }
      },
      {
        "heading": "Why is KYC the first leak?",
        "paragraphs": [
          "New users stall when they don't know which document to upload or why. Short, plain guidance at each step removes the doubt before it becomes a drop-off."
        ]
      },
      {
        "heading": "Why does payment routing matter so much in India?",
        "paragraphs": [
          "Approval rates differ by gateway, bank and method. Routing each payment to the gateway most likely to approve it turns failed first deposits into completed ones without touching the product."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is a one point lift worth the work?",
        "a": "Going from 5% to 6% is a 20% increase in paying users from the same traffic. Every acquisition rupee earns about a fifth more."
      }
    ],
    "related": [
      { "href": "/answers/raise-ltv-70-to-350-deposit-tiers", "label": "What happens after the first deposit: raising LTV" }
    ]
  },
  {
    "slug": "ekatra-shark-tank-50k-to-2m",
    "question": "How did Ekatra grow from $50K to $2M in revenue after Shark Tank India?",
    "shortAnswer": "By turning the attention into a repeatable go-to-market: sharper positioning and packaging, a demand engine across Meta, Google, influencers and WhatsApp CRM, and corporate gifting as a new product line. Revenue grew from $50K to $2M.",
    "description": "From $50K to $2M in revenue. The positioning, channel mix and corporate gifting product line behind Ekatra's growth after its Shark Tank India appearance.",
    "isoDate": "2026-10-17",
    "tags": ["Go-to-Market", "D2C", "B2B"],
    "sections": [
      {
        "heading": "What changed?",
        "table": {
          "caption": "Ekatra's go-to-market after Shark Tank India",
          "columns": ["Lever", "What we did"],
          "rows": [
            ["Positioning and packaging", "Rebuilt the brand story for a national audience"],
            ["Demand", "Meta and Google Ads, influencer seeding, retargeting"],
            ["Retention", "Email and WhatsApp CRM"],
            ["New product line", "Corporate gifting with a catalogue, customisation and pricing tiers"],
            ["Result", "Revenue from $50K to $2M"]
          ]
        }
      },
      {
        "heading": "Why isn't TV attention enough?",
        "paragraphs": [
          "A TV moment brings a spike of visitors who leave if the story, the product page and the follow-up aren't ready. The work is turning one spike into channels that keep producing buyers."
        ]
      },
      {
        "heading": "What made corporate gifting work?",
        "paragraphs": [
          "A clear catalogue, customisation options and pricing tiers made buying easy for companies and turned one-off orders into repeat accounts. That line now supplies teams at Google, Microsoft, Netflix and Salesforce, with single orders up to 30,000 units."
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the first thing to fix after a big media moment?",
        "a": "The follow-up. Capture every visitor into email or WhatsApp CRM, so the attention you got once can be reached again for free."
      }
    ],
    "related": [
      { "href": "/topics/retention-and-lifecycle", "label": "More on retention and CRM" }
    ]
  }
];

export function getAnswerBySlug(slug: string): Answer | undefined {
  return answers.find((a) => a.slug === slug);
}
