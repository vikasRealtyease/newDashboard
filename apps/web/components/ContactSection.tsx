"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Button, Badge, TextField, IconWithBackground } from "./SimpleComponents";
import { Icon } from "@iconify/react";

export function ContactSection() {
    return (
        <div className="flex h-full w-full flex-col items-center bg-default-background">
            <Navbar />

            <div className="container max-w-none flex w-full flex-col items-center gap-12 pt-24 pb-24">
                <div className="flex w-full max-w-[768px] flex-col items-center gap-6 text-center">
                    <Badge
                        variant="brand"
                        icon={<Icon icon="ic:baseline-email" className="h-4 w-4" />}
                    >
                        Get in Touch
                    </Badge>
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-[56px] font-semibold leading-[64px] text-default-font">
                            We'd Love to Hear from You
                        </span>
                        <span className="text-[20px] font-normal leading-[28px] text-subtext-color">
                            Have questions about our services or pricing? Our team is ready to help.
                        </span>
                    </div>
                </div>

                <div className="grid w-full max-w-[1024px] grid-cols-1 gap-12 md:grid-cols-2">
                    {/* Contact Info */}
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-6">
                            <span className="text-[24px] font-semibold text-default-font">Contact Information</span>
                            <div className="flex flex-col gap-6">
                                {[
                                    { icon: <Icon icon="ic:baseline-location-on" className="h-5 w-5" />, title: "Office", desc: "123 Innovation Dr, Tech City, TC 90210" },
                                    { icon: <Icon icon="ic:baseline-email" className="h-5 w-5" />, title: "Email", desc: "hello@realtyease.ai" },
                                    { icon: <Icon icon="ic:baseline-phone" className="h-5 w-5" />, title: "Phone", desc: "+1 (555) 123-4567" },
                                    { icon: <Icon icon="ic:baseline-access-time" className="h-5 w-5" />, title: "Hours", desc: "Mon-Fri: 9am - 6pm EST" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <IconWithBackground icon={item.icon} />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-heading-3 font-heading-3 text-default-font">{item.title}</span>
                                            <span className="text-body font-body text-subtext-color">{item.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 rounded-lg bg-brand-50 dark:bg-brand-900/20 p-6 border border-brand-100 dark:border-brand-700">
                            <span className="text-heading-3 font-heading-3 text-brand-700">Need immediate help?</span>
                            <span className="text-body font-body text-brand-600">
                                Check out our Help Center for frequently asked questions and guides.
                            </span>
                            <Button variant="brand-tertiary" className="self-start">
                                Visit Help Center
                            </Button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="flex flex-col gap-6 rounded-lg border border-neutral-border dark:border-neutral-700 bg-default-background p-8 shadow-sm">
                        <div className="flex flex-col gap-2">
                            <span className="text-[24px] font-semibold text-default-font">Send us a message</span>
                            <span className="text-body font-body text-subtext-color">We usually respond within 24 hours.</span>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <TextField label="First Name" placeholder="John" />
                                <TextField label="Last Name" placeholder="Doe" />
                            </div>
                            <TextField label="Email" placeholder="john@example.com" />
                            <TextField label="Subject" placeholder="How can we help?" />

                            <div className="flex flex-col gap-1">
                                <span className="text-caption font-caption-bold text-default-font">Message</span>
                                <textarea
                                    className="min-h-[120px] w-full rounded-md border border-neutral-border dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-body font-body text-default-font placeholder:text-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                                    placeholder="Tell us more about your needs..."
                                />
                            </div>

                            <Button size="large" className="w-full">
                                Send Message
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
