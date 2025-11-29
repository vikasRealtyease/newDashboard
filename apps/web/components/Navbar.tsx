"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { href: "/product", label: "Product" },
        { href: "/pricing", label: "Pricing" },
        { href: "/services", label: "Services" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" }
    ];

    return (
        <>
            {/* Desktop Navbar */}
            <div className="sticky top-6 z-50 w-full px-4 pointer-events-none hidden md:flex justify-center">
                <div className="pointer-events-auto w-full max-w-[1024px]">
                    <nav className="w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/20 dark:border-neutral-700/20 shadow-xl rounded-full px-6 py-3 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <img
                                src="/images/logos/RealtyEaseAI-05.png"
                                alt="RealtyEase AI Logo"
                                className="h-8 w-auto"
                            />
                        </Link>
                        <div className="flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-base font-medium transition-colors ${pathname === item.href
                                        ? 'text-brand-primary'
                                        : 'text-neutral-700 dark:text-neutral-300 hover:text-brand-primary'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <button className="px-4 py-2 text-base font-medium text-brand-primary hover:text-brand-600 transition-all duration-300 hover:scale-105">
                                    Log in
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="px-4 py-2 text-base font-medium bg-brand-primary text-white rounded-full hover:bg-brand-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                    Sign up
                                </button>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="sticky top-0 z-50 w-full md:hidden bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-700 shadow-lg">
                <div className="flex items-center justify-between px-4 py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <img
                            src="/images/logos/RealtyEaseAI-05.png"
                            alt="RealtyEaseAI Logo"
                            className="h-10 w-auto"
                        />
                    </Link>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="h-10 w-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center transition-colors"
                        aria-label="Toggle menu"
                    >
                        <Icon
                            icon={mobileMenuOpen ? "mdi:close" : "mdi:menu"}
                            className="h-6 w-6 text-default-font transition-transform duration-300"
                        />
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                        >
                            <div className="flex flex-col p-4 gap-2">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`block px-4 py-3 rounded-lg font-medium transition-all ${pathname === item.href
                                                ? "bg-brand-50 text-brand-600"
                                                : "text-default-font hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <button className="w-full px-4 py-3 rounded-lg border-2 border-brand-600 text-brand-600 font-semibold hover:bg-brand-50 transition-colors">
                                            Log in
                                        </button>
                                    </Link>
                                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                        <button className="w-full px-4 py-3 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow-lg">
                                            Sign up
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
