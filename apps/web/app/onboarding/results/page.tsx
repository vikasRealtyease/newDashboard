"use client";

import { useState, useEffect } from "react";
import { Button, Badge } from "../../../components/SimpleComponents";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";

const PRICING_TIERS = {
    starter: {
        name: "Starter",
        price: 1499,
        hours: "40 hours/month",
        vaCount: 1,
        vaType: "Part-Time VA",
        features: [
            "1 Part-Time VA",
            "Basic AI Tools Suite",
            "Weekly Progress Reports",
            "Email Support",
            "Task Management Dashboard"
        ]
    },
    growth: {
        name: "Growth",
        price: 2699,
        hours: "80 hours/month",
        vaCount: 1,
        vaType: "Full-Time VA",
        features: [
            "1 Full-Time VA",
            "Pro AI Tools Suite",
            "Bi-weekly Strategy Calls",
            "Priority Support",
            "Social Media Management",
            "Content Calendar Planning"
        ]
    },
    business: {
        name: "Business",
        price: 4299,
        hours: "120 hours/month",
        vaCount: 2,
        vaType: "1-2 Dedicated VAs",
        features: [
            "1-2 Dedicated VAs",
            "Elite AI Tools Suite",
            "Weekly Strategy Calls",
            "Priority Support + Slack",
            "Advanced Analytics",
            "Custom Workflow Automation"
        ]
    },
    enterprise: {
        name: "Enterprise",
        price: 6999,
        hours: "160+ hours/month",
        vaCount: 3,
        vaType: "2-3 Dedicated VAs",
        features: [
            "2-3 Dedicated VAs",
            "Elite AI + Custom Tools",
            "Daily Strategy Calls",
            "24/7 Premium Support",
            "Dedicated Account Manager",
            "White-Label Solutions"
        ]
    }
};

