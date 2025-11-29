"use client";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button, Badge } from "../components/SimpleComponents";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { AnimatedSection } from "./components/AnimatedSection";
import { GradientBlob } from "./components/GradientBlob";
import { DotPattern, GridPattern } from "../components/BackgroundPatterns";
import { StatCard, FeatureCard, TestimonialCard } from "../components/EnterpriseCards";
import { SectionHeader, ProcessStep } from "../components/EnterpriseComponents";
import { FAQSection } from "../components/FAQSection";
import { DashboardPreview } from "../components/DashboardPreview";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center bg-default-background font-sans">
      <Navbar />

      {/* Hero Section - Enhanced */}
      <div className="container max-w-none flex w-full flex-col items-center gap-12 pt-32 pb-24 relative overflow-hidden">
        <DotPattern className="opacity-50" />
        <GradientBlob className="top-0 left-1/4 w-[600px] h-[600px] opacity-40" color="brand" />
        <GradientBlob className="top-20 right-1/4 w-[500px] h-[500px] opacity-40" color="warning" />

        <AnimatedSection className="flex w-full max-w-[900px] flex-col items-center gap-8 text-center z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge
              variant="brand"
              className="shadow-lg shadow-brand-500/20"
              icon={<Icon icon="mdi:flash" className="h-4 w-4" />}
            >
              Trusted by 500+ Growing Businesses
            </Badge>
          </motion.div>

          <div className="flex flex-col items-center gap-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-default-font tracking-tight">
              Scale Your Business with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 animate-gradient">
                Human Empathy & AI Speed
              </span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-subtext-color max-w-[700px]">
              Get dedicated virtual assistants supercharged with our proprietary AI tools.
              Automate the mundane, focus on the strategic.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
            <Link href="/signup">
              <Button
                size="large"
                iconRight={<Icon icon="mdi:arrow-right" className="h-5 w-5" />}
                className="shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="large"
                variant="neutral-secondary"
                className="hover:bg-neutral-100 transition-all duration-300"
              >
                Book Consultation
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 mt-6 text-sm text-subtext-color">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:check-circle" className="h-4 w-4 text-success-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:check-circle" className="h-4 w-4 text-success-500" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:check-circle" className="h-4 w-4 text-success-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Dashboard Preview Section */}
      <DashboardPreview />

      {/* Stats Section - NEW */}
      <div className="w-full bg-white dark:bg-neutral-900 py-16 border-y border-neutral-200 dark:border-neutral-700">
        <div className="container max-w-none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <StatCard
              icon="mdi:accounts"
              value="500+"
              label="Happy Clients"
              gradient="from-brand-500 to-brand-600"
              delay={0}
            />
            <StatCard
              icon="mdi:clock-outline"
              value="50,000+"
              label="Hours Saved"
              gradient="from-success-500 to-success-600"
              delay={0.1}
            />
            <StatCard
              icon="mdi:flash"
              value="1M+"
              label="AI Tasks Completed"
              gradient="from-purple-500 to-purple-600"
              delay={0.2}
            />
            <StatCard
              icon="mdi:trending-up"
              value="98%"
              label="Client Satisfaction"
              gradient="from-warning-500 to-warning-600"
              delay={0.3}
            />
          </div>
        </div>
      </div>

      {/* How It Works Section - NEW */}
      <div className="w-full bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 py-24 relative overflow-hidden">
        <GridPattern className="opacity-20" />

        <div className="container max-w-none relative z-10">
          <SectionHeader
            badge="Simple Process"
            badgeIcon={<Icon icon="mdi:sitemap" className="h-4 w-4" />}
            title="Get Started in 4 Easy Steps"
            subtitle="From onboarding to productivity in less than 48 hours"
          />

          <div className="max-w-3xl mx-auto mt-16">
            <ProcessStep
              number={1}
              title="Tell Us Your Needs"
              description="Complete our quick onboarding questionnaire. Tell us about your business, goals, and the tasks you need help with."
              icon={<Icon icon="mdi:clipboard-list-outline" className="h-6 w-6" />}
              delay={0}
            />
            <ProcessStep
              number={2}
              title="Get Matched with Your VA"
              description="Our AI analyzes your requirements and matches you with the perfect Virtual Assistant from our vetted talent pool."
              icon={<Icon icon="mdi:account-check" className="h-6 w-6" />}
              delay={0.1}
            />
            <ProcessStep
              number={3}
              title="Onboard & Train"
              description="We handle the onboarding. Your VA gets trained on your processes, tools, and brand guidelines."
              icon={<Icon icon="mdi:school" className="h-6 w-6" />}
              delay={0.2}
            />
            <ProcessStep
              number={4}
              title="Scale & Grow"
              description="Watch your productivity soar. Track progress in real-time and scale your team as your business grows."
              icon={<Icon icon="mdi:rocket-launch" className="h-6 w-6" />}
              delay={0.3}
            />
          </div>
        </div>
      </div>

      {/* USP Section - AI Tools */}
      <div className="w-full bg-gradient-to-b from-neutral-50 via-white to-neutral-50 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800 py-24 relative overflow-hidden">
        <GradientBlob className="top-0 right-1/4 w-[500px] h-[500px]" color="brand" animate={false} />
        <GradientBlob className="bottom-0 left-1/4 w-[600px] h-[600px]" color="purple" animate={false} />

        <div className="container max-w-none flex flex-col items-center gap-16 relative z-10">
          <SectionHeader
            badge="Our Secret Sauce"
            badgeIcon={<Icon icon="mdi:sparkles" className="h-4 w-4" />}
            title="Why We're Different"
            subtitle="Most agencies just give you a VA. We give you a VA equipped with an enterprise-grade AI suite that multiplies their output."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1200px]">
            <FeatureCard
              icon="mdi:file-document-outline"
              title="AI Content Engine"
              description="Our VAs use custom LLMs to generate high-quality blog posts, social captions, and emails 10x faster with perfect brand voice consistency."
              gradient="from-brand-500 to-brand-600"
              delay={0}
            />
            <FeatureCard
              icon="mdi:trending-up"
              title="Predictive Analytics"
              description="We don't just report history. Our AI analyzes trends and suggests your next best marketing move with data-driven insights."
              gradient="from-purple-500 to-purple-600"
              delay={0.1}
            />
            <FeatureCard
              icon="mdi:earth"
              title="Auto-Translation"
              description="Expand globally instantly. Our tools translate your content into 30+ languages with native-level nuance and cultural adaptation."
              gradient="from-success-500 to-success-600"
              delay={0.2}
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container max-w-none flex w-full flex-col items-center gap-16 bg-white dark:bg-neutral-950 pt-24 pb-24 relative overflow-hidden">
        <DotPattern className="opacity-30" />

        <SectionHeader
          badge="Services"
          badgeIcon={<Icon icon="mdi:briefcase" className="h-4 w-4" />}
          title="Comprehensive Services"
          subtitle="Everything you need to grow, managed by experts"
        />

        <div className="grid w-full max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 z-10">
          {[
            {
              icon: "mdi:share-variant",
              title: "Social Media Marketing",
              description: "Expert VAs to manage your social presence and create engaging content that drives results.",
              link: "/services/social-media-marketing",
              gradient: "from-brand-500 to-brand-600"
            },
            {
              icon: "mdi:trending-up",
              title: "Digital Marketing",
              description: "SEO, PPC, email campaigns, and analytics managed by skilled professionals with proven track records.",
              link: "/services/digital-marketing",
              gradient: "from-success-500 to-success-600"
            },
            {
              icon: "mdi:code-tags",
              title: "Web Development",
              description: "Build and maintain your website with our technical VA team specialized in modern frameworks.",
              link: "/services/web-development",
              gradient: "from-purple-500 to-purple-600"
            },
            {
              icon: "mdi:flash",
              title: "AI Automation",
              description: "Access cutting-edge AI tools for content creation, data processing, and workflow automation.",
              link: "/services/ai-automation",
              gradient: "from-warning-500 to-warning-600"
            },
            {
              icon: "mdi:briefcase",
              title: "Admin Services",
              description: "Comprehensive administrative support for all non-technical tasks requiring human attention.",
              link: "/services/admin-services",
              gradient: "from-error-500 to-error-600"
            }
          ].map((service, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <Link href={service.link} className="block h-full group">
                <motion.div
                  className="flex h-full flex-col items-start gap-4 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-8 shadow-md hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow relative z-10`}>
                    <Icon icon={service.icon} className="h-7 w-7 text-white" />
                  </div>

                  <div className="flex flex-col items-start gap-2 relative z-10">
                    <h3 className="text-xl font-bold text-default-font group-hover:text-brand-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-subtext-color leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-2 text-brand-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2 relative z-10">
                    <span>Learn more</span>
                    <Icon icon="mdi:arrow-right" className="h-4 w-4" />
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* View All Services Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              View All Services
              <Icon icon="mdi:arrow-right" className="h-5 w-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container max-w-none flex w-full flex-col items-center gap-16 pt-24 pb-24 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(28,162,220,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.08),transparent_50%)]" />
        </div>

        <SectionHeader
          title="Everything You Need to Succeed"
          subtitle="We provide the complete package to help your business thrive"
        />

        <div className="grid w-full max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 z-10">
          {[
            {
              icon: "mdi:clock-outline",
              title: "Flexible Hours",
              description: "Part-time or full-time VAs tailored to your needs and budget",
              bgPattern: "dots",
              iconBg: "from-blue-500 to-blue-600",
              accentColor: "blue"
            },
            {
              icon: "mdi:shield-check",
              title: "Vetted Professionals",
              description: "Thoroughly screened and expertly trained team members",
              bgPattern: "grid",
              iconBg: "from-emerald-500 to-emerald-600",
              accentColor: "emerald"
            },
            {
              icon: "mdi:headphones",
              title: "24/7 Support",
              description: "Dedicated account management always available when you need us",
              bgPattern: "diagonal",
              iconBg: "from-violet-500 to-violet-600",
              accentColor: "violet"
            },
            {
              icon: "mdi:chart-bar",
              title: "Performance Tracking",
              description: "Real-time dashboards and detailed analytics for full transparency",
              bgPattern: "circles",
              iconBg: "from-amber-500 to-amber-600",
              accentColor: "amber"
            }
          ].map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                className="relative flex flex-col items-center gap-4 text-center group p-8 rounded-2xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 hover:border-brand-300 hover:shadow-2xl transition-all duration-300 overflow-hidden h-full"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Background Patterns */}
                {feature.bgPattern === 'dots' && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  </div>
                )}
                {feature.bgPattern === 'grid' && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  </div>
                )}
                {feature.bgPattern === 'diagonal' && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(139,92,246,0.03),rgba(139,92,246,0.03)_10px,transparent_10px,transparent_20px)]" />
                  </div>
                )}
                {feature.bgPattern === 'circles' && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-amber-100/20 blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-amber-200/20 blur-xl" />
                  </div>
                )}

                {/* Icon with unique styling */}
                <div className="relative z-10">
                  <motion.div
                    className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 relative`}
                    whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.iconBg} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300`} />
                    <Icon icon={feature.icon} className="h-10 w-10 text-white relative z-10" />
                  </motion.div>
                </div>

                <div className="flex flex-col items-center gap-2 relative z-10">
                  <h3 className={`text-xl font-bold text-default-font group-hover:text-${feature.accentColor}-600 transition-colors`}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-subtext-color leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${feature.iconBg} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300`} />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="container max-w-none flex w-full flex-col items-center gap-16 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 pt-24 pb-24 relative overflow-hidden">
        <GradientBlob className="top-0 right-20 w-[500px] h-[500px]" color="success" animate={false} />

        <SectionHeader
          badge="Testimonials"
          badgeIcon={<Icon icon="mdi:star" className="h-4 w-4" />}
          title="Loved by Businesses Worldwide"
          subtitle="See what our clients say about working with us"
        />

        <div className="grid w-full max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-3 z-10">
          <TestimonialCard
            quote="This service transformed our workflow. The VA team is incredible and the AI tools save us 20+ hours every week. Best investment we've made."
            author="Sarah Johnson"
            role="CEO"
            company="TechStart Inc"
            gradient="from-brand-500 to-brand-600"
            delay={0}
          />
          <TestimonialCard
            quote="I was skeptical about AI, but RealtyEaseAI made it seamless. My VA handles everything and the output quality is unmatched. Highly recommend!"
            author="Michael Rodriguez"
            role="Marketing Director"
            company="GrowthLabs"
            gradient="from-purple-500 to-purple-600"
            delay={0.1}
          />
          <TestimonialCard
            quote="The best investment we've made this year. Professional, reliable, and the dashboard makes tracking progress so easy. Our productivity has tripled."
            author="Emily Thompson"
            role="Founder"
            company="DesignCo Studio"
            gradient="from-success-500 to-success-600"
            delay={0.2}
          />
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA */}
      <div className="w-full bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.08),transparent_50%)]" />
        <GradientBlob className="top-0 left-0 w-[600px] h-[600px]" color="warning" />

        <AnimatedSection className="container max-w-none flex flex-col items-center gap-8 relative z-10 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Icon icon="mdi:sparkles" className="h-4 w-4" />
            <span>Limited Time Offer - First Month 50% Off</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-[900px]">
            Ready to 10x Your Productivity?
          </h2>
          <p className="text-brand-100 text-lg md:text-2xl max-w-[700px] leading-relaxed">
            Join 500+ businesses using RealtyEaseAI to scale faster and smarter.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="large"
                  variant="neutral-secondary"
                  iconRight={<Icon icon="mdi:arrow-right" className="h-5 w-5" />}
                  className="h-14 px-10 text-lg font-semibold bg-white hover:bg-neutral-50 shadow-2xl transition-all [&>span]:!text-black"
                >
                  Get Started for Free
                </Button>
              </motion.div>
            </Link>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="large"
                  className="h-14 px-10 text-lg bg-transparent backdrop-blur-sm border-2 border-white text-white hover:bg-white/10 transition-all"
                >
                  Talk to Sales
                </Button>
              </motion.div>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 mt-10 text-brand-100">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:check-circle" className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:check-circle" className="h-5 w-5" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:check-circle" className="h-5 w-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <Footer />
    </div>
  );
}
