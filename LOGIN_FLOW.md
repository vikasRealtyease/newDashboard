# Login Flow - Cross-Domain Authentication

## Overview
Login happens on the marketing site (`realtyeaseai.com`), then redirects to the app (`app.realtyeaseai.com`).

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      User Journey                            │
└─────────────────────────────────────────────────────────────┘

1. User visits: app.realtyeaseai.com
   ↓
2. Not logged in → Middleware redirects to:
   realtyeaseai.com/login?callbackUrl=app.realtyeaseai.com
   ↓
3. User enters credentials on realtyeaseai.com/login
   ↓
4. NextAuth validates & creates session
   ↓
5. Redirects to: app.realtyeaseai.com/dashboard
   ↓
6. User sees role-based dashboard
```

## Domain Responsibilities

### `realtyeaseai.com` (Web App)
**Purpose**: Marketing site + Authentication

**Routes**:
- `/` - Homepage
- `/about` - About page
- `/pricing` - Pricing page
- `/login` ✅ **LOGIN PAGE HERE**
- `/signup` - Signup page
- Other marketing pages

**Features**:
- Public marketing content
- NextAuth login endpoint (`/api/auth/[...nextauth]`)
- Login form that redirects to app subdomain

### `app.realtyeaseai.com` (Main App)
**Purpose**: Protected application with RBAC dashboard

**Routes**:
- `/` - Dashboard (redirects to `/dashboard`)
- `/dashboard` - Role-based dashboard
- `/api/auth/[...nextauth]` - NextAuth API routes
- **NO `/login` route** ❌

**Features**:
- All routes protected by middleware
- Unauthenticated users → redirect to `realtyeaseai.com/login`
- Role-based UI rendering
- Dashboard components

## Implementation Details

### 1. Web App Login (`apps/web/app/login/page.tsx`)

```typescript
import { LoginForm } from "@realtyeaseai/ui";
import { signIn } from "@realtyeaseai/auth";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL; // "https://app.realtyeaseai.com"

export default function LoginPage() {
    async function authenticate(values: any) {
        "use server";
        await signIn("credentials", {
            ...values,
            redirectTo: `${APP_URL}/dashboard`,
        });
    }

    return <LoginForm onSubmit={authenticate} />;
}
```

### 2. App Middleware (`apps/app/middleware.ts`)

```typescript
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL; // "https://realtyeaseai.com"

