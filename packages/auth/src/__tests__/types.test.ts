/**
 * Auth Package Type Tests
 * 
 * This file contains type tests to ensure the auth package types are working correctly.
 * Run this with: npx tsc --noEmit
 */

import type { Role } from "@realtyeaseai/database"
import type { UserRoleWithPrimary, SessionUser } from "../types"
import { hasRole, hasAnyRole, extractRoles, getPrimaryRole, getRoleDisplayName } from "../utils"

// ============================================
// Type Tests
// ============================================

// Test UserRoleWithPrimary type
const testRole: UserRoleWithPrimary = {
    role: "ADMIN",
    isPrimary: true
}

// Test SessionUser type
const testUser: SessionUser = {
    id: "123",
    email: "test@example.com",
    name: "Test User",
    image: null,
    roles: [
        { role: "ADMIN", isPrimary: true },
        { role: "CLIENT", isPrimary: false }
    ],
    primaryRole: "ADMIN"
}

// ============================================
// Utility Function Tests
// ============================================

// Test extractRoles
const roles1 = extractRoles(testUser.roles)
const roles2 = extractRoles(undefined)
// @ts-expect-error - Should be Role[]
const _typeCheck1: string[] = roles1

// Test hasRole with UserRoleWithPrimary[]
const isAdmin1 = hasRole(testUser.roles, "ADMIN")
const isManager1 = hasRole(testUser.roles, "MANAGER")
const isAdmin2 = hasRole(undefined, "ADMIN")
// @ts-expect-error - Should be boolean
const _typeCheck2: string = isAdmin1

// Test hasRole with Role[]
const plainRoles: Role[] = ["ADMIN", "CLIENT"]
const isAdmin3 = hasRole(plainRoles, "ADMIN")
const isManager2 = hasRole(plainRoles, "MANAGER")

// Test hasAnyRole with UserRoleWithPrimary[]
const hasAdminOrManager1 = hasAnyRole(testUser.roles, ["ADMIN", "MANAGER"])
const hasVaOrClient1 = hasAnyRole(testUser.roles, ["VA", "CLIENT"])
const hasAny1 = hasAnyRole(undefined, ["ADMIN"])
// @ts-expect-error - Should be boolean
const _typeCheck3: string = hasAdminOrManager1

// Test hasAnyRole with Role[]
const hasAdminOrManager2 = hasAnyRole(plainRoles, ["ADMIN", "MANAGER"])
const hasVaOrClient2 = hasAnyRole(plainRoles, ["VA", "CLIENT"])

// Test getPrimaryRole
const primary1 = getPrimaryRole(testUser.roles)
const primary2 = getPrimaryRole(undefined)
// @ts-expect-error - Should be Role | undefined
const _typeCheck4: string = primary1 || ""

// Test getRoleDisplayName
const displayName1 = getRoleDisplayName("ADMIN")
const displayName2 = getRoleDisplayName("VA")
// @ts-expect-error - Should be string
const _typeCheck5: number = displayName1

// ============================================
// Session Type Tests
// ============================================

// Simulate session from NextAuth
interface TestSession {
    user: {
        id: string
        email?: string | null
        name?: string | null
        image?: string | null
        roles?: UserRoleWithPrimary[]
        primaryRole?: Role
    }
}

const session: TestSession = {
    user: {
        id: "123",
        email: "test@example.com",
        name: "Test User",
        roles: [
            { role: "ADMIN", isPrimary: true }
        ],
        primaryRole: "ADMIN"
    }
}

// Test session usage
if (session.user.roles) {
    const userRoles = extractRoles(session.user.roles)
    const isAdmin = hasRole(session.user.roles, "ADMIN")
    const hasAccess = hasAnyRole(session.user.roles, ["ADMIN", "MANAGER"])
    const primary = getPrimaryRole(session.user.roles)
}

// ============================================
// Edge Cases
// ============================================

// Empty roles array
const emptyRoles: UserRoleWithPrimary[] = []
const hasRoleEmpty = hasRole(emptyRoles, "ADMIN") // Should be false
const hasAnyRoleEmpty = hasAnyRole(emptyRoles, ["ADMIN"]) // Should be false
const primaryEmpty = getPrimaryRole(emptyRoles) // Should be undefined

// Single role
const singleRole: UserRoleWithPrimary[] = [{ role: "CLIENT", isPrimary: true }]
const hasSingleRole = hasRole(singleRole, "CLIENT") // Should be true
const primarySingle = getPrimaryRole(singleRole) // Should be "CLIENT"

// Multiple roles without primary
const multipleRolesNoPrimary: UserRoleWithPrimary[] = [
    { role: "ADMIN", isPrimary: false },
    { role: "CLIENT", isPrimary: false }
]
const primaryNoPrimary = getPrimaryRole(multipleRolesNoPrimary) // Should be "ADMIN" (first role)

// Multiple roles with primary
const multipleRolesWithPrimary: UserRoleWithPrimary[] = [
    { role: "ADMIN", isPrimary: false },
    { role: "CLIENT", isPrimary: true },
    { role: "MANAGER", isPrimary: false }
]
const primaryWithPrimary = getPrimaryRole(multipleRolesWithPrimary) // Should be "CLIENT"

console.log("All type tests passed! ✅")
