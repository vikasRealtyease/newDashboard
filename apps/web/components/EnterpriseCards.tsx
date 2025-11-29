"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { ReactNode } from "react";

interface StatCardProps {
    icon: string;
    value: string;
    label: string;
    gradient: string;
    delay?: number;
}

export function StatCard({ icon, value, label, gradient, delay = 0 }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 p-6 hover:border-brand-300 transition-all duration-300 hover:shadow-xl"
        >
            {/* Gradient Background on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

            <div className="relative z-10 flex flex-col gap-4">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon icon={icon} className="h-6 w-6 text-white" />
                </div>
                <div>
                    <div className="text-3xl font-bold text-default-font mb-1">{value}</div>
                    <div className="text-sm text-subtext-color">{label}</div>
                </div>
            </div>
        </motion.div>
    );
}

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    gradient: string;
    delay?: number;
}

export function FeatureCard({ icon, title, description, gradient, delay = 0 }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 p-8 hover:border-brand-300 transition-all duration-300 hover:shadow-2xl"
        >
            {/* Animated Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

            {/* Spotlight Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            <div className="relative z-10 flex flex-col gap-4">
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                    <Icon icon={icon} className="h-7 w-7 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-default-font mb-2 group-hover:text-brand-600 transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-subtext-color leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

interface BentoCardProps {
    icon: string;
    title: string;
    description: string;
    gradient: string;
    size?: "small" | "medium" | "large";
    children?: ReactNode;
}

export function BentoCard({ icon, title, description, gradient, size = "medium", children }: BentoCardProps) {
    const sizeClasses = {
        small: "col-span-1 row-span-1",
        medium: "col-span-1 md:col-span-2 row-span-1",
        large: "col-span-1 md:col-span-2 row-span-2"
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`group relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 p-8 hover:border-brand-300 transition-all duration-500 hover:shadow-2xl ${sizeClasses[size]}`}
        >
            {/* Animated Mesh Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

            <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon icon={icon} className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-default-font mb-1">{title}</h3>
                        <p className="text-sm text-subtext-color">{description}</p>
                    </div>
                </div>
                {children && <div className="flex-1 mt-4">{children}</div>}
            </div>
        </motion.div>
    );
}

interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar?: string;
    gradient: string;
    delay?: number;
}

export function TestimonialCard({ quote, author, role, company, avatar, gradient, delay = 0 }: TestimonialCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 p-8 hover:border-brand-300 transition-all duration-300 hover:shadow-2xl h-full flex flex-col"
        >
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon icon="mdi:format-quote-close" className="h-16 w-16 text-brand-600" />
            </div>

            <div className="relative z-10 flex flex-col gap-6 flex-1">
                {/* Stars */}
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Icon key={star} icon="mdi:star" className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                </div>

                {/* Quote */}
                <p className="text-base text-default-font leading-relaxed italic flex-1">
                    "{quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-white shadow-lg`}>
                        {author[0]}
                    </div>
                    <div>
                        <div className="font-semibold text-default-font">{author}</div>
                        <div className="text-sm text-subtext-color">{role} at {company}</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
