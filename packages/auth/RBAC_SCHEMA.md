# RBAC Schema Documentation

## Overview
This document describes the Role-Based Access Control (RBAC) system implemented in the authentication package.

## Architecture
- **Main Website**: `realtyeaseai.com` - Landing/marketing pages
- **Login Page**: `realtyeaseai.com/login` - Authentication entry point
- **Dashboard App**: `app.realtyeaseai.com/dashboard` - Role-based application for all authenticated users

## User Roles

### 5 Role Hierarchy

1. **SUPERADMIN** - Highest level administrator
   - Full system access across all organizations/tenants
   - Can manage all users, settings, and system configuration
   - Typically for platform owners/operators

2. **ADMIN** - Organization administrator
   - Full access within their organization/tenant scope
   - Can manage users, projects, and settings within their organization
   - Cannot access system-wide configuration

3. **MANAGER** - Project/team manager
   - Manages projects and team members
   - Assigns tasks to VAs and clients
   - Views reports and analytics for their projects

4. **CLIENT** - Customer/project owner
   - Owns projects
   - Can create and manage their projects
   - Can hire VAs and assign tasks
   - Views project progress and billing

5. **VA** (Virtual Assistant) - Service provider
   - Assigned to tasks by managers or clients
   - Completes assigned tasks
   - Logs time and updates task status

## Database Schema

### User Model
```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String?
  name          String?
  // ... other fields
  roles         UserRole[]  // Multiple roles support
}
```

### UserRole Model (Junction Table)
```prisma
model UserRole {
  id        String   @id @default(uuid())
  userId    String
  role      Role
  isPrimary Boolean  @default(false)  // One role is primary
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, role])
}
```

### Role Enum
```prisma
enum Role {
  SUPERADMIN
  ADMIN
  MANAGER
  CLIENT
  VA
}
```

### Permission System

#### Permission Model
```prisma
model Permission {
  id          String   @id @default(uuid())
  name        String   @unique  // e.g., "user.create", "project.delete"
  description String?
  category    String?  // e.g., "users", "projects", "billing"
  createdAt   DateTime @default(now())

  rolePermissions RolePermission[]
}
```

#### RolePermission Model (Maps roles to permissions)
```prisma
model RolePermission {
  id           String     @id @default(uuid())
  role         Role
  permissionId String
  createdAt    DateTime   @default(now())

  permission   Permission @relation(fields: [permissionId], references: [id])

  @@unique([role, permissionId])
  @@index([role])
}
```

## Type Definitions

### UserRoleWithPrimary
```typescript
export type UserRoleWithPrimary = {
    role: Role
    isPrimary: boolean
}
```

### SessionUser
```typescript
export type SessionUser = {
    id: string
    email?: string | null
    name?: string | null
    image?: string | null
    roles?: UserRoleWithPrimary[]
    primaryRole?: Role
}
```

## Utility Functions

### Role Checking
```typescript
// Check if user has a specific role
hasRole(userRoles, 'ADMIN') // boolean

// Check if user has any of the specified roles
hasAnyRole(userRoles, ['ADMIN', 'MANAGER']) // boolean

// Extract plain Role array from UserRoleWithPrimary[]
extractRoles(userRoles) // Role[]

// Get user's primary role
getPrimaryRole(userRoles) // Role | undefined

// Get display name for a role
getRoleDisplayName('SUPERADMIN') // "Super Administrator"
```

### Redirect Utilities
```typescript
// Get redirect URL after login (goes to app subdomain)
getRoleBasedRedirectUrl(primaryRole, '/dashboard')
// Returns: "https://app.realtyeaseai.com/dashboard"
```

## NextAuth Integration

### Session Type
```typescript
declare module "next-auth" {
    interface Session {
        user: {
            id: string
            roles?: UserRoleWithPrimary[]
            primaryRole?: Role
        } & DefaultSession["user"]
    }
}
```

### Auth Configuration
- **Login Page**: `/login` on main site
- **Post-Login Redirect**: `app.realtyeaseai.com/dashboard`
- **Session Strategy**: JWT
- **Provider**: Credentials (email/password)

## Usage Examples

### Checking Permissions in Components
```typescript
import { auth } from '@realtyeaseai/auth';
import { hasRole, hasAnyRole } from '@realtyeaseai/auth';

// In server component
const session = await auth();

if (hasRole(session?.user?.roles, 'ADMIN')) {
    // Show admin-only content
}

if (hasAnyRole(session?.user?.roles, ['ADMIN', 'MANAGER'])) {
    // Show content for admins and managers
}
```

### Protecting API Routes
```typescript
import { auth } from '@realtyeaseai/auth';
import { hasRole } from '@realtyeaseai/auth';

export async function GET() {
    const session = await auth();

    if (!session) {
        return new Response('Unauthorized', { status: 401 });
    }

    if (!hasRole(session.user.roles, 'ADMIN')) {
        return new Response('Forbidden', { status: 403 });
    }

    // Admin-only logic
}
```

### Middleware for Route Protection
```typescript
import { auth } from '@realtyeaseai/auth';
import { hasAnyRole } from '@realtyeaseai/auth';

export default auth((req) => {
    const session = req.auth;

    if (!session) {
        return Response.redirect(new URL('/login', req.url));
    }

    // Protect admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
        if (!hasRole(session.user.roles, 'ADMIN')) {
            return Response.redirect(new URL('/dashboard', req.url));
        }
    }
});
```

## Migration Guide

If you need to update the database schema, run:
```bash
cd packages/database
npx prisma migrate dev --name add_superadmin_and_permissions
npx prisma generate
```

## Permission Naming Convention

Permissions should follow the pattern: `resource.action`

Examples:
- `user.create`
- `user.read`
- `user.update`
- `user.delete`
- `project.create`
- `project.manage`
- `billing.view`
- `billing.manage`
- `system.configure`

## Future Enhancements

1. **Permission Seeding**: Create a seed script to populate default permissions for each role
2. **Dynamic Permission Checks**: Helper functions to check permissions from database
3. **Audit Logging**: Track permission changes and role assignments
4. **Role Templates**: Pre-configured role-permission sets for common use cases
5. **Multi-tenancy**: Scope roles and permissions to specific organizations
