import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@realtyeaseai/database"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from "bcryptjs"
import type { Role } from "@realtyeaseai/database"

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
                        return user;
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
                // Add user roles to token on login
                const userRoles = await prisma.userRole.findMany({
                    where: { userId: user.id },
                    orderBy: { isPrimary: 'desc' }
                });

                token.id = user.id;
                token.roles = userRoles.map(ur => ur.role);
                token.primaryRole = userRoles.find(ur => ur.isPrimary)?.role || userRoles[0]?.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.roles = token.roles;
                session.user.primaryRole = token.primaryRole;
            }
            return session;
        }
    }
})
