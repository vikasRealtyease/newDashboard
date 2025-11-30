"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Badge, Button } from "./SimpleComponents";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatedSection } from "../app/components/AnimatedSection";
import { GradientBlob } from "../app/components/GradientBlob";
import { motion } from "framer-motion";
import Link from "next/link";

const PRICING_TIERS = [
    {
        id: "starter",
        name: "Starter",
        price: 1499,
        hours: "40 hours/month",
        description: "Perfect for solo entrepreneurs",
        features: [
            "1 Part-Time VA",
            "Dashboard Access",
            "Weekly Progress Reports",
            "Email Support",
            "Task Management System"
        ]
    },
    {
        id: "growth",
        name: "Growth",
        price: 2699,
        hours: "80 hours/month",
        description: "Ideal for growing businesses",
        features: [
            "1 Full-Time VA",
            "Dashboard Access",
            "Bi-weekly Strategy Calls",
            "Priority Support",
            "Social Media Management",
            "Content Calendar Planning"
        ],
        popular: true
    },
    {
        id: "business",
        name: "Business",
        price: 4299,
        hours: "120 hours/month",
        description: "For established businesses",
        features: [
            "1-2 Dedicated VAs",
            "Dashboard Access",
            "Weekly Strategy Calls",
            "Priority Support + Slack",
            "Advanced Analytics",
            "Custom Workflow Automation"
        ]
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: 6999,
        hours: "160+ hours/month",
        description: "Full-scale support",
        features: [
            "2-3 Dedicated VAs",
            "Dashboard Access",
            "Daily Strategy Calls",
            "24/7 Premium Support",
            "Dedicated Account Manager",
            "White-Label Solutions"
        ]
    }
];

