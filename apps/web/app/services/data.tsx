import { Icon } from "@iconify/react";

export const SERVICES = {
    "social-media-marketing": {
        title: "Social Media Marketing",
        icon: (props: any) => <Icon icon="mdi:share-variant" {...props} />,
        description: "Expert VAs to manage your social presence and create engaging content that drives real results.",
        heroImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        features: [
            "Content Calendar Planning & Scheduling",
            "Community Engagement & Response Management",
            "Social Listening & Brand Monitoring",
            "Influencer Outreach & Partnerships",
            "Platform-Specific Strategy (Instagram, LinkedIn, Twitter, TikTok)",
            "Analytics & Performance Reporting",
            "Hashtag Research & Optimization",
            "Social Media Advertising Management"
        ],
        benefits: [
            "Increase Brand Awareness",
            "Drive Website Traffic",
            "Generate Quality Leads",
            "Build Engaged Community",
            "Improve Customer Loyalty",
            "Boost Sales & Conversions",
            "Stay Ahead of Trends",
            "Save 20+ Hours Weekly"
        ]
    },
    "digital-marketing": {
        title: "Digital Marketing",
        icon: (props: any) => <Icon icon="mdi:trending-up" {...props} />,
        description: "Comprehensive digital marketing strategies including SEO, PPC, email campaigns, and analytics managed by certified professionals.",
        heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        features: [
            "Search Engine Optimization (SEO)",
            "Pay-Per-Click (PPC) Advertising",
            "Email Marketing Campaigns",
            "Conversion Rate Optimization (CRO)",
            "Marketing Automation Setup",
            "Google Analytics & Tag Manager",
            "A/B Testing & Experimentation",
            "Content Marketing Strategy"
        ],
        benefits: [
            "Higher Search Rankings",
            "Lower Customer Acquisition Cost",
            "Increased ROI",
            "Targeted Audience Reach",
            "Data-Driven Decisions",
            "Improved Conversion Rates",
            "Scalable Growth",
            "Competitive Advantage"
        ]
    },
    "web-development": {
        title: "Web Development",
        icon: (props: any) => <Icon icon="mdi:code-tags" {...props} />,
        description: "Build and maintain stunning, high-performance websites with our technical VA team specialized in modern frameworks.",
        heroImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
        features: [
            "Custom Website Design & Development",
            "Frontend Development (React, Next.js, Vue)",
            "Backend Development (Node.js, Python, PHP)",
            "E-commerce Solutions (Shopify, WooCommerce)",
            "Website Maintenance & Updates",
            "Performance Optimization & Speed",
            "Mobile-First Responsive Design",
            "Security & SSL Implementation"
        ],
        benefits: [
            "Lightning-Fast Loading Speeds",
            "Fully Mobile Responsive",
            "Secure & Scalable Architecture",
            "SEO-Optimized Structure",
            "User-Friendly Interface",
            "Cross-Browser Compatible",
            "Easy Content Management",
            "Ongoing Support & Updates"
        ]
    },
    "ai-automation": {
        title: "AI Automation",
        icon: (props: any) => <Icon icon="mdi:flash" {...props} />,
        description: "Leverage cutting-edge AI tools for content creation, workflow automation, and intelligent business processes.",
        heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        features: [
            "Custom AI Chatbot Development",
            "Automated Content Generation (GPT-4)",
            "Workflow Automation & Integration",
            "Data Analysis & Predictive Insights",
            "Document Processing & OCR",
            "Email Automation & Personalization",
            "AI-Powered Customer Support",
            "Intelligent Task Routing"
        ],
        benefits: [
            "Save 30+ Hours Weekly",
            "Reduce Human Error by 95%",
            "24/7 Automated Operations",
            "Infinitely Scalable",
            "Lower Operational Costs",
            "Faster Decision Making",
            "Improved Accuracy",
            "Competitive Edge"
        ]
    },
    "admin-services": {
        title: "Admin Services",
        icon: (props: any) => <Icon icon="mdi:briefcase" {...props} />,
        description: "Comprehensive administrative support for all non-technical tasks that require the human touch and attention to detail.",
        heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
        features: [
            "Calendar & Schedule Management",
            "Email Management & Organization",
            "Data Entry & Database Management",
            "Document Preparation & Formatting",
            "CRM Management (Salesforce, HubSpot)",
            "Invoice Processing & Bookkeeping",
            "Customer Service & Support",
            "Travel Arrangements & Coordination",
            "Meeting Coordination & Minutes",
            "Spreadsheet Management & Reporting"
        ],
        benefits: [
            "Focus on Core Business",
            "Improved Organization",
            "Better Time Management",
            "Reduced Administrative Burden",
            "Professional Communication",
            "Accurate Record Keeping",
            "Cost-Effective Solution",
            "Flexible Support Hours"
        ]
    }
};

export type ServiceSlug = keyof typeof SERVICES;
