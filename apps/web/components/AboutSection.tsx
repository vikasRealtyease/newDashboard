"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Button, Badge } from "./SimpleComponents";
import { Icon } from "@iconify/react";

export function AboutSection() {
    return (
        <div className="flex h-full w-full flex-col items-center bg-default-background">
            <Navbar />

            {/* Hero */}
            <div className="container max-w-none flex w-full flex-col items-center gap-12 pt-24 pb-24">
                <div className="flex w-full max-w-[768px] flex-col items-center gap-6 text-center">
                    <Badge
                        variant="brand"
                        icon={<Icon icon="ic:baseline-favorite" className="h-4 w-4" />}
                    >
                        Our Mission
                    </Badge>
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-[56px] font-[600] leading-[64px] text-default-font">
                            Empowering Businesses to Grow Faster
                        </span>
                        <span className="text-[20px] font-[400] leading-[28px] text-subtext-color">
                            We believe in the power of human creativity amplified by artificial intelligence. Our mission is to make elite support accessible to everyone.
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="w-full border-y border-neutral-border dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 py-12">
                <div className="container mx-auto grid grid-cols-2 gap-8 md:grid-cols-4">
                    {[
                        { label: "Active Clients", value: "500+" },
                        { label: "Tasks Completed", value: "1M+" },
                        { label: "VAs Trained", value: "250+" },
                        { label: "Countries Served", value: "30+" }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <span className="text-[36px] font-[700] text-brand-600">{stat.value}</span>
                            <span className="text-body font-body text-subtext-color">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Story */}
            <div className="container max-w-none flex w-full flex-col items-center gap-16 pt-24 pb-24">
                <div className="grid w-full max-w-[1024px] grid-cols-1 gap-12 md:grid-cols-2 items-center">
                    <div className="flex flex-col gap-6">
                        <span className="text-[32px] font-[600] text-default-font">Our Story</span>
                        <div className="flex flex-col gap-4 text-subtext-color text-lg">
                            <p>
                                Founded in 2024, RealtyEaseAI started with a simple observation: business owners were spending too much time on repetitive tasks and not enough on strategy.
                            </p>
                            <p>
                                We realized that while AI was powerful, it lacked the human touch. And while VAs were great, they could be even better with the right tools.
                            </p>
                            <p>
                                So we built a platform that combines the best of both worlds. A place where vetted VAs use cutting-edge AI to deliver work 10x faster and better.
                            </p>
                        </div>
                    </div>
                    <div className="h-[400px] w-full rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                        <Icon icon="ic:baseline-image" className="text-[64px] text-neutral-300" />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
