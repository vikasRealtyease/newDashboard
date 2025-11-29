"use client";

import { useState } from "react";
import { Button, Badge, Progress } from "./SimpleComponents";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface OnboardingData {
    // Step 1: Business Info
    businessName: string;
    industry: string;
    companySize: string;
    website: string;

    // Step 2: Business Goals
    primaryGoals: string[];
    currentChallenges: string[];

    // Step 3: Task & Time Assessment
    weeklyTasks: string[];
    timeSpentPerTask: { [key: string]: number };
    estimatedHoursNeeded: number;

    // Step 4: Budget & Timeline
    monthlyBudget: string;
    whenToStart: string;
}

const INDUSTRIES = [
    "E-commerce", "SaaS/Technology", "Healthcare", "Real Estate",
    "Marketing Agency", "Consulting", "Education", "Finance",
    "Legal Services", "Other"
];

const COMPANY_SIZES = [
    "Just Me (Solo)", "2-10 employees", "11-50 employees",
    "51-200 employees", "200+ employees"
];

const BUSINESS_GOALS = [
    { id: "growth", label: "Scale Business Growth", icon: "mdi:trending-up" },
    { id: "time", label: "Save Time on Admin Tasks", icon: "mdi:clock-outline" },
    { id: "marketing", label: "Improve Marketing", icon: "mdi:bullhorn" },
    { id: "customer", label: "Better Customer Service", icon: "mdi:accounts" },
    { id: "content", label: "Content Creation", icon: "mdi:file-document-outline" },
    { id: "social", label: "Social Media Management", icon: "mdi:share-variant" }
];

const CHALLENGES = [
    { id: "overwhelmed", label: "Too much on my plate", icon: "mdi:alert-circle" },
    { id: "admin", label: "Drowning in admin work", icon: "mdi:file-multiple" },
    { id: "focus", label: "Can't focus on strategy", icon: "mdi:target" },
    { id: "hiring", label: "Can't afford full-time staff", icon: "mdi:account-x" },
    { id: "scaling", label: "Struggle to scale", icon: "mdi:chart-bar" },
    { id: "consistency", label: "Inconsistent marketing", icon: "mdi:trending-down" }
];

const COMMON_TASKS = [
    { id: "email", label: "Email Management", avgHours: 10 },
    { id: "social", label: "Social Media", avgHours: 8 },
    { id: "scheduling", label: "Calendar/Scheduling", avgHours: 5 },
    { id: "content", label: "Content Writing", avgHours: 12 },
    { id: "research", label: "Research & Data Entry", avgHours: 8 },
    { id: "customer", label: "Customer Support", avgHours: 15 },
    { id: "bookkeeping", label: "Bookkeeping", avgHours: 6 },
    { id: "design", label: "Graphics/Design", avgHours: 10 }
];

const BUDGET_RANGES = [
    { value: "1000-2000", label: "$1,000 - $2,000/month", tier: "starter" },
    { value: "2000-3500", label: "$2,000 - $3,500/month", tier: "growth" },
    { value: "3500-5000", label: "$3,500 - $5,000/month", tier: "business" },
    { value: "5000+", label: "$5,000+/month", tier: "enterprise" }
];

