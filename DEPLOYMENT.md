# Deployment Guide - RealtyEaseAI

## Overview
This guide covers deploying the RealtyEaseAI application with **single-domain, role-based access control (RBAC)** architecture.

## Architecture

### Single Domain with Role-Based UI
- **Domain**: `realtyeaseai.com` or `app.realtyeaseai.com`
- **Authentication**: All users login at the same URL
- **Dashboard**: Same `/dashboard` route for all roles
- **UI Rendering**: Different components shown based on user's `primaryRole`

### Role-Based Access
- `ADMIN` - Full access with Super Admin Panel
- `MANAGER` - Team management and projects
- `CLIENT` - Content creation, social media, billing
- `VA` - Task management and assigned clients

## Pre-Deployment Checklist

### 1. Required Environment Variables

Set these in your Vercel project settings:

#### Core Authentication
```bash
# NextAuth Configuration
NEXTAUTH_SECRET=<generate-using-openssl-rand-base64-32>
NEXTAUTH_URL=https://app.realtyeaseai.com

# Database
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<db>

# Application URL
NEXT_PUBLIC_APP_URL=https://app.realtyeaseai.com
```

#### Optional Environment Variables
```bash
# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# PayPal
PAYPAL_CLIENT_ID=your-client-id
PAYPAL_CLIENT_SECRET=your-client-secret
```

### 2. Database Setup

Ensure your PostgreSQL/Supabase database has:

```bash
# Run migrations
pnpm prisma migrate deploy

# Generate Prisma Client
pnpm prisma generate
```

#### User Roles Setup
Each user must have at least one role in the `UserRole` table:

```sql
-- Example: Create admin user
INSERT INTO "UserRole" ("id", "userId", "role", "isPrimary")
VALUES (gen_random_uuid(), '<user-id>', 'ADMIN', true);

-- Example: Create client user
INSERT INTO "UserRole" ("id", "userId", "role", "isPrimary")
VALUES (gen_random_uuid(), '<user-id>', 'CLIENT', true);
```

**Important**: Each user should have exactly ONE role with `isPrimary: true`.

### 3. Vercel Project Setup

Create **ONE** Vercel project for the main app:

```bash
Project Name: realtyeaseai-app
Root Directory: apps/client
Framework: Next.js
Build Command: pnpm turbo build --filter=@realtyeaseai/client
Install Command: pnpm install --no-frozen-lockfile
Output Directory: .next
Node Version: 18.x or higher
```

## Authentication Flow

### How It Works

1. **User visits** `app.realtyeaseai.com/login`
2. **User enters credentials**
3. **System authenticates** and fetches user's `primaryRole` from database
4. **System redirects** to `/dashboard` (same URL for all users)
5. **Dashboard renders** role-specific UI:
   - `ADMIN` → Sees all projects, user management, admin panel
   - `MANAGER` → Sees team projects, team members
   - `CLIENT` → Sees their projects, content calendar, billing
   - `VA` → Sees assigned tasks and clients

### Middleware Protection

The middleware (`apps/client/middleware.ts`) handles:
- ✅ Protects all routes except `/login`
- ✅ Redirects unauthenticated users to login
- ✅ Redirects authenticated users from `/login` to `/dashboard`
- ✅ Allows all authenticated users to access the dashboard

### Role-Based UI Rendering

The dashboard (`apps/client/app/dashboard/page.tsx`) dynamically renders:
- **Menu items** based on role (from `packages/ui/src/features/dashboard/role-dashboards/`)
- **Components** based on active view
- **Admin panel** only for `ADMIN` role

## Database Schema

### UserRole Table
```prisma
model UserRole {
  id        String   @id @default(uuid())
  userId    String
  role      Role     // ADMIN | MANAGER | CLIENT | VA
  isPrimary Boolean  @default(false)

  @@unique([userId, role])
}
```

### Key Points
- Users can have multiple roles
- Only one role can be `isPrimary: true`
- Primary role determines default UI
- All UI switching happens client-side

## Deployment Steps

### 1. Deploy Database Changes
```bash
# From monorepo root
pnpm prisma generate
pnpm prisma migrate deploy
```

### 2. Configure DNS
- Point your domain to Vercel:
  - `app.realtyeaseai.com` → Vercel
  - Or use Vercel's automatic DNS

### 3. Deploy to Vercel

**Option 1: Vercel Dashboard**
1. Connect GitHub repo
2. Configure project settings (see above)
3. Add environment variables
4. Deploy

