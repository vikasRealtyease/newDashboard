import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@realtyeaseai/database"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from "bcryptjs"
import type { Role } from "@realtyeaseai/database"
import type { UserRoleWithPrimary } from "./types"

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await prisma.user.findUnique({
                        where: { email },
                        include: {
                            roles: true
                        }
                    });
                    if (!user) return null;

                    // If user has no password (e.g. OAuth), return null
                    if (!user.password) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) {
                        // Update last login timestamp
                        await prisma.user.update({
                            where: { id: user.id },
                            data: { lastLoginAt: new Date() }
                        });

                        // Return user with roles
                        return {
                            ...user,
                            roles: user.roles.map(r => ({ role: r.role, isPrimary: r.isPrimary }))
                        };
                    }
                }
                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // User object from authorize already has roles included
                // Map them to the correct format for the token
                token.id = user.id as string;

                // If user.roles exists (from authorize callback), use it
                // Otherwise fetch from database (fallback for OAuth or other providers)
                if (user.roles && Array.isArray(user.roles)) {
                    token.roles = user.roles;
                    token.primaryRole = user.roles.find((r) => r.isPrimary)?.role || user.roles[0]?.role;
                } else {
                    // Fallback: fetch roles from database
                    const userRoles = await prisma.userRole.findMany({
                        where: { userId: user.id as string },
                        orderBy: { isPrimary: 'desc' }
                    });

                    token.roles = userRoles.map(ur => ({
                        role: ur.role,
                        isPrimary: ur.isPrimary
                    }));
                    token.primaryRole = userRoles.find(ur => ur.isPrimary)?.role || userRoles[0]?.role;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
                if (token.roles) {
                    session.user.roles = token.roles as UserRoleWithPrimary[];
                }
                if (token.primaryRole) {
                    session.user.primaryRole = token.primaryRole as Role;
                }
            }
            return session;
        }
    }
})
