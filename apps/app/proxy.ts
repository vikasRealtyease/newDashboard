/**
 * Authentication Proxy for App Dashboard
 * 
 * This proxy handles authentication checks for the app dashboard.
 * In Next.js 15+, this replaces the deprecated middleware.ts pattern.
 * 
 * Environment-based Configuration:
 * - Development (NODE_ENV=development): Uses localhost URLs
 * - Production: Uses production domain URLs
 */

import { auth } from "@realtyeaseai/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Environment-aware URL configuration
const isDevelopment = process.env.NODE_ENV === 'development';
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || (isDevelopment ? 'http://localhost:4000' : 'https://realtyeaseai.com');

/**
 * Authentication proxy middleware
 * Ensures all dashboard routes require authentication
 */
export default async function proxy(request: NextRequest) {
    const session = await auth();

    // Require authentication for all app routes
    if (!session?.user) {
        // Redirect unauthenticated users to login page
        const loginUrl = new URL("/login", WEB_URL);
        loginUrl.searchParams.set("callbackUrl", request.url);

        return NextResponse.redirect(loginUrl);
    }

    // User is authenticated - allow access
    // Role-based access control is handled at the component level
    return NextResponse.next();
}

/**
 * Proxy configuration
 * Matches all routes except:
 * - API routes (/api/*)
 * - Static files (_next/static/*)
 * - Image optimization (_next/image/*)
 * - Public assets (favicon, images, etc.)
 */
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
