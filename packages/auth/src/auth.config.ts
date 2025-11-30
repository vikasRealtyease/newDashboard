import type { NextAuthConfig } from "next-auth"

/**
 * NextAuth Configuration
 *
 * Architecture:
 * - realtyeaseai.com - Main website (landing/marketing)
 * - realtyeaseai.com/login - Login page
 * - app.realtyeaseai.com/dashboard - Role-based dashboard for all authenticated users
 */
export const authConfig = {
    trustHost: true, // Required for production deployments behind reverse proxy
    pages: {
        signIn: '/login', // Login page at realtyeaseai.com/login
    },
    callbacks: {
        // Authorization check - just verify user is authenticated
        // Role-based access control is handled by middleware in each app
        authorized({ auth }) {
            return !!auth?.user;
        },

        // Handle redirects between main site and app subdomain
        async redirect({ url, baseUrl }) {
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.realtyeaseai.com";
            const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "https://realtyeaseai.com";

            // Allow redirects to app subdomain
            if (url.startsWith(appUrl)) {
                return url;
            }

            // Allow redirects to main website
            if (url.startsWith(webUrl)) {
                return url;
            }

            // If URL starts with /, determine where to redirect based on context
            if (url.startsWith("/")) {
                // If on main site and redirecting to dashboard, go to app subdomain
                if (url === "/dashboard" || url.startsWith("/dashboard/")) {
                    return `${appUrl}${url}`;
                }
                return `${baseUrl}${url}`;
            }

            // If URL is on same origin, allow it
            try {
                if (new URL(url).origin === baseUrl) {
                    return url;
                }
            } catch {
                // Invalid URL, fall through to default
            }

            // Default: redirect to app dashboard after successful login
            return `${appUrl}/dashboard`;
        },
    },
    providers: [], // Providers are added in auth.ts
} satisfies NextAuthConfig
