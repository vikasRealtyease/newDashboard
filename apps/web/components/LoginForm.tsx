"use client";

import { useState, useEffect } from "react";
import { TextField, Button, LinkButton } from "./SimpleComponents";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { toast } from "@realtyeaseai/ui";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:4001' : 'https://app.realtyeaseai.com');

export function LoginForm() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Get callback URL from query params or default to app dashboard
    const callbackUrl = searchParams?.get("callbackUrl") || `${APP_URL}/dashboard`;

    useEffect(() => {
        // Load remembered email if exists
        const remembered = localStorage.getItem('rememberedEmail');
        if (remembered) {
            setEmail(remembered);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid credentials. Please try again.");
            } else if (result?.ok) {
                // Store email if remember me is checked
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }

                // Show success message
                toast.success('Login successful!');

                // Redirect to callback URL or dashboard
                window.location.href = callbackUrl;
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signIn("google", {
                callbackUrl: callbackUrl,
            });
        } catch (err) {
            console.error('Google sign-in error:', err);
            toast.error('Failed to sign in with Google');
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-neutral-50 dark:bg-neutral-900">
            <div className="flex w-full max-w-md flex-col items-center gap-8 rounded-lg border border-solid border-neutral-border dark:border-neutral-700 bg-default-background p-8 shadow-lg">
                {/* Header */}
                <div className="flex w-full flex-col items-center gap-2">
                    <span className="text-heading-1 font-heading-1 text-default-font">
                        Welcome back
                    </span>
                    <span className="text-body font-body text-subtext-color text-center">
                        Sign in to your account to continue
                    </span>
                </div>

                {/* OAuth Button */}
                <button
                    onClick={handleGoogleSignIn}
                    type="button"
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

                {/* Email/Password Form */}
                <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
                    {error && (
                        <div className="flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
                            <Icon icon="ic:baseline-error" className="text-red-600 h-5 w-5" />
                            <span className="text-sm text-red-700 dark:text-red-400">{error}</span>
                        </div>
                    )}

                    <TextField
                        label="Email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <TextField
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="rounded"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span className="text-caption font-caption text-default-font">
                                Remember me
                            </span>
                        </label>
                        <LinkButton href="#" className="text-sm">Forgot password?</LinkButton>
                    </div>

                    <Button size="large" className="w-full" type="submit" disabled={loading}>
                        {loading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>

                {/* Sign up link */}
                <div className="flex items-center gap-2">
                    <span className="text-body font-body text-subtext-color">
                        Don't have an account?
                    </span>
                    <LinkButton href="/signup">Sign up</LinkButton>
                </div>
            </div>
        </div>
    );
}
