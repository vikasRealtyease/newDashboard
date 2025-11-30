import type { Role } from "@realtyeaseai/database"

/**
 * @deprecated No longer using subdomain-per-role architecture.
 * Now using single domain with role-based UI rendering.
 *
 * Role-based subdomain mapping (DEPRECATED)
 * Maps user roles to their corresponding subdomain URLs
 */
export const ROLE_SUBDOMAIN_MAP: Record<Role, string> = {
    ADMIN: process.env.NEXT_PUBLIC_ADMIN_URL || "https://admin.realtyeaseai.com",
    MANAGER: process.env.NEXT_PUBLIC_MANAGER_URL || "https://manager.realtyeaseai.com",
    CLIENT: process.env.NEXT_PUBLIC_CLIENT_URL || "https://app.realtyeaseai.com",
    VA: process.env.NEXT_PUBLIC_VA_URL || "https://va.realtyeaseai.com",
}

/**
 * @deprecated Use single domain architecture instead.
 * All users now access the same domain with role-based UI.
 *
 * Get the redirect URL based on user's primary role
 * @param primaryRole - The user's primary role
 * @param path - Optional path to append to the subdomain URL (default: "/dashboard")
 * @returns Full URL to redirect to
 */
export function getRoleBasedRedirectUrl(primaryRole: Role, path: string = "/dashboard"): string {
    // For single domain architecture, just return the path
    return path;

    // Old subdomain logic (kept for reference):
    // const baseUrl = ROLE_SUBDOMAIN_MAP[primaryRole];
    // if (!baseUrl) {
    //     throw new Error(`No subdomain mapping found for role: ${primaryRole}`);
    // }
    // const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    // return `${baseUrl}${normalizedPath}`;
}

/**
 * @deprecated Not used in single domain architecture.
 *
 * Check if current URL matches the user's role-based subdomain
 * @param currentUrl - Current URL
 * @param primaryRole - User's primary role
 * @returns True if user is on correct subdomain, false otherwise
 */
export function isOnCorrectSubdomain(currentUrl: string, primaryRole: Role): boolean {
    // Always return true for single domain
    return true;

    // Old logic:
    // const expectedBaseUrl = ROLE_SUBDOMAIN_MAP[primaryRole];
    // return currentUrl.startsWith(expectedBaseUrl);
}

/**
 * @deprecated Not used in single domain architecture.
 *
 * Get all allowed roles for a subdomain
 * @param subdomain - Subdomain URL
 * @returns Array of roles allowed for this subdomain
 */
export function getAllowedRolesForSubdomain(subdomain: string): Role[] {
    // Return all roles for single domain
    return ['ADMIN', 'MANAGER', 'CLIENT', 'VA'];

    // Old logic:
    // return (Object.entries(ROLE_SUBDOMAIN_MAP) as [Role, string][])
    //     .filter(([_, url]) => subdomain.startsWith(url))
    //     .map(([role]) => role);
}

/**
 * Get display name for a role
 * @param role - User role
 * @returns Human-readable role name
 */
export function getRoleDisplayName(role: Role): string {
    const roleNames: Record<Role, string> = {
        ADMIN: 'Administrator',
        MANAGER: 'Manager',
        CLIENT: 'Client',
        VA: 'Virtual Assistant',
    };
    return roleNames[role] || role;
}

/**
 * Check if user has a specific role
 * @param userRoles - Array of user's roles
 * @param requiredRole - Role to check for
 * @returns True if user has the role
 */
export function hasRole(userRoles: Role[], requiredRole: Role): boolean {
    return userRoles.includes(requiredRole);
}

/**
 * Check if user has any of the specified roles
 * @param userRoles - Array of user's roles
 * @param allowedRoles - Array of allowed roles
 * @returns True if user has at least one of the allowed roles
 */
export function hasAnyRole(userRoles: Role[], allowedRoles: Role[]): boolean {
    return userRoles.some(role => allowedRoles.includes(role));
}
