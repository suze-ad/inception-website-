export const SECTIONS = [
  {
    id: 1,
    title: "Goals & Audience",
    shortTitle: "Goals & Audience",
    icon: "Target",
    badge: "Foundation",
    description: "Tell us about your business goals and who you are trying to reach.",
    questionRange: "1–4",
  },
  {
    id: 2,
    title: "Brand & Content",
    shortTitle: "Brand & Content",
    icon: "Palette",
    badge: "Aesthetics",
    description: "Let's define the look, feel, and content of your new website.",
    questionRange: "5–8",
  },
  {
    id: 3,
    title: "Tech & Timeline",
    shortTitle: "Tech & Timeline",
    icon: "Cpu",
    badge: "Execution",
    description: "Technical requirements, features, and project schedule.",
    questionRange: "9–12",
  },
  {
    id: 9,
    title: "Final Insights & Review",
    shortTitle: "Review & Export",
    icon: "Sparkles",
    badge: "Wrap-up",
    description: "Share any final thoughts and generate your brief.",
    questionRange: "Final",
  }
];

export const QUESTIONS = [
  // SECTION 1: Goals & Audience
  {
    id: "q1",
    num: 1,
    sectionId: 1,
    title: "What is the primary goal of this website?",
    description: "Choose the main objective you want this website to achieve.",
    type: "radio_custom",
    options: [
      { label: "Generate Leads", desc: "Collect inquiries, quote requests, or emails" },
      { label: "Sell Products", desc: "E-commerce and direct online sales" },
      { label: "Build Brand Awareness", desc: "Showcase portfolio, services, and company info" },
      { label: "Customer Support", desc: "Provide resources, portals, and documentation" }
    ]
  },
  {
    id: "q2",
    num: 2,
    sectionId: 1,
    title: "Who is your primary target audience?",
    description: "Select the group that best represents your ideal customer.",
    type: "radio_custom",
    options: [
      { label: "B2B (Business to Business)", desc: "Other companies and professionals" },
      { label: "B2C (Business to Consumer)", desc: "General public and individual buyers" },
      { label: "Both (B2B & B2C)", desc: "A mix of businesses and consumers" },
      { label: "Niche Audience", desc: "A very specific, specialized group" }
    ]
  },
  {
    id: "q3",
    num: 3,
    sectionId: 1,
    title: "What is your customers' biggest pain point?",
    description: "What problem are they trying to solve when they come to you?",
    type: "radio_custom",
    options: [
      { label: "Saving Time", desc: "They need a faster, more efficient solution" },
      { label: "Saving Money", desc: "They are looking for cost-effective alternatives" },
      { label: "Improving Quality", desc: "They want premium, reliable results" },
      { label: "Reducing Risk", desc: "They need security, compliance, or peace of mind" }
    ]
  },
  {
    id: "q4",
    num: 4,
    sectionId: 1,
    title: "Why are you redesigning/building the site now?",
    description: "What is the catalyst for this project?",
    type: "radio_custom",
    options: [
      { label: "Outdated Design", desc: "The current site looks old or unprofessional" },
      { label: "Poor Performance", desc: "It's slow, not mobile-friendly, or buggy" },
      { label: "Business Pivot", desc: "We offer new services or target a new audience" },
      { label: "Brand New Business", desc: "We don't have a website yet" }
    ]
  },

  // SECTION 2: Brand & Content
  {
    id: "q5",
    num: 5,
    sectionId: 2,
    title: "What describes your brand's personality best?",
    description: "How do you want visitors to feel when they land on your site?",
    type: "radio_custom",
    options: [
      { label: "Professional & Corporate", desc: "Trustworthy, established, and serious" },
      { label: "Modern & Innovative", desc: "Cutting-edge, sleek, and tech-forward" },
      { label: "Friendly & Approachable", desc: "Warm, conversational, and helpful" },
      { label: "Bold & Edgy", desc: "Loud, highly creative, and disruptive" }
    ]
  },
  {
    id: "q6",
    num: 6,
    sectionId: 2,
    title: "Do you have existing brand assets?",
    description: "Select what you already have ready for the website.",
    type: "multi_select",
    options: [
      { label: "Logo & Colors", desc: "Brand guidelines are established" },
      { label: "Professional Photos", desc: "High-quality images of team/products" },
      { label: "Written Content", desc: "Copywriting is mostly complete" },
      { label: "None / Starting Fresh", desc: "We need help creating these" }
    ]
  },
  {
    id: "q7",
    num: 7,
    sectionId: 2,
    title: "Roughly how many pages will the site need?",
    description: "Estimate the size of the project.",
    type: "radio_custom",
    options: [
      { label: "Small (1-5 pages)", desc: "Landing page, About, Contact, Services" },
      { label: "Medium (5-15 pages)", desc: "Standard business site with a blog" },
      { label: "Large (15+ pages)", desc: "Extensive resources, portfolios, or e-commerce" }
    ]
  },
  {
    id: "q8",
    num: 8,
    sectionId: 2,
    title: "Who will write the content (text) for the site?",
    description: "Content is often the biggest bottleneck. Who is responsible?",
    type: "radio_custom",
    options: [
      { label: "We will provide all content", desc: "Ready to go before design starts" },
      { label: "We need a copywriter", desc: "Please include copywriting in the scope" },
      { label: "We will write it together", desc: "We need frameworks, but will write it" }
    ]
  },

  // SECTION 3: Tech & Timeline
  {
    id: "q9",
    num: 9,
    sectionId: 3,
    title: "What specific features are required?",
    description: "Select any advanced functionality needed.",
    type: "multi_select",
    options: [
      { label: "E-Commerce", desc: "Shopping cart and payments" },
      { label: "User Accounts", desc: "Login, profiles, and dashboards" },
      { label: "Booking System", desc: "Scheduling appointments or events" },
      { label: "Custom Search/Filtering", desc: "Advanced directories or catalogs" }
    ]
  },
  {
    id: "q10",
    num: 10,
    sectionId: 3,
    title: "Do you need third-party integrations?",
    description: "Select systems that must connect to the website.",
    type: "multi_select",
    options: [
      { label: "CRM (HubSpot, Salesforce)", desc: "For lead management" },
      { label: "Email Marketing (Mailchimp)", desc: "For newsletters" },
      { label: "ERP / Inventory", desc: "For syncing stock or data" },
      { label: "None", desc: "Just standard email notifications" }
    ]
  },
  {
    id: "q11",
    num: 11,
    sectionId: 3,
    title: "What is your target launch timeline?",
    description: "When do you need the new website live?",
    type: "radio_custom",
    options: [
      { label: "ASAP (1-2 weeks)", desc: "We need something up immediately" },
      { label: "Standard (4-8 weeks)", desc: "A normal project timeline" },
      { label: "Flexible (3+ months)", desc: "No strict rush, let's take our time" }
    ]
  },
  {
    id: "q12",
    num: 12,
    sectionId: 3,
    title: "What is your estimated budget range?",
    description: "This helps align expectations with feasible solutions.",
    type: "radio_custom",
    options: [
      { label: "$5k - $10k", desc: "Standard custom business site" },
      { label: "$10k - $25k", desc: "Advanced features or e-commerce" },
      { label: "$25k+", desc: "Complex web application or platform" },
      { label: "Not Sure Yet", desc: "Need a proposal first" }
    ]
  },
  
  // FINAL (Section 9)
  {
    id: "q_final",
    num: "Final",
    sectionId: 9,
    title: "Any additional requirements or inspiration?",
    description: "Share links to sites you like, specific constraints, or anything else we should know.",
    type: "textarea",
    placeholder: "Example: I really love the animations on stripe.com..."
  }
];

export const INITIAL_CLIENT_INFO = {
  name: "",
  company: "",
  email: "",
  projectType: "New Website",
  budget: "Not sure yet"
};

export const SAMPLE_ANSWERS = {};
