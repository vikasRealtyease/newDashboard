import { auth } from "@realtyeaseai/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || "https://realtyeaseai.com";

export default async function middleware(request: NextRequest) {
    const session = await auth();

    // All routes on app.realtyeaseai.com require authentication
    if (!session?.user) {
        // Redirect to main site login with callback URL
        const loginUrl = new URL("/login", WEB_URL);
        loginUrl.searchParams.set("callbackUrl", request.url);
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
