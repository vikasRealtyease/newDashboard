"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeaderProps {
    badge?: string;
    badgeIcon?: ReactNode;
    title: string;
    subtitle?: string;
    centered?: boolean;
}

export function SectionHeader({ badge, badgeIcon, title, subtitle, centered = true }: SectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col gap-4 ${centered ? 'text-center items-center' : 'text-left items-start'}`}
        >
            {badge && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700 text-brand-700 dark:text-brand-300 text-sm font-medium">
                    {badgeIcon}
                    <span>{badge}</span>
                </div>
            )}
            <h2 className="text-4xl md:text-5xl font-bold text-default-font leading-tight max-w-3xl">
                {title}
            </h2>
            {subtitle && (
                <p className="text-lg md:text-xl text-subtext-color leading-relaxed max-w-2xl">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}

interface ProcessStepProps {
    number: number;
    title: string;
    description: string;
    icon: ReactNode;
    delay?: number;
}

export function ProcessStep({ number, title, description, icon, delay = 0 }: ProcessStepProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            className="relative flex gap-6 group"
        >
            {/* Number Badge */}
            <div className="flex-shrink-0">
                <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {number}
                    </div>
                    {/* Connecting Line */}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-brand-300 to-transparent" />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-12">
                <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 p-6 group-hover:border-brand-300 group-hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/50 transition-colors">
                            {icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-default-font mb-2">{title}</h3>
                            <p className="text-subtext-color leading-relaxed">{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

interface PricingCardProps {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    buttonText?: string;
    onButtonClick?: () => void;
}

export function PricingCard({
    name,
    price,
    period,
    description,
    features,
    highlighted = false,
    buttonText = "Get Started",
    onButtonClick
}: PricingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8 }}
            className={`relative overflow-hidden rounded-3xl p-8 transition-all duration-300 ${highlighted
                ? 'bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-2xl scale-105 border-2 border-brand-400'
                : 'bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 hover:border-brand-300 hover:shadow-xl'
                }`}
        >
            {highlighted && (
                <div className="absolute top-6 right-6">
                    <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold">
                        POPULAR
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-6">
                <div>
                    <h3 className={`text-2xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-default-font'}`}>
                        {name}
                    </h3>
                    <p className={`text-sm ${highlighted ? 'text-brand-100' : 'text-subtext-color'}`}>
                        {description}
                    </p>
                </div>

                <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-bold ${highlighted ? 'text-white' : 'text-default-font'}`}>
                        {price}
                    </span>
                    <span className={`text-lg ${highlighted ? 'text-brand-100' : 'text-subtext-color'}`}>
                        /{period}
                    </span>
                </div>

                <button
                    onClick={onButtonClick}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${highlighted
                        ? 'bg-white text-brand-600 hover:bg-brand-50 shadow-lg hover:shadow-xl'
                        : 'bg-brand-600 text-white hover:bg-brand-700 shadow-md hover:shadow-lg'
                        }`}
                >
                    {buttonText}
                </button>

                <div className="flex flex-col gap-3 pt-6 border-t border-white/20">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <svg className={`h-5 w-5 flex-shrink-0 mt-0.5 ${highlighted ? 'text-brand-200' : 'text-success-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className={`text-sm ${highlighted ? 'text-brand-50' : 'text-default-font'}`}>
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
