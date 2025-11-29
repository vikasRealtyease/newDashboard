"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@realtyeaseai/ui";

const faqs = [
    {
        question: "What makes RealtyEaseAI different from other VA services?",
        answer:
            "Unlike traditional VA services, we combine human expertise with proprietary AI tools. Our VAs have access to enterprise-grade AI for content creation, analytics, and automation, multiplying their productivity by 10x. You get the empathy and creativity of a human with the speed and efficiency of AI.",
    },
    {
        question: "How quickly can I get started?",
        answer:
            "You can get started in less than 48 hours! After signing up, you'll complete a quick onboarding questionnaire. Our AI matches you with the perfect VA from our vetted talent pool, and we handle all the training and setup. Most clients are fully operational within 2 business days.",
    },
    {
        question: "What tasks can your Virtual Assistants handle?",
        answer:
            "Our VAs can handle a wide range of tasks including social media management, content creation, email marketing, customer support, data entry, scheduling, research, web development support, SEO optimization, and much more. If you have a specific need, just ask - we likely have a specialist for it!",
    },
    {
        question: "How do you ensure quality and security?",
        answer:
            "All our VAs go through a rigorous 5-stage vetting process including background checks, skill assessments, and trial projects. We use enterprise-grade security protocols, sign NDAs, and provide SOC 2 compliant infrastructure. You also get real-time performance dashboards to track quality metrics.",
    },
    {
        question: "What are your pricing plans?",
        answer:
            "We offer flexible pricing based on your needs - from part-time (20 hours/week) to full-time (40+ hours/week) VAs. Plans start at $999/month for part-time support. All plans include access to our AI tools suite, dedicated account manager, and 24/7 support. We also offer a 14-day free trial with no credit card required.",
    },
    {
        question: "Can I scale my team as my business grows?",
        answer:
            "Absolutely! One of our key advantages is scalability. You can easily add more VAs to your team, upgrade to more hours, or access specialized talent as your needs evolve. There are no long-term contracts - scale up or down with just 7 days notice.",
    },
    {
        question: "What if I'm not satisfied with my VA?",
        answer:
            "We offer a 100% satisfaction guarantee. If you're not happy with your VA within the first 14 days, we'll replace them at no cost or provide a full refund. We also conduct regular check-ins and performance reviews to ensure you're always getting the best service possible.",
    },
    {
        question: "Do you offer custom AI solutions for enterprise clients?",
        answer:
            "Yes! For enterprise clients, we offer custom AI tool development, dedicated VA teams, white-label solutions, and integration with your existing systems. Contact our enterprise sales team to discuss your specific requirements and get a tailored proposal.",
    },
];

export function FAQSection() {
    return (
        <div className="w-full bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 py-24 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(28,162,220,0.08),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.06),transparent_50%)]" />
            </div>

            <div className="container max-w-none relative z-10">
                {/* Section Header */}
                <motion.div
                    className="flex flex-col items-center gap-6 text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700 text-brand-600 dark:text-brand-300 text-sm font-medium">
                        <Icon icon="mdi:help-circle" className="h-4 w-4" />
                        <span>FAQ</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-default-font leading-tight max-w-[800px]">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg md:text-xl text-subtext-color max-w-[700px] leading-relaxed">
                        Everything you need to know about RealtyEaseAI and our services
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <motion.div
                    className="max-w-[900px] mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 shadow-xl p-6 md:p-10">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border-neutral-200 dark:border-neutral-700"
                                >
                                    <AccordionTrigger className="text-left hover:text-brand-600 transition-colors text-base md:text-lg font-semibold text-default-font py-6">
                                        <div className="flex items-start gap-3">
                                            <Icon
                                                icon="mdi:help-circle-outline"
                                                className="h-6 w-6 text-brand-500 shrink-0 mt-0.5"
                                            />
                                            <span>{faq.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-subtext-color leading-relaxed pl-9 pr-4">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </motion.div>

                {/* Still have questions CTA */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 border border-brand-200 dark:border-brand-700">
                        <div className="flex items-center gap-2 text-default-font">
                            <Icon icon="mdi:chat-question" className="h-6 w-6 text-brand-600" />
                            <h3 className="text-xl font-bold">Still have questions?</h3>
                        </div>
                        <p className="text-subtext-color max-w-[500px]">
                            Can't find the answer you're looking for? Our friendly team is here to help.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <span>Contact Support</span>
                            <Icon icon="mdi:arrow-right" className="h-5 w-5" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
