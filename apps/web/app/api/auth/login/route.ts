import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@realtyeaseai/database';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate required fields
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            include: {
                profile: true,
                roles: true,
            },
        });

        if (!user || !user.password) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Check if user is active
        if (!user.isActive) {
            return NextResponse.json(
                { error: 'Account is deactivated' },
                { status: 403 }
            );
        }

        // Update last login timestamp
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        // Determine redirect URL based on user's primary role
        const primaryRole = user.roles.find(r => r.isPrimary)?.role || user.roles[0]?.role;
        let redirectUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4000';

        switch (primaryRole) {
            case 'CLIENT':
                redirectUrl = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:4001';
                break;
            case 'VA':
                redirectUrl = process.env.NEXT_PUBLIC_VA_URL || 'http://localhost:4004';
                break;
            case 'MANAGER':
                redirectUrl = process.env.NEXT_PUBLIC_MANAGER_URL || 'http://localhost:4002';
                break;
            case 'ADMIN':
                redirectUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:4003';
                break;
        }

        // Remove sensitive data
        const { password: _, ...userWithoutPassword } = user;

        console.log('Login successful for user:', user.email, 'Role:', primaryRole, 'Redirect URL:', redirectUrl);

        // Create response with user data
        const response = NextResponse.json(
            {
                success: true,
                user: userWithoutPassword,
                redirectUrl: redirectUrl,
                role: primaryRole,
                message: 'Login successful',
            },
            { status: 200 }
        );

        // Set session cookie (simple implementation)
        // Note: In production, use a proper session management library
        response.cookies.set('userId', user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}