export default async function middleware(request: NextRequest) {
    const session = await auth();

    if (!session?.user) {
        // Redirect to web login with callback
        const loginUrl = new URL("/login", WEB_URL);
        loginUrl.searchParams.set("callbackUrl", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}
```

### 3. Auth Config (`packages/auth/src/auth.config.ts`)

```typescript
export const authConfig = {
    trustHost: true, // Required for cross-domain
    pages: {
        signIn: '/login', // On realtyeaseai.com
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            const appUrl = process.env.NEXT_PUBLIC_APP_URL;

            // Allow redirects to app.realtyeaseai.com
            if (appUrl && url.startsWith(appUrl)) {
                return url;
            }

            return baseUrl;
        },
    },
}
```

## Session Sharing

### How Sessions Work Across Subdomains

**Session Cookie**:
- Name: `__Secure-authjs.session-token` (production)
- Domain: `.realtyeaseai.com` (with leading dot)
- SameSite: `lax`
- Secure: `true` (HTTPS only)
- HttpOnly: `true`

**Cookie Scope**:
The leading dot `.realtyeaseai.com` makes the cookie available to:
- ✅ `realtyeaseai.com`
- ✅ `app.realtyeaseai.com`
- ✅ Any subdomain of `realtyeaseai.com`

**NextAuth Session Strategy**:
- Using JWT strategy (not database sessions)
- JWT token stored in cookie
- Token contains: user ID, roles, primaryRole
- Token validated on each request

## Environment Variables Required

### Both Apps Need:
```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="same-secret-for-both-apps"
NEXTAUTH_URL="https://realtyeaseai.com" (web) or "https://app.realtyeaseai.com" (app)

# Cross-domain URLs
NEXT_PUBLIC_WEB_URL="https://realtyeaseai.com"
NEXT_PUBLIC_APP_URL="https://app.realtyeaseai.com"
```

**IMPORTANT**:
- `NEXTAUTH_SECRET` **MUST BE THE SAME** on both apps
- This allows JWT tokens to be validated on both domains

## Testing Locally

### Development URLs:
```bash
# Web (marketing + login)
NEXT_PUBLIC_WEB_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"

# App (dashboard)
NEXT_PUBLIC_APP_URL="http://localhost:4000"
NEXTAUTH_URL="http://localhost:4000"
```

### Test Flow:
1. Run both apps:
   ```bash
   pnpm run dev:web  # localhost:3000
   pnpm run dev:app  # localhost:4000
   ```

2. Visit: `http://localhost:4000`
3. Should redirect to: `http://localhost:3000/login?callbackUrl=http://localhost:4000`
4. Login with credentials
5. Should redirect to: `http://localhost:4000/dashboard`

## Production Setup

### Vercel Project 1: Web (Marketing + Login)
```
Domain: realtyeaseai.com
Root Directory: apps/web
Build Command: pnpm turbo build --filter=@realtyeaseai/web

Environment Variables:
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<same-secret-as-app>
NEXTAUTH_URL=https://realtyeaseai.com
NEXT_PUBLIC_WEB_URL=https://realtyeaseai.com
NEXT_PUBLIC_APP_URL=https://app.realtyeaseai.com
```

### Vercel Project 2: App (Dashboard)
```
Domain: app.realtyeaseai.com
Root Directory: apps/app
Build Command: pnpm turbo build --filter=@realtyeaseai/app

Environment Variables:
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<same-secret-as-web>
NEXTAUTH_URL=https://app.realtyeaseai.com
NEXT_PUBLIC_WEB_URL=https://realtyeaseai.com
NEXT_PUBLIC_APP_URL=https://app.realtyeaseai.com
```

## Security Considerations

### 1. Cookie Security
✅ Cookies set with `Secure` flag (HTTPS only)
✅ Cookies set with `HttpOnly` (no JS access)
✅ Cookies set with `SameSite: lax` (CSRF protection)

### 2. Redirect Validation
✅ Auth config validates redirect URLs
✅ Only allows redirects to configured app URL
✅ Prevents open redirect vulnerabilities

### 3. Session Validation
✅ JWT tokens signed with secret
✅ Tokens validated on every request
✅ Short token expiration (30 days max)

## Common Issues & Solutions

### Issue 1: Session Not Persisting Across Domains
**Cause**: Different `NEXTAUTH_SECRET` on each app
**Solution**: Use the SAME secret on both apps

### Issue 2: Redirect Loop
**Cause**: Cookie not being set/read correctly
**Solution**:
- Ensure both apps use same root domain
- Check cookie domain is `.realtyeaseai.com` (with leading dot)
- Verify HTTPS is enabled in production

### Issue 3: 405 Error on Login
**Cause**: Trying to POST to wrong endpoint
**Solution**: Use NextAuth's `signIn()` function, not custom API route

### Issue 4: Can't Access App After Login
**Cause**: Middleware not recognizing session
**Solution**:
- Verify `NEXTAUTH_SECRET` matches
- Check cookie domain settings
- Ensure `trustHost: true` in auth config

## Troubleshooting

### Check Session Cookie:
1. Open browser DevTools
2. Go to Application → Cookies
3. Look for `__Secure-authjs.session-token` or `authjs.session-token`
4. Verify:
   - Domain: `.realtyeaseai.com`
   - Path: `/`
   - Secure: `true` (production)
   - HttpOnly: `true`

### Debug Middleware:
Add logging to middleware:
```typescript
console.log("Session:", session);
console.log("User:", session?.user);
console.log("Pathname:", pathname);
```

### Test NextAuth Endpoints:
```bash
# Check if NextAuth is working
curl https://realtyeaseai.com/api/auth/providers
curl https://app.realtyeaseai.com/api/auth/providers
```

---

**Architecture**: Cross-Domain Authentication
**Last Updated**: 2025-01-30
**Status**: ✅ Implemented and Ready
