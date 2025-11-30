"use client";

import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Button, Badge, IconWithBackground } from "../../components/SimpleComponents";
import { Icon } from "@iconify/react";

export default function CareersPage() {
    return (
        <div className="flex h-full w-full flex-col items-center bg-default-background">
            <Navbar />

            {/* Hero */}
            <div className="container max-w-none flex w-full flex-col items-center gap-12 pt-24 pb-24">
                <div className="flex w-full max-w-[768px] flex-col items-center gap-6 text-center">
                    <Badge
                        variant="brand"
                        icon={<Icon icon="ic:baseline-work" className="h-4 w-4" />}
                    >
                        We're Hiring
                    </Badge>
                    <div className="flex flex-col items-center gap-4">
                        <h1 className="text-[56px] font-semibold leading-[64px] text-default-font">
                            Join the Future of Work
                        </h1>
                        <p className="text-[20px] font-normal leading-[28px] text-subtext-color">
                            Help us build the world's most advanced hybrid workforce platform.
                        </p>
                    </div>
                </div>
            </div>

            {/* Open Roles */}
            <div className="container max-w-none flex w-full flex-col items-center gap-16 bg-neutral-50 pt-24 pb-24">
                <div className="w-full max-w-[1024px] flex flex-col gap-6">
                    {[
                        {
                            title: "Senior Full Stack Engineer",
                            dept: "Engineering",
                            loc: "Remote",
                            type: "Full-time"
                        },
                        {
                            title: "AI Research Scientist",
                            dept: "AI Lab",
                            loc: "San Francisco / Remote",
                            type: "Full-time"
                        },
                        {
                            title: "Product Marketing Manager",
                            dept: "Marketing",
                            loc: "New York / Remote",
                            type: "Full-time"
                        },
                        {
                            title: "Customer Success Lead",
                            dept: "Operations",
                            loc: "Remote",
                            type: "Full-time"
                        }
                    ].map((job, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg border border-neutral-border bg-default-background p-6 hover:border-brand-300 transition-colors cursor-pointer group">
                            <div className="flex flex-col gap-2">
                                <span className="text-heading-3 font-heading-3 text-default-font group-hover:text-brand-600 transition-colors">
                                    {job.title}
                                </span>
                                <div className="flex items-center gap-4 text-subtext-color text-sm">
                                    <div className="flex items-center gap-1">
                                        <Icon icon="ic:baseline-work" className="h-4 w-4" /> {job.dept}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Icon icon="ic:baseline-location-on" className="h-4 w-4" /> {job.loc}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Icon icon="ic:baseline-access-time" className="h-4 w-4" /> {job.type}
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="neutral-secondary"
                                className="group-hover:bg-brand-50 group-hover:text-brand-700"
                                iconRight={<Icon icon="ic:baseline-arrow-forward" className="h-4 w-4" />}
                            >
                                Apply Now
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
