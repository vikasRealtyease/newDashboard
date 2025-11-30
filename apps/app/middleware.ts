import { auth } from "@realtyeaseai/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login"];
const PROTECTED_ROUTES = ["/", "/dashboard"];

export default async function middleware(request: NextRequest) {
    const session = await auth();
    const { pathname } = request.nextUrl;

    // Allow access to public routes
    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
        // If already logged in and trying to access login, redirect to dashboard
        if (session?.user && pathname.startsWith("/login")) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.next();
    }

    // Protect all other routes - require authentication
    if (!session?.user) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // User is authenticated - allow access
    // Role-based UI rendering is handled client-side
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
