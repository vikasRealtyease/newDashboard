import { auth } from "@realtyeaseai/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth;

    // API routes are always accessible
    if (pathname.startsWith("/api")) {
        return NextResponse.next();
    }

    // If user is not logged in, redirect to web app login
    if (!isLoggedIn) {
        const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:4000";
        const loginUrl = new URL("/login", webUrl);
        // Preserve the intended destination
        loginUrl.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(loginUrl);
    }

    // User is authenticated, allow access
    return NextResponse.next();
});

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