**Option 2: Vercel CLI**
```bash
cd apps/client
vercel --prod
```

### 4. Test Authentication Flow

1. **Create test users** with different roles:
```sql
-- Admin user
INSERT INTO "UserRole" ("id", "userId", "role", "isPrimary")
VALUES (gen_random_uuid(), '<admin-user-id>', 'ADMIN', true);

-- Client user
INSERT INTO "UserRole" ("id", "userId", "role", "isPrimary")
VALUES (gen_random_uuid(), '<client-user-id>', 'CLIENT', true);
```

2. **Test login** with each user
3. **Verify** correct UI renders for each role
4. **Test** role-specific features

## Cost Comparison

### Single Domain (Current)
- **Vercel Pro**: $20/month
- **Database**: Varies (Supabase free tier available)
- **Total**: ~$20-50/month

### Multi-Subdomain (Previous)
- **Vercel Pro**: $20/month × 5 apps = $100/month
- **Database**: Same
- **Total**: ~$100-150/month

**Savings**: ~$80/month with single domain! 💰

## Common Issues & Solutions

### Issue 1: Wrong UI Showing After Login
**Cause**: User has no primary role or incorrect role
**Solution**:
```sql
-- Check user roles
SELECT * FROM "UserRole" WHERE "userId" = '<user-id>';

-- Set primary role
UPDATE "UserRole"
SET "isPrimary" = true
WHERE "userId" = '<user-id>' AND "role" = 'CLIENT';

-- Ensure only one primary
UPDATE "UserRole"
SET "isPrimary" = false
WHERE "userId" = '<user-id>' AND "role" != 'CLIENT';
```

### Issue 2: Session Not Persisting
**Cause**: NEXTAUTH_SECRET mismatch or missing
**Solution**: Ensure `NEXTAUTH_SECRET` is set and consistent across deployments

### Issue 3: Build Fails on Vercel
**Cause**: Missing dependencies or env vars
**Solution**:
1. Check environment variables are set
2. Verify `--no-frozen-lockfile` in vercel.json
3. Check build logs for specific errors

### Issue 4: Redirect Loop
**Cause**: Middleware configuration issue
**Solution**: Verify middleware matcher excludes static files and API routes

## Security Considerations

### 1. Authentication
- ✅ Use strong `NEXTAUTH_SECRET` (32+ characters)
- ✅ Enable HTTPS in production
- ✅ Rotate secrets periodically

### 2. Database
- ✅ Use connection pooling (Supabase Pooler)
- ✅ Enable SSL
- ✅ Restrict access by IP if possible

### 3. Role-Based Access
- ✅ Validate roles server-side in API routes
- ✅ Never trust client-side role checks alone
- ✅ Use middleware for route protection

### 4. API Routes
Example protected API route:
```typescript
// app/api/admin/route.ts
import { auth } from "@realtyeaseai/auth";
import { hasRole } from "@realtyeaseai/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user || !hasRole(session.user.roles, 'ADMIN')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Admin-only logic
}
```

## Monitoring

### What to Monitor
1. **Authentication errors**: Failed login attempts
2. **Role mismatches**: Users seeing wrong UI
3. **Session issues**: Expired or invalid sessions
4. **Performance**: Page load times per role

### Recommended Tools
- Vercel Analytics (built-in)
- Sentry (error tracking)
- PostHog (product analytics)

## Rollback Plan

If deployment fails:
1. Revert via Vercel dashboard (instant)
2. Check environment variables
3. Verify database migrations
4. Review build logs in Vercel

## Advantages of This Architecture

✅ **Simpler**: One app to deploy and maintain
✅ **Cheaper**: $20/month vs $100/month
✅ **Faster**: Shared code, single build
✅ **Better UX**: Same URL, seamless role switching
✅ **Easier to scale**: One codebase to optimize
✅ **Shared sessions**: No cross-domain issues

## Next Steps After Deployment

1. ✅ Set up monitoring and alerts
2. ✅ Configure custom domain SSL
3. ✅ Enable Vercel Analytics
4. ✅ Set up error tracking (Sentry)
5. ✅ Create user documentation
6. ✅ Train admins on role management
7. ✅ Implement API route protection with role checks
8. ✅ Add role-based data filtering in components

## Support

For deployment issues:
- Check Vercel build logs
- Review middleware logs
- Test locally with production env vars
- Verify database connection and migrations

---

**Architecture**: Single Domain RBAC
**Last Updated**: 2025-01-30
**Recommended for**: SaaS apps with shared features across roles
