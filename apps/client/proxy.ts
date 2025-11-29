import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
    // Check for userId cookie from custom login
    const userId = request.cookies.get('userId');

    // If user has userId cookie, allow access
    if (userId) {
        return NextResponse.next();
    }

    // If no userId cookie, redirect to web app login
    const loginUrl = new URL('http://localhost:4000/login');
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
