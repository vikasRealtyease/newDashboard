import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@realtyeaseai/database';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fullName, email, phone, password } = body;

        // Validate required fields
        if (!fullName || !email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Split full name into first and last name
        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || firstName;

        // Create user with profile
        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
                name: fullName,
                profile: {
                    create: {
                        firstName,
                        lastName,
                        phone: phone || null,
                    },
                },
                roles: {
                    create: {
                        role: 'CLIENT',
                        isPrimary: true,
                    },
                },
                // Create AI credits wallet
                aiWallet: {
                    create: {
                        balance: 0,
                        lifetimeSpent: 0,
                        lifetimeAdded: 0,
                    },
                },
            },
            include: {
                profile: true,
                roles: true,
            },
        });

        // Remove sensitive data before sending response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(
            {
                success: true,
                user: userWithoutPassword,
                message: 'Account created successfully',
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}
