import type { Role } from "@realtyeaseai/database"
import type { UserRoleWithPrimary } from "./types"

/**
 * Get the redirect URL after login based on user's primary role
 * Architecture:
 * - realtyeaseai.com - Main website (landing/marketing)
 * - realtyeaseai.com/login - Login page
 * - app.realtyeaseai.com/dashboard - Role-based dashboard for all authenticated users
 *
 * @param primaryRole - The user's primary role (not used in current architecture but kept for future)
 * @param path - Optional path to append (default: "/dashboard")
 * @returns Full URL to redirect to
 */
export function getRoleBasedRedirectUrl(primaryRole: Role, path: string = "/dashboard"): string {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.realtyeaseai.com";
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${appUrl}${normalizedPath}`;
}

/**
 * Get display name for a role
 * @param role - User role
 * @returns Human-readable role name
 */
export function getRoleDisplayName(role: Role): string {
    const roleNames: Record<Role, string> = {
        SUPERADMIN: 'Super Administrator',
        ADMIN: 'Administrator',
        MANAGER: 'Manager',
        CLIENT: 'Client',
        VA: 'Virtual Assistant',
    };
    return roleNames[role] || role;
}

/**
 * Extract plain Role array from UserRoleWithPrimary array
 * @param userRoles - Array of user roles with primary flags or undefined
 * @returns Array of Role enums
 */
export function extractRoles(userRoles?: UserRoleWithPrimary[]): Role[] {
    if (!userRoles) return [];
    return userRoles.map(r => r.role);
}

/**
 * Get the primary role from user roles
 * @param userRoles - Array of user roles with primary flags or undefined
 * @returns Primary role or first role or undefined
 */
export function getPrimaryRole(userRoles?: UserRoleWithPrimary[]): Role | undefined {
    if (!userRoles || userRoles.length === 0) return undefined;
    const primary = userRoles.find(r => r.isPrimary);
    return primary ? primary.role : userRoles[0].role;
}

/**
 * Check if user has a specific role
 * @param userRoles - Array of user's roles (can be Role[] or UserRoleWithPrimary[] or undefined)
 * @param requiredRole - Role to check for
 * @returns True if user has the role
 */
export function hasRole(userRoles: Role[] | UserRoleWithPrimary[] | undefined, requiredRole: Role): boolean {
    if (!userRoles || userRoles.length === 0) return false;

    // Check if it's UserRoleWithPrimary[] or Role[]
    if (typeof userRoles[0] === 'object' && 'role' in userRoles[0]) {
        return (userRoles as UserRoleWithPrimary[]).some(r => r.role === requiredRole);
    }

    return (userRoles as Role[]).includes(requiredRole);
}

/**
 * Check if user has any of the specified roles
 * @param userRoles - Array of user's roles (can be Role[] or UserRoleWithPrimary[] or undefined)
 * @param allowedRoles - Array of allowed roles
 * @returns True if user has at least one of the allowed roles
 */
export function hasAnyRole(userRoles: Role[] | UserRoleWithPrimary[] | undefined, allowedRoles: Role[]): boolean {
    if (!userRoles || userRoles.length === 0) return false;

    // Check if it's UserRoleWithPrimary[] or Role[]
    if (typeof userRoles[0] === 'object' && 'role' in userRoles[0]) {
        return (userRoles as UserRoleWithPrimary[]).some(r => allowedRoles.includes(r.role));
    }

    return (userRoles as Role[]).some(role => allowedRoles.includes(role));
}
