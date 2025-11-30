import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    trustHost: true, // Required for production deployments behind reverse proxy
    pages: {
        signIn: '/login', // Login is on the main site (realtyeaseai.com)
    },
    callbacks: {
        // Note: Authorization is now handled by middleware.ts in each app
        // This allows for role-based subdomain routing and better control
        authorized({ auth }) {
            // Simply check if user is authenticated
            // Middleware will handle role-based routing
            return !!auth?.user;
        },
        // Allow redirects to app subdomain
        async redirect({ url, baseUrl }) {
            // Allow redirects to app.realtyeaseai.com
            const appUrl = process.env.NEXT_PUBLIC_APP_URL;

            // If URL starts with app URL, allow it
            if (appUrl && url.startsWith(appUrl)) {
                return url;
            }

            // If URL starts with /, make it relative to base
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }

            // If URL is on same origin, allow it
            if (new URL(url).origin === baseUrl) {
                return url;
            }

            // Default to base URL
            return baseUrl;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
