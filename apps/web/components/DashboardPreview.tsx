"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@realtyeaseai/ui";
import {
    Calendar,
    PenSquare,
    BarChart3,
    Users,
    Bot,
    Sparkles,
    MessageSquare,
    CreditCard
} from "lucide-react";

export function DashboardPreview() {
    const features = [
        {
            id: "content-calendar",
            icon: Calendar,
            title: "Content Calendar",
            description: "Visual calendar to manage all your social media posts",
            color: "from-blue-500 to-cyan-500",
            image: "/dashboard-previews/content-calendar.png", // We'll add these
        },
        {
            id: "create-post",
            icon: PenSquare,
            title: "Create Post",
            description: "Multi-platform post creator with AI assistance",
            color: "from-purple-500 to-pink-500",
            image: "/dashboard-previews/create-post.png",
        },
        {
            id: "analytics",
            icon: BarChart3,
            title: "Social Analytics",
            description: "Track performance across all platforms",
            color: "from-green-500 to-emerald-500",
            image: "/dashboard-previews/analytics.png",
        },
        {
            id: "team",
            icon: Users,
            title: "Team Management",
            description: "Manage your team and assign tasks",
            color: "from-orange-500 to-red-500",
            image: "/dashboard-previews/team.png",
        },
        {
            id: "va",
            icon: Bot,
            title: "Virtual Assistants",
            description: "Your dedicated VAs at your fingertips",
            color: "from-indigo-500 to-purple-500",
            image: "/dashboard-previews/va.png",
        },
        {
            id: "ai-tools",
            icon: Sparkles,
            title: "AI Tools Hub",
            description: "AI-powered content generation and automation",
            color: "from-yellow-500 to-orange-500",
            image: "/dashboard-previews/ai-tools.png",
        },
    ];

    return (
        <section className="py-24 bg-linear-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(28,162,220,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_50%)]" />
            </div>

            <div className="container max-w-none relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700 text-brand-600 dark:text-brand-300 text-sm font-medium mb-6">
                        <Sparkles className="h-4 w-4" />
                        <span>Your Dashboard</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-default-font mb-6">
                        Everything You Need in{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-600 to-purple-600">
                            One Place
                        </span>
                    </h2>
                    <p className="text-xl text-subtext-color">
                        A powerful, intuitive dashboard designed for seamless collaboration between you and your virtual assistants
                    </p>
                </motion.div>

                {/* Feature Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Tabs defaultValue="content-calendar" className="w-full">
                        {/* Tab Navigation */}
                        <div className="flex justify-center mb-12">
                            <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2 bg-white dark:bg-neutral-800 p-2 rounded-2xl shadow-lg border-2 border-neutral-200 dark:border-neutral-700">
                                {features.map((feature) => {
                                    const Icon = feature.icon;
                                    return (
                                        <TabsTrigger
                                            key={feature.id}
                                            value={feature.id}
                                            className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-linear-to-br data-[state=active]:from-brand-50 data-[state=active]:to-purple-50 dark:data-[state=active]:from-brand-900/40 dark:data-[state=active]:to-purple-900/40 data-[state=active]:border-brand-300 dark:data-[state=active]:border-brand-600 rounded-xl transition-all"
                                        >
                                            <div className={`h-10 w-10 rounded-lg bg-linear-to-br ${feature.color} flex items-center justify-center`}>
                                                <Icon className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="text-xs font-medium text-center hidden lg:block text-neutral-600 dark:text-neutral-400 data-[state=active]:text-brand-700 dark:data-[state=active]:text-brand-300">
                                                {feature.title}
                                            </span>
                                        </TabsTrigger>
                                    );
                                })}
                            </TabsList>
                        </div>

                        {/* Tab Content */}
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <TabsContent key={feature.id} value={feature.id} className="mt-0">
                                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                                        {/* Feature Info */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="space-y-6"
                                        >
                                            <div className={`inline-flex h-16 w-16 rounded-2xl bg-linear-to-br ${feature.color} items-center justify-center shadow-lg`}>
                                                <Icon className="h-8 w-8 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-bold text-default-font mb-4">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-lg text-subtext-color mb-6">
                                                    {feature.description}
                                                </p>
                                            </div>

                                            {/* Feature Benefits */}
                                            <div className="space-y-3">
                                                {getFeatureBenefits(feature.id).map((benefit, index) => (
                                                    <div key={index} className="flex items-start gap-3">
                                                        <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5">
                                                            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                        <p className="text-neutral-700 dark:text-neutral-300">{benefit}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>

                                        {/* Dashboard Preview */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="relative"
                                        >
                                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
                                                {/* Browser Chrome */}
                                                <div className="bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 px-4 py-3 flex items-center gap-2">
                                                    <div className="flex gap-2">
                                                        <div className="h-3 w-3 rounded-full bg-red-400" />
                                                        <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                                        <div className="h-3 w-3 rounded-full bg-green-400" />
                                                    </div>
                                                    <div className="flex-1 mx-4">
                                                        <div className="bg-white dark:bg-neutral-800 rounded px-3 py-1 text-xs text-neutral-500 dark:text-neutral-400">
                                                            dashboard.realtyease.ai/{feature.id}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Dashboard Component Preview */}
                                                <div className="bg-neutral-50 dark:bg-neutral-900 p-6">
                                                    {renderDashboardPreview(feature.id)}
                                                </div>
                                            </div>

                                            {/* Decorative elements */}
                                            <div className={`absolute -top-6 -right-6 h-32 w-32 rounded-full bg-linear-to-br ${feature.color} opacity-20 blur-3xl`} />
                                            <div className={`absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-linear-to-br ${feature.color} opacity-20 blur-3xl`} />
                                        </motion.div>
                                    </div>
                                </TabsContent>
                            );
                        })}
                    </Tabs>
                </motion.div>
            </div>
        </section>
    );
}

// Helper function to get feature benefits
function getFeatureBenefits(featureId: string): string[] {
    const benefits: Record<string, string[]> = {
        "content-calendar": [
            "Visual calendar view with all scheduled posts",
            "Multi-platform scheduling (Facebook, Instagram, LinkedIn, Twitter, TikTok)",
            "Approval workflow for client review",
            "Status tracking and notifications"
        ],
        "create-post": [
            "Create posts for multiple platforms at once",
            "AI-powered caption and hashtag generation",
            "Live preview for each platform",
            "Media upload and management"
        ],
        "analytics": [
            "Track performance across all social platforms",
            "Engagement metrics and follower growth",
            "Top performing posts insights",
            "Custom date range reporting"
        ],
        "team": [
            "Manage team members and roles",
            "Assign tasks and track progress",
            "Team performance metrics",
            "Collaboration tools"
        ],
        "va": [
            "View all assigned virtual assistants",
            "Track VA availability and workload",
            "Direct messaging with VAs",
            "Performance reviews and ratings"
        ],
        "ai-tools": [
            "AI content generation for social media",
            "Image creation with AI",
            "Copy improvement suggestions",
            "Automated content scheduling"
        ]
    };

    return benefits[featureId] || [];
}

// Helper function to render dashboard preview
function renderDashboardPreview(featureId: string): React.ReactElement {
    // This will show a simplified version of each dashboard component
    const previews: Record<string, React.ReactElement> = {
        "content-calendar": (
            <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="text-center text-xs font-semibold text-neutral-600 py-2">
                            {day}
                        </div>
                    ))}
                    {Array.from({ length: 35 }).map((_, i) => (
                        <div
                            key={i}
                            className={`aspect-square border rounded-lg p-1 ${i % 7 === 0 || i % 7 === 6 ? 'bg-neutral-100' : 'bg-white'
                                } ${i === 15 || i === 18 || i === 22 ? 'border-brand-400 bg-brand-50' : 'border-neutral-200'}`}
                        >
                            <div className="text-xs text-neutral-500">{i + 1}</div>
                            {(i === 15 || i === 18 || i === 22) && (
                                <div className="mt-1 space-y-0.5">
                                    <div className="h-1 bg-blue-400 rounded" />
                                    <div className="h-1 bg-purple-400 rounded" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ),
        "create-post": (
            <div className="space-y-4">
                <div className="grid grid-cols-5 gap-2">
                    {['📘', '📷', '💼', '🐦', '🎵'].map((icon, i) => (
                        <div
                            key={i}
                            className={`p-3 rounded-lg border-2 text-center ${i < 2 ? 'border-brand-400 bg-brand-50' : 'border-neutral-200 bg-white'
                                }`}
                        >
                            <div className="text-2xl mb-1">{icon}</div>
                        </div>
                    ))}
                </div>
                <div className="bg-white rounded-lg border-2 border-neutral-200 p-4 space-y-3">
                    <div className="h-20 bg-neutral-100 rounded" />
                    <div className="flex gap-2">
                        <div className="h-6 bg-brand-100 text-brand-600 rounded px-2 text-xs flex items-center">#realestate</div>
                        <div className="h-6 bg-brand-100 text-brand-600 rounded px-2 text-xs flex items-center">#property</div>
                    </div>
                </div>
            </div>
        ),
        "analytics": (
            <div className="space-y-4">
                <div className="grid grid-cols-4 gap-3">
                    {[
                        { label: 'Followers', value: '24.5K', change: '+12.5%' },
                        { label: 'Engagement', value: '4.8%', change: '+0.8%' },
                        { label: 'Reach', value: '156K', change: '+23.4%' },
                        { label: 'Posts', value: '48', change: '+6' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-lg border border-neutral-200 p-3">
                            <div className="text-xs text-neutral-500 mb-1">{stat.label}</div>
                            <div className="text-lg font-bold text-default-font">{stat.value}</div>
                            <div className="text-xs text-green-600">{stat.change}</div>
                        </div>
                    ))}
                </div>
                <div className="bg-white rounded-lg border border-neutral-200 p-4">
                    <div className="h-32 bg-linear-to-t from-brand-100 to-transparent rounded" />
                </div>
            </div>
        ),
        "team": (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-lg border border-neutral-200 p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-linear-to-br from-brand-400 to-purple-400" />
                        <div className="flex-1">
                            <div className="h-4 bg-neutral-200 rounded w-32 mb-2" />
                            <div className="h-3 bg-neutral-100 rounded w-24" />
                        </div>
                        <div className="h-8 w-20 bg-green-100 rounded" />
                    </div>
                ))}
            </div>
        ),
        "va": (
            <div className="space-y-3">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-lg border-2 border-brand-200 p-4">
                        <div className="flex items-start gap-4">
                            <div className="h-16 w-16 rounded-full bg-linear-to-br from-purple-400 to-pink-400" />
                            <div className="flex-1">
                                <div className="h-4 bg-neutral-200 rounded w-40 mb-2" />
                                <div className="h-3 bg-neutral-100 rounded w-32 mb-3" />
                                <div className="flex gap-2">
                                    <div className="h-6 bg-brand-100 rounded px-2" />
                                    <div className="h-6 bg-purple-100 rounded px-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ),
        "ai-tools": (
            <div className="space-y-4">
                <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200 p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        <div className="h-4 bg-purple-200 rounded w-32" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {['Generate Caption', 'Suggest Hashtags', 'Improve Copy', 'Create Image'].map((text, i) => (
                            <div key={i} className="bg-white rounded-lg border border-purple-200 p-2 text-xs text-center">
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    };

    return previews[featureId] || <div>Preview coming soon</div>;
}