export function NewOnboardingFlow() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<OnboardingData>({
        businessName: "",
        industry: "",
        companySize: "",
        website: "",
        primaryGoals: [],
        currentChallenges: [],
        weeklyTasks: [],
        timeSpentPerTask: {},
        estimatedHoursNeeded: 0,
        monthlyBudget: "",
        whenToStart: ""
    });

    const totalSteps = 5;
    const progress = (currentStep / totalSteps) * 100;

    const toggleArrayItem = (array: string[], item: string) => {
        if (array.includes(item)) {
            return array.filter(i => i !== item);
        }
        return [...array, item];
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            // Calculate recommendation and navigate to results
            router.push('/onboarding/results');
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return formData.businessName && formData.industry && formData.companySize;
            case 2:
                return formData.primaryGoals.length > 0 && formData.currentChallenges.length > 0;
            case 3:
                return formData.weeklyTasks.length > 0;
            case 4:
                return formData.monthlyBudget;
            case 5:
                return formData.whenToStart;
            default:
                return false;
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-neutral-50 via-white to-neutral-50 flex items-center justify-center py-12">
            <div className="container max-w-4xl mx-auto px-4 w-full">
                {/* Progress Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <Badge
                            variant="brand"
                            className="shadow-md"
                            icon={<Icon icon="mdi:sparkles" className="h-4 w-4" />}
                        >
                            Step {currentStep} of {totalSteps}
                        </Badge>
                        <span className="text-sm font-medium text-subtext-color">
                            {Math.round(progress)}% Complete
                        </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl border-2 border-neutral-200 p-8 shadow-xl"
                    >
                        {/* Step 1: Business Info */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="text-center space-y-3 mb-8">
                                    <h2 className="text-4xl font-bold text-default-font">
                                        Tell us about your business
                                    </h2>
                                    <p className="text-lg text-subtext-color">
                                        This helps us understand your needs better
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="input-label">Business/Company Name</label>
                                    <input
                                        type="text"
                                        value={formData.businessName}
                                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                        placeholder="Acme Inc"
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-default-font mb-2 block">
                                        Industry
                                    </label>
                                    <select
                                        value={formData.industry}
                                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                        className="w-full h-11 px-4 rounded-lg border-2 border-neutral-border bg-white text-default-font focus:border-brand-500 focus:outline-none transition-colors"
                                    >
                                        <option value="">Select your industry</option>
                                        {INDUSTRIES.map((ind) => (
                                            <option key={ind} value={ind}>{ind}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-default-font mb-2 block">
                                        Company Size
                                    </label>
                                    <select
                                        value={formData.companySize}
                                        onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                                        className="w-full h-11 px-4 rounded-lg border-2 border-neutral-border bg-white text-default-font focus:border-brand-500 focus:outline-none transition-colors"
                                    >
                                        <option value="">Select company size</option>
                                        {COMPANY_SIZES.map((size) => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="input-label">Website (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        placeholder="www.yourwebsite.com"
                                        className="input-field"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Business Goals */}
                        {currentStep === 2 && (
                            <div className="space-y-8">
                                <div className="text-center space-y-3">
                                    <h2 className="text-4xl font-bold text-default-font">
                                        What are your main goals?
                                    </h2>
                                    <p className="text-lg text-subtext-color">
                                        Select all that apply
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {BUSINESS_GOALS.map((goal) => (
                                        <button
                                            key={goal.id}
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    primaryGoals: toggleArrayItem(formData.primaryGoals, goal.id)
                                                })
                                            }
                                            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${formData.primaryGoals.includes(goal.id)
                                                ? "border-brand-500 bg-brand-50 shadow-lg scale-105"
                                                : "border-neutral-200 bg-white hover:border-brand-300 hover:shadow-md"
                                                }`}
                                        >
                                            <Icon
                                                icon={goal.icon}
                                                className={`h-8 w-8 mb-3 ${formData.primaryGoals.includes(goal.id)
                                                    ? "text-brand-600"
                                                    : "text-neutral-400"
                                                    }`}
                                            />
                                            <h3 className="font-semibold text-default-font">{goal.label}</h3>
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-3 pt-6">
                                    <h3 className="text-2xl font-bold text-default-font text-center">
                                        What's your biggest challenge?
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {CHALLENGES.map((challenge) => (
                                            <button
                                                key={challenge.id}
                                                onClick={() =>
                                                    setFormData({
                                                        ...formData,
                                                        currentChallenges: toggleArrayItem(formData.currentChallenges, challenge.id)
                                                    })
                                                }
                                                className={`p-5 rounded-xl border-2 transition-all duration-300 text-left ${formData.currentChallenges.includes(challenge.id)
                                                    ? "border-brand-500 bg-brand-50"
                                                    : "border-neutral-200 bg-white hover:border-brand-300"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Icon
                                                        icon={challenge.icon}
                                                        className={`h-5 w-5 ${formData.currentChallenges.includes(challenge.id)
                                                            ? "text-brand-600"
                                                            : "text-neutral-400"
                                                            }`}
                                                    />
                                                    <span className="font-medium text-sm text-default-font">{challenge.label}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Task Assessment */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="text-center space-y-3 mb-8">
                                    <h2 className="text-4xl font-bold text-default-font">
                                        Which tasks take up most of your time?
                                    </h2>
                                    <p className="text-lg text-subtext-color">
                                        Select all tasks you need help with
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {COMMON_TASKS.map((task) => (
                                        <button
                                            key={task.id}
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    weeklyTasks: toggleArrayItem(formData.weeklyTasks, task.id)
                                                })
                                            }
                                            className={`p-5 rounded-xl border-2 transition-all duration-300 ${formData.weeklyTasks.includes(task.id)
                                                ? "border-brand-500 bg-brand-50 shadow-lg"
                                                : "border-neutral-200 bg-white hover:border-brand-300 hover:shadow-md"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="text-left">
                                                    <h3 className="font-semibold text-default-font mb-1">
                                                        {task.label}
                                                    </h3>
                                                    <p className="text-sm text-subtext-color">
                                                        ~{task.avgHours} hrs/week average
                                                    </p>
                                                </div>
                                                {formData.weeklyTasks.includes(task.id) && (
                                                    <Icon icon="mdi:check-circle" className="h-6 w-6 text-brand-600" />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {formData.weeklyTasks.length > 0 && (
                                    <div className="mt-6 p-6 bg-brand-50 rounded-xl border-2 border-brand-200">
                                        <p className="text-sm font-medium text-brand-900">
                                            <Icon icon="mdi:lightbulb-on" className="h-5 w-5 inline mr-2" />
                                            Estimated weekly hours needed:{" "}
                                            <span className="text-2xl font-bold">
                                                {formData.weeklyTasks.reduce((acc, taskId) => {
                                                    const task = COMMON_TASKS.find(t => t.id === taskId);
                                                    return acc + (task?.avgHours || 0);
                                                }, 0)} hours
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 4: Budget */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div className="text-center space-y-3 mb-8">
                                    <h2 className="text-4xl font-bold text-default-font">
                                        What's your budget?
                                    </h2>
                                    <p className="text-lg text-subtext-color">
                                        This helps us recommend the right plan
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {BUDGET_RANGES.map((budget) => (
                                        <button
                                            key={budget.value}
                                            onClick={() => setFormData({ ...formData, monthlyBudget: budget.value })}
                                            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${formData.monthlyBudget === budget.value
                                                ? "border-brand-500 bg-brand-50 shadow-lg scale-105"
                                                : "border-neutral-200 bg-white hover:border-brand-300 hover:shadow-md"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-xl font-bold text-default-font mb-1">
                                                        {budget.label}
                                                    </h3>
                                                    <p className="text-sm text-subtext-color capitalize">
                                                        Recommended: {budget.tier} tier
                                                    </p>
                                                </div>
                                                {formData.monthlyBudget === budget.value && (
                                                    <Icon icon="mdi:check-circle" className="h-8 w-8 text-brand-600" />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 5: Timeline */}
                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <div className="text-center space-y-3 mb-8">
                                    <h2 className="text-4xl font-bold text-default-font">
                                        When would you like to start?
                                    </h2>
                                    <p className="text-lg text-subtext-color">
                                        We'll match you with the perfect VA based on availability
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { value: "immediately", label: "Immediately", desc: "Within 24-48 hours" },
                                        { value: "week", label: "This Week", desc: "Within 3-5 days" },
                                        { value: "month", label: "This Month", desc: "Within 2 weeks" },
                                        { value: "planning", label: "Just Planning", desc: "Not sure yet" }
                                    ].map((timeline) => (
                                        <button
                                            key={timeline.value}
                                            onClick={() => setFormData({ ...formData, whenToStart: timeline.value })}
                                            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${formData.whenToStart === timeline.value
                                                ? "border-brand-500 bg-brand-50 shadow-lg"
                                                : "border-neutral-200 bg-white hover:border-brand-300 hover:shadow-md"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-xl font-bold text-default-font mb-1">
                                                        {timeline.label}
                                                    </h3>
                                                    <p className="text-sm text-subtext-color">{timeline.desc}</p>
                                                </div>
                                                {formData.whenToStart === timeline.value && (
                                                    <Icon icon="mdi:check-circle" className="h-8 w-8 text-brand-600" />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8">
                    <Button
                        variant="neutral-secondary"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        icon={<Icon icon="mdi:arrow-left" className="h-4 w-4" />}
                    >
                        Back
                    </Button>

                    <Button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        iconRight={<Icon icon="mdi:arrow-right" className="h-4 w-4" />}
                    >
                        {currentStep === totalSteps ? "See My Recommendation" : "Continue"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
