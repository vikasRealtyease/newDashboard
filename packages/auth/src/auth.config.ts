import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    trustHost: true, // Required for production deployments behind reverse proxy
    pages: {
        signIn: process.env.NODE_ENV === 'production'
            ? 'https://realtyeaseai.com/login'
            : 'http://localhost:4000/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname === '/';
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // If logged in and on login page, redirect to dashboard
                // Note: This logic might need refinement based on user role
                return true;
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
