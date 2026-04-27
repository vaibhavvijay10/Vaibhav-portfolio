import { useState } from "react";
import { ExternalLink, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  linkedinUrl: string;
  infographicUrl?: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "4",
    title: "I Spent Years in iGaming. The Biggest Lesson Had Nothing to Do With Odds",
    content: `Most people hear "iGaming" and think of luck and flashy promotions. What they miss is that this industry is one of the most advanced classrooms in behavioural economics on the planet.

Every decision a player makes is a real time experiment in risk tolerance, loss aversion, and reward sensitivity. And on the operator side, every bonus structure, every loyalty tier, every cashback mechanic is a hypothesis about what drives LTV versus short term NGR spikes.

I spent years in this space, and the sharpest lesson was this: generosity without structure destroys value. The instinct was always to offer bigger bonuses. More free bets, higher match percentages. The deposit numbers looked great for a week. Then the cohort would churn, having extracted the value and moved on. Classic bonus abuse pattern.

The turning point came when we shifted from "how much can we give" to "what behaviour are we rewarding." We rebuilt the bonus architecture around actions that correlated with long term retention: consecutive day logins, multi product engagement, responsible deposit patterns. The bonuses got smaller, but player lifetime value jumped nearly 5x and wagering frequency stabilized across cohorts.

The transferable insight is universal: in any business, incentives that reward the wrong behaviour will attract the wrong customers. Whether you are running a sportsbook, a casino, a SaaS free trial, or a loyalty program, the question is the same.

Are your incentives driving real player engagement or just inflating your FTD numbers?`,
    date: "Apr 27, 2026",
    linkedinUrl: "https://www.linkedin.com/posts/vaibhavvijay10_igaming-sportsbook-onlinecasino-activity-7454390128829132800-FRsg",
    tags: ["iGaming", "Player Retention", "LTV", "CRM"],
  },
  {
    id: "5",
    title: "The Most Expensive Customer Is the One You Already Paid For Twice",
    content: `Acquisition gets the budget. Retention gets the leftovers. And reactivation? Most teams pretend it does not exist.

Here is what nobody talks about: dormant users already trusted you once. They downloaded your app, created an account, maybe even made a purchase. Then they went silent. And most brands just keep spending to acquire new users who look exactly like the ones they already lost.

If your reactivation rate is near zero, your effective CAC is much higher than your dashboard shows. A chunk of those "acquired" users are just cycling through a revolving door.

I spent a quarter rebuilding the reactivation engine for a brand where dormant users outnumbered active ones 3 to 1. We segmented by last activity, predicted the saveable cohort, and ran sequenced journeys across push, email, and in app messaging. Kill criteria were strict: if a cohort did not show positive value per recipient within 7 days, we pulled the spend.

The result: 14% of the dormant base came back, and the cost per reactivated user was roughly one fifth of acquiring a fresh one.

Retention is not a department. It is a growth strategy most teams underinvest in because it is less glamorous than top of funnel campaigns.

What percentage of your user base is dormant right now, and does anyone in your org own that number?`,
    date: "Apr 26, 2026",
    linkedinUrl: "https://www.linkedin.com/posts/vaibhavvijay10_retentionmarketing-crm-lifecyclemarketing-activity-7454005111053471745-A1hp",
    tags: ["Retention Marketing", "CRM", "Reactivation", "Lifecycle"],
  },
  {
    id: "6",
    title: "Your Brand Just Lost a Customer It Never Knew About",
    content: `Last month, a friend asked Claude Cowork to recommend a CRM tool. It gave him three names. She picked one without ever opening Google.

No ad was clicked. No landing page was visited. No retargeting pixel fired. The brands that lost? They have no idea they were even in the running.

Discovery is moving from search bars to conversations with machines. People are asking agents to shortlist, compare, and recommend. By the time a human lands on your website, the decision is already half made.

The brands winning in this new layer share a few things: crystal clear positioning, structured data that machines can parse, strong third party proof (reviews, citations, community mentions), and a narrative that holds up without a salesperson in the room.

When I tested this with a brand I was consulting for, we restructured their knowledge base, FAQ schema, and review strategy to be "readable" by the agents people actually use today. Within weeks, the brand started appearing in recommendations for queries we had never ranked for organically.

This is not about abandoning SEO. It is about making your brand legible to the machines doing the shortlisting for your customers.

Who is your invisible competitor, the one getting recommended in conversations you cannot even track?`,
    date: "Apr 25, 2026",
    linkedinUrl: "https://www.linkedin.com/posts/vaibhavvijay10_growthmarketing-brandstrategy-performancemarketing-activity-7453508188294926336-VhFW",
    tags: ["GEO", "AEO", "Brand Strategy", "AI Discovery"],
  },
  {
    id: "1",
    title: "Your Next Customer May Never Visit Your Website",
    content: `Your next customer may never visit your website!!

Let that sink in.

We're entering a phase where:
• Humans use AI to discover
• AI agents shortlist options
• Brands get chosen before a click even happens

That means marketing is no longer just SEO (ranking on search).
It's also GEO - making sure your brand is understood, trusted, and recommended by AI.

The threat?
• If AI gives the answer, fewer people visit your site.
• If your brand data is weak, someone else gets recommended.
• If you only market to humans, you may miss the real decision maker: the machine assistant.

What wins now?
• Clear positioning
• Strong proof
• Great reviews
• Structured information
• Community trust

The brands that adapt early will own the next discovery layer.

Marketing now has 2 audiences: Humans and AI agents.

How is your team preparing for this shift, are you still optimizing only for search, or also for AI recommendations?`,
    date: "Mar 18, 2026",
    linkedinUrl: "https://linkedin.com/in/vaibhavvijay10",
    infographicUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663445591701/LtSA5bGvoTNWX75LT2GHpM/blog-post-1-geo_b49c1fa8.jfif",
    tags: ["Marketing", "AI", "GEO", "Strategy"],
  },
  {
    id: "2",
    title: "Upgrade Your Decision Quality: 3 Frameworks from Annie Duke",
    content: `"There is no such thing as a long feedback loop." ~ Annie Duke

That line hit hard. If you think you need 5–10 years to know whether a decision was good, you're usually just choosing to wait.

3 ideas I'm taking back into work:

1) Shorten the loop
Define near-term signals that correlate with the long term outcome (retention, payback, cohort quality) and decide early.

2) Stop discovering in meetings
Collect input asynchronously first. Meetings are for debate + decisions, not for finding out what everyone thinks in real time.

3) Set kill criteria
Pre agree the signals that mean "pivot" or "stop." Otherwise sunk cost quietly runs the show.

Work example: for reactivation journeys, we tracked 7-day value/recipient + unsub rate, with kill criteria before expanding segments.

Curious: what's one "short feedback loop" metric you trust most in your business?`,
    date: "Mar 15, 2026",
    linkedinUrl: "https://linkedin.com/in/vaibhavvijay10",
    infographicUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663445591701/LtSA5bGvoTNWX75LT2GHpM/blog-post-2-annie-duke_054f16a9.jfif",
    tags: ["Decision Making", "Growth", "Strategy", "Leadership"],
  },
  {
    id: "3",
    title: "The Two Machines: Meta vs. Google Ads",
    content: `Meta and Google Ads represent fundamentally different approaches to digital advertising.

Meta focuses on discovery, where the goal is to earn attention and often create demand through creative strategies and angles.

On the other hand, Google Search is centered around intent, matching user queries with relevant content, structured information, and effective landing pages.

Key Differences:

META (The Demand Engine):
• Functional Blueprint: Demand Creation
• Meta earns attention to create new desire
• Probabilistic Signals: Meta guesses intent based on behavior
• CPM-First: Meta buys access to attention
• Levers for Success: Creative Throughput
• When to Lean In: Visual Storytelling/Impulse

GOOGLE (The Capture Engine):
• Functional Blueprint: Demand Capture
• Google shows up to fulfill existing queries
• Explicit Signals: Google knows intent because the user typed it
• CPC-First: Google buys expressed intent through the click
• Levers for Success: Information Architecture
• When to Lean In: Urgent-Intent or Search-Heavy

Understanding these fundamental differences is crucial for allocating your budget and crafting the right strategy for each platform.

Disclaimer: This is a simplified mental model.`,
    date: "Mar 12, 2026",
    linkedinUrl: "https://linkedin.com/in/vaibhavvijay10",
    infographicUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663445591701/LtSA5bGvoTNWX75LT2GHpM/blog-post-3-meta-google_88ae6085.jfif",
    tags: ["Performance Marketing", "Meta Ads", "Google Ads", "Strategy"],
  },
];

