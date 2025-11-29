"use client";

import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SERVICES } from "./data";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "../../components/EnterpriseComponents";
import { DotPattern } from "../../components/BackgroundPatterns";
import { GradientBlob } from "../components/GradientBlob";

export default function ServicesPage() {
    const servicesList = Object.entries(SERVICES).map(([slug, service]) => ({
        slug,
        ...service
    }));

    return (
        <div className="flex h-full w-full flex-col items-center bg-default-background">
            <Navbar />

            {/* Hero Section */}
            <div className="container max-w-none flex w-full flex-col items-center gap-12 pt-32 pb-24 relative overflow-hidden">
                <DotPattern className="opacity-50" />
                <GradientBlob className="top-0 left-1/4 w-[600px] h-[600px] opacity-40" color="brand" />
                <GradientBlob className="top-20 right-1/4 w-[500px] h-[500px] opacity-40" color="purple" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex w-full max-w-[900px] flex-col items-center gap-8 text-center z-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium">
                        <Icon icon="mdi:briefcase" className="h-4 w-4" />
                        <span>Our Services</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-bold leading-tight text-default-font tracking-tight">
                        Comprehensive Solutions for{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 animate-gradient">
                            Every Business Need
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl leading-relaxed text-subtext-color max-w-[700px]">
                        From social media to AI automation, we provide expert virtual assistants equipped with cutting-edge tools to help your business scale.
                    </p>
                </motion.div>
            </div>

            {/* Services Grid */}
            <div className="container max-w-none flex w-full flex-col items-center gap-16 py-24 relative">
                <div className="grid w-full max-w-[1400px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 z-10">
                    {servicesList.map((service, index) => {
                        const ServiceIcon = service.icon;
                        const gradients = [
                            "from-brand-500 to-brand-600",
                            "from-success-500 to-success-600",
                            "from-purple-500 to-purple-600",
                            "from-warning-500 to-warning-600",
                            "from-error-500 to-error-600"
                        ];

                        return (
                            <motion.div
                                key={service.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Link href={`/services/${service.slug}`} className="block h-full group">
                                    <motion.div
                                        className="flex h-full flex-col gap-6 rounded-3xl border-2 border-neutral-200 dark:border-neutral-700 bg-neutral-0 dark:bg-neutral-800 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                                        whileHover={{ y: -8, scale: 1.02 }}
                                    >
                                        {/* Gradient Background on Hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                                        {/* Icon */}
                                        <div className="relative z-10">
                                            <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                                                <ServiceIcon className="h-8 w-8 text-white" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col gap-3 relative z-10 flex-1">
                                            <h3 className="text-2xl font-bold text-default-font group-hover:text-brand-600 transition-colors">
                                                {service.title}
                                            </h3>
                                            <p className="text-subtext-color leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Features Preview */}
                                        <div className="flex flex-col gap-2 relative z-10">
                                            {service.features.slice(0, 3).map((feature, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-subtext-color">
                                                    <Icon icon="mdi:check" className="h-4 w-4 text-success-500 flex-shrink-0" />
                                                    <span className="line-clamp-1">{feature}</span>
                                                </div>
                                            ))}
                                            {service.features.length > 3 && (
                                                <span className="text-sm text-brand-600 font-medium">
                                                    +{service.features.length - 3} more features
                                                </span>
                                            )}
                                        </div>

                                        {/* CTA */}
                                        <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2 relative z-10">
                                            <span>Learn more</span>
                                            <Icon icon="mdi:arrow-right" className="h-4 w-4" />
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Why Choose Our Services */}
            <div className="w-full bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 py-24 relative overflow-hidden">
                <GradientBlob className="top-0 right-20 w-[500px] h-[500px]" color="success" animate={false} />

                <div className="container max-w-none flex flex-col items-center gap-16 relative z-10">
                    <SectionHeader
                        badge="Why Choose Us"
                        badgeIcon={<Icon icon="mdi:star" className="h-4 w-4" />}
                        title="The RealtyEaseAI Advantage"
                        subtitle="We don't just provide services—we deliver results with a unique combination of human expertise and AI power"
                    />

                    <div className="grid w-full max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: "mdi:accounts",
                                title: "Expert Team",
                                description: "Vetted professionals with proven track records in their fields",
                                gradient: "from-brand-500 to-brand-600"
                            },
                            {
                                icon: "mdi:flash",
                                title: "AI-Powered",
                                description: "Cutting-edge AI tools that multiply productivity and efficiency",
                                gradient: "from-purple-500 to-purple-600"
                            },
                            {
                                icon: "mdi:shield-check",
                                title: "Quality Assured",
                                description: "Rigorous quality checks and performance monitoring",
                                gradient: "from-success-500 to-success-600"
                            },
                            {
                                icon: "mdi:headphones",
                                title: "24/7 Support",
                                description: "Dedicated account manager always available when you need us",
                                gradient: "from-warning-500 to-warning-600"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="flex flex-col items-center gap-4 text-center p-6 rounded-2xl hover:bg-white dark:hover:bg-neutral-800 hover:shadow-lg transition-all duration-300"
                            >
                                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                                    <Icon icon={item.icon} className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-default-font mb-2">{item.title}</h3>
                                    <p className="text-sm text-subtext-color leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="w-full bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                <GradientBlob className="top-0 left-0 w-[600px] h-[600px]" color="warning" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="container max-w-none flex flex-col items-center gap-8 relative z-10 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-[900px]">
                        Ready to Transform Your Business?
                    </h2>
                    <p className="text-brand-100 text-lg md:text-2xl max-w-[700px] leading-relaxed">
                        Choose the services you need and let our expert team handle the rest.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                        <Link href="/signup">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="h-14 px-10 text-lg font-semibold bg-white text-brand-600 hover:bg-neutral-50 rounded-lg shadow-2xl transition-all flex items-center gap-2"
                            >
                                Get Started Now
                                <Icon icon="mdi:arrow-right" className="h-5 w-5" />
                            </motion.button>
                        </Link>
                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="h-14 px-10 text-lg bg-transparent backdrop-blur-sm border-2 border-white text-white hover:bg-white/10 rounded-lg transition-all"
                            >
                                Schedule Consultation
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}
