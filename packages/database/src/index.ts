import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Only create PrismaClient if DATABASE_URL is configured
// This prevents edge runtime errors when Prisma is imported but not used
export const prisma =
    globalForPrisma.prisma ??
    (process.env.DATABASE_URL
        ? new PrismaClient({
            log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
        })
        : null as any); // Fallback for edge runtime without DATABASE_URL

if (process.env.NODE_ENV !== 'production' && process.env.DATABASE_URL) {
    globalForPrisma.prisma = prisma;
}

// Re-export Prisma types
export * from '@prisma/client';
export type { Role, UserRole } from '@prisma/client';
