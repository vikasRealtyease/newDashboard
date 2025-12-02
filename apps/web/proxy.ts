import { auth } from "@realtyeaseai/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth;

    // Public routes that don't require authentication
    const publicRoutes = [
        "/",
        "/login",
        "/signup",
        "/about",
        "/pricing",
        "/contact",
        "/careers",
        "/product",
        "/services",
    ];

    // API routes are always accessible
    if (pathname.startsWith("/api")) {
        return NextResponse.next();
    }

    // Check if current path is public
    const isPublicRoute = publicRoutes.some((route) =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

    // If user is logged in and tries to access login/signup, redirect to app
    if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4001";
        return NextResponse.redirect(new URL("/dashboard", appUrl));
    }

    // Allow access to public routes
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // For all other routes, require authentication
    if (!isLoggedIn) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

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
