"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

export function Footer() {
    return (
        <footer className="w-full border-t border-neutral-border bg-default-background pt-16 pb-8">
            <div className="container mx-auto flex flex-col gap-12 px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-3">
                            <img
                                src="/images/logos/RealtyEaseAI-05.png"
                                alt="RealtyEaseAI Logo"
                                className="h-12 w-auto"
                            />
                        </Link>
                        <p className="text-sm text-subtext-color max-w-[240px]">
                            Empowering businesses with expert virtual assistants and cutting-edge AI automation tools.
                        </p>
                        <div className="flex items-center gap-4 text-subtext-color">
                            <Link href="#" className="hover:text-brand-600 transition-colors"><Icon icon="mdi:twitter" className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-brand-600 transition-colors"><Icon icon="mdi:facebook" className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-brand-600 transition-colors"><Icon icon="mdi:instagram" className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-brand-600 transition-colors"><Icon icon="mdi:linkedin" className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-brand-600 transition-colors"><Icon icon="mdi:github" className="h-5 w-5" /></Link>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="flex flex-col gap-4">
                        <span className="font-semibold text-default-font">Services</span>
                        <div className="flex flex-col gap-2 text-sm text-subtext-color">
                            <Link href="/services/social-media-marketing" className="hover:text-brand-600 transition-colors">Social Media Marketing</Link>
                            <Link href="/services/digital-marketing" className="hover:text-brand-600 transition-colors">Digital Marketing</Link>
                            <Link href="/services/web-development" className="hover:text-brand-600 transition-colors">Web Development</Link>
                            <Link href="/services/ai-automation" className="hover:text-brand-600 transition-colors">AI Automation</Link>
                            <Link href="/services/admin-services" className="hover:text-brand-600 transition-colors">Admin Services</Link>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-4">
                        <span className="font-semibold text-default-font">Company</span>
                        <div className="flex flex-col gap-2 text-sm text-subtext-color">
                            <Link href="/about" className="hover:text-brand-600 transition-colors">About Us</Link>
                            <Link href="/careers" className="hover:text-brand-600 transition-colors">Careers</Link>
                            <Link href="/contact" className="hover:text-brand-600 transition-colors">Contact</Link>
                            <Link href="#" className="hover:text-brand-600 transition-colors">Blog</Link>
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col gap-4">
                        <span className="font-semibold text-default-font">Legal</span>
                        <div className="flex flex-col gap-2 text-sm text-subtext-color">
                            <Link href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-brand-600 transition-colors">Terms of Service</Link>
                            <Link href="#" className="hover:text-brand-600 transition-colors">Cookie Policy</Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-border pt-8 md:flex-row">
                    <span className="text-sm text-subtext-color">
                        © {new Date().getFullYear()} RealtyEaseAI. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}