// Helper function to truncate content
const truncateContent = (content: string, lines: number = 3): string => {
  const contentLines = content.split("\n");
  return contentLines.slice(0, lines).join("\n");
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    linkedinUrl: "",
    infographicUrl: "",
  });

  const handleAddPost = () => {
    if (newPost.title && newPost.content && newPost.linkedinUrl) {
      const post: BlogPost = {
        id: String(posts.length + 1),
        title: newPost.title,
        content: newPost.content,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        linkedinUrl: newPost.linkedinUrl,
        infographicUrl: newPost.infographicUrl || undefined,
        tags: ["New"],
      };
      setPosts([post, ...posts]);
      setNewPost({ title: "", content: "", linkedinUrl: "", infographicUrl: "" });
      setShowAddForm(false);
    }
  };

  const isPostExpanded = (postId: string) => expandedPostId === postId;

  return (
    <section className="relative py-20 bg-white overflow-hidden">

      {/* === SVG BACKGROUND GRAPHIC === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="blogGrad" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#blogGrad)" />
          {/* Flowing wave pattern */}
          <path d="M 0 50% Q 300 30% 600 50% T 1200 50%" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeOpacity="0.08" />
          <path d="M 0 55% Q 300 35% 600 55% T 1200 55%" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.05" />
          {/* Geometric accents */}
          <circle cx="15%" cy="20%" r="120" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.07" />
          <circle cx="85%" cy="80%" r="150" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.07" />
          {/* Dot grid */}
          <pattern id="blogDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#0891b2" fillOpacity="0.08" />
          </pattern>
          <rect x="0" y="70%" width="100%" height="30%" fill="url(#blogDots)" />
        </svg>
      </div>

      <div className="relative z-10 container max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="accent-line mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Growth Insights & Articles</h2>
          <p className="text-lg text-muted-foreground">Latest thoughts on growth, marketing, and scaling startups</p>
        </div>

        {/* Add New Post Button */}
        <div className="mb-8">
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
          >
            <Plus size={18} />
            Add New Post
          </Button>
        </div>

        {/* Add Post Form */}
        {showAddForm && (
          <div className="bg-white border-2 border-accent/30 rounded-xl p-6 mb-8 space-y-4">
            <h3 className="text-xl font-bold text-foreground">Add New Blog Post</h3>
            <input
              type="text"
              placeholder="Post Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <textarea
              placeholder="Post Content"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent h-32"
            />
            <input
              type="url"
              placeholder="LinkedIn Post URL"
              value={newPost.linkedinUrl}
              onChange={(e) => setNewPost({ ...newPost, linkedinUrl: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="url"
              placeholder="Infographic URL (optional)"
              value={newPost.infographicUrl}
              onChange={(e) => setNewPost({ ...newPost, infographicUrl: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <div className="flex gap-3">
              <Button
                onClick={handleAddPost}
                className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Publish Post
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                className="bg-secondary hover:bg-secondary/80 text-foreground px-6 py-2 rounded-lg font-semibold"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-1 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              {/* Infographic - Fixed Size */}
              {post.infographicUrl && (
                <div className="relative w-full h-48 md:h-64 overflow-hidden bg-secondary">
                  <img
                    src={post.infographicUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">{post.date}</p>
                  </div>
                </div>

                {/* Post Content - Truncated */}
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed text-base">
                    {isPostExpanded(post.id)
                      ? post.content
                      : truncateContent(post.content, 3)}
                    {!isPostExpanded(post.id) && "..."}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="skill-badge text-xs">{tag}</span>
                  ))}
                </div>

                {/* Read More / Read Less Button */}
                <button
                  onClick={() =>
                    setExpandedPostId(
                      isPostExpanded(post.id) ? null : post.id
                    )
                  }
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-base transition-colors"
                >
                  {isPostExpanded(post.id) ? "Read Less" : "Read More"}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      isPostExpanded(post.id) ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Read on LinkedIn */}
                <a
                  href={post.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-base mt-2 transition-colors"
                >
                  Read Full Post on LinkedIn
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-foreground text-white rounded-2xl p-8 text-center space-y-4 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern id="blogCtaDots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" fillOpacity="0.04" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#blogCtaDots)" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold relative z-10">More Insights Coming Soon</h3>
          <p className="text-lg opacity-90 relative z-10">Follow me on LinkedIn for the latest growth strategies and marketing insights</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <a
              href="https://linkedin.com/in/vaibhavvijay10"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-3 font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
            >
              Follow on LinkedIn
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
