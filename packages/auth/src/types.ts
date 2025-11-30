import { DefaultSession } from "next-auth"
import type { Role } from "@realtyeaseai/database"

// ============================================
// Type Definitions
// ============================================

/**
 * User role with primary flag
 */
export type UserRoleWithPrimary = {
    role: Role
    isPrimary: boolean
}

/**
 * Session user type with roles
 */
export type SessionUser = {
    id: string
    email?: string | null
    name?: string | null
    image?: string | null
    roles?: UserRoleWithPrimary[]
    primaryRole?: Role
}

// ============================================
// NextAuth Type Extensions
// ============================================

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            roles?: UserRoleWithPrimary[]
            primaryRole?: Role
        } & DefaultSession["user"]
    }

    interface User {
        id: string
        roles?: UserRoleWithPrimary[]
    }
}
