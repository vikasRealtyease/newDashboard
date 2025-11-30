"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Icon } from "@iconify/react";

export function ProductSection() {
    return (
        <div className="flex h-full w-full flex-col items-center bg-default-background">
            <Navbar />

            {/* Hero */}
            <div className="container max-w-none flex w-full flex-col items-center gap-12 pt-24 pb-24">
                <div className="flex w-full max-w-[768px] flex-col items-center gap-6 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 px-4 py-2 text-sm font-medium text-brand-primary dark:text-brand-400">
                        <Icon icon="ic:baseline-memory" className="h-4 w-4" />
                        Powered by Human Intelligence & AI
                    </span>
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-[56px] font-semibold leading-[64px] text-default-font">
                            The Ultimate Hybrid Workforce
                        </span>
                        <span className="text-[20px] font-normal leading-[28px] text-subtext-color">
                            Combine the creativity and empathy of expert Virtual Assistants with the speed and precision of cutting-edge AI tools.
                        </span>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="container max-w-none flex w-full flex-col items-center gap-16 bg-neutral-50 dark:bg-neutral-900 pt-24 pb-24">
                <div className="flex w-full max-w-[768px] flex-col items-center gap-4 text-center">
                    <span className="text-[40px] font-semibold leading-[48px] text-default-font">
                        Everything You Need to Scale
                    </span>
                    <span className="text-[18px] font-normal leading-[26px] text-subtext-color">
                        A complete suite of services and tools designed for modern businesses.
                    </span>
                </div>

                <div className="grid w-full max-w-[1024px] grid-cols-1 gap-8 md:grid-cols-2">
                    {[
                        {
                            icon: <Icon icon="ic:baseline-people" className="h-6 w-6" />,
                            title: "Dedicated Virtual Assistants",
                            desc: "Get matched with a VA who understands your industry. From admin tasks to project management, they handle it all.",
                            features: ["Vetted Professionals", "Time Zone Aligned", "Backup Support"]
                        },
                        {
                            icon: <Icon icon="ic:baseline-bolt" className="h-6 w-6" />,
                            title: "AI Automation Suite",
                            desc: "Automate repetitive tasks with our proprietary AI tools. Content generation, data entry, and scheduling on autopilot.",
                            features: ["Workflow Automation", "Smart Scheduling", "Data Processing"]
                        },
                        {
                            icon: <Icon icon="ic:baseline-brush" className="h-6 w-6" />,
                            title: "Content & Design",
                            desc: "Create stunning visuals and engaging copy. Our VAs use AI to produce high-quality content at scale.",
                            features: ["Social Media Graphics", "Blog Writing", "Video Editing"]
                        },
                        {
                            icon: <Icon icon="ic:baseline-bar-chart" className="h-6 w-6" />,
                            title: "Analytics & Reporting",
                            desc: "Track performance in real-time. Get detailed reports on VA hours, tasks completed, and AI usage.",
                            features: ["Real-time Dashboard", "Weekly Reports", "ROI Tracking"]
                        }
                    ].map((feature, i) => (
                        <div key={i} className="flex flex-col gap-6 rounded-lg border border-neutral-border dark:border-neutral-700 bg-default-background p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-400">
                                {feature.icon}
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-heading-2 font-heading-2 text-default-font">{feature.title}</span>
                                <span className="text-body font-body text-subtext-color">{feature.desc}</span>
                            </div>
                            <div className="flex flex-col gap-3 mt-auto">
                                {feature.features.map((item, j) => (
                                    <div key={j} className="flex items-center gap-2">
                                        <Icon icon="ic:baseline-check" className="h-4 w-4 text-success-600" />
                                        <span className="text-body font-body text-default-font">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="container max-w-none flex w-full flex-col items-center gap-8 bg-brand-primary pt-24 pb-24">
                <div className="flex w-full max-w-[768px] flex-col items-center gap-6 text-center">
                    <span className="text-[48px] font-semibold leading-[56px] text-white">
                        Ready to transform your workflow?
                    </span>
                    <div className="flex items-center gap-4">
                        <button className="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-neutral-100 px-6 py-3 text-lg font-semibold text-black shadow-lg hover:bg-neutral-100 dark:hover:bg-neutral-200 hover:shadow-xl transition-all duration-300">
                            Get Started Now
                            <Icon icon="mdi:arrow-right" className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
