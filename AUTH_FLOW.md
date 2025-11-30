# Authentication Flow Documentation

## Architecture Overview

### Domains
- **realtyeaseai.com** - Main website (landing, marketing, login)
- **app.realtyeaseai.com** - Protected dashboard application (requires authentication)

## Complete Authentication Flow

### 1. Unauthenticated User Tries to Access Dashboard

```
User visits: app.realtyeaseai.com/dashboard
     ↓
Middleware checks session (apps/app/middleware.ts:8)
     ↓
No session found
     ↓
Redirects to: realtyeaseai.com/login?callbackUrl=app.realtyeaseai.com/dashboard
```

### 2. User Sees Login Page

**Location**: `apps/web/app/login/page.tsx`
**Component**: `apps/web/components/LoginForm.tsx`

Features:
- "Welcome back" design
- Email/Password fields
- Google OAuth button
- Remember me checkbox
- Forgot password link
- Sign up link

### 3. User Submits Login Form

```
User enters credentials
     ↓
LoginForm.handleSubmit() (LoginForm.tsx:33)
     ↓
Calls: signIn("credentials", { email, password, redirect: false })
     ↓
NextAuth POST to: /api/auth/callback/credentials
     ↓
Auth handler validates (packages/auth/src/auth.ts:17-52)
     ↓
Checks database for user (line 24)
     ↓
Verifies password with bcrypt (line 35)
     ↓
Updates lastLoginAt (line 38-41)
     ↓
Returns user with roles (line 44-47)
```

### 4. JWT Token Creation

```
User authenticated
     ↓
JWT callback triggered (packages/auth/src/auth.ts:56-81)
     ↓
Adds user.id to token (line 60)
     ↓
Adds roles array to token (line 64-79)
     ↓
Determines primary role (line 66 or 78)
     ↓
Token created with: { id, roles, primaryRole }
```

### 5. Session Creation

```
JWT token created
     ↓
Session callback triggered (packages/auth/src/auth.ts:83-96)
     ↓
Adds id to session.user (line 85-86)
     ↓
Adds roles to session.user (line 88-89)
     ↓
Adds primaryRole to session.user (line 91-92)
     ↓
Session returned: { user: { id, email, name, roles, primaryRole } }
```

### 6. Redirect After Login

```
Login successful (result.ok === true)
     ↓
LoginForm checks callbackUrl from query params (LoginForm.tsx:22)
     ↓
Saves email to localStorage if "Remember me" checked (line 49-52)
     ↓
Shows success toast (line 56)
     ↓
Redirects to: callbackUrl || app.realtyeaseai.com/dashboard (line 59)
```

### 7. User Accesses Dashboard

```
User redirected to: app.realtyeaseai.com/dashboard
     ↓
Middleware checks session again (apps/app/middleware.ts:8)
     ↓
Session found!
     ↓
Middleware allows access (line 20)
     ↓
Dashboard page renders with role-based UI
```

## API Endpoints

### NextAuth Endpoints (Both Apps)

**Web App**: `apps/web/app/api/auth/[...nextauth]/route.ts`
**Dashboard App**: `apps/app/app/api/auth/[...nextauth]/route.ts`

Both export handlers from `@realtyeaseai/auth`:
```typescript
export const { GET, POST } = handlers
```

### Available Endpoints

- `POST /api/auth/callback/credentials` - Credential login
- `GET /api/auth/callback/google` - Google OAuth callback
- `GET /api/auth/session` - Get current session
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/signin` - Sign-in page (optional)
- `GET /api/auth/csrf` - CSRF token
- `GET /api/auth/providers` - Available providers

## Session Structure

```typescript
{
  user: {
    id: "uuid",
    email: "user@example.com",
    name: "John Doe",
    image: "https://...",
    roles: [
      { role: "CLIENT", isPrimary: true },
      { role: "MANAGER", isPrimary: false }
    ],
    primaryRole: "CLIENT"
  },
  expires: "2025-01-01T00:00:00.000Z"
}
```

## Role-Based Access

### Checking Roles in Components

```typescript
import { auth } from '@realtyeaseai/auth';
import { hasRole, hasAnyRole } from '@realtyeaseai/auth';

// Server Component
const session = await auth();

if (hasRole(session?.user?.roles, 'ADMIN')) {
  // Show admin content
}

