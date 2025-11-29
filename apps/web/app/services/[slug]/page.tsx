"use client";

import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { Button, Badge } from "../../../components/SimpleComponents";
import { SERVICES } from "../data";
import { Icon } from "@iconify/react";
import { notFound } from "next/navigation";
import { use } from "react";
import { AnimatedSection } from "../../components/AnimatedSection";
import { GradientBlob } from "../../components/GradientBlob";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const service = SERVICES[slug as keyof typeof SERVICES];

    if (!service) {
        notFound();
    }

    const ServiceIcon = service.icon;

    return (
        <div className="flex h-full w-full flex-col items-center bg-default-background">
            <Navbar />

            {/* Hero */}
            <div className="container max-w-none flex w-full flex-col items-center gap-12 pt-32 pb-24 relative overflow-hidden">
                <GradientBlob className="top-0 left-1/4 w-[600px] h-[600px]" color="brand" />
                <GradientBlob className="top-20 right-1/4 w-[500px] h-[500px]" color="success" />

                <AnimatedSection className="flex w-full max-w-[900px] flex-col items-center gap-6 text-center z-10">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Badge
                            variant="brand"
                            className="shadow-lg shadow-brand-500/20"
                            icon={<ServiceIcon className="h-4 w-4" />}
                        >
                            {service.title}
                        </Badge>
                    </motion.div>

                    <div className="flex flex-col items-center gap-6">
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight text-default-font tracking-tight">
                            {service.title} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400">
                                Services
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl leading-relaxed text-subtext-color max-w-[700px]">
                            {service.description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                        <Link href="/signup">
                            <Button
                                size="large"
                                iconRight={<Icon icon="mdi:arrow-right" className="h-5 w-5" />}
                                className="shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 transition-all duration-300 hover:-translate-y-1"
                            >
                                Get Started
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button
                                size="large"
                                variant="neutral-secondary"
                                className="hover:bg-neutral-100 transition-all duration-300"
                            >
                                Book a Call
                            </Button>
                        </Link>
                    </div>
                </AnimatedSection>
            </div>

            {/* Content */}
            <div className="container max-w-none flex w-full flex-col items-center gap-16 bg-gradient-to-b from-neutral-50 to-white pt-24 pb-24 relative overflow-hidden">
                <GradientBlob className="top-20 right-10 w-[400px] h-[400px]" color="warning" animate={false} />

                <div className="grid w-full max-w-[1200px] grid-cols-1 gap-16 md:grid-cols-2 items-start z-10">
                    <AnimatedSection>
                        <div className="flex flex-col gap-8 sticky top-32">
                            <div className="flex flex-col gap-4">
                                <Badge
                                    variant="brand"
                                    className="w-fit"
                                    icon={<Icon icon="mdi:sparkles" className="h-3 w-3" />}
                                >
                                    What We Offer
                                </Badge>
                                <h2 className="text-3xl md:text-4xl font-bold text-default-font">
                                    Expert {service.title} Solutions
                                </h2>
                                <p className="text-lg text-subtext-color leading-relaxed">
                                    Our team of experts uses the latest tools and strategies to deliver exceptional results for your business. We combine human expertise with AI-powered efficiency to maximize your ROI.
                                </p>
                            </div>

                            <motion.div
                                className="rounded-2xl overflow-hidden shadow-2xl border-2 border-neutral-200 relative group"
                                whileHover={{ y: -5, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                <img
                                    src={service.heroImage}
                                    alt={service.title}
                                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
                            </motion.div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <div className="flex flex-col gap-6">
                            <h3 className="text-2xl font-bold text-default-font">Key Features</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {service.features.map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-start gap-4 p-5 rounded-xl bg-white border-2 border-neutral-200 hover:border-brand-300 hover:shadow-lg transition-all duration-300 group"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        whileHover={{ x: 4 }}
                                    >
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform shadow-md">
                                            <Icon icon="mdi:check" className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="text-base font-medium text-default-font flex-1">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>

            {/* Benefits */}
            <div className="container max-w-none flex w-full flex-col items-center gap-16 pt-24 pb-24">
                <AnimatedSection className="flex w-full max-w-[768px] flex-col items-center gap-4 text-center">
                    <Badge
                        variant="brand"
                        className="shadow-md"
                        icon={<Icon icon="mdi:target" className="h-4 w-4" />}
                    >
                        Benefits
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-default-font">
                        Why Choose Us
                    </h2>
                    <p className="text-lg md:text-xl text-subtext-color leading-relaxed">
                        Experience the advantages of working with industry-leading {service.title.toLowerCase()} experts
                    </p>
                </AnimatedSection>

                <div className="grid w-full max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {service.benefits.map((benefit, i) => (
                        <AnimatedSection key={i} delay={i * 0.1}>
                            <motion.div
                                className="flex flex-col gap-4 p-8 rounded-2xl border-2 border-neutral-200 bg-white hover:border-brand-300 hover:shadow-xl transition-all duration-300 h-full group"
                                whileHover={{ y: -5 }}
                            >
                                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                                    {i + 1}
                                </div>
                                <h3 className="text-xl font-bold text-default-font group-hover:text-brand-600 transition-colors">
                                    {benefit}
                                </h3>
                            </motion.div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="w-full bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                <GradientBlob className="top-0 right-0 w-[500px] h-[500px]" color="warning" />

                <AnimatedSection className="container max-w-none flex flex-col items-center gap-8 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-[800px]">
                        Ready to Transform Your {service.title}?
                    </h2>
                    <p className="text-brand-100 text-lg md:text-xl max-w-[600px] leading-relaxed">
                        Join hundreds of businesses already benefiting from our expert services.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                        <Link href="/signup">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    size="large"
                                    variant="neutral-secondary"
                                    iconRight={<Icon icon="mdi:arrow-right" className="h-5 w-5 !text-black" />}
                                    className="h-14 px-10 text-lg font-semibold shadow-2xl bg-white hover:bg-neutral-50 [&>span]:!text-black"
                                >
                                    Get Started Now
                                </Button>
                            </motion.div>
                        </Link>
                        <Link href="/contact">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    size="large"
                                    className="h-14 px-10 text-lg bg-transparent backdrop-blur-sm border-2 border-white text-white hover:bg-white/10"
                                >
                                    Schedule Consultation
                                </Button>
                            </motion.div>
                        </Link>
                    </div>
                </AnimatedSection>
            </div>

            <Footer />
        </div>
    );
}
