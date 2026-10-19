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
    "tags": [
      "AI Automation",
      "Accounts Receivable",
      "Cost"
    ],
    "sections": [
      {
        "heading": "Where does the ₹470 go?",
        "table": {
          "caption": "Monthly running cost of the Ekatra invoice tracker",
          "columns": [
            "Part",
            "Runs on",
            "Monthly cost"
          ],
          "rows": [
            [
              "Web dashboard",
              "Cloudflare Pages",
              "₹0, free tier"
            ],
            [
              "Database",
              "Cloudflare D1",
              "₹0, free tier"
            ],
            [
              "Invoice PDF storage",
              "Cloudflare R2",
              "₹0, free tier"
            ],
            [
              "WhatsApp listener",
              "Hetzner CX23 server, Helsinki",
              "about ₹470"
            ],
            [
              "Reminder emails",
              "Gmail API",
              "₹0"
            ],
            [
              "Daily schedules",
              "cron-job.org",
              "₹0"
            ],
            [
              "Total",
              "",
              "about ₹470"
            ]
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
      {
        "href": "/blog/ai-agent-found-what-our-dashboard-was-hiding",
        "label": "My AI agent found the problem our dashboard was hiding"
      },
      {
        "href": "/blog/whatsapp-invoice-automation-india",
        "label": "The full build story: WhatsApp invoice automation"
      },
      {
        "href": "/answers/verify-ocr-invoice-amounts",
        "label": "How to stop OCR misreading invoice amounts"
      },
      {
        "href": "/answers/build-internal-tools-with-claude-2-days",
        "label": "How long it took to build with Claude"
      }
    ]
  },
  {
    "slug": "verify-ocr-invoice-amounts",
    "question": "How do you stop OCR from misreading invoice amounts?",
    "shortAnswer": "Read the amount twice: once from the figures and once from the amount-in-words line that Indian invoices carry, and accept the invoice only when both agree. Mismatches go to a person, and their correction is locked so the next scan can't overwrite it.",
    "description": "Cross-check OCR figures against the invoice's amount in words, flag mismatches, and lock human corrections. How the Ekatra invoice tracker keeps amounts right.",
    "isoDate": "2026-10-17",
    "tags": [
      "AI Automation",
      "OCR",
      "Data Quality"
    ],
    "sections": [
      {
        "heading": "Which checks catch which errors?",
        "table": {
          "caption": "Checks used by the Ekatra invoice tracker",
          "columns": [
            "Check",
            "What it catches"
          ],
          "rows": [
            [
              "Figures against amount in words",
              "A misread digit or a dropped zero"
            ],
            [
              "Invoice number pattern, EK-YY-YY-NN",
              "Wrong files and duplicates"
            ],
            [
              "Lock on manual edits",
              "A re-scan overwriting a human correction"
            ],
            [
              "Audit trail",
              "Who changed which number, and when"
            ]
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
      {
        "href": "/answers/cost-to-automate-invoice-follow-ups-india",
        "label": "What the whole invoice system costs to run"
      },
      {
        "href": "/answers/build-internal-tools-with-claude-2-days",
        "label": "Building the tracker with Claude, and the ₹423 bug"
      }
    ]
  },
  {
    "slug": "apple-search-ads-app-store-rank-180-to-1",
    "question": "How did Apple Search Ads and ASO take an app from #180 to #1?",
    "shortAnswer": "By running App Store Optimization and Apple Search Ads as one system: paid keyword and creative tests decided what went into the organic listing. In about 90 days the app moved from #180 to #1 in its category, with organic installs up 80 to 120% and blended CAC down 15 to 25%.",
    "description": "From #180 to #1 in about 90 days. How ASO and Apple Search Ads worked together, with the before and after numbers: organic installs, blended CAC and CPA.",
    "isoDate": "2026-10-17",
    "tags": [
      "Apple Search Ads",
      "ASO",
      "Mobile Growth"
    ],
    "sections": [
      {
        "heading": "What changed?",
        "table": {
          "caption": "Before and after, about 90 days",
          "columns": [
            "Metric",
            "Before",
            "After"
          ],
          "rows": [
            [
              "App Store category rank",
              "#180",
              "#1"
            ],
            [
              "Organic installs",
              "Baseline",
              "+80 to 120%"
            ],
            [
              "Blended CAC",
              "Baseline",
              "−15 to 25%"
            ],
            [
              "Apple Search Ads CPA",
              "—",
              "Under $4"
            ]
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
      {
        "href": "/blog/app-store-180-to-1-biggest-lever-wasnt-ads",
        "label": "We went from #180 to #1: the biggest lever wasn't ads"
      },
      {
        "href": "/blog/apple-search-ads-the-hidden-channel",
        "label": "Apple Search Ads: the hidden channel"
      },
      {
        "href": "/topics/performance-marketing",
        "label": "More on performance marketing"
      }
    ]
  },
  {
    "slug": "raise-ltv-70-to-350-deposit-tiers",
    "question": "How do you raise customer LTV from $70 to $350?",
    "shortAnswer": "Segment customers by deposit tier, give each tier its own journey and triggers, and price bonuses by cohort instead of handing them out evenly. On a real-money gaming platform this took LTV from $70 to $350 and cut payback from five months to three.",
    "description": "LTV from $70 to $350 and payback from 5 to 3 months. How deposit-tier segmentation, behavioural triggers and bonus discipline worked, with the numbers.",
    "isoDate": "2026-10-17",
    "tags": [
      "Retention",
      "LTV",
      "CRM"
    ],
    "sections": [
      {
        "heading": "What moved?",
        "table": {
          "caption": "Results on a real-money gaming platform, 2021 to 2025",
          "columns": [
            "Metric",
            "Before",
            "After"
          ],
          "rows": [
            [
              "Customer LTV",
              "$70",
              "$350"
            ],
            [
              "Payback period",
              "5 months",
              "3 months"
            ],
            [
              "Repeat deposits",
              "Baseline",
              "+15 to 25%"
            ],
            [
              "Churn",
              "Baseline",
              "−8 to 12%"
            ],
            [
              "Cash bonus cost",
              "—",
              "10 to 18% of GGR"
            ]
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
      {
        "href": "/blog/structured-generosity-igaming-ltv",
        "label": "Structured generosity: the biggest LTV lesson"
      },
      {
        "href": "/blog/reactivation-cheaper-than-acquisition",
        "label": "Why reactivation beats acquisition"
      }
    ]
  },
  {
    "slug": "improve-signup-to-first-deposit-conversion",
    "question": "How do you lift sign-up to first deposit conversion in an Indian app?",
    "shortAnswer": "Fix the two places people drop: identity checks and the first payment. Clearer KYC guidance, offer and landing page tests and social proof took registration-to-deposit from 5% to 6%, and smarter routing across UPI, IMPS and cards raised deposit acceptance by 5 to 8 points.",
    "description": "Registration-to-deposit from 5% to 6% and deposit acceptance up 5 to 8 points. The KYC, offer and payment routing changes behind it in an Indian real-money app.",
    "isoDate": "2026-10-17",
    "tags": [
      "Conversion",
      "Payments",
      "India"
    ],
    "sections": [
      {
        "heading": "Which changes moved which number?",
        "table": {
          "caption": "Results in an Indian real-money app",
          "columns": [
            "Change",
            "Result"
          ],
          "rows": [
            [
              "KYC guidance, offer and landing page tests, social proof",
              "Registration to deposit 5% → 6%, about +20%"
            ],
            [
              "Payment gateway routing across UPI, IMPS and cards",
              "Deposit acceptance +5 to 8 points"
            ],
            [
              "Same routing work",
              "First deposit conversion +8 to 12%"
            ]
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
      {
        "href": "/answers/raise-ltv-70-to-350-deposit-tiers",
        "label": "What happens after the first deposit: raising LTV"
      }
    ]
  },
  {
    "slug": "ekatra-shark-tank-50k-to-2m",
    "question": "How did Ekatra grow from $50K to $2M in revenue after Shark Tank India?",
    "shortAnswer": "By turning the attention into a repeatable go-to-market: sharper positioning and packaging, a demand engine across Meta, Google, influencers and WhatsApp CRM, and corporate gifting as a new product line. Revenue grew from $50K to $2M.",
    "description": "From $50K to $2M in revenue. The positioning, channel mix and corporate gifting product line behind Ekatra's growth after its Shark Tank India appearance.",
    "isoDate": "2026-10-17",
    "tags": [
      "Go-to-Market",
      "D2C",
      "B2B"
    ],
    "sections": [
      {
        "heading": "What changed?",
        "table": {
          "caption": "Ekatra's go-to-market after Shark Tank India",
          "columns": [
            "Lever",
            "What we did"
          ],
          "rows": [
            [
              "Positioning and packaging",
              "Rebuilt the brand story for a national audience"
            ],
            [
              "Demand",
              "Meta and Google Ads, influencer seeding, retargeting"
            ],
            [
              "Retention",
              "Email and WhatsApp CRM"
            ],
            [
              "New product line",
              "Corporate gifting with a catalogue, customisation and pricing tiers"
            ],
            [
              "Result",
              "Revenue from $50K to $2M"
            ]
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
      {
        "href": "/topics/retention-and-lifecycle",
        "label": "More on retention and CRM"
      },
      {
        "href": "/answers/indian-gifting-company-first-us-enterprise-contract",
        "label": "How Ekatra won its first US enterprise contract"
      }
    ]
  },
  {
    "slug": "automate-attendance-payroll-biometric-export",
    "question": "How do you automate attendance and payroll from a biometric machine export?",
    "shortAnswer": "Upload the machine's export as it is, map each device ID to an employee, and run every punch through a rule engine for grace, half-day tiers, minimum hours and overtime in 30-minute blocks. The HR system I built for Ekatra does this for a roster of 12 office and 26 production staff, with 36 unit tests pinning the agreed numbers.",
    "description": "36 unit tests pin the payroll rules. How Ekatra turns biometric attendance exports into half days, overtime in 30-minute blocks and a payroll preview.",
    "isoDate": "2026-10-20",
    "tags": [
      "Automation",
      "Workflow",
      "Small Business India",
      "HR"
    ],
    "sections": [
      {
        "heading": "Which rules does the engine apply?",
        "table": {
          "caption": "Attendance and pay rules in the Ekatra HR system",
          "columns": [
            "Rule",
            "What it decides"
          ],
          "rows": [
            [
              "Grace and forgiven instances",
              "Whether a late punch counts against the employee"
            ],
            [
              "Half-day tiers",
              "When a short day becomes a half day"
            ],
            [
              "Minimum hours",
              "Whether a day counts as worked"
            ],
            [
              "Free half days, PL and LOP",
              "Which absences are paid and which are deducted"
            ],
            [
              "Overtime",
              "Counted on hours worked, with a free hour, in 30-minute blocks and with caps"
            ]
          ]
        }
      },
      {
        "heading": "How does the machine export get in?",
        "paragraphs": [
          "The biometric machine's Excel report can be uploaded as it is, and the browser converts it. Any CSV with a header row also works: the parser finds the ID column and the date and time columns, and reads slashed dates day-first.",
          "HR sees a preview before anything is saved. Device IDs not yet linked to an employee are listed for mapping, punches are stored so duplicates can't double count, and the original file is kept."
        ]
      },
      {
        "heading": "Why pin the rules with tests?",
        "paragraphs": [
          "Pay rules are agreed once and questioned every month. The 36 unit tests fix the agreed numbers, so a change that would shift a salary calculation shows up as a failing test. Office and production staff each get their own shifts and rule settings."
        ]
      }
    ],
    "faqs": [
      {
        "q": "What does HR see at month end?",
        "a": "A month grid with each person's present days, half days, LOP days, overtime hours and projected salary, plus a separate payroll view for the CA."
      },
      {
        "q": "Who can log in?",
        "a": "Five roles: admin, HR, CA, manager and employee. Employees get a self-service home; admins see attendance, people, leave, bills, payroll, incentives and uploads."
      }
    ],
    "related": [
      {
        "href": "/answers/build-internal-tools-with-claude-2-days",
        "label": "How long internal tools take to build with Claude"
      },
      {
        "href": "/answers/cost-to-automate-invoice-follow-ups-india",
        "label": "The invoice tracker built on the same stack"
      },
      {
        "href": "/topics/automation-and-operations",
        "label": "More on automation and operations"
      }
    ]
  },
  {
    "slug": "track-b2b-dispatches-bus-railway-courier",
    "question": "How do you track B2B dispatches across bus, railway and courier?",
    "shortAnswer": "Keep every dispatch in one shared record that knows its mode: courier shipments get a tracking link built from the carrier's URL template, while bus and railway shipments are tracked by status. DispatchOps, the portal I built for Ekatra Handmade, also flags an e-way bill on any invoice above ₹50,000 and reads tracking details from a photo of the courier sticker.",
    "description": "₹50,000 is the e-way bill line. How a shared dispatch portal tracks B2B shipments by bus, railway and courier, with sticker OCR and carrier tracking links.",
    "isoDate": "2026-10-20",
    "tags": [
      "Automation",
      "Workflow",
      "Small Business India",
      "Logistics"
    ],
    "sections": [
      {
        "heading": "How is each mode tracked?",
        "table": {
          "caption": "Dispatch modes in DispatchOps",
          "columns": [
            "Mode",
            "How it is tracked"
          ],
          "rows": [
            [
              "Courier",
              "Link built from the carrier's URL template and the tracking number"
            ],
            [
              "Bus",
              "Status updates only, no carrier tracking link"
            ],
            [
              "Railway",
              "Status updates only, no carrier tracking link"
            ]
          ]
        }
      },
      {
        "heading": "Which carriers are set up?",
        "paragraphs": [
          "Blue Dart, DTDC, Delhivery, Shri Maruti, FedEx, XpressBees, Ekart, Ecom Express and Shadowfax, plus bus and railway. Each courier's tracking URL is stored once, so the team never builds a link by hand."
        ]
      },
      {
        "heading": "What stops a shipment going out wrong?",
        "bullets": [
          "The e-way bill box ticks itself and a warning shows when the invoice value is above ₹50,000",
          "E-way bill steps sit in the status flow before dispatched, in transit, out for delivery and delivered",
          "Hard-stop flags block a dispatch from moving on until an admin clears them",
          "Sent emails are logged as an audit trail"
        ]
      }
    ],
    "faqs": [
      {
        "q": "How does sticker OCR work?",
        "a": "Upload a photo of the courier sticker and OCR running in the browser pulls out the tracking details. If it can't read the sticker, the details are typed in by hand."
      },
      {
        "q": "Who can use the portal?",
        "a": "The whole team, with four roles: admin, ops, sales and viewer. It is a single web page backed by a shared database, so there is no app to install."
      }
    ],
    "related": [
      {
        "href": "/answers/automate-attendance-payroll-biometric-export",
        "label": "Automating attendance and payroll for the same business"
      },
      {
        "href": "/answers/indian-gifting-company-first-us-enterprise-contract",
        "label": "How Ekatra won its first US enterprise contract"
      },
      {
        "href": "/topics/automation-and-operations",
        "label": "More on automation and operations"
      }
    ]
  },
  {
    "slug": "indian-gifting-company-first-us-enterprise-contract",
    "question": "How did an Indian gifting company win its first US enterprise contract?",
    "shortAnswer": "By meeting buyers in person at trade expos and buyer meets, with a corporate gifting line already built for companies to buy. At Ekatra, an Indian handmade gifting business, that export channel turned the first US enterprise account into a ₹1.4 Cr contract.",
    "description": "₹1.4 Cr from the first US enterprise account. How Ekatra, an Indian handmade gifting company, opened exports through trade expos and buyer meets.",
    "isoDate": "2026-10-20",
    "tags": [
      "Go-to-Market",
      "B2B",
      "Exports"
    ],
    "sections": [
      {
        "heading": "What does the B2B side look like now?",
        "table": {
          "caption": "Ekatra's B2B gifting business, 2026",
          "columns": [
            "Item",
            "Detail"
          ],
          "rows": [
            [
              "Export channel",
              "Trade expos and buyer meets"
            ],
            [
              "First US enterprise account",
              "Converted into a ₹1.4 Cr contract"
            ],
            [
              "Largest bulk orders",
              "Up to 30,000 units in one run"
            ],
            [
              "Teams supplied",
              "Google, Microsoft, Netflix and Salesforce"
            ]
          ]
        }
      },
      {
        "heading": "Why trade expos and buyer meets?",
        "paragraphs": [
          "A first export deal needs trust before it needs a price. Expos and buyer meets put a handmade product in front of buyers in person, which a catalogue or an email can't do."
        ]
      },
      {
        "heading": "What had to be in place first?",
        "paragraphs": [
          "A corporate gifting line designed for companies: a catalogue, customisation options and pricing tiers. In India it had already turned one-off buyers into repeat enterprise accounts, and the business can deliver bulk orders as large as 30,000 units in one run."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Which companies does Ekatra supply?",
        "a": "Its B2B gifting platform supplies teams at Google, Microsoft, Netflix and Salesforce."
      }
    ],
    "related": [
      {
        "href": "/answers/ekatra-shark-tank-50k-to-2m",
        "label": "How Ekatra grew from $50K to $2M after Shark Tank India"
      },
      {
        "href": "/answers/track-b2b-dispatches-bus-railway-courier",
        "label": "How Ekatra tracks B2B dispatches"
      },
      {
        "href": "/blog/ai-agent-found-what-our-dashboard-was-hiding",
        "label": "My AI agent found the problem our dashboard was hiding"
      }
    ]
  },
  {
    "slug": "improve-csat-response-time-customer-experience",
    "question": "How do you improve CSAT and response time in a customer experience team?",
    "shortAnswer": "Run customer experience as a product: one roadmap and KPI framework, PRDs with success metrics agreed with engineering, and segmentation, lifecycle journeys and automated triggers built into the platform. On a customer experience platform I managed at OptiServ Consulting, that lifted CSAT 9% and repeat usage 15% and improved response time 27%.",
    "description": "CSAT up 9%, response time improved 27%, repeat usage up 15%. How a product roadmap, KPI framework and a 25-member team lifted customer experience.",
    "isoDate": "2026-10-20",
    "tags": [
      "Customer Experience",
      "Product Management",
      "CRM",
      "Lifecycle"
    ],
    "sections": [
      {
        "heading": "What moved?",
        "table": {
          "caption": "Customer experience platform, OptiServ Consulting, Dec 2025 to Feb 2026",
          "columns": [
            "Metric",
            "Change"
          ],
          "rows": [
            [
              "CSAT",
              "+9%"
            ],
            [
              "Response time",
              "27% better"
            ],
            [
              "Repeat usage",
              "+15%"
            ],
            [
              "Team",
              "25 people across Product, CX, QA and Ops"
            ]
          ]
        }
      },
      {
        "heading": "What went into the platform?",
        "bullets": [
          "Customer segmentation",
          "Lifecycle journeys",
          "Automated triggers",
          "PRDs and user stories with success metrics, written with engineering"
        ]
      },
      {
        "heading": "What did the team own?",
        "paragraphs": [
          "A 25-member cross-functional team across Product, CX, QA and Ops owned client onboarding, escalation paths and the reporting cadence the account now runs on."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Why treat customer experience as a product?",
        "a": "CSAT and response time move when the system changes, not only when people work harder. A roadmap and KPI framework make each change measurable."
      }
    ],
    "related": [
      {
        "href": "/topics/retention-and-lifecycle",
        "label": "More on retention, lifecycle and CRM"
      }
    ]
  },
  {
    "slug": "build-internal-tools-with-claude-2-days",
    "question": "How much faster is building internal tools with Claude?",
    "shortAnswer": "About two days instead of an estimated three to four weekends, for the first version of Ekatra's invoice tracker: the dashboard, logins and OCR pipeline, built with Claude as a pair programmer. It replaced a Google Sheet in April 2026 and runs for about ₹470 a month.",
    "description": "About 2 days versus 3 to 4 weekends by hand. What building Ekatra's invoice tracker with Claude as a pair programmer sped up, and what still needed a human.",
    "isoDate": "2026-10-20",
    "tags": [
      "AI",
      "Anthropic",
      "Automation",
      "Productivity"
    ],
    "sections": [
      {
        "heading": "What got built in two days?",
        "table": {
          "caption": "First version of the Ekatra invoice tracker, April 2026",
          "columns": [
            "Part",
            "What it does"
          ],
          "rows": [
            [
              "Dashboard",
              "Six pages with KPIs, ageing buckets and top debtors"
            ],
            [
              "Logins",
              "Email and password accounts for the team"
            ],
            [
              "OCR pipeline",
              "Reads invoice PDFs dropped in the team's WhatsApp group"
            ],
            [
              "Build time",
              "About 2 days, against 3 to 4 weekends estimated by hand"
            ]
          ]
        }
      },
      {
        "heading": "What did Claude not replace?",
        "paragraphs": [
          "Judgement about data. In August 2026 the team reported a ₹423 invoice showing as ₹9.5 crore: the extractor had read the 8-digit HSN product code as the total. The fix was a rule a person had to choose, that every amount must match the amount-in-words line. Re-checking every invoice against its PDF fixed 2 rows and restored 6 lost invoices."
        ]
      },
      {
        "heading": "Which habits kept fast building safe?",
        "bullets": [
          "New features go in new files, leaving working code untouched",
          "Every feature ships with a rollback path, such as a tagged stable version",
          "Features are proven in production with throwaway test data, then deleted",
          "Human edits outrank machine input: a re-scan can never overwrite a correction"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Which Claude model was used?",
        "a": "Claude Sonnet 4.5, as a pair programmer."
      },
      {
        "q": "Does it need a developer to keep it running?",
        "a": "No. It runs unattended on Cloudflare and one small server, and the repo holds the project's history and reasoning so any engineer or AI assistant can pick it up."
      }
    ],
    "related": [
      {
        "href": "/answers/cost-to-automate-invoice-follow-ups-india",
        "label": "What the invoice system costs to run"
      },
      {
        "href": "/answers/verify-ocr-invoice-amounts",
        "label": "How to stop OCR misreading invoice amounts"
      },
      {
        "href": "/blog/whatsapp-invoice-automation-india",
        "label": "The full build story: WhatsApp invoice automation"
      },
      {
        "href": "/topics/automation-and-operations",
        "label": "More on automation and operations"
      }
    ]
  }
];

export function getAnswerBySlug(slug: string): Answer | undefined {
  return answers.find((a) => a.slug === slug);
}