export function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <div className="flex h-full w-full flex-col items-center bg-default-background">
            <Navbar />

            <div className="container max-w-none flex w-full flex-col items-center gap-12 pt-32 pb-24 relative overflow-hidden">
                <GradientBlob className="top-0 left-1/4 w-[600px] h-[600px]" color="brand" />
                <GradientBlob className="top-20 right-1/4 w-[500px] h-[500px]" color="success" />

                <AnimatedSection className="flex w-full max-w-[900px] flex-col items-center gap-6 z-10">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Badge
                            variant="brand"
                            className="shadow-lg shadow-brand-500/20"
                            icon={<Icon icon="mdi:currency-usd" className="h-4 w-4" />}
                        >
                            Flexible Plans for Every Business
                        </Badge>
                    </motion.div>

                    <div className="flex flex-col items-center gap-6 text-center">
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight text-default-font tracking-tight">
                            Choose Your{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-600 via-brand-500 to-brand-400">
                                Growth Plan
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl leading-relaxed text-subtext-color max-w-[700px]">
                            Get expert VAs and powerful AI tools. Scale as you grow.
                        </p>
                    </div>

                    {/* Annual Toggle */}
                    <motion.div
                        className="flex items-center gap-4 p-2 rounded-full bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!isAnnual ? 'bg-brand-600 text-white' : 'text-subtext-color'}`}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="relative h-7 w-12 rounded-full transition-colors bg-neutral-200"
                        >
                            <motion.div
                                className="absolute top-1 h-5 w-5 rounded-full bg-brand-600 shadow-md"
                                animate={{ x: isAnnual ? 24 : 4 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isAnnual ? 'bg-brand-600 text-white' : 'text-subtext-color'}`}>
                            Yearly <span className="text-success-300 font-bold">(Save 20%)</span>
                        </span>
                    </motion.div>
                </AnimatedSection>

                <div className="grid w-full max-w-[1300px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 z-10">
                    {PRICING_TIERS.map((tier, index) => (
                        <AnimatedSection key={tier.id} delay={index * 0.1}>
                            <motion.div
                                className={`flex flex-col gap-6 rounded-2xl border-2 p-8 h-full relative overflow-hidden ${tier.popular
                                    ? 'border-brand-600 bg-linear-to-br from-brand-50 to-white dark:from-brand-900/20 dark:to-neutral-800 shadow-2xl'
                                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-lg hover:shadow-2xl'
                                    } transition-all duration-300`}
                                whileHover={{ y: -8, scale: tier.popular ? 1 : 1.02 }}
                            >
                                {tier.popular && (
                                    <>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-brand-400/20 to-transparent rounded-full blur-2xl" />
                                        <Badge
                                            variant="brand"
                                            className="self-start shadow-lg z-10"
                                            icon={<Icon icon="mdi:star" className="h-3 w-3 text-white fill-white" />}
                                        >
                                            Most Popular
                                        </Badge>
                                    </>
                                )}

                                <div className="flex flex-col gap-2 z-10">
                                    <h3 className="text-2xl font-bold text-default-font">
                                        {tier.name}
                                    </h3>
                                    <p className="text-sm text-subtext-color">
                                        {tier.description}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2 z-10">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-bold text-brand-600">
                                            ${isAnnual ? (tier.price * 10).toLocaleString() : tier.price.toLocaleString()}
                                        </span>
                                        <span className="text-base font-medium text-subtext-color">
                                            /{isAnnual ? 'year' : 'mo'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-subtext-color font-medium">
                                        {tier.hours}
                                    </p>
                                    {isAnnual && (
                                        <motion.p
                                            className="text-sm font-semibold text-success-600 flex items-center gap-1"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <Icon icon="mdi:trending-down" className="h-4 w-4" />
                                            Save ${(tier.price * 2).toLocaleString()} annually
                                        </motion.p>
                                    )}
                                </div>

                                <div className="h-px bg-neutral-200 dark:bg-neutral-700 my-2" />

                                <div className="flex flex-col gap-4 z-10 flex-1">
                                    {tier.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="h-5 w-5 rounded-full bg-success-100 flex items-center justify-center shrink-0 mt-0.5">
                                                <Icon icon="mdi:check" className="h-3 w-3 text-success-600" />
                                            </div>
                                            <span className="text-sm text-default-font leading-relaxed">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/signup" className="z-10 mt-auto">
                                    <Button
                                        variant={tier.popular ? "brand-primary" : "neutral-secondary"}
                                        iconRight={<Icon icon="mdi:arrow-right" className="h-4 w-4" />}
                                        className={`w-full transition-all duration-300 ${tier.popular ? 'shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40' : 'hover:bg-neutral-100'}`}
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </motion.div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Coming Soon - AI Tools */}
                <AnimatedSection className="w-full max-w-[1300px] mt-16 z-10">
                    <motion.div
                        className="relative overflow-hidden rounded-3xl border-2 border-brand-200 dark:border-brand-700 bg-linear-to-br from-brand-50 via-white to-brand-50 dark:from-brand-900/20 dark:via-neutral-800 dark:to-brand-900/20 p-12"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
                        </div>

                        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <Badge
                                    variant="brand"
                                    className="shadow-lg"
                                    icon={<Icon icon="mdi:sparkles" className="h-4 w-4" />}
                                >
                                    Coming Soon
                                </Badge>
                            </motion.div>

                            <div className="flex flex-col gap-4 max-w-[700px]">
                                <h2 className="text-3xl md:text-5xl font-bold text-default-font">
                                    AI Tools Suite
                                </h2>
                                <p className="text-lg md:text-xl text-subtext-color leading-relaxed">
                                    We're building powerful AI automation tools to supercharge your VAs. Get early access when we launch!
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[900px] mt-6">
                                {[
                                    {
                                        icon: "mdi:file-document-outline",
                                        title: "AI Content Generator",
                                        description: "Generate blog posts, social media content, and emails in seconds"
                                    },
                                    {
                                        icon: "mdi:robot",
                                        title: "Smart Chatbots",
                                        description: "Custom AI chatbots for customer support and lead generation"
                                    },
                                    {
                                        icon: "mdi:sitemap",
                                        title: "Workflow Automation",
                                        description: "Automate repetitive tasks and streamline your processes"
                                    }
                                ].map((tool, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-brand-200 dark:border-brand-700 hover:border-brand-400 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="h-12 w-12 rounded-xl bg-linear-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-md">
                                            <Icon icon={tool.icon} className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="font-bold text-default-font">{tool.title}</h3>
                                        <p className="text-sm text-subtext-color text-center leading-relaxed">
                                            {tool.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-4"
                            >
                                <Link href="/contact">
                                    <Button
                                        size="large"
                                        iconRight={<Icon icon="mdi:bell" className="h-5 w-5" />}
                                        className="shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40"
                                    >
                                        Get Notified at Launch
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatedSection>
            </div>

            {/* FAQ or Additional Info */}
            <div className="w-full bg-neutral-50 dark:bg-neutral-900 py-24">
                <AnimatedSection className="container max-w-none flex flex-col items-center gap-12">
                    <div className="flex flex-col items-center gap-4 text-center max-w-[768px]">
                        <Badge
                            variant="brand"
                            className="shadow-md"
                            icon={<Icon icon="mdi:information" className="h-4 w-4" />}
                        >
                            All Plans Include
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-default-font">
                            Everything You Need to Succeed
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] w-full">
                        {[
                            {
                                icon: "mdi:shield-check",
                                title: "100% Money-Back Guarantee",
                                description: "Not satisfied within 30 days? Get a full refund, no questions asked."
                            },
                            {
                                icon: "mdi:view-dashboard",
                                title: "Real-Time Dashboard",
                                description: "Track your VA's progress, tasks, and performance with our intuitive dashboard."
                            },
                            {
                                icon: "mdi:accounts",
                                title: "Dedicated Support Team",
                                description: "Your success is our priority. Get personalized support from day one."
                            }
                        ].map((item, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <motion.div
                                    className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 hover:border-brand-300 hover:shadow-xl transition-all duration-300 text-center"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg">
                                        <Icon icon={item.icon} className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-default-font">{item.title}</h3>
                                    <p className="text-sm text-subtext-color leading-relaxed">{item.description}</p>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </AnimatedSection>
            </div>

            <Footer />
        </div>
    );
}
