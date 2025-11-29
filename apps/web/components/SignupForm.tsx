"use client";

import { TextField, Button, LinkButton } from "./SimpleComponents";
import { PhoneInput } from "./PhoneInput";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignupForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGoogleSignup = () => {
        // TODO: Implement Google OAuth
        router.push('/onboarding');
    };

    const handleEmailSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Signup failed');
            }

            // Store user data in session/localStorage for onboarding
            if (data.user) {
                localStorage.setItem('onboarding_user', JSON.stringify(data.user));
            }

            router.push('/onboarding');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-neutral-50 dark:bg-neutral-900">
            <div className="flex w-full max-w-md flex-col items-center gap-8 rounded-lg border border-solid border-neutral-border dark:border-neutral-700 bg-default-background p-8 shadow-lg">
                {/* Header */}
                <div className="flex w-full flex-col items-center gap-2">
                    <span className="text-heading-1 font-heading-1 text-default-font">
                        Create your account
                    </span>
                    <span className="text-body font-body text-subtext-color text-center">
                        Get started with RealtyEaseAI today
                    </span>
                </div>

                {/* OAuth Button */}
                <button
                    onClick={handleGoogleSignup}
                    className="flex w-full items-center justify-center gap-3 h-11 rounded-lg border-2 border-neutral-border dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 hover:bg-neutral-50 dark:hover:bg-neutral-700 active:bg-white dark:active:bg-neutral-800 transition-colors"
                >
                    <Icon icon="flat-color-icons:google" className="h-5 w-5" />
                    <span className="font-medium text-default-font">Continue with Google</span>
                </button>

                {/* Divider */}
                <div className="flex w-full items-center gap-4">
                    <div className="h-px flex-1 bg-neutral-border dark:bg-neutral-700" />
                    <span className="text-caption font-caption text-subtext-color">
                        or
                    </span>
                    <div className="h-px flex-1 bg-neutral-border dark:bg-neutral-700" />
                </div>

                {/* Sign up Form */}
                <form onSubmit={handleEmailSignup} className="flex w-full flex-col gap-4">
                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <TextField
                        label="Full Name"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />

                    <TextField
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    <PhoneInput
                        label="Phone Number"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(value) => setFormData({ ...formData, phone: value })}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                    <label className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" className="mt-1 rounded" required />
                        <span className="text-caption font-caption text-default-font">
                            I agree to the Terms of Service and Privacy Policy
                        </span>
                    </label>

                    <Button type="submit" size="large" className="w-full" disabled={loading}>
                        {loading ? "Creating account..." : "Create account"}
                    </Button>
                </form>

                {/* Login link */}
                <div className="flex items-center gap-2">
                    <span className="text-body font-body text-subtext-color">
                        Already have an account?
                    </span>
                    <LinkButton href="/login">Sign in</LinkButton>
                </div>
            </div>
        </div>
    );
}
