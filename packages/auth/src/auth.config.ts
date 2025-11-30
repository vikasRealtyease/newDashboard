import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    trustHost: true, // Required for production deployments behind reverse proxy
    pages: {
        signIn: '/login',
    },
    callbacks: {
        // Note: Authorization is now handled by middleware.ts in each app
        // This allows for role-based subdomain routing and better control
        authorized({ auth }) {
            // Simply check if user is authenticated
            // Middleware will handle role-based routing
            return !!auth?.user;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