export default function OnboardingResults() {
    const [recommendedTier, setRecommendedTier] = useState<keyof typeof PRICING_TIERS>("growth");
    const [estimatedHours, setEstimatedHours] = useState(60);

    useEffect(() => {
        // In a real app, this would be calculated from the onboarding data
        // For now, we'll use default values
        calculateRecommendation();
    }, []);

    const calculateRecommendation = () => {
        // This would use the actual onboarding data
        // For demo purposes, we'll use placeholder logic
        const hours = 60; // Example
        setEstimatedHours(hours);

        if (hours <= 40) {
            setRecommendedTier("starter");
        } else if (hours <= 80) {
            setRecommendedTier("growth");
        } else if (hours <= 120) {
            setRecommendedTier("business");
        } else {
            setRecommendedTier("enterprise");
        }
    };

    const tier = PRICING_TIERS[recommendedTier];

    return (
        <div className="flex h-full w-full flex-col items-center bg-default-background">
            <Navbar />

            <div className="container max-w-5xl mx-auto px-4 py-16">
                {/* Success Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success-100 mb-6">
                        <Icon icon="mdi:check" className="h-10 w-10 text-success-600" />
                    </div>
                    <h1 className="text-5xl font-bold text-default-font mb-4">
                        Perfect! Here's Your Recommendation
                    </h1>
                    <p className="text-xl text-subtext-color max-w-2xl mx-auto">
                        Based on your needs, we've calculated the ideal setup for your business
                    </p>
                </motion.div>

                {/* Recommendation Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-linear-to-br from-brand-50 to-white rounded-2xl border-2 border-brand-200 p-8 mb-8"
                >
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <Icon icon="mdi:clock-outline" className="h-12 w-12 text-brand-600 mx-auto mb-3" />
                            <h3 className="text-3xl font-bold text-default-font mb-2">{estimatedHours} hrs</h3>
                            <p className="text-sm text-subtext-color">Estimated Hours Needed/Month</p>
                        </div>
                        <div>
                            <Icon icon="mdi:accounts" className="h-12 w-12 text-brand-600 mx-auto mb-3" />
                            <h3 className="text-3xl font-bold text-default-font mb-2">{tier.vaCount} VA{tier.vaCount > 1 ? 's' : ''}</h3>
                            <p className="text-sm text-subtext-color">Recommended Virtual Assistants</p>
                        </div>
                        <div>
                            <Icon icon="mdi:target" className="h-12 w-12 text-brand-600 mx-auto mb-3" />
                            <h3 className="text-3xl font-bold text-default-font mb-2">{tier.name}</h3>
                            <p className="text-sm text-subtext-color">Best Fit Plan</p>
                        </div>
                    </div>
                </motion.div>

                {/* Recommended Plan Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-white rounded-2xl border-2 border-brand-500 p-8 shadow-2xl mb-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 bg-brand-600 text-white px-6 py-2 rounded-bl-2xl font-semibold flex items-center gap-2">
                        <Icon icon="mdi:star" className="h-4 w-4 fill-white" />
                        Recommended for You
                    </div>

                    <div className="mt-8">
                        <h2 className="text-4xl font-bold text-default-font mb-2">{tier.name} Plan</h2>
                        <p className="text-lg text-subtext-color mb-6">{tier.hours}</p>

                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-5xl font-bold text-brand-600">
                                ${tier.price}
                            </span>
                            <span className="text-xl text-subtext-color">/month</span>
                        </div>

                        <div className="space-y-4 mb-8">
                            <h3 className="font-semibold text-lg text-default-font mb-4">
                                What's Included:
                            </h3>
                            {tier.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="h-6 w-6 rounded-full bg-success-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <Icon icon="mdi:check" className="h-4 w-4 text-success-600" />
                                    </div>
                                    <span className="text-default-font">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/pricing">
                            <Button
                                size="large"
                                iconRight={<Icon icon="mdi:arrow-right" className="h-5 w-5" />}
                                className="w-full"
                            >
                                Get Started with {tier.name}
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Why This Plan Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-neutral-50 rounded-2xl p-8 mb-8"
                >
                    <h3 className="text-2xl font-bold text-default-font mb-6 flex items-center gap-3">
                        <Icon icon="mdi:lightbulb-on" className="h-6 w-6 text-warning-500" />
                        Why We Recommend {tier.name}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-lg bg-brand-100 flex items-center justify-center shrink-0">
                                <Icon icon="mdi:check-circle" className="h-5 w-5 text-brand-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-default-font mb-1">Perfect Hour Match</h4>
                                <p className="text-sm text-subtext-color">
                                    Your estimated {estimatedHours} hours/month fits perfectly within the {tier.hours} allocation
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-lg bg-brand-100 flex items-center justify-center shrink-0">
                                <Icon icon="mdi:trending-up" className="h-5 w-5 text-brand-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-default-font mb-1">Room to Grow</h4>
                                <p className="text-sm text-subtext-color">
                                    Built-in flexibility for your business to scale without changing plans
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-lg bg-brand-100 flex items-center justify-center shrink-0">
                                <Icon icon="mdi:currency-usd" className="h-5 w-5 text-brand-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-default-font mb-1">Best Value</h4>
                                <p className="text-sm text-subtext-color">
                                    Optimal cost-per-hour ratio for your business size and needs
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-lg bg-brand-100 flex items-center justify-center shrink-0">
                                <Icon icon="mdi:flash" className="h-5 w-5 text-brand-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-default-font mb-1">Right Tools</h4>
                                <p className="text-sm text-subtext-color">
                                    Includes all the AI tools and features you need for your goals
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Compare All Plans */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center"
                >
                    <p className="text-subtext-color mb-4">
                        Want to see all available plans?
                    </p>
                    <Link href="/pricing">
                        <Button
                            variant="neutral-secondary"
                            iconRight={<Icon icon="mdi:open-in-new" className="h-4 w-4" />}
                        >
                            Compare All Plans
                        </Button>
                    </Link>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}