if (hasAnyRole(session?.user?.roles, ['ADMIN', 'MANAGER'])) {
  // Show manager/admin content
}
```

### Checking Roles in Client Components

```typescript
'use client';
import { useSession } from 'next-auth/react';
import { hasRole } from '@realtyeaseai/auth';

export function MyComponent() {
  const { data: session } = useSession();

  if (hasRole(session?.user?.roles, 'ADMIN')) {
    return <AdminPanel />;
  }

  return <RegularUserPanel />;
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
  return Response.json({ data: 'secret admin data' });
}
```

## Middleware Configuration

### Dashboard App Middleware

**File**: `apps/app/middleware.ts`

```typescript
export default async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    // Redirect to login with callback URL
    const loginUrl = new URL("/login", WEB_URL);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
```

**Matcher**: All routes except API, static files, images

### Protected Routes

All routes on `app.realtyeaseai.com` are protected by middleware:
- `/dashboard` ✅ Protected
- `/projects` ✅ Protected
- `/tasks` ✅ Protected
- `/settings` ✅ Protected
- `/api/*` ❌ Not protected by middleware (handled individually)

### Public Routes

All routes on `realtyeaseai.com` are public:
- `/` ✅ Public (landing page)
- `/login` ✅ Public
- `/signup` ✅ Public
- `/about` ✅ Public
- `/pricing` ✅ Public

## Environment Variables

### Required Variables

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000" # or production URL
NEXTAUTH_SECRET="your-secret-key-here"

# Application URLs
NEXT_PUBLIC_WEB_URL="https://realtyeaseai.com"
NEXT_PUBLIC_APP_URL="https://app.realtyeaseai.com"

# OAuth (Optional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

## Testing the Flow

### Local Development

1. Start web app: `npm run dev --filter=@realtyeaseai/web`
2. Start dashboard app: `npm run dev --filter=@realtyeaseai/app`
3. Visit: `http://localhost:3001` (app)
4. Should redirect to: `http://localhost:3000/login?callbackUrl=...`
5. Login with credentials
6. Should redirect back to: `http://localhost:3001/dashboard`

### Creating Test Users

```typescript
import { prisma } from '@realtyeaseai/database';
import bcrypt from 'bcryptjs';

// Create user with password
const hashedPassword = await bcrypt.hash('password123', 10);

const user = await prisma.user.create({
  data: {
    email: 'test@example.com',
    password: hashedPassword,
    name: 'Test User',
    roles: {
      create: [
        { role: 'CLIENT', isPrimary: true },
        { role: 'MANAGER', isPrimary: false }
      ]
    }
  }
});
```

## Troubleshooting

### Issue: "405 Method Not Allowed" on login

**Cause**: Missing NextAuth route handler
**Fix**: Ensure `apps/web/app/api/auth/[...nextauth]/route.ts` exists and exports handlers

### Issue: Redirect loop between login and dashboard

**Cause**: Session not being saved properly
**Fix**: Check `NEXTAUTH_URL` and `NEXTAUTH_SECRET` environment variables

### Issue: "Invalid credentials" but password is correct

**Cause**: Password not hashed in database OR bcrypt comparison failing
**Fix**: Ensure password is hashed with bcrypt before storing

### Issue: User can access dashboard without login

**Cause**: Middleware not running
**Fix**: Check middleware.ts exists and matcher config is correct

### Issue: User redirected to login after successful login

**Cause**: Session not being persisted across domains
**Fix**: Ensure both apps use same `NEXTAUTH_SECRET` and proper cookie settings

## Security Considerations

1. **HTTPS in Production**: Always use HTTPS for authentication
2. **Secure Cookies**: NextAuth automatically sets secure cookies in production
3. **CSRF Protection**: Built into NextAuth
4. **Password Hashing**: Using bcrypt with salt rounds
5. **Session Expiry**: Configure in `auth.ts` session settings
6. **Rate Limiting**: Consider adding rate limiting to login endpoint
7. **2FA**: Can be added via NextAuth callbacks

## Next Steps

1. **Add Google OAuth**: Configure Google provider credentials
2. **Email Verification**: Add email verification flow
3. **Password Reset**: Implement forgot password flow
4. **2FA**: Add two-factor authentication
5. **Session Management**: Add "Sign out all devices" feature
6. **Audit Logging**: Log all authentication events
